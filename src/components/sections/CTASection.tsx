"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headlight beam activation
      gsap.fromTo(
        headlightsRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          },
        }
      );

      gsap.fromTo(
        ".cta-text",
        { opacity: 0, y: 80, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-48 md:py-64 overflow-hidden"
    >
      {/* Headlight beams */}
      <div ref={headlightsRef} className="absolute inset-0 opacity-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px]"
          style={{
            background:
              "radial-gradient(ellipse 800px 400px at center, rgba(201,169,110,0.08), transparent)",
          }}
        />
        {/* Beam lines */}
        <div
          className="absolute top-1/2 left-0 w-full h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(201,169,110,0.1) 40%, rgba(201,169,110,0.15) 50%, rgba(201,169,110,0.1) 60%, transparent 90%)",
            transform: "translateY(-200px)",
          }}
        />
        <div
          className="absolute top-1/2 left-0 w-full h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 10%, rgba(201,169,110,0.08) 40%, rgba(201,169,110,0.12) 50%, rgba(201,169,110,0.08) 60%, transparent 90%)",
            transform: "translateY(200px)",
          }}
        />
      </div>

      {/* Perfume bottle glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 60px rgba(201,169,110,0.1)",
              "0 0 120px rgba(201,169,110,0.2), 0 0 200px rgba(201,169,110,0.05)",
              "0 0 60px rgba(201,169,110,0.1)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.1), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <h2 className="cta-text text-5xl md:text-7xl lg:text-9xl font-light tracking-tight leading-[1] mb-10 opacity-0">
          <span className="block text-white">Transform</span>
          <span className="block gold-gradient font-medium">Every Drive</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            className="group relative px-12 py-5 text-sm tracking-[0.3em] uppercase font-medium text-black overflow-hidden transition-all duration-500"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
              animation: "pulse-gold 3s ease-in-out infinite",
            }}
            data-cursor-magnetic
          >
            <span className="relative z-10">Shop Now</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, #e8d5a3, #c9a96e)",
              }}
            />
          </button>

          <button
            className="px-12 py-5 text-sm tracking-[0.3em] uppercase font-medium text-gold/80 transition-all duration-500 hover:text-gold hover:border-gold/50"
            style={{
              border: "1px solid rgba(201,169,110,0.2)",
            }}
            data-cursor-magnetic
          >
            View Collection
          </button>
        </motion.div>
      </div>
    </section>
  );
}
