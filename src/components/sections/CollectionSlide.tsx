"use client";

import { PRODUCTS } from "@/lib/constants";

const allProducts = [...PRODUCTS.mistCollection, ...PRODUCTS.hangingCollection];

export default function CollectionSlide() {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center text-ink">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">
        Our Collection
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
        Fragrance in every detail
      </h2>

      <div className="mt-8 text-left">
        {allProducts.map((product) => (
          <div key={product.id} className="product-item group">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl text-ink transition-colors group-hover:text-gold-dark md:text-2xl">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-ink/50 font-light">
                  {product.notes.join(" · ")}
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-light text-ink">
                  ₹{product.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
