"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CharProps {
  char: string;
  index: number;
  isAccent?: boolean;
  sx: string;
  sy: string;
  rot: string;
}

function HeroChar({ char, index, isAccent, sx, sy, rot }: CharProps) {
  return (
    <span
      className={`hero-char ${isAccent ? "is-accent" : ""}`}
      style={{
        ["--sx" as string]: sx,
        ["--sy" as string]: sy,
        ["--rot" as string]: rot,
        ["--i" as string]: index,
      }}
    >
      {char}
    </span>
  );
}

interface WordDef {
  text: string;
  accentStart?: number;
  accentEnd?: number;
}

export default function HeroSlide() {
  const ref = useRef<HTMLDivElement>(null);

  const titleLine1: WordDef[] = [
    { text: "AutoRoma", accentStart: 0, accentEnd: 4 },
  ];
  const titleLine2: WordDef[] = [
    { text: "Premium" },
    { text: "Car" },
    { text: "Fragrances" },
  ];

  // Generate random scatter positions for each character
  const scatterPositions = useRef(
    Array.from({ length: 50 }, () => ({
      sx: `${(Math.random() - 0.5) * 120}vw`,
      sy: `${(Math.random() - 0.5) * 100}vh`,
      rot: `${(Math.random() - 0.5) * 80}deg`,
    }))
  );

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".hero-char");
    const block = ref.current.querySelector(".hero-block");

    const ctx = gsap.context(() => {
      // Characters start scattered, then assemble
      chars.forEach((char, i) => {
        const pos = scatterPositions.current[i] || { sx: "0vw", sy: "0vh", rot: "0deg" };
        gsap.set(char, {
          x: pos.sx,
          y: pos.sy,
          rotation: pos.rot,
          opacity: 0,
          scale: 2,
        });
      });

      if (block) {
        gsap.set(block, { opacity: 0, y: 30 });
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  // Expose animation method
  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".hero-char");
    const block = ref.current.querySelector(".hero-block");

    // Store animation on element for parent to call
    (ref.current as any).__animate = () => {
      const tl = gsap.timeline();

      chars.forEach((char, i) => {
        tl.to(
          char,
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          i * 0.02
        );
      });

      if (block) {
        tl.to(block, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      }

      return tl;
    };
  }, []);

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-4 text-center text-white">
      <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        {titleLine1.map((word, wi) =>
          word.text.split("").map((c, ci) => {
            const globalIndex =
              titleLine1.slice(0, wi).reduce((a, w) => a + w.text.length, 0) + ci;
            const pos = scatterPositions.current[globalIndex];
            return (
              <HeroChar
                key={`${wi}-${ci}`}
                char={c}
                index={globalIndex}
                isAccent={
                  word.accentStart !== undefined &&
                  ci >= word.accentStart &&
                  ci < (word.accentEnd ?? word.text.length)
                }
                sx={pos?.sx || "0vw"}
                sy={pos?.sy || "0vh"}
                rot={pos?.rot || "0deg"}
              />
            );
          })
        )}
      </p>
      <h1 className="mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
        {titleLine2.map((word, wi) => {
          const offset = titleLine1.reduce((a, w) => a + w.text.length, 0);
          return (
            <span key={wi} className="mr-3 last:mr-0">
              {word.text.split("").map((c, ci) => {
                const globalIndex =
                  offset +
                  titleLine2.slice(0, wi).reduce((a, w) => a + w.text.length, 0) +
                  ci;
                const pos = scatterPositions.current[globalIndex];
                return (
                  <HeroChar
                    key={`${wi}-${ci}`}
                    char={c}
                    index={globalIndex}
                    sx={pos?.sx || "0vw"}
                    sy={pos?.sy || "0vh"}
                    rot={pos?.rot || "0deg"}
                  />
                );
              })}
            </span>
          );
        })}
      </h1>
      <p
        className="hero-block mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg font-light"
      >
        Luxury fragrances crafted for every journey. Transform your drive with the finest scents.
      </p>
      <div className="hero-block mt-8 flex flex-wrap items-center justify-center gap-3">
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
