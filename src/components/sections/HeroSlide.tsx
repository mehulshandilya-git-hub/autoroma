"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const LETTERS = "AUTOROMA".split("");

export default function HeroSlide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const title = ref.current.querySelector(".hero-title");
    const subtitle = ref.current.querySelector(".hero-subtitle");
    const cta = ref.current.querySelector(".hero-cta");

    const ctx = gsap.context(() => {
      gsap.set([subtitle, cta], { opacity: 0, y: 20 });
    }, ref);

    const tl = gsap.timeline({ delay: 0.3 });

    // Each letter animates in with stagger
    ref.current.querySelectorAll(".hero-letter").forEach((letter, i) => {
      tl.fromTo(
        letter,
        {
          opacity: 0,
          y: 80,
          rotationX: -90,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
        },
        i * 0.07
      );
    });

    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3");
    tl.to(cta, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");

    return () => {
      ctx.revert();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center px-4">
      {/* AUTOROMA — big bold title */}
      <div className="hero-title flex items-center justify-center" style={{ perspective: "600px" }}>
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="hero-letter inline-block opacity-0"
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              lineHeight: 1,
              color: "#c9a96e",
              textShadow: "0 0 60px rgba(201,169,110,0.3), 0 4px 30px rgba(0,0,0,0.5)",
              transformOrigin: "bottom center",
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Divider line */}
      <div
        className="hero-subtitle mt-6 opacity-0"
        style={{
          width: "120px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #c9a96e, transparent)",
        }}
      />

      {/* Subtitle */}
      <p className="hero-subtitle mt-6 max-w-lg text-base text-white/50 font-light tracking-[0.15em] uppercase opacity-0">
        Premium Car Fragrances
      </p>

      {/* CTA */}
      <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0">
        <a className="btn-primary" href="#collection">
          Explore Collection
        </a>
        <a className="btn-secondary" href="#about">
          Our Story
        </a>
      </div>
    </div>
  );
}
