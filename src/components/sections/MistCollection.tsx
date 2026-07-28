"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const ProductScene = dynamic(() => import("@/components/three/ProductScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border border-gold/20 rounded-full animate-pulse" />
    </div>
  ),
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { PRODUCTS } from "@/lib/constants";

const mistProducts = PRODUCTS.mistCollection;

function MistProductCard({
  product,
  index,
}: {
  product: (typeof mistProducts)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, filter: "blur(15px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 80, filter: "blur(15px)" }
      }
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${product.accentColor}10, transparent 70%)`,
        }}
      />

      <div
        className="relative p-6 md:p-8 transition-all duration-700 group-hover:translate-y-[-4px]"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${isHovered ? product.accentColor + "30" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        {/* 3D Product */}
        <div className="aspect-square w-full mb-6 relative">
          <ProductScene
            color={product.color}
            accentColor={product.accentColor}
            name={product.name}
            isHovered={isHovered}
          />

          {/* Background color overlay */}
          <div
            className="absolute inset-0 -z-10 opacity-20 transition-opacity duration-700 group-hover:opacity-40"
            style={{
              background: `radial-gradient(circle at center, ${product.color}, transparent 70%)`,
            }}
          />
        </div>

        {/* Product info */}
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-light tracking-wide text-white group-hover:text-gold-light transition-colors duration-500">
            {product.name}
          </h3>
          <p className="text-sm text-white/30 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Scent notes */}
          <div className="flex gap-3 pt-2">
            {product.notes.map((note) => (
              <span
                key={note}
                className="text-[10px] tracking-[0.2em] uppercase px-3 py-1"
                style={{
                  color: product.accentColor,
                  border: `1px solid ${product.accentColor}25`,
                  background: `${product.accentColor}08`,
                }}
              >
                {note}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-2xl font-light text-white">
              ₹{product.price}
            </span>
            <button
              className="text-xs tracking-[0.3em] uppercase px-6 py-3 transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
              style={{
                border: "1px solid rgba(201,169,110,0.25)",
                color: "#c9a96e",
              }}
              data-cursor-magnetic
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MistCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mist-title",
        { opacity: 0, y: 60, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mist-title",
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
      {/* Decorative light sweep */}
      <div
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)",
        }}
      />

      <div className="text-center mb-20 md:mb-28">
        <span className="inline-block text-[10px] tracking-[0.6em] uppercase text-gold/60 mb-6">
          Mist Collection
        </span>
        <h2 className="mist-title text-4xl md:text-5xl lg:text-7xl font-light tracking-wide text-white opacity-0">
          bottled{" "}
          <span className="gold-gradient font-medium">elegance</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
        {mistProducts.map((product, index) => (
          <MistProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
