"use client";

import { useState } from "react";
import {
  Wrench, Settings, Shield, Box,
  Layers, Cpu, Target, BarChart2, ChevronRight,
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
    id: "hand-tools",
    label: "Hand Tools & Workshop",
    color: "blue",
    description: "Core professional hand tools for mechanical, industrial, plumbing and construction trades — spanners, wrenches, pliers, hacksaws, bars, hammers, vices and lubrication tools.",
    products: [
      {
        icon: Wrench,
        title: "Spanners & Wrenches",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
        items: [
          "Core fastener tools for workshops & maintenance",
          "Open-end, ring, combination & adjustable types",
          "High-volume category for mechanic & industrial kits",
          "Multiple sizes — metric & imperial ranges",
          "Professional grade for trade & OEM programs",
        ],
      },
      {
        icon: Wrench,
        title: "Pipe Wrenches",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Heavy-duty gripping for pipes & fittings",
          "Strong jaw bite & leverage for plant maintenance",
          "Plumbing, pipefitting & industrial use",
          "Aluminium & cast iron body options",
          "Multiple jaw capacity sizes available",
        ],
      },
      {
        icon: Settings,
        title: "Pliers & Pincers",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: [
          "Gripping, bending, pulling & cutting operations",
          "Electrical, mechanical & general workshop tasks",
          "Combination, long-nose, cutting & locking types",
          "Insulated variants for electrical applications",
          "Professional grade with consistent jaw geometry",
        ],
      },
      {
        icon: Box,
        title: "Hacksaws",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
        items: [
          "Manual cutting for metals & plastics on site",
          "Valued for simplicity & portability in the field",
          "Adjustable tension frames for blade security",
          "Compatible with standard bi-metal blade sizes",
          "Job site & workshop controlled cutting applications",
        ],
      },
      {
        icon: Shield,
        title: "Wrecking Bars & Pry Bars",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Leverage tools for prying, pulling & demolition",
          "Construction & maintenance site applications",
          "Multiple lengths & tip configurations",
          "Drop-forged steel construction",
          "Flat, curved & gooseneck bar variants",
        ],
      },
      {
        icon: Wrench,
        title: "Hammers & Striking Tools",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
        items: [
          "Assembly, fitting, alignment & demolition tasks",
          "Multiple head types — claw, ball-peen, sledge & club",
          "Multiple head weights across trade applications",
          "Fibreglass, wooden & steel handle options",
          "High-volume category for professional toolkits",
        ],
      },
      {
        icon: Settings,
        title: "Lubrication Tools",
        image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80",
        items: [
          "Grease guns & oil cans for preventive maintenance",
          "Lubrication of joints, bearings & machinery",
          "Reduces wear & unplanned downtime",
          "Manual lever & pistol-grip grease gun types",
          "Standard grease cartridge & bulk fill compatible",
        ],
      },
      {
        icon: Box,
        title: "Vices",
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
        items: [
          "Workshop & bench vices for secure workholding",
          "Parallel jaw & swivel base configurations",
          "Cast iron & fabricated steel body options",
          "Multiple jaw width sizes for workshop use",
          "Suitable for fabrication, fitting & assembly tasks",
        ],
      },
    ],
  },
  {
    id: "automotive-building",
    label: "Automotive, Garage & Building",
    color: "amber",
    description: "Specialised tool categories for automotive servicing, garage workshops and carpentry/building trades — including socket sets, automotive tools and carpenter tools.",
    products: [
      {
        icon: Settings,
        title: "Socket Sets & Accessories",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
        items: [
          "Sockets & drive accessories for fast fastener servicing",
          "Automotive & industrial maintenance routines",
          "1/4\", 3/8\" & 1/2\" drive options",
          "Metric & imperial socket ranges",
          "Extension bars, universal joints & ratchet handles",
        ],
      },
      {
        icon: Wrench,
        title: "Automotive & Garage Tools",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80",
        items: [
          "Specialist tools for vehicle servicing & repair",
          "Oil filter wrenches, pullers & bearing tools",
          "Jack stands, trolley jacks & service equipment",
          "Brake & clutch servicing tools",
          "Suitable for professional garages & fleet workshops",
        ],
      },
      {
        icon: Box,
        title: "Carpenter & Building Tools",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
        items: [
          "Hand tools for carpentry & building trades",
          "Chisels, mallets, planes & marking gauges",
          "Saws — tenon, panel & coping variants",
          "Squares, levels & layout tools for construction",
          "Suitable for joinery, fit-out & site work",
        ],
      },
    ],
  },
  {
    id: "measuring",
    label: "Measuring & Precision Tools",
    color: "cyan",
    description: "Measuring tapes, test and digital measurement tools, measuring wheels, and precision instruments — designed for accuracy, durability and efficiency in trade, construction and industrial environments.",
    products: [
      {
        icon: Target,
        title: "Measuring Tools (Tapes / Levels / Rules)",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "Practical measurement & layout for job sites",
          "Steel rules, spirit levels & tape measures",
          "Alignment & marking in workshops & construction",
          "Multiple lengths — 3m to 50m tape range",
          "Professional grade with durable blade coatings",
        ],
      },
      {
        icon: Target,
        title: "Measuring Tapes",
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80",
        items: [
          "Layout & measurement for construction & workshop",
          "Blade lock, belt clip & rubber grip ergonomics",
          "Metric, imperial & dual-scale blade options",
          "Multiple lengths for trade & site applications",
          "Durable ABS case with impact resistance",
        ],
      },
      {
        icon: Cpu,
        title: "Test & Measure Tools (Digital)",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
        items: [
          "Laser distance meters, laser line levels & digital spirit levels",
          "Illuminated digital displays for easy site reading",
          "Area, volume & Pythagoras calculation at a button click",
          "Switchable measurement units — m, ft, in",
          "Improved efficiency & productivity on site",
        ],
      },
      {
        icon: BarChart2,
        title: "Measuring Wheels",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80",
        items: [
          "150mm (6\") & 300mm (12\") wheel portfolio",
          "Digital measuring wheels for high-accuracy distance",
          "Unmatched lifetime warranty in the Indian market",
          "Suitable for roads, fields & large-area measurement",
          "Folding handle for compact transportation",
        ],
      },
      {
        icon: Layers,
        title: "Precision Tools",
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80",
        items: [
          "Vernier calipers, digital calipers & dial calipers",
          "Micrometers for high-accuracy dimensional measurement",
          "Digital protractors for angle measurement",
          "High-accuracy stainless steel construction",
          "Designed for jobsite durability & workshop precision",
        ],
      },
    ],
  },
];

const ACCENT: Record<string, string> = {
  blue:  "border-blue-500/25 bg-blue-500/5 text-blue-400",
  amber: "border-amber-500/25 bg-amber-500/5 text-amber-400",
  cyan:  "border-cyan-500/25 bg-cyan-500/5 text-cyan-400",
};

const ACCENT_ACTIVE: Record<string, string> = {
  blue:  "border-blue-500 bg-blue-500/15 text-blue-300",
  amber: "border-amber-500 bg-amber-500/15 text-amber-300",
  cyan:  "border-cyan-500 bg-cyan-500/15 text-cyan-300",
};

export default function HandToolsPage() {
  const [activeCategory, setActiveCategory] = useState("hand-tools");
  const active = CATEGORIES.find((c) => c.id === activeCategory)!;
  const total = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      <PageHero
        badge="Hand Tools & Precision Instruments"
        title="Professional Hand Tools,"
        titleAccent="Measuring & Precision"
        subtitle="Core workshop hand tools, automotive and building specialised tools, digital measurement instruments and precision metrology — sourced for professional trade, industrial and OEM export programs."
        image="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&q=80"
        breadcrumb="Industries / Hand Tools"
      />

      {/* ── Overview ──────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <SectionLabel text="Overview" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                Professional Tools for{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Every Trade & Application
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-5">
                We source professional-grade hand tools, automotive and garage equipment, building trade tools and precision measuring instruments — covering the full spectrum from core workshop tools to high-accuracy digital measurement devices.
              </p>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Our supplier network includes manufacturers certified to DIN, ANSI and relevant international standards, supporting OEM private-label programs, industrial distributor supply and export-ready procurement at scale.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} direction="right">
              <Stagger className="grid grid-cols-1 gap-4">
                {[
                  ["Hand Tools & Workshop",         "Spanners, wrenches, pliers, hacksaws, bars, hammers & vices"],
                  ["Automotive, Garage & Building", "Socket sets, garage tools & carpenter/building tool ranges"],
                  ["Measuring & Precision Tools",   "Tapes, digital instruments, measuring wheels & calipers"],
                ].map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <motion.div
                      whileHover={{ x: 5, borderColor: "rgba(249,115,22,0.35)" }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <div className="text-white font-semibold text-sm mb-0.5 group-hover:text-orange-300 transition-colors">{title}</div>
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
            <SectionLabel text="Product Coverage" />
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
          "Industrial Distributors & Wholesalers",
          "Hardware Retail Chains",
          "Private Label Tool Brands",
          "Automotive Workshop Chains",
          "Government & MRO Buyers",
          "Construction Companies",
          "E-commerce Tool Retailers",
          "Export Trading Companies",
          "OEM Tool Kit Program Buyers",
        ]}
      />

      <CTABanner
        title="Source Hand Tools & Precision Instruments"
        subtitle="Share your product list, grade requirements and target volume. We will source quality-certified tools with competitive pricing and private-label options."
      />
      <Footer />
    </main>
  );
}