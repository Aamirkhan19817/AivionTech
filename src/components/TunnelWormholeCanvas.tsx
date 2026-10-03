import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export const TunnelWormholeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene setup & deep cosmic indigo fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03030f, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 70 : 60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 4. Post-processing: EffectComposer & UnrealBloomPass
    let composer: EffectComposer | null = null;
    try {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(container.clientWidth, container.clientHeight),
        isMobile ? 0.35 : 0.55, // reduced strength for softer look
        0.65,                  // slightly larger radius for diffuse glow
        0.45                   // higher threshold to reduce excessive bloom on everything
      );
      composer.addPass(bloomPass);
    } catch {
      composer = null;
    }

    // 5. Spline Curve defining the 3D Wormhole trajectory
    const splinePoints = [
      new THREE.Vector3(0, 0, 150),
      new THREE.Vector3(0, 0, 80),
      new THREE.Vector3(15, 8, 0),
      new THREE.Vector3(-18, -10, -80),
      new THREE.Vector3(-8, 14, -160),
      new THREE.Vector3(20, -6, -240),
      new THREE.Vector3(0, 12, -320),
      new THREE.Vector3(-16, -14, -400),
      new THREE.Vector3(12, 10, -480),
      new THREE.Vector3(0, 0, -560),
    ];

    const tubeCurve = new THREE.CatmullRomCurve3(splinePoints);
    tubeCurve.curveType = 'centripetal';

    // 6. Tunnel Mesh with Custom Luminous Shader (Deep Indigo, Electric Cyan, Violet)
    const tubeSegments = isMobile ? 120 : 220;
    const tubeRadius = isMobile ? 14 : 17;
    const radialSegments = isMobile ? 18 : 32;
    const tubeGeometry = new THREE.TubeGeometry(tubeCurve, tubeSegments, tubeRadius, radialSegments, false);

    // Custom Glowing Wormhole Shader Material
    const wormholeShaderMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColorIndigo: { value: new THREE.Color(0x030312) }, // Darker, elegant base
        uColorCyan: { value: new THREE.Color(0x0099aa) }, // Softer cyan
        uColorViolet: { value: new THREE.Color(0x6b21a8) }, // Softer violet
        uColorMagenta: { value: new THREE.Color(0x8a3ab9) }, // Softer magenta
        uScrollSpeed: { value: 1.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorIndigo;
        uniform vec3 uColorCyan;
        uniform vec3 uColorViolet;
        uniform vec3 uColorMagenta;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          // Flowing forward velocity down the tube
          float flow = vUv.x * 24.0 - uTime * 1.8;
          float ringPattern = abs(sin(flow));
          float longitudinal = abs(sin(vUv.y * 32.0 * 3.14159));

          // Fine grid wireframe lines
          float wireX = smoothstep(0.85, 0.98, ringPattern);
          float wireY = smoothstep(0.88, 0.98, longitudinal);
          float grid = max(wireX * 0.9, wireY * 0.7);

          // Energy pulses speeding along the wormhole (slower and softer)
          float pulse1 = smoothstep(0.95, 1.0, sin(vUv.x * 12.0 - uTime * 1.8));
          float pulse2 = smoothstep(0.96, 1.0, sin(vUv.x * 18.0 - uTime * 2.2 + 2.0));

          // Blend between Electric Cyan and Vivid Violet along circumference and length
          float colorBlend = sin(vUv.y * 6.28318 + uTime * 0.4) * 0.5 + 0.5;
          vec3 energyColor = mix(uColorCyan, uColorViolet, colorBlend);
          energyColor = mix(energyColor, uColorMagenta, pulse2 * 0.7);

          // Ambient Deep-Indigo base with subtle depth
          vec3 baseColor = uColorIndigo * (0.8 + 0.4 * sin(vUv.x * 6.0));

          // Composite glowing grid + energy pulses
          vec3 finalColor = baseColor;
          finalColor += energyColor * (grid * 0.9); // reduced grid intensity
          finalColor += uColorCyan * (pulse1 * 1.2); // reduced harsh flashing
          finalColor += uColorMagenta * (pulse2 * 1.0);

          // Edge falloff / fresnel effect for realistic tunnel immersion
          float depthFade = smoothstep(-600.0, 50.0, vWorldPosition.z);
          float alpha = (0.55 + grid * 0.45 + pulse1 * 0.4) * depthFade;

          gl_FragColor = vec4(finalColor, min(alpha, 0.95));
        }
      `,
    });

    const wormholeMesh = new THREE.Mesh(tubeGeometry, wormholeShaderMaterial);
    scene.add(wormholeMesh);

    // 7. Luminous Neon Rib Rings placed along the trajectory
    const ringsGroup = new THREE.Group();
    const ringCount = isMobile ? 14 : 26;
    const ringMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < ringCount; i++) {
      const t = (i / ringCount) * 0.9 + 0.05;
      const point = tubeCurve.getPointAt(t);
      const tangent = tubeCurve.getTangentAt(t);

      const torusGeom = new THREE.TorusGeometry(tubeRadius * 0.98, 0.18, 8, 36);
      const isCyan = i % 2 === 0;
      const torusMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x0099aa : 0x7e22ce,
        transparent: true,
        opacity: isCyan ? 0.3 : 0.2, // reduced opacity for elegance
        blending: THREE.AdditiveBlending,
      });

      const torusMesh = new THREE.Mesh(torusGeom, torusMat);
      torusMesh.position.copy(point);

      // Align ring orientation perpendicular to tunnel curve tangent
      const axis = new THREE.Vector3(0, 0, 1);
      torusMesh.quaternion.setFromUnitVectors(axis, tangent);

      ringsGroup.add(torusMesh);
      ringMeshes.push(torusMesh);
    }
    scene.add(ringsGroup);

    // 8. Glowing Hyperspace Particles & Stardust Stream
    const particleCount = isMobile ? 450 : 1100;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleT = new Float32Array(particleCount);
    const particleOffsets = new Float32Array(particleCount * 2);
    const particleSpeeds = new Float32Array(particleCount);

    const cyanC = new THREE.Color(0x00aacc);
    const violetC = new THREE.Color(0x8a2be2);
    const whiteC = new THREE.Color(0xbae6fd); // softer white glimmers

    for (let i = 0; i < particleCount; i++) {
      particleT[i] = Math.random();
      // Offsets within tube radius
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * (tubeRadius * 0.85);
      particleOffsets[i * 2] = Math.cos(angle) * dist;
      particleOffsets[i * 2 + 1] = Math.sin(angle) * dist;
      particleSpeeds[i] = 0.0004 + Math.random() * 0.0008; // smoother particle movement

      const p = tubeCurve.getPointAt(particleT[i]);
      particlePositions[i * 3] = p.x + particleOffsets[i * 2];
      particlePositions[i * 3 + 1] = p.y + particleOffsets[i * 2 + 1];
      particlePositions[i * 3 + 2] = p.z;

      // Color distribution: cyan, violet, white glimmers
      const randColor = Math.random();
      const c = randColor > 0.65 ? cyanC : randColor > 0.25 ? violetC : whiteC;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 1.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // 9. Floating Longitudinal Streak Lines (Energy Conduits)
    const streakCount = isMobile ? 6 : 12;
    const streakLines: THREE.Line[] = [];
    const streakGroup = new THREE.Group();

    for (let i = 0; i < streakCount; i++) {
      const phi = (i / streakCount) * Math.PI * 2;
      const streakPoints: THREE.Vector3[] = [];
      const numPts = 60;

      for (let j = 0; j <= numPts; j++) {
        const tVal = j / numPts;
        const pt = tubeCurve.getPointAt(tVal);
        const rad = tubeRadius * 0.94;
        streakPoints.push(
          new THREE.Vector3(
            pt.x + Math.cos(phi) * rad,
            pt.y + Math.sin(phi) * rad,
            pt.z
          )
        );
      }

      const streakGeom = new THREE.BufferGeometry().setFromPoints(streakPoints);
      const isCyanStreak = i % 2 === 0;
      const streakMat = new THREE.LineBasicMaterial({
        color: isCyanStreak ? 0x00f0ff : 0x8b5cf6,
        transparent: true,
        opacity: isCyanStreak ? 0.35 : 0.25,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(streakGeom, streakMat);
      streakLines.push(line);
      streakGroup.add(line);
    }
    scene.add(streakGroup);

    // 10. Pointer / Cursor Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      targetMouseX = (cx / rect.width - 0.5) * 2;
      targetMouseY = (cy / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 11. Scroll Tracking & Cinematic Flight Calculation
    let scrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      // Map scroll down the entire page smoothly through the wormhole
      targetScrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window / Container Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      if (composer) {
        composer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause rendering when canvas is scrolled off-screen
    let isVisibleOnScreen = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleOnScreen = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // 12. Main Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentT = 0.05; // Starting progress along tube

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // If offscreen, skip heavy computations and render passes to save GPU/CPU
      if (!isVisibleOnScreen) {
        return;
      }

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.2 : 1.0;

      // Update shader uniform time
      wormholeShaderMaterial.uniforms.uTime.value = elapsedTime * speedFactor;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Smooth scroll progress interpolation
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.05;

      // Camera base flight progression: idle cruise + scroll boost
      const idleCruiseSpeed = prefersReducedMotion ? 0.002 : 0.005; // much slower base speed
      currentT = (currentT + idleCruiseSpeed * delta + scrollProgress * 0.4) % 0.85; // reduced scroll influence slightly

      // Clamp progress to safe spline range
      const camProgress = Math.min(Math.max(currentT, 0.01), 0.88);
      const camPos = tubeCurve.getPointAt(camProgress);
      const lookProgress = Math.min(camProgress + 0.04, 0.98);
      const lookPos = tubeCurve.getPointAt(lookProgress);

      // Apply mouse parallax to camera position & look target
      camera.position.x = camPos.x + mouseX * 4.5;
      camera.position.y = camPos.y - mouseY * 3.5;
      camera.position.z = camPos.z;

      const dynamicLook = new THREE.Vector3(
        lookPos.x + mouseX * 2.0,
        lookPos.y - mouseY * 1.5,
        lookPos.z
      );
      camera.lookAt(dynamicLook);

      // Camera subtle bank / roll into curves
      const tangent = tubeCurve.getTangentAt(camProgress);
      camera.rotation.z += tangent.x * 0.35 + mouseX * 0.08;

      // Animate rings subtle glow pulse
      ringMeshes.forEach((ring, idx) => {
        const pulse = Math.sin(elapsedTime * 2.5 + idx * 0.4) * 0.15 + 0.85;
        ring.scale.set(pulse, pulse, 1.0);
      });

      // Animate particle stream forward along the tube
      const posArray = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move particle towards camera and loop
        particleT[i] = (particleT[i] - particleSpeeds[i] * speedFactor + 1.0) % 1.0;
        const pt = tubeCurve.getPointAt(particleT[i]);
        posArray[i * 3] = pt.x + particleOffsets[i * 2];
        posArray[i * 3 + 1] = pt.y + particleOffsets[i * 2 + 1];
        posArray[i * 3 + 2] = pt.z;
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Render via Bloom EffectComposer, fallback to direct renderer
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      tubeGeometry.dispose();
      wormholeShaderMaterial.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      ringMeshes.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      streakLines.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* CRITICAL TEXT READABILITY VIGNETTE & CONTRAST SHIELD
          Guarantees that hero typography ("YOUR VISION. OUR CODE.") and CTAs
          remain 100% legible with crisp contrast against the glowing wormhole */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 62% at 50% 48%, rgba(3, 7, 18, 0.88) 0%, rgba(3, 7, 18, 0.65) 45%, rgba(3, 7, 18, 0.2) 100%)',
        }}
      />

      {/* Top subtle fade under navbar */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030712]/90 to-transparent pointer-events-none" />

      {/* Bottom seamless transition to Services section */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#030712] via-[#030712]/75 to-transparent pointer-events-none" />
    </div>
  );
};
