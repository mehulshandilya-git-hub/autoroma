"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CarExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const fragranceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax cabin entrance
      gsap.fromTo(
        cabinRef.current,
        { scale: 1.2, filter: "blur(20px)", opacity: 0 },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 10%",
            scrub: 1.5,
          },
        }
      );

      // Dashboard lights animate
      gsap.fromTo(
        ".dash-light",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
          },
        }
      );

      // Fragrance flow animation
      gsap.fromTo(
        fragranceRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 0.7,
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Section header */}
      <div className="text-center mb-16 md:mb-24 px-6 relative z-10">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6">
          The Experience
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white">
          Inside Your <span className="gold-gradient font-medium">Sanctuary</span>
        </h2>
      </div>

      {/* Cabin visualization */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div
          ref={cabinRef}
          className="relative w-full aspect-video rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0a0a0a, #1a1a1a, #0a0a0a)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(201,169,110,0.05)",
          }}
        >
          {/* Dashboard */}
          <div
            ref={dashboardRef}
            className="absolute bottom-0 left-0 right-0 h-[45%]"
            style={{
              background: "linear-gradient(to top, #0a0a0a, #1a1a1a)",
              borderTop: "1px solid rgba(201,169,110,0.1)",
            }}
          >
            {/* Dashboard elements */}
            <div className="absolute inset-0 flex items-center justify-center gap-20">
              {/* Speedometer */}
              <div className="dash-light relative w-32 h-32 opacity-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(201,169,110,0.1)"
                    strokeWidth="1"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    fill="none"
                    stroke="rgba(201,169,110,0.05)"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="30"
                    y2="25"
                    stroke="#c9a96e"
                    strokeWidth="0.5"
                    className="origin-center"
                  />
                  {/* Tick marks */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
                    const x1 = 50 + 38 * Math.cos(angle);
                    const y1 = 50 + 38 * Math.sin(angle);
                    const x2 = 50 + 35 * Math.cos(angle);
                    const y2 = 50 + 35 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(201,169,110,0.3)"
                        strokeWidth="0.5"
                      />
                    );
                  })}
                </svg>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] text-gold/40 uppercase">
                  Speed
                </span>
              </div>

              {/* AC Vent with fragrance */}
              <div className="dash-light relative opacity-0">
                <div className="w-20 h-20 relative">
                  {/* Vent grid */}
                  <div className="absolute inset-0 grid grid-cols-4 gap-[2px]">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-sm"
                      />
                    ))}
                  </div>
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 30px rgba(201,169,110,0.2), 0 0 60px rgba(201,169,110,0.05)",
                    }}
                  />
                </div>

                {/* Mini perfume bottle */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <div className="w-6 h-10 relative">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full rounded-sm"
                      style={{
                        background: "linear-gradient(180deg, rgba(201,169,110,0.4), rgba(26,26,26,0.9))",
                        border: "1px solid rgba(201,169,110,0.3)",
                      }}
                    />
                    <div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-2 rounded-t-sm"
                      style={{ background: "#c9a96e" }}
                    />
                  </div>
                </div>
              </div>

              {/* Infotainment */}
              <div className="dash-light relative w-40 h-24 opacity-0">
                <div
                  className="w-full h-full rounded-sm p-3"
                  style={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(201,169,110,0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                    <span className="text-[7px] tracking-[0.2em] text-white/30 uppercase">
                      AutoRoma Active
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-[1px] bg-gold/20 rounded" style={{ width: "80%" }} />
                    <div className="h-[1px] bg-gold/10 rounded" style={{ width: "60%" }} />
                    <div className="h-[1px] bg-gold/15 rounded" style={{ width: "70%" }} />
                  </div>
                  <div className="mt-2 text-[6px] text-gold/30 tracking-wider">
                    Imperial Mist · 42 days remaining
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient lighting strip */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px]">
              <div
                className="w-full h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), rgba(212,164,58,0.3), rgba(201,169,110,0.4), transparent)",
                  boxShadow: "0 0 20px rgba(201,169,110,0.2)",
                }}
              />
            </div>
          </div>

          {/* Fragrance flow particles */}
          <div ref={fragranceRef} className="absolute inset-0 opacity-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, 100 + Math.random() * 200],
                  y: [0, (Math.random() - 0.5) * 150],
                  opacity: [0.4, 0],
                  scale: [1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                  ease: "easeOut",
                }}
                className="absolute rounded-full"
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                  left: `${40 + Math.random() * 10}%`,
                  top: `${30 + Math.random() * 30}%`,
                  background: `radial-gradient(circle, rgba(201,169,110,0.5), transparent)`,
                }}
              />
            ))}
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="max-w-2xl mx-auto text-center mt-16 px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/30 font-light leading-relaxed text-lg"
        >
          As you settle into your drive, AutoRoma transforms your cabin into a
          sanctuary. Fragrance flows gently through the air, creating an aura of
          sophistication that makes every journey extraordinary.
        </motion.p>
      </div>
    </section>
  );
}
