import { Heart } from "lucide-react";
import { useEffect, useRef } from "react";
import footerVideo from "@/assets/footer_video.mp4";

export default function FooterSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays and loops
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <footer className="relative py-24 text-center text-rose-100 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={footerVideo} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 space-y-4">
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
  );
}

