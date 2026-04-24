export interface MapInfo {
  id: string;
  name: string;
  type: 'Control' | 'Escort' | 'Hybrid' | 'Push' | 'Flashpoint' | 'Clash' | 'Other';
  goodHeroes: string[];
}

export const OW_MAPS: Record<string, MapInfo> = {
  '3314': { id: '3314', name: 'Antarctic Peninsula', type: 'Control',  goodHeroes: ['SYMMETRA', 'BASTION', 'ORISA', 'SIGMA', 'ZARYA'] },
  '2018': { id: '2018', name: 'Busan',               type: 'Control',  goodHeroes: ['WINSTON', 'TRACER', 'GENJI', 'LUCIO', 'DVA'] },
  '1645': { id: '1645', name: 'Ilios',               type: 'Control',  goodHeroes: ['ROADHOG', 'WRECKING BALL', 'LUCIO', 'PHARAH', 'JUNKRAT'] },
  '1634': { id: '1634', name: 'Lijiang Tower',       type: 'Control',  goodHeroes: ['WINSTON', 'DVA', 'TRACER', 'GENJI', 'LUCIO'] },
  '1719': { id: '1719', name: 'Lijiang Tower LNY',   type: 'Control',  goodHeroes: ['WINSTON', 'DVA', 'TRACER', 'GENJI', 'LUCIO'] },
  '1207': { id: '1207', name: 'Nepal',               type: 'Control',  goodHeroes: ['SIGMA', 'PHARAH', 'MERCY', 'ECHO', 'SOLDIER: 76'] },
  '1694': { id: '1694', name: 'Oasis',               type: 'Control',  goodHeroes: ['LUCIO', 'WRECKING BALL', 'JUNKRAT', 'GENJI', 'TRACER'] },
  '3776': { id: '3776', name: 'Samoa',               type: 'Control',  goodHeroes: ['LUCIO', 'WRECKING BALL', 'PHARAH', 'ROADHOG', 'ECHO'] },
  '2087': { id: '2087', name: 'Circuit Royal',       type: 'Escort',   goodHeroes: ['SOLDIER: 76', 'WIDOWMAKER', 'PHARAH', 'BASTION', 'ORISA'] },
  '707':  { id: '707',  name: 'Dorado',              type: 'Escort',   goodHeroes: ['PHARAH', 'SOLDIER: 76', 'REINHARDT', 'LUCIO', 'BAPTISTE'] },
  '2628': { id: '2628', name: 'Havana',              type: 'Escort',   goodHeroes: ['WIDOWMAKER', 'SOLDIER: 76', 'PHARAH', 'ECHO', 'HANZO'] },
  '1878': { id: '1878', name: 'Junkertown',          type: 'Escort',   goodHeroes: ['SOLDIER: 76', 'JUNKRAT', 'BASTION', 'REINHARDT', 'ZARYA'] },
  '2161': { id: '2161', name: 'Rialto',              type: 'Escort',   goodHeroes: ['PHARAH', 'SOLDIER: 76', 'HANZO', 'ASHE', 'WIDOWMAKER'] },
  '1467': { id: '1467', name: 'Route 66',            type: 'Escort',   goodHeroes: ['BASTION', 'REINHARDT', 'SOLDIER: 76', 'ANA', 'SIGMA'] },
  '3205': { id: '3205', name: 'Shambali Monastery',  type: 'Escort',   goodHeroes: ['PHARAH', 'ECHO', 'WIDOWMAKER', 'ORISA', 'MERCY'] },
  '388':  { id: '388',  name: 'Watchpoint: Gibraltar', type: 'Escort', goodHeroes: ['PHARAH', 'SOLDIER: 76', 'BASTION', 'REINHARDT', 'ANA'] },
  '1886': { id: '1886', name: 'Blizzard World',      type: 'Hybrid',   goodHeroes: ['PHARAH', 'MERCY', 'REINHARDT', 'SOLDIER: 76', 'ZARYA'] },
  '2651': { id: '2651', name: 'Blizzard World Winter', type: 'Hybrid', goodHeroes: ['PHARAH', 'MERCY', 'REINHARDT', 'SOLDIER: 76', 'ZARYA'] },
  '1677': { id: '1677', name: 'Eichenwalde',         type: 'Hybrid',   goodHeroes: ['REINHARDT', 'PHARAH', 'WIDOWMAKER', 'HANZO', 'ANA'] },
  '2036': { id: '2036', name: 'Eichenwalde Halloween', type: 'Hybrid', goodHeroes: ['REINHARDT', 'PHARAH', 'WIDOWMAKER', 'HANZO', 'ANA'] },
  '687':  { id: '687',  name: 'Hollywood',           type: 'Hybrid',   goodHeroes: ['TRACER', 'GENJI', 'DVA', 'WINSTON', 'KIRIKO'] },
  '1707': { id: '1707', name: 'Hollywood Halloween', type: 'Hybrid',   goodHeroes: ['TRACER', 'GENJI', 'DVA', 'WINSTON', 'KIRIKO'] },
  '212':  { id: '212',  name: "King's Row",          type: 'Hybrid',   goodHeroes: ['REAPER', 'REINHARDT', 'ZARYA', 'MOIRA', 'LUCIO'] },
  '1713': { id: '1713', name: "King's Row Winter",   type: 'Hybrid',   goodHeroes: ['REAPER', 'REINHARDT', 'ZARYA', 'MOIRA', 'LUCIO'] },
  '2892': { id: '2892', name: 'Midtown',             type: 'Hybrid',   goodHeroes: ['PHARAH', 'SOLDIER: 76', 'ECHO', 'BRIGITTE', 'MERCY'] },
  '468':  { id: '468',  name: 'Numbani',             type: 'Hybrid',   goodHeroes: ['TRACER', 'ECHO', 'WINSTON', 'DVA', 'BAPTISTE'] },
  '2360': { id: '2360', name: 'Paraíso',             type: 'Hybrid',   goodHeroes: ['PHARAH', 'LUCIO', 'ECHO', 'SOLDIER: 76', 'ANA'] },
  '4439': { id: '4439', name: 'Hanaoka',             type: 'Hybrid',   goodHeroes: ['GENJI', 'KIRIKO', 'HANZO', 'TRACER', 'WINSTON'] },
  '2868': { id: '2868', name: 'Colosseo',            type: 'Push',     goodHeroes: ['LUCIO', 'WRECKING BALL', 'PHARAH', 'ECHO', 'BAPTISTE'] },
  '3411': { id: '3411', name: 'Esperança',           type: 'Push',     goodHeroes: ['PHARAH', 'MERCY', 'SOLDIER: 76', 'ECHO', 'KIRIKO'] },
  '2795': { id: '2795', name: 'New Queen Street',    type: 'Push',     goodHeroes: ['REINHARDT', 'REAPER', 'MOIRA', 'LUCIO', 'JUNKRAT'] },
  '3762': { id: '3762', name: 'Runasapi',            type: 'Push',     goodHeroes: ['LUCIO', 'WRECKING BALL', 'TRACER', 'GENJI', 'KIRIKO'] },
  '3603': { id: '3603', name: 'New Junk City',       type: 'Flashpoint', goodHeroes: ['JUNKRAT', 'ROADHOG', 'JUNKER QUEEN', 'REAPER', 'MOIRA'] },
  '3390': { id: '3390', name: 'Suravasa',            type: 'Flashpoint', goodHeroes: ['PHARAH', 'MERCY', 'ANA', 'HANZO', 'CASSIDY'] },
  '4448': { id: '4448', name: 'Throne of Anubis',    type: 'Clash',    goodHeroes: ['SYMMETRA', 'BASTION', 'ORISA', 'REINHARDT', 'MOIRA'] },
};

export function getMapName(mapId: string): string {
  return OW_MAPS[mapId]?.name ?? `Unknown Map (${mapId})`;
}

export function getMapType(mapId: string): string {
  return OW_MAPS[mapId]?.type ?? 'Unknown';
}

export function getGoodHeroesForMap(mapId: string): string[] {
  return OW_MAPS[mapId]?.goodHeroes ?? [];
}
