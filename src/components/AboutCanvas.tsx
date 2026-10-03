import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const AboutCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    container.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Digital Core Sphere (faceted icosahedron with morphing pulse)
    const coreGeom = new THREE.IcosahedronGeometry(4.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeom = new THREE.SphereGeometry(2.4, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);

    // 2. Orbiting Rings (3 angled gyroscopic rings)
    const rings: THREE.Mesh[] = [];
    const ringRadii = [6.8, 8.2, 9.6];
    const ringColors = [0x38bdf8, 0x06b6d4, 0x0284c7];

    ringRadii.forEach((r, idx) => {
      const ringG = new THREE.TorusGeometry(r, 0.05, 12, 100);
      const ringM = new THREE.MeshBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: 0.5 - idx * 0.1,
      });
      const ring = new THREE.Mesh(ringG, ringM);
      ring.rotation.x = Math.PI * 0.3 * (idx + 1);
      ring.rotation.y = Math.PI * 0.2 * (idx + 1);
      rings.push(ring);
      coreGroup.add(ring);
    });

    // 3. Small Orbiting Data Node Particles
    const nodeCount = 40;
    const nodeGeom = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 5.5 + Math.random() * 4.5;
      nodePos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      nodePos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      nodePos[i * 3 + 2] = dist * Math.cos(phi);
    }
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    coreGroup.add(nodes);

    // 4. Subtle Connection Lines from Core to select nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.25,
    });
    const linePoints: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      linePoints.push(new THREE.Vector3(0, 0, 0));
      linePoints.push(
        new THREE.Vector3(nodePos[i * 3], nodePos[i * 3 + 1], nodePos[i * 3 + 2])
      );
    }
    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    const connectionLines = new THREE.LineSegments(lineGeom, lineMat);
    coreGroup.add(connectionLines);

    // Lights
    const pLight = new THREE.PointLight(0x06b6d4, 1.8, 50);
    pLight.position.set(5, 10, 15);
    scene.add(pLight);

    const aLight = new THREE.AmbientLight(0x030712, 1.5);
    scene.add(aLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.1 : 0.6;

      // Rotate core mesh & morph scale slightly
      coreMesh.rotation.y = time * 0.3 * speed;
      coreMesh.rotation.x = time * 0.2 * speed;
      const morphScale = 1 + Math.sin(time * 1.5) * 0.05;
      coreMesh.scale.set(morphScale, morphScale, morphScale);

      // Rotate rings at differential angles
      rings[0].rotation.z += 0.008 * speed;
      rings[1].rotation.x += 0.006 * speed;
      rings[2].rotation.y += 0.009 * speed;

      // Rotate nodes cloud
      nodes.rotation.y = -time * 0.15 * speed;

      // Mouse subtle tilt
      coreGroup.rotation.y += (mouseX * 0.5 - coreGroup.rotation.y) * 0.05;
      coreGroup.rotation.x += (-mouseY * 0.5 - coreGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      coreGeom.dispose();
      coreMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      nodeGeom.dispose();
      nodeMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] md:h-[480px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};





