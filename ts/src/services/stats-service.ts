export interface MatchRecord {
  matchId: string;
  date: number;
  map: string;
  mapName: string;
  outcome: 'victory' | 'defeat' | 'unknown';
  hero: string;
  kills: number;
  deaths: number;
  assists: number;
  damage: number;
  healed: number;
  gameMode: string;
}

export interface HeroStats {
  heroName: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
}

export interface PlayerStats {
  totalGames: number;
  wins: number;
  losses: number;
  topHeroes: HeroStats[];
  recentMatches: MatchRecord[];
  battleTag: string;
}

const STORAGE_KEY_MATCHES  = 'vw_match_history';
const STORAGE_KEY_BTAG     = 'vw_battle_tag';
const MAX_MATCHES           = 200;

export class StatsService {
  private static _instance: StatsService;

  private constructor() {}

  static instance(): StatsService {
    if (!StatsService._instance) {
      StatsService._instance = new StatsService();
    }
    return StatsService._instance;
  }

  saveMatch(record: MatchRecord): void {
    const matches = this.getMatches();
    const idx = matches.findIndex(m => m.matchId === record.matchId);
    if (idx !== -1) {
      matches[idx] = record;
    } else {
      matches.unshift(record);
      if (matches.length > MAX_MATCHES) matches.splice(MAX_MATCHES);
    }
    try {
      localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(matches));
    } catch (e) {
      console.error('[StatsService] save failed', e);
    }
  }

  getMatches(): MatchRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_MATCHES);
      return raw ? (JSON.parse(raw) as MatchRecord[]) : [];
    } catch {
      return [];
    }
  }

  getPlayerStats(): PlayerStats {
    const matches = this.getMatches();
    const heroMap: Record<string, HeroStats> = {};

    for (const m of matches) {
      if (!m.hero) continue;
      if (!heroMap[m.hero]) {
        heroMap[m.hero] = {
          heroName: m.hero,
          gamesPlayed: 0, wins: 0, losses: 0,
          totalKills: 0, totalDeaths: 0, totalAssists: 0
        };
      }
      const hs = heroMap[m.hero];
      hs.gamesPlayed++;
      if (m.outcome === 'victory') hs.wins++;
      if (m.outcome === 'defeat')  hs.losses++;
      hs.totalKills   += m.kills;
      hs.totalDeaths  += m.deaths;
      hs.totalAssists += m.assists;
    }

    const topHeroes = Object.values(heroMap)
      .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
      .slice(0, 10);

    return {
      totalGames:    matches.length,
      wins:          matches.filter(m => m.outcome === 'victory').length,
      losses:        matches.filter(m => m.outcome === 'defeat').length,
      topHeroes,
      recentMatches: matches.slice(0, 20),
      battleTag:     this.getBattleTag()
    };
  }

  saveBattleTag(tag: string): void {
    try { localStorage.setItem(STORAGE_KEY_BTAG, tag); } catch (e) {
      console.error('[StatsService] btag save failed', e);
    }
  }

  getBattleTag(): string {
    return localStorage.getItem(STORAGE_KEY_BTAG) ?? '';
  }
}
