import { AppWindow }               from '../AppWindow';
import { kWindowNames }             from '../consts';
import { StatsService }             from '../services/stats-service';
import { ErrorService }             from '../services/error-service';
import { HEROES, getHeroesByRole, getDifficultyLabel } from '../data/heroes';

class DesktopController extends AppWindow {
  private _stats  = StatsService.instance();
  private _errors = ErrorService.instance();

  constructor() {
    super(kWindowNames.desktop);
    this.initTabs();
    this.initHeroGuide();
    this.loadStats();
    this.initGuideTab();

    // Refresh data whenever window gets focus
    window.addEventListener('focus', () => this.loadStats());
  }

  // ─── Tabs ─────────────────────────────────────────────────────────────

  private initTabs(): void {
    document.querySelectorAll<HTMLButtonElement>('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${tabId}`)?.classList.add('active');
        if (tabId === 'stats') this.renderStats();
      });
    });
  }

  // ─── Statistics ───────────────────────────────────────────────────────

  private loadStats(): void {
    const data = this._stats.getPlayerStats();

    // Profile card
    const btag = data.battleTag || localStorage.getItem('vw_battle_tag') || '';
    const btagEl = document.getElementById('profile-btag');
    const initEl = document.getElementById('profile-initials');
    if (btagEl) btagEl.textContent = btag || 'Battle.NET tag появится после запуска игры';
    if (initEl) initEl.textContent = btag ? btag[0].toUpperCase() : '?';

    // Stat cards
    const winRate = data.totalGames > 0
      ? Math.round((data.wins / data.totalGames) * 100) + '%'
      : '—';
    this.setText('stat-total',   String(data.totalGames));
    this.setText('stat-wins',    String(data.wins));
    this.setText('stat-losses',  String(data.losses));
    this.setText('stat-winrate', winRate);

    // Top heroes chips
    const chipsEl = document.getElementById('top-heroes-list');
    if (chipsEl) {
      if (data.topHeroes.length === 0) {
        chipsEl.innerHTML = '<span class="muted">Нет данных — сыграй несколько матчей</span>';
      } else {
        chipsEl.innerHTML = data.topHeroes.slice(0, 5).map(h => {
          const hero = HEROES.find(hr => hr.name === h.heroName);
          const role = hero?.role ?? '';
          return `<span class="hero-chip ${role.toLowerCase()}">${hero?.displayName ?? h.heroName} <em>${h.gamesPlayed}м</em></span>`;
        }).join('');
      }
    }
  }

  private renderStats(): void {
    const data = this._stats.getPlayerStats();

    // Hero stats table
    const rowsEl = document.getElementById('hero-stats-rows');
    if (rowsEl) {
      if (data.topHeroes.length === 0) {
        rowsEl.innerHTML = '<div class="table-row muted" style="justify-content:center;padding:20px">Нет данных</div>';
      } else {
        rowsEl.innerHTML = data.topHeroes.map(h => {
          const hero    = HEROES.find(hr => hr.name === h.heroName);
          const kd      = h.totalDeaths > 0
            ? (h.totalKills / h.totalDeaths).toFixed(2)
            : h.totalKills.toFixed(0);
          const wr      = h.gamesPlayed > 0
            ? Math.round((h.wins / h.gamesPlayed) * 100)
            : 0;
          const roleClass = (hero?.role ?? '').toLowerCase();
          return `
            <div class="table-row">
              <span class="hero-name ${roleClass}">${hero?.displayName ?? h.heroName}</span>
              <span>${h.gamesPlayed}</span>
              <span class="role-badge ${roleClass}">${hero?.role ?? '—'}</span>
              <span class="win-count">${h.wins}</span>
              <span class="winrate-bar-wrap">
                <span class="winrate-bar" style="width:${wr}%"></span>
                <span class="winrate-label">${wr}%</span>
              </span>
              <span class="${Number(kd) >= 1 ? 'kd-good' : 'kd-bad'}">${kd}</span>
            </div>`;
        }).join('');
      }
    }

    // Recent matches
    const matchesEl = document.getElementById('recent-matches');
    if (matchesEl) {
      if (data.recentMatches.length === 0) {
        matchesEl.innerHTML = '<div class="muted" style="padding:16px">Матчей не найдено</div>';
      } else {
        matchesEl.innerHTML = data.recentMatches.map(m => {
          const date    = new Date(m.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
          const hero    = HEROES.find(h => h.name === m.hero);
          const outcome = m.outcome === 'victory' ? 'win' : m.outcome === 'defeat' ? 'loss' : 'unknown';
          return `
            <div class="match-row ${outcome}">
              <span class="match-outcome">${m.outcome === 'victory' ? 'П' : m.outcome === 'defeat' ? 'П' : '?'}</span>
              <span class="match-map">${m.mapName || '—'}</span>
              <span class="match-hero">${(hero?.displayName ?? m.hero) || '—'}</span>
              <span class="match-kda">${m.kills}/${m.deaths}/${m.assists}</span>
              <span class="match-date muted">${date}</span>
            </div>`;
        }).join('');
      }
    }
  }

  // ─── Hero Guide ───────────────────────────────────────────────────────

  private initHeroGuide(): void {
    this.renderHeroGrid('all');

    document.querySelectorAll<HTMLButtonElement>('.role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderHeroGrid(btn.dataset.role ?? 'all');
      });
    });
  }

  private renderHeroGrid(role: string): void {
    const grid = document.getElementById('hero-guide-grid');
    if (!grid) return;

    const list = role === 'all'
      ? HEROES
      : HEROES.filter(h => h.role === role);

    grid.innerHTML = list.map(h => `
      <div class="hero-card">
        <div class="hero-card-header">
          <span class="hero-card-name">${h.displayName}</span>
          <span class="role-badge ${h.role.toLowerCase()}">${h.role}</span>
          <span class="difficulty-badge diff-${h.difficulty}">${getDifficultyLabel(h.difficulty)}</span>
        </div>
        <div class="hero-card-body">
          <div class="counter-row">
            <span class="counter-label strong">Силён против:</span>
            <span class="counter-list">${h.counters.slice(0, 3).map(c => `<span class="hero-tag">${this.formatHeroName(c)}</span>`).join('')}</span>
          </div>
          <div class="counter-row">
            <span class="counter-label weak">Контрпики:</span>
            <span class="counter-list">${h.counteredBy.slice(0, 3).map(c => `<span class="hero-tag counter">${this.formatHeroName(c)}</span>`).join('')}</span>
          </div>
          <div class="hero-tips">
            <span class="tip-icon">💡</span>${h.tips[0]}
          </div>
        </div>
      </div>
    `).join('');
  }

  private formatHeroName(name: string): string {
    const hero = HEROES.find(h => h.name === name);
    return hero?.displayName ?? name.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ');
  }

  // ─── Guide Tab ────────────────────────────────────────────────────────

  private initGuideTab(): void {
    const clearBtn   = document.getElementById('clear-errors-btn');
    const countEl    = document.getElementById('error-count');
    const updateCount = () => {
      const n = this._errors.getErrors().length;
      if (countEl) countEl.textContent = n > 0 ? ` (${n} записей)` : ' (пусто)';
    };
    updateCount();
    clearBtn?.addEventListener('click', () => {
      this._errors.clearErrors();
      updateCount();
    });
  }

  private setText(id: string, value: string): void {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
}

new DesktopController();
