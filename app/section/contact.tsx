import {
  FiMail,
  FiPhone,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa6";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-zinc-800 bg-black text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-10">

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-lg">

          <a
            href="mailto:shabbirkumarshbi@gmail.com"
            className="flex items-center gap-2 transition hover:text-violet-400"
          >
            <FiMail size={20} />
            <span>Email</span>
          </a>

          <a
            href="tel:+917018157169"
            className="flex items-center gap-2 transition hover:text-red-400"
          >
            <FiPhone size={20} />
            <span>70181 57169</span>
          </a>

          <a
            href="https://wa.me/+917018157169"
            target="_blank"
            className="flex items-center gap-2 transition hover:text-green-400"
          >
            <FaWhatsapp size={20} />
            <span>WhatsApp</span>
          </a>

          <a
            href="https://www.linkedin.com/in/shabbir-kumar-9b7223366/"
            target="_blank"
            className="flex items-center gap-2 transition hover:text-sky-400"
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>

        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-zinc-600">
          © 2025 Shabbir Thakur. All Rights Reserved.
        </p>

      </div>
    </section>
  );
}