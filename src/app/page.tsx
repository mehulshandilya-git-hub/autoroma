"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import IntroLoader from "@/components/ui/IntroLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import SectionDivider from "@/components/ui/SectionDivider";

import HeroSection from "@/components/sections/HeroSection";
import WhyAutoroma from "@/components/sections/WhyAutoroma";
import MistCollection from "@/components/sections/MistCollection";
import HangingCollection from "@/components/sections/HangingCollection";
import CarExperience from "@/components/sections/CarExperience";
import ScentNotes from "@/components/sections/ScentNotes";
import PremiumQuality from "@/components/sections/PremiumQuality";
import InteractiveShowcase from "@/components/sections/InteractiveShowcase";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import BackgroundCanvas from "@/components/three/BackgroundCanvas";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Intro Loader */}
      {isLoading && <IntroLoader onComplete={handleLoaderComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background Canvas */}
      <BackgroundCanvas />

      {/* Main Content */}
      {!isLoading && (
        <SmoothScroll>
          <main className="relative z-10">
            <Navbar />

            <HeroSection />

            <SectionDivider label="Why AutoRoma" />
            <WhyAutoroma />

            <SectionDivider label="Mist Collection" />
            <MistCollection />

            <SectionDivider label="Hanging Collection" />
            <HangingCollection />

            <SectionDivider label="The Experience" />
            <CarExperience />

            <SectionDivider label="Scent Notes" />
            <ScentNotes />

            <SectionDivider label="Premium Quality" />
            <PremiumQuality />

            <SectionDivider label="Interactive" />
            <InteractiveShowcase />

            <SectionDivider />
            <CTASection />

            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
