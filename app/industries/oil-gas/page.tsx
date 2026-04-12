"use client";

import { useState } from "react";
import {
  Settings, Wrench, Shield, Zap, Droplet,
  Layers, Box, Package, Cpu, ChevronRight, Flame,
} from "lucide-react";
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
    id: "fittings",
    label: "Hydraulic & Process Fittings",
    color: "blue",
    description: "Comprehensive hydraulic pipe, tube and instrumentation fitting families — couplings, test points, manifolds and flange hardware for fluid power and process installations in oil & gas service.",
    products: [
      {
        icon: Settings,
        title: "Hydraulic Pipe & Tube Fittings",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Fitting families for fluid power & process installations","Reliable joins, bends & transitions in harsh service","High-pressure & high-vibration rated variants","Multiple thread form & end configuration options","Oilfield & process skid specification sourcing"],
      },
      {
        icon: Settings,
        title: "Single-Ferrule Bite-Type Tube Fittings",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Leak-tight connections under high pressure","Vibration resistance & repeatable assembly","Specified for hydraulic circuits in oilfield equipment","Single-ferrule bite action — reliable seal on assembly","Consistent performance across batch production"],
      },
      {
        icon: Wrench,
        title: "Instrumentation Fittings (Double-Ferrule / Compression)",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Double-ferrule & compression fitting families","Leak-tight connections for measurement lines","Process skid & instrument hook-up applications","Repeatable assembly without specialist tooling","Compatible with standard instrument tubing grades"],
      },
      {
        icon: Settings,
        title: "O-Ring Face Seal (ORFS) Fittings",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Face seal with O-ring — reduced leak risk design","Preferred in high-vibration, high-pressure hydraulics","Common in oil & gas mobile & fixed equipment","Eliminates thread-dependent sealing reliance","Suitable for zero-leak hydraulic circuit requirements"],
      },
      {
        icon: Wrench,
        title: "SAE 37° Flare Tube Fittings",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Metal-to-metal sealing via 37° flare geometry","Widely used in mobile equipment & oilfield skids","Serviceability & wide supplier compatibility","Suitable for medium to high hydraulic pressures","Available across full tubing diameter range"],
      },
      {
        icon: Settings,
        title: "Weld Nipple Hydraulic Fittings",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Connect tubing to welded joints in skid piping","Permanent, robust connections for high-pressure lines","Suited for welded hydraulic manifold interfaces","Consistent weld geometry for repeatable joints","Specified in oilfield power packs & HPU skids"],
      },
      {
        icon: Wrench,
        title: "British Standard Threaded Adapter Fittings",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["BSP thread form adapters for mixed-spec installations","Interfaces mixed piping & equipment connections","Common in global oil & gas project sites","Straight, elbow & cross configurations available","Stainless, carbon steel & alloy material options"],
      },
      {
        icon: Settings,
        title: "SAE & CETOP Flange Interfaces",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["High-flow connections on manifolds, pumps & motors","SAE and CETOP standard interfaces","Common on oilfield power units & control skids","Robust sealing for high-pressure hydraulic circuits","Full range of SAE 2-bolt & 4-bolt flange sizes"],
      },
      {
        icon: Box,
        title: "SAE Flange Hardware (High-Pressure)",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Higher-flow & higher-pressure hydraulic connections","Robust sealing with standardised interfaces","Split flange & code 61/62 configurations","Suitable for hydraulic cylinders & motor ports","Oilfield and marine hydraulic equipment supply"],
      },
      {
        icon: Settings,
        title: "Pipe Clamp & Support Hardware",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Secures hydraulic & process lines in plants","Vibration reduction & improved maintainability","Single & multi-pipe clamp configurations","Suitable for mobile equipment & fixed plant","Standard & heavy-duty clamp series available"],
      },
      {
        icon: Wrench,
        title: "Quick Couplings",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Fast connect/disconnect of fluid lines","Minimised leakage on disconnection","Double-check valve sealing variants","Maintenance & modular skid connections","Multiple thread forms & pressure ratings"],
      },
      {
        icon: Settings,
        title: "Test Point Fittings & Microbore Systems",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: ["Safe pressure measurement without breaking lines","Minimess test point coupling system compatible","Microbore hose assemblies for gauge connection","Supports condition monitoring & troubleshooting","Compact test-point for commissioning & maintenance"],
      },
      {
        icon: Box,
        title: "Hydraulic Manifolds",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Consolidates flow paths & valve mounting","Reduces plumbing complexity & leak points","Custom ported to customer valve arrangement","Used in hydraulic power units & control skids","Steel & aluminium block options available"],
      },
    ],
  },
  {
    id: "piping",
    label: "Pipes, Metals & Pressure Piping",
    color: "amber",
    description: "Multi-grade industrial pipes and tubes, high-pressure socket weld and butt weld fittings, flanges, forged components, fasteners, plates and round bars for oil & gas and process plant fabrication.",
    products: [
      {
        icon: Layers,
        title: "Industrial Pipes & Tubes (Multi-Grade)",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        items: ["Stainless, carbon steel, duplex & super duplex","Alloy, nickel alloy, titanium & copper-nickel grades","Aluminium tubing for weight-critical applications","Pressure integrity & corrosion resistance focus","Certification-backed sourcing for oil & gas programmes"],
      },
      {
        icon: Settings,
        title: "Socket Weld Fittings",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Small-bore high-pressure piping connections","Strong welded joints with leak integrity","Process skids & oilfield instrumentation runs","Stainless, carbon & alloy steel grades","Standard pressure class — 3000# & 6000#"],
      },
      {
        icon: Settings,
        title: "Butt Weld Fittings",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
        items: ["Permanent, high-integrity welded piping joints","Process and pipeline fabrication applications","Elbows, tees, reducers & caps to ASME B16.9","Selected for strength and reduced leak paths","Multi-grade material options available"],
      },
      {
        icon: Box,
        title: "Flanges (Socket Weld & Butt Weld Ends)",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        items: ["Connects piping to equipment & valves","Socket-weld & butt-weld end configurations","Maintainable joints in pressure-rated systems","Available across ASME pressure classes","Stainless, carbon & alloy material grades"],
      },
      {
        icon: Wrench,
        title: "Forged Fittings (High-Pressure)",
        image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80",
        items: ["Elbows, tees, reducers & caps — forged construction","High-pressure service in process & offshore piping","Socket-weld & threaded end configurations","Instrument lines & compact piping networks","Leak-tight strength under pressure cycling"],
      },
      {
        icon: Shield,
        title: "High-Performance Fasteners",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: ["Nickel alloy, duplex & titanium alloy options","Piping joints, pressure equipment & corrosion environments","Strength, corrosion resistance & traceability focus","Studs, bolts, nuts & washers to ASTM standards","Oil & gas and process plant supply programmes"],
      },
      {
        icon: Layers,
        title: "Plates & Sheets (Fabrication Grade)",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Tanks, skids, structural supports & cladding","Pressure equipment part fabrication","Multi-grade — stainless, duplex, carbon & alloy","Selection driven by corrosion & weldability needs","Core raw material for oil & gas fabricators"],
      },
      {
        icon: Box,
        title: "Round Bars (Machining Stock)",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Machining stock for shafts, studs & valve parts","Fasteners & machined components for O&G equipment","Multi-grade — stainless, titanium, nickel & alloy","Specified to diameter tolerance & certification","Consistent machining performance & service reliability"],
      },
    ],
  },
  {
    id: "valves",
    label: "Valves, Steam & Forged Components",
    color: "cyan",
    description: "Steam traps, piston valves, condensate recovery, boiler accessories, industrial valve ranges, forged rings, branch components and CNC machining services for process and steam plant operations.",
    products: [
      {
        icon: Flame,
        title: "Steam Trap Product Families",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Automatically discharges condensate & non-condensable gases","Minimises steam loss from distribution networks","Improves heat-transfer efficiency in process heating","Reduces water-hammer risk in refineries & utilities","For chemical plants & steam-intensive operations"],
      },
      {
        icon: Settings,
        title: "Piston Valves (Steam & Utility)",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Isolation & control in steam & utility piping","Reliable shut-off & durability under frequent cycling","Maintenance access focused design","Steam distribution & process line applications","Available across pressure and temperature ratings"],
      },
      {
        icon: Droplet,
        title: "Condensate Recovery Systems",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        items: ["Collects & returns hot condensate to boiler house","Reduces make-up water consumption","Improves overall steam-plant energy efficiency","System packages for process & utility plants","Integration with existing steam distribution networks"],
      },
      {
        icon: Box,
        title: "Boiler & Steam-Line Accessories",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Line protection & filtration/straining accessories","Blowdown-related components for boiler systems","Supporting components for steam headers","Safe & efficient steam generation & distribution","Used around boiler houses & steam distribution"],
      },
      {
        icon: Wrench,
        title: "Steam Engineering Valve Range",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
        items: ["Isolation & control across steam & utility circuits","Standardised valve selection for steam distribution","Process heating & energy-efficiency upgrade programs","Full range from isolation to control duties","Refinery, chemical & utility plant supply"],
      },
      {
        icon: Shield,
        title: "Industrial Valves (Piping & Process)",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Isolation, throttling & instrumentation valves","Manifold configurations for measurement lines","Specified by material grade, pressure class & end connection","Oil & gas skids & process system supply","Full documentation & traceability on request"],
      },
      {
        icon: Package,
        title: "Forged Components — Rings & Specialty Geometries",
        image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80",
        items: ["Forged rings & specialty geometries for O&G applications","High-load, fatigue-critical service environments","Value-add machining for final fit & function","Offshore, subsea & surface pressure equipment","Full material certification & traceability"],
      },
      {
        icon: Layers,
        title: "Forged Branch Components",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["High-pressure piping & flowline branch fittings","Where standard fittings are limiting for design pressure","Integrity-critical flowline architecture applications","Forged construction for strength & fatigue resistance","Offshore & onshore process piping supply"],
      },
      {
        icon: Wrench,
        title: "CNC Machining Services for O&G Components",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Machined O&G components — fit, sealing & uptime focus","Stable tolerances & repeatable batch production","Valve parts, connectors & precision housings","Full material traceability & inspection documentation","Suitable for production and MRO replacement parts"],
      },
    ],
  },
  {
    id: "power",
    label: "Power Generation & Environmental",
    color: "indigo",
    description: "Industrial diesel and gas generator sets, Mahindra Powerol industrial and marine engines across multiple kVA and BHP bands, plus environmental dust and oxidation control chemicals for mineral and coal handling sites.",
    products: [
      {
        icon: Zap,
        title: "Industrial Diesel Generator Sets",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Small to large kVA ratings for backup & prime power","Fuel-efficient & compliance-certified operation","Suitable for industrial, commercial & remote sites","Multiple kVA bands & configuration options","Diverse duty cycle support across applications"],
      },
      {
        icon: Zap,
        title: "Gas-Fuelled Generator Sets",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Gas-fuelled gensets for cleaner-burning operations","Steady power availability for process-critical sites","Multiple kVA bands & model options","Wellhead & associated gas applications","Reduced emission profile vs diesel alternatives"],
      },
      {
        icon: Box,
        title: "Silent / Acoustic Generator Sets",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Acoustically treated for urban & commercial deployment","Reduced noise impact without sacrificing reliability","Common kVA bands for commercial backup power","Offices, data centres & urban site applications","Standard & custom acoustic enclosure options"],
      },
      {
        icon: Zap,
        title: "CPCB IV+ Compliant Diesel Generator Sets",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Meets tighter CPCB IV+ emissions requirements","Compliance-driven procurement specification support","Multiple configurations across common kVA bands","Technical specification & evaluation documentation","Suitable for new-build & replacement programmes"],
      },
      {
        icon: Settings,
        title: "Mahindra Powerol Industrial Diesel Engines",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Multiple BHP bands for OEM applications","Construction equipment, fire-fighting pumps & material handling","Marine propulsion & auxiliary power applications","Long-duty operation in harsh environments","Fixed & variable speed variants available"],
      },
      {
        icon: Settings,
        title: "Construction & Mining Engine Applications",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Excavators, pumps, compressors & pavers","Long-duty operation in harsh site conditions","Multiple horsepower bands for equipment matching","Fuel efficiency & uptime focused specifications","Engineering validation & duty-cycle support"],
      },
      {
        icon: Cpu,
        title: "Sea Hawk Marine Engines",
        image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80",
        items: ["Mahindra Powerol Sea Hawk marine engine range","Marine propulsion & auxiliary applications","Regional marine dealership & service network","Commercial & offshore vessel applications","Corrosion-resistant specification for marine environment"],
      },
      {
        icon: Droplet,
        title: "DustDew 9219 & DustDew A — Dust & Oxidation Control",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
        items: ["DustDew 9219 — polymer suppressant, agglomerates fines & forms semi-permeable crust","DustDew A — hydrophobic oxidation barrier limiting oxygen ingress & spontaneous heating","Preserves GCV & reduces PM emissions on coal/mineral stockpiles","Cuts water usage ~70–90% vs continuous sprinkling","Deployable on spray bars, tankers & mist cannons at mines, ports & power plants"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
};

export default function OilGasPage() {
  const [activeCategory, setActiveCategory] = useState("fittings");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Oil & Gas"
        title="Oil & Gas Equipment,"
        titleAccent="Systems & Supply"
        subtitle="Hydraulic fittings, multi-grade piping, valves, steam systems, forged components, power generation and environmental control — a verified single-source network for upstream, midstream and downstream procurement."
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
        breadcrumb="Industries / Oil & Gas"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Full-Spectrum{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Oil & Gas Procurement
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source across the complete oil and gas procurement landscape — from hydraulic fittings and precision piping through to valves, steam systems, forged components, power generation equipment and environmental control chemicals for mineral handling operations.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Every supplier is evaluated for quality certifications, material traceability and compliance documentation before engagement — ensuring suitability for upstream, midstream and downstream operations worldwide.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Hydraulic & Process Fittings", "Tube fittings, couplings, test points & manifolds"],
                  ["Pipes, Metals & Pressure Piping", "Multi-grade pipes, flanges, forgings, plates & bars"],
                  ["Valves, Steam & Forged Parts", "Steam traps, valves, condensate recovery & CNC services"],
                  ["Power Generation & Environmental", "Diesel/gas gensets, industrial engines & dust control"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(251,191,36,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-amber-300 transition-colors">{title}</div>
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
                  <ProductCard key={p.title} {...p} delay={i * 0.05} />
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
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  className={`w-full p-5 rounded-2xl border text-left transition-all group ${ACCENT[cat.color]} hover:scale-[1.02]`}
                >
                  <div className="text-xs font-mono tracking-widest uppercase mb-2 opacity-60">
                    {cat.products.length} products
                  </div>
                  <div className="font-bold text-white text-sm leading-snug mb-2 group-hover:brightness-125 transition-all">
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
          "E&P Companies",
          "Refinery & Petrochemical Operators",
          "EPC Contractors",
          "FPSO & Offshore Platform Operators",
          "Pipeline & Midstream Companies",
          "LNG & Gas Processing Plants",
          "Oilfield Services Companies",
          "Power Plant & Utility Operators",
          "Industrial Plant Engineering Teams",
          "Mining, Port & Coal Handling Operators",
        ]}
      />

      <CTABanner
        title="Source Oil & Gas Equipment & Materials"
        subtitle="Share your specifications, drawings or bill of materials. Our oil & gas sourcing team will identify certified, traceable suppliers ready to deliver."
      />
      <Footer />
    </main>
  );
}