import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Heart } from "lucide-react";

const OurStorySection = lazy(() => import("@/components/sections/OurStorySection"));
const EventsSection = lazy(() => import("@/components/sections/EventsSection"));
const GallerySection = lazy(() => import("@/components/sections/GallerySection"));
const MemoryWallSection = lazy(() => import("@/components/sections/MemoryWallSection"));

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<div className="h-24" aria-busy="true" />}>
        <OurStorySection />
      </Suspense>
      <Suspense fallback={<div className="h-24" aria-busy="true" />}>
        <EventsSection />
      </Suspense>
      <Suspense fallback={<div className="h-24" aria-busy="true" />}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={<div className="h-24" aria-busy="true" />}>
        <MemoryWallSection />
      </Suspense>
      {/* Footer */}
      <footer className="py-12 text-center bg-rose-800 text-rose-100">
        <div className="space-y-4">
          <Heart className="h-8 w-8 mx-auto text-rose-300" />
          <p className="text-lg">Looking forward to celebrating with you!</p>
          <p className="text-sm opacity-75">
            Sandeep & Payal • December 21, 2024
          </p>
          <div className="text-xs opacity-60 mt-4">
            <p>Made with ❤️ for our special day</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
