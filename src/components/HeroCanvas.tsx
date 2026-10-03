import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    // Deep midnight / obsidian fog for seamless depth blending
    scene.fog = new THREE.FogExp2(0x030712, 0.012);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 70;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8; // Controlled exposure - NOT blown out
    container.appendChild(renderer.domElement);

    // LAYER 2: Slow-moving controlled Particle Field
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x06b6d4);
    const darkBlueColor = new THREE.Color(0x1e3a8a);
    const softWhiteColor = new THREE.Color(0x94a3b8);

    for (let i = 0; i < particleCount; i++) {
      // Disperse particles wider, leaving center less dense for text legibility
      const radius = 15 + Math.random() * 85;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 160;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color variation: subtle cyan, dark blue, soft muted gray
      const mixedColor = Math.random() > 0.6 ? cyanColor : Math.random() > 0.3 ? darkBlueColor : softWhiteColor;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.55, // Subtle, never blinding
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // LAYER 3: Futuristic Tunnel / Light trails (curves extending down z-axis)
    const trailGroup = new THREE.Group();
    const trailCount = window.innerWidth < 768 ? 6 : 14;
    const trails: THREE.Line[] = [];

    for (let i = 0; i < trailCount; i++) {
      const angle = (i / trailCount) * Math.PI * 2;
      const ringRadius = 22 + Math.random() * 12;
      const points: THREE.Vector3[] = [];

      for (let z = 100; z >= -140; z -= 15) {
        const spiralAngle = angle + (z * 0.015);
        points.push(
          new THREE.Vector3(
            Math.cos(spiralAngle) * ringRadius,
            Math.sin(spiralAngle) * (ringRadius * 0.75),
            z
          )
        );
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
      const tubeMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? 0x0ea5e9 : 0x06b6d4,
        transparent: true,
        opacity: 0.16, // Subdued and elegant
      });

      const line = new THREE.Line(tubeGeom, tubeMat);
      trails.push(line);
      trailGroup.add(line);
    }
    scene.add(trailGroup);

    // LAYER 4: Floating abstract geometric shapes (octahedrons & wireframe rings)
    const geoGroup = new THREE.Group();
    const geometries = [
      new THREE.OctahedronGeometry(2.5, 0),
      new THREE.IcosahedronGeometry(2.2, 0),
      new THREE.TetrahedronGeometry(2.8, 0),
    ];

    const geoMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 7; i++) {
      const g = geometries[i % geometries.length];
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0284c7 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 70 - 20
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      geoMeshes.push(mesh);
      geoGroup.add(mesh);
    }
    scene.add(geoGroup);

    // LAYER 5: Holographic rings
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ringGeom = new THREE.TorusGeometry(32 + i * 14, 0.08, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.12 - i * 0.03,
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.z = -10 - i * 20;
      ring.rotation.x = Math.PI * 0.45;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // Ambient & Directional lighting (controlled, subtle)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x06b6d4, 0.4);
    dirLight.position.set(20, 40, 50);
    scene.add(dirLight);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / rect.width - 0.5) * 2;
      mouseY = (clientY / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.08 : 0.4;

      // Rotate particle field gently
      particles.rotation.y = elapsedTime * 0.02 * speedFactor;
      particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05 * speedFactor;

      // Animate tunnel trails
      trailGroup.rotation.z = elapsedTime * 0.04 * speedFactor;

      // Animate floating geometry
      geoMeshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.003 * (index % 2 === 0 ? 1 : -1) * speedFactor;
        mesh.rotation.y += 0.004 * speedFactor;
        mesh.position.y += Math.sin(elapsedTime * 0.8 + index) * 0.02 * speedFactor;
      });

      // Animate holographic rings
      ringGroup.rotation.z = -elapsedTime * 0.015 * speedFactor;

      // Smooth camera interpolation towards mouse
      targetX += (mouseX * 7 - targetX) * 0.04;
      targetY += (-mouseY * 5 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries & materials
      particleGeometry.dispose();
      particleMaterial.dispose();
      geometries.forEach((g) => g.dispose());
      geoMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      trails.forEach((t) => {
        t.geometry.dispose();
        (t.material as THREE.Material).dispose();
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* ThreeJS Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* CRITICAL READABILITY OVERLAY:
          Subtle dark radial gradient behind the text. Center: Darker. Edges: Slightly more animated.
          This guarantees 100% text legibility with ZERO blinding glare. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 48%, rgba(3, 7, 18, 0.88) 0%, rgba(3, 7, 18, 0.65) 50%, rgba(3, 7, 18, 0.25) 100%)',
        }}
      />
      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
    </div>
  );
};





