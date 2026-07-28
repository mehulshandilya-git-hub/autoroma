"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Slide {
  id: string;
  content: ReactNode;
  bg?: "dark" | "light";
}

export default function ZoomJourney({ slides }: { slides: Slide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    const ctx = gsap.context(() => {
      const totalSlides = slides.length;

      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;

        const isLast = i === totalSlides - 1;
        const enterFrom = i === 0 ? 1 : 0.015;
        const enterTo = 1;

        // Each slide: zooms from small to full size, then zooms out as next slide appears
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: () => {
              const scrollPerSlide = container.scrollHeight / (totalSlides - 1);
              const startOffset = i * scrollPerSlide;
              return `${startOffset}px top`;
            },
            end: () => {
              const scrollPerSlide = container.scrollHeight / (totalSlides - 1);
              const endOffset = (i + 1) * scrollPerSlide;
              return `${endOffset}px top`;
            },
            scrub: 1.2,
            pin: false,
          },
        });

        if (i === 0) {
          // First slide starts visible, then zooms out
          tl.to(slide, {
            scale: 0.015,
            opacity: 0,
            ease: "power2.inOut",
          });
        } else {
          // Other slides zoom in from tiny, stay, then zoom out
          tl.fromTo(
            slide,
            { scale: enterFrom, opacity: 0 },
            { scale: enterTo, opacity: 1, ease: "power2.out", duration: 0.5 }
          );

          if (!isLast) {
            tl.to(slide, {
              scale: 0.015,
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.5,
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slides.length]);

  return (
    <div
      ref={containerRef}
      className="relative bg-ink"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div ref={stageRef} className="zoom-journey__stage bg-ink">
        {/* Parallax background layers */}
        <ParallaxBackground />

        {/* Slides */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className={`zoom-journey__slide ${
              slide.bg === "light"
                ? "bg-stone text-ink rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.45)]"
                : ""
            }`}
            style={{
              transform: "translate(-50%, -50%) scale(1)",
              opacity: i === 0 ? 1 : 0,
            }}
          >
            {slide.content}
          </div>
        ))}
      </div>
    </div>
  );
}

function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const layers = ref.current.querySelectorAll(".parallax-layer");

    const ctx = gsap.context(() => {
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          y: (i + 1) * 30,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Liquid GIF layer - moves slowest */}
      <div
        className="parallax-layer absolute -inset-[8%] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url(/images/hero-bg.gif)",
          opacity: 0.4,
          transform: "translate3d(0, 0, 0)",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink/90" />
    </div>
  );
}
