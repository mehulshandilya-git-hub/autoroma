"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  return (
    <motion.nav
      ref={navRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 3.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-24 py-6 flex items-center justify-between"
      style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
      }}
    >
      <a href="#" className="flex items-center gap-1" data-cursor-hover>
        <span className="text-xl tracking-[0.2em] uppercase font-light">
          <span className="gold-gradient">Auto</span>
          <span className="text-white">Roma</span>
        </span>
      </a>

      <div className="hidden md:flex items-center gap-10">
        {["Collections", "Mist", "Hanging", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] tracking-[0.3em] uppercase text-white/40 font-light hover:text-gold transition-colors duration-300"
            data-cursor-hover
          >
            {item}
          </a>
        ))}
      </div>

      <button
        className="text-[11px] tracking-[0.2em] uppercase px-6 py-2.5 transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
        style={{
          border: "1px solid rgba(201,169,110,0.25)",
          color: "#c9a96e",
        }}
        data-cursor-magnetic
      >
        Shop
      </button>
    </motion.nav>
  );
}
