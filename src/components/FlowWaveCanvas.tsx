import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FlowWaveCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Atmospheric Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.018);

    // 2. Perspective Camera with elevated angle for deep 3D perspective
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    // Elevated position looking down and forward along terrain depth
    camera.position.set(0, 15, 28);
    camera.lookAt(0, 0, -4);

    // 3. Renderer with transparent background (alpha: true)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Master Terrain Group (handles mouse parallax tilt)
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // 4. PRIMARY DIGITAL TERRAIN (Wave 1)
    const gridW = isMobile ? 44 : 60;
    const gridH = isMobile ? 28 : 36;
    const segW = isMobile ? 44 : 70;
    const segH = isMobile ? 26 : 40;

    const primaryGeom = new THREE.PlaneGeometry(gridW, gridH, segW, segH);
    primaryGeom.rotateX(-Math.PI / 2.25);

    // Cache initial base coordinates
    const primaryPosAttr = primaryGeom.attributes.position;
    const vertexCount = primaryPosAttr.count;
    const baseCoordsX = new Float32Array(vertexCount);
    const baseCoordsZ = new Float32Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      baseCoordsX[i] = primaryPosAttr.getX(i);
      baseCoordsZ[i] = primaryPosAttr.getZ(i);
    }

    const primaryMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: 0.65,
    });

    const primaryMesh = new THREE.Mesh(primaryGeom, primaryMaterial);
    terrainGroup.add(primaryMesh);

    // 5. SECONDARY LAYER WAVE (Wave 2 - Deep Background Layer)
    const secGeom = new THREE.PlaneGeometry(gridW * 1.08, gridH * 1.08, isMobile ? 28 : 46, isMobile ? 18 : 28);
    secGeom.rotateX(-Math.PI / 2.25);
    const secPosAttr = secGeom.attributes.position;
    const secCount = secPosAttr.count;
    const secBaseX = new Float32Array(secCount);
    const secBaseZ = new Float32Array(secCount);
    for (let i = 0; i < secCount; i++) {
      secBaseX[i] = secPosAttr.getX(i);
      secBaseZ[i] = secPosAttr.getZ(i);
    }

    const secMaterial = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const secondaryMesh = new THREE.Mesh(secGeom, secMaterial);
    secondaryMesh.position.set(0, -1.8, -3);
    terrainGroup.add(secondaryMesh);

    // 6. FLOATING PARTICLES (Layer 3 - Atmospheric Node Dust)
    const particleCount = isMobile ? 35 : 85;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * (gridW * 0.9);
      particlePositions[i * 3 + 1] = Math.random() * 6 - 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * (gridH * 0.8) - 2;
      particleSpeeds[i] = 0.5 + Math.random() * 0.8;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.35 : 0.45,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeom, particleMaterial);
    terrainGroup.add(particles);

    // 7. LIGHTING (Dynamic roving point lights)
    const rovingLight = new THREE.PointLight(0x06b6d4, 2.8, 65);
    rovingLight.position.set(0, 10, 8);
    scene.add(rovingLight);

    const ambientLight = new THREE.AmbientLight(0x0a1628, 1.4);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-20, 25, 20);
    scene.add(rimLight);

    // 8. INTERACTION & MOUSE PARALLAX TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 15;
    let targetRotZ = 0;
    let targetRotX = 0;

    let cursorWorldX = 0;
    let cursorWorldZ = 0;
    let hoverProximityStrength = 0; // Lerps from 0 to 1 when hovered
    let isMouseOver = false;

    // Pulse wave state (traveling wave pulse every 5 seconds)
    let lastPulseTime = 0;
    let pulseX = -999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      // Check if mouse is directly over the component
      if (relX >= 0 && relX <= 1 && relY >= 0 && relY <= 1) {
        isMouseOver = true;
        // Map to terrain world space
        cursorWorldX = (relX - 0.5) * (gridW * 0.85);
        cursorWorldZ = (relY - 0.5) * (gridH * 0.75);
      } else {
        isMouseOver = false;
      }

      // Parallax values based on window coordinates for global subtle depth
      const winNormX = (e.clientX / window.innerWidth - 0.5) * 2;
      const winNormY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX = winNormX;
      mouseY = winNormY;
    };

    const handleMouseEnter = () => {
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.15 : 0.85;

      // A. Smoothly interpolate Hover Proximity
      const targetHover = isMouseOver ? 1.0 : 0.0;
      hoverProximityStrength += (targetHover - hoverProximityStrength) * 0.08;

      // B. Data Pulse Logic (triggers soft traveling pulse wave every 5.5s)
      if (elapsedTime - lastPulseTime > 5.5) {
        lastPulseTime = elapsedTime;
      }
      const pulseProgress = (elapsedTime - lastPulseTime) / 2.2;
      if (pulseProgress >= 0 && pulseProgress <= 1.0) {
        pulseX = -gridW * 0.5 + pulseProgress * (gridW * 1.0);
      } else {
        pulseX = -999;
      }

      // C. Roving dynamic light
      rovingLight.position.x = Math.sin(elapsedTime * 0.6 * speed) * 18;
      rovingLight.position.z = Math.cos(elapsedTime * 0.4 * speed) * 12;

      // D. Update PRIMARY TERRAIN Vertices
      const primaryY = primaryMesh.geometry.attributes.position;
      const timeScale = elapsedTime * speed;

      for (let i = 0; i < vertexCount; i++) {
        const u = baseCoordsX[i];
        const v = baseCoordsZ[i];

        // Wave 1: Slow, broad undulating ocean movement
        const w1 = Math.sin(u * 0.14 + timeScale * 0.9) * 2.1 + Math.cos(v * 0.18 + timeScale * 0.7) * 1.8;
        // Wave 2: Diagonal crossing harmonics
        const w2 = Math.sin((u + v) * 0.11 + timeScale * 1.1) * 0.85;
        // Wave 3: Subtle high-frequency digital ripples
        const w3 = Math.cos(u * 0.32 - timeScale * 1.3) * Math.sin(v * 0.26 + timeScale * 0.8) * 0.35;

        let heightVal = w1 + w2 + w3;

        // Mouse proximity interaction: local smooth swelling beneath cursor
        if (hoverProximityStrength > 0.01) {
          const dx = u - cursorWorldX;
          const dz = v - cursorWorldZ;
          const distSq = dx * dx + dz * dz;
          const radiusSq = 81; // 9 units radius
          if (distSq < radiusSq) {
            const factor = (1 - Math.sqrt(distSq) / 9) * hoverProximityStrength;
            heightVal += factor * 2.2;
          }
        }

        // Data pulse wave passing across terrain
        if (pulseX > -500) {
          const distToPulse = Math.abs(u - pulseX);
          if (distToPulse < 6.5) {
            const pulseFactor = Math.cos((distToPulse / 6.5) * (Math.PI * 0.5));
            heightVal += pulseFactor * 1.3;
          }
        }

        primaryY.setY(i, heightVal);
      }
      primaryY.needsUpdate = true;

      // E. Update SECONDARY TERRAIN Vertices (subtle, offset phase)
      const secY = secondaryMesh.geometry.attributes.position;
      const secTime = timeScale * 0.65;
      for (let i = 0; i < secCount; i++) {
        const u = secBaseX[i];
        const v = secBaseZ[i];
        const sw =
          Math.sin(u * 0.12 + secTime + 1.2) * 1.6 +
          Math.cos(v * 0.15 + secTime * 0.8 + 0.5) * 1.3;
        secY.setY(i, sw);
      }
      secY.needsUpdate = true;

      // F. Animate Atmospheric Node Particles
      const pPositions = particles.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const px = pPositions.getX(i);
        const pz = pPositions.getZ(i);
        const pSpeed = particleSpeeds[i];
        // Particles track surface crests with slow vertical floating oscillation
        const surfaceY =
          Math.sin(px * 0.14 + timeScale * 0.9) * 2.1 +
          Math.cos(pz * 0.18 + timeScale * 0.7) * 1.8 +
          Math.sin(timeScale * pSpeed + i) * 0.8 +
          1.2;
        pPositions.setY(i, surfaceY);
      }
      pPositions.needsUpdate = true;

      // G. Smooth Interpolation / Damping for Camera & Parallax Tilt
      // Mouse moves left -> tilts left; moves right -> tilts right
      targetCamX = mouseX * 6.5;
      targetCamY = 15 - mouseY * 4.5;
      targetRotZ = -mouseX * 0.08;
      targetRotX = mouseY * 0.06;

      camera.position.x += (targetCamX - camera.position.x) * 0.045;
      camera.position.y += (targetCamY - camera.position.y) * 0.045;
      camera.lookAt(0, 0, -4);

      terrainGroup.rotation.z += (targetRotZ - terrainGroup.rotation.z) * 0.045;
      terrainGroup.rotation.x += (targetRotX - terrainGroup.rotation.x) * 0.045;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);

      // Thorough cleanup of Three.js objects
      primaryGeom.dispose();
      primaryMaterial.dispose();
      secGeom.dispose();
      secMaterial.dispose();
      particleGeom.dispose();
      particleMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full py-6 sm:py-10 overflow-hidden flex items-center justify-center">
      {/* Centered Large 3D Digital Wave Container (~65-75% section width on desktop, 95% on mobile)
          NO box, NO border, NO rounded card, NO header, NO labels.
          Seamlessly dissolves into the dark website background via radial mask */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] touch-pan-y"
          style={{
            maskImage:
              'radial-gradient(ellipse 72% 68% at 50% 50%, black 35%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 72% 68% at 50% 50%, black 35%, transparent 100%)',
          }}
        >
          {/* Transparent Canvas Mounted Directly */}
          <div ref={mountRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
