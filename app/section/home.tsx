"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
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
  "flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-text-3 transition-colors duration-200";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-svh w-full flex items-center overflow-hidden bg-bg"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[80px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-sky-500/8 blur-[70px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-violet-500/8 blur-[70px]"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-white) 1px, transparent 1px), linear-gradient(90deg, var(--color-white) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 md:py-28 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-16 items-center">
        {/* LEFT */}
        <motion.div
          className="flex flex-col gap-5 md:gap-7"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="w-fit flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/4 backdrop-blur"
          >
            <motion.span
              className="inline-flex rounded-full h-2 w-2 bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-xs font-medium text-text-3">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={item}>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-white mb-3">
              Hi, I&apos;m{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-emerald) 0%, var(--color-sky) 50%, var(--color-violet) 100%)",
                }}
              >
                Shabbir
                <br />
                Thakur
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold leading-snug">
              <span className="text-white">Taking Web Applications</span>{" "}
              <span className="text-text-8">To New Heights.</span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-text-6 leading-[1.8] text-[15px] max-w-lg text-left md:text-justify"
          >
            Based out of Bir, Himachal Pradesh — home to Billing,
            the highest paragliding site in Asia. As a full-stack developer,
            I channel that same high-altitude ambition into code. I design
            everything from pixel-perfect frontends to robust backend
            architecture, turning complex ideas into seamless digital
            experiences.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#projects"
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-bg transition-colors duration-200 cursor-pointer hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-emerald), var(--color-sky))",
                }}
              >
                View My Work →
              </Link>
            </motion.div>
          </motion.div>

          {/* Social */}
          <motion.div variants={item} className="flex items-center gap-6">
            {socialLinks.map(({ label, href, hoverClass, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.9 }}
                className={`${socialIconBaseClass} ${hoverClass}`}
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/terminal.png"
              alt="Terminal image"
              width={640}
              height={480}
              className="block h-full w-full object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
