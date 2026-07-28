"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SCENT_NOTES } from "@/lib/constants";

function FloatingNote({
  note,
  index,
  total,
}: {
  note: (typeof SCENT_NOTES)[0];
  index: number;
  total: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  // Distribute in a circular-ish pattern
  const angle = (index / total) * Math.PI * 2 + Math.PI / 6;
  const radius = 28;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.5 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute group"
      style={{
        left: `calc(50% + ${x}%)`,
        top: `calc(50% + ${y}%)`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3 + index * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-3 cursor-pointer"
      >
        {/* Particle burst on hover */}
        {isHovered && (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: Math.cos((i / 12) * Math.PI * 2) * 60,
                  y: Math.sin((i / 12) * Math.PI * 2) * 60,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 3,
                  height: 3,
                  background: note.color,
                  boxShadow: `0 0 10px ${note.color}`,
                }}
              />
            ))}
          </>
        )}

        {/* Icon circle */}
        <motion.div
          animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
          className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500"
          style={{
            background: isHovered
              ? `${note.color}20`
              : "rgba(255,255,255,0.02)",
            border: `1px solid ${isHovered ? note.color + "50" : "rgba(255,255,255,0.05)"}`,
            borderRadius: "50%",
            boxShadow: isHovered
              ? `0 0 30px ${note.color}20, 0 0 60px ${note.color}10`
              : "none",
          }}
        >
          <span className="text-2xl md:text-3xl">{note.icon}</span>

          {/* Glow ring */}
          <motion.div
            animate={isHovered ? { scale: [1, 1.5], opacity: [0.3, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${note.color}30` }}
          />
        </motion.div>

        {/* Label */}
        <motion.span
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-light whitespace-nowrap"
          style={{ color: isHovered ? note.color : "rgba(255,255,255,0.3)" }}
        >
          {note.name}
        </motion.span>

        {/* Description on hover */}
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={isHovered ? { opacity: 0.5, height: "auto" } : { opacity: 0, height: 0 }}
          className="text-[9px] tracking-wider text-white/30 whitespace-nowrap overflow-hidden"
        >
          {note.particles}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function ScentNotes() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
        }}
      />

      <div className="text-center mb-20 md:mb-28 px-6">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6">
          Scent Notes
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-white">
          The Art of{" "}
          <span className="gold-gradient font-medium">Fragrance</span>
        </h2>
      </div>

      {/* Floating notes layout */}
      <div className="relative w-full max-w-4xl mx-auto px-6" style={{ height: "600px" }}>
        {/* Center piece */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 40px rgba(201,169,110,0.1)",
                "0 0 80px rgba(201,169,110,0.2)",
                "0 0 40px rgba(201,169,110,0.1)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(201,169,110,0.05)",
              border: "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <span className="text-4xl">✨</span>
          </motion.div>
        </div>

        {/* Orbital connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="28"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="0.2"
            strokeDasharray="2 4"
          />
        </svg>

        {/* Notes */}
        {SCENT_NOTES.map((note, index) => (
          <FloatingNote
            key={note.name}
            note={note}
            index={index}
            total={SCENT_NOTES.length}
          />
        ))}
      </div>

      {/* Bottom description */}
      <div className="max-w-xl mx-auto text-center mt-16 px-6">
        <p className="text-white/30 font-light leading-relaxed">
          Each AutoRoma fragrance is a symphony of meticulously sourced notes,
          blending the warmth of amber, the freshness of ocean, and the richness
          of rare woods into a single, unforgettable experience.
        </p>
      </div>
    </section>
  );
}
