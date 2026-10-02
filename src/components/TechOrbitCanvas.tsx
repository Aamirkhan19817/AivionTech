import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const TechOrbitCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 16, 36);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Center Core (AIVION TECH CORE)
    const centerGeom = new THREE.DodecahedronGeometry(2.4, 0);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.9,
    });
    const centerMesh = new THREE.Mesh(centerGeom, centerMat);
    orbitGroup.add(centerMesh);

    // Glowing core glow
    const coreGlowG = new THREE.SphereGeometry(1.6, 16, 16);
    const coreGlowM = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.6,
    });
    const coreGlow = new THREE.Mesh(coreGlowG, coreGlowM);
    orbitGroup.add(coreGlow);

    // Orbits
    const orbitTracks = [
      { radius: 7.5, rotX: 1.1, rotY: 0.3, speed: 0.8, color: 0x38bdf8 },
      { radius: 11.0, rotX: 0.5, rotY: -0.6, speed: -0.6, color: 0x06b6d4 },
      { radius: 14.5, rotX: -0.8, rotY: 0.4, speed: 0.45, color: 0x0284c7 },
      { radius: 18.0, rotX: 0.2, rotY: 1.0, speed: -0.35, color: 0x67e8f9 },
    ];

    const nodes: { mesh: THREE.Mesh; trackIdx: number; angle: number; speed: number }[] = [];
    const orbitMeshes: THREE.Line[] = [];

    orbitTracks.forEach((t, i) => {
      // Ring line
      const points: THREE.Vector3[] = [];
      const segs = 80;
      for (let s = 0; s <= segs; s++) {
        const theta = (s / segs) * Math.PI * 2;
        const x = Math.cos(theta) * t.radius;
        const z = Math.sin(theta) * t.radius;
        const v = new THREE.Vector3(x, 0, z);
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), t.rotX);
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), t.rotY);
        points.push(v);
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: t.color,
        transparent: true,
        opacity: 0.2,
      });
      const ringLine = new THREE.Line(ringGeom, ringMat);
      orbitMeshes.push(ringLine);
      orbitGroup.add(ringLine);

      // Add 2 orbiting node spheres per track
      for (let n = 0; n < 2; n++) {
        const nodeG = new THREE.SphereGeometry(0.55, 12, 12);
        const nodeM = new THREE.MeshBasicMaterial({
          color: t.color,
          transparent: true,
          opacity: 0.85,
        });
        const nodeMesh = new THREE.Mesh(nodeG, nodeM);
        nodes.push({
          mesh: nodeMesh,
          trackIdx: i,
          angle: (n * Math.PI) + i * 0.7,
          speed: t.speed,
        });
        orbitGroup.add(nodeMesh);
      }
    });

    // Lights
    const light = new THREE.PointLight(0x06b6d4, 2, 40);
    light.position.set(0, 5, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x0f172a, 1.2));

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
      const speedMult = prefersReducedMotion ? 0.15 : 0.6;

      // Rotate center core
      centerMesh.rotation.y = time * 0.4 * speedMult;
      centerMesh.rotation.x = time * 0.2 * speedMult;

      // Update node positions along their 3D orbits
      nodes.forEach((node) => {
        node.angle += node.speed * 0.015 * speedMult;
        const track = orbitTracks[node.trackIdx];
        const x = Math.cos(node.angle) * track.radius;
        const z = Math.sin(node.angle) * track.radius;
        const v = new THREE.Vector3(x, 0, z);
        v.applyAxisAngle(new THREE.Vector3(1, 0, 0), track.rotX);
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), track.rotY);
        node.mesh.position.copy(v);
      });

      // Slow tilt of entire orbit group
      orbitGroup.rotation.y = Math.sin(time * 0.15) * 0.15 * speedMult;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      centerGeom.dispose();
      centerMat.dispose();
      coreGlowG.dispose();
      coreGlowM.dispose();
      orbitMeshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      nodes.forEach((n) => {
        n.mesh.geometry.dispose();
        (n.mesh.material as THREE.Material).dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center pointer-events-none">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
