"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useMotionTemplate, useTransform, useInView,
} from "framer-motion";
import {
  ArrowRight, Shield, Globe, Cpu, Car, Pickaxe, Mountain, Droplet,
  FlaskConical, Wrench, Flame, CheckCircle, BrainCircuit, Target,
  Ship, Landmark, TrendingUp, Factory, Shirt, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {WovenLightHero} from "@/components/ui/woven-light-hero";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  color: string;
  alpha: number;
}

// ─── INTERACTIVE PARTICLE CANVAS ─────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#a78bfa", "#60a5fa"];

  const initParticles = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const MAX_DIST   = 130;
    const MOUSE_DIST = 160;
    const REPEL      = 0.018;

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const ps = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions
      for (const p of ps) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST && dist > 0) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * REPEL * 6;
          p.vy += (dy / dist) * force * REPEL * 6;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vx = Math.max(-1.5, Math.min(1.5, p.vx));
        p.vy = Math.max(-1.5, Math.min(1.5, p.vy));

        p.x += p.vx + (Math.random() - 0.5) * 0.15;
        p.y += p.vy + (Math.random() - 0.5) * 0.15;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const opacity = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        // Mouse connection
        const mdx = ps[i].x - mx;
        const mdy = ps[i].y - my;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < MOUSE_DIST) {
          const opacity = (1 - md / MOUSE_DIST) * 0.7;
          ctx.beginPath();
          ctx.moveTo(ps[i].x, ps[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(59,130,246,${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw particles
      for (const p of ps) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Mouse dot
      if (mx !== -9999) {
        ctx.beginPath();
        ctx.arc(mx, my, 5, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 18);
        grad.addColorStop(0, "rgba(99,102,241,0.9)");
        grad.addColorStop(1, "rgba(99,102,241,0)");
        ctx.fillStyle = grad;
        ctx.arc(mx, my, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 cursor-crosshair"
      style={{ zIndex: 1 }}
    />
  );
}

// ─── SUPPLY CHAIN 3D VISUAL ───────────────────────────────────────────────────

function SupplyNetworkVisual({ hovered }: { hovered: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx  = useMotionValue(0);
  const my  = useMotionValue(0);
  const smx = useSpring(mx, { damping: 30, stiffness: 200 });
  const smy = useSpring(my, { damping: 30, stiffness: 200 });
  const rotX = useTransform(smy, [-20, 20], [6, -6]);
  const rotY = useTransform(smx, [-20, 20], [-6, 6]);

  const nodes = [
    { id: 1, cx: 50, cy: 50, r: 9,  primary: true  },
    { id: 2, cx: 18, cy: 28, r: 4.5 },
    { id: 3, cx: 82, cy: 22, r: 5   },
    { id: 4, cx: 88, cy: 76, r: 4   },
    { id: 5, cx: 22, cy: 78, r: 5   },
    { id: 6, cx: 8,  cy: 52, r: 3   },
    { id: 7, cx: 62, cy: 14, r: 3.5 },
    { id: 8, cx: 72, cy: 88, r: 3   },
  ];

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width  / 2) / 10);
        my.set((e.clientY - r.top  - r.height / 2) / 10);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[480px] mx-auto aspect-square flex items-center justify-center cursor-crosshair"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)" }}
        animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 0.8 : 0.4 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="lineG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Orbit ring */}
        <motion.circle cx="50" cy="50" r="38" fill="none"
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" strokeDasharray="3 3"
          animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        />
        <motion.circle cx="50" cy="50" r="26" fill="none"
          stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" strokeDasharray="2 4"
          animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        />

        {/* Connection lines */}
        {nodes.filter(n => n.id !== 1).map((n) => (
          <motion.line key={`l${n.id}`}
            x1="50" y1="50" x2={n.cx} y2={n.cy}
            stroke="url(#lineG)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: hovered ? 0.7 : 0.25, strokeWidth: hovered ? 0.9 : 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ))}

        {/* Travelling particles */}
        <AnimatePresence>
          {hovered && nodes.slice(1, 6).map((n) => (
            <motion.circle key={`p${n.id}`} r="0.9" fill="#fff"
              initial={{ cx: 50, cy: 50, opacity: 0.9 }}
              animate={{ cx: n.cx, cy: n.cy, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: n.id * 0.2 }}
              style={{ filter: "drop-shadow(0 0 3px white)" }}
            />
          ))}
        </AnimatePresence>

        {/* Nodes */}
        {nodes.map((n, i) => (
          <motion.g key={n.id} animate={{ y: [0, (i % 2 === 0 ? -2.5 : 2.5), 0] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Glow halo */}
            <motion.circle cx={n.cx} cy={n.cy} r={n.r * 3.5} fill="url(#glowG)"
              animate={{ opacity: hovered ? (n.primary ? 0.9 : 0.55) : (n.primary ? 0.4 : 0.1) }}
              transition={{ duration: 0.6 }}
            />
            {/* Node body */}
            <motion.circle cx={n.cx} cy={n.cy} r={n.r}
              fill={n.primary ? "#2563eb" : "#1e293b"}
              stroke={n.primary ? "#93c5fd" : "#475569"}
              strokeWidth={n.primary ? "1.2" : "0.5"}
              animate={{
                fill: hovered && !n.primary ? "#2563eb" : n.primary ? "#2563eb" : "#1e293b",
                stroke: hovered ? "#93c5fd" : n.primary ? "#93c5fd" : "#475569",
                r: hovered && n.primary ? n.r * 1.15 : n.r,
              }}
              transition={{ duration: 0.5 }}
              style={{ filter: n.primary ? "drop-shadow(0 0 6px rgba(59,130,246,0.9))" : undefined }}
            />
            {/* Inner dot on primary */}
            {n.primary && (
              <motion.circle cx={n.cx} cy={n.cy} r={n.r * 0.35} fill="#93c5fd"
                animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
              />
            )}
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── 3D IMAGE CARD ────────────────────────────────────────────────────────────

const cardImages: Record<string, string> = {
  "Automotive":          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80",
  "Defense & Aerospace": "https://images.unsplash.com/photo-1569736934373-53e0e9b34c22?w=700&q=80",
  "Industrial":          "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=80",
  "Mining":              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80",
  "Electronics":         "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  "Outdoor & Tactical":  "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?w=700&q=80",
  "Oil & Gas":           "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80",
  "Chemicals":           "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=80",
  "Apparel & Footwear":  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80",
  "Drones":              "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=700&q=80",
  "Hand Tools":          "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&q=80",
  "CNC Machining":       "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=700&q=80",
  "Fabrication":         "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80",
  "Casting & Forging":   "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=700&q=80",
  "Electronics Mfg.":   "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  "Composites":          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=700&q=80",
};

function ImageCard({ title, icon: Icon, desc, delay = 0, accent = "blue" }: {
  title: string; icon: any; desc: string; delay?: number; accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 20, stiffness: 200 });
  const smy = useSpring(my, { damping: 20, stiffness: 200 });
  const rotY = useTransform(smx, [-1, 1], [-10, 10]);
  const rotX = useTransform(smy, [-1, 1], [8, -8]);
  const img = cardImages[title] ?? "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=700&q=80";

  const accentColor = accent === "purple" ? "via-purple-400/80" : "via-blue-400/80";
  const accentBorder = accent === "purple" ? "group-hover:border-purple-400/40" : "group-hover:border-blue-400/40";
  const accentGlow = accent === "purple"
    ? "radial-gradient(circle at 50% 80%, rgba(147,51,234,0.25) 0%, transparent 70%)"
    : "radial-gradient(circle at 50% 80%, rgba(59,130,246,0.25) 0%, transparent 70%)";
  const iconColor = accent === "purple" ? "text-purple-400" : "text-blue-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          if (!ref.current) return;
          const r = ref.current.getBoundingClientRect();
          mx.set((e.clientX - r.left - r.width  / 2) / (r.width  / 2));
          my.set((e.clientY - r.top  - r.height / 2) / (r.height / 2));
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03, z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative group rounded-2xl overflow-hidden cursor-pointer h-64 shadow-lg border border-transparent ${accentBorder} transition-all duration-500`}
      >
        <motion.div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
          whileHover={{ scale: 1.1 }} transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: accentGlow }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            className="w-11 h-11 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1, borderColor: "rgba(96,165,250,0.6)" }}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-1.5">{title}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            {desc}
          </p>
          <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}>
            Explore <ArrowRight size={11} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PREMIUM SERVICE CARD ─────────────────────────────────────────────────────

function PremiumCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className="relative group rounded-2xl p-[1px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 opacity-25 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative h-full bg-[#06060a] rounded-2xl p-8 flex flex-col z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-colors duration-500" />
        {children}
      </div>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-[1px] w-8 bg-blue-500" />
      <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">{text}</span>
    </div>
  );
}

// ─── FADE IN ──────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [ctaHovered, setCtaHovered] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">

      {/* Cursor glow */}
      <CursorGlowEffect />

      {/* Background grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,41,59,0.25),rgba(0,0,0,1))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <WovenLightHero />

      {/* ══════════════════════════════════════════
          INTRO STATEMENT
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <SectionLabel text="About Quelle Nova" />
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95] mb-8">
                Specialized<br />
                Global<br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Manufacturing
                </span><br />
                <span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">
                  Sourcing
                </span>
              </h2>
              <Link href="/about">
                <motion.div whileHover={{ x: 6 }} className="inline-flex items-center gap-2 text-blue-400 font-semibold text-base cursor-pointer group">
                  Learn more about us
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <p className="text-xl text-zinc-300 leading-relaxed border-l-2 border-blue-500/50 pl-8">
                  Quelle Nova is a specialised B2B sourcing platform enabling OEMs, EPC contractors, system integrators and distributors to identify and engage with verified manufacturers across critical industries.
                </p>
                <p className="text-xl text-zinc-400 leading-relaxed border-l-2 border-purple-500/30 pl-8">
                  From raw materials and precision sub-assemblies to fully engineered systems, we facilitate end-to-end procurement ensuring strict technical alignment, export compliance and supply chain security.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { val: "11",     label: "Industries"            },
                    { val: "5",      label: "Vetting Stages"        },
                    { val: "Global", label: "Manufacturer Network"  },
                    { val: "10+",    label: "Advisory Services"     },
                  ].map(({ val, label }) => (
                    <motion.div key={label}
                      whileHover={{ y: -3, borderColor: "rgba(59,130,246,0.4)" }}
                      className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] transition-all"
                    >
                      <div className="text-2xl font-bold text-blue-400 font-mono mb-0.5">{val}</div>
                      <div className="text-zinc-500 text-sm">{label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INDUSTRIES WE SERVE
      ══════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <SectionLabel text="11 Verticals" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Industries We Serve</h2>
            <p className="text-zinc-500 max-w-2xl text-lg">Engineered for precision. We cover the entire spectrum of complex industrial sourcing.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Automotive",          icon: Car,          href: "/industries/automotive",       accent: "blue",   desc: "Precision machined components, castings, forgings, interior materials and complete vehicle platforms." },
              { title: "Defense & Aerospace",  icon: Shield,       href: "/industries/defense-aerospace", accent: "purple", desc: "Mil-spec components, composites, avionics, weapons hardware and high-fidelity training simulators." },
              { title: "Industrial",           icon: Factory,      href: "/industries/industrial",        accent: "blue",   desc: "Control panels, automation systems, CNC parts, forged components, valves and instrumentation." },
              { title: "Mining",               icon: Pickaxe,      href: "/industries/mining",            accent: "purple", desc: "Heavy equipment, drilling tools, wear parts and integrated environmental dust control systems." },
              { title: "Electronics",          icon: Cpu,          href: "/industries/electronics",       accent: "blue",   desc: "Environmental sensors, power distribution, switchgear systems and consumer electronics." },
              { title: "Outdoor & Tactical",   icon: Mountain,     href: "/industries/hunting-outdoor",   accent: "purple", desc: "Thermal optics, tactical gear, decoys, climbing ropes and heated apparel for outdoor programs." },
              { title: "Oil & Gas",            icon: Droplet,      href: "/industries/oil-gas",           accent: "blue",   desc: "Hydraulic fittings, multi-grade piping, valves, steam systems and power generation." },
              { title: "Chemicals",            icon: FlaskConical, href: "/industries/chemicals",         accent: "purple", desc: "Fragrance materials, nutraceuticals, industrial amines, strategic metals and environmental chemicals." },
              { title: "Apparel & Footwear",   icon: Shirt,        href: "/industries/apparel-footwear",  accent: "blue",   desc: "OEM and private-label apparel, footwear and manufacturing capabilities for export programs." },
              { title: "Drones",               icon: Globe,        href: "/industries/drones",            accent: "purple", desc: "Propulsion, avionics, UAV platforms, defence ISR systems and structures engineering." },
              { title: "Hand Tools",           icon: Wrench,       href: "/industries/hand-tools",        accent: "blue",   desc: "Professional hand tools, automotive tools, measuring instruments and precision tools." },
            ].map((item, i) => (
              <Link key={item.title} href={item.href}>
                <ImageCard title={item.title} icon={item.icon} desc={item.desc} delay={i * 0.05} accent={item.accent} />
              </Link>
            ))}
            {/* View all card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.55 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href="/industries">
                <div className="h-64 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center justify-center group-hover:border-blue-400/60 transition-colors">
                    <ArrowRight size={20} className="text-blue-400" />
                  </div>
                  <p className="text-zinc-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">View All Industries</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent -translate-x-1/2 hidden lg:block" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel text="Process" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">How Our Sourcing Works</h2>
            <p className="text-zinc-400 text-xl">A rigorous, end-to-end framework designed for technical procurement.</p>
          </FadeIn>
          <div className="relative border-l border-white/8 ml-4 space-y-12 pb-8">
            {[
              { step: "01", title: "Share Your Requirement",   desc: "Submit technical specifications, CAD drawings, or volume requirements via our contact form." },
              { step: "02", title: "Supplier Identification",  desc: "We leverage our verified global network to identify manufacturers with exact capabilities." },
              { step: "03", title: "Technical Alignment",      desc: "Validate material grades, production tolerances, and quality certifications against your spec." },
              { step: "04", title: "Sampling & Evaluation",    desc: "Prototypes are produced and audited for compliance and structural integrity before full production." },
              { step: "05", title: "Production & Delivery",    desc: "Approved suppliers initiate full-scale production, managed through to final dispatch." },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1} className="relative pl-10 md:pl-16 group">
                <motion.div
                  className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center"
                  whileInView={{ borderColor: "rgba(59,130,246,0.6)", boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.4 }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </motion.div>
                <div className="text-blue-400 font-mono text-xs mb-2 font-bold tracking-wider uppercase">Step {item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-zinc-400 text-base leading-relaxed max-w-xl">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAPABILITIES
      ══════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <SectionLabel text="Manufacturing Capabilities" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Core Manufacturing Grid</h2>
            <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">Our supplier network handles complex fabrication, precision machining and specialised material processing with verified accuracy.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "CNC Machining",       icon: Wrench,   accent: "blue",   desc: "High-precision milling and turning for tight-tolerance metal and polymer components." },
              { title: "Fabrication",          icon: Flame,    accent: "purple", desc: "Structural steel fabrication, sheet metal forming and certified industrial welding." },
              { title: "Casting & Forging",    icon: Target,   accent: "blue",   desc: "Sand, investment and die casting alongside drop and open-die forging for high-stress applications." },
              { title: "Electronics Mfg.",     icon: Cpu,      accent: "purple", desc: "SMT, through-hole assembly and full box-build system integration to IPC standards." },
              { title: "Composites",           icon: Layers,   accent: "blue",   desc: "Advanced composite structures via autoclave and OOA routes for aerospace and defence programs." },
              { title: "Surface Treatment",    icon: Shield,   accent: "purple", desc: "Anodising, powder coating, galvanising and thermal treatments for enhanced durability." },
            ].map((item, i) => (
              <Link key={item.title} href="/capabilities">
                <ImageCard title={item.title} icon={item.icon} desc={item.desc} delay={i * 0.07} accent={item.accent} />
              </Link>
            ))}
          </div>
          <FadeIn delay={0.3} className="text-center mt-8">
            <Link href="/capabilities">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-all"
              >
                View All Capabilities <ArrowRight size={14} />
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY US + SERVICES
      ══════════════════════════════════════════ */}
      <section className="relative py-24 bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f012_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f012_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left: Why Us */}
          <div>
            <FadeIn className="mb-10">
              <SectionLabel text="The Advantage" />
              <h2 className="text-4xl font-bold text-white mb-3">The Quelle Nova Advantage</h2>
              <p className="text-zinc-400 text-lg">A systematic approach to global procurement.</p>
            </FadeIn>
            <div className="space-y-8">
              {[
                { title: "Verified Manufacturer Network",  icon: CheckCircle,  desc: "Every supplier passes a rigorous 5-stage vetting process covering quality systems, traceability and export compliance." },
                { title: "Domain-Specific Expertise",      icon: BrainCircuit, desc: "Deep understanding of material science, regulatory standards and engineering tolerances in each industry vertical." },
                { title: "Precision Supplier Matching",    icon: Target,       desc: "We translate technical RFQs into targeted supplier shortlists — matched by capability, not just availability." },
                { title: "Export-Ready Operations",        icon: Ship,         desc: "Partners experienced in international trade documentation, global logistics and customs compliance." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeIn key={item.title} delay={i * 0.12} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-full border border-white/10 bg-[#020202] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-blue-500/50 group-hover:shadow-[0_0_16px_rgba(59,130,246,0.25)] transition-all duration-300">
                      <Icon className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">{item.title}</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Right: Services */}
          <div>
            <FadeIn className="mb-10">
              <SectionLabel text="Advisory" />
              <h2 className="text-4xl font-bold text-white mb-3">Corporate Advisory</h2>
              <p className="text-zinc-400 text-lg">Specialized consulting for scalable growth.</p>
            </FadeIn>
            <div className="space-y-5">
              <Link href="/services/financial">
                <PremiumCard delay={0.15}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Financial Advisory</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                    Strategic capital structuring, financial planning, M&A advisory, deal structuring, tax advisory and cross-border investment — end-to-end financial support tailored to your growth stage.
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                    Explore Finance Options <ArrowRight size={13} />
                  </div>
                </PremiumCard>
              </Link>
              <Link href="/services/growth">
                <PremiumCard delay={0.25}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Business Growth</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                    Market entry strategy, sales and partnership development, go-to-market planning and operational capability building — helping organisations grow profitably and sustainably.
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                    Scale Your Operations <ArrowRight size={13} />
                  </div>
                </PremiumCard>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="relative py-36 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/8 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <SectionLabel text="Get Started" />
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 mt-3">
              Submit a Sourcing
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Requirement
              </span>
            </h2>
            <p className="text-zinc-400 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
              Share your technical specifications, volume needs and material requirements. We will align your project with verified manufacturers capable of meeting your exact standards.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(99,102,241,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full text-xl font-semibold text-white overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-900 ease-out" />
                <span className="relative z-10 flex items-center gap-3">
                  Request For Quote
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── CURSOR GLOW ──────────────────────────────────────────────────────────────

function CursorGlowEffect() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 40, stiffness: 300, mass: 0.5 });
  const smy = useSpring(my, { damping: 40, stiffness: 300, mass: 0.5 });
  useEffect(() => {
    const fn = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);
  const bg = useMotionTemplate`radial-gradient(400px circle at ${smx}px ${smy}px, rgba(59,130,246,0.10), rgba(147,51,234,0.04) 30%, transparent 70%)`;
  return <motion.div className="pointer-events-none fixed inset-0 z-50" style={{ background: bg }} />;
}

// Layers icon used in capabilities
function Layers({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>;
}