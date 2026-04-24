import {
  OWGames,
  OWGameListener,
  OWGamesEvents,
  OWWindow
} from '@overwolf/overwolf-api-ts';

import { kWindowNames, kOWClassId, kOWFeatures, kHotkeys } from '../consts';
import { StatsService, MatchRecord }         from '../services/stats-service';
import { PlayerHistoryService, PlayerEncounter } from '../services/player-history-service';
import { ErrorService }                          from '../services/error-service';
import { getMapName, getMapType }                from '../data/maps';

import RunningGameInfo      = overwolf.games.RunningGameInfo;
import AppLaunchTriggeredEvent = overwolf.extensions.AppLaunchTriggeredEvent;

// ─── Shared state interface (accessed by in_game via getMainWindow()) ──────
export interface RosterEntry {
  playerName:   string;
  battleTag:    string;
  isLocal:      boolean;
  isTeammate:   boolean;
  heroName:     string;
  heroRole:     string;
  team:         number;
  kills:        number;
  deaths:       number;
  assists:      number;
  damage:       number;
  healed:       number;
  heroId:       number | null;
}

export interface AppState {
  gameRunning:   boolean;
  matchActive:   boolean;
  gameState:     string;
  gameMode:      string;
  gameType:      string;
  battleTag:     string;
  mapId:         string;
  mapName:       string;
  mapType:       string;
  matchId:       string;
  roster:        RosterEntry[];
  localKills:    number;
  localDeaths:   number;
  localAssists:  number;
  localDamage:   number;
  localHealed:   number;
  localHero:     string;
  matchStartTime: number;
}

type StateListener = (state: AppState) => void;

// ─────────────────────────────────────────────────────────────────────────────
class BackgroundController {
  private static _instance: BackgroundController;

  private _windows: Record<string, OWWindow> = {};
  private _gameListener: OWGameListener;
  private _gepListener: OWGamesEvents | null = null;

  private _stats         = StatsService.instance();
  private _playerHistory = PlayerHistoryService.instance();
  private _errorService  = ErrorService.instance();

  private _stateListeners: StateListener[] = [];
  private _gepRetryTimer: ReturnType<typeof setTimeout> | null = null;
  private _gepRetries = 0;
  private readonly GEP_MAX_RETRIES = 10;
  private readonly GEP_RETRY_DELAY = 2000;

  private _state: AppState = {
    gameRunning:    false,
    matchActive:    false,
    gameState:      '',
    gameMode:       '',
    gameType:       '',
    battleTag:      '',
    mapId:          '',
    mapName:        '',
    mapType:        '',
    matchId:        '',
    roster:         [],
    localKills:     0,
    localDeaths:    0,
    localAssists:   0,
    localDamage:    0,
    localHealed:    0,
    localHero:      '',
    matchStartTime: 0
  };

  private constructor() {
    this._windows[kWindowNames.desktop] = new OWWindow(kWindowNames.desktop);
    this._windows[kWindowNames.inGame]  = new OWWindow(kWindowNames.inGame);

    this._gameListener = new OWGameListener({
      onGameStarted: (info: RunningGameInfo) => this.onGameStarted(info),
      onGameEnded:   (info: RunningGameInfo) => this.onGameEnded(info)
    });

    overwolf.extensions.onAppLaunchTriggered.addListener(
      (e: AppLaunchTriggeredEvent) => this.onAppLaunchTriggered(e)
    );

    // Expose bridge to other windows
    (window as any).vwBridge = {
      getState:    () => this._state,
      subscribe:   (cb: StateListener) => {
        this._stateListeners.push(cb);
        return () => {
          this._stateListeners = this._stateListeners.filter(l => l !== cb);
        };
      },
      getHotkey:   () => kHotkeys.toggle
    };

    // Restore saved battle tag
    const savedTag = this._stats.getBattleTag();
    if (savedTag) this._state.battleTag = savedTag;
  }

  static instance(): BackgroundController {
    if (!BackgroundController._instance) {
      BackgroundController._instance = new BackgroundController();
    }
    return BackgroundController._instance;
  }

  async run(): Promise<void> {
    this._gameListener.start();

    const info = await OWGames.getRunningGameInfo();
    if (info && info.isRunning && info.classId === kOWClassId) {
      this._state.gameRunning = true;
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.inGame].restore();
      this.startGep();
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.inGame].close();
    }
  }

  // ─── Window lifecycle ────────────────────────────────────────────────────

  private async onAppLaunchTriggered(e: AppLaunchTriggeredEvent): Promise<void> {
    console.log('[VW] onAppLaunchTriggered', e);
    if (!e || e.origin.includes('gamelaunchevent')) return;
    if (this._state.gameRunning) {
      this._windows[kWindowNames.desktop].close();
      this._windows[kWindowNames.inGame].restore();
    } else {
      this._windows[kWindowNames.desktop].restore();
      this._windows[kWindowNames.inGame].close();
    }
  }

  private onGameStarted(info: RunningGameInfo): void {
    if (!info || info.classId !== kOWClassId) return;
    console.log('[VW] Game started');
    this._state.gameRunning = true;
    this._windows[kWindowNames.desktop].close();
    this._windows[kWindowNames.inGame].restore();
    this.startGep();
    this.notifyListeners();
  }

  private onGameEnded(info: RunningGameInfo): void {
    if (!info || info.classId !== kOWClassId) return;
    console.log('[VW] Game ended');
    this._state.gameRunning = false;
    this.stopGep();
    this._windows[kWindowNames.inGame].close();
    this._windows[kWindowNames.desktop].restore();
    this.notifyListeners();
  }

  // ─── GEP setup ──────────────────────────────────────────────────────────

  private startGep(): void {
    this._gepRetries = 0;
    this.trySetRequiredFeatures();
  }

  private stopGep(): void {
    if (this._gepRetryTimer) {
      clearTimeout(this._gepRetryTimer);
      this._gepRetryTimer = null;
    }
    if (this._gepListener) {
      this._gepListener.stop();
      this._gepListener = null;
    }
  }

  private trySetRequiredFeatures(): void {
    overwolf.games.events.setRequiredFeatures(kOWFeatures, (result) => {
      if (result.success) {
        console.log('[VW] GEP features registered');
        this.createGepListener();
      } else if (this._gepRetries < this.GEP_MAX_RETRIES) {
        this._gepRetries++;
        console.log(`[VW] GEP retry ${this._gepRetries}`);
        this._gepRetryTimer = setTimeout(
          () => this.trySetRequiredFeatures(),
          this.GEP_RETRY_DELAY
        );
      } else {
        this._errorService.logGep('Failed to set required features after max retries');
      }
    });
  }

  private createGepListener(): void {
    if (this._gepListener) this._gepListener.stop();
    this._gepListener = new OWGamesEvents(
      {
        onInfoUpdates: (info) => this.onInfoUpdates(info),
        onNewEvents:   (e)    => this.onNewEvents(e)
      },
      kOWFeatures
    );
    this._gepListener.start();
  }

  // ─── GEP event handlers ─────────────────────────────────────────────────

  private onInfoUpdates(info: any): void {
    try {
      const feature = info?.feature;
      const data    = info?.info;

      if (feature === 'game_info') {
        const gi = data?.game_info;
        if (gi?.game_state !== undefined) this._state.gameState = gi.game_state;
        if (gi?.game_mode  !== undefined) this._state.gameMode  = gi.game_mode;
        if (gi?.battle_tag !== undefined) {
          this._state.battleTag = gi.battle_tag;
          this._stats.saveBattleTag(gi.battle_tag);
        }
        const mi = data?.match_info;
        if (mi?.game_type       !== undefined) this._state.gameType = mi.game_type;
      }

      if (feature === 'match_info') {
        const mi = data?.match_info;
        if (mi?.map !== undefined) {
          this._state.mapId   = mi.map;
          this._state.mapName = getMapName(mi.map);
          this._state.mapType = getMapType(mi.map);
        }
        if (mi?.pseudo_match_id !== undefined) this._state.matchId = mi.pseudo_match_id;
        if (mi?.match_outcome   !== undefined) {
          // match_outcome arrives at match end — save record then
          const outcome = mi.match_outcome as 'victory' | 'defeat';
          this.saveMatchRecord(outcome);
        }
      }

      if (feature === 'kill') {
        const ki = data?.kill;
        if (ki?.eliminations !== undefined) this._state.localKills = Number(ki.eliminations);
      }

      if (feature === 'death') {
        const di = data?.death;
        if (di?.deaths !== undefined) this._state.localDeaths = Number(di.deaths);
      }

      if (feature === 'assist') {
        const ai = data?.assist;
        if (ai?.assists !== undefined) this._state.localAssists = Number(ai.assists);
      }

      if (feature === 'roster') {
        this.handleRosterUpdate(data?.roster);
      }

      this.notifyListeners();
    } catch (e) {
      this._errorService.logGep('onInfoUpdates error: ' + String(e));
    }
  }

  private onNewEvents(e: any): void {
    try {
      const events: Array<{ name: string; data: string }> = e?.events ?? [];
      for (const evt of events) {
        switch (evt.name) {
          case 'match_start':
            this.onMatchStart();
            break;
          case 'match_end':
            this.onMatchEnd();
            break;
          case 'elimination':
            this._state.localKills = Number(evt.data) || this._state.localKills;
            break;
          case 'death':
            this._state.localDeaths = Number(evt.data) || this._state.localDeaths;
            break;
          case 'assist':
            this._state.localAssists = Number(evt.data) || this._state.localAssists;
            break;
          case 'kill_feed':
            // Kill feed provides hero data per player
            break;
        }
      }
      this.notifyListeners();
    } catch (err) {
      this._errorService.logGep('onNewEvents error: ' + String(err));
    }
  }

  private onMatchStart(): void {
    console.log('[VW] Match started');
    this._state.matchActive    = true;
    this._state.matchStartTime = Date.now();
    this._state.localKills     = 0;
    this._state.localDeaths    = 0;
    this._state.localAssists   = 0;
    this._state.localDamage    = 0;
    this._state.localHealed    = 0;
    this._state.roster         = [];
  }

  private onMatchEnd(): void {
    console.log('[VW] Match ended');
    this._state.matchActive = false;
    // Outcome is delivered via match_outcome info update — saveMatchRecord called there
  }

  private handleRosterUpdate(rosterData: Record<string, string> | undefined): void {
    if (!rosterData) return;
    const newRoster: RosterEntry[] = [];

    for (const key of Object.keys(rosterData)) {
      if (!key.startsWith('roster_')) continue;
      try {
        const raw   = rosterData[key];
        const entry = typeof raw === 'string' ? JSON.parse(raw) : raw;
        const player: RosterEntry = {
          playerName: entry.player_name   ?? '',
          battleTag:  entry.battlenet_tag ?? '',
          isLocal:    entry.is_local      ?? false,
          isTeammate: entry.is_teammate   ?? false,
          heroName:   entry.hero_name     ?? '',
          heroRole:   entry.hero_role     ?? '',
          team:       entry.team          ?? 0,
          kills:      entry.kills         ?? 0,
          deaths:     entry.deaths        ?? 0,
          assists:    entry.assists       ?? 0,
          damage:     entry.damage        ?? 0,
          healed:     entry.healed        ?? 0,
          heroId:     entry.hero_id       ?? null
        };
        if (player.isLocal && player.heroName) {
          this._state.localHero    = player.heroName;
          this._state.localKills   = player.kills;
          this._state.localDeaths  = player.deaths;
          this._state.localAssists = player.assists;
          this._state.localDamage  = player.damage;
          this._state.localHealed  = player.healed;
        }
        // Merge — update existing entry or push new
        const existingIdx = this._state.roster.findIndex(
          r => (r.battleTag || r.playerName) === (player.battleTag || player.playerName)
        );
        if (existingIdx !== -1) {
          this._state.roster[existingIdx] = player;
        } else {
          newRoster.push(player);
        }
      } catch (e) {
        this._errorService.logGep('Roster parse error: ' + String(e), key);
      }
    }
    if (newRoster.length > 0) {
      this._state.roster = [...this._state.roster, ...newRoster];
    }
  }

  // ─── Match record persistence ────────────────────────────────────────────

  private saveMatchRecord(outcome: 'victory' | 'defeat'): void {
    if (!this._state.matchId) return;
    const record: MatchRecord = {
      matchId:  this._state.matchId,
      date:     this._state.matchStartTime || Date.now(),
      map:      this._state.mapId,
      mapName:  this._state.mapName,
      outcome,
      hero:     this._state.localHero,
      kills:    this._state.localKills,
      deaths:   this._state.localDeaths,
      assists:  this._state.localAssists,
      damage:   this._state.localDamage,
      healed:   this._state.localHealed,
      gameMode: this._state.gameMode
    };
    this._stats.saveMatch(record);

    // Save player history for all roster members
    const encounters: PlayerEncounter[] = this._state.roster
      .filter(p => !p.isLocal && (p.battleTag || p.playerName))
      .map(p => ({
        battleTag:  p.battleTag,
        playerName: p.playerName,
        lastSeen:   Date.now(),
        matchId:    this._state.matchId,
        heroPlayed: p.heroName,
        isTeammate: p.isTeammate,
        map:        this._state.mapId,
        mapName:    this._state.mapName
      }));
    this._playerHistory.recordMultiple(encounters);

    console.log('[VW] Match saved:', record.matchId, outcome);
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private notifyListeners(): void {
    const snap = { ...this._state };
    for (const cb of this._stateListeners) {
      try { cb(snap); } catch { }
    }
  }
}

BackgroundController.instance().run();

