"use client";

import { useState, useCallback } from "react";
import IntroLoader from "@/components/ui/IntroLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ZoomJourney from "@/components/ui/ZoomJourney";
import CollectionSlide from "@/components/sections/CollectionSlide";
import Footer from "@/components/sections/Footer";

import HeroSlide from "@/components/sections/HeroSlide";
import WhySlide from "@/components/sections/WhySlide";
import StorySlide from "@/components/sections/StorySlide";
import CtaSlide from "@/components/sections/CtaSlide";

const slides = [
  { id: "hero", content: <HeroSlide />, bg: "dark" as const },
  { id: "why", content: <WhySlide />, bg: "dark" as const },
  { id: "story", content: <StorySlide />, bg: "dark" as const },
  { id: "cta", content: <CtaSlide />, bg: "light" as const },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <IntroLoader onComplete={handleLoaderComplete} />}
      <CustomCursor />

      {!isLoading && (
        <SmoothScroll>
          <main className="bg-ink">
            <Navbar />

            {/* Hero + Intro slides — zoom journey */}
            <ZoomJourney slides={slides} />

            {/* Collection — each product is one full screen */}
            <div id="collection">
              <CollectionSlide />
            </div>

            {/* Footer */}
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
