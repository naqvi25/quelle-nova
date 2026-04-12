"use client";

import { useState } from "react";
import {
  Cpu, Cable, Box, Shield, Zap, Layers,
  Wind, Thermometer, FlaskConical, Settings,
  Radio, BarChart2, ChevronRight,
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
    id: "sensors",
    label: "Environmental & Gas Sensors",
    color: "cyan",
    description: "Air quality, gas, flow and CO₂ sensing modules for IAQ devices, HVAC systems and industrial monitoring applications.",
    products: [
      {
        icon: Wind,
        title: "Environmental Combo Sensor Modules",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["VOC, humidity & temperature in one module","Variants adding particulate sensing & computed indices","Integrated algorithms & low-power modes","Quick design-in for IAQ appliances","Multi-SKU OEM lineup compatible"],
      },
      {
        icon: Wind,
        title: "Environmental Node Modules (PM + RH/T + VOC/NOx + CO₂)",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: ["Consistent interface across PM, VOC, NOx & CO₂ variants","Scalable sensor stacks from PM-only upward","HCHO variant available","Multi-SKU OEM lineup support","Designed for air quality node products"],
      },
      {
        icon: FlaskConical,
        title: "Formaldehyde Sensor Modules",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
        items: ["Dedicated HCHO sensing modules","High sensitivity & selectivity at low concentrations","For indoor air quality monitoring","Compatible with IAQ devices & appliances","Stable long-term output for embedded use"],
      },
      {
        icon: Thermometer,
        title: "CO₂ Sensor Modules (NDIR / Photoacoustic)",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["NDIR & photoacoustic measurement methods","Integrated humidity/temperature compensation","Stable long-term accuracy for HVAC & IAQ","Compact module for embedded design-in","Suitable for ventilation & building automation"],
      },
      {
        icon: Zap,
        title: "High-Concentration CO₂ Sensors",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: ["Thermal conductivity measurement principle","Fast response in high concentration environments","Ultra-low power operation","Industrial process & safety monitoring","No cross-sensitivity to common interferents"],
      },
      {
        icon: Settings,
        title: "Gas & Liquid Flow Sensors",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
        items: ["Thermal-based mass flow measurement","Fast, reliable & accurate for OEM volume applications","Gas & liquid media compatible variants","Low dead volume for compact plumbing","Long-term stability for embedded metering"],
      },
      {
        icon: Radio,
        title: "Smart Gas Meter Modules",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["No moving parts — long-term stability","Low power for extended battery life","Contamination resistance by design","Certified gas metering compatible","Next-gen fuels & hydrogen ready"],
      },
    ],
  },
  {
    id: "passives",
    label: "Passive Components",
    color: "blue",
    description: "Inductors, power inductors and tantalum capacitor families for filtering, energy storage, EMI suppression and power rail decoupling.",
    products: [
      {
        icon: Zap,
        title: "Inductors & Power Inductors",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["Chip inductors — moulded & wire-wound types","Shielded & unshielded configurations","Ferrite bead components for EMI suppression","Power inductors for energy storage & filtering","Compact footprint for dense PCB layouts"],
      },
      {
        icon: Cpu,
        title: "Tantalum Capacitors (General Purpose)",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: ["Stable capacitance in compact form factors","Broad application across electronics designs","High reliability series available","Specified for size, stability & electrical performance","Standard & extended temperature ranges"],
      },
      {
        icon: Cpu,
        title: "Automotive-Grade Tantalum Capacitors",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
        items: ["IATF-oriented supply discipline & quality systems","Endurance in harsher thermal & vibration environments","Selected for vehicle electronics stability","Consistent performance over extended service life","AEC-Q200 qualified variants available"],
      },
      {
        icon: Cpu,
        title: "High-Temperature Tantalum Capacitors",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: ["Suitable for elevated ambient & self-heating designs","Maintains performance at temperature extremes","Automotive, industrial & power electronics focus","Critical temperature headroom for dense assemblies","Stable characteristics vs conventional grades"],
      },
      {
        icon: Cpu,
        title: "Polymer Tantalum Capacitors",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["Lower ESR vs liquid-electrolyte designs","Improved ripple handling on power rails","High-frequency decoupling applications","Better transient response for switching regulators","Reduced risk of catastrophic failure mode"],
      },
      {
        icon: Cpu,
        title: "Liquid Tantalum Capacitors",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Classic tantalum stability & volumetric efficiency","Broad capacitance/voltage range selection","Suitable for established circuit designs","Reliable ripple & thermal performance","Long service history in demanding applications"],
      },
    ],
  },
  {
    id: "power",
    label: "Power & Distribution",
    color: "amber",
    description: "Overhead conductors, cables, transformers and busduct systems for utility, industrial and rail power infrastructure.",
    products: [
      {
        icon: Cable,
        title: "Medium Voltage Covered Conductors (MVCC)",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
        items: ["Insulated overhead conductors for MV networks","Reduces faults from vegetation contact","Supports tighter clearances & outdoor pollution resistance","Improved network safety & reliability","Suitable for forested & urban overhead routes"],
      },
      {
        icon: Cable,
        title: "Overhead Conductors (AA / ACSR / AAAC / EHV)",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80",
        items: ["AA, ACSR, AAAC & EHV conductor families","Supports utility network build-outs","Multiple voltage class options","Consistent mechanical & electrical ratings","Transmission & distribution applications"],
      },
      {
        icon: Cable,
        title: "LT Aerial Bunched Cables (ABC)",
        image: "https://images.unsplash.com/photo-1548946526-f69d2523de8e?w=600&q=80",
        items: ["Low-voltage bunched cables for distribution","Safer & more reliable in populated areas","Last-mile electrification programs","Reduced risk of contact & outage","Suitable for urban & semi-urban networks"],
      },
      {
        icon: Zap,
        title: "Distribution Transformers (Single / Three-Phase)",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Single & three-phase configurations","Utility & industrial distribution networks","Standard voltage ratio options","Compliant to relevant IEC/IS standards","Consistent manufacturing quality & supply"],
      },
      {
        icon: Zap,
        title: "Power Transformers (Medium Power)",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Higher-capacity for substations & industrial power","Grid interface reliability critical applications","Medium power range for utility integration","Consistent insulation & thermal performance","Custom ratio & specification options"],
      },
      {
        icon: Zap,
        title: "Eco-Design Transformers",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
        items: ["Energy-efficiency focused transformer builds","Aligned to eco-design procurement requirements","Suitable for regulated European & export markets","Lower no-load & load losses vs standard designs","Supports green building & energy programs"],
      },
      {
        icon: Zap,
        title: "Locomotive Transformers (Traction)",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
        items: ["Designed for heavy rail traction duty cycles","Thermal stability under continuous load","Compatible with AC traction system architectures","High vibration & shock resistance","Qualified for railway operating environments"],
      },
      {
        icon: Box,
        title: "Busduct Systems (LV & MV Busbar Duct)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Enclosed busbars for high-current distribution","Alternative to large cable bundles for risers","Low losses & scalable tap-off configurations","Transformer, generator & distribution runs","Neat routing for industrial & commercial buildings"],
      },
      {
        icon: Box,
        title: "Busbar Trunking (LV Bustrunking)",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Modular trunking with plug-in tap-off points","Faster reconfiguration vs fixed cable systems","Cleaner & safer installation for factories","Suitable for warehouses & large commercial buildings","Flexible tap-off positions along the run"],
      },
    ],
  },
  {
    id: "panel",
    label: "Panel, Control & Switchgear",
    color: "indigo",
    description: "DIN-rail terminals, contactors, relays, switchgear, switchboards and control devices for electrical panels and industrial automation.",
    products: [
      {
        icon: Settings,
        title: "DIN-Rail Terminal Blocks & Panel Connectivity",
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&q=80",
        items: ["Modular DIN-rail terminal blocks for electrical panels","Secure terminations with quick installation","Jumpers, markers & common accessories","Standardised panel layout compatibility","Fast serviceability & maintenance access"],
      },
      {
        icon: Radio,
        title: "Relay Interface Modules",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["Electrical isolation between control & field loads","Clean switching in DIN-rail footprint","Simplifies panel wiring & troubleshooting","Protects PLC/IO while driving higher-current loads","Standard coil voltages & contact configurations"],
      },
      {
        icon: Shield,
        title: "Passive & Protection Modules",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: ["Surge & transient protection for sensitive electronics","Signal conditioning for stable IO","Reduces downtime in harsh electrical environments","Protects instrumentation & PLC inputs","Modular DIN-rail installation"],
      },
      {
        icon: Shield,
        title: "LV Switchgear",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80",
        items: ["Low-voltage switching & protection devices","Distribution panels & industrial electrical systems","Safe isolation & reliable power control","Fault protection for critical uptime applications","Compatible with standard panel architectures"],
      },
      {
        icon: Box,
        title: "LV Switchboards & Panels",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Power distribution & control assemblies","Modular protection devices & busbars","Designed for maintainable electrical architecture","Suitable for plants, buildings & infrastructure","Custom-configured to project specifications"],
      },
      {
        icon: BarChart2,
        title: "Protection & Measurement Devices",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: ["Monitors electrical parameters & protects circuits","Supports energy management & diagnostics","Safer operations through measurement & protection","Panel-mount & DIN-rail configurations","Compatible with standard protection coordination"],
      },
      {
        icon: Zap,
        title: "Power Contactors",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Motor & high-current load switching","Specified by duty category — AC-1, AC-3 etc.","Standard coil voltages for panel integration","Power supplies, heating & HVAC compressors","Long service life under continuous switching duty"],
      },
      {
        icon: Shield,
        title: "Overload Relays",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
        items: ["Thermal & electronic overload relay options","Protects motors from overcurrent & overheating","Trips on overload before sustained damage occurs","Used with contactors in motor starter assemblies","Improves equipment life & reduces downtime"],
      },
      {
        icon: Settings,
        title: "Control Relays",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Auxiliary switching for control circuit logic","Clean separation of control & power circuits","Simplifies interlocks & status signalling","Automation wiring & sequential control","Standard coil & contact configurations"],
      },
      {
        icon: Layers,
        title: "Control & Signalling Units",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Pushbuttons, selector switches & key switches","Emergency stops & pilot lights","Panel-mounted operator interface devices","Accessories — guards, labels & contact blocks","Improves usability & safety for machine operators"],
      },
    ],
  },
  {
    id: "appliances",
    label: "Consumer Electronics & Appliances",
    color: "purple",
    description: "OEM & ODM home appliances and consumer electronics supplied as finished units or in SKD form for export and private-label programs.",
    products: [
      {
        icon: Wind,
        title: "Air Conditioners (Cassette / Split / Inverter)",
        image: "https://images.unsplash.com/photo-1621624703024-d28c28c39fe0?w=600&q=80",
        items: ["Cassette, split & inverter AC configurations","OEM/ODM with private-label program support","Export-ready compliance & certification","MOQ-flexible for distributor & brand programs","CBU & SKD supply formats available"],
      },
      {
        icon: Box,
        title: "Washing Machines (Twin Tub / Top / Front Load)",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80",
        items: ["Twin tub, top-load & front-load configurations","OEM/ODM & private-label programs","Export compliance packaging & documentation","Specification-matched sourcing for buyer RFQs","MOQ and volume program flexibility"],
      },
      {
        icon: Box,
        title: "Refrigerators (Single / Double / Multi-Door)",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
        items: ["Single, double & multi-door configurations","Inverter & conventional compressor variants","OEM/ODM with private-label support","Export-ready compliance & documentation","Capacity & specification-matched supply"],
      },
      {
        icon: Wind,
        title: "Air Coolers (Personal / Commercial / Desert)",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
        items: ["Personal, commercial & desert cooler range","OEM/ODM & private-label program support","Specification & MOQ-flexible sourcing","Export-ready packaging & documentation","Suitable for South Asia & Middle East markets"],
      },
      {
        icon: Thermometer,
        title: "Water Heaters",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Multiple capacity band options","Storage & instant heater configurations","OEM/ODM with compliance documentation","Private-label programs for distribution brands","Export-ready supply with MOQ flexibility"],
      },
      {
        icon: Settings,
        title: "Mixer Grinders",
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80",
        items: ["Multiple power tier options","OEM/ODM & private-label programs","Compliance documentation for export markets","Specification-matched sourcing for buyer RFQs","Flexible MOQ for distributor programs"],
      },
      {
        icon: Zap,
        title: "Fans (Ceiling & Others)",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
        items: ["Ceiling & pedestal fan configurations","BLDC & conventional motor options","OEM/ODM with private-label support","Energy-rated variants for regulated markets","Export-ready compliance & packaging"],
      },
      {
        icon: Zap,
        title: "LED Lighting Products",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
        items: ["Full LED lighting product portfolio","Bulbs, panels, streetlights & commercial fixtures","OEM/ODM & private-label programs","Energy-rated & compliance-certified variants","Export programs with MOQ flexibility"],
      },
      {
        icon: Cpu,
        title: "Batteries (Automotive + Solar / Storage)",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
        items: ["Automotive & solar storage battery types","Lead-acid, lithium & gel variants available","OEM supply for automotive & energy programs","Private-label & distributor program support","Compliance documentation for target markets"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
};

export default function ElectronicsPage() {
  const [activeCategory, setActiveCategory] = useState("sensors");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Electronics & Electrical"
        title="Electronics, Electrical &"
        titleAccent="Component Sourcing"
        subtitle="From environmental sensors and passive components to power infrastructure, panel systems and consumer electronics — one verified network for your full electronics and electrical sourcing requirements."
        image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80"
        breadcrumb="Industries / Electronics & Electrical"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                One Platform for{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Electronics & Electrical
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source across the full electronics and electrical spectrum — from precision sensing modules and passive components to power distribution infrastructure, industrial panel components and consumer appliances for OEM and export programs.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Whether you need IPC-compliant assemblies, utility-grade conductors, certified panel components or private-label appliances, our verified supplier network covers the complete range with consistent quality and compliance support.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Sensing & IAQ",         "Environmental, gas & flow sensor modules"],
                  ["Passives & Components", "Inductors & tantalum capacitors for electronics assemblies"],
                  ["Power & Distribution",  "Conductors, transformers & busduct for utility & industrial"],
                  ["Panel & Control",       "Switchgear, terminals, contactors & control devices"],
                  ["Consumer Appliances",   "OEM/ODM appliances & electronics for export programs"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(6,182,212,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-cyan-300 transition-colors">{title}</div>
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
          "Industrial OEMs",
          "HVAC & Building Automation Companies",
          "Utility & Power Distribution Companies",
          "Automation & Control System Integrators",
          "EV & Mobility Brands",
          "Defence Electronics Firms",
          "Medical Device Companies",
          "Consumer Electronics Brands",
          "Export Trading Companies",
          "Panel Builders & Electrical Contractors",
        ]}
      />

      <CTABanner
        title="Source Electronics & Electrical Components"
        subtitle="Share your specifications, BOM or product requirements. We will identify qualified, compliant manufacturers ready to supply across any of our five segments."
      />
      <Footer />
    </main>
  );
}