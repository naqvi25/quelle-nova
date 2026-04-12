"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown, CheckCircle, Clock, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  PrimaryButton, SectionLabel, Stagger, StaggerItem,
} from "@/components/ui/shared";

const INDUSTRIES = [
  "Automotive", "Defence & Aerospace", "Apparel & Footwear", "Drones & Components",
  "Oil & Gas", "Industrial Manufacturing", "Electronics & Electrical", "Mining",
  "Hunting & Outdoor", "Chemicals & Commodities", "Hand Tools", "Other",
];

const SERVICE_TYPES = [
  "Sourcing & Procurement",
  "Financial Advisory",
  "Business Growth Services",
  "Supplier Partnership",
  "General Enquiry",
];

const FAQ = [
  {
    q: "How long does it take to receive supplier recommendations?",
    a: "For standard industrial requirements, we typically provide curated supplier recommendations within 3–5 business days. Complex or highly specialised requirements may take 7–10 days for thorough qualification.",
  },
  {
    q: "What information do you need to start a sourcing engagement?",
    a: "A brief description of the requirement, target quantity, timeline, and any drawings or specifications. The more detail you provide, the faster and more accurate our supplier matching will be.",
  },
  {
    q: "Do you work with small-volume or prototype requirements?",
    a: "Yes. We serve buyers across the full volume spectrum — from prototype and sample runs to large-scale OEM programmes. We match you with suppliers whose MOQ and production setup fits your scale.",
  },
  {
    q: "How are supplier quality standards enforced?",
    a: "Every supplier in our network passes a 5-stage vetting process including document review, technical assessment, factory audit, sample qualification, and ongoing performance monitoring.",
  },
  {
    q: "Do you offer Financial Services independently of sourcing?",
    a: "Yes. Our Financial Advisory and Business Growth Services are offered as standalone engagements and do not require a parallel sourcing mandate.",
  },
];

function SelectDropdown({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-left flex items-center justify-between text-zinc-300 hover:border-blue-500/30 hover:bg-white/[0.04] focus:outline-none focus:border-blue-500/50 transition-all text-sm"
      >
        <span className={value ? "text-zinc-200" : "text-zinc-500"}>{value || `Select ${label}`}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-zinc-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 mt-2 z-30 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            <div className="max-h-52 overflow-y-auto py-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 hover:text-white transition-colors ${
                    value === opt ? "text-blue-400 bg-blue-500/5" : "text-zinc-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormField({ label, placeholder, value, onChange, textarea = false }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; textarea?: boolean;
}) {
  const base =
    "w-full px-4 py-3.5 rounded-xl border border-white/8 bg-white/[0.02] text-zinc-200 placeholder:text-zinc-600 hover:border-blue-500/30 hover:bg-white/[0.04] focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>
      {textarea ? (
        <textarea rows={4} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
      ) : (
        <input type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", industry: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#020202] text-zinc-200 overflow-x-hidden">
      <BackgroundDesign />
      <CursorGlow />
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[52vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/88 to-[#020202]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]/55" />
        </div>
        <div className="absolute inset-0 scanlines pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <FadeIn2 delay={0.1}>
            <p className="text-zinc-500 text-sm mb-6 tracking-widest uppercase font-mono">
              <Link href="/" className="text-blue-500 hover:text-blue-400 transition-colors">Home</Link>
              {" / "}<span className="text-zinc-400">Contact Us</span>
            </p>
          </FadeIn2>
          <FadeIn2 delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.04] max-w-3xl">
              Let's Start a{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
          </FadeIn2>
          <FadeIn2 delay={0.3}>
            <p className="text-xl text-zinc-400 max-w-xl leading-relaxed">
              Whether you are sourcing components, seeking financial advisory, or exploring a strategic partnership — our team responds within one business day.
            </p>
          </FadeIn2>
        </div>
      </section>

      {/* ── Contact Form + Info ───────────────────────────── */}
      <section className="relative py-24 bg-slate-900">
        <SlateBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Left: info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <SectionLabel text="Get in Touch" />
                <h2 className="text-3xl font-bold text-white mt-2 mb-8">Contact Information</h2>
                <Stagger className="space-y-4">
                  {[
                    { icon: Mail,   label: "Email",   value: "info@filmsfocus.com",        sub: "We respond within 24 hours" },
                    { icon: Phone,  label: "Phone",   value: "+1 (443) 416-2928",           sub: "Mon – Fri, 9 AM – 6 PM EST" },
                    { icon: MapPin, label: "Address", value: "7677 Canton Center Dr Baltimore, Maryland 21202, USA" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.label}>
                        <motion.div
                          whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.3)" }}
                          className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:border-blue-400/40 transition-colors">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                            <p className="text-white font-semibold text-sm">{item.value}</p>
                            <p className="text-zinc-500 text-xs mt-0.5">{item.sub}</p>
                          </div>
                        </motion.div>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-semibold">Response Times</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Sourcing Enquiries",     "1–2 business days"],
                      ["Financial Advisory",     "Same-day callback"],
                      ["Partnership Proposals",  "3–5 business days"],
                      ["General Enquiries",      "Within 24 hours"],
                    ].map(([type, time]) => (
                      <div key={type} className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <span className="text-zinc-400">{type}</span>
                        <span className="text-blue-400 font-mono text-xs">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.15}>
                <div className="p-[1px] rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.1), rgba(147,51,234,0.15))" }}>
                  <div className="p-8 md:p-10 rounded-[15px] bg-[#0a0a0a]">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle className="w-10 h-10 text-blue-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-3">Message Sent</h3>
                        <p className="text-zinc-400 max-w-sm leading-relaxed">
                          Thank you for reaching out. Our team will review your enquiry and get back to you within one business day.
                        </p>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setForm({ name: "", email: "", company: "", phone: "", industry: "", service: "", message: "" });
                          }}
                          className="mt-8 text-blue-400 text-sm underline underline-offset-4 hover:text-blue-300 transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex items-center gap-3 mb-8">
                          <MessageSquare className="w-5 h-5 text-blue-400" />
                          <h3 className="text-xl font-bold text-white">Submit Your Enquiry</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField label="Full Name"          placeholder="Your name"         value={form.name}    onChange={set("name")} />
                          <FormField label="Email Address"      placeholder="you@company.com"   value={form.email}   onChange={set("email")} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormField label="Company"            placeholder="Company name"      value={form.company} onChange={set("company")} />
                          <FormField label="Phone (optional)"   placeholder="+1 443 416 2928"  value={form.phone}   onChange={set("phone")} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <SelectDropdown label="Industry"          options={INDUSTRIES}    value={form.industry} onChange={set("industry")} />
                          <SelectDropdown label="Service Required"  options={SERVICE_TYPES} value={form.service}  onChange={set("service")} />
                        </div>
                        <FormField
                          label="Message"
                          placeholder="Describe your sourcing requirement, financial need, or enquiry in as much detail as possible..."
                          value={form.message}
                          onChange={set("message")}
                          textarea
                        />

                        <PrimaryButton className="w-full py-4 text-base mt-2" icon={Send}>
                          Submit Enquiry
                        </PrimaryButton>

                        <p className="text-center text-zinc-600 text-xs">
                          By submitting, you agree to our Privacy Policy. We never share your information with third parties.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="relative py-20 bg-[#020202]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-12">
            <SectionLabel text="FAQ" />
            <h2 className="text-4xl font-bold text-white mt-2">Frequently Asked Questions</h2>
          </FadeIn>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="rounded-xl border border-white/5 bg-white/[0.01] overflow-hidden hover:border-blue-500/15 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <span className="text-white font-semibold text-sm md:text-base pr-4 group-hover:text-blue-300 transition-colors">
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                    >
                      <ChevronDown size={16} className={openFaq === i ? "text-blue-400" : "text-zinc-500"} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5">
                          <div className="h-px bg-white/5 mb-5" />
                          <p className="text-zinc-400 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}