"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionDivider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-30%" });

  return (
    <div ref={ref} className="relative py-16 md:py-24 flex items-center justify-center">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto h-[1px] origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent)",
        }}
      />
      {label && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bg-black px-4 text-[9px] tracking-[0.5em] uppercase text-gold/40"
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
