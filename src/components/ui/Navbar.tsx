"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[60] border-b text-white backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-ink/95" : "border-white/5 bg-ink/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <div className="relative z-[61] flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="inline-flex items-center gap-0.5">
            <span className="text-xl tracking-[0.2em] uppercase font-light">
              <span className="text-gold">Auto</span>
              <span className="text-white">Roma</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            <a className="px-3 py-2 text-sm transition-colors text-gold" href="/">
              Home
            </a>
            <a className="px-3 py-2 text-sm transition-colors text-white/70 hover:text-white" href="#collection">
              Collections
            </a>
            <a className="px-3 py-2 text-sm transition-colors text-white/70 hover:text-white" href="#about">
              About
            </a>
            <a
              className="btn-primary ml-3"
              href="https://www.autoroma.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop
            </a>
          </div>

          {/* Mobile CTA */}
          <a
            className="btn-primary px-3 py-2 text-xs md:hidden"
            href="https://www.autoroma.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop
          </a>
        </div>
      </div>
    </nav>
  );
}
