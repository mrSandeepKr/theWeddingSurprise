import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import CountdownTimer from '../CountdownTimer';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 via-pink-100/30 to-orange-100/30"></div>
      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-8 w-8 text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-rose-800 mb-4 font-serif">
            Sandeep
          </h1>
          <div className="text-2xl md:text-3xl text-rose-600 font-light italic">
            &
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-rose-800 mb-8 font-serif">
            Payal
          </h1>
        </div>
        
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-rose-700 font-light">
            Together with their families
          </p>
          <p className="text-lg md:text-xl text-rose-600">
            request the honor of your presence
          </p>
          <p className="text-2xl md:text-3xl text-rose-800 font-semibold">
            at their wedding celebration
          </p>
          <p className="text-xl md:text-2xl text-rose-700 font-medium mt-4">
            December 21, 2024
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
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-rose-200 text-6xl opacity-30">❀</div>
      <div className="absolute bottom-20 right-10 text-rose-200 text-6xl opacity-30">❀</div>
    </section>
  );
}