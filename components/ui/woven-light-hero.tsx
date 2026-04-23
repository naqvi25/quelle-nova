"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// ─── WOVEN CANVAS ─────────────────────────────────────────────────────────────

const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const el = mountRef.current;
    const W  = el.offsetWidth;
    const H  = el.offsetHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = -2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock  = new THREE.Clock();

    // Particles
    const COUNT   = 50000;
    const positions         = new Float32Array(COUNT * 3);
    const originalPositions = new Float32Array(COUNT * 3);
    const colors            = new Float32Array(COUNT * 3);
    const velocities        = new Float32Array(COUNT * 3);

    const geometry  = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const srcPos    = torusKnot.attributes.position;

    for (let i = 0; i < COUNT; i++) {
      const vi = i % srcPos.count;
      const x  = srcPos.getX(vi);
      const y  = srcPos.getY(vi);
      const z  = srcPos.getZ(vi);
      positions[i * 3]     = originalPositions[i * 3]     = x;
      positions[i * 3 + 1] = originalPositions[i * 3 + 1] = y;
      positions[i * 3 + 2] = originalPositions[i * 3 + 2] = z;
const c = new THREE.Color().setHSL(0.72 + Math.random() * 0.08, 0.75, 0.45);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.010, vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true, opacity: 0.25, depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse — relative to THIS element, not window
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation
    let rafId: number;
    const mouseWorld  = new THREE.Vector3();
    const currentPos  = new THREE.Vector3();
    const origPos     = new THREE.Vector3();
    const vel         = new THREE.Vector3();
    const dir         = new THREE.Vector3();
    const retForce    = new THREE.Vector3();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;
        currentPos.set(positions[ix], positions[iy], positions[iz]);
        origPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        vel.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.012;
          dir.subVectors(currentPos, mouseWorld).normalize();
          vel.addScaledVector(dir, force);
        }
        retForce.subVectors(origPos, currentPos).multiplyScalar(0.0012);
        vel.add(retForce);
        vel.multiplyScalar(0.95);

        positions[ix]  += vel.x; positions[iy]  += vel.y; positions[iz]  += vel.z;
        velocities[ix]  = vel.x; velocities[iy]  = vel.y; velocities[iz]  = vel.z;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = t * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const nW = el.offsetWidth, nH = el.offsetHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      renderer.dispose(); geometry.dispose(); material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const WovenLightHero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#020202]">

    {/* Background grid */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,41,59,0.25),rgba(0,0,0,1))] pointer-events-none" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

    {/* Three.js canvas — full width, faded on left */}
    <div className="absolute inset-0 z-0">
      <WovenCanvas />
      {/* Heavy left fade so particles don't compete with text */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/70 to-[#020202]/10 pointer-events-none" />
    </div>

    {/* Bottom fade */}
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020202] to-transparent z-[2] pointer-events-none" />

    {/* Content — left aligned */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20">
      <div className="max-w-xl">

        {/* Badge */}
        <motion.div {...fadeUp(0.05)}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
              animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            Verified Global Manufacturer Network
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.15)}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.02]"
        >
          Intelligent Sourcing
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            for Complex
          </span>
          <br />
          Manufacturing
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.25)}
          className="text-lg text-zinc-400 leading-relaxed mb-10"
        >
          We connect OEMs, EPC contractors and system integrators with verified global manufacturers — delivering precision components, engineered solutions and secure supply chains across 11 industries.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 mb-8">
          <a href="/contact">
            <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white overflow-hidden border border-white/10 bg-white/5 hover:scale-[1.02] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                Submit Sourcing Requirement
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </a>
          <a href="/industries">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-semibold hover:bg-white/[0.08] hover:text-white transition-all duration-300">
              Explore Industries
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.45)}
          className="flex gap-10 pt-0 border-t border-white/5"
        >
          {[
            { val: "11",  label: "Industries Covered" },
            { val: "5",   label: "Vetting Stages"     },
            { val: "10+", label: "Advisory Services"  },
          ].map(({ val, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-white font-mono">{val}</div>
              <div className="text-zinc-600 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
      <span className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest">scroll</span>
    </motion.div>
  </section>
);

export default WovenLightHero;