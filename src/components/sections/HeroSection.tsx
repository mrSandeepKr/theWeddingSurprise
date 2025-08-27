import { Button } from "@/components/ui/button";
import CountdownTimer from "../CountdownTimer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero.webp";

// Preload critical images
const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

export default function HeroSection() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  useEffect(() => {
    // Preload critical assets
    const loadAssets = async () => {
      try {
        await preloadImage(heroImage);
        setHeroImageLoaded(true);
      } catch (error) {
        console.warn("Failed to preload hero assets:", error);
        setHeroImageLoaded(true); // Fallback
      }
    };

    loadAssets();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-32"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        <div className="space-y-6">
          <motion.h1
            className="text-7xl md:text-9xl font-bold text-white mb-4 font-playfair tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Sandeep
          </motion.h1>

          <motion.div
            className="text-3xl md:text-4xl text-white/90 font-light font-dancing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            &
          </motion.div>

          <motion.h1
            className="text-7xl md:text-9xl font-bold text-white mb-8 font-playfair tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Payal
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 font-crimson italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            "Two hearts, one love, forever together"
          </motion.p>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <CountdownTimer />
          </motion.div>

          <motion.div
            className="space-y-4 md:space-y-0 space-x-4 md:space-x-6 md:flex md:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white px-3 md:px-8 py-2 md:py-4 text-base md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Our Story
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white hover:bg-white text-rose-900 hover:text-rose-600 px-3 md:px-8 py-2 md:py-4 text-base md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                document
                  .getElementById("events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Events
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
