"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border border-gold/30 rounded-full animate-pulse" />
    </div>
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power3.out" },
          "-=0.6"
        );

      // Camera zoom on scroll
      if (sectionRef.current && canvasRef.current) {
        gsap.to(canvasRef.current, {
          scale: 1.3,
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Headlight beam effect */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[600px] pointer-events-none z-[1] opacity-30"
        style={{
          background:
            "linear-gradient(90deg, rgba(201,169,110,0.15) 0%, transparent 40%)",
        }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.05] mb-6 opacity-0"
        >
          <span className="block text-white">Luxury That</span>
          <span className="block gold-gradient font-medium">Drives With You</span>
        </motion.h1>

        <motion.p
          ref={subtitleRef}
          className="text-base md:text-lg text-white/50 font-light tracking-wide max-w-xl mb-10 opacity-0"
        >
          Premium Car Fragrances Crafted For Every Journey
        </motion.p>

        <motion.div ref={ctaRef} className="opacity-0" data-cursor-hover>
          <button
            className="group relative px-10 py-4 text-sm tracking-[0.3em] uppercase font-medium text-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(201,169,110,0.3)]"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
              borderRadius: "2px",
            }}
            data-cursor-magnetic
          >
            <span className="relative z-10">Explore Collection</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, #e8d5a3, #c9a96e)",
              }}
            />
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8"
          style={{
            background: "linear-gradient(to bottom, #c9a96e, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
