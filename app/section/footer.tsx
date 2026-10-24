import Image from "next/image";
import Link from "next/link";
import { FiMail, FiPhone, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Web Applications",
  "Landing Pages",
  "Business Websites",
  "E-Commerce",
  "Dashboards",
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Shabbirthakur-74",
    icon: FaGithub,
    hoverClass: "hover:text-violet-400",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shabbir-kumar-9b7223366/",
    icon: FaLinkedin,
    hoverClass: "hover:text-sky-400",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919882815441",
    icon: FaWhatsapp,
    hoverClass: "hover:text-green-400",
  },
] as const;

const headingClass =
  "text-xs font-semibold uppercase tracking-[0.2em] text-text mb-4";
const linkClass = "text-sm text-text-5 hover:text-emerald-400 transition-colors";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-header">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <Link href="#home" className="flex items-center gap-3 w-fit">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="/logo.png"
                alt="Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Shabbir{" "}
              <span className="italic font-normal text-white/60">Thakur</span>
            </span>
          </Link>
          <p className="text-sm text-text-5 leading-relaxed max-w-xs">
            Freelance full-stack developer building fast, modern, and
            responsive websites and web applications.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon, hoverClass }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:bg-white/10 transition-all duration-300 ${hoverClass}`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3 className={headingClass}>Quick Links</h3>
          <ul className="flex flex-col gap-2.5">
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <h3 className={headingClass}>Services</h3>
          <ul className="flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s}>
                <Link href="#services" className={linkClass}>
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className={headingClass}>Contact</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="mailto:shabbirkumarshbi@gmail.com"
                className={`${linkClass} flex items-center gap-2 break-all`}
              >
                <FiMail className="shrink-0" />
                shabbirkumarshbi@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+919882815441"
                className={`${linkClass} flex items-center gap-2`}
              >
                <FiPhone className="shrink-0" />
                +91 98828 15441
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-text-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for freelance work
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-7 text-center sm:text-left">
            © {year} Shabbir Thakur. All Rights Reserved.
          </p>
          <Link
            href="#home"
            className="flex items-center gap-1.5 text-xs text-text-6 hover:text-emerald-400 transition-colors"
          >
            Back to top <FiArrowUp />
          </Link>
        </div>
      </div>
    </footer>
  );
}
