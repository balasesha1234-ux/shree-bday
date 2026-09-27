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

    // Detect if device has primary touch input (e.g. mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // On mobile screens, let native momentum scrolling handle it without lag
    if (isTouchDevice && window.innerWidth < 768) {
      return;
    }

    // Ultra-luxurious liquid physics inertia (Locomotive / Apple style butter smooth)
    const lenis = new Lenis({
      lerp: 0.075, // Frame-rate independent physics damping for liquid velvet glide
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05, // Effortless, frictionless response to wheel / trackpad gestures
      touchMultiplier: 1.2,
      autoResize: true,
      infinite: false,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, [enabled]);
}

