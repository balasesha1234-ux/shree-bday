import { useState, useEffect, useCallback, useRef } from 'react';

export type TapTarget = 'cat' | 'star' | 'heart';

interface UseTapSequenceProps {
  onUnlock: () => void;
  resetTimeoutMs?: number;
}

export function useTapSequence({ onUnlock, resetTimeoutMs = 30000 }: UseTapSequenceProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [lastTapped, setLastTapped] = useState<TapTarget | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [feedbackEffect, setFeedbackEffect] = useState<{ x: number; y: number; type: TapTarget } | null>(null);
  const [isHoldingHeart, setIsHoldingHeart] = useState<boolean>(false);
  const [heartHoldProgress, setHeartHoldProgress] = useState<number>(0);

  const holdIntervalRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  const resetSequence = useCallback(() => {
    setCurrentStep(0);
    setLastTapped(null);
    setIsUnlocked(false);
    setIsHoldingHeart(false);
    setHeartHoldProgress(0);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (currentStep === 0 || isUnlocked) return;

    const timer = setTimeout(() => {
      resetSequence();
    }, resetTimeoutMs);

    return () => clearTimeout(timer);
  }, [currentStep, isUnlocked, resetTimeoutMs, resetSequence]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const handleTap = useCallback((target: TapTarget, event?: React.MouseEvent) => {
    if (isUnlocked) return;

    if (event) {
      setFeedbackEffect({
        x: event.clientX,
        y: event.clientY,
        type: target
      });
      setTimeout(() => setFeedbackEffect(null), 1000);
    }

    // Step 0: Cat 🐱
    if (target === 'cat' && currentStep === 0) {
      setCurrentStep(1);
      setLastTapped('cat');
      if ('vibrate' in navigator) {
        try { navigator.vibrate(40); } catch (_) {}
      }
    }
    // Step 1: Star ⭐
    else if (target === 'star' && currentStep === 1) {
      setCurrentStep(2);
      setLastTapped('star');
      if ('vibrate' in navigator) {
        try { navigator.vibrate(50); } catch (_) {}
      }
    }
    // Step 2: Heart tapped without holding -> Innocent Decoy!
    else if (target === 'heart') {
      // Normal click on heart: just innocent feedback, does NOT unlock!
      // Unlocking requires 3-second hold via startHeartHold
      if (currentStep !== 2) {
        resetSequence();
      }
    } else {
      resetSequence();
    }
  }, [currentStep, isUnlocked, resetSequence]);

  // 3-Second Hold on Heart (Option B)
  const startHeartHold = useCallback(() => {
    if (isUnlocked || currentStep !== 2) return;

    setIsHoldingHeart(true);
    setHeartHoldProgress(0);
    holdStartTimeRef.current = Date.now();

    const HOLD_DURATION_MS = 3000;

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      if (!holdStartTimeRef.current) return;
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_DURATION_MS) * 100);
      setHeartHoldProgress(progress);

      if (elapsed >= HOLD_DURATION_MS) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
        setIsHoldingHeart(false);
        setHeartHoldProgress(100);
        setIsUnlocked(true);
        setCurrentStep(3);

        if ('vibrate' in navigator) {
          try {
            navigator.vibrate([100, 50, 200]);
          } catch (_) {}
        }
        onUnlock();
      }
    }, 25);
  }, [isUnlocked, currentStep, onUnlock]);

  const cancelHeartHold = useCallback(() => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    setIsHoldingHeart(false);
    setHeartHoldProgress(0);
  }, []);

  return {
    currentStep,
    lastTapped,
    isUnlocked,
    handleTap,
    resetSequence,
    feedbackEffect,
    isHoldingHeart,
    heartHoldProgress,
    startHeartHold,
    cancelHeartHold,
    totalSteps: 3
  };
}
