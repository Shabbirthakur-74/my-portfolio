"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";

const nav: { label: string; href: string }[] = [
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Call",
    href: "tel:+919882815441",
    icon: Phone,
    hoverClass: "hover:text-red-400",
    external: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919882815441",
    icon: FaWhatsapp,
    hoverClass: "hover:text-green-400",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    icon: FaLinkedin,
    hoverClass: "hover:text-sky-400",
    external: true,
  },
] as const;

const socialIconBaseClass =
  "w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:bg-white/10 transition-all duration-300";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-header/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 h-16 md:h-18 grid grid-cols-[1fr_auto] md:grid-cols-3 items-center">
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={56}
              height={56}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-[15px] lg:text-[20px] font-semibold tracking-tight text-white">
            Shabbir{" "}
            <span className="italic font-normal text-white/60">Thakur</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-300"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center justify-end gap-3">
          {socialLinks.map(({ label, href, icon: Icon, hoverClass, external }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`${socialIconBaseClass} ${hoverClass}`}
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>

        {/* Mobile CTA — section links live in <BottomNav /> */}
        <div className="flex items-center justify-end gap-2 md:hidden">
          <Link
            href="https://wa.me/919882815441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-green-400 bg-green-400/5 active:scale-95 transition"
          >
            <FaWhatsapp size={18} />
          </Link>
          <Link
            href="#contact"
            className="h-10 px-4 rounded-full flex items-center gap-1.5 bg-emerald-400 text-on-emerald text-sm font-semibold active:scale-95 transition"
          >
            Hire me
          </Link>
        </div>
      </div>
    </header>
  );
}