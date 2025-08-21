import { Button } from "@/components/ui/button";
import CountdownTimer from "../CountdownTimer";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero.webp";
import logoVideo from "@/assets/logo_animated.mp4";

export default function HeroSection() {
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
        className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16"
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
        </div>

        <motion.div 
          className="mt-36 space-y-4 backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-xl md:text-2xl text-white/95 font-light">
            <span className="font-crimson">Together with their families</span>
          </p>
          <p className="text-lg md:text-xl text-white/90 font-crimson">
            request the honor of your presence
          </p>
          <p className="text-2xl md:text-3xl text-white font-semibold font-playfair">
            at their wedding celebration
          </p>
          <p className="text-xl md:text-2xl text-white/95 font-medium mt-4 font-crimson">
            <span className="font-playfair text-2xl">February 5, 2026</span>
          </p>
        </motion.div>

        <motion.div 
          className="py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <CountdownTimer />
        </motion.div>
      </motion.div>

      {/* Elegant decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 text-white/20 text-8xl"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        ❀
      </motion.div>
      <motion.div 
        className="absolute bottom-1/4 right-10 text-white/20 text-8xl"
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, delay: 2.2 }}
      >
        ❀
      </motion.div>
    </section>
  );
}
