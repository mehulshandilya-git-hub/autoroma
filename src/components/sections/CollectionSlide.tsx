"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PRODUCTS } from "@/lib/constants";

const allProducts = [...PRODUCTS.mistCollection, ...PRODUCTS.hangingCollection];

export default function CollectionSlide() {
  const [current, setCurrent] = useState(0);
  const product = allProducts[current];

  const next = () => setCurrent((p) => (p + 1) % allProducts.length);
  const prev = () => setCurrent((p) => (p - 1 + allProducts.length) % allProducts.length);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Section header */}
      <div className="text-center mb-8">
        <span className="text-[10px] sm:text-xs font-inter font-bold uppercase tracking-[0.2em] text-gold-dark block">
          Our Collection
        </span>
        <h2 className="mt-2 font-cormorant text-2xl sm:text-4xl font-light text-ink">
          India&apos;s Favorite Luxury Car Fragrances
        </h2>
      </div>

      {/* Product showcase — one at a time */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
        >
          {/* LEFT — Product Image */}
          <div className="lg:col-span-5 order-1">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden border border-black/10"
              style={{ background: product.color + "15" }}
            >
              {/* Placeholder product visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Bottle shape */}
                  <div
                    className="w-24 sm:w-32 h-40 sm:h-52 relative"
                    style={{
                      background: `linear-gradient(180deg, ${product.accentColor}50, ${product.color})`,
                      borderRadius: "4px 4px 2px 2px",
                      boxShadow: `0 20px 60px ${product.color}60`,
                    }}
                  >
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-5 rounded-t-sm"
                      style={{ background: product.accentColor }}
                    />
                    <div
                      className="absolute top-1/2 left-3 right-3 h-[1px]"
                      style={{ background: `${product.accentColor}60` }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <span
                        className="text-[7px] tracking-[0.3em] uppercase font-bold"
                        style={{ color: product.accentColor }}
                      >
                        AutoRoma
                      </span>
                    </div>
                  </div>

                  {/* Glow */}
                  <div
                    className="absolute -inset-10 rounded-full -z-10 opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${product.accentColor}30, transparent 70%)`,
                    }}
                  />
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="lg:col-span-7 order-2 space-y-4 sm:space-y-5">
            {/* Scent family label */}
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40 font-inter block">
              {product.notes.join(" · ")}
            </span>

            {/* Product name */}
            <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-light text-ink leading-tight">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-ink/50 font-inter font-light leading-relaxed max-w-md">
              {product.description}
            </p>

            {/* Scent notes */}
            <div className="flex flex-wrap gap-2 pt-1">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold px-3 py-1.5 border border-black/10 text-ink/50 font-inter"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center gap-6 pt-4 border-t border-black/10">
              <span className="text-2xl sm:text-3xl font-inter font-semibold text-ink">
                ₹{product.price}
              </span>
              <button
                className="px-6 py-3 bg-ink text-white text-[11px] uppercase tracking-[0.2em] font-bold font-inter
                           hover:bg-ink-light transition-colors duration-300"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prev}
          className="p-3 border border-black/15 text-ink/50 hover:text-ink hover:border-ink/40 transition-all duration-300"
        >
          <FiChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {allProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-gold"
                  : "w-1.5 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-3 border border-black/15 text-ink/50 hover:text-ink hover:border-ink/40 transition-all duration-300"
        >
          <FiChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Counter */}
      <p className="text-center mt-3 text-[10px] tracking-[0.2em] uppercase text-ink/30 font-inter">
        {String(current + 1).padStart(2, "0")} / {String(allProducts.length).padStart(2, "0")}
      </p>
    </div>
  );
}
