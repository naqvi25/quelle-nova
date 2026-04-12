"use client";

import { useState } from "react";
import { Zap, Cpu, Settings, Package, Wrench, BarChart2, Cable, Layers, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel,
  Stagger, StaggerItem,
} from "@/components/ui/shared";

const CATEGORIES = [
  {
    id: "automation",
    label: "Automation & Control",
    color: "blue",
    description: "Electrical control panels, PLC/DCS automation systems, SCADA, industrial robotics and wire harnesses for process and discrete manufacturing industries.",
    products: [
      {
        icon: Zap,
        title: "Electrical Control Panels",
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80",
        items: ["MCC — Motor Control Centres","PLC control panels & HMI integration","VFD (Variable Frequency Drive) panels","APFC — Automatic Power Factor Correction","DB boards, MLDB & busbar systems"],
      },
      {
        icon: Cpu,
        title: "Automation & SCADA",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: ["PLC & DCS automation systems","SCADA software & remote monitoring","Industrial robotics & end effectors","Conveyor automation & sorting systems","Vision inspection & quality automation"],
      },
      {
        icon: Cable,
        title: "Wire Harnesses",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["Custom industrial wire harness assemblies","Control panel wiring & terminations","Automation cable assemblies","Panel-to-machine interconnect harnesses","CE/UL-rated harness production"],
      },
      {
        icon: BarChart2,
        title: "Instrumentation",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Pressure, flow, temperature & level sensors","Field instruments & transmitters","Analytical instruments & gas detectors","Control room instrumentation packages","HART-compatible & loop-powered devices"],
      },
    ],
  },
  {
    id: "mechanical",
    label: "Mechanical & Fluid Systems",
    color: "amber",
    description: "Industrial valves, pumps, hydraulics, precision CNC machined parts and forged fastener components for plant, process and OEM applications.",
    products: [
      {
        icon: Settings,
        title: "Valves, Pumps & Hydraulics",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Industrial gate, globe & ball valves","Centrifugal & positive displacement pumps","Hydraulic cylinders & power packs","Pneumatic actuators & control valves","Pressure regulators & safety relief valves"],
      },
      {
        icon: Wrench,
        title: "CNC Machined Parts",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Precision CNC turned & milled components","Gear blanks, shafts & housings","Custom jigs, fixtures & tooling","Tight-tolerance complex geometries","Batch production & repeat supply programs"],
      },
      {
        icon: Package,
        title: "Forged & Fastener Components",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: ["Forged flanges, fittings & couplings","High-tensile fasteners & anchor bolts","Custom forgings to drawing","Stainless & alloy steel fasteners","Threaded rods, studs & hex bolt sets"],
      },
    ],
  },
  {
    id: "structural",
    label: "Structural & Fabrication",
    color: "indigo",
    description: "Structural steel fabrication, skid and platform assemblies, pressure vessels, heat exchangers and modular piping for industrial plant and process applications.",
    products: [
      {
        icon: Layers,
        title: "Structural Steel Fabrication",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Structural steel fabrication to drawing","Skid, frame & platform fabrication","Custom structural assemblies for plant installation","Blast, primer & paint finishing","Site-ready modular structural packages"],
      },
      {
        icon: Settings,
        title: "Pressure Vessels & Process Equipment",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Pressure vessels (ASME/IBR compliant)","Heat exchangers & process equipment","Separators, tanks & storage vessels","Inspection, testing & certification support","Custom fabrication to process design specification"],
      },
      {
        icon: Cable,
        title: "Piping Spools & Modular Assembly",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        items: ["Piping spools fabricated to isometric drawings","Modular pre-assembled piping packages","Carbon steel, stainless & alloy pipe fabrication","NDT, PWHT & hydro-test support","Suitable for oil & gas, chemical & power plant"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
};

export default function IndustrialPage() {
  const [activeCategory, setActiveCategory] = useState("automation");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Industrial Manufacturing & Automation"
        title="Engineering & Automation"
        titleAccent="Component Sourcing"
        subtitle="Control panels, automation systems, precision CNC parts, forged components, valves, pumps and instrumentation across process and discrete manufacturing industries."
        image="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1600&q=80"
        breadcrumb="Industries / Industrial"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Diversified Industrial{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Manufacturing Network
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We aggregate a broad network of manufacturers supplying industrial components, automation systems and engineered products across both process and discrete manufacturing industries.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                By connecting buyers with vetted industrial suppliers, we simplify procurement for OEMs, system integrators, EPC contractors and industrial operators seeking consistent quality and scalable supply.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-3">
                {[
                  ["Power & Energy",                "Control panels, instrumentation & electrical systems"],
                  ["Water & Wastewater",            "Pumps, valves & process automation"],
                  ["Oil, Gas & Petrochemical",      "Pressure vessels, piping spools & fabricated equipment"],
                  ["Cement, Mining & Metals",       "Structural fabrication, conveyors & process equipment"],
                  ["Pharma & Chemical",             "Precision machined parts & stainless fabrication"],
                  ["Packaging & Material Handling", "Automation, robotics & conveyor systems"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(59,130,246,0.3)" }}
                      className="flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-blue-300 transition-colors">{title}</div>
                        <div className="text-zinc-500 text-xs leading-relaxed">{desc}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Category Navigator ─────────────────────────────── */}
      <section id="products-section" className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <SectionLabel text="Product & Capability Coverage" />
            <h2 className="text-4xl font-bold text-white mb-2">What We Source</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {total} product categories across {CATEGORIES.length} segments. Select a segment to explore.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="mb-10">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat.id
                      ? ACCENT_ACTIVE[cat.color]
                      : "border-white/10 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {cat.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full border ${
                    activeCategory === cat.id ? ACCENT_ACTIVE[cat.color] : "border-white/10 text-zinc-500"
                  }`}>
                    {cat.products.length}
                  </span>
                </motion.button>
              ))}
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`flex items-start gap-3 p-5 rounded-xl border mb-8 ${ACCENT[active.color]}`}>
                <ChevronRight size={16} className="mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">{active.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-visible auto-rows-fr">
                {active.products.map((p, i) => (
                  <ProductCard key={p.title} {...p} delay={i * 0.06} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Segments Summary ───────────────────────────────── */}
      <section className="relative py-16 bg-slate-900 border-y border-white/5">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">All Sourcing Segments</h3>
            <p className="text-zinc-500 mt-2 text-sm">Click any segment to explore its products.</p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <StaggerItem key={cat.id}>
                <motion.button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setTimeout(() => {
                      document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                  whileHover={{ y: -4 }}
                  className={`w-full p-6 rounded-2xl border text-left transition-all group ${ACCENT[cat.color]} hover:scale-[1.02]`}
                >
                  <div className="text-xs font-mono tracking-widest uppercase mb-2 opacity-60">
                    {cat.products.length} products
                  </div>
                  <div className="font-bold text-white text-base leading-snug mb-2 group-hover:brightness-125 transition-all">
                    {cat.label}
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </motion.button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <BuyerSegments
        segments={[
          "Industrial OEMs",
          "EPC Contractors",
          "System Integrators",
          "Plant Operators",
          "Utilities & Power Companies",
          "Process Industry Buyers",
          "Maintenance & Spares Teams",
        ]}
      />

      <CTABanner
        title="Source Industrial Components"
        subtitle="Submit your BOM, drawings or specifications and our industrial sourcing team will align you with the right verified manufacturers."
      />
      <Footer />
    </main>
  );
}