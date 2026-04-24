import { OWHotkeys } from '@overwolf/overwolf-api-ts';

import { AppWindow }                                from '../AppWindow';
import { kWindowNames, kHotkeys }                  from '../consts';
import { PlayerHistoryService }                    from '../services/player-history-service';

import { HEROES, getCountersForHero, getHeroInfo, getHeroIcon } from '../data/heroes';
import { getGoodHeroesForMap, getMapImage }                      from '../data/maps';
import { AppState, RosterEntry }                                  from '../background/background';

// ─── Role colour helper ───────────────────────────────────────────────────────
function roleClass(role: string): string {
  switch (role?.toLowerCase()) {
    case 'tank':    return 'tank';
    case 'dps':     return 'dps';
    case 'support': return 'supp';
    default:        return '';
  }
}

function heroDisplay(name: string): string {
  const h = HEROES.find(x => x.name === name);
  return h ? h.displayName : (name || '—');
}

// ─────────────────────────────────────────────────────────────────────────────
class InGameController extends AppWindow {
  private _history = PlayerHistoryService.instance();
  private _bridge: any = null;
  private _unsubscribe: (() => void) | null = null;
  private _visible = true;

  constructor() {
    super(kWindowNames.inGame);
    this.initHotkey();
    this.connectBridge();
  }

  // ─── Bridge polling ───────────────────────────────────────────────────

  private connectBridge(): void {
    const mainWindow = overwolf.windows.getMainWindow();
    if (mainWindow && (mainWindow as any).vwBridge) {
      this._bridge = (mainWindow as any).vwBridge;
      this.render(this._bridge.getState());
      this._unsubscribe = this._bridge.subscribe((state: AppState) => this.render(state));
    } else {
      setTimeout(() => this.connectBridge(), 500);
    }
  }

  // ─── Hotkey ───────────────────────────────────────────────────────────

  private initHotkey(): void {
    OWHotkeys.onHotkeyDown(kHotkeys.toggle, () => this.toggleVisibility());
    OWHotkeys.getHotkeyText(kHotkeys.toggle).then(text => {
      const el = document.getElementById('hotkey-text');
      if (el) el.textContent = text;
    });
  }

  private async toggleVisibility(): Promise<void> {
    this._visible = !this._visible;
    const main = document.querySelector<HTMLElement>('main');
    if (main) main.style.display = this._visible ? '' : 'none';
  }

  // ─── Render ───────────────────────────────────────────────────────────

  private render(state: AppState): void {
    const mapNameEl = document.getElementById('map-name');
    const mapTypeEl = document.getElementById('map-type');
    const mapThumbEl = document.getElementById('map-thumb') as HTMLImageElement | null;
    if (mapNameEl) mapNameEl.textContent = state.mapName || 'Ожидание матча…';
    if (mapTypeEl) mapTypeEl.textContent = state.mapType || '';
    if (mapThumbEl) {
      const img = getMapImage(state.mapId);
      if (img) { mapThumbEl.src = img; mapThumbEl.style.display = ''; }
      else { mapThumbEl.style.display = 'none'; }
    }

    const badgeEl = document.getElementById('match-state-badge');
    if (badgeEl) {
      if (state.matchActive) {
        badgeEl.textContent = '● ИДЁТ МАТЧ';
        badgeEl.className = 'match-state-badge active';
      } else {
        badgeEl.textContent = '';
        badgeEl.className = 'match-state-badge';
      }
    }

    const waitingEl  = document.getElementById('waiting-msg');
    const rosterEl   = document.querySelector<HTMLElement>('.roster-section');
    const recsEl     = document.getElementById('recs-section');
    const hasRoster  = state.roster.length > 0;
    if (waitingEl) waitingEl.style.display = hasRoster ? 'none' : '';
    if (rosterEl)  rosterEl.style.display  = hasRoster ? '' : 'none';
    if (recsEl)    recsEl.style.display    = hasRoster ? '' : 'none';

    if (!hasRoster) return;

    const allies  = state.roster.filter(p => p.isTeammate || p.isLocal);
    const enemies = state.roster.filter(p => !p.isTeammate && !p.isLocal);
    this.renderTeam('roster-ally',  allies);
    this.renderTeam('roster-enemy', enemies);

    this.renderMapHeroes(state.mapId);
    this.renderCounters(enemies);
  }

  private renderTeam(containerId: string, players: RosterEntry[]): void {
    const el = document.getElementById(containerId);
    if (!el) return;

    if (players.length === 0) {
      el.innerHTML = '<div style="padding:8px 10px;font-size:11px;opacity:.4">Нет данных</div>';
      return;
    }

    el.innerHTML = players.map(p => {
      const enc        = this._history.getLastEncounter(p.battleTag || p.playerName);
      const metBefore  = enc !== null;
      // Primary label: player name/tag, fallback to hero name
      const label      = p.playerName || p.battleTag || heroDisplay(p.heroName) || '???';
      const icon       = getHeroIcon(p.heroName);
      const metTip     = metBefore
        ? ` title="★ Встречались ${new Date(enc!.lastSeen).toLocaleDateString('ru-RU')} · ${enc!.mapName}"`
        : '';

      const portrait = icon
        ? `<img src="${icon}" alt="" onerror="this.style.display='none';this.parentElement.querySelector('.hero-portrait-placeholder').style.display=''">`
        : '';
      const placeholder = `<span class="hero-portrait-placeholder" ${icon ? 'style="display:none"' : ''}>?</span>`;

      return `
        <div class="roster-entry ${p.isLocal ? 'is-local' : ''}"${metTip}>
          <div class="hero-portrait">${portrait}${placeholder}</div>
          <div class="entry-body">
            <span class="entry-name">${label}</span>
            <div class="entry-bar"></div>
          </div>
        </div>`;
    }).join('');
  }

  private renderMapHeroes(mapId: string): void {
    const el = document.getElementById('rec-map-heroes');
    if (!el) return;
    const heroes = getGoodHeroesForMap(mapId);
    if (heroes.length === 0) {
      el.innerHTML = '<span class="muted">Нет данных для этой карты</span>';
      return;
    }
    el.innerHTML = heroes.slice(0, 5).map(name => {
      const h    = HEROES.find(x => x.name === name);
      const rc   = h ? roleClass(h.role) : '';
      const icon = getHeroIcon(name);
      return `<span class="rec-chip ${rc}">${icon ? `<img class="chip-icon" src="${icon}" alt="" onerror="this.style.display='none'">` : ''}${heroDisplay(name)}</span>`;
    }).join('');
  }

  private renderCounters(enemies: RosterEntry[]): void {
    const el = document.getElementById('rec-counters');
    if (!el) return;

    const enemyHeroes = enemies.map(e => e.heroName).filter(Boolean);
    if (enemyHeroes.length === 0) {
      el.innerHTML = '<span class="muted">Герои врагов неизвестны</span>';
      return;
    }

    const counterMap: Record<string, number> = {};
    for (const heroName of enemyHeroes) {
      for (const c of getCountersForHero(heroName)) {
        counterMap[c] = (counterMap[c] ?? 0) + 1;
      }
    }

    const sorted = Object.entries(counterMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);

    if (sorted.length === 0) {
      el.innerHTML = '<span class="muted">Нет данных</span>';
      return;
    }

    el.innerHTML = sorted.map(name => {
      const h    = getHeroInfo(name);
      const rc   = h ? roleClass(h.role) : '';
      const icon = getHeroIcon(name);
      return `<span class="rec-chip ${rc}">${icon ? `<img class="chip-icon" src="${icon}" alt="" onerror="this.style.display='none'">` : ''}${heroDisplay(name)}</span>`;
    }).join('');
  }
}

new InGameController();
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.

