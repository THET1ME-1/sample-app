export type HeroRole = 'Tank' | 'DPS' | 'Support';
export type HeroDifficulty = 1 | 2 | 3;

export interface HeroInfo {
  name: string;           // GEP name (uppercase)
  displayName: string;
  role: HeroRole;
  difficulty: HeroDifficulty;
  counters: string[];     // Heroes this hero is strong against
  counteredBy: string[];  // Heroes that counter this hero
  tips: string[];
}

export const HEROES: HeroInfo[] = [
  // ─── TANKS ─────────────────────────────────────────────────────────────────
  {
    name: 'DVA', displayName: 'D.Va', role: 'Tank', difficulty: 1,
    counters: ['PHARAH', 'ECHO', 'WIDOWMAKER', 'TRACER'],
    counteredBy: ['ZARYA', 'ROADHOG', 'REAPER', 'BASTION'],
    tips: ['Используй Defense Matrix для поглощения вражеских снарядов', 'Самоподрыв в узких местах', 'Быстро вызывай меха после смерти']
  },
  {
    name: 'ORISA', displayName: 'Orisa', role: 'Tank', difficulty: 1,
    counters: ['PHARAH', 'TORBJÖRN', 'SYMMETRA', 'BASTION'],
    counteredBy: ['SOMBRA', 'REAPER', 'GENJI', 'MOIRA'],
    tips: ['Fortify спасает от бёрстового урона', 'Копьё прерывает вражеские ульты', 'Spin блокирует снаряды']
  },
  {
    name: 'REINHARDT', displayName: 'Reinhardt', role: 'Tank', difficulty: 1,
    counters: ['TRACER', 'GENJI', 'REAPER', 'SYMMETRA'],
    counteredBy: ['PHARAH', 'JUNKRAT', 'BASTION', 'SOMBRA'],
    tips: ['Щит — жизнь всей команды', 'Удар огнём при каждом откате', 'Землетрясение из-за угла']
  },
  {
    name: 'ROADHOG', displayName: 'Roadhog', role: 'Tank', difficulty: 1,
    counters: ['TRACER', 'GENJI', 'WINSTON', 'LUCIO'],
    counteredBy: ['DVA', 'SOMBRA', 'ZARYA', 'BRIGITTE'],
    tips: ['Крюй цели вне позиции', 'Лечись пока щиты сломаны', 'Крюк → дробовик → удар = мгновенная смерть']
  },
  {
    name: 'SIGMA', displayName: 'Sigma', role: 'Tank', difficulty: 2,
    counters: ['PHARAH', 'JUNKRAT', 'HANZO', 'SOLDIER: 76'],
    counteredBy: ['REAPER', 'DVA', 'TRACER', 'GENJI'],
    tips: ['Барьер летает — ставь его нестандартно', 'Камень глушит ключевые цели', 'Кинетический захват — против снарядных ульт']
  },
  {
    name: 'WINSTON', displayName: 'Winston', role: 'Tank', difficulty: 2,
    counters: ['TRACER', 'GENJI', 'WIDOWMAKER', 'HANZO', 'SOMBRA'],
    counteredBy: ['REAPER', 'BASTION', 'MOIRA', 'JUNKRAT'],
    tips: ['Прыгай на тыловых хилеров', 'Пузырь себя под фокус-огнём', 'Первобытная ярость разрушает позиции']
  },
  {
    name: 'WRECKING BALL', displayName: 'Wrecking Ball', role: 'Tank', difficulty: 3,
    counters: ['TRACER', 'SYMMETRA', 'TORBJÖRN', 'GROUPED ENEMIES'],
    counteredBy: ['SOMBRA', 'ORISA', 'ROADHOG', 'CASSIDY'],
    tips: ['Разгонись перед атакой', 'Piledriver разбрасывает сгруппированных врагов', 'Адаптивный щит под фокусом']
  },
  {
    name: 'ZARYA', displayName: 'Zarya', role: 'Tank', difficulty: 2,
    counters: ['DVA', 'WRECKING BALL', 'TRACER', 'GENJI'],
    counteredBy: ['WINSTON', 'SOMBRA', 'SOLDIER: 76', 'CASSIDY'],
    tips: ['Пузырь союзников при низком HP для заряда', 'Высокозаряженный луч плавит щиты', 'Гравитон + ульта союзника = вайп']
  },
  {
    name: 'DOOMFIST', displayName: 'Doomfist', role: 'Tank', difficulty: 3,
    counters: ['WIDOWMAKER', 'HANZO', 'ANA', 'SUPPORTS'],
    counteredBy: ['ORISA', 'PHARAH', 'ANA', 'CASSIDY'],
    tips: ['Накопи Power Block для усиленного удара', 'Сейсмический удар на возвышенность', 'Метеоритный удар = репозиция + неуязвимость']
  },
  {
    name: 'JUNKER QUEEN', displayName: 'Junker Queen', role: 'Tank', difficulty: 2,
    counters: ['ROADHOG', 'MOIRA', 'LUCIO', 'TRACER'],
    counteredBy: ['PHARAH', 'BRIGITTE', 'ANA', 'CASSIDY'],
    tips: ['Будь агрессивен для пассивного лечения', 'Carnage ранит нескольких', 'Rampage отменяет вражеское лечение']
  },
  {
    name: 'RAMATTRA', displayName: 'Ramattra', role: 'Tank', difficulty: 2,
    counters: ['SYMMETRA', 'BASTION', 'REINHARDT', 'SOLDIER: 76'],
    counteredBy: ['REAPER', 'DVA', 'SOMBRA', 'TRACER'],
    tips: ['Переключайся между формами стратегически', 'Void Barrier блокирует линии обстрела', 'Annihilation лучше против скученных врагов']
  },
  {
    name: 'MAUGA', displayName: 'Mauga', role: 'Tank', difficulty: 1,
    counters: ['BASTION', 'ORISA', 'REAPER', 'BUNKER COMP'],
    counteredBy: ['PHARAH', 'SOMBRA', 'ANA', 'CASSIDY'],
    tips: ['Чередуй пулемёты для самолечения', 'Cage Fight запирает хилеров', 'Cardiac Overdrive помогает команде выжить под бёрстом']
  },
  // ─── DPS ───────────────────────────────────────────────────────────────────
  {
    name: 'ASHE', displayName: 'Ashe', role: 'DPS', difficulty: 2,
    counters: ['REINHARDT', 'TORBJÖRN', 'SYMMETRA', 'MOIRA'],
    counteredBy: ['TRACER', 'WINSTON', 'DVA', 'GENJI'],
    tips: ['Стрельба от бедра на средней дистанции, прицел — на дальней', 'Боб занимает дверные проёмы', 'Динамит + выстрел в голову = огромный бёрст']
  },
  {
    name: 'BASTION', displayName: 'Bastion', role: 'DPS', difficulty: 1,
    counters: ['REINHARDT', 'ORISA', 'ZARYA', 'SIGMA'],
    counteredBy: ['TRACER', 'GENJI', 'SOMBRA', 'PHARAH'],
    tips: ['Режим Assault разносит танков', 'Артиллерийская ульта — вручную по скоплениям', 'Оставайся мобильным в режиме Разведки']
  },
  {
    name: 'CASSIDY', displayName: 'Cassidy', role: 'DPS', difficulty: 1,
    counters: ['TRACER', 'GENJI', 'WRECKING BALL', 'FLANKERS'],
    counteredBy: ['WINSTON', 'DVA', 'PHARAH', 'ECHO'],
    tips: ['Combat Roll перезаряжает в бою', 'Магнитная граната — отличный бёрст-инструмент', 'Веер на близкой дистанции']
  },
  {
    name: 'ECHO', displayName: 'Echo', role: 'DPS', difficulty: 3,
    counters: ['REINHARDT', 'TORBJÖRN', 'SYMMETRA', 'ANA'],
    counteredBy: ['WINSTON', 'DVA', 'ROADHOG', 'CASSIDY'],
    tips: ['Дублируй Roadhog или Zarya для максимального эффекта', 'Focusing Beam — двойной урон по раненым', 'Glide bomb на скопления']
  },
  {
    name: 'GENJI', displayName: 'Genji', role: 'DPS', difficulty: 3,
    counters: ['WIDOWMAKER', 'HANZO', 'SUPPORTS', 'ANA'],
    counteredBy: ['CASSIDY', 'REAPER', 'ROADHOG', 'BRIGITTE'],
    tips: ['Отражай вражеские ульты', 'Рывок сбрасывается на убийстве', 'Клинок + Нано = самый высокий бёрст в игре']
  },
  {
    name: 'HANZO', displayName: 'Hanzo', role: 'DPS', difficulty: 2,
    counters: ['REINHARDT', 'ZARYA', 'ORISA', 'SIGMA'],
    counteredBy: ['TRACER', 'WINSTON', 'DVA', 'GENJI'],
    tips: ['Штормовые стрелы для бёрста по танкам', 'Sonic Arrow выявляет фланкеров', 'Дракон через узкие места']
  },
  {
    name: 'JUNKRAT', displayName: 'Junkrat', role: 'DPS', difficulty: 1,
    counters: ['REINHARDT', 'ORISA', 'GROUPED ENEMIES', 'TORBJÖRN'],
    counteredBy: ['PHARAH', 'SOLDIER: 76', 'WINSTON', 'ROADHOG'],
    tips: ['Спам гранат в коридорах', 'Стальной капкан на фланкеров', 'RIP-Tire через барьеры']
  },
  {
    name: 'MEI', displayName: 'Mei', role: 'DPS', difficulty: 2,
    counters: ['TRACER', 'GENJI', 'DIVE COMP', 'FLANKERS'],
    counteredBy: ['PHARAH', 'ROADHOG', 'SOLDIER: 76', 'WIDOWMAKER'],
    tips: ['Крио-заморозка спасает от смерти', 'Стена разделяет вражескую команду', 'Blizzard + Graviton = гарантированный вайп']
  },
  {
    name: 'PHARAH', displayName: 'Pharah', role: 'DPS', difficulty: 2,
    counters: ['REINHARDT', 'TORBJÖRN', 'SYMMETRA', 'JUNKRAT'],
    counteredBy: ['SOLDIER: 76', 'CASSIDY', 'ECHO', 'WIDOWMAKER'],
    tips: ['Держись в воздухе подальше от наземных врагов', 'Concussive Blast сбрасывает с точек', 'Barrage в закрытых пространствах']
  },
  {
    name: 'REAPER', displayName: 'Reaper', role: 'DPS', difficulty: 1,
    counters: ['WINSTON', 'DVA', 'ZARYA', 'TANKS'],
    counteredBy: ['PHARAH', 'BRIGITTE', 'REINHARDT', 'BAPTISTE'],
    tips: ['Wraith Form для выхода из-под фокуса', 'Shadow Step для фланков', 'Death Blossom в группе танков']
  },
  {
    name: 'SOJOURN', displayName: 'Sojourn', role: 'DPS', difficulty: 2,
    counters: ['WIDOWMAKER', 'TANKS', 'SIGMA', 'ORISA'],
    counteredBy: ['WINSTON', 'DVA', 'TRACER', 'GENJI'],
    tips: ['Накопи заряд основным огнём, затем рельсотрон', 'Overclock = авто-заряд — используй с мобильностью', 'Power Slide для репозиции']
  },
  {
    name: 'SOLDIER: 76', displayName: 'Soldier: 76', role: 'DPS', difficulty: 1,
    counters: ['PHARAH', 'ZARYA', 'REINHARDT', 'ORISA'],
    counteredBy: ['WINSTON', 'TRACER', 'GENJI', 'SOMBRA'],
    tips: ['Helix Rockets в комбо с обычным огнём', 'Биотическое поле для длинных боёв', 'Tactical Visor = надёжная тимфайт-ульта']
  },
  {
    name: 'SOMBRA', displayName: 'Sombra', role: 'DPS', difficulty: 3,
    counters: ['WRECKING BALL', 'DVA', 'WINSTON', 'HIGH-HP TARGETS'],
    counteredBy: ['CASSIDY', 'DVA', 'GENJI', 'ZARYA'],
    tips: ['Хак отключает способности и пассивки', 'Транслокатор — готовь путь к отступлению', 'EMP при 75% ульты — жди пока враги используют ключевые способности']
  },
  {
    name: 'SYMMETRA', displayName: 'Symmetra', role: 'DPS', difficulty: 1,
    counters: ['REINHARDT', 'ROADHOG', 'GROUPED ENEMIES', 'TORBJÖRN'],
    counteredBy: ['PHARAH', 'SOMBRA', 'TRACER', 'REAPER'],
    tips: ['Телепорт для защиты точки', 'Турели обнаруживают фланкеров', 'Основной луч нарастает на щитах и броне']
  },
  {
    name: 'TORBJÖRN', displayName: 'Torbjörn', role: 'DPS', difficulty: 1,
    counters: ['REINHARDT', 'GROUPED ENEMIES', 'DIVE COMP', 'DVA'],
    counteredBy: ['PHARAH', 'SOMBRA', 'BASTION', 'HANZO'],
    tips: ['Турель позволяет играть агрессивнее', 'Overload для дуэлей', 'Molten Core останавливает дайв-танков']
  },
  {
    name: 'TRACER', displayName: 'Tracer', role: 'DPS', difficulty: 3,
    counters: ['WIDOWMAKER', 'HANZO', 'ZENYATTA', 'ANA'],
    counteredBy: ['CASSIDY', 'REAPER', 'BRIGITTE', 'MOIRA'],
    tips: ['Blink — основной инструмент выживания', 'Recall возвращает HP и репозиционирует', 'Pulse Bomb на танков или скопления']
  },
  {
    name: 'VENTURE', displayName: 'Venture', role: 'DPS', difficulty: 2,
    counters: ['GROUPED ENEMIES', 'REINHARDT', 'ROADHOG', 'BASTION'],
    counteredBy: ['CASSIDY', 'DVA', 'ROADHOG', 'ORISA'],
    tips: ['Burrow = репозиция и внезапность', 'Clobber подбрасывает врагов', 'Tectonic Shock — широкий вертикальный охват']
  },
  {
    name: 'WIDOWMAKER', displayName: 'Widowmaker', role: 'DPS', difficulty: 3,
    counters: ['ANA', 'ZENYATTA', 'SUPPORTS', 'HANZO'],
    counteredBy: ['TRACER', 'WINSTON', 'DVA', 'GENJI'],
    tips: ['Крюк на возвышенность сразу', 'Venom Mine раскрывает фланкеров', 'Infra-sight даёт видение всей команде']
  },
  // ─── SUPPORT ───────────────────────────────────────────────────────────────
  {
    name: 'ANA', displayName: 'Ana', role: 'Support', difficulty: 3,
    counters: ['REINHARDT', 'ZARYA', 'DVA', 'TANKS'],
    counteredBy: ['GENJI', 'TRACER', 'WINSTON', 'FLANKERS'],
    tips: ['Дротик сна на вражескую ульту в момент каста', 'Нано на Genji или Reaper = мгновенный вайп', 'Анти-хил граната блокирует лечение']
  },
  {
    name: 'BAPTISTE', displayName: 'Baptiste', role: 'Support', difficulty: 2,
    counters: ['PHARAH', 'SOLDIER: 76', 'DAMAGE COMP', 'REINHARDT'],
    counteredBy: ['SOMBRA', 'GENJI', 'TRACER', 'WINSTON'],
    tips: ['Immortality Field предотвращает ваншоты', 'Amplification Matrix удваивает урон снарядами', 'Exo Boots для доступа на возвышенность']
  },
  {
    name: 'BRIGITTE', displayName: 'Brigitte', role: 'Support', difficulty: 1,
    counters: ['TRACER', 'GENJI', 'REAPER', 'DIVE COMP'],
    counteredBy: ['PHARAH', 'SOMBRA', 'GENJI', 'HANZO'],
    tips: ['Shield Bash глушит фланкеров на рывке', 'Inspire активируется ударами в ближнем бою', 'Rally броня накапливается заранее']
  },
  {
    name: 'ILLARI', displayName: 'Illari', role: 'Support', difficulty: 1,
    counters: ['ORISA', 'SIGMA', 'POKE COMP', 'REINHARDT'],
    counteredBy: ['TRACER', 'WINSTON', 'DVA', 'SOMBRA'],
    tips: ['Ставь Pylон в безопасное возвышенное место', 'Стреляй и лечи с дистанции', 'Captive Sun лучше по скоплениям']
  },
  {
    name: 'KIRIKO', displayName: 'Kiriko', role: 'Support', difficulty: 3,
    counters: ['DVA', 'ROADHOG', 'SOMBRA', 'ORISA'],
    counteredBy: ['ROADHOG', 'CASSIDY', 'SOMBRA', 'REAPER'],
    tips: ['Suzu очищает антихил, сон и другие дебаффы', 'Телепорт к союзнику в опасности', 'Kitsune Rush ускоряет откаты — береги для тимфайта']
  },
  {
    name: 'LIFEWEAVER', displayName: 'Lifeweaver', role: 'Support', difficulty: 2,
    counters: ['REINHARDT', 'DIVE COMP', 'DOOMFIST', 'WRECKING BALL'],
    counteredBy: ['TRACER', 'WINSTON', 'GENJI', 'FLANKERS'],
    tips: ['Life Grip спасает от бёрстового урона', 'Tree of Life блокирует линии обстрела', 'Rejuvenating Dash — единственный побег, используй мудро']
  },
  {
    name: 'LUCIO', displayName: 'Lúcio', role: 'Support', difficulty: 2,
    counters: ['REAPER', 'SYMMETRA', 'WRECKING BALL', 'ROADHOG'],
    counteredBy: ['CASSIDY', 'SOMBRA', 'REAPER', 'TRACER'],
    tips: ['Speed boost для критических пушей', 'Wall-ride для выживания', 'Sound Barrier превентивно перед вражескими ультами']
  },
  {
    name: 'MERCY', displayName: 'Mercy', role: 'Support', difficulty: 1,
    counters: ['PHARAH', 'ECHO', 'ANA', 'LONG-RANGE COMP'],
    counteredBy: ['TRACER', 'SOMBRA', 'WINSTON', 'GENJI'],
    tips: ['Усиление урона для Pharah или Ashe', 'Воскрешение через Guardian Angel', 'Valkyrie позволяет лечить всю команду цепью']
  },
  {
    name: 'MOIRA', displayName: 'Moira', role: 'Support', difficulty: 1,
    counters: ['TRACER', 'GENJI', 'DIVE COMP', 'WINSTON'],
    counteredBy: ['SOMBRA', 'CASSIDY', 'REAPER', 'ROADHOG'],
    tips: ['Фиолетовые сферы блокируют вражеское лечение', 'Fade спасает от хака Sombra', 'Coalescence прожигает щиты — используй в тимфайте']
  },
  {
    name: 'ZENYATTA', displayName: 'Zenyatta', role: 'Support', difficulty: 2,
    counters: ['ARMOR TANKS', 'ROADHOG', 'ORISA', 'WINSTON'],
    counteredBy: ['TRACER', 'GENJI', 'WINSTON', 'FLANKERS'],
    tips: ['Discord Orb на танка для разрушения брони', 'Harmony Orb самому уязвимому союзнику', 'Transcendence контрит AOE ульты']
  },
  // ─── NEW HEROES ────────────────────────────────────────────────────────────
  {
    name: 'JUNO', displayName: 'Juno', role: 'Support', difficulty: 2,
    counters: ['PHARAH', 'ECHO', 'AIR TARGETS', 'GROUPED ENEMIES'],
    counteredBy: ['TRACER', 'WINSTON', 'SOMBRA', 'DVA'],
    tips: ['Glide Boost для быстрого перемещения', 'Hyper Ring ускоряет союзников', 'Pulsar Torpedoes автонаводятся на врагов']
  },
  {
    name: 'HAZARD', displayName: 'Hazard', role: 'Tank', difficulty: 2,
    counters: ['TRACER', 'GENJI', 'DIVE COMP', 'FLANKERS'],
    counteredBy: ['PHARAH', 'SOMBRA', 'BASTION', 'SOLDIER: 76'],
    tips: ['Spike Guard наказывает ближний бой', 'Overclock усиливает все способности', 'Wall of Thorns блокирует проходы']
  },
  {
    name: 'FREJA', displayName: 'Freja', role: 'DPS', difficulty: 2,
    counters: ['ANA', 'WIDOWMAKER', 'SUPPORTS', 'DISTANT TARGETS'],
    counteredBy: ['WINSTON', 'DVA', 'TRACER', 'BRIGITTE'],
    tips: ['Используй крюк для быстрой смены позиции', 'Volley — мощный бёрст на средней дистанции', 'Bound — резкий уход от фокуса']
  },
  {
    name: 'MARVEL', displayName: 'Marvel', role: 'DPS', difficulty: 2,
    counters: ['REINHARDT', 'ORISA', 'BASTION', 'BUNKER COMP'],
    counteredBy: ['TRACER', 'WINSTON', 'DVA', 'GENJI'],
    tips: ['Высокий урон при дистанционной игре', 'Используй мобильность для выхода из-под огня']
  },
];

export const HERO_MAP: Record<string, HeroInfo> = {};
for (const hero of HEROES) {
  HERO_MAP[hero.name] = hero;
}

export function getHeroInfo(heroName: string): HeroInfo | undefined {
  if (!heroName) return undefined;
  return HERO_MAP[heroName.toUpperCase()];
}

export function getCountersForHero(heroName: string): string[] {
  return getHeroInfo(heroName)?.counters ?? [];
}

export function getCounteredByForHero(heroName: string): string[] {
  return getHeroInfo(heroName)?.counteredBy ?? [];
}

export function getHeroesByRole(role: HeroRole): HeroInfo[] {
  return HEROES.filter(h => h.role === role);
}

export function getDifficultyLabel(d: HeroDifficulty): string {
  return ['', 'Легко', 'Средне', 'Сложно'][d];
}

// ─── Hero icon paths (relative to dist/) ─────────────────────────────────────
export const HERO_ICONS: Record<string, string> = {
  // Tanks
  'DVA':           'assets/icon-heroes/Tank/Icon-D.png',
  'ORISA':         'assets/icon-heroes/Tank/Icon-Orisa.png',
  'REINHARDT':     'assets/icon-heroes/Tank/Icon-Reinhardt.png',
  'ROADHOG':       'assets/icon-heroes/Tank/Icon-Roadhog.png',
  'SIGMA':         'assets/icon-heroes/Tank/Icon-Sigma.png',
  'WINSTON':       'assets/icon-heroes/Tank/Icon-Winston.png',
  'WRECKING BALL': 'assets/icon-heroes/Tank/Icon-Wrecking Ball.png',
  'ZARYA':         'assets/icon-heroes/Tank/Icon-Zarya.png',
  'DOOMFIST':      'assets/icon-heroes/Tank/Icon-Doomfist.png',
  'JUNKER QUEEN':  'assets/icon-heroes/Tank/Icon-Junker Queen.png',
  'RAMATTRA':      'assets/icon-heroes/Tank/Icon-Ramattra.png',
  'MAUGA':         'assets/icon-heroes/Tank/Icon-Mauga.png',
  'HAZARD':        'assets/icon-heroes/Tank/Icon-Hazard.png',
  'DOMINA':        'assets/icon-heroes/Tank/Icon-Domina.png',
  // Damage
  'ASHE':          'assets/icon-heroes/Damage/Icon-Ashe.png',
  'BASTION':       'assets/icon-heroes/Damage/Icon-Bastion.png',
  'CASSIDY':       'assets/icon-heroes/Damage/Icon-Cassidy.png',
  'ECHO':          'assets/icon-heroes/Damage/Icon-Echo.png',
  'GENJI':         'assets/icon-heroes/Damage/Icon-Genji.png',
  'HANZO':         'assets/icon-heroes/Damage/Icon-Hanzo.png',
  'JUNKRAT':       'assets/icon-heroes/Damage/Icon-Junkrat.png',
  'MEI':           'assets/icon-heroes/Damage/Icon-Mei.png',
  'PHARAH':        'assets/icon-heroes/Damage/Icon-Pharah.png',
  'REAPER':        'assets/icon-heroes/Damage/Icon-Reaper.png',
  'SOJOURN':       'assets/icon-heroes/Damage/Icon-Sojourn.png',
  'SOLDIER: 76':   'assets/icon-heroes/Damage/Icon-Soldier 76.png',
  'SOMBRA':        'assets/icon-heroes/Damage/Icon-Sombra.png',
  'SYMMETRA':      'assets/icon-heroes/Damage/Icon-Symmetra.png',
  'TORBJÖRN':      'assets/icon-heroes/Damage/Icon-Torbjörn.png',
  'TRACER':        'assets/icon-heroes/Damage/Icon-Tracer.png',
  'VENTURE':       'assets/icon-heroes/Damage/Icon-Venture.png',
  'WIDOWMAKER':    'assets/icon-heroes/Damage/Icon-Widowmaker.png',
  'FREJA':         'assets/icon-heroes/Damage/Icon-Freja.png',
  'ANRAN':         'assets/icon-heroes/Damage/Icon-Anran.png',
  'EMRE':          'assets/icon-heroes/Damage/Icon-Emre.png',
  'SIERRA':        'assets/icon-heroes/Damage/Icon-Sierra.png',
  'VENDETTA':      'assets/icon-heroes/Damage/Icon-Vendetta.png',
  // Support
  'ANA':           'assets/icon-heroes/Support/Icon-Ana.png',
  'BAPTISTE':      'assets/icon-heroes/Support/Icon-Baptiste.png',
  'BRIGITTE':      'assets/icon-heroes/Support/Icon-Brigitte.png',
  'ILLARI':        'assets/icon-heroes/Support/Icon-Illari.png',
  'JUNO':          'assets/icon-heroes/Support/Icon-Juno.png',
  'KIRIKO':        'assets/icon-heroes/Support/Icon-kiriko.png',
  'LIFEWEAVER':    'assets/icon-heroes/Support/Icon-Lifeweaver.png',
  'LUCIO':         'assets/icon-heroes/Support/Icon-Lúcio.png',
  'MERCY':         'assets/icon-heroes/Support/Icon-Mercy.png',
  'MOIRA':         'assets/icon-heroes/Support/Icon-Moira.png',
  'ZENYATTA':      'assets/icon-heroes/Support/Icon-Zenyatta.png',
  'JETPACK CAT':   'assets/icon-heroes/Support/Icon-Jetpack Cat.png',
  'MIZUKI':        'assets/icon-heroes/Support/Icon-Mizuki.png',
  'WUYANG':        'assets/icon-heroes/Support/Icon-Wuyang.png',
};

export function getHeroIcon(heroName: string): string {
  return HERO_ICONS[heroName?.toUpperCase()] ?? '';
}
