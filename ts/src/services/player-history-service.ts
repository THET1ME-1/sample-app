export interface PlayerEncounter {
  battleTag: string;
  playerName: string;
  lastSeen: number;
  matchId: string;
  heroPlayed: string;
  isTeammate: boolean;
  map: string;
  mapName: string;
}

const STORAGE_KEY = 'vw_player_history';
const MAX_ENTRIES  = 1000;

export class PlayerHistoryService {
  private static _instance: PlayerHistoryService;

  private constructor() {}

  static instance(): PlayerHistoryService {
    if (!PlayerHistoryService._instance) {
      PlayerHistoryService._instance = new PlayerHistoryService();
    }
    return PlayerHistoryService._instance;
  }

  private getKey(enc: PlayerEncounter): string {
    return enc.battleTag || enc.playerName;
  }

  recordEncounter(encounter: PlayerEncounter): void {
    if (!encounter.playerName && !encounter.battleTag) return;
    const history = this.getAllHistory();
    const key     = this.getKey(encounter);
    const idx     = history.findIndex(e => (e.battleTag || e.playerName) === key);
    if (idx !== -1) {
      history[idx] = encounter;
    } else {
      history.unshift(encounter);
      if (history.length > MAX_ENTRIES) history.splice(MAX_ENTRIES);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('[PlayerHistoryService] save failed', e);
    }
  }

  recordMultiple(encounters: PlayerEncounter[]): void {
    for (const enc of encounters) this.recordEncounter(enc);
  }

  getLastEncounter(tag: string): PlayerEncounter | null {
    if (!tag) return null;
    const history = this.getAllHistory();
    return history.find(e => (e.battleTag || e.playerName) === tag) ?? null;
  }

  hasMetBefore(tag: string): boolean {
    return this.getLastEncounter(tag) !== null;
  }

  getAllHistory(): PlayerEncounter[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PlayerEncounter[]) : [];
    } catch {
      return [];
    }
  }
}
