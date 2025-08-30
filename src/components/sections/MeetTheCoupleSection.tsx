import { Heart, PencilLine } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import brideImage from "@/assets/bride.jpeg";
import groomImage from "@/assets/groom.jpeg";

// Types
interface PersonDetail {
  icon: React.ReactNode;
  text: string;
}

interface PersonInfo {
  name: string;
  title: string;
  description: string;
  details: PersonDetail[];
  image: string;
}

// Section Header Component
function SectionHeader({ isInView }: { isInView: boolean }) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 mb-4"
      >
        <Heart className="h-6 w-6 text-rose-600" />
        <span className="text-rose-600 font-medium tracking-wider uppercase text-sm">
          Our Love Story
        </span>
        <Heart className="h-6 w-6 text-rose-600" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
      >
        Meet the Bride and Groom
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        Two hearts, one beautiful journey. Get to know the happy couple who are about to begin their forever together.
      </motion.p>
    </div>
  );
}

// Person Detail Item Component
function PersonDetailItem({ detail }: { detail: PersonDetail }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/90">
      <span className="text-rose-300">{detail.icon}</span>
      {detail.text}
    </div>
  );
}

// Person Image Component
function PersonImage({ 
  person, 
  index, 
  isInView 
}: { 
  person: PersonInfo; 
  index: number; 
  isInView: boolean; 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
      className="relative h-[600px] md:h-[700px] overflow-hidden rounded-2xl shadow-2xl group"
    >
      {/* Background Image */}
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
          className="mb-6"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {person.name}
          </h3>
          <p className="text-rose-300 font-medium text-xl md:text-2xl">
            {person.title}
          </p>
        </motion.div>
        
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
          className="mb-6"
        >
          <p className="text-white/90 leading-relaxed text-base md:text-lg max-w-md">
            {person.description}
          </p>
        </motion.div>
        
        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
          className="space-y-2"
        >
          {person.details.map((detail, detailIndex) => (
            <PersonDetailItem key={detailIndex} detail={detail} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Component
export default function MeetTheCoupleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const coupleInfo: PersonInfo[] = [
    {
      name: "Sandeep",
      title: "The Groom",
      description: "Hailing from Ranchi, a boring engineer who probably has an app idea for everything in life – including this wedding. While Payal is busy quoting Bollywood dialogues, he's busy building logical roadmaps for their future (and sneakily googling which gadget to buy next). Simple, grounded, and practical, he's the calm to her chaos – the man who somehow puts up with Bollywood playlists on loop without complaint (okay, maybe a little complaint).",
      details: [
        { icon: <PencilLine className="h-4 w-4" />, text: "From Looteri dulhan (Mah website mah rules!)" },
      ],
      image: groomImage,
    },
    {
      name: "Payal",
      title: "The Bride",
      description: "Straight out of Jamshedpur, Payal is our in-house Bollywood heroine (with a very poor taste in music I must say). She lives for fashion, has a killer sense of humor, and can turn even the most boring moment into a full on comedy show. But behind all the sass (too much of sass) and sparkle, she's the kind of  empathetic soul who'll share her fries with you (well, maybe). Basically, she's the drama, the glamour, and the laughter, all rolled into one. :)",
      details: [
        { icon: <PencilLine className="h-4 w-4" />, text: "From the creator (of this website)" },
      ],
      image: brideImage,
    },
  ];

  return (
    <section
      id="couple"
      className="py-20 px-6 bg-gradient-to-br from-pink-50 to-rose-50"
    >
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader isInView={isInView} />
        
        {/* Desktop: Side by side, Mobile: Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {coupleInfo.map((person, index) => (
            <PersonImage 
              key={person.name}
              person={person} 
              index={index} 
              isInView={isInView} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}