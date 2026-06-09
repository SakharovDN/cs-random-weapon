"use client";

import { getWeaponPoolId, type Weapon } from "@/domain";
import { useTranslations } from "next-intl";
import { ITEM_HEIGHT, REEL_HEIGHT } from "./constants";
import { useSlotReel } from "./useSlotReel";
import { WeaponReelItem } from "./WeaponReelItem";
import { WinnerOverlay } from "./WinnerOverlay";

interface SlotMachineProps {
  weapons: Weapon[];
  winner: Weapon | null;
  spinning: boolean;
  spinId: number;
  filterKey: string;
  onSpinComplete?: () => void;
}

export function SlotMachine({
  weapons,
  winner,
  spinning,
  spinId,
  filterKey,
  onSpinComplete,
}: SlotMachineProps) {
  const t = useTranslations("slot");
  const {
    displayOffset,
    reelTransition,
    isAnimating,
    showWinner,
    sequenceToRender,
    handleReelTransitionEnd,
  } = useSlotReel({ weapons, winner, spinning, spinId, filterKey, onSpinComplete });

  if (weapons.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/50 text-slate-500"
        style={{ height: REEL_HEIGHT }}
      >
        {t("noWeapons")}
      </div>
    );
  }

  const winnerInPool =
    showWinner &&
    winner &&
    weapons.some((weapon) => weapon.id === getWeaponPoolId(winner));

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div
        className={[
          "relative overflow-hidden rounded-2xl border-2 bg-gradient-to-b from-slate-900 to-slate-950",
          showWinner ? "slot-winner border-amber-400" : "border-slate-700",
        ].join(" ")}
        style={{ height: REEL_HEIGHT }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-slate-950 to-transparent" />

        <div
          className="pointer-events-none absolute inset-x-0 z-20 border-y-2 border-amber-400/60 bg-amber-400/5"
          style={{ top: ITEM_HEIGHT, height: ITEM_HEIGHT }}
        />

        <div className="overflow-hidden" style={{ height: REEL_HEIGHT }}>
          <div
            className={["reel-track", isAnimating ? "reel-track-spinning" : ""].join(" ")}
            onTransitionEnd={handleReelTransitionEnd}
            style={{
              transform: `translate3d(0, -${displayOffset}px, 0)`,
              transition: reelTransition,
            }}
          >
            {sequenceToRender.map((weapon, index) => (
              <WeaponReelItem key={`${weapon.id}-${index}`} weapon={weapon} />
            ))}
          </div>
        </div>

        {winnerInPool && winner && <WinnerOverlay weapon={winner} />}
      </div>

      <p className="mt-3 text-center text-xs uppercase tracking-widest text-slate-500">
        {t("weaponsInPool", { count: weapons.length })}
      </p>
    </div>
  );
}
