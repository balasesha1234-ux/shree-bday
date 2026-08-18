import { useState, useEffect, useCallback } from 'react';

export type TapTarget = 'cat' | 'star' | 'heart';

interface UseTapSequenceProps {
  onUnlock: () => void;
  resetTimeoutMs?: number;
}

export function useTapSequence({ onUnlock, resetTimeoutMs = 5000 }: UseTapSequenceProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [lastTapped, setLastTapped] = useState<TapTarget | null>(null);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [feedbackEffect, setFeedbackEffect] = useState<{ x: number; y: number; type: TapTarget } | null>(null);

  const EXPECTED_SEQUENCE: TapTarget[] = ['cat', 'star', 'heart'];

  // Auto-reset sequence after timeout
  useEffect(() => {
    if (currentStep === 0 || isUnlocked) return;

    const timer = setTimeout(() => {
      setCurrentStep(0);
      setLastTapped(null);
    }, resetTimeoutMs);

    return () => clearTimeout(timer);
  }, [currentStep, isUnlocked, resetTimeoutMs]);

  const handleTap = useCallback((target: TapTarget, event?: React.MouseEvent) => {
    if (isUnlocked) return;

    // Trigger subtle sparkle position if event available
    if (event) {
      setFeedbackEffect({
        x: event.clientX,
        y: event.clientY,
        type: target
      });
      setTimeout(() => setFeedbackEffect(null), 1000);
    }

    if (target === EXPECTED_SEQUENCE[currentStep]) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setLastTapped(target);

      // Trigger soft vibration on supported mobile devices
      if ('vibrate' in navigator) {
        try {
          navigator.vibrate(50);
        } catch (_) {}
      }

      if (nextStep === EXPECTED_SEQUENCE.length) {
        setIsUnlocked(true);
        if ('vibrate' in navigator) {
          try {
            navigator.vibrate([100, 50, 150]);
          } catch (_) {}
        }
        setTimeout(() => {
          onUnlock();
        }, 600);
      }
    } else {
      // Wrong tap -> silent reset
      setCurrentStep(0);
      setLastTapped(null);
    }
  }, [currentStep, isUnlocked, onUnlock]);

  return {
    currentStep,
    lastTapped,
    isUnlocked,
    handleTap,
    feedbackEffect,
    totalSteps: EXPECTED_SEQUENCE.length
  };
}
