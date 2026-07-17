"use client";

import Link from "next/link";
import { memo } from "react";
import {
  Monitor,
  LayoutTemplate,
  Globe,
  ShoppingCart,
  BarChart3,
  Briefcase,
CircleCheck,
  type LucideIcon,
} from "lucide-react";


interface Service {
  title: string;
  desc: string;
  color: keyof typeof svcColor;
  deliverables: string[];
  icon: LucideIcon;
}

const FONT_MONO = "'Fira Code', monospace";

const svcColor = {
  emerald: {
    icon: "text-emerald-400",
    border: "hover:border-emerald-400/30",
    glow: "hover:shadow-emerald-500/10",
    btn: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/20",
    check: "text-emerald-400",
  },
  sky: {
    icon: "text-sky-400",
    border: "hover:border-sky-400/30",
    glow: "hover:shadow-sky-500/10",
    btn: "bg-sky-400/10 text-sky-400 border-sky-400/20 hover:bg-sky-400/20",
    check: "text-sky-400",
  },
  violet: {
    icon: "text-violet-400",
    border: "hover:border-violet-400/30",
    glow: "hover:shadow-violet-500/10",
    btn: "bg-violet-400/10 text-violet-400 border-violet-400/20 hover:bg-violet-400/20",
    check: "text-violet-400",
  },
  amber: {
    icon: "text-amber-400",
    border: "hover:border-amber-400/30",
    glow: "hover:shadow-amber-500/10",
    btn: "bg-amber-400/10 text-amber-400 border-amber-400/20 hover:bg-amber-400/20",
    check: "text-amber-400",
  },
  rose: {
    icon: "text-rose-400",
    border: "hover:border-rose-400/30",
    glow: "hover:shadow-rose-500/10",
    btn: "bg-rose-400/10 text-rose-400 border-rose-400/20 hover:bg-rose-400/20",
    check: "text-rose-400",
  },
  teal: {
    icon: "text-teal-400",
    border: "hover:border-teal-400/30",
    glow: "hover:shadow-teal-500/10",
    btn: "bg-teal-400/10 text-teal-400 border-teal-400/20 hover:bg-teal-400/20",
    check: "text-teal-400",
  },
} as const;

const services: Service[] = [
  {
    title: "Modern Web Applications",
    desc: "Modern web applications built with React, Next.js, Node.js, and TypeScript for speed, scalability, and great user experience.",
    color: "emerald",
    deliverables: [
      "Custom Web App",
      "Responsive Design",
      "Authentication",
      "Deployment",
    ],
    icon: Monitor,
  },
  {
    title: "Custom Landing Pages",
    desc: "Fast, responsive, and conversion-focused landing pages that help businesses showcase their products and services.",
    color: "sky",
    deliverables: [
      "Responsive Layout",
      "SEO Friendly",
      "Fast Loading",
      "Modern Animations",
    ],
    icon: LayoutTemplate,
  },
  {
    title: "Business Websites",
    desc: "Professional websites that establish your online presence with clean design, responsive layouts, and optimized performance across all devices.",
    color: "violet",
    deliverables: [
      "Responsive Website",
      "CMS Integration",
      "Contact Forms",
      "SEO Optimization",
    ],
    icon: Globe,
  },
  {
    title: "E-Commerce Platforms",
    desc: "Complete online stores with secure payments, product management and seamless shopping experiences for your customers.",
    color: "amber",
    deliverables: [
      "Shopping Cart",
      "Payment Gateway",
      "Product Management",
      "Order Tracking",
    ],
    icon: ShoppingCart,
  },
  {
    title: "Custom Dashboards",
    desc: "Interactive admin panels and analytics dashboards designed to simplify data management with intuitive interfaces and real-time insights.",
    color: "rose",
    deliverables: [
      "Admin Dashboard",
      "Analytics",
      "Role Management",
      "Data Visualization",
    ],
    icon: BarChart3,
  },
  {
    title: "Portfolio Websites",
    desc: "Modern portfolio websites that showcase your work, skills, and achievements with engaging visuals, smooth animations, and optimized performance.",
    color: "teal",
    deliverables: [
      "Personal Branding",
      "Project Showcase",
      "Smooth Animations",
      "SEO Ready",
    ],
    icon: Briefcase,
  },
];

const ServiceCard = memo(function ServiceCard({ s }: { s: Service }) {
  const c = svcColor[s.color];
  const Icon = s.icon;

  return (
    <div
      className={`group rounded-2xl border border-white/6 bg-[#0e1420] p-6 flex flex-col transition-all duration-300 hover:bg-[#111927] hover:shadow-xl ${c.border} ${c.glow}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 flex-shrink-0 ${c.icon}`}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>

        <h3 className="text-base font-semibold text-[#e8eaf0] leading-snug">
          {s.title}
        </h3>
      </div>

      <p className="text-xs text-[#6b7589] leading-relaxed mb-5 flex-1 text-justify">
        {s.desc}
      </p>

      <ul className="space-y-1.5 mb-4">
        {s.deliverables.map((d) => (
          <li key={d} className="flex items-center gap-2">
            {< CircleCheck  className={`w-4 h-4 ${c.check}`} />}

            <span className="text-xs text-[#8892a4]">{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

interface ServicesSectionProps {
  onNav?: (section: string) => void;
}

export default function ServicesSection({ onNav }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="min-h-screen px-6 md:px-12 pt-28 pb-16 max-w-5xl mx-auto w-full"
    >
      <p
        className="text-xs tracking-[0.25em] uppercase mb-3 text-emerald-400 text-center"
        style={{ fontFamily: FONT_MONO }}
      >
        what I offer
      </p>

      <div className="flex flex-col items-center gap-6 mb-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#e8eaf0] leading-tight text-center">
          Services{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
            I Provide
          </span>
        </h2>
      </div>

      <div className="text-center">
        <p className="text-[#8892a4] text-sm mb-12 max-w-lg mx-auto leading-relaxed">
          From a single landing page to a full-stack web application — I
          deliver clean, maintainable, and production-ready work on time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {services.map((s) => (
          <ServiceCard key={s.title} s={s} />
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/4 p-8 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center sm:text-left">
        <div>
          <p
            className="text-[11px] text-emerald-400 tracking-widest uppercase mb-1"
            style={{ fontFamily: FONT_MONO }}
          >
            let&apos;s work together
          </p>

          <h3 className="text-xl font-semibold text-[#e8eaf0] mb-1">
            Ready for the next flight?
          </h3>

          <p className="text-sm text-[#8892a4]">
            I&apos;m currently available for freelance work. Let&apos;s build
            something great.
          </p>
        </div>

        <div>
          <Link
            href="#contact"
            className="px-4 py-2 md:text-xs rounded-xl bg-emerald-400 text-[#0b0f1a] text-sm font-semibold hover:bg-emerald-300 transition-colors cursor-pointer"
          >
            Contact Me →
          </Link>
        </div>
      </div>
    </section>
  );    
}