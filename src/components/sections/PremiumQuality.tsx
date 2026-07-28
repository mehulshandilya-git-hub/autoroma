"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PremiumQuality() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic text reveal
      gsap.fromTo(
        ".quality-word",
        { opacity: 0, y: 100, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.15,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 70%",
          },
        }
      );

      // Macro shot parallax
      gsap.fromTo(
        ".macro-panel",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const macroShots = [
    {
      title: "Glass Precision",
      description: "Hand-blown crystal bottles with micrometer precision.",
      gradient: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(0,0,0,0.5))",
    },
    {
      title: "Gold Accents",
      description: "24K gold-plated finishing on every detail.",
      gradient: "linear-gradient(135deg, rgba(212,164,58,0.08), rgba(0,0,0,0.5))",
    },
    {
      title: "Liquid Art",
      description: "Each formula is a masterpiece of olfactory engineering.",
      gradient: "linear-gradient(135deg, rgba(192,192,192,0.08), rgba(0,0,0,0.5))",
    },
  ];

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

      {/* Large cinematic text */}
      <div ref={textRef} className="text-center mb-24 md:mb-36 px-6">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-8">
          Premium Quality
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-wide leading-[1.1]">
          <span className="block quality-word text-white/90">Every Detail</span>
          <span className="block quality-word gold-gradient font-medium">
            Tells A Story
          </span>
        </h2>
      </div>

      {/* Macro shot panels */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {macroShots.map((shot, index) => (
            <motion.div
              key={shot.title}
              className="macro-panel relative aspect-[3/4] overflow-hidden group"
              data-cursor-hover
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: shot.gradient }}
              />

              {/* Placeholder visual - bottle close-up simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glass refraction effect */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-32 h-32 rounded-full opacity-20"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, rgba(201,169,110,0.3), transparent, rgba(255,255,255,0.1), transparent)`,
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      background: "radial-gradient(circle, rgba(201,169,110,0.1), transparent)",
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                >
                  <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-2">
                    {shot.title}
                  </h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed">
                    {shot.description}
                  </p>
                </motion.div>
              </div>

              {/* Border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ border: "1px solid rgba(201,169,110,0.2)" }}
              />

              {/* Light sweep on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 30%, rgba(201,169,110,0.05) 50%, transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Storytelling text */}
      <div className="max-w-3xl mx-auto text-center mt-24 md:mt-32 px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-white/30 font-light leading-relaxed"
        >
          From the initial concept to the final product, every AutoRoma fragrance
          undergoes a meticulous creation process. We source the finest ingredients
          from around the world, blending them with the precision of a Swiss
          watchmaker and the artistry of a Parisian perfumer.
        </motion.p>
      </div>
    </section>
  );
}
