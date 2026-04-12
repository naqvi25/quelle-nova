"use client";

import { useState } from "react";
import {
  Layers, Settings, Shield, Scissors, Cpu, Shirt,
  Package, Box, Wrench, Hammer, Wind, FlaskConical,
  Battery, Thermometer, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel,
  Stagger, StaggerItem,
} from "@/components/ui/shared";

const CATEGORY_IMAGES: Record<string, string> = {
  manufacturing: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
  hardware:      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
  interior:      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
  composites:    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  vehicles:      "https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&q=80",
};

const CATEGORIES = [
  {
    id: "manufacturing",
    label: "Manufacturing & Components",
    color: "blue",
    description: "Precision-manufactured metal and polymer components across casting, forging, machining and fabrication.",
    products: [
      {
        icon: Wrench,
        title: "Precision Machined Components",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: ["Tight-tolerance CNC turned & milled metal components","Brackets, housings, shafts, spacers & collars","Engineered parts for OEM & Tier supply","Repeatability, surface finish & dimensional control","Medium to high volume batch production"],
      },
      {
        icon: Box,
        title: "Automotive Castings",
        image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=600&q=80",
        items: ["Steel, iron & aluminium cast components","Near-net shaping before finish machining","Housings, brackets, covers & structural parts","Alloy & process selection to application","Material performance validated before supply"],
      },
      {
        icon: Hammer,
        title: "Automotive Forged Components",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: ["Forged & machined strength-critical parts","High fatigue resistance & structural integrity","Consistent metallurgy & geometry at volume","Medium to high volume supply programs","OEM & Tier-1 fitment programs"],
      },
      {
        icon: Layers,
        title: "Sheet Metal Fabrication",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: ["Formed & fabricated sheet-metal vehicle parts","Brackets, mounts, enclosures & panels","Finishing options for corrosion & cosmetic requirements","Vehicle & equipment build applications","Tight-tolerance formed geometries"],
      },
      {
        icon: Package,
        title: "Injection Moulded Automotive Parts",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
        items: ["Engineering polymer components for volume production","Interiors, covers, brackets, clips & housings","Weight reduction & repeatable geometry","Cost-effective high-volume tooling programs","OEM & Tier supply with consistent quality"],
      },
      {
        icon: Settings,
        title: "Kitting & Sub-Assemblies",
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80",
        items: ["Multi-part kitting into install-ready bundles","Sub-assembly supply reducing line-side handling","Reduced procurement complexity for vehicle programs","Custom kitting to OEM specifications","Sequenced delivery for assembly line programs"],
      },
    ],
  },
  {
    id: "hardware",
    label: "Fasteners, Bearings & Batteries",
    color: "indigo",
    description: "Maintenance, replacement and fleet-supply products covering fasteners, bearings and vehicle batteries.",
    products: [
      {
        icon: Shield,
        title: "Bearings — LCV & HCV",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
        items: ["Wheel-end & axle bearings for commercial vehicles","High-load duty cycle geometry & durability","OE cross-reference & vehicle model mapping","Dimensional & fitment-matched supply","Fleet uptime & replacement market programs"],
      },
      {
        icon: Cpu,
        title: "Automotive Fasteners",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: ["Wheel/hub bolts & nuts, U-bolts & studs","Chassis, suspension & driveline fasteners","Pins & related hardware for maintenance markets","Consistent fitment & strength-critical supply","Replacement & fleet maintenance programs"],
      },
      {
        icon: Battery,
        title: "Automotive Batteries",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80",
        items: ["Passenger vehicle — standard & start-stop","Commercial vehicle batteries — LCV & HCV","Agricultural & tractor battery variants","Higher electrical load duty cycle options","Broad fitment coverage for aftermarket & fleets"],
      },
    ],
  },
  {
    id: "interior",
    label: "Interior & Textile Materials",
    color: "purple",
    description: "Interior materials, technical fabrics and surface-heating textiles for in-cabin applications.",
    products: [
      {
        icon: Shirt,
        title: "Polymer & Vinyl Interior Materials",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        items: ["Interior-facing polymer/vinyl for trims & touchpoints","Seats, door trims, consoles & dashboards","Breathable, cool & anti-static/conductive variants","Bio-PVC & application-specific material options","OEM program supply with consistent colour & texture"],
      },
      {
        icon: Scissors,
        title: "Industrial & Automotive Technical Fabrics",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80",
        items: ["Spec-driven technical fabrics for automotive applications","Strength, durability & UV/heat resistance variants","Flame retardant options for regulated applications","Repeatable production supply to specification","Automotive-adjacent & industrial use cases"],
      },
      {
        icon: Thermometer,
        title: "Surface Heating Fabrics",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
        items: ["Thin, flexible surface-heating textiles","Integration into seat layers, armrests & panels","Faster warm-up & uniform heat distribution","Low-profile for automotive interior packaging","In-cabin comfort element programs"],
      },
    ],
  },
  {
    id: "composites",
    label: "Composites & Thermal",
    color: "cyan",
    description: "Lightweight composite structures, aero parts and thermal interface materials for modern vehicle programs.",
    products: [
      {
        icon: Wind,
        title: "Composite Exterior Body Panels",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
        items: ["Carbon, glass & hybrid laminate exterior panels","Weight reduction with stiffness & finish quality","EV & luxury class vehicle programs","Prototyping through higher-volume supply","Closures & body panel applications"],
      },
      {
        icon: Wind,
        title: "Aero & Downforce Parts",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
        items: ["Spoilers, wings & diffusers in composite","Stable geometry & stiffness for airflow management","Lightweight construction & cosmetic finish","Performance vehicle programs","Consistent laminate quality across production runs"],
      },
      {
        icon: Wind,
        title: "Air Management Ducting",
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80",
        items: ["Composite ducting for radiator feed & exit","Repeatable geometry in tight packaging","Thermal & flow condition performance","Air routing around cooling systems","Modern vehicle powertrain applications"],
      },
      {
        icon: Layers,
        title: "Interior Composite Panels",
        image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&q=80",
        items: ["Dash & interior cabin composite panels","Consistent fit, finish & stiffness","Weight benefits over traditional materials","Aesthetic surfaces with structural function","Cabin assembly integration programs"],
      },
      {
        icon: Box,
        title: "Functional Enclosures & Covers",
        image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=600&q=80",
        items: ["Composite casings for battery, fuel & exhaust zones","Underbody & near-powertrain applications","Weight reduction with durability & finish","Packaging-optimised composite construction","EV & ICE vehicle programs"],
      },
      {
        icon: Thermometer,
        title: "Thermal Interface Gap Pads",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: ["Thermally conductive & electrically insulating pads","Bridges gaps between heat sources & heat sinks","Improves heat transfer on uneven surfaces","Tolerance-variable surface coupling","EV battery module & electronics applications"],
      },
      {
        icon: FlaskConical,
        title: "Dispensable Gap Fillers & Thermal Potting",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
        items: ["Filled thermal compounds for cavity fill","Couples heat into housings & cold plates","Vibration damping with thermal performance","Dense electronics & EV module applications","Reliability improvement in packed assemblies"],
      },
    ],
  },
  {
    id: "vehicles",
    label: "Vehicles & Equipment",
    color: "amber",
    description: "Complete vehicle platforms and material handling equipment for agriculture, utility and industrial use.",
    products: [
      {
        icon: Cpu,
        title: "Tractor & Utility Vehicle Platforms",
        image: "https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&q=80",
        items: ["25 HP, 4WD, 2-cylinder, 1290 cc class tractors","Water-cooled, compact farm & utility platforms","Small to mid-sized farm operation fitment","Traction & stability for utility tasks","Fuel-efficient manoeuvrable power platforms"],
      },
      {
        icon: Package,
        title: "Pick & Carry Cranes",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: ["Mobile pick-and-carry crane category","Material handling in industrial & construction sites","Compact movement & lifting versatility","Site mobility without fixed infrastructure","Industrial & heavy-duty lifting programs"],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:   "border-blue-500/25 bg-blue-500/5 text-blue-400",
  indigo: "border-indigo-500/25 bg-indigo-500/5 text-indigo-400",
  purple: "border-purple-500/25 bg-purple-500/5 text-purple-400",
  cyan:   "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
  amber:  "border-amber-500/25 bg-amber-500/5 text-amber-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:   "border-blue-500 bg-blue-500/15 text-blue-300",
  indigo: "border-indigo-500 bg-indigo-500/15 text-indigo-300",
  purple: "border-purple-500 bg-purple-500/15 text-purple-300",
  cyan:   "border-cyan-500 bg-cyan-500/15 text-cyan-300",
  amber:  "border-amber-500 bg-amber-500/15 text-amber-300",
};

export default function AutomotivePage() {
  const [activeCategory, setActiveCategory] = useState("manufacturing");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Automotive & Mobility"
        title="Full-Spectrum Automotive"
        titleAccent="Component Sourcing"
        subtitle="From precision machined parts and castings to composite panels, thermal materials and complete vehicle platforms — we connect buyers with verified automotive manufacturers across the full supply chain."
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80"
        breadcrumb="Industries / Automotive"
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
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  All Automotive Sourcing
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source across the complete automotive manufacturing and supply ecosystem — covering precision components, interior materials, composites, fasteners, batteries and complete vehicle platforms from a single verified supplier network.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Whether you are an OEM, Tier-1, aftermarket distributor or fleet operator, we align your technical and commercial requirements with the right manufacturers — from prototype runs to high-volume supply programs.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-2 gap-3">
                {[
                  ["OEM & Tier Supply",   "Precision manufacturing programs"],
                  ["Aftermarket & Fleet", "Replacement & maintenance supply"],
                  ["EV & New Energy",     "Thermal, composite & battery sourcing"],
                  ["Export Ready",        "Compliant international supply chains"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.35)" }}
                      className="p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-2 group-hover:text-blue-300 transition-colors">{title}</div>
                      <div className="text-zinc-500 text-xs leading-relaxed">{desc}</div>
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
              {CATEGORIES.reduce((a, c) => a + c.products.length, 0)} product categories across five sourcing segments. Select a segment to explore.
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

      {/* ── All segments summary ───────────────────────────── */}
      {/* ── All segments summary ───────────────────────────── */}
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
            className={`w-full rounded-2xl border text-left transition-all group overflow-hidden ${ACCENT[cat.color]} hover:scale-[1.02]`}
          >
            {/* Image */}
            <div className="relative h-28 overflow-hidden">
              <motion.img
                src={CATEGORY_IMAGES[cat.id]}
                alt={cat.label}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full border font-mono ${ACCENT[cat.color]}`}>
                {cat.products.length}
              </div>
            </div>
            {/* Text */}
            <div className="p-4">
              <div className="text-xs font-mono tracking-widest uppercase mb-1.5 opacity-60">
                {cat.products.length} products
              </div>
              <div className="font-bold text-white text-sm leading-snug group-hover:brightness-125 transition-all">
                {cat.label}
              </div>
            </div>
          </motion.button>
        </StaggerItem>
      ))}
    </Stagger>
  </div>
</section>

      <BuyerSegments
        segments={[
          "Automotive OEMs",
          "Tier-1 & Tier-2 Suppliers",
          "Aftermarket Distributors",
          "Fleet Operators",
          "EV & New Energy Vehicle Manufacturers",
          "Commercial Vehicle Manufacturers",
          "Agricultural Equipment Companies",
          "Construction & Industrial Equipment Buyers",
          "Export Trading Companies",
        ]}
      />

      <CTABanner
        title="Source Automotive Components"
        subtitle="Share your technical specifications, drawings or requirements. We will align you with verified manufacturers ready to supply — from prototype to production volume."
      />
      <Footer />
    </main>
  );
}