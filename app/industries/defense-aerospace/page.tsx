"use client";

import { useState } from "react";
import {
  Wrench, Layers, Cpu, Shield, Box,
  Settings, Target, Radio, Navigation, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel,
  Stagger, StaggerItem,
} from "@/components/ui/shared";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "precision",
    label: "Precision Manufacturing",
    color: "blue",
    description: "CNC machined components, castings, forgings, sheet metal fabrication, kitting and lightweight magnesium structures — supplied with full traceability for aerospace and defence programmes.",
    products: [
      {
        icon: Wrench,
        title: "Precision Machined Aerospace Components",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "CNC machined parts for aerospace assemblies",
          "Tolerance control, traceability & repeatable quality",
          "Integration-ready hardware to customer drawing",
          "Material certifications & first-article documentation",
          "Structural, mechanical & housing applications",
        ],
      },
      {
        icon: Box,
        title: "Aerospace Castings",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "Casting supply for aerospace-adjacent hardware",
          "Near-net shaping for efficient final machining",
          "Structural integrity to aerospace material specs",
          "NDT inspection & material traceability included",
          "Sand, investment & die casting routes",
        ],
      },
      {
        icon: Wrench,
        title: "Aerospace Forged Components (Ti / Al)",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: [
          "Forged & machined parts in titanium & aluminium alloys",
          "Fatigue performance & material integrity driven selection",
          "Strength-critical aerospace part supply",
          "Consistent metallurgy at medium to high volumes",
          "Full material & processing traceability",
        ],
      },
      {
        icon: Settings,
        title: "Ring Rolling & Radial Forging",
        image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80",
        items: [
          "Ring and specialty geometry forging routes",
          "High-load rotating & structural aerospace parts",
          "Optimised material utilisation vs billet machining",
          "Improved grain flow for fatigue performance",
          "Supplied to aerospace drawing & specification",
        ],
      },
      {
        icon: Layers,
        title: "Aerospace Sheet Metal Fabrication",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: [
          "Formed sheet-metal parts & fabricated hardware",
          "Aerospace structures, panels & enclosures",
          "Weight, stiffness & repeatable forming focus",
          "Surface treatments for corrosion protection",
          "Supplied to drawing with dimensional verification",
        ],
      },
      {
        icon: Box,
        title: "Aerospace Kitting & Assemblies",
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
        items: [
          "BOM-based kitting & coordinated shipsets",
          "Reduces integration time & procurement friction",
          "Simultaneous supply of multi-part assemblies",
          "Program-aligned delivery scheduling",
          "Suitable for MRO, production & upgrade programmes",
        ],
      },
      {
        icon: Settings,
        title: "Aerospace Injection Moulded Components",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
        items: [
          "High-performance polymer injection moulding",
          "Aerospace interiors & sub-assemblies",
          "Lightweight, repeatable geometry at scale",
          "Engineering polymers — PEEK, PPS, ULTEM",
          "Qualified tooling & process control documentation",
        ],
      },
      {
        icon: Wrench,
        title: "Metal Injection Moulded (MIM) Components",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Small, complex metal parts via MIM process",
          "Repeatable high-volume manufacturing",
          "Part consolidation reduces machining burden",
          "Precision geometry in stainless, titanium & alloys",
          "Brackets, fasteners & sub-components",
        ],
      },
      {
        icon: Box,
        title: "Magnesium Alloy Castings & Machining",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: [
          "Sand, gravity & HPDC magnesium alloy casting",
          "CNC-machined lightweight housings & structures",
          "Weight reduction & vibration damping benefits",
          "Repeatable geometry for production programmes",
          "Aerospace, UAV & defence applications",
        ],
      },
      {
        icon: Layers,
        title: "Magnesium Extrusions & Forged Blocks",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: [
          "Extruded profiles & forged block starting stock",
          "Precision machining programs for lightweight parts",
          "Reduces mass while retaining machining allowance",
          "Aerospace & UAV lightweight structure supply",
          "Consistent alloy grade & temper supply",
        ],
      },
    ],
  },
  {
    id: "composites",
    label: "Composites & Materials",
    color: "purple",
    description: "Autoclave and OOA composite structures, thermoset and thermoplastic prepreg systems, radome materials, composite tooling prepregs and full post-mold finishing for aerospace programmes.",
    products: [
      {
        icon: Layers,
        title: "Autoclave & Out-of-Autoclave Composite Structures",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
        items: [
          "Composite structures via autoclave & OOA routes",
          "Balances performance, part size & production scalability",
          "Aerospace-grade process control & documentation",
          "Carbon, glass & hybrid fibre system variants",
          "Structural certification support documentation",
        ],
      },
      {
        icon: Settings,
        title: "Cleanroom Composite Assembly",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        items: [
          "Cleanroom assembly for contamination-sensitive builds",
          "Disciplined workmanship for flight & space programmes",
          "Controlled environment bonding & layup",
          "Primary & secondary aerospace structure capability",
          "Full process documentation & traceability",
        ],
      },
      {
        icon: Wrench,
        title: "Composite Finishing",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Post-mold CNC trimming & precision machining",
          "Structural bonding & adhesive joining operations",
          "Shipset kitting to programme delivery schedule",
          "Protective painting & surface coating",
          "Install-ready composite hardware delivery",
        ],
      },
      {
        icon: Layers,
        title: "Thermoplastic Composite Parts",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
        items: [
          "Stamp-formed & press-consolidated thermoplastic composites",
          "Lightweight parts with scalable cycle times",
          "Impact resistance & FST performance for interiors",
          "Aeronautics & aviation programme supply",
          "Repeatable geometry for volume production",
        ],
      },
      {
        icon: Box,
        title: "Thermoset Moulding (High Thermal Resistance)",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        items: [
          "Thermoset polymer moulding for aerospace parts",
          "Dimensional stability in demanding environments",
          "High thermal resistance for hot-zone applications",
          "Complex geometry moulding capability",
          "Supplied to aerospace drawing & specification",
        ],
      },
      {
        icon: Layers,
        title: "Thermoset Prepregs (Structural)",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
        items: [
          "Prepreg systems for lightweight, high-strength structures",
          "Autoclave & OOA processing route options",
          "Carbon & glass fibre system variants",
          "Certified to aerospace material specifications",
          "Consistent resin content & fibre areal weight",
        ],
      },
      {
        icon: Layers,
        title: "Thermoplastic UD Tapes & Prepregs",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        items: [
          "UD tape & prepreg for structures & interiors",
          "Impact resistance advantage over thermoset",
          "FST (flammability, smoke, toxicity) performance",
          "Suitable for automated tape laying (ATL/AFP)",
          "Aerospace & UAV structural programmes",
        ],
      },
      {
        icon: Radio,
        title: "Low-Loss Radome & Antenna Composite Materials",
        image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
        items: [
          "Composite systems for radomes & antenna structures",
          "Low dielectric loss & RF signal compatibility",
          "Protection without signal performance degradation",
          "Quartz, glass & specialty fibre system variants",
          "Qualified for airborne & ground-based antenna programmes",
        ],
      },
      {
        icon: Settings,
        title: "Composite Tooling Prepregs",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Tooling prepregs for composite mould fabrication",
          "Stable dimensions & consistent surface finish",
          "Low CTE materials for high-temperature cure tools",
          "Supports autoclave & OOA tool builds",
          "Long tool life under production conditions",
        ],
      },
      {
        icon: Layers,
        title: "High-Temperature Composite Prepreg Systems",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
        items: [
          "BMI, cyanate ester & polyimide class prepregs",
          "Higher service temperature aerospace environments",
          "Dimensional stability under thermal cycling",
          "Engine bay, nacelle & hot-zone structure supply",
          "Material qualification data pack available",
        ],
      },
      {
        icon: Wrench,
        title: "Tooling, Jigs & Fixtures",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: [
          "In-house tooling, jigs & fixtures capability",
          "Accelerates NPI and stabilises repeat builds",
          "Geometry control & process repeatability",
          "Composite, metal & hybrid assembly support",
          "Reduces integration risk across aerospace programmes",
        ],
      },
    ],
  },
  {
    id: "avionics",
    label: "Avionics & Electronics",
    color: "cyan",
    description: "AS9100 PCBA, RF modules, wire harnesses, avionics flight sub-systems, PTFE instrumentation cables and 3D metrology for aerospace and UAV programmes.",
    products: [
      {
        icon: Cpu,
        title: "AS9100 Electronics Manufacturing",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: [
          "PCBA, RF modules & cable/wire harnesses",
          "Aerospace quality expectations & IPC class capability",
          "Cleanroom & controlled environment assembly",
          "System integration & functional test",
          "Full traceability & documentation package",
        ],
      },
      {
        icon: Navigation,
        title: "Avionics Electronics & Flight Sub-Systems",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: [
          "Control electronics & avionics-aligned builds",
          "Aircraft & UAV programme supply",
          "Documentation & reliability focus",
          "Certified avionics-adjacent manufacturing capability",
          "Autopilot & flight management sub-systems",
        ],
      },
      {
        icon: Cpu,
        title: "Aerospace Data & Instrumentation Cabling (PTFE)",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: [
          "PTFE cable families for aerospace environments",
          "CAT6, thermocouple compensating & high-temp wires",
          "Thermal & chemical resistance focus",
          "Stable electrical characteristics at temperature",
          "Supplied to MIL-spec & aerospace cable standards",
        ],
      },
      {
        icon: Target,
        title: "3D Measurement & Inspection",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
        items: [
          "CMM & 3D metrology for aerospace assemblies",
          "Geometry and conformity verification",
          "Reduces integration risk for complex structures",
          "First-article inspection documentation",
          "Supports AS9102 & customer-specific FAI requirements",
        ],
      },
    ],
  },
  {
    id: "weapons",
    label: "Weapons & Ammunition",
    color: "amber",
    description: "Defence-grade firearm components, ammunition hardware and aerial recovery systems for military and force supply programmes.",
    products: [
      {
        icon: Settings,
        title: "Firearm Components",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "Barrels — precision-rifled to specification",
          "Bolt carriers & bolts — repeatable tolerances",
          "Upper & lower receivers — machined alloy",
          "Magazines — Glock-style & programme variants",
          "Muzzle brakes & suppressors — CNC machined",
        ],
      },
      {
        icon: Box,
        title: "Ammunition Components",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80",
        items: [
          "Shell bodies & metal hardware components",
          "Supplied as parts — not complete systems",
          "Repeatable machining, casting & forging quality",
          "Consistent dimensional & material standards",
          "Defence supply chain traceability & documentation",
        ],
      },
      {
        icon: Shield,
        title: "Ammunition (Defence Supply)",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
        items: [
          "Defence ammunition for force supply programmes",
          "Consistent manufacturing & safety standards",
          "Compliance to applicable defence specifications",
          "Certification & documentation support",
          "Procurement support for authorised defence buyers",
        ],
      },
      {
        icon: Navigation,
        title: "Parachutes & Aerial Recovery Systems",
        image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
        items: [
          "Aerospace textile systems for controlled descent",
          "Cargo drop & space module recovery applications",
          "Reliable deployment & predictable descent profile",
          "Military & aerospace programme supply",
          "Supplied to load & deployment specification",
        ],
      },
    ],
  },
  {
    id: "simulation",
    label: "Simulation & Training",
    color: "indigo",
    description: "High-fidelity defence training simulators covering armoured vehicles, infantry VR, mortars, MANPADS, military driving, maritime and scenario editor tools.",
    products: [
      {
        icon: Target,
        title: "Armoured Vehicle Simulator (T72 / T90 / BMP II)",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
        items: [
          "Full-scale replica MBT on 6-DOF motion platform",
          "Trains Driver, Gunner & Commander concurrently",
          "Day/night periscope views, CGI terrain & mock sights",
          "Convertible kits — T72, T90 & BMP II variants",
          "Instructor station with real-time monitoring & AAR",
        ],
      },
      {
        icon: Navigation,
        title: "Military Vehicle Driving Simulator",
        image: "https://images.unsplash.com/photo-1502163140606-888448ae8cfe?w=600&q=80",
        items: [
          "Full-scale driver station with force-feedback steering",
          "Rigid trucks, articulated, tanker, BEML Tatra, KRAZ, armoured & electric bus support",
          "180° HD display — configurable terrain & weather",
          "Convoy, off-road, hazmat & mission planning exercises",
          "Interchangeable hardware/software convertible kits",
        ],
      },
      {
        icon: Target,
        title: "Infantry Combat Training Simulator (VR)",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&q=80",
        items: [
          "VR-based firearm training — marksmanship & tactics",
          "Pistols, rifles, LMGs, carbines & sniper rifles",
          "Six progressive training levels — squad to judgemental",
          "Full-body motion suits with haptic feedback & biometrics",
          "Instructor station & TMS cloud for remote management",
        ],
      },
      {
        icon: Target,
        title: "81mm Mortar Simulator",
        image: "https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?w=600&q=80",
        items: [
          "Replicates complete 81mm mortar firing cycle",
          "Dummy HE, smoke & illumination rounds",
          "MFC, Position Controller & Mortar Squad consoles",
          "20×20 km digital terrains with weather & time-of-day",
          "Automatic AAR for platoon/brigade fire missions",
        ],
      },
      {
        icon: Shield,
        title: "IGLA VSHORAD Missile Simulator (MANPADS)",
        image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
        items: [
          "Trains IGLA MANPADS operators without live missiles",
          "Full cycle — detection, GPSS, acquisition & launch",
          "30+ battlefield environments & programmable threats",
          "Day/night engagements with real-time error indicators",
          "Indoor & field training modes with automatic reporting",
        ],
      },
      {
        icon: Radio,
        title: "Weapons Training Simulator (Indoor Small Arms)",
        image: "https://images.unsplash.com/photo-1493217465235-252dd9c0d632?w=600&q=80",
        items: [
          "Indoor scenario-based small arms training system",
          "Replicated terrain & video scenario exercises",
          "Reduces dependence on live ranges & ammunition",
          "Individual & section-level training supported",
          "Measurable drills with performance scoring",
        ],
      },
      {
        icon: Navigation,
        title: "Marine & Offshore Simulation",
        image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=80",
        items: [
          "Simulation & VR for marine/offshore operations",
          "Defence maritime role training support",
          "Operational & tactical decision training",
          "Certified simulation standards compliance",
          "Specialist maritime use-case coverage",
        ],
      },
      {
        icon: Cpu,
        title: "TecknoSIM VSET — Visual Scenario Editor",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
        items: [
          "GUI tool — custom synthetic terrain design, no coding",
          "1,000+ 3D models with drag-and-drop assembly",
          "AI-object property definition & road networks",
          "Dynamic pedestrians, vehicles & complex environments",
          "Integrates directly with TecknoSIM simulator platforms",
        ],
      },
      {
        icon: Target,
        title: "DATS — Driver Aptitude Testing System",
        image: "https://images.unsplash.com/photo-1502163140606-888448ae8cfe?w=600&q=80",
        items: [
          "Psycho-motor fitness assessment for vehicle operators",
          "Six tests — reaction, depth perception, vision & glare",
          "Accelerator/brake assembly & hand controller interface",
          "Identifies elevated accident risk before deployment",
          "Detailed report for targeted driver development",
        ],
      },
    ],
  },
];

// ─── THEME MAPS ───────────────────────────────────────────────────────────────

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
};

const STANDARDS = [
  "AS9100 Rev D", "NADCAP", "MIL-DTL-38999", "MIL-STD-461",
  "IPC/WHMA-A-620", "AS9102 FAI", "ITAR Compliance",
  "ISO 9001:2015", "DGQA Approved", "MIL-Spec Compliant",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DefensePage() {
  const [activeCategory, setActiveCategory] = useState("precision");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Defence & Aerospace"
        title="Aerospace Manufacturing,"
        titleAccent="Defence & Simulation"
        subtitle="Precision aerospace components, composite structures, avionics, defence-grade weapons hardware and high-fidelity training simulators — sourced from verified manufacturers for programme-critical supply chains."
        image="https://images.unsplash.com/photo-1569736934373-53e0e9b34c22?w=1600&q=80"
        breadcrumb="Industries / Defence & Aerospace"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Specification-Driven{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Defence & Aerospace Sourcing
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We support build-to-print and specification-driven sourcing across the full defence and aerospace supply chain — from precision machined components and composite structures through to avionics, weapons hardware and high-fidelity training simulation systems.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Every supplier in our defence and aerospace network is evaluated for quality systems, process capability, traceability and programme compliance — ensuring suitability for mission-critical applications before engagement.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Precision Manufacturing", "Machined, cast, forged & fabricated aerospace hardware to drawing"],
                  ["Composites & Materials",  "Autoclave, OOA, prepreg systems & composite finishing"],
                  ["Avionics & Electronics",  "AS9100 PCBA, RF, harnesses, avionics & metrology"],
                  ["Weapons & Ammunition",    "Firearm components, ammunition hardware & aerial recovery"],
                  ["Simulation & Training",   "Armoured, infantry, mortar, MANPADS & vehicle simulators"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(147,51,234,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-purple-300 transition-colors">{title}</div>
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
            <SectionLabel text="Capability & Product Coverage" />
            <h2 className="text-4xl font-bold text-white mb-2">What We Source</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {total} categories across {CATEGORIES.length} segments. Select a segment to explore.
            </p>
          </FadeIn>

          {/* Tabs */}
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

          {/* Active panel */}
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

      {/* ── Standards Strip ───────────────────────────────── */}
      <section className="py-14 bg-slate-900 border-y border-white/5">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Standards & Certifications We Support</h3>
          </FadeIn>
          <Stagger className="flex flex-wrap justify-center gap-3">
            {STANDARDS.map((std) => (
              <StaggerItem key={std}>
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "rgba(147,51,234,0.5)" }}
                  className="px-4 py-2 rounded-lg border border-purple-500/20 bg-purple-500/5 text-zinc-300 text-sm font-mono tracking-wide transition-all cursor-default"
                >
                  {std}
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Segments Summary ───────────────────────────────── */}
      <section className="relative py-16 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white">All Sourcing Segments</h3>
            <p className="text-zinc-500 mt-2 text-sm">Click any segment to explore its products.</p>
          </FadeIn>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                    {cat.products.length} categories
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
          "Defence OEMs & DPSUs (HAL, BEL, BDL, BEML)",
          "Aerospace Tier-1 & Tier-2 Suppliers",
          "Avionics & Electronic Warfare Integrators",
          "UAV & UAS Manufacturers",
          "Government Defence Programmes",
          "Naval & Land Systems OEMs",
          "Defence Training Establishments",
          "MRO & Sustainment Programmes",
          "Composite Structures Manufacturers",
          "Simulation & Training System Integrators",
        ]}
      />

      <CTABanner
        title="Submit a Defence & Aerospace RFQ"
        subtitle="Share your drawings, specifications or programme requirements. We will identify certified, traceable manufacturers and system suppliers capable of delivering to your exact standards."
      />
      <Footer />
    </main>
  );
}