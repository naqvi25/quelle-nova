"use client";

import { useState } from "react";
import {
  Settings, Zap, Cpu, Shield, Layers, Box,
  Radio, Navigation, Plane, Leaf, ChevronRight,
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
    id: "propulsion",
    label: "Propulsion & Power",
    color: "blue",
    description: "Motors, ESCs, power distribution and energy systems — the core powertrain components for any UAV build.",
    products: [
      {
        icon: Zap,
        title: "UAV BLDC Motors (Outrunners)",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: [
          "Outrunner brushless motors for drone & FPV builds",
          "Balanced efficiency & throttle response across voltages",
          "Multiple KV ratings for varied payload & endurance",
          "Compatible with standard motor mount patterns",
          "Tested for vibration, heat & continuous duty",
        ],
      },
      {
        icon: Settings,
        title: "Electronic Speed Controllers (ESCs)",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: [
          "PWM & DShot protocol support",
          "Fast response for stable, reliable powertrains",
          "Multi-rotor & fixed-wing compatible families",
          "Overcurrent, overheat & failsafe protections",
          "Single & 4-in-1 board configurations",
        ],
      },
      {
        icon: Zap,
        title: "Power Distribution Boards (PDB)",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "High-current distribution to multiple ESCs",
          "Regulated 12V & 5V rails for onboard electronics",
          "Simplified wiring in high-voltage builds",
          "Compact form factor for tight airframe packaging",
          "Solder pad & XT60/XT90 connector options",
        ],
      },
      {
        icon: Box,
        title: "Capacitor Banks (Voltage Stabilisation)",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: [
          "Smooths voltage spikes during rapid throttle changes",
          "Reduces electrical noise for ESC & electronics",
          "Improves reliability in aggressive flight profiles",
          "Drop-in modules for most PDB form factors",
          "High capacitance for large multi-rotor platforms",
        ],
      },
      {
        icon: Cpu,
        title: "BEC & DC-DC Converters",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: [
          "Regulated voltage supply for avionics & payloads",
          "Wide input voltage range for LiPo compatibility",
          "Linear & switching BEC options",
          "Low ripple output for sensitive electronics",
          "Compact footprint for airframe integration",
        ],
      },
      {
        icon: Settings,
        title: "Integrated Propulsion Units",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        items: [
          "Motor + ESC integrated propulsion modules",
          "Simplified assembly for custom drone platforms",
          "Rugged design for repeatable performance",
          "Reduced wiring complexity & weight",
          "Suitable for volume production UAV programs",
        ],
      },
    ],
  },
  {
    id: "avionics",
    label: "Avionics & Navigation",
    color: "cyan",
    description: "Flight controllers, GNSS modules and ground control platforms for precise, reliable UAV operations.",
    products: [
      {
        icon: Cpu,
        title: "Flight Controller Boards",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: [
          "High-performance FC for multi-rotor & fixed-wing UAVs",
          "Open-source firmware compatible — ArduPilot, PX4",
          "Real-time stabilisation & sensor fusion",
          "Advanced sensor & connectivity interfaces",
          "Suitable for custom & commercial drone platforms",
        ],
      },
      {
        icon: Navigation,
        title: "GNSS + Compass Navigation Modules",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        items: [
          "Multi-constellation GNSS — GPS, GLONASS, BeiDou",
          "High-sensitivity compass with DroneCAN integration",
          "Improved positioning & heading stability",
          "Reduced interference in congested RF environments",
          "Compact module for tight airframe packaging",
        ],
      },
      {
        icon: Radio,
        title: "Drone Ground Control & Operations Platform",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: [
          "Live tracking & live video streaming",
          "Web-based mission planning & synchronisation",
          "Leasing & fleet management workflows",
          "Developer APIs for third-party drone integration",
          "Enterprise-grade platform for commercial operators",
        ],
      },
      {
        icon: Shield,
        title: "GNSS-Denied Navigation & Autonomy Stack",
        image: "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
        items: [
          "Navigation in GPS & radio-jammed environments",
          "Onboard autonomy maintains flight without GNSS",
          "Obstacle avoidance under signal denial",
          "Suitable for ISR, public safety & enterprise inspection",
          "Resilient against electronic warfare countermeasures",
        ],
      },
    ],
  },
  {
    id: "platforms",
    label: "Complete UAV Platforms",
    color: "purple",
    description: "Ready-to-operate drone platforms for agriculture, logistics, mapping and commercial applications.",
    products: [
      {
        icon: Leaf,
        title: "Agricultural Spraying Drone (10L Class)",
        image: "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=600&q=80",
        items: [
          "Precision spraying with 10L tank payload",
          "GPS waypoint missions for consistent field coverage",
          "Fail-safes for safe farm operations",
          "Reduces chemical input waste & labour",
          "Faster, more uniform application vs ground methods",
        ],
      },
      {
        icon: Plane,
        title: "Kisan Agri Drone (Precision Agriculture UAV)",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80",
        items: [
          "Precision farming workflows & spray coverage",
          "Improved operational productivity per acre",
          "Drone-based application & farm support missions",
          "Compatible with smart farming management systems",
          "Supported agri drone services & solutions",
        ],
      },
      {
        icon: Box,
        title: "Medical Logistics Drone",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        items: [
          "Medical supply delivery — last-mile & emergency",
          "Rapid deployment & repeatable mission profiles",
          "Rural & remote area access capability",
          "Payload-secured delivery mechanism",
          "Flight planning integration for logistics networks",
        ],
      },
      {
        icon: Cpu,
        title: "Compact / Micro Quadcopter (Mapping & Airdrop)",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        items: [
          "Lightweight class for mapping & video transmission",
          "Small payload & airdrop capability",
          "Portable & quick-deployment design",
          "Waypoint mission support",
          "Suitable for inspection & survey tasks",
        ],
      },
    ],
  },
  {
    id: "defence",
    label: "Defence & ISR",
    color: "amber",
    description: "Tactical UAV platforms, surveillance payloads and systems engineering for defence and public safety applications.",
    products: [
      {
        icon: Shield,
        title: "AI Quadcopter (SAR / ISR)",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&q=80",
        items: [
          "Search-and-rescue & surveillance missions",
          "Onboard AI for detection & tracking",
          "Visual & IR feed processing",
          "Autonomous navigation to points of interest",
          "Compact form factor for rapid deployment",
        ],
      },
      {
        icon: Shield,
        title: "Tactical Micro-UAV for Border Surveillance",
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=600&q=80",
        items: [
          "Visual + IR cameras for border monitoring",
          "Waypoint missions & manual FPV flight modes",
          "Multi-kilometer operating range for ISR coverage",
          "Lightweight field deployment design",
          "Rapid patrol & reconnaissance capability",
        ],
      },
      {
        icon: Layers,
        title: "Stabilised EO/IR Gimbal Payloads",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: [
          "Combined thermal & daylight camera gimbals",
          "ISR, surveillance & target tracking missions",
          "Stable line-of-sight & vibration isolation",
          "Multi-axis stabilisation for moving UAV platforms",
          "Compatible with tactical & commercial UAVs",
        ],
      },
      {
        icon: Plane,
        title: "UAV Platform: G400 (Surveillance Drone)",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=600&q=80",
        items: [
          "Surveillance-focused fixed-wing UAV platform",
          "Extended endurance for persistent ISR missions",
          "Payload bay for EO/IR sensor integration",
          "Autonomous waypoint & loiter mission capability",
          "Field-deployable without fixed infrastructure",
        ],
      },
    ],
  },
  {
    id: "structures",
    label: "Structures, Composites & Engineering",
    color: "indigo",
    description: "Carbon fibre airframes, composite structures and full UAV systems engineering from design through test.",
    products: [
      {
        icon: Settings,
        title: "Carbon Fibre UAV Frames & Structural Parts",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
        items: [
          "Carbon-fibre drone frames & structural elements",
          "Sheets, tubes & rods for custom airframe builds",
          "Improved stiffness-to-weight ratio",
          "Reduced vibration for better endurance & stability",
          "Compatible with multi-rotor & fixed-wing designs",
        ],
      },
      {
        icon: Layers,
        title: "Lightweight Composite Structures",
        image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=600&q=80",
        items: [
          "Thermoplastic tape-wound & filament-wound parts",
          "Improved repeatability & scalability for UAV structures",
          "High strength-to-weight for performance builds",
          "Custom geometry to airframe drawings",
          "Production-ready composite manufacturing",
        ],
      },
      {
        icon: Cpu,
        title: "UAV Systems Engineering",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Aerodynamics, flight controls & dynamics",
          "Flight testing & simulation support",
          "Composite aero-structures & propulsion development",
          "Complete UAV platform development — design to test",
          "Certification readiness support",
        ],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
};

const SEGMENT_IMAGES: Record<string, string> = {
  propulsion: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  avionics:   "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
  platforms:  "https://images.unsplash.com/photo-1566618636113-34169c4b6dce?w=600&q=80",
  defence:    "https://images.unsplash.com/photo-1534996858221-380b92700493?w=600&q=80",
  structures: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
};

export default function DronesPage() {
  const [activeCategory, setActiveCategory] = useState("propulsion");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;

  const totalProducts = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Drones & UAV Components"
        title="End-to-End UAV"
        titleAccent="Sourcing & Systems"
        subtitle="From motors and flight controllers to complete tactical platforms and systems engineering — we source every layer of the UAV stack for commercial, agricultural, inspection and defence programmes."
        image="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1600&q=80"
        breadcrumb="Industries / Drones & Components"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Every Layer of the{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  UAV Stack
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source precision UAV components, complete drone platforms and systems engineering services across commercial, agricultural, inspection and defence segments. Whether you need individual components or a full platform, our verified network spans propulsion manufacturers, avionics specialists, airframe fabricators and payload integrators.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                From prototype builds to volume production programs, we align UAV OEMs and integrators with suppliers capable of meeting aerospace-grade tolerances, certification requirements and programme timelines.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Civil & Commercial",  "Mapping, inspection & delivery drones"],
                  ["Agriculture",         "Precision spraying & smart farming UAVs"],
                  ["Defence & ISR",       "Tactical, surveillance & SAR platforms"],
                  ["Systems Engineering", "Design, test & certification support"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 6, borderColor: "rgba(6,182,212,0.4)" }}
                      className="flex items-center gap-5 p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-base mb-1 group-hover:text-cyan-300 transition-colors">
                          {title}
                        </div>
                        <div className="text-zinc-400 text-sm leading-relaxed">{desc}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Category Navigator + Products ─────────────────── */}
      <section id="products-section" className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <SectionLabel text="Product & Capability Coverage" />
            <h2 className="text-4xl font-bold text-white mb-2">What We Source</h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {totalProducts} product categories across {CATEGORIES.length} segments. Select a segment to explore.
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
                  <ProductCard key={p.title} {...p} delay={i * 0.06} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── All Segments Summary ───────────────────────────── */}
      <section className="relative py-16 bg-slate-900 border-y border-white/5">
        <SlateBackground />
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
                  whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                  className={`w-full p-5 rounded-2xl border text-left transition-all group ${ACCENT[cat.color]} hover:scale-[1.02]`}
                >
                  <div className="text-xs font-mono tracking-widest uppercase mb-2 opacity-60">
                    {cat.products.length} products
                  </div>
                  <div className="font-bold text-white text-sm leading-snug group-hover:brightness-125 transition-all">
                    {cat.label}
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-2">
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
          "UAV OEMs & Integrators",
          "Defence Programs & DPSUs",
          "Agricultural Drone Companies",
          "Inspection & Survey Firms",
          "Medical & Humanitarian Logistics",
          "Logistics & Delivery Drone Operators",
          "Government & Public Safety Agencies",
          "UAV Systems Engineering Teams",
        ]}
      />

      <CTABanner
        title="Source UAV Components & Platforms"
        subtitle="Share your technical requirements, payload specs or BOM. We will identify certified suppliers and complete platform options aligned to your programme."
      />
      <Footer />
    </main>
  );
}