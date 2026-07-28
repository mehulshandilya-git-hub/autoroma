"use client";

import { useState, useCallback } from "react";
import IntroLoader from "@/components/ui/IntroLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ZoomJourney from "@/components/ui/ZoomJourney";
import Footer from "@/components/sections/Footer";

import HeroSlide from "@/components/sections/HeroSlide";
import CollectionSlide from "@/components/sections/CollectionSlide";
import WhySlide from "@/components/sections/WhySlide";
import StorySlide from "@/components/sections/StorySlide";
import CtaSlide from "@/components/sections/CtaSlide";

const slides = [
  { id: "hero", content: <HeroSlide />, bg: "dark" as const },
  { id: "collection", content: <CollectionSlide />, bg: "light" as const },
  { id: "why", content: <WhySlide />, bg: "dark" as const },
  { id: "story", content: <StorySlide />, bg: "light" as const },
  { id: "cta", content: <CtaSlide />, bg: "dark" as const },
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
          <main>
            <Navbar />
            <ZoomJourney slides={slides} />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
