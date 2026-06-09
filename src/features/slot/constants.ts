export const ITEM_HEIGHT = 96;
export const VISIBLE_ITEMS = 3;
export const REEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
export const REEL_EASING = "cubic-bezier(0.12, 0.8, 0.2, 1)";

export function getSpinDuration(weaponCount: number): number {
  return 2800 + Math.min(weaponCount * 80, 1200);
}

export function getSpinCycles(weaponCount: number): number {
  return Math.max(3, Math.min(6, 4 + Math.floor(weaponCount / 8)));
}

export function getWinnerStopOffset(winnerIndex: number): number {
  return Math.max(0, winnerIndex * ITEM_HEIGHT - ITEM_HEIGHT);
}
