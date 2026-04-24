// ─── VisionWatch — Overwatch companion app ────────────────────────────────
// Supports only Overwatch (class ID 10844).

export const kOWClassId = 10844;

// GEP features to subscribe to for Overwatch
export const kOWFeatures: string[] = [
  'gep_internal',
  'game_info',
  'match_info',
  'kill',
  'death',
  'assist',
  'roster'
];

export const kGamesFeatures = new Map<number, string[]>([
  [kOWClassId, kOWFeatures]
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame:  'in_game',
  desktop: 'desktop'
};

// Hotkeys registered in manifest.json
export const kHotkeys = {
  toggle: 'vw_toggle_overlay'
};
