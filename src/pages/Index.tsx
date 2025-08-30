import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import { Heart } from "lucide-react";

// Lazy load sections with better loading boundaries
const OurStorySection = lazy(() =>
  import("@/components/sections/OurStorySection").then((module) => ({
    default: module.default,
  })),
);

const EventsSection = lazy(() =>
  import("@/components/sections/EventsSection").then((module) => ({
    default: module.default,
  })),
);

const GallerySection = lazy(() =>
  import("@/components/sections/GallerySection").then((module) => ({
    default: module.default,
  })),
);

const MemoryWallSection = lazy(() =>
  import("@/components/sections/MemoryWallSection/MemoryWallSection").then(
    (module) => ({
      default: module.default,
    }),
  ),
);

// Enhanced loading component
function SectionLoader({ height = "h-96" }: { height?: string }) {
  return (
    <div
      className={`${height} flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50`}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
        <p className="text-rose-600 font-medium">
          Loading beautiful memories...
        </p>
      </div>
    </div>
  );
}

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<SectionLoader height="h-64" />}>
        <OurStorySection />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-96" />}>
        <EventsSection />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-screen" />}>
        <GallerySection />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-96" />}>
        <MemoryWallSection />
      </Suspense>

      {/* Footer */}
      <footer className="py-12 text-center bg-rose-800 text-rose-100">
        <div className="space-y-4">
          <Heart className="h-8 w-8 mx-auto text-rose-300" />
          <p className="text-lg">Looking forward to celebrating with you!</p>
          <p className="text-sm opacity-75">
            Sandeep & Payal • February 5th, 2026
          </p>
          <div className="text-xs opacity-60 mt-4">
            <p>Made with ❤️ for our special day</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
