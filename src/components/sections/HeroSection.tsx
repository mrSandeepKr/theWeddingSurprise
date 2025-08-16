import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import CountdownTimer from '../CountdownTimer';
import { motion, useInView } from 'framer-motion';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-pink-100/30 to-orange-100/30"></div>
      <motion.div
        className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-rose-800 mb-4 font-playfair">
            Sandeep
          </h1>
          <div className="text-2xl md:text-3xl text-rose-600 font-light font-dancing">
            &
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-rose-800 mb-8 font-playfair">
            Payal
          </h1>
        </div>
        
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-rose-700 font-light">
            <span className="font-crimson">Together with their families</span>
          </p>
          <p className="text-lg md:text-xl text-rose-600 font-crimson">
            request the honor of your presence
          </p>
          <p className="text-2xl md:text-3xl text-rose-800 font-semibold font-playfair">
            at their wedding celebration
          </p>
          <p className="text-xl md:text-2xl text-rose-700 font-medium mt-4 font-crimson">
            <span className="font-playfair">February 5, 2026</span>
          </p>
        </div>

        <div className="py-8">
          <CountdownTimer />
        </div>

        <div className="pt-4">
          <Button 
            onClick={() => scrollToSection('story')}
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Our Journey
          </Button>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-rose-200 text-6xl opacity-30">❀</div>
      <div className="absolute bottom-20 right-10 text-rose-200 text-6xl opacity-30">❀</div>
    </section>
  );
}