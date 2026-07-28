"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PRODUCTS } from "@/lib/constants";

const hangingProducts = PRODUCTS.hangingCollection;

function HangingProductCard({
  product,
  index,
}: {
  product: (typeof hangingProducts)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -60, filter: "blur(15px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: -60, filter: "blur(15px)" }
      }
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      {/* Hanging string */}
      <div className="relative w-full flex flex-col items-center">
        <motion.div
          animate={{
            rotate: isHovered ? [0, -3, 3, -2, 2, 0] : [0, -1.5, 1.5, -1, 1, 0],
          }}
          transition={{
            duration: isHovered ? 1.5 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center origin-top"
        >
          {/* String */}
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-white/40" />

          {/* Hook ring */}
          <div
            className="w-4 h-4 rounded-full mb-1"
            style={{
              border: `1px solid ${product.accentColor}60`,
              boxShadow: `0 0 10px ${product.accentColor}20`,
            }}
          />

          {/* Product body */}
          <div
            className="relative p-6 transition-all duration-500 w-full max-w-[280px]"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${isHovered ? product.accentColor + "30" : "rgba(255,255,255,0.05)"}`,
            }}
          >
            {/* Product visual */}
            <div className="relative w-full aspect-square mb-4 flex items-center justify-center overflow-hidden">
              {/* Placeholder bottle shape */}
              <div
                className="relative w-20 h-32 transition-all duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(180deg, ${product.accentColor}40, ${product.color})`,
                  borderRadius: "4px 4px 2px 2px",
                  boxShadow: isHovered
                    ? `0 20px 60px ${product.accentColor}25, 0 0 30px ${product.accentColor}15`
                    : `0 10px 30px ${product.color}40`,
                }}
              >
                {/* Cap */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-4 rounded-t-sm"
                  style={{ background: product.accentColor }}
                />
                {/* Label line */}
                <div
                  className="absolute top-1/2 left-2 right-2 h-[1px]"
                  style={{ background: `${product.accentColor}60` }}
                />
                {/* Brand text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span
                    className="text-[6px] tracking-[0.3em] uppercase font-medium"
                    style={{ color: product.accentColor }}
                  >
                    AutoRoma
                  </span>
                </div>
              </div>

              {/* Fragrance particles on hover */}
              {isHovered && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0.5],
                        y: [0, -30 - Math.random() * 40],
                        x: [(Math.random() - 0.5) * 40],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 1.5,
                      }}
                      className="absolute rounded-full"
                      style={{
                        width: 3 + Math.random() * 4,
                        height: 3 + Math.random() * 4,
                        background: `radial-gradient(circle, ${product.accentColor}, transparent)`,
                        bottom: "60%",
                        left: `${30 + Math.random() * 40}%`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* Ambient color glow */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${product.color}, transparent 70%)`,
                }}
              />
            </div>

            {/* Product info */}
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-light tracking-wide text-white group-hover:text-gold-light transition-colors duration-500">
                {product.name}
              </h3>
              <p className="text-xs text-white/30 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Notes */}
              <div className="flex gap-2 justify-center flex-wrap pt-1">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-[8px] tracking-[0.15em] uppercase px-2 py-0.5"
                    style={{
                      color: `${product.accentColor}cc`,
                      border: `1px solid ${product.accentColor}20`,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="pt-3 flex items-center justify-between">
                <span className="text-xl font-light text-white">
                  ₹{product.price}
                </span>
                <button
                  className="text-[10px] tracking-[0.25em] uppercase px-4 py-2 transition-all duration-500 hover:shadow-[0_0_15px_rgba(201,169,110,0.15)]"
                  style={{
                    border: "1px solid rgba(201,169,110,0.2)",
                    color: "#c9a96e",
                  }}
                  data-cursor-magnetic
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function HangingCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hanging-title",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hanging-title",
            start: "top 75%",
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
      {/* Decorative line */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)",
        }}
      />

      <div className="text-center mb-20 md:mb-28">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6">
          Hanging Collection
        </span>
        <h2 className="hanging-title text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-white opacity-0">
          rearview{" "}
          <span className="gold-gradient font-medium">luxury</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 max-w-7xl mx-auto">
        {hangingProducts.map((product, index) => (
          <HangingProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
