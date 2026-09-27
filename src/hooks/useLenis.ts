import { useEffect } from 'react';
import Lenis from 'lenis';

export function smoothScrollTo(target: string | HTMLElement | number, duration = 1.3) {
  if (typeof window === 'undefined') return;
  const lenis = (window as any).lenis;
  if (lenis) {
    try {
      lenis.scrollTo(target, {
        duration,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      return;
    } catch (_) {}
  }

  // Graceful fallback for non-Lenis environments
  if (typeof target === 'string') {
    const selector = target.startsWith('#') ? target.slice(1) : target;
    const el = document.getElementById(selector) || document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function useLenis(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Detect if device has primary touch input on a small mobile phone
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice && window.innerWidth < 768) {
      return;
    }

    // Balanced, responsive physics configuration
    const lenis = new Lenis({
      lerp: 0.08, // Crisp and responsive tracking
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Natural 1:1 wheel distance
      touchMultiplier: 1.0,
      autoResize: true,
      infinite: false,
    });

    (window as any).lenis = lenis;

    // =========================================================================
    // CALIBRATED MOMENTUM COASTING ENGINE (GENTLE & CONTROLLED)
    // =========================================================================
    // Adds a pleasant, subtle forward glide that releases conserved momentum
    // without sliding excessively or feeling out of control.
    let momentum = 0;
    let lastWheelTime = 0;
    let lastTickTime = performance.now();
    let lastRafTime = performance.now();

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      const interval = Math.max(1, now - lastTickTime);
      lastTickTime = now;
      lastWheelTime = now;

      const delta = e.deltaY;
      if (delta === 0) return;

      // If user reverses scroll direction, immediately brake opposing momentum
      if ((delta > 0 && momentum < 0) || (delta < 0 && momentum > 0)) {
        momentum = 0;
      }

      // Mild velocity multiplier: gives a modest forward coast without over-gliding
      const speedFactor = Math.min(1.4, Math.max(0.6, 90 / interval));
      const impulse = delta * 0.10 * speedFactor;

      momentum += impulse;

      // Tight cap on max momentum so it never sails too far
      const MAX_MOMENTUM = 65;
      momentum = Math.max(-MAX_MOMENTUM, Math.min(MAX_MOMENTUM, momentum));
    };

    // Instant physical brake when user clicks, touches, or presses a key
    const haltMomentum = () => {
      momentum = 0;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', haltMomentum, { passive: true });
    window.addEventListener('touchstart', haltMomentum, { passive: true });
    window.addEventListener('keydown', haltMomentum, { passive: true });

    let rafId: number;
    function raf(time: number) {
      const dt = Math.min(32, Math.max(8, time - lastRafTime));
      lastRafTime = time;

      // When the user stops turning the wheel (> 35ms since last impulse),
      // release a gentle, modest amount of conserved momentum
      const timeSinceWheel = time - lastWheelTime;
      if (timeSinceWheel > 35 && Math.abs(momentum) > 0.4) {
        // Prevent pushing past page bounds
        const isAtTop = lenis.scroll <= 0 && momentum < 0;
        const isAtBottom = lenis.scroll >= lenis.limit && momentum > 0;

        if (isAtTop || isAtBottom) {
          momentum = 0;
        } else {
          const step = momentum * (dt / 16.67);
          lenis.scrollTo(lenis.targetScroll + step, {
            immediate: false,
            lerp: 0.08 // Clean, responsive damping
          });

          // Moderated friction decay (0.88 per 16.67ms settles within ~300-400ms)
          momentum *= Math.pow(0.88, dt / 16.67);
        }
      } else if (timeSinceWheel > 35 && Math.abs(momentum) <= 0.4) {
        momentum = 0;
      }

      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', haltMomentum);
      window.removeEventListener('touchstart', haltMomentum);
      window.removeEventListener('keydown', haltMomentum);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, [enabled]);
}

