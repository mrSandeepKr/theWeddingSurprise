import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";

// Lazy load sections with better loading boundaries
const MeetTheCoupleSection = lazy(() =>
  import("@/components/sections/MeetTheCoupleSection").then((module) => ({
    default: module.default,
  })),
);

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

const FooterSection = lazy(() =>
  import("@/components/sections/FooterSection").then((module) => ({
    default: module.default,
  })),
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 overflow-x-hidden">
      <Navbar />
      <HeroSection />

      <Suspense fallback={<SectionLoader height="h-96" />}>
        <MeetTheCoupleSection />
      </Suspense>

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

      <Suspense fallback={<SectionLoader height="h-96" />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}
