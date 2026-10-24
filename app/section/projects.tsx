"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "./reveal";

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl: string;
  accent: "emerald" | "sky" | "violet";
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "My Bir Billing",
    category: "Full Stack Web Application",
    description:
      "My Bir Billing is a travel and adventure booking platform for Bir Billing, allowing users to book paragliding rides and certified training courses. The platform provides a seamless booking experience, intuitive navigation, and efficient course and reservation management.",
    stack: ["PHP", "Laravel", "Tailwind CSS", "MySQL"],
    image: "/projects/mybirbilling.png",
    liveUrl: "https://mybirbilling.com",
    accent: "emerald",
  },
  {
    id: 2,
    name: "Goa - Car Rental",
    category: "Landing Page",
    description:
      "Goa Car Rental is a modern landing page designed to showcase car rental services in Goa. It features a clean and responsive design, service highlights, vehicle showcases, and a user-friendly interface to enhance customer engagement.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/car-rental.png",
    liveUrl: "https://rented-cars-new.vercel.app/",
    accent: "sky",
  },
  {
    id: 3,
    name: "Aditya-Google Ads Expert",
    category: "Landing Page",
    description:
      "Aditya Google Ads Expert is a professional landing page designed to promote Google Ads and digital marketing services. It features a modern, responsive design, service highlights, and strategic call-to-action sections to drive client engagement.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/google-ads.png",
    liveUrl: "https://adityaadsexpert-ten.vercel.app",
    accent: "violet",
  },
  {
    id: 4,
    name: "GrowthPlug",
    category: "Landing Page",
    description:
      "GrowthPlug is a modern landing page designed for a digital marketing agency, showcasing its services, expertise, and brand value. It features a responsive design, engaging visuals, strategic call-to-action sections, and a user-focused experience.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Github", "Vercel"],
    image: "/projects/growthplug.png",
    liveUrl: "https://growthplugvercel.vercel.app",
    accent: "emerald",
  },
];

const ACCENT = {
  emerald: {
    badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    text: "text-emerald-400",
    ring: "border-emerald-400/30",
    bar: "from-emerald-400 to-sky-400",
    btnGradient: "from-emerald-500 to-sky-400",
    glow: "0 0 80px var(--glow-emerald)",
    radial: "var(--radial-emerald)",
  },
  sky: {
    badge: "bg-sky-500/10 border-sky-500/20 text-sky-400",
    text: "text-sky-400",
    ring: "border-sky-400/30",
    bar: "from-sky-400 to-violet-400",
    btnGradient: "from-sky-500 to-violet-500",
    glow: "0 0 80px var(--glow-sky)",
    radial: "var(--radial-sky)",
  },
  violet: {
    badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    text: "text-violet-400",
    ring: "border-violet-400/30",
    bar: "from-violet-400 to-sky-400",
    btnGradient: "from-violet-500 to-sky-400",
    glow: "0 0 80px var(--glow-violet)",
    radial: "var(--radial-violet)",
  },
} as const;

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const num = (i: number) => String(i + 1).padStart(2, "0");
const host = (url: string) => new URL(url).host;

const BrowserFrame = memo(function BrowserFrame({
  src,
  alt,
  url,
}: {
  src: string;
  alt: string;
  url: string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-frame shadow-2xl">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-frame-bar border-b border-white/[0.06]">
        <div className="flex gap-[6px]">
          <span className="w-3 h-3 rounded-full bg-dot-red" />
          <span className="w-3 h-3 rounded-full bg-dot-amber" />
          <span className="w-3 h-3 rounded-full bg-dot-green" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 bg-frame-field rounded-md px-3 py-1 w-full max-w-xs">
            <Globe className="w-3 h-3 text-zinc-500 flex-shrink-0" />
            <span className="truncate font-mono text-[11px] text-zinc-400">{host(url)}</span>
          </div>
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1280px) 50vw, 560px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
});

/* ── Phones: one card per project, full-width screenshot ── */
const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const a = ACCENT[project.accent];

  return (
    <article
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md"
      style={{ boxShadow: a.glow }}
    >
      {/* Screenshot */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        className="relative block aspect-[2/1] overflow-hidden bg-frame"
      >
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white/80 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-md">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>

      {/* Info */}
      <div className="relative -mt-6 flex flex-col gap-3 p-5 pt-0">
        <span
          className={`w-fit rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${a.badge}`}
        >
          {project.category}
        </span>
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">
          {project.name}
        </h3>

        <div>
          <p
            className={`text-sm leading-relaxed text-zinc-400 ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-medium text-zinc-300 underline-offset-4 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-zinc-300"
            >
              {tech}
            </li>
          ))}
        </ul>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${a.btnGradient} py-3 text-sm font-semibold text-on-accent shadow-lg active:scale-[0.98] transition`}
        >
          <Globe className="h-4 w-4" />
          Visit live site
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
});

/* ── Phones & tablets: vertical feed ── */
function ProjectFeed() {
  return (
    <Stagger gap={0.1} amount={0.05} className="mx-auto flex max-w-2xl flex-col gap-5 lg:hidden">
      {PROJECTS.map((project, i) => (
        <StaggerItem key={project.id}>
          <ProjectCard project={project} index={i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ── Desktop: list + detail explorer (mirrors the Services section) ── */
function ProjectExplorer() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  const a = ACCENT[p.accent];

  return (
    <Reveal amount={0.15} className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 xl:gap-8">
      {/* List */}
      <div className="flex flex-col gap-4 self-start lg:sticky lg:top-24">
        <div role="tablist" aria-label="Projects" className="flex flex-col gap-2">
          {PROJECTS.map((item, i) => {
            const ia = ACCENT[item.accent];
            const isActive = i === active;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "border-white/12 bg-card"
                    : "border-transparent hover:border-white/8 hover:bg-card/50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="proj-indicator"
                    className={`absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b ${ia.bar}`}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <span className={`font-mono text-xs ${isActive ? ia.text : "text-text-8"}`}>
                  {num(i)}
                </span>
                <span
                  className={`relative h-11 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                    isActive
                      ? "border-white/15"
                      : "border-white/8 opacity-60 grayscale group-hover:opacity-90 group-hover:grayscale-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate font-semibold transition-colors ${
                      isActive ? "text-text" : "text-text-4 group-hover:text-text-2"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="block truncate text-xs text-text-7">{item.category}</span>
                </span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                    isActive
                      ? `${ia.text} translate-x-0 opacity-100`
                      : "-translate-x-2 opacity-0 group-hover:opacity-50"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* More work */}
        <a
          href="https://github.com/Shabbirthakur-74"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-2xl border border-dashed border-white/12 px-5 py-4 transition-colors hover:border-white/20 hover:bg-card/50"
        >
          <FaGithub className="h-6 w-6 shrink-0 text-text-4 group-hover:text-text" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-text-2">More on GitHub</span>
            <span className="block text-xs text-text-7">Code, experiments and side projects</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-text-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Detail panel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={p.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className={`relative overflow-hidden rounded-3xl border bg-card p-5 xl:p-6 ${a.ring}`}
            style={{ boxShadow: a.glow }}
          >
            <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.bar}`} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${a.radial} 0%, transparent 70%)`,
              }}
            />

            <div className="relative flex flex-col gap-4">
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name}`}
                className="block transition-transform duration-500 hover:-translate-y-1"
              >
                <BrowserFrame src={p.image} alt={`${p.name} screenshot`} url={p.liveUrl} />
              </a>

              <div className="flex flex-col gap-2">
                <span
                  className={`w-fit rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${a.badge}`}
                >
                  {p.category}
                </span>
                <h3 className="text-xl xl:text-2xl font-bold tracking-tight text-text">
                  {p.name}
                </h3>
                <p className="text-sm leading-relaxed text-text-4">{p.description}</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-widest text-text-6">
                  Built with
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-text-3"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${a.btnGradient} px-5 py-2.5 text-sm font-semibold text-on-accent shadow-lg transition hover:opacity-90`}
                >
                  <Globe className="h-4 w-4" />
                  Visit live site
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-5 py-2.5 text-sm font-semibold text-text-2 transition-colors hover:bg-white/5"
                >
                  Start a similar project
                </Link>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div className="bg-bg overflow-x-hidden">
      {/* ── Background layer ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Ambient blobs */}
        <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] rounded-full bg-emerald-500/[0.045] blur-[140px]" />
        <div className="absolute top-0 right-[-20%] w-[55vw] h-[55vw] rounded-full bg-sky-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[25%] w-[50vw] h-[50vw] rounded-full bg-violet-500/[0.035] blur-[110px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in oklab, var(--color-white) 4%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-white) 4%, transparent) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Section ── */}
      <section id="projects" className="relative py-14 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-12">
          {/* ── Header ── */}
          <Reveal className="mb-8 md:mb-12 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-col items-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.09] backdrop-blur-sm mb-5">
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                  style={{ boxShadow: "0 0 7px var(--pulse-emerald)" }}
                />
                <span className="text-[13px] font-medium text-zinc-300 tracking-widest uppercase">
                  Featured Projects
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-[2.1rem] sm:text-5xl font-extrabold leading-[1.08] tracking-tight text-white">
                Things{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  I&apos;ve Built
                </span>
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
              A collection of projects that showcase clean code, intuitive
              user experiences, and scalable solutions.
            </p>
          </Reveal>

          <ProjectFeed />
          <ProjectExplorer />
        </div>
      </section>
    </div>
  );
}
