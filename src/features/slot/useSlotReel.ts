"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Weapon } from "@/domain";
import {
  getSpinCycles,
  getSpinDuration,
  getWinnerStopOffset,
  REEL_EASING,
} from "./constants";
import { buildIdleSequence, buildReelSequence } from "./reelSequence";

interface UseSlotReelOptions {
  weapons: Weapon[];
  winner: Weapon | null;
  spinning: boolean;
  spinId: number;
  filterKey: string;
  onSpinComplete?: () => void;
}

export function useSlotReel({
  weapons,
  winner,
  spinning,
  spinId,
  filterKey,
  onSpinComplete,
}: UseSlotReelOptions) {
  const [displayOffset, setDisplayOffset] = useState(0);
  const [reelTransition, setReelTransition] = useState("none");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [activeSequence, setActiveSequence] = useState<Weapon[]>([]);

  const lastSpinIdRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const completedSpinIdRef = useRef(0);
  const onCompleteRef = useRef(onSpinComplete);

  onCompleteRef.current = onSpinComplete;

  const idleSequence = useMemo(() => buildIdleSequence(weapons), [weapons]);

  const resetReel = useCallback(() => {
    setDisplayOffset(0);
    setReelTransition("none");
    isAnimatingRef.current = false;
    setIsAnimating(false);
    setShowWinner(false);
    setActiveSequence(idleSequence);
  }, [idleSequence]);

  useEffect(() => {
    resetReel();
    lastSpinIdRef.current = 0;
  }, [filterKey, resetReel]);

  useEffect(() => {
    if (!showWinner && !isAnimating && !spinning) {
      setActiveSequence(idleSequence);
      setDisplayOffset(0);
      setReelTransition("none");
    }
  }, [idleSequence, showWinner, isAnimating, spinning]);

  useEffect(() => {
    if (!spinning || !winner || weapons.length === 0 || spinId === 0) return;
    if (spinId === lastSpinIdRef.current) return;

    lastSpinIdRef.current = spinId;

    const cycles = getSpinCycles(weapons.length);
    const { sequence, winnerIndex } = buildReelSequence(weapons, winner, cycles);
    const targetOffset = getWinnerStopOffset(winnerIndex);
    const duration = getSpinDuration(weapons.length);

    setShowWinner(false);
    isAnimatingRef.current = true;
    setIsAnimating(true);
    setActiveSequence(sequence);
    setDisplayOffset(0);
    setReelTransition("none");

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setReelTransition(`transform ${duration}ms ${REEL_EASING}`);
        setDisplayOffset(targetOffset);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [spinId, spinning, winner, weapons]);

  const finishSpin = useCallback(() => {
    if (completedSpinIdRef.current === lastSpinIdRef.current) return;

    completedSpinIdRef.current = lastSpinIdRef.current;
    isAnimatingRef.current = false;
    setIsAnimating(false);
    setReelTransition("none");
    setShowWinner(true);
    onCompleteRef.current?.();
  }, []);

  const handleReelTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (event.propertyName !== "transform") return;
      if (!isAnimatingRef.current) return;
      finishSpin();
    },
    [finishSpin]
  );

  const sequenceToRender = activeSequence.length > 0 ? activeSequence : idleSequence;

  return {
    displayOffset,
    reelTransition,
    isAnimating,
    showWinner,
    sequenceToRender,
    handleReelTransitionEnd,
  };
}
