import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

// Helpers
const Lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
function hexToVec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

// Layers
const LAYERS = { NONE: 0, TORUS_SCENE: 1, BLOOM_SCENE: 2, ENTIRE_SCENE: 3 };

// 3D Simplex noise
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

export const TunnelWormholeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 400);
    camera.position.set(0, 0, 20);
    camera.layers.enable(LAYERS.TORUS_SCENE);
    camera.layers.enable(LAYERS.BLOOM_SCENE);
    camera.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Dummy texture for haloTexture to avoid unbound texture warnings in WebGL
    const dummyHalo = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
    dummyHalo.needsUpdate = true;

    // 2. Composers setup
    const renderScene = new RenderPass(scene, camera);

    // torus composer — renders the points + reduced bloom, off-screen
    const torusComposer = new EffectComposer(renderer);
    torusComposer.renderToScreen = false;
    torusComposer.addPass(renderScene);
    torusComposer.addPass(new ShaderPass(GammaCorrectionShader));
    torusComposer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.10, 0.2, 0));
    torusComposer.addPass(new ShaderPass(CopyShader));

    // bloom composer — stronger bloom, off-screen
    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 0.15, 0.5, 0));
    bloomComposer.addPass(new ShaderPass(GammaCorrectionShader));

    // FinalPass definition
    const FinalPass = {
      uniforms: {
        iTime: { value: 0 },
        tDiffuse: { value: null as THREE.Texture | null },
        torusTexture: { value: null as THREE.Texture | null },
        bloomTexture: { value: null as THREE.Texture | null },
        haloTexture: { value: dummyHalo },
        uBg: { value: hexToVec3('#040212') },
        uFlameA: { value: hexToVec3('#2bf0ff') },
        uFlameB: { value: hexToVec3('#7a3cff') },
        uFlameAmt: { value: 0.035 },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
uniform float iTime; uniform sampler2D tDiffuse; uniform sampler2D bloomTexture; uniform sampler2D torusTexture; uniform sampler2D haloTexture;
uniform vec3 uBg; uniform vec3 uFlameA; uniform vec3 uFlameB; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
  pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
  pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
  pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
  return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
  vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
  flame *= smoothstep(0.25, 1., abs(uv.y));
  float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
  vec3 bg = uBg * (1.0 - 0.4 * length(uv));
  vec3 halo = texture2D(haloTexture, vUv).xyz;
  gl_FragColor = vec4(bg + flame*uFlameAmt + texture2D(bloomTexture, vUv).xyz + texture2D(torusTexture, vUv).xyz + texture2D(tDiffuse, vUv).xyz + halo, 1.);
}
      `,
    };

    const finalPass = new ShaderPass(FinalPass);
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;
    finalPass.uniforms.torusTexture.value = torusComposer.renderTarget1.texture;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(finalPass);

    // 3. Geometry — Tunnel Points
    const uniforms = {
      uTime: { value: 0 },
      uAppear: { value: 0 },
      uColLow: { value: hexToVec3('#180a3a') },
      uColHigh: { value: hexToVec3('#2bf0ff') },
      uOpacity: { value: 0.85 },
      uSize: { value: 4.5 },
      uBrightness: { value: 0.10 },
      uSwirl: { value: 0.39 },
      uScale: { value: 0.17 },
      uCursor: { value: new THREE.Vector3() },
      uRepelRadius: { value: 2.4 },
      uRepelStrength: { value: 0.8 },
      uActivity: { value: 0 },
    };

    const tunnelVertexShader = `
uniform float uTime; uniform float uSize; uniform float uSwirl; uniform float uScale;
uniform vec3 uColLow; uniform vec3 uColHigh;
uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
varying float vFade; varying vec3 vColor;
${SNOISE}
void main() {
  vec3 wp = vec3(position.x * 7.0, 0.0, position.z * 25.0);
  wp.x += position.y * 6.0;
  float wn = snoise(vec3(wp.x * 0.08, wp.z * 0.08, uTime * 0.15)) * 2.0;
  wn += snoise(vec3(wp.x * 0.16, wp.z * 0.16, uTime * 0.3)) * 0.8;

  float tunnelR = 12.0;
  float currentSliceRadius = sqrt(max(0.0, 17.64 - position.z * position.z));
  float maxSliceWidth = 9.2195 * currentSliceRadius;
  float normalizedX = wp.x / (maxSliceWidth + 0.001);
  float tunnelAngle = normalizedX * 3.14159265;

  float jitterAngle = snoise(vec3(position.x * 15.0, position.y * 15.0, uTime * 0.1)) * 0.35;
  float jitterZ = snoise(vec3(position.y * 15.0, position.z * 15.0, uTime * 0.1)) * 4.0;
  float ambientSwirl = snoise(vec3(position.x * 5.0, position.y * 5.0, uTime * 0.2)) * 3.0;
  tunnelAngle += jitterAngle + ambientSwirl * uSwirl;

  float dynamicR = tunnelR - wn;
  vec3 tunnelPos = vec3(dynamicR * sin(tunnelAngle), -dynamicR * cos(tunnelAngle), wp.z + jitterZ);

  vec3 finalPos = tunnelPos * uScale;
  vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
  vec3 toP = modelPosition.xyz - uCursor;
  float cd = length(toP);
  float fall = smoothstep(uRepelRadius, 0.0, cd);
  modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
  vec4 mvPosition = viewMatrix * modelPosition;

  float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
  vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
  vFade = 1.0;

  gl_PointSize = uSize * (10.0 / -mvPosition.z);
  gl_PointSize = max(gl_PointSize, 1.5);
  gl_Position = projectionMatrix * mvPosition;
}
    `;

    const tunnelFragmentShader = `
uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
varying float vFade; varying vec3 vColor;
void main() {
  vec2 xy = gl_PointCoord - 0.5;
  float ll = length(xy);
  if (ll > 0.5) discard;
  float a = smoothstep(0.5, 0.1, ll);
  gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
}
    `;

    const tunnelMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: tunnelVertexShader,
      fragmentShader: tunnelFragmentShader,
    });

    const sphereGeom = new THREE.SphereGeometry(4.2, 200, 600);
    const tunnelPoints = new THREE.Points(sphereGeom, tunnelMaterial);
    tunnelPoints.frustumCulled = false;
    tunnelPoints.layers.set(LAYERS.TORUS_SCENE);

    const group = new THREE.Group();
    group.add(tunnelPoints);
    scene.add(group);

    // 4. Atmosphere — Ambient Drifting Motes
    const N = 300;
    const positions = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    const seeds = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      positions[i * 3] = 2 * Math.random() - 1;
      positions[i * 3 + 1] = 2 * Math.random() - 1;
      positions[i * 3 + 2] = 2 * Math.random() - 1;
      sizes[i] = 24 * (0.4 + Math.random());
      seeds[i] = Math.random();
    }
    const atmoGeom = new THREE.BufferGeometry();
    atmoGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    atmoGeom.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    atmoGeom.setAttribute('seed', new THREE.Float32BufferAttribute(seeds, 1));

    const atmoUniforms = {
      uTime: { value: 0 },
      uColor: { value: hexToVec3('#8fe6ff') },
      uRes: { value: new THREE.Vector2(width * dpr, height * dpr) },
    };

    const atmoMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      uniforms: atmoUniforms,
      vertexShader: `
attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
varying float vA;
vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4)); }
void main(){
  vec3 v = position*4.0 + warp(position, uTime)*1.2;
  vec4 mv = modelViewMatrix * vec4(v, 1.0);
  float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
  vA = farF * nearF;
  gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
  gl_Position = projectionMatrix * mv;
}
      `,
      fragmentShader: `
uniform vec3 uColor; varying float vA;
void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
  float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.12); }
      `,
    });

    const atmoPoints = new THREE.Points(atmoGeom, atmoMaterial);
    atmoPoints.frustumCulled = false;
    atmoPoints.layers.enable(LAYERS.ENTIRE_SCENE);
    scene.add(atmoPoints);

    atmoPoints.onBeforeRender = function () {
      const t = performance.now() / 1000;
      atmoUniforms.uTime.value = t * 1.0 * 8.0; // atmoSpeed = 1.0
      atmoPoints.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;
    };

    // 5. Pointer Tracking
    const POINTER = {
      active: false,
      lastMove: performance.now(),
      activity: 0,
      world: new THREE.Vector3(),
    };

    const mouse = { x: 0, y: 0 };
    const mouseTarget = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -(e.clientY / window.innerHeight * 2 - 1);
      POINTER.active = true;
      POINTER.lastMove = performance.now();
    };

    const handleMouseLeave = () => {
      POINTER.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    const _ndc = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _tgt = new THREE.Vector3();

    function updatePointerWorld() {
      _tgt.set(0, 0, 0);
      if (POINTER.active) {
        _ndc.set(mouse.x, mouse.y, 0.5).unproject(camera);
        _dir.copy(_ndc).sub(camera.position).normalize();
        const dn = _dir.z;
        if (Math.abs(dn) > 1e-4) {
          const tt = -camera.position.z / dn;
          if (tt > 0 && Number.isFinite(tt)) {
            _tgt.copy(camera.position).addScaledVector(_dir, tt);
          }
        }
      }
      POINTER.world.lerp(_tgt, 0.12);
      const idle = (performance.now() - POINTER.lastMove) / 1000;
      POINTER.activity += (((POINTER.active && idle < 3) ? 1 : 0) - POINTER.activity) * 0.06;
    }

    // 6. Scroll Tracking (mapped dynamically for both hero and page scroll)
    let scrollTarget = 0;
    let scrollSmooth = 0;
    let scrollCurrent = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Map scroll down the hero section smoothly so the warp-fly is fully experienced
      const heroThreshold = Math.max(window.innerHeight * 1.1, 1);
      const heroScroll = clamp(scrollY / heroThreshold, 0, 1);
      const maxPageScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageScroll = clamp(scrollY / maxPageScroll, 0, 1);
      // Provides immediate warp-fly excitement as you scroll past the hero, capped at 1.0
      scrollTarget = Math.max(heroScroll, pageScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 7. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(currentDpr);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      torusComposer.setPixelRatio(currentDpr);
      torusComposer.setSize(width, height);

      bloomComposer.setPixelRatio(currentDpr);
      bloomComposer.setSize(width, height);

      finalComposer.setPixelRatio(currentDpr);
      finalComposer.setSize(width, height);

      atmoUniforms.uRes.value.set(width * currentDpr, height * currentDpr);
      handleScroll();
    };

    window.addEventListener('resize', handleResize);

    // 8. Visibility Observer to save resources when scrolled far off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    // 9. Scene Object with exact time & motion formulas
    const sceneObj = {
      t0: performance.now() / 1000,
      rollPhase: 0,
      appearStart: performance.now(),
      render(scroll: number, m: { x: number; y: number }) {
        const t = performance.now() / 1000;
        const dt = Math.min(0.05, t - this.t0);
        this.t0 = t;
        uniforms.uTime.value = t;

        // warp-fly down the tube; bank the flight toward the cursor
        camera.position.set(m.x * 0.12, m.y * 0.12, 20 - scroll * 34); // parallax 0.12, scrollFly 34
        camera.lookAt(m.x * 0.6, m.y * 0.6, camera.position.z - 12); // steer 0.6
        updatePointerWorld();

        uniforms.uSwirl.value = 0.39 * (1 + scroll * 1.5); // swirl 0.39, scrollSwirl 1.5
        this.rollPhase += dt * (0.065 + scroll * 0.05); // spin 0.065, scrollRoll 0.05
        group.rotation.z = this.rollPhase; // rollPhase starts at 0

        uniforms.uCursor.value.copy(POINTER.world);
        uniforms.uActivity.value = POINTER.activity;
        const elapsed = (performance.now() - this.appearStart) / 1000; // appearStart = performance.now() at construction
        uniforms.uAppear.value = Math.max(0, Math.min(1, (elapsed - 0.2) / 1.4)); // 0.2s delay, 1.4s fade-in
      },
    };

    // 10. Main Render Loop
    let animationFrameId: number;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisible) return;

      scrollSmooth = Lerp(scrollSmooth, scrollTarget, 0.1);
      scrollCurrent = Lerp(scrollCurrent, scrollSmooth, 0.06);
      mouse.x = Lerp(mouse.x, mouseTarget.x, 0.06);
      mouse.y = Lerp(mouse.y, mouseTarget.y, 0.06);

      sceneObj.render(scrollCurrent, mouse);

      camera.layers.set(LAYERS.TORUS_SCENE);
      torusComposer.render();

      camera.layers.set(LAYERS.BLOOM_SCENE);
      bloomComposer.render();

      finalPass.uniforms.bloomTexture.value = bloomComposer.readBuffer
        ? bloomComposer.readBuffer.texture
        : bloomComposer.renderTarget1.texture;
      finalPass.uniforms.torusTexture.value = torusComposer.readBuffer
        ? torusComposer.readBuffer.texture
        : torusComposer.renderTarget1.texture;

      camera.layers.set(LAYERS.ENTIRE_SCENE);
      finalComposer.render();
    };

    render();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      sphereGeom.dispose();
      tunnelMaterial.dispose();
      atmoGeom.dispose();
      atmoMaterial.dispose();
      dummyHalo.dispose();

      torusComposer.dispose();
      bloomComposer.dispose();
      finalComposer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full opacity-85" />

      {/* Dark tint overlay for comfortable brightness and crisp text readability */}
      <div className="absolute inset-0 bg-[#030712]/30 pointer-events-none" />

      {/* Top subtle fade under navbar */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030712]/80 to-transparent pointer-events-none" />

      {/* Bottom seamless transition to Services section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent pointer-events-none" />
    </div>
  );
};
