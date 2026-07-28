"use client";

import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:px-24">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#" className="font-display text-2xl tracking-tight">
              <span className="text-gold">Auto</span>
              <span className="font-light text-white">Roma</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Luxury car fragrances crafted for every journey. Transform your
              drive with the finest scents from around the world.
            </p>
            <p className="mt-6 text-xs text-white/40">
              &copy; {new Date().getFullYear()} AutoRoma. All rights reserved.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h2 className="mb-4 font-display text-base font-semibold">
              Collections
            </h2>
            <ul className="space-y-2 text-sm text-white/55">
              <li><a className="hover:text-gold transition-colors" href="#collection">Imperial Mist</a></li>
              <li><a className="hover:text-gold transition-colors" href="#collection">Regal Blend</a></li>
              <li><a className="hover:text-gold transition-colors" href="#collection">Vogue Vallet</a></li>
              <li><a className="hover:text-gold transition-colors" href="#collection">New Ride Luxe</a></li>
              <li><a className="hover:text-gold transition-colors" href="#collection">Green Muse</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="mb-4 font-display text-base font-semibold">
              Company
            </h2>
            <ul className="space-y-2 text-sm text-white/55">
              <li><a className="hover:text-gold transition-colors" href="#about">About Us</a></li>
              <li><a className="hover:text-gold transition-colors" href="#">Our Story</a></li>
              <li><a className="hover:text-gold transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h2 className="mb-4 font-display text-base font-semibold">
              Follow
            </h2>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <FiInstagram className="w-4 h-4" strokeWidth={1.5} /> Instagram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <FiFacebook className="w-4 h-4" strokeWidth={1.5} /> Facebook
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors inline-flex items-center gap-2">
                  <FiTwitter className="w-4 h-4" strokeWidth={1.5} /> Twitter
                </a>
              </li>
            </ul>
            <a
              href="https://www.autoroma.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light transition-colors"
            >
              www.autoroma.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
