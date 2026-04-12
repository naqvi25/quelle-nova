"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import {
  ChevronDown, ArrowRight, Shield, Globe, Cpu, Car,
  Pickaxe, Mountain, Droplet, FlaskConical, Wrench, Flame,
  Anvil, Microchip, Box, Layers, CheckCircle, BrainCircuit,
  Target, Ship, Landmark, TrendingUp, Factory,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// ─────────────────────────────────────────────
// 1. UTILITY & DESIGN COMPONENTS
// ─────────────────────────────────────────────

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300, mass: 0.5 });
  useEffect(() => {
    const update = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);
  const background = useMotionTemplate`radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(59,130,246,0.13), rgba(147,51,234,0.04) 30%, transparent 70%)`;
  return <motion.div className="pointer-events-none fixed inset-0 z-50" style={{ background }} />;
};

const BackgroundDesign = () => (
  <div className="fixed inset-0 z-0 pointer-events-none flex justify-center bg-[#020202]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_50%_-20%,rgba(30,41,59,0.3),rgba(0,0,0,1))]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
  </div>
);

const PrimaryButton = ({
  children, className = "", icon: Icon, onMouseEnter, onMouseLeave,
}: {
  children: React.ReactNode; className?: string; icon?: any;
  onMouseEnter?: () => void; onMouseLeave?: () => void;
}) => (
  <button
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] bg-white/5 border border-white/10 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-out" />
    <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
      {children}
      {Icon && <Icon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </span>
  </button>
);

const SecondaryButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <button className={`relative group inline-flex items-center justify-center rounded-full font-semibold text-zinc-300 bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-white/[0.08] hover:text-white hover:border-white/20 ${className}`}>
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

const FadeIn2 = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
    {children}
  </motion.div>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─────────────────────────────────────────────
// 2. SUPPLY NETWORK VISUAL
// ─────────────────────────────────────────────

const SupplyNetworkVisual = ({ isCTAHovered }: { isCTAHovered: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 10);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 10);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const rotateX = useTransform(smoothY, [-20, 20], [5, -5]);
  const rotateY = useTransform(smoothX, [-20, 20], [-5, 5]);
  const nodes = [
    { id: 1, cx: 50, cy: 50, r: 8, delay: 0 },
    { id: 2, cx: 20, cy: 30, r: 4, delay: 0.2 },
    { id: 3, cx: 80, cy: 25, r: 5, delay: 0.4 },
    { id: 4, cx: 85, cy: 75, r: 4, delay: 0.6 },
    { id: 5, cx: 25, cy: 80, r: 5, delay: 0.8 },
    { id: 6, cx: 10, cy: 55, r: 3, delay: 1.0 },
  ];
  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center cursor-crosshair"
    >
      <motion.div
        animate={{ opacity: isCTAHovered ? 0.6 : 0.2, scale: isCTAHovered ? 1.1 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 blur-[100px] rounded-full pointer-events-none"
      />
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        {[2, 3, 4, 5, 6].map((targetId) => {
          const target = nodes.find((n) => n.id === targetId)!;
          return (
            <motion.line key={`line-${targetId}`} x1="50" y1="50" x2={target.cx} y2={target.cy}
              stroke="url(#lineGradient)" strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isCTAHovered ? 0.8 : 0.3, strokeWidth: isCTAHovered ? 1 : 0.5 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          );
        })}
        <motion.circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2"
          strokeDasharray="2 2" animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "50% 50%" }}
        />
        <AnimatePresence>
          {isCTAHovered && [2, 3, 4, 5].map((targetId) => {
            const target = nodes.find((n) => n.id === targetId)!;
            return (
              <motion.circle key={`particle-${targetId}`} r="1" fill="#fff"
                initial={{ cx: 50, cy: 50, opacity: 1 }}
                animate={{ cx: target.cx, cy: target.cy, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
              />
            );
          })}
        </AnimatePresence>
        {nodes.map((node, i) => (
          <motion.g key={node.id} initial={{ y: 0 }} animate={{ y: [-2, 2, -2] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}>
            <motion.circle cx={node.cx} cy={node.cy} r={node.r * 2.5} fill="url(#glowGradient)"
              animate={{ opacity: isCTAHovered ? 0.8 : 0.2, scale: isCTAHovered ? 1.2 : 1 }} transition={{ duration: 0.5 }}
            />
            <motion.circle cx={node.cx} cy={node.cy} r={node.r}
              fill={node.id === 1 ? "#3b82f6" : "#1e293b"}
              stroke={node.id === 1 ? "#93c5fd" : "#475569"}
              strokeWidth={node.id === 1 ? "1" : "0.5"}
              className={node.id === 1 ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" : ""}
              animate={{
                fill: isCTAHovered && node.id !== 1 ? "#3b82f6" : node.id === 1 ? "#3b82f6" : "#1e293b",
                stroke: isCTAHovered ? "#93c5fd" : "#475569",
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 3. INDUSTRY CARD — photo bg + 3D tilt + image zoom + border sweep
// ─────────────────────────────────────────────

const cardImages: Record<string, string> = {
  Automotive: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
  "Defense & Aerospace": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  Industrial: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80",
  Mining: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  Electronics: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "Outdoor & Tactical": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "Oil & Gas": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  Chemicals: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
  "CNC Machining": "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80",
  "Fabrication & Welding": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VsZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
  "Casting & Forging": "https://plus.unsplash.com/premium_photo-1661937421215-e27b8feb8b2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Electronics Mfg.": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "Injection Molding": "https://nbplastics.com/wp-content/uploads/2023/07/injection-molding-tool-management-featured.jpg",
  "Surface Treatment": "https://www.hydro.com/globalassets/01-products--services/services/surface-treatment/anodizing-header.jpg",
};

const ImageCard = ({
  title, icon: Icon, desc, delay = 0,
}: {
  title: string; icon: any; desc: string; delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);

  const imgSrc = cardImages[title] ?? "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03, z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative group rounded-2xl overflow-hidden cursor-pointer h-64 shadow-lg"
      >
        {/* Photo background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgSrc})` }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Dark gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20"
          whileHover={{ opacity: 0.85 }}
          transition={{ duration: 0.4 }}
        />
        {/* Animated border sweep on hover */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-400/50 transition-all duration-500" />
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {/* Blue spotlight glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle at 50% 80%, rgba(59,130,246,0.25) 0%, transparent 70%)" }}
        />
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10" style={{ transform: "translateZ(30px)" }}>
          <motion.div
            className="w-11 h-11 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-4 shadow-lg"
            whileHover={{ scale: 1.1, borderColor: "rgba(96,165,250,0.6)" }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-5 h-5 text-blue-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-white mb-1.5 drop-shadow-md">{title}</h3>
          <p className="text-zinc-300 text-sm leading-relaxed max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            {desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 4. GLASS CARD
// ─────────────────────────────────────────────

const GlassCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    className={`relative group rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md overflow-hidden hover:bg-white/[0.04] hover:border-blue-400/20 hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)] transition-colors duration-400 ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative p-8 z-10 h-full flex flex-col">{children}</div>
  </motion.div>
);

// ─────────────────────────────────────────────
// 5. SPOTLIGHT CARD
// ─────────────────────────────────────────────

const SpotlightCard = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    spotX.set(e.clientX - left);
    spotY.set(e.clientY - top);
  };

  const smoothX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const smoothY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
  const rotateY2 = useTransform(smoothX, [-150, 150], [-8, 8]);
  const rotateX2 = useTransform(smoothY, [-100, 100], [6, -6]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={(e) => {
          handleMouseMove(e);
          const rect = e.currentTarget.getBoundingClientRect();
          smoothX.set(e.clientX - rect.left - rect.width / 2);
          smoothY.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => { smoothX.set(0); smoothY.set(0); }}
        style={{ rotateX: rotateX2, rotateY: rotateY2, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, z: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`relative group rounded-2xl border border-white/5 bg-[#0a0a0a] overflow-hidden hover:border-blue-400/20 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] transition-colors duration-300 ${className}`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.18), transparent 80%)`,
          }}
        />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative p-8 z-10 h-full flex flex-col" style={{ transform: "translateZ(20px)" }}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// 6. PREMIUM SERVICE CARD
// ─────────────────────────────────────────────

const PremiumServiceCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -5, scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 22 } }}
    className="relative group rounded-2xl p-[1px] overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative h-full bg-[#030303] rounded-2xl p-8 flex flex-col z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/25 transition-colors duration-500" />
      {children}
    </div>
  </motion.div>
);

// ─────────────────────────────────────────────
// 7. NAVBAR — links configured
// ─────────────────────────────────────────────

// Maps each industry card title → its route slug
// const industryRoutes: Record<string, string> = {
//   "Automotive":          "/industries/automotive",
//   "Defense & Aerospace": "/industries/defense-aerospace",
//   "Industrial":          "/industries/industrial",
//   "Mining":              "/industries/mining",
//   "Electronics":         "/industries/electronics",
//   "Outdoor":             "/industries/hunting-outdoor",
//   "Oil & Gas":           "/industries/oil-gas",
//   "Chemicals":           "/industries/chemicals",
// };

// const Navbar = () => {
//   const { scrollY } = useScroll();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
//   useEffect(() => scrollY.on("change", (v) => setIsScrolled(v > 50)), [scrollY]);
//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
//       <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
//           <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
//             <div className="w-3 h-3 bg-[#020202] rounded-sm" />
//           </div>
//           Quelle Nova
//         </Link>

//         <div className="hidden md:flex items-center gap-8 text-base font-medium text-zinc-400">
//           <Link href="/" className="hover:text-white transition-colors">Home</Link>

//           {/* Industries dropdown */}
//           <div
//             className="relative flex items-center gap-1 cursor-pointer hover:text-white transition-colors py-2"
//             onMouseEnter={() => setHoveredMenu("industries")}
//             onMouseLeave={() => setHoveredMenu(null)}
//           >
//             Industries <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredMenu === "industries" ? "rotate-180" : ""}`} />
//             <AnimatePresence>
//               {hoveredMenu === "industries" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-2"
//                 >
//                   {Object.entries(industryRoutes).map(([label, href]) => (
//                     <Link
//                       key={label}
//                       href={href}
//                       className="p-3 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer text-sm"
//                     >
//                       {label}
//                     </Link>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <Link href="/capabilities" className="hover:text-white transition-colors">Capabilities</Link>
//           <Link href="/services" className="hover:text-white transition-colors">Services</Link>
//         </div>

//         {/* Submit RFQ */}
//         <Link href="/contact">
//           <PrimaryButton className="hidden md:flex px-6 py-2.5 text-sm">Submit RFQ</PrimaryButton>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// ─────────────────────────────────────────────
// 8. FOOTER — links configured
// ─────────────────────────────────────────────

// const Footer = () => (
//   <footer className="relative border-t border-white/5 bg-[#020202] overflow-hidden">
//     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
//     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
//     <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

//         {/* Brand */}
//         <div>
//           <Link href="/" className="flex items-center gap-2 mb-4">
//             <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//               <div className="w-3 h-3 bg-[#020202] rounded-sm" />
//             </div>
//             <span className="text-white font-bold text-lg">Quelle Nova</span>
//           </Link>
//           <p className="text-zinc-400 text-base leading-relaxed">Intelligent sourcing platform connecting global manufacturers with OEMs and industrial buyers.</p>
//         </div>

//         {/* Company */}
//         <div>
//           <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
//           <ul className="space-y-3 text-base text-zinc-400">
//             <li><Link href="/about"   className="hover:text-white transition-colors">About Us</Link></li>
//             <li><span className="hover:text-white transition-colors cursor-pointer">Careers</span></li>
//             <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
//             <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
//           </ul>
//         </div>

//         {/* Industries */}
//         <div>
//           <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Industries</h4>
//           <ul className="space-y-3 text-base text-zinc-400">
//             <li><Link href="/industries/automotive"         className="hover:text-white transition-colors">Automotive</Link></li>
//             <li><Link href="/industries/defense-aerospace"  className="hover:text-white transition-colors">Defense &amp; Aerospace</Link></li>
//             <li><Link href="/industries/industrial"         className="hover:text-white transition-colors">Industrial</Link></li>
//             <li><Link href="/industries/electronics"        className="hover:text-white transition-colors">Electronics</Link></li>
//             <li><Link href="/industries/oil-gas"            className="hover:text-white transition-colors">Oil &amp; Gas</Link></li>
//           </ul>
//         </div>

//         {/* Get Started */}
//         <div>
//           <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get Started</h4>
//           <p className="text-zinc-400 text-base mb-6">Submit your RFQ and connect with verified manufacturers.</p>
//           <Link href="/contact">
//             <button className="group relative inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold text-white overflow-hidden border border-white/10 bg-white/5 hover:scale-[1.02] transition-all duration-300">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
//               <span className="relative z-10">Submit RFQ</span>
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-base text-zinc-500">
//         <p>© {new Date().getFullYear()} Quelle Nova. All rights reserved.</p>
//         <div className="flex items-center gap-6">
//           {["Terms", "Privacy", "Cookies"].map((item) => (
//             <span key={item} className="hover:text-white transition-colors cursor-pointer">{item}</span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// ─────────────────────────────────────────────
// Maps each industry grid title → its route
// ─────────────────────────────────────────────

const industryCardRoutes: Record<string, string> = {
  "Automotive":          "/industries/automotive",
  "Defense & Aerospace": "/industries/defense-aerospace",
  "Industrial":          "/industries/industrial",
  "Mining":              "/industries/mining",
  "Electronics":         "/industries/electronics",
  "Outdoor & Tactical":  "/industries/hunting-outdoor",
  "Oil & Gas":           "/industries/oil-gas",
  "Chemicals":           "/industries/chemicals",
};

// ─────────────────────────────────────────────
// 9. MAIN PAGE
// ─────────────────────────────────────────────

export default function LandingPage() {
  const [isCTAHovered, setIsCTAHovered] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 lg:pt-0 overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <FadeIn2 delay={0.1}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">Verified Global Manufacturer Network</span>
              </div>
            </FadeIn2>
            <FadeIn2 delay={0.2}>
              <h1 className="text-6xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
                Intelligent Sourcing for{" "}
                <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Complex Manufacturing
                </span>
              </h1>
            </FadeIn2>
            <FadeIn2 delay={0.3}>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl">
                We connect OEMs and system integrators with verified global manufacturers—delivering precision components, engineered solutions, and secure supply chains.
              </p>
            </FadeIn2>
            <FadeIn2 delay={0.4} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto">
              <Link href="/contact" className="w-full sm:w-auto">
                <PrimaryButton
                  className="px-6 py-3 text-lg w-full sm:w-auto"
                  icon={ArrowRight}
                  onMouseEnter={() => setIsCTAHovered(true)}
                  onMouseLeave={() => setIsCTAHovered(false)}
                >
                  Submit Sourcing Requirement
                </PrimaryButton>
              </Link>
              <Link href="/industries" className="w-full sm:w-auto">
                <SecondaryButton className="px-6 py-3 text-lg w-full sm:w-auto">
                  Explore Industries
                </SecondaryButton>
              </Link>
            </FadeIn2>
          </div>
          <FadeIn2 delay={0.5} className="relative hidden lg:flex items-center justify-center h-full">
            <SupplyNetworkVisual isCTAHovered={isCTAHovered} />
          </FadeIn2>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 leading-tight">
                Specialized Global <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Manufacturing Sourcing</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} className="space-y-5 text-xl text-slate-400 leading-relaxed border-l-2 border-blue-200 pl-8">
              <p>
                Quelle Nova is a specialized B2B sourcing platform enabling OEMs, EPC contractors, system integrators, and distributors to identify and engage with verified manufacturers across critical industries.
              </p>
              <p>
                From raw materials and precision sub-assemblies to fully engineered systems, we facilitate end-to-end procurement ensuring strict technical alignment and seamless integration.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-300 mb-4">Industries We Serve</h2>
            <p className="text-slate-500 max-w-2xl text-xl">Engineered for precision. We cover the entire spectrum of complex industrial sourcing.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Automotive",          icon: Car,          desc: "High-volume precision machining, Tier 1/2 sourcing, and EV integration." },
              { title: "Defense & Aerospace", icon: Shield,       desc: "Mil-spec components and compliant materials with total traceability." },
              { title: "Industrial",          icon: Factory,      desc: "Heavy machinery components, custom tooling, and automation systems." },
              { title: "Mining",              icon: Pickaxe,      desc: "Wear parts, extraction equipment, and ruggedized bulk handling." },
              { title: "Electronics",         icon: Cpu,          desc: "PCB assembly, enclosures, semiconductors, and precision parts." },
              { title: "Outdoor & Tactical",  icon: Mountain,     desc: "High-performance textiles, composites, and specialized rugged gear." },
              { title: "Oil & Gas",           icon: Droplet,      desc: "High-pressure valves, resistant piping, and fluid control systems." },
              { title: "Chemicals",           icon: FlaskConical, desc: "Bulk industrial chemicals, raw materials, and regulated compounds." },
            ].map((item, i) => (
              <Link key={item.title} href={industryCardRoutes[item.title] ?? "/industries"}>
                <ImageCard title={item.title} icon={item.icon} desc={item.desc} delay={i * 0.07} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="relative py-20 overflow-hidden bg-[#020202]">
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent -translate-x-1/2 hidden lg:block" />
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">How Our Sourcing Works</h2>
            <p className="text-zinc-400 text-xl">A rigorous, end-to-end framework designed for technical procurement.</p>
          </FadeIn>
          <div className="relative border-l border-white/10 ml-4 space-y-12 pb-8">
            {[
              { step: "01", title: "Share Your Requirement",  desc: "Submit technical specifications, CAD drawings, or volume requirements." },
              { step: "02", title: "Supplier Identification", desc: "We leverage our verified global network to identify manufacturers with the exact capabilities." },
              { step: "03", title: "Technical Alignment",    desc: "Validate material grades, production tolerances, and quality certifications." },
              { step: "04", title: "Sampling & Evaluation",  desc: "Prototypes are produced and audited for compliance and structural integrity." },
              { step: "05", title: "Production & Delivery",  desc: "Approved suppliers initiate full-scale production, managed through to final dispatch." },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1} className="relative pl-10 md:pl-16 group">
                <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#020202] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-600 transition-colors duration-500 group-hover:bg-blue-400" />
                </div>
                <div className="text-blue-400 font-mono text-base mb-2 font-bold tracking-wider">STEP {item.step}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────── */}
      <section id="capabilities" className="relative py-20 bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-purple-500" />
              <span className="text-purple-600 font-mono text-sm tracking-widest uppercase">System Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-5">Core Manufacturing Grid</h2>
            <p className="text-slate-500 max-w-2xl text-xl leading-relaxed">Our supplier network is equipped to handle complex fabrication, precision machining, and specialized material processing with verified accuracy.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "CNC Machining",        icon: Wrench,    desc: "High-precision milling and turning for tight-tolerance metal and polymer components." },
              { title: "Fabrication & Welding", icon: Flame,    desc: "Heavy/light structural steel fabrication, sheet metal forming, and certified industrial welding." },
              { title: "Casting & Forging",    icon: Anvil,     desc: "Sand, investment, and die casting, alongside drop and open-die forging for high-stress applications." },
              { title: "Electronics Mfg.",     icon: Microchip, desc: "Surface-mount technology (SMT), through-hole assembly, and full box-build system integration." },
              { title: "Injection Molding",    icon: Box,       desc: "Custom plastic and polymer molding for both rapid prototyping and high-volume production runs." },
              { title: "Surface Treatment",    icon: Layers,    desc: "Anodizing, powder coating, galvanizing, and specialized thermal treatments for enhanced durability." },
            ].map((item, i) => (
              <Link key={item.title} href="/capabilities">
                <ImageCard title={item.title} icon={item.icon} desc={item.desc} delay={i * 0.07} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US & SERVICES ────────────────── */}
      <section id="services" className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 relative">
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2" />

          {/* Left: Why Us */}
          <div className="relative">
            <FadeIn className="mb-10">
              <h2 className="text-4xl font-bold text-white mb-4">The Quelle Nova Advantage</h2>
              <p className="text-zinc-400 text-lg">A systematic approach to global procurement.</p>
            </FadeIn>
            <div className="relative space-y-10 pl-4">
              <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10" />
              {[
                { title: "Verified Manufacturer Network", icon: CheckCircle, desc: "Rigorous vetting for quality control, financial stability, and capacity." },
                { title: "Domain-Specific Expertise",    icon: BrainCircuit, desc: "Deep understanding of material, regulatory, and engineering standards." },
                { title: "Precision Supplier Matching",  icon: Target,      desc: "Translating technical RFQs into targeted supplier shortlists." },
                { title: "Export-Ready Operations",      icon: Ship,        desc: "Partners experienced in international trade and global logistics." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15} className="relative flex gap-6 group">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#050505] border border-white/10 transition-all duration-300 group-hover:border-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] shrink-0 mt-1">
                    <item.icon className="w-4 h-4 text-zinc-500 transition-colors duration-300 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 text-xl group-hover:text-blue-50 transition-colors">{item.title}</h4>
                    <p className="text-zinc-400 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: Corporate Services */}
          <div>
            <FadeIn className="mb-10">
              <h2 className="text-4xl font-bold text-white mb-4">Corporate Advisory</h2>
              <p className="text-zinc-400 text-lg">Specialized consulting for scalable growth.</p>
            </FadeIn>
            <div className="space-y-6">
              <Link href="/services/financial">
                <PremiumServiceCard delay={0.2}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Financial Advisory</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Strategic capital structuring, trade finance solutions, and risk management consulting to optimize cross-border procurement operations and stabilize global supply chains.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-purple-400 text-base font-semibold cursor-pointer">
                    Explore Finance Options <ArrowRight size={15} />
                  </div>
                </PremiumServiceCard>
              </Link>
              <Link href="/services/growth">
                <PremiumServiceCard delay={0.3}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Business Growth</h3>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    Market expansion strategies, supply chain localization, and operational scaling to support your global manufacturing footprint and rapid deployment needs.
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-blue-400 text-base font-semibold cursor-pointer">
                    Scale Your Operations <ArrowRight size={15} />
                  </div>
                </PremiumServiceCard>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
              Submit a Sourcing Requirement
            </h2>
            <p className="text-zinc-400 mb-12 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
              Share your technical specifications, volume needs, and material requirements. We will align your project with verified manufacturers capable of meeting your exact standards.
            </p>
            <Link href="/contact">
              <PrimaryButton className="px-12 py-6 text-xl" icon={ArrowRight}>
                Request For Quote
              </PrimaryButton>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}