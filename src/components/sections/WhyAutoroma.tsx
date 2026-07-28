"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiStar, FiGift, FiTruck } from "react-icons/fi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: FiClock,
    title: "Long Lasting Fragrance",
    description:
      "Up to 45 days of continuous, captivating luxury fragrance that transforms every drive into an experience.",
    stat: "45+",
    statLabel: "Days",
  },
  {
    icon: FiStar,
    title: "Premium Quality",
    description:
      "Crafted with the finest ingredients sourced from Grasse, Oud wood forests, and amber mines worldwide.",
    stat: "100%",
    statLabel: "Premium",
  },
  {
    icon: FiGift,
    title: "Stylish Packaging",
    description:
      "Every bottle is a statement piece, designed with architectural precision and luxury finishing.",
    stat: "#1",
    statLabel: "Design",
  },
  {
    icon: FiTruck,
    title: "Universal Fit",
    description:
      "Designed to complement every car interior, from compact sedans to luxury SUVs and sports cars.",
    stat: "100%",
    statLabel: "Universal",
  },
];

function FeatureTimelineItem({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 md:py-24"
    >
      {/* Timeline connector */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-[1px] h-full origin-top"
          style={{
            background: "linear-gradient(to bottom, transparent, #c9a96e, transparent)",
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: "#c9a96e",
            boxShadow: "0 0 20px rgba(201,169,110,0.5)",
          }}
        />
      </div>

      {/* Content - alternating sides */}
      <div
        className={`${
          index % 2 === 0 ? "md:text-right md:pr-24" : "md:col-start-2 md:pl-24"
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? -60 : 60,
            filter: "blur(10px)",
          }}
          animate={
            isInView
              ? { opacity: 1, x: 0, filter: "blur(0px)" }
              : { opacity: 0, x: index % 2 === 0 ? -60 : 60, filter: "blur(10px)" }
          }
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className={`inline-flex items-center justify-center w-14 h-14 mb-6 ${
              index % 2 === 0 ? "md:ml-auto" : ""
            }`}
            style={{
              background: "rgba(201,169,110,0.05)",
              border: "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <feature.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
          </div>

          <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-4 text-white">
            {feature.title}
          </h3>
          <p className="text-white/40 font-light leading-relaxed max-w-md mx-auto md:mx-0">
            {feature.description}
          </p>
        </motion.div>
      </div>

      {/* Stat - opposite side */}
      <div
        className={`${
          index % 2 === 0
            ? "md:col-start-2 md:pl-24"
            : "md:row-start-1 md:text-right md:pr-24 md:col-start-1"
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: index % 2 === 0 ? 60 : -60,
            filter: "blur(10px)",
          }}
          animate={
            isInView
              ? { opacity: 1, x: 0, filter: "blur(0px)" }
              : { opacity: 0, x: index % 2 === 0 ? 60 : -60, filter: "blur(10px)" }
          }
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${index % 2 === 0 ? "" : "md:ml-auto"}`}
        >
          <div
            className="inline-block px-12 py-10 text-center"
            style={{
              background: "rgba(201,169,110,0.03)",
              border: "1px solid rgba(201,169,110,0.08)",
            }}
          >
            <span className="block text-5xl md:text-6xl font-light gold-gradient">
              {feature.stat}
            </span>
            <span className="block text-xs tracking-[0.4em] uppercase text-white/30 mt-2">
              {feature.statLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function WhyAutoroma() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-title",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
    >
      {/* Section header */}
      <div className="text-center mb-20 md:mb-32">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6"
        >
          Why AutoRoma
        </motion.span>
        <h2 className="why-title text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white opacity-0">
          Crafted For{" "}
          <span className="gold-gradient font-medium">Excellence</span>
        </h2>
      </div>

      {/* Timeline features */}
      <div className="max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureTimelineItem key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
