import { getWeaponPoolId, type Weapon } from "@/domain";
import { VISIBLE_ITEMS } from "./constants";

export function buildIdleSequence(weapons: Weapon[]): Weapon[] {
  if (weapons.length === 0) return [];
  if (weapons.length >= VISIBLE_ITEMS) return weapons;

  const sequence = [...weapons];
  while (sequence.length < VISIBLE_ITEMS) {
    sequence.push(...weapons);
  }
  return sequence;
}

export function buildReelSequence(
  weapons: Weapon[],
  winner: Weapon,
  cycles: number
): { sequence: Weapon[]; winnerIndex: number } {
  const winnerIndex = weapons.findIndex(
    (weapon) => weapon.id === getWeaponPoolId(winner)
  );

  if (winnerIndex === -1) {
    return { sequence: buildIdleSequence(weapons), winnerIndex: 0 };
  }

  const sequence: Weapon[] = [];
  const totalLength = weapons.length * cycles + winnerIndex + 1;

  for (let i = 0; i < totalLength; i++) {
    sequence.push(weapons[i % weapons.length]);
  }

  const winnerSequenceIndex = sequence.length - 1;

  for (let i = 1; i <= 2; i++) {
    sequence.push(weapons[(winnerIndex + i) % weapons.length]);
  }

  return { sequence, winnerIndex: winnerSequenceIndex };
}
