import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import OurStorySection from "@/components/sections/OurStorySection";
import EventsSection from "@/components/sections/EventsSection";
import GallerySection from "@/components/sections/GallerySection";
import RSVPSection from "@/components/sections/RSVPSection";
import GuestInfoSection from "@/components/sections/GuestInfoSection";
import MemoryWallSection from "@/components/sections/MemoryWallSection";
import { Heart } from "lucide-react";

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <Navbar />
      <HeroSection />
      <OurStorySection />
      <EventsSection />
      <GallerySection />
      <RSVPSection />
      <GuestInfoSection />
      <MemoryWallSection />

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
