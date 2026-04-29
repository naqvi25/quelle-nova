"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Car, Shield, Shirt, Plane, Droplet, Factory,
  Cpu, Pickaxe, Mountain, FlaskConical, Wrench, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2,
  SlateBackground, CTABanner, SectionLabel,
} from "@/components/ui/shared";
import {AUTOMOTIVE, DEFENCE_AND_AEROSPACE, INDUSTRIAL, MINING, ELECTRONICS, OUTDOOR_AND_TACTICAL, OIL_AND_GAS, CHEMICALS, APPAREL_AND_FOOTWEAR, DRONES, HAND_TOOLS } from "@/lib/images/base64";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    icon: Car,
    title: "Automotive",
    sub: "Seating & Interior Supply Chain",
    desc: "Complete automotive sourcing — precision machined components, castings, forgings, interior materials, composites and complete vehicle platforms.",
    image: AUTOMOTIVE,
    href: "/industries/automotive",
    accent: "blue",
  },
  {
    icon: Shield,
    title: "Defence & Aerospace",
    sub: "Precision Build-to-Print",
    desc: "Mil-spec components, aerostructures, composites, avionics, weapons hardware and high-fidelity training simulators for defence programmes.",
    image: DEFENCE_AND_AEROSPACE,
    href: "/industries/defense-aerospace",
    accent: "purple",
  },
  {
    icon: Shirt,
    title: "Apparel & Footwear",
    sub: "OEM & Private Label",
    desc: "Integrated apparel and footwear production — from design to export-ready bulk supply for brands, retailers and institutional buyers.",
    image: APPAREL_AND_FOOTWEAR,
    href: "/industries/apparel-footwear",
    accent: "blue",
  },
  {
    icon: Plane,
    title: "Drones & Components",
    sub: "UAV Systems & Parts",
    desc: "Propulsion, avionics, platforms, defence ISR systems and structures engineering for commercial, agricultural and defence UAV programmes.",
    image: DRONES,
    href: "/industries/drones",
    accent: "purple",
  },
  {
    icon: Droplet,
    title: "Oil & Gas",
    sub: "Upstream & Downstream",
    desc: "Hydraulic fittings, multi-grade piping, valves, steam systems, forged components and power generation for the full O&G value chain.",
    image: OIL_AND_GAS,
    href: "/industries/oil-gas",
    accent: "blue",
  },
  {
    icon: Factory,
    title: "Industrial Manufacturing",
    sub: "Automation & Engineering",
    desc: "Control panels, automation systems, precision CNC parts, forged components, valves, pumps and instrumentation across process industries.",
    image: INDUSTRIAL,
    href: "/industries/industrial",
    accent: "purple",
  },
  {
    icon: Cpu,
    title: "Electronics & Electrical",
    sub: "Sensors, Power & Appliances",
    desc: "Environmental sensors, passive components, power distribution, panel & switchgear systems and consumer electronics for OEM programs.",
    image: ELECTRONICS,
    href: "/industries/electronics",
    accent: "blue",
  },
  {
    icon: Pickaxe,
    title: "Mining",
    sub: "Equipment, Drilling & Environmental",
    desc: "Heavy-duty mining equipment, precision drilling tools, wear parts and integrated environmental dust control systems.",
    image: MINING,
    href: "/industries/mining",
    accent: "purple",
  },
  {
    icon: Mountain,
    title: "Hunting & Outdoor",
    sub: "Tactical, Optics & Gear",
    desc: "Thermal optics, tactical gear, hunting decoys, climbing ropes, heated apparel and machined accessories for outdoor and tactical programs.",
    image: OUTDOOR_AND_TACTICAL,
    href: "/industries/hunting-outdoor",
    accent: "blue",
  },
  {
    icon: FlaskConical,
    title: "Chemicals & Commodities",
    sub: "Specialty & Industrial",
    desc: "Fragrance ingredients, nutraceuticals, industrial amines, strategic metals and environmental control chemicals sourced to specification.",
    image: CHEMICALS,
    href: "/industries/chemicals",
    accent: "purple",
  },
  {
    icon: Wrench,
    title: "Hand Tools",
    sub: "Professional Grade",
    desc: "Professional hand tools, automotive tools, measuring instruments and precision tools for industrial, retail and export programs.",
    image: HAND_TOOLS,
    href: "/industries/hand-tools",
    accent: "blue",
  },
];

const WHY = [
  {
    title: "Verified Networks",
    desc: "Every manufacturer undergoes a rigorous 5-stage vetting process covering quality systems, process capability, traceability and export compliance before onboarding.",
  },
  {
    title: "Domain Expertise",
    desc: "Deep industry knowledge in each vertical — we understand your technical, regulatory and commercial requirements, not just your product description.",
  },
  {
    title: "End-to-End Support",
    desc: "From RFQ to delivery — technical alignment, sampling, supplier coordination and ongoing performance tracking across all eleven industry verticals.",
  },
];

// ─── INDUSTRY CARD ─────────────────────────────────────────────────────────────

function IndustryCard({ ind, index }: { ind: (typeof INDUSTRIES)[0]; index: number }) {
  const Icon = ind.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 200 });
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8]);
  const rotateX = useTransform(smoothY, [-1, 1], [6, -6]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      <Link href={ind.href}>
        <motion.div
          ref={cardRef}
          onMouseMove={(e) => {
            const rect = cardRef.current?.getBoundingClientRect();
            if (!rect) return;
            mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
            mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
          }}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.03, z: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative group rounded-2xl overflow-hidden h-72 cursor-pointer shadow-lg"
        >
          {/* Photo */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ind.image})` }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/15" />

          {/* Accent line */}
          <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${
            ind.accent === "blue" ? "via-blue-400/80" : "via-purple-400/80"
          } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

          {/* Border */}
          <div className={`absolute inset-0 rounded-2xl border border-transparent ${
            ind.accent === "blue" ? "group-hover:border-blue-400/35" : "group-hover:border-purple-400/35"
          } transition-all duration-500`} />

          {/* Glow */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            ind.accent === "blue"
              ? "bg-[radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.2),transparent_65%)]"
              : "bg-[radial-gradient(circle_at_50%_85%,rgba(147,51,234,0.2),transparent_65%)]"
          }`} />

          {/* Content */}
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
              <Icon className={`w-5 h-5 ${ind.accent === "blue" ? "text-blue-400" : "text-purple-400"}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-0.5">{ind.title}</h3>
            <p className={`text-xs font-mono tracking-wider mb-3 ${ind.accent === "blue" ? "text-blue-400" : "text-purple-400"}`}>
              {ind.sub.toUpperCase()}
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out">
              {ind.desc}
            </p>
            <div className={`flex items-center gap-1.5 mt-3 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-400 ${
              ind.accent === "blue" ? "text-blue-400" : "text-purple-400"
            }`}>
              Explore <ArrowRight size={13} />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-44 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_-10%,rgba(59,130,246,0.10),transparent)]" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <FadeIn2 delay={0.1}>
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8"
              whileHover={{ scale: 1.02 }}
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
                11 Verticals · Global Reach
              </span>
            </motion.div>
          </FadeIn2>
          <FadeIn2 delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04]">
              Industries We{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Serve
              </span>
            </h1>
          </FadeIn2>
          <FadeIn2 delay={0.3}>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Precision sourcing across eleven critical global industries — from components and sub-assemblies to complete engineered systems.
            </p>
          </FadeIn2>
        </div>
      </section>

      {/* ── Industries Grid ───────────────────────────────── */}
      <section className="relative py-10 pb-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <IndustryCard key={ind.title} ind={ind} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  );
}