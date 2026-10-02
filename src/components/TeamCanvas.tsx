import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const TeamCanvas: React.FC = () => {
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
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const teamGroup = new THREE.Group();
    scene.add(teamGroup);

    // Subtle Central Core
    const coreGeom = new THREE.OctahedronGeometry(2, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    teamGroup.add(coreMesh);

    // Holographic orbital ring around center core
    const ringG = new THREE.TorusGeometry(3.6, 0.04, 8, 60);
    const ringM = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringG, ringM);
    ring.rotation.x = Math.PI * 0.4;
    teamGroup.add(ring);

    // Subtle connection network lines representing:
    // CEO (top-left) ↘
    // CTO (bottom-left) → AIVION TECH CORE ← CMO (top-right)
    // HR (bottom-right) ↗
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.2,
    });

    const positions = [
      new THREE.Vector3(-14, 7, -2), // CEO
      new THREE.Vector3(-14, -7, -2), // CTO
      new THREE.Vector3(14, 7, -2), // CMO
      new THREE.Vector3(14, -7, -2), // HR
    ];

    const lines: THREE.Line[] = [];
    positions.forEach((pos) => {
      const geom = new THREE.BufferGeometry().setFromPoints([pos, new THREE.Vector3(0, 0, 0)]);
      const line = new THREE.Line(geom, lineMat);
      lines.push(line);
      teamGroup.add(line);

      // Node marker at card anchors
      const nodeG = new THREE.SphereGeometry(0.35, 8, 8);
      const nodeM = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.6,
      });
      const node = new THREE.Mesh(nodeG, nodeM);
      node.position.copy(pos);
      teamGroup.add(node);
    });

    // Background floating dust particles
    const pCount = 100;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 50;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.3,
      transparent: true,
      opacity: 0.4,
    });
    const particles = new THREE.Points(pGeom, pMat);
    teamGroup.add(particles);

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
      const speed = prefersReducedMotion ? 0.1 : 0.5;

      coreMesh.rotation.y = time * 0.3 * speed;
      coreMesh.rotation.x = time * 0.15 * speed;
      ring.rotation.z = -time * 0.2 * speed;
      particles.rotation.y = time * 0.02 * speed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      coreGeom.dispose();
      coreMat.dispose();
      ringG.dispose();
      ringM.dispose();
      lines.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
      pGeom.dispose();
      pMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
