"use client";

export default function StorySlide() {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center text-ink">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-dark">
        Our Story
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
        Crafted for those who drive with purpose
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-ink/60 font-light">
        AutoRoma was born from a simple belief: your car deserves the same luxury
        as your home. Every fragrance is an invitation to elevate your daily drive.
      </p>
      <a className="btn-secondary mt-8 inline-flex" href="#about">
        Learn More
      </a>
    </div>
  );
}
