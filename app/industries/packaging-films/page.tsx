"use client";

import { useState } from "react";
import {
  Layers, Package, Zap, Shield, Settings, Globe,
  Droplet, Box, BarChart2, Cpu, Wrench, Target,
  FlaskConical, Lock, Radio, ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  PageHero, ProductCard, BuyerSegments, CTABanner, SectionLabel,
  Stagger, StaggerItem,
} from "@/components/ui/shared";

import {PLAIN_BOPP_FILMS, HEAT_SEALABLE_BOPP_FILMS, BARRIER_MOISTURE_RESISTANT, MATTE_WHITE, LABELS_AND_SLEEVES, LAMINATION_FILMS } from "@/lib/images/films";
import {STANDARD_BOPET_FILMS, METALLIZED_PET_FILMS, COATED_SPECIALITY_BOPET, PET_SHRINK_FILMS, INDUSTRIAL_TECHNICAL_BOPET, HIGH_BARRIER_BOPET_STRUCTURES} from "@/lib/images/films";
import {HOLOGRAPHIC_BOPP_FILMS, HOLOGRAPHIC_METALLIZED_FILMS, SECURITY_POUCHES, ANTI_COUNTERFEIT_FILMS_LABELS, HOT_STAMPING_HOLOGRAPHIC_FILMS} from "@/lib/images/films";
import {HAND_HELD_INDUCTION_WADS, INLINE_INDUCTION_SEALING_SYSTEMS, INDUCTION_FOIL_LINERS_SEALS, INDUCTION_SEALING_ADDONS_ACCESSORIES} from "@/lib/images/films";
import {SINGLE_STAGE_COATING_MACHINES, COATING_LAMINATION_MACHINES, TANDEM_COATING_LINES, PILCOAT_COATING_SYSTEMS, FINO_FORTE_SLITTING_MACHINES, EXATO_CUTTING_MACHINES_MODULES} from "@/lib/images/films";
import {PHARMACEUTICAL_AND_MEDICAL} from "@/lib/images/films";


// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "bopp",
    label: "BOPP Films",
    color: "blue",
    description: "Biaxially Oriented Polypropylene (BOPP) films engineered for high-speed printing, lamination and converting processes — delivering consistent optical quality, seal performance and machinability across flexible packaging applications.",
    products: [
      {
        icon: Layers,
        title: "Plain BOPP Films",
        image: PLAIN_BOPP_FILMS,
        items: [
          "Thickness range: 15–60 microns",
          "Width: up to 2000mm",
          "Core size: 3\" or 6\"",
          "Surface treatment: Corona or Flame",
          "High optical clarity and surface gloss",
          "Excellent dimensional stability",
        ],
      },
      {
        icon: Zap,
        title: "Heat Sealable BOPP Films",
        image: HEAT_SEALABLE_BOPP_FILMS,
        items: [
          "Strong hot tack and seal strength",
          "Reliable performance on high-speed packaging lines",
          "Optimised slip and anti-static properties",
          "Consistent seal initiation temperature",
          "Suitable for VFFS and HFFS machines",
          "Compatible with solvent and water-based inks",
        ],
      },
      {
        icon: Shield,
        title: "Barrier & Moisture-Resistant BOPP",
        image: BARRIER_MOISTURE_RESISTANT,
        items: [
          "Effective moisture vapor transmission barrier",
          "Protects product freshness and extends shelf life",
          "Superior surface treatment retention",
          "Maintains print adhesion over time",
          "Suitable for snack food, bakery and confectionery",
          "Balanced mechanical strength and durability",
        ],
      },
      {
        icon: Package,
        title: "Matte & White BOPP Films",
        image: MATTE_WHITE,
        items: [
          "Matte finish for premium label aesthetics",
          "White opaque grades for label and sleeve applications",
          "High ink receptivity for offset and digital printing",
          "Excellent stiffness for label converting",
          "Available cavitated and non-cavitated grades",
          "Suitable for pressure-sensitive label stock",
        ],
      },
      {
        icon: Globe,
        title: "BOPP for Labels & Sleeves",
        image: LABELS_AND_SLEEVES,
        items: [
          "High shrink grades for sleeve labelling",
          "Excellent conformability over container shapes",
          "Sharp print registration and colour accuracy",
          "Resistant to scuffing and handling damage",
          "Compatible with UV and flexo printing",
          "Suitable for beverage, personal care and food containers",
        ],
      },
      {
        icon: BarChart2,
        title: "BOPP Lamination Films",
        image: LAMINATION_FILMS,
        items: [
          "Thermal lamination grades — gloss, matte and soft-touch",
          "Adhesive lamination grades for flexible packaging",
          "Excellent bonding strength with paper and board",
          "Enhances shelf appeal and tactile finish",
          "Suitable for book covers, brochures and packaging",
          "Anti-curl formulations available",
        ],
      },
    ],
  },
  {
    id: "pet",
    label: "PET Films",
    color: "purple",
    description: "High-performance Biaxially Oriented Polyethylene Terephthalate (BOPET) films offering exceptional mechanical strength, optical clarity and temperature resistance — including PET shrink grades for sleeve and wrap applications.",
    products: [
      {
        icon: Cpu,
        title: "Standard BOPET Films",
        image: STANDARD_BOPET_FILMS,
        items: [
          "Thickness range: 12–250 microns",
          "Width: up to 3000mm",
          "Surface treatment: Corona or Coating",
          "High tensile strength and dimensional stability",
          "Outstanding optical clarity and gloss",
          "Wide temperature tolerance — suitable for sterilization",
        ],
      },
      {
        icon: Shield,
        title: "Metallized PET Films",
        image: METALLIZED_PET_FILMS,
        items: [
          "Enhanced barrier against oxygen and water vapor",
          "Aroma retention for extended shelf-life packaging",
          "Vacuum-deposited aluminium metallization",
          "Ideal for snack foods, coffee and tobacco packaging",
          "High reflectivity for premium packaging aesthetics",
          "Available in various metallization densities",
        ],
      },
      {
        icon: Layers,
        title: "Coated & Specialty BOPET",
        image: COATED_SPECIALITY_BOPET,
        items: [
          "Heat sealable coated grades",
          "Silicone coated release liner films",
          "Anti-fog and anti-static coatings",
          "Printable coatings for digital and flexo printing",
          "FDA-approved grades for direct food contact",
          "Chemical and UV resistant formulations",
        ],
      },
      {
        icon: Zap,
        title: "PET Shrink Films",
        image: PET_SHRINK_FILMS,
        items: [
          "High shrink ratio for full-body sleeve labels",
          "Excellent clarity and printability",
          "Uniform shrinkage across machine and transverse direction",
          "Compatible with steam, hot air and infrared tunnel shrink",
          "Suitable for bottles, cans and multi-pack bundles",
          "Recyclable and compatible with PET waste streams",
        ],
      },
      {
        icon: FlaskConical,
        title: "Industrial & Technical BOPET",
        image: INDUSTRIAL_TECHNICAL_BOPET,
        items: [
          "Electrical insulation and transformer wraps",
          "Flexible printed circuits and membrane switches",
          "Solar control and safety window films",
          "Tape backings and protective film applications",
          "Microwaveable and medical-grade packaging grades",
          "Plastic card and security substrate applications",
        ],
      },
      {
        icon: Package,
        title: "High Barrier BOPET Structures",
        image: HIGH_BARRIER_BOPET_STRUCTURES,
        items: [
          "EVOH and SiOx coated barrier grades",
          "Ultra-low oxygen and moisture transmission",
          "Suitable for retort and high-barrier pouches",
          "Transparent barrier alternative to foil laminates",
          "Extended shelf life for sensitive products",
          "Compatible with recycling streams",
        ],
      },
    ],
  },
  {
    id: "holographic",
    label: "Holographic & Security",
    color: "amber",
    description: "Holographic packaging films and security solutions engineered to enhance brand differentiation, prevent counterfeiting and deliver premium visual impact across flexible packaging, labels and security applications.",
    products: [
      {
        icon: Zap,
        title: "Holographic BOPP Films",
        image: HOLOGRAPHIC_BOPP_FILMS,
        items: [
          "Registered and non-registered holographic patterns",
          "Wide range of diffractive optical effects and designs",
          "Suitable for overwrap, lidding and pouch applications",
          "High clarity base film with vivid holographic layer",
          "Compatible with flexo, gravure and digital printing",
          "Custom pattern development available",
        ],
      },
      {
        icon: Layers,
        title: "Holographic Metallized Films",
        image: HOLOGRAPHIC_METALLIZED_FILMS,
        items: [
          "Vacuum metallized holographic substrate",
          "Rainbow and rainbow-free holographic effects",
          "Enhances premium shelf appeal and brand recall",
          "Suitable for cosmetics, confectionery and gifting",
          "Available in transfer and self-wound formats",
          "Compatible with hot stamping foil production",
        ],
      },
      {
        icon: Lock,
        title: "Security Pouches",
        image: SECURITY_POUCHES,
        items: [
          "Tamper-evident security pouch structures",
          "Void patterns and irreversible opening indicators",
          "Suitable for pharmaceuticals, documents and valuables",
          "Custom security printing and serialisation",
          "Barrier layers for moisture and contamination protection",
          "Child-resistant and senior-friendly variants available",
        ],
      },
      {
        icon: Shield,
        title: "Anti-Counterfeit Films & Labels",
        image: ANTI_COUNTERFEIT_FILMS_LABELS,
        items: [
          "Covert and overt security features",
          "UV fluorescent and IR-readable inks",
          "Micro-text and nano-printing capabilities",
          "QR code and serialised digital authentication",
          "Destructible label substrates",
          "Track and trace integration support",
        ],
      },
      {
        icon: Target,
        title: "Hot Stamping Holographic Foils",
        image: HOT_STAMPING_HOLOGRAPHIC_FILMS,
        items: [
          "Registered and unregistered hot stamping foils",
          "Gold, silver and colour holographic variants",
          "Compatible with flat bed and rotary hot stamping",
          "Strong adhesion to paper, board and plastics",
          "Custom embossed hologram designs",
          "Suitable for premium packaging and document security",
        ],
      },
    ],
  },
  {
    id: "induction",
    label: "Induction Sealing",
    color: "green",
    description: "Induction sealing wands, systems and add-on accessories for tamper-evident closure sealing across FMCG, pharmaceutical, chemical and food industries — ensuring product integrity and extended shelf life.",
    products: [
      {
        icon: Radio,
        title: "Handheld Induction Sealing Wands",
        image: HAND_HELD_INDUCTION_WADS,
        items: [
          "Portable wand design for low-volume and lab use",
          "Compatible with aluminium foil induction liners",
          "Adjustable power output for different container sizes",
          "Suitable for bottles, jars and wide-mouth containers",
          "Rapid seal cycle — typically 1–3 seconds per cap",
          "Lightweight and ergonomic design for operator comfort",
        ],
      },
      {
        icon: Settings,
        title: "Inline Induction Sealing Systems",
        image: INLINE_INDUCTION_SEALING_SYSTEMS,
        items: [
          "Conveyor-mounted inline sealing heads",
          "High-speed sealing — up to 600 containers per minute",
          "Automatic power adjustment for speed changes",
          "Compatible with HDPE, PET, PP and glass containers",
          "Integration with existing filling and capping lines",
          "Suitable for pharmaceutical, food and chemical industries",
        ],
      },
      {
        icon: Zap,
        title: "Induction Foil Liners & Seals",
        image: INDUCTION_FOIL_LINERS_SEALS,
        items: [
          "Multi-layer aluminium foil induction liner structures",
          "Tamper-evident peel-back and pressure-sensitive variants",
          "Compatible with HDPE, PET, PP, glass and aluminium caps",
          "Heat-resistant grades for hot-fill applications",
          "Extended shelf-life barrier properties",
          "Custom die-cut sizes and liner specifications",
        ],
      },
      {
        icon: Wrench,
        title: "Induction Sealing Add-ons & Accessories",
        image: INDUCTION_SEALING_ADDONS_ACCESSORIES,
        items: [
          "Cooling tunnel attachments for rapid post-seal cooling",
          "Cap tightening and torque control modules",
          "Seal integrity testing and reject systems",
          "Conveyor and line speed synchronisation controls",
          "Spare sealing heads and power supply units",
          "Installation, calibration and maintenance support",
        ],
      },
    ],
  },
  {
    id: "machines",
    label: "Converting Machines",
    color: "cyan",
    description: "Jandu Group converting machinery for coating, lamination and slitting — supplied as an authorised partner. Equipment engineered for precision film processing on BOPP, PET, paper and specialty substrates at production scale.",
    products: [
      {
        icon: Settings,
        title: "Single Stage Coating Machines",
        image: SINGLE_STAGE_COATING_MACHINES,
        items: [
          "Single station coating head for uniform film coating",
          "Suitable for water-based, solvent and UV coatings",
          "Precision gravure and comma bar coating systems",
          "Web widths from 300mm to 2000mm",
          "In-line drying oven with adjustable temperature zones",
          "Ideal for primer, barrier and functional coatings",
        ],
      },
      {
        icon: Layers,
        title: "Coating & Lamination Machines",
        image: COATING_LAMINATION_MACHINES,
        items: [
          "Combined coating and lamination in single pass",
          "Solvent-less, solvent-based and water-based adhesive systems",
          "Suitable for flexible packaging duplex and triplex structures",
          "Nip roll and chill roll lamination options",
          "Automatic tension and register control",
          "Compatible with BOPP, PET, CPP, foil and paper substrates",
        ],
      },
      {
        icon: Zap,
        title: "Tandem Coating Lines",
        image: TANDEM_COATING_LINES,
        items: [
          "Dual-station tandem coating for complex multi-layer structures",
          "Higher throughput with in-line sequential coating",
          "Suitable for release coating, barrier and functional layers",
          "Independent tension zones for each coating station",
          "Advanced drying and curing system integration",
          "Suitable for specialty and technical film production",
        ],
      },
      {
        icon: Box,
        title: "Pilcoat Coating Systems",
        image: PILCOAT_COATING_SYSTEMS,
        items: [
          "Pilot-scale coating machine for R&D and small batch production",
          "Interchangeable coating heads for application versatility",
          "Compact footprint suitable for laboratory environments",
          "Precise coat weight control and repeatability",
          "Ideal for product development and trial runs",
          "Scale-up capability to production machine specifications",
        ],
      },
      {
        icon: Target,
        title: "Fino & Forte Slitting Machines",
        image: FINO_FORTE_SLITTING_MACHINES,
        items: [
          "Fino: high-precision slitting for narrow web applications",
          "Forte: heavy-duty slitting for wide web and thick substrates",
          "Razor, shear and crush cut slitting modes",
          "Automatic core loading and unloading systems",
          "High-speed operation with tension feedback control",
          "Suitable for BOPP, PET, foil, paper and specialty films",
        ],
      },
      {
        icon: Wrench,
        title: "Exato Cutting Machines & Modules",
        image: EXATO_CUTTING_MACHINES_MODULES,
        items: [
          "Exato precision rotary cutting for sheet and label production",
          "High-speed die cutting with register accuracy",
          "Modular add-on systems for existing coating and lamination lines",
          "Rewind, inspection, splicing and edge trim modules",
          "Automatic defect detection and rejection systems",
          "Custom module configurations for specific line requirements",
        ],
      },
    ],
  },
];

const ACCENT: Record<string, { tab: string; dot: string; border: string; badge: string }> = {
  blue:   { tab: "border-blue-500 text-blue-400 bg-blue-500/5",   dot: "bg-blue-500",   border: "border-blue-500/20",   badge: "bg-blue-500/10 text-blue-400 border-blue-500/20"   },
  purple: { tab: "border-purple-500 text-purple-400 bg-purple-500/5", dot: "bg-purple-500", border: "border-purple-500/20", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  amber:  { tab: "border-amber-500 text-amber-400 bg-amber-500/5",  dot: "bg-amber-500",  border: "border-amber-500/20",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/20"  },
  green:  { tab: "border-green-500 text-green-400 bg-green-500/5",  dot: "bg-green-500",  border: "border-green-500/20",  badge: "bg-green-500/10 text-green-400 border-green-500/20"  },
  cyan:   { tab: "border-cyan-500 text-cyan-400 bg-cyan-500/5",    dot: "bg-cyan-500",   border: "border-cyan-500/20",   badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"   },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PackagingFilmsPage() {
  const [activeTab, setActiveTab] = useState("bopp");

  const active = CATEGORIES.find((c) => c.id === activeTab)!;
  const a = ACCENT[active.color];

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <PageHero
        badge="Flexible Packaging · Converting · Security Films"
        title="Packaging Films &"
        titleAccent="Converting Solutions"
        subtitle="Premium BOPP, PET and holographic films alongside industrial converting machinery — sourced from verified global manufacturers for flexible packaging, labelling and security applications."
        image="/images/Packaging_Films.jpg"
        breadcrumb="Industries / Packaging Films"
      />

      {/* ── Overview strip ────────────────────────────────── */}
      <section className="relative py-16 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <FadeIn>
              <SectionLabel text="About This Vertical" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mt-2 mb-5">
                Films, Machines &{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Security Packaging
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Filmsfocus — a Quelle Nova partner — specialises in premium-grade flexible packaging films and converting solutions. We source and supply BOPP and PET films, holographic and security packaging, induction sealing systems and Jandu Group converting machinery for packaging manufacturers, converters and brand owners worldwide.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Stagger className="grid grid-cols-2 gap-4">
                {[
                  { val: "5",        label: "Product Categories"     },
                  { val: "15µm",     label: "Min Film Thickness"     },
                  { val: "3000mm",   label: "Max Web Width (PET)"    },
                  { val: "600/min",  label: "Induction Seal Speed"   },
                ].map(({ val, label }) => (
                  <StaggerItem key={label}>
                    <motion.div
                      whileHover={{ y: -3, borderColor: "rgba(59,130,246,0.35)" }}
                      className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] transition-all"
                    >
                      <div className="text-2xl font-bold text-blue-400 font-mono mb-1">{val}</div>
                      <div className="text-zinc-500 text-xs">{label}</div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Category Tabs + Products ──────────────────────── */}
      <section className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Tab bar */}
          <FadeIn className="mb-10">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => {
                const ac = ACCENT[cat.color];
                const isActive = activeTab === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? `${ac.tab} border-opacity-100`
                        : "border-white/8 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? ac.dot : "bg-zinc-600"}`} />
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>
          </FadeIn>

          {/* Category description */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-2 h-2 rounded-full ${a.dot}`} />
                    <h2 className="text-2xl font-bold text-white">{active.label}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${a.badge}`}>
                      {active.products.length} product lines
                    </span>
                  </div>
                  <p className="text-zinc-400 text-base leading-relaxed max-w-3xl">{active.description}</p>
                </div>
              </div>

              {/* Product cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {active.products.map((product, i) => (
                  <ProductCard
                    key={product.title}
                    image={product.image}
                    icon={product.icon}
                    title={product.title}
                    items={product.items}
                    delay={i * 0.07}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Key film characteristics ──────────────────────── */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="mb-12">
            <SectionLabel text="Why Filmsfocus Films" />
            <h2 className="text-4xl font-bold text-white mt-2 mb-3">
              Performance Properties That Matter
            </h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              Every film grade is selected and qualified against the performance criteria that determine real-world converting success — from seal strength and slip to optical clarity and surface treatment retention.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Zap,
                title: "Surface Gloss",
                desc: "Exceptional optical clarity and gloss enhances shelf appeal, print fidelity and consumer perception across all film grades.",
                color: "blue",
              },
              {
                icon: Shield,
                title: "Seal Performance",
                desc: "Strong hot tack and consistent seal initiation temperature for reliable closure on high-speed packaging lines.",
                color: "purple",
              },
              {
                icon: Droplet,
                title: "Moisture Barrier",
                desc: "Effective moisture vapor transmission control protects product freshness and extends shelf life across packaging formats.",
                color: "cyan",
              },
              {
                icon: Settings,
                title: "Machinability",
                desc: "Optimised slip, static and stiffness properties for smooth, consistent handling on modern high-speed converting lines.",
                color: "amber",
              },
              {
                icon: Layers,
                title: "Print Adhesion",
                desc: "Superior corona treatment retention maintains ink and coating adhesion throughout the converting and end-use lifecycle.",
                color: "blue",
              },
              {
                icon: BarChart2,
                title: "Dimensional Stability",
                desc: "Balanced mechanical properties deliver consistent register accuracy, flatness and performance across temperature ranges.",
                color: "green",
              },
              {
                icon: Lock,
                title: "Anti-Static Control",
                desc: "Effective anti-static formulations reduce static buildup during converting, printing and filling operations.",
                color: "purple",
              },
              {
                icon: Globe,
                title: "FDA-Approved Grades",
                desc: "Food-contact approved grades available across BOPP and PET ranges for direct and indirect food packaging applications.",
                color: "amber",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const colorMap: Record<string, string> = {
                blue:   "bg-blue-500/10 border-blue-500/20 text-blue-400",
                purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
                cyan:   "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
                amber:  "bg-amber-500/10 border-amber-500/20 text-amber-400",
                green:  "bg-green-500/10 border-green-500/20 text-green-400",
              };
              return (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.12)" }}
                    className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] transition-all group h-full"
                  >
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${colorMap[item.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-bold text-base mb-2 group-hover:text-blue-200 transition-colors">{item.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Applications image section ────────────────────── */}
      <section className="relative py-20 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-12">
            <SectionLabel text="End-Use Applications" />
            <h2 className="text-4xl font-bold text-white mt-2 mb-3">Where Our Films Are Used</h2>
            <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
              From snack food wrappers and beverage labels to pharmaceutical security pouches and solar window films — our range covers the full breadth of flexible packaging and industrial applications.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Food & Beverage Packaging",
                desc: "Snack foods, confectionery, coffee, dairy, bakery, sauces and beverage labels. High-barrier and heat-sealable grades for VFFS, HFFS and pouch applications.",
                image: METALLIZED_PET_FILMS,
                tags: ["BOPP", "BOPET", "Metallized", "Barrier"],
              },
              {
                title: "Pharmaceutical & Medical",
                desc: "Tamper-evident security pouches, blister packaging, medical device wraps and FDA-approved direct contact films for regulated packaging applications.",
                image: PHARMACEUTICAL_AND_MEDICAL,
                tags: ["Security Pouches", "PET", "Induction Sealing"],
              },
              {
                title: "Labels, Sleeves & Graphics",
                desc: "Pressure-sensitive label stock, full-body shrink sleeves, wrap-around labels and promotional holographic overwrap for consumer goods and beverage containers.",
                image: LABELS_AND_SLEEVES,
                tags: ["BOPP Labels", "PET Shrink", "Holographic"],
              },
              {
                title: "Industrial & Technical Films",
                desc: "Electrical insulation, solar control, safety window films, flexible circuits, transformer wraps and tape backings for technical and industrial applications.",
                image: INDUSTRIAL_TECHNICAL_BOPET,
                tags: ["BOPET", "Technical Grades", "Coated"],
              },
              {
                title: "Security & Anti-Counterfeit",
                desc: "Brand protection through holographic films, void labels, tamper-evident closures and authentication features for premium consumer goods and regulated products.",
                image: ANTI_COUNTERFEIT_FILMS_LABELS,
                tags: ["Holographic", "Security Foils", "Anti-Counterfeit"],
              },
              {
                title: "Converting & Lamination",
                desc: "Flexible packaging converters, lamination houses and label printers using our films on coating, slitting and lamination lines supplied through the Jandu Group partnership.",
                image: LAMINATION_FILMS,
                tags: ["Jandu Machines", "Converting", "Lamination"],
              },
            ].map((app, i) => (
              <FadeIn key={app.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative rounded-2xl overflow-hidden group h-72 cursor-default"
                >
                  <img
                    src={app.image}
                    alt={app.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Tags — always visible at bottom */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {app.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400 text-xs font-mono">{tag}</span>
                      ))}
                    </div>
                    {/* Title — sits above tags, moves up on hover */}
                    <h4 className="text-white font-bold text-xl mb-0 translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">{app.title}</h4>
                    {/* Desc — hidden by default, revealed on hover between title and tags */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-400 ease-in-out">
                      <p className="text-zinc-300 text-sm leading-relaxed pt-2 pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{app.desc}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical specs summary ───────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-12">
            <SectionLabel text="Technical Reference" />
            <h2 className="text-4xl font-bold text-white mt-2">Film Specifications at a Glance</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BOPP specs */}
            <FadeIn delay={0.1}>
              <div className="p-7 rounded-2xl border border-blue-500/15 bg-[#07070c]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <h4 className="text-white font-bold text-lg">BOPP Films</h4>
                </div>
                <div className="space-y-3">
                  {[
                    ["Thickness",         "15 – 60 microns"],
                    ["Width",             "Up to 2,000mm"],
                    ["Core Size",         "3\" or 6\""],
                    ["Surface Treatment", "Corona or Flame"],
                    ["Applications",      "Flexible packaging, labels, lamination, printing substrates"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between items-start text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[55%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            {/* PET specs */}
            <FadeIn delay={0.15}>
              <div className="p-7 rounded-2xl border border-purple-500/15 bg-[#07070c]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <h4 className="text-white font-bold text-lg">PET / BOPET Films</h4>
                </div>
                <div className="space-y-3">
                  {[
                    ["Thickness",         "12 – 250 microns"],
                    ["Width",             "Up to 3,000mm"],
                    ["Surface Treatment", "Corona or Coating"],
                    ["Special Features",  "Metallized, Coated, Printed, Shrink"],
                    ["Applications",      "High-performance packaging, industrial, electrical, medical"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between items-start text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-zinc-200 font-medium text-right max-w-[55%]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Buyer Segments ────────────────────────────────── */}
      <BuyerSegments segments={[
        "Flexible Packaging Converters",
        "Label Printers & Finishers",
        "Lamination Houses",
        "Brand Owners & FMCG Companies",
        "Pharmaceutical Manufacturers",
        "Security Printing Companies",
        "Industrial Film Processors",
        "Machinery & Equipment Buyers",
      ]} />

      <CTABanner
        title="Request Film Samples or Machinery Specifications"
        subtitle="Share your application, substrate requirements and converting setup. Our team will match you with the right film grade, sealing system or Jandu Group machine for your production line."
      />

      <Footer />
    </main>
  );
}