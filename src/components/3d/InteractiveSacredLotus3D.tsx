import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Orbit, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface InteractiveSacredLotus3DProps {
  className?: string;
  onInteract?: () => void;
}

export const InteractiveSacredLotus3D: React.FC<InteractiveSacredLotus3DProps> = ({
  className = '',
  onInteract,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = mountRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 2. Lighting Setup (Warm Vrindavan Temple Glow & Specular Accents)
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffd54f, 2.8);
    keyLight.position.set(4, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xff80ab, 2.0);
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const centerPointLight = new THREE.PointLight(0xffd700, 3.5, 8);
    centerPointLight.position.set(0, 0.5, 0);
    scene.add(centerPointLight);

    // 3. Procedural Sacred Lotus Geometry & Astrolabe Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const lotusGroup = new THREE.Group();
    rootGroup.add(lotusGroup);

    // Helper: Build curved petal geometry
    const createPetalGeometry = (length: number, widthRatio: number, curveZ: number) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(widthRatio * 0.7, length * 0.35, widthRatio, length * 0.75, 0, length);
      shape.bezierCurveTo(-widthRatio, length * 0.75, -widthRatio * 0.7, length * 0.35, 0, 0);

      const geom = new THREE.ShapeGeometry(shape, 14);
      // Curve vertices along Z to give authentic petal bowl shape
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const progress = y / length;
        const zDisplacement = Math.sin(progress * Math.PI) * curveZ;
        pos.setZ(i, pos.getZ(i) + zDisplacement);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // Petal Materials (Translucent Rose Crystal & Sacred Gold Edge Shimmer)
    const innerPetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xff6b9d,
      emissive: 0x4a0e2e,
      roughness: 0.18,
      metalness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transmission: 0.55,
      ior: 1.45,
      thickness: 0.8,
      side: THREE.DoubleSide,
    });

    const outerPetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xff8fa3,
      emissive: 0x3d0b24,
      roughness: 0.25,
      metalness: 0.3,
      clearcoat: 0.8,
      transmission: 0.45,
      ior: 1.4,
      thickness: 0.6,
      side: THREE.DoubleSide,
    });

    // Tier 1: Inner Petals (6 petals, angled upright)
    const tier1Count = 6;
    for (let i = 0; i < tier1Count; i++) {
      const angle = (i / tier1Count) * Math.PI * 2;
      const geom = createPetalGeometry(1.1, 0.45, 0.32);
      const mesh = new THREE.Mesh(geom, innerPetalMat);
      mesh.rotation.y = -angle;
      mesh.rotation.x = 0.45;
      mesh.position.set(Math.sin(angle) * 0.18, 0.1, Math.cos(angle) * 0.18);
      lotusGroup.add(mesh);
    }

    // Tier 2: Mid Petals (8 petals, gracefully opening)
    const tier2Count = 8;
    for (let i = 0; i < tier2Count; i++) {
      const angle = (i / tier2Count) * Math.PI * 2 + Math.PI / tier2Count;
      const geom = createPetalGeometry(1.35, 0.58, 0.42);
      const mesh = new THREE.Mesh(geom, innerPetalMat);
      mesh.rotation.y = -angle;
      mesh.rotation.x = 0.85;
      mesh.position.set(Math.sin(angle) * 0.32, 0.05, Math.cos(angle) * 0.32);
      lotusGroup.add(mesh);
    }

    // Tier 3: Outer Petals (10 petals, wide bloom)
    const tier3Count = 10;
    for (let i = 0; i < tier3Count; i++) {
      const angle = (i / tier3Count) * Math.PI * 2;
      const geom = createPetalGeometry(1.65, 0.72, 0.52);
      const mesh = new THREE.Mesh(geom, outerPetalMat);
      mesh.rotation.y = -angle;
      mesh.rotation.x = 1.25;
      mesh.position.set(Math.sin(angle) * 0.48, 0, Math.cos(angle) * 0.48);
      lotusGroup.add(mesh);
    }

    // Lotus Golden Stamen Core
    const stamenCoreGeom = new THREE.SphereGeometry(0.38, 24, 24);
    const stamenCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffaa00,
      emissiveIntensity: 0.65,
      metalness: 0.85,
      roughness: 0.18,
    });
    const stamenCore = new THREE.Mesh(stamenCoreGeom, stamenCoreMat);
    stamenCore.position.y = 0.35;
    lotusGroup.add(stamenCore);

    // 4. Celestial Astrolabe Orbital Rings
    const astrolabeGroup = new THREE.Group();
    rootGroup.add(astrolabeGroup);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xe5c158,
      emissive: 0x664d03,
      metalness: 0.95,
      roughness: 0.15,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.016, 16, 100), ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    astrolabeGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.014, 16, 100), ringMat);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.y = 0.4;
    astrolabeGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.012, 16, 100), ringMat);
    ring3.rotation.x = Math.PI / 5;
    ring3.rotation.z = 0.6;
    astrolabeGroup.add(ring3);

    // Orbiting Diya / Star Gem on the outer ring
    const gemGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xff4d8d,
      emissiveIntensity: 1.5,
    });
    const gem1 = new THREE.Mesh(gemGeom, gemMat);
    ring1.add(gem1);
    gem1.position.set(2.1, 0, 0);

    const gem2 = new THREE.Mesh(gemGeom, gemMat);
    ring2.add(gem2);
    gem2.position.set(-2.55, 0, 0);

    // 5. Surrounding Golden Stardust Particles
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      particlePositions[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);
      particleScales[i] = Math.random() * 0.04 + 0.02;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffe082,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    rootGroup.add(particleSystem);

    // 6. Interactive Physics & Inertia Engine
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.25;
    let currentRotationY = 0;
    let currentRotationX = 0.25;
    let bloomPulse = 0;

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      setIsInteracting(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) {
        // Gentle cursor parallax when hovering
        const rect = container.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotationY = normX * 0.9;
        targetRotationX = 0.25 + normY * 0.5;
        return;
      }
      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
      targetRotationX = Math.max(-0.6, Math.min(0.9, targetRotationX));
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const onClick = () => {
      bloomPulse = 1.0;
      soundEngine.playTempleBell();
      soundEngine.playSparkle(1.4);
      setInteractionCount((c) => c + 1);
      if (onInteract) onInteract();
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('click', onClick);

    // 7. Render Loop with Continuous Gentle Orbit & Pulse Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle ambient self-spin
      targetRotationY += 0.0035;

      // Smooth lerp damping for high-end luxury feel
      currentRotationY += (targetRotationY - currentRotationY) * 0.075;
      currentRotationX += (targetRotationX - currentRotationX) * 0.075;

      lotusGroup.rotation.y = currentRotationY;
      lotusGroup.rotation.x = currentRotationX;

      // Astrolabe counter-rotations
      ring1.rotation.z = elapsedTime * 0.22;
      ring2.rotation.y = -elapsedTime * 0.18;
      ring3.rotation.x = elapsedTime * 0.14;

      // Lotus breathing float
      lotusGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.08;

      // Particle subtle shimmer
      particleSystem.rotation.y = elapsedTime * 0.04;

      // Click shockwave bloom decay
      if (bloomPulse > 0.001) {
        const pulseScale = 1 + bloomPulse * 0.18;
        lotusGroup.scale.set(pulseScale, pulseScale, pulseScale);
        centerPointLight.intensity = 3.5 + bloomPulse * 5.0;
        bloomPulse *= 0.92;
      } else {
        lotusGroup.scale.set(1, 1, 1);
        centerPointLight.intensity = 3.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 360;
      height = container.clientHeight || 360;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [onInteract]);

  return (
    <div
      ref={mountRef}
      className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none group ${className}`}
      title="Interactive 3D Sacred Lotus & Astrolabe — Click or Drag to Orbit"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating 3D Micro-HUD Pill */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center pointer-events-none">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-space font-medium tracking-wider uppercase border backdrop-blur-md transition-all duration-300 ${
            isInteracting
              ? 'bg-[#FF4D8D]/20 border-[#FF4D8D]/60 text-white shadow-[0_0_15px_rgba(255,77,141,0.5)] scale-105'
              : 'bg-white/70 border-pink-200/80 text-gray-700 shadow-sm opacity-85 group-hover:opacity-100 group-hover:scale-105'
          }`}
        >
          <Orbit className="w-3 h-3 text-[#FF4D8D] animate-spin-slow" />
          <span>3D Interactive Lotus • Drag to Orbit</span>
          {interactionCount > 0 && (
            <span className="ml-1 text-[9px] text-[#FF4D8D] font-bold">
              ✦ {interactionCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
