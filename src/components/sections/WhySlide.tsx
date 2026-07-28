"use client";

import { FiClock, FiStar, FiGift, FiTruck } from "react-icons/fi";

const features = [
  {
    icon: FiClock,
    title: "Long Lasting",
    description: "Up to 45 days of continuous luxury fragrance in your car.",
  },
  {
    icon: FiStar,
    title: "Premium Quality",
    description: "Crafted with the finest ingredients sourced from around the world.",
  },
  {
    icon: FiGift,
    title: "Stylish Packaging",
    description: "Each bottle is a statement piece, designed for the discerning eye.",
  },
  {
    icon: FiTruck,
    title: "Universal Fit",
    description: "Designed to complement every car interior, from sedans to SUVs.",
  },
];

export default function WhySlide() {
  return (
    <div className="mx-auto max-w-4xl px-4 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        Why AutoRoma
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl gold-gradient">
        A path to a better drive
      </h2>

      <ol className="mt-10 grid gap-6 text-left md:grid-cols-3">
        {features.map((feature, i) => (
          <li key={feature.title} className="process-step pt-4">
            <div className="flex items-center gap-3 mb-2">
              <feature.icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
              <p className="text-sm font-semibold text-gold">
                {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <h3 className="mt-2 font-display text-xl text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-white/50 font-light">
              {feature.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
