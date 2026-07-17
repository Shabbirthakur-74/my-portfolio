"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Shabbirthakur-74",
    hoverClass: "hover:border-violet-500/60 hover:text-violet-400",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    hoverClass: "hover:border-sky-500/60 hover:text-sky-400",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: "mailto:shabbirkumarshbi@gmail.com",
    hoverClass: "hover:border-emerald-500/60 hover:text-emerald-400",
    icon: FiMail,
  },
] as const;

const socialIconBaseClass =
  "flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-[#a1a1aa] transition-colors duration-200";

const FONT_MONO = "'Fira Code', monospace";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#09090b]"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[80px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-sky-500/8 blur-[70px]" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-[70px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-28 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-16 items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-7">
          {/* Badge */}
          <div className="w-fit flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur">
            <span className="inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            <span
              className="text-xs font-medium text-[#a1a1aa]"
              style={{ fontFamily: FONT_MONO }}
            >
              Full Stack Developer
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-white mb-3">
              Hi, I&apos;m{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #34d399 0%, #38bdf8 50%, #a78bfa 100%)",
                }}
              >
                Shabbir
                <br />
                Thakur
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold leading-snug">
              <span className="text-white">Taking Web Applications</span>{" "}
              <span className="text-[#52525b]">To New Heights.</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-[#71717a] leading-[1.8] text-[15px] max-w-lg text-justify">
            Based out of Bir, Himachal Pradesh — home to Billing,
            the highest paragliding site in Asia. As a full-stack developer,
            I channel that same high-altitude ambition into code. I design
            everything from pixel-perfect frontends to robust backend
            architecture, turning complex ideas into seamless digital
            experiences.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-[#09090b] transition-colors duration-200 cursor-pointer hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #34d399, #38bdf8)",
              }}
            >
              View My Work →
            </Link>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map(({ label, href, hoverClass, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`${socialIconBaseClass} ${hoverClass}`}
              >
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
            <Image
              src="/terminal.png"
              alt="Terminal image"
              width={640}
              height={480}
              className="block h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}