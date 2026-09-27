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

    // Ice-glide physics configuration
    const lenis = new Lenis({
      lerp: 0.065, // Responsive yet silky velvet tracking
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15, // Light, effortless flick response
      touchMultiplier: 1.2,
      autoResize: true,
      infinite: false,
    });

    (window as any).lenis = lenis;

    // =========================================================================
    // KINETIC ICE-GLIDE INERTIA & MOMENTUM CONSERVATION ENGINE
    // =========================================================================
    // When the user scrolls, momentum accumulates based on flick velocity.
    // When they stop scrolling, the conserved kinetic momentum is released
    // smoothly across the ice, coasting forward before coming to a soft rest.
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

      // Dynamic velocity multiplier: fast flicks generate high kinetic momentum,
      // while slow deliberate nudges produce gentle, short coasting.
      const speedFactor = Math.min(2.6, Math.max(0.7, 100 / interval));
      const impulse = delta * 0.28 * speedFactor;

      momentum += impulse;

      // Limit max momentum to prevent extreme overshoot
      const MAX_MOMENTUM = 220;
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
      // release conserved kinetic momentum like gliding on ice
      const timeSinceWheel = time - lastWheelTime;
      if (timeSinceWheel > 35 && Math.abs(momentum) > 0.35) {
        // Prevent pushing past page bounds
        const isAtTop = lenis.scroll <= 0 && momentum < 0;
        const isAtBottom = lenis.scroll >= lenis.limit && momentum > 0;

        if (isAtTop || isAtBottom) {
          momentum = 0;
        } else {
          const step = momentum * (dt / 16.67);
          lenis.scrollTo(lenis.targetScroll + step, {
            immediate: false,
            lerp: 0.05 // Silky smooth damping curve during the coast
          });

          // Ice friction decay (0.938 per 16.67ms gives that frictionless gliding feel)
          momentum *= Math.pow(0.938, dt / 16.67);
        }
      } else if (timeSinceWheel > 35 && Math.abs(momentum) <= 0.35) {
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

