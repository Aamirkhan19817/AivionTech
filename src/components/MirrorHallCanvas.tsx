import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MirrorHallCanvasProps {
  activeIndex: number;
}

export const MirrorHallCanvas: React.FC<MirrorHallCanvasProps> = ({ activeIndex }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.02);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 26);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    container.appendChild(renderer.domElement);

    // Reflective Floor Grid / Mirror Plane
    const floorSize = 100;
    const floorGeom = new THREE.PlaneGeometry(floorSize, floorSize, 40, 40);
    floorGeom.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050b1a,
      roughness: 0.15,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.position.y = -6;
    scene.add(floorMesh);

    // Subtle Mirror Hall ceiling grid
    const ceilingMesh = floorMesh.clone();
    ceilingMesh.position.y = 14;
    scene.add(ceilingMesh);

    // Gallery Pillars / Glass Portal Frames
    const frameCount = 8;
    const panelGroup = new THREE.Group();
    scene.add(panelGroup);

    const panelMeshes: THREE.Mesh[] = [];
    const frameGeom = new THREE.BoxGeometry(6, 4.2, 0.2);

    for (let i = 0; i < frameCount; i++) {
      // Position cards along an arc / tunnel depth
      const angle = ((i - frameCount / 2) / frameCount) * Math.PI * 0.7;
      const x = Math.sin(angle) * 22;
      const z = -Math.cos(angle) * 16 + 8;
      const y = Math.sin(i * 1.5) * 0.8;

      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });

      const frameMesh = new THREE.Mesh(frameGeom, frameMat);
      frameMesh.position.set(x, y, z);
      frameMesh.rotation.y = -angle * 0.8;
      panelMeshes.push(frameMesh);
      panelGroup.add(frameMesh);
    }

    // Atmospheric Floating Particles
    const pCount = 180;
    const pGeom = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 50;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20 + 2;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.35,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Lights
    const spotLight = new THREE.SpotLight(0x06b6d4, 2.5, 45, Math.PI / 4, 0.4);
    spotLight.position.set(0, 15, 12);
    scene.add(spotLight);

    const ambLight = new THREE.AmbientLight(0x030712, 1.2);
    scene.add(ambLight);

    // Mouse parallax
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
      const speed = prefersReducedMotion ? 0.1 : 0.5;

      // Soft camera sway + mouse responsiveness
      const targetCamX = mouseX * 4;
      const targetCamY = 3 - mouseY * 2;
      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 1, 0);

      // Animate active panel forward and floating panels
      panelMeshes.forEach((mesh, idx) => {
        const isActive = idx === activeIndexRef.current;
        const targetScale = isActive ? 1.15 : 0.95;
        const currentScale = mesh.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.06;
        mesh.scale.set(newScale, newScale, newScale);

        // Gentle floating oscillation
        mesh.position.y += Math.sin(time * 1.2 + idx) * 0.005 * speed;

        // Active panel glow material
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = isActive ? 0.75 : 0.22;
        mat.color.setHex(isActive ? 0x38bdf8 : 0x06b6d4);
      });

      // Slowly rotate particle field
      particles.rotation.y = time * 0.03 * speed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      floorGeom.dispose();
      floorMat.dispose();
      frameGeom.dispose();
      panelMeshes.forEach((m) => (m.material as THREE.Material).dispose());
      pGeom.dispose();
      pMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
