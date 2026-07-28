"use client";

import { motion } from "framer-motion";
import { FiInstagram, FiTwitter, FiFacebook, FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative py-20 md:py-28 px-6 md:px-12 lg:px-24">
      {/* Top line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Logo & tagline */}
          <div className="md:col-span-2">
            <h3 className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase mb-4">
              <span className="gold-gradient">Auto</span>
              <span className="text-white">Roma</span>
            </h3>
            <p className="text-sm text-white/30 font-light max-w-sm leading-relaxed">
              Luxury car fragrances crafted for every journey. Transform your
              drive with the finest scents from around the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {["Collections", "Mist Collection", "Hanging Collection", "About Us"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 font-light hover:text-gold transition-colors duration-300 flex items-center gap-1 group"
                      data-cursor-hover
                    >
                      {link}
                      <FiArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: FiInstagram, label: "Instagram" },
                { icon: FiTwitter, label: "Twitter" },
                { icon: FiFacebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-300 hover:border-gold/40"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  data-cursor-magnetic
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/40" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://www.autoroma.in"
                className="text-sm text-white/30 font-light hover:text-gold transition-colors duration-300 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                www.autoroma.in
                <FiArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p className="text-[10px] tracking-[0.3em] text-white/15 uppercase">
            &copy; {new Date().getFullYear()} AutoRoma. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[0.3em] text-white/15 uppercase">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
