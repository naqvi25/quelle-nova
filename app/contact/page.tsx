"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, ChevronDown, CheckCircle,
  Clock, MessageSquare, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BackgroundDesign, CursorGlow, FadeIn, FadeIn2, SlateBackground,
  SectionLabel, Stagger, StaggerItem,
} from "@/components/ui/shared";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Automotive", "Defence & Aerospace", "Apparel & Footwear", "Drones",
  "Oil & Gas", "Industrial", "Electronics", "Mining",
  "Hunting & Outdoor", "Chemicals", "Hand Tools", "Other",
];

const SERVICE_TYPES = [
  "Sourcing Requirement", "Growth Support", "Financial Advisory", "Corporate Advisory", "Investor / Funding Introduction", "Partnership", "Other"
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

// ─── WHATSAPP NUMBER ──────────────────────────────────────────────────────────
const WA_NUMBER = "14434162928";

// ─── SELECT DROPDOWN ──────────────────────────────────────────────────────────

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

// ─── FORM FIELD ───────────────────────────────────────────────────────────────

function FormField({
  label, placeholder, value, onChange,
  textarea = false, required = false, error = "",
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; textarea?: boolean;
  required?: boolean; error?: string;
}) {
  const borderCls = error
    ? "border-red-500/60 focus:border-red-400"
    : "border-white/8 hover:border-blue-500/30 focus:border-blue-500/60 focus:ring-blue-500/20";

  const base = `w-full px-4 py-3.5 rounded-xl border bg-white/[0.02] text-zinc-200 placeholder:text-zinc-600 hover:bg-white/[0.04] focus:outline-none focus:ring-1 transition-all text-sm resize-none ${borderCls}`;

  return (
    <div>
      <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={4} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} className={base}
        />
      ) : (
        <input
          type="text" placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} className={base}
        />
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 mt-1.5"
        >
          <AlertCircle size={12} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-xs">{error}</p>
        </motion.div>
      )}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    industry: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const set = (key: string) => (val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim())    errs.name    = "Full name is required";
    if (!form.email.trim())   errs.email   = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                               errs.email   = "Please enter a valid email address";
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Build WhatsApp message
    const lines = [
      `*New Enquiry from Quelle Nova Website*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Company:* ${form.company}`,
      form.phone    ? `*Phone:* ${form.phone}`       : null,
      form.industry ? `*Industry:* ${form.industry}` : null,
      form.service  ? `*Service:* ${form.service}`   : null,
      ``,
      `*Message:*`,
      form.message,
    ].filter((l) => l !== null).join("\n");

    const encoded = encodeURIComponent(lines);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");
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

            {/* Left: contact info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <SectionLabel text="Get in Touch" />
                <h2 className="text-3xl font-bold text-white mt-2 mb-8">Contact Information</h2>
                <Stagger className="space-y-4">
                  {[
                    {
                      icon: Mail, label: "Email", value: "info@filmsfocus.com",
                      sub: "We respond within 24 hours",
                      href: "mailto:info@filmsfocus.com",
                    },
                    {
                      icon: Phone, label: "Phone / WhatsApp", value: "+1 (443) 416-2928",
                      sub: "Mon – Fri, 9 AM – 6 PM EST",
                      href: `https://wa.me/${WA_NUMBER}`,
                    },
                    {
                      icon: MapPin, label: "Address",
                      value: "7677 Canton Center Dr, Baltimore, Maryland 21202, USA",
                      href: "https://www.google.com/maps/search/?api=1&query=7677+Canton+Center+Dr+Baltimore+Maryland+21202",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.label}>
                        <motion.a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.3)" }}
                          className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] transition-all group cursor-pointer block"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:border-blue-400/40 transition-colors">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-0.5">{item.label}</p>
                            <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">{item.value}</p>
                            {item.sub && <p className="text-zinc-500 text-xs mt-0.5">{item.sub}</p>}
                          </div>
                        </motion.a>
                      </StaggerItem>
                    );
                  })}
                </Stagger>
              </FadeIn>

              {/* WhatsApp direct button */}
              <FadeIn delay={0.2}>
                <motion.a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-green-500/25 bg-green-500/8 text-green-400 font-semibold text-sm hover:bg-green-500/15 hover:border-green-400/40 transition-all"
                >
                  {/* WhatsApp icon */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </motion.a>
              </FadeIn>

              {/* Response times */}
              <FadeIn delay={0.3}>
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
                  <div className="flex items-center gap-3 mb-5">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-semibold">Response Times</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      ["Sourcing Enquiries",    "1–2 business days"],
                      ["Financial Advisory",    "Same-day callback"],
                      ["Partnership Proposals", "3–5 business days"],
                      ["General Enquiries",     "Within 24 hours"],
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
                          className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-3">Message Sent via WhatsApp</h3>
                        <p className="text-zinc-400 max-w-sm leading-relaxed mb-2">
                          Your WhatsApp was opened with your message pre-filled. If it didn't open automatically, tap the button below.
                        </p>
                        <motion.a
                          href={`https://wa.me/${WA_NUMBER}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-semibold text-sm"
                        >
                          Open WhatsApp
                        </motion.a>
                        <button
                          onClick={() => {
                            setSubmitted(false);
                            setForm({ name: "", email: "", company: "", phone: "", industry: "", service: "", message: "" });
                            setErrors({});
                          }}
                          className="mt-6 text-blue-400 text-sm underline underline-offset-4 hover:text-blue-300 transition-colors"
                        >
                          Send another message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div className="flex items-center gap-3 mb-8">
                          <MessageSquare className="w-5 h-5 text-blue-400" />
                          <div>
                            <h3 className="text-xl font-bold text-white">Submit Your Enquiry</h3>
                            <p className="text-zinc-600 text-xs mt-0.5">Fields marked <span className="text-red-400">*</span> are required</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div id="name">
                            <FormField
                              label="Full Name" placeholder="Your name"
                              value={form.name} onChange={set("name")}
                              required error={errors.name}
                            />
                          </div>
                          <div id="email">
                            <FormField
                              label="Email Address" placeholder="you@company.com"
                              value={form.email} onChange={set("email")}
                              required error={errors.email}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div id="company">
                            <FormField
                              label="Company" placeholder="Company name"
                              value={form.company} onChange={set("company")}
                              required error={errors.company}
                            />
                          </div>
                          <FormField
                            label="Phone (optional)" placeholder="+1 443 416 2928"
                            value={form.phone} onChange={set("phone")}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <SelectDropdown
                            label="Industry" options={INDUSTRIES}
                            value={form.industry} onChange={set("industry")}
                          />
                          <SelectDropdown
                            label="Service Required" options={SERVICE_TYPES}
                            value={form.service} onChange={set("service")}
                          />
                        </div>

                        <div id="message">
                          <FormField
                            label="Message"
                            placeholder="Describe your sourcing requirement, financial need, or enquiry in as much detail as possible..."
                            value={form.message} onChange={set("message")}
                            textarea required error={errors.message}
                          />
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center gap-3"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute left-[-100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700" />
                          <span className="relative z-10 flex items-center gap-2">
                            {/* WhatsApp icon */}
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            Send via WhatsApp
                          </span>
                        </motion.button>

                        <p className="text-center text-zinc-600 text-xs">
                          Clicking the button will open WhatsApp with your message pre-filled and ready to send.
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