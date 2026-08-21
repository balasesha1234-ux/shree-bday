# Creative Web Mastery & Production Rules

## 1. Visual & Interactive Excellence
- **Design Standard**: Aim for Awwwards / Apple-grade polish with tactile micro-interactions, responsive typography, and luxury sensory details.
- **Single-Line Heading Safety**: Important title headings must use `whitespace-nowrap flex-nowrap` with responsive fluid font scaling so key phrases never break awkwardly into multiple lines.
- **Device Viewport Parity**: Every component must look stunning and function seamlessly across 360px mobile screens, tablets, and 4K desktops.

## 2. Motion & Physics
- **Spring-Damped Interpolation**: Use Framer Motion `useSpring` (`damping: 25-30, stiffness: 120-180`) for mouse/touch tracking and 3D perspectives to eliminate edge-jitter and harsh snapping.
- **Decoupled Hit-Boxes**: Always attach mouse/pointer event handlers to non-transforming outer bounding boxes to avoid coordinate thrashing during 3D tilts.
- **Silky 120Hz Scrolling**: Preserve native touch scrolling on mobile while delivering smooth momentum scrolling on desktop via Lenis.

## 3. Physical Acoustic Audio Architecture
- **Procedural Synthesis over Audio Bloat**: Synthesize lightweight acoustic sound effects (taps, chimes, singing bowls, purrs, laser pulses) using the Web Audio API without downloading heavy MP3 assets.
- **Sound Diversity**: Never repeat the same sound effect for unrelated actions. Assign distinct, bespoke acoustic frequencies and waveforms to each specific interaction.
- **Zero Harshness (ASMR Quality)**: Filter all click/pop transients through lowpass filters (`~1100Hz - 1400Hz`) with gentle exponential gain decay.

## 4. Full-Stack Security & Concurrency
- **Input Sanitization**: Strip all HTML/script tags and normalize toxicity patterns on all user-submitted text.
- **Token-Bucket Rate Limiting**: Enforce client-side and database-level cooldowns on wishes, offerings, and scores to prevent flooding.
- **SWR Query Caching**: Cache high-frequency read queries in memory (`QueryCache`) to handle viral concurrency without database exhaustion.
