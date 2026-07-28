"use client";

export default function CtaSlide() {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        Begin Your Journey
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
        Transform Every Drive
        <span className="mt-1 block text-white/70">with AutoRoma</span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-base text-white/50 font-light sm:text-lg">
        Discover the collection that turns every road into an experience.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          className="btn-primary"
          href="https://www.autoroma.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{ animation: "pulse-gold 3s ease-in-out infinite" }}
        >
          Shop Now
        </a>
        <a className="btn-secondary" href="https://www.autoroma.in">
          View Collection
        </a>
      </div>
    </div>
  );
}
