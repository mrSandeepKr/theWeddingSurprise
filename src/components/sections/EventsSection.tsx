import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Palette,
  Music,
  Users,
  Shirt,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import brideIcon from "@/assets/bride_icon.png";
import groomIcon from "@/assets/groom_icon.png";
import flowerTop from "@/assets/flower_top.png";
import flowerLily from "@/assets/flower_lily.png";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Event {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  icon: JSX.Element;
  color: string;
  image?: string;
  dressCode: string;
  side: ("dulha" | "dulhan")[]; // Changed to array
}

type EventSide = "dulha" | "dulhan"; // Removed 'both'

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const EVENTS_DATA: Event[] = [
  {
    title: "Mehendi Ceremony",
    date: "February 3, 2026",
    time: "2:00 PM - 6:00 PM",
    venue: "Bride's Family Home",
    address: "456 Mehendi Lane, City, State",
    description:
      "A beautiful afternoon of intricate henna designs, laughter, and bonding with the bride's side of the family.",
    icon: <Palette className="h-4 w-4 md:h-8 md:w-8 text-wedding-mehendi-600" />,
    color: "mehendi",
    image: "/src/assets/couple_5.webp",
    dressCode: "Bright traditional colors, comfortable for sitting",
    side: ["dulhan"],
  },
  {
    title: "Haldi Ceremony",
    date: "February 4, 2026",
    time: "10:00 AM - 12:00 AM",
    venue: "Family Home - Garden Area",
    address: "123 Family Street, City, State",
    description:
      "Join us for the traditional Haldi ceremony filled with turmeric, laughter, and blessings. This sacred ritual marks the beginning of our wedding celebrations.",
    icon: <Palette className="h-4 w-4 md:h-8 md:w-8 text-wedding-haldi-600" />,
    color: "haldi",
    image: "/src/assets/couple_1.webp",
    dressCode: "Bright colors, comfortable traditional wear",
    side: ["dulha", "dulhan"], // Changed from "both" to array
  },
  {
    title: "Sangeet Night",
    date: "December 20, 2024",
    time: "7:00 PM - 11:00 PM",
    venue: "Royal Palace Hotel",
    address: "789 Dance Floor Road, City, State",
    description:
      "Dance the night away as both families come together for music and performances. An evening filled with joy, laughter, and unforgettable memories.",
    icon: <Music className="h-4 w-4 md:h-8 md:w-8 text-wedding-magenta-600" />,
    color: "magenta",
    image: "/src/assets/couple_2.webp",
    dressCode: "Festive attire, ready to dance!",
    side: ["dulha", "dulhan"],
  },
  {
    title: "Wedding Ceremony",
    date: "December 21, 2024",
    time: "4:00 PM - 7:00 PM",
    venue: "Grand Celebration Hall",
    address: "123 Wedding Avenue, City, State",
    description:
      "The sacred ceremony where we exchange vows and begin our journey as one. Witness the union of two hearts in the presence of family and friends.",
    icon: <Calendar className="h-4 w-4 md:h-8 md:w-8 text-wedding-sindoor-600" />,
    color: "sindoor",
    image: "/src/assets/couple_3.webp",
    dressCode: "Formal traditional or contemporary wear",
    side: ["dulha", "dulhan"],
  },
  {
    title: "Reception Dinner",
    date: "December 21, 2024",
    time: "8:00 PM - 12:00 AM",
    venue: "Grand Celebration Hall",
    address: "123 Wedding Avenue, City, State",
    description:
      "Celebrate with us over dinner, dancing, and creating beautiful memories. An elegant evening of fine dining and joyous celebration.",
    icon: <Users className="h-4 w-4 md:h-8 md:w-8 text-wedding-royal-600" />,
    color: "royal",
    image: "/src/assets/couple_4.webp",
    dressCode: "Formal traditional or contemporary wear",
    side: ["dulha"],
  },
];

const COLOR_MAP = {
  haldi:
    "border-wedding-haldi-200 bg-gradient-to-br from-wedding-haldi-50/80 to-wedding-haldi-100/60",
  mehendi:
    "border-wedding-mehendi-200 bg-gradient-to-br from-wedding-mehendi-50/80 to-wedding-mehendi-100/60",
  magenta:
    "border-wedding-magenta-200 bg-gradient-to-br from-wedding-magenta-50/80 to-wedding-magenta-100/60",
  sindoor:
    "border-wedding-sindoor-200 bg-gradient-to-br from-wedding-sindoor-50/80 to-wedding-sindoor-100/60",
  royal:
    "border-wedding-royal-200 bg-gradient-to-br from-wedding-royal-50/80 to-wedding-royal-100/60",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getColorClasses = (color: string): string => {
  return (
    COLOR_MAP[color as keyof typeof COLOR_MAP] ||
    "border-wedding-sindoor-200 bg-gradient-to-br from-wedding-sindoor-50/80 to-wedding-sindoor-100/60"
  );
};

// Add this new function after the getColorClasses function
const getBorderColorClasses = (color: string): string => {
  const borderColorMap = {
    haldi: "border-wedding-haldi-300",
    mehendi: "border-wedding-mehendi-300", 
    magenta: "border-wedding-magenta-300",
    sindoor: "border-wedding-sindoor-300",
    royal: "border-wedding-royal-300",
  };
  return borderColorMap[color as keyof typeof borderColorMap] || "border-wedding-sindoor-300";
};

// Add this new function after the getColorClasses function
const getIconColorClasses = (color: string): string => {
  const iconColorMap = {
    haldi: "text-wedding-haldi-700",
    mehendi: "text-wedding-mehendi-700", 
    magenta: "text-wedding-magenta-700",
    sindoor: "text-wedding-sindoor-700",
    royal: "text-wedding-royal-700",
  };
  return iconColorMap[color as keyof typeof iconColorMap] || "text-wedding-sindoor-700";
};

// ============================================================================
// SEGMENTED CONTROL COMPONENT
// ============================================================================

interface SegmentedControlProps {
  activeSegment: EventSide;
  onSegmentChange: (segment: EventSide) => void;
}

const SegmentedControl = ({
  activeSegment,
  onSegmentChange,
}: SegmentedControlProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-wedding-gold-200">
        {/* Background indicator */}
        <motion.div
          className="absolute top-2 bottom-2 bg-gradient-to-r from-wedding-sindoor-500 to-wedding-sindoor-600 rounded-xl shadow-lg"
          initial={false}
          animate={{
            left: activeSegment === "dulha" ? "8px" : "calc(50% + 4px)",
            width: "calc(50% - 8px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <div className="relative flex">
          {/* Dulha (Groom) */}
          <button
            onClick={() => onSegmentChange("dulha")}
            className={`relative flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 min-w-[140px] ${
              activeSegment === "dulha"
                ? "text-white font-semibold"
                : "text-wedding-sindoor-700 hover:text-wedding-sindoor-800"
            }`}
          >
            <img
              src={groomIcon}
              alt="Groom"
              className={`w-6 h-6 mr-3 transition-all duration-300 ${
                activeSegment === "dulha" ? "brightness-0 invert" : "opacity-70"
              }`}
            />
            <span className="font-['Poppins'] font-medium text-lg">Dulha</span>
          </button>

          {/* Dulhan (Bride) */}
          <button
            onClick={() => onSegmentChange("dulhan")}
            className={`relative flex items-center justify-center px-6 py-4 rounded-xl transition-all duration-300 min-w-[140px] ${
              activeSegment === "dulhan"
                ? "text-white font-semibold"
                : "text-wedding-sindoor-700 hover:text-wedding-sindoor-800"
            }`}
          >
            <img
              src={brideIcon}
              alt="Bride"
              className={`w-6 h-6 mr-3 transition-all duration-300 ${
                activeSegment === "dulhan"
                  ? "brightness-0 invert"
                  : "opacity-70"
              }`}
            />
            <span className="font-['Poppins'] font-medium text-lg">Dulhan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT SECTIONS
// ============================================================================

const SectionHeader = ({ activeSegment }: { activeSegment: EventSide }) => {
  const getTitle = () => {
    switch (activeSegment) {
      case "dulha":
        return "Dulha Side Events";
      case "dulhan":
        return "Dulhan Side Events";
    }
  };

  const getDescription = () => {
    switch (activeSegment) {
      case "dulha":
        return "Celebrate with the groom's side of the family in these special events leading up to our big day.";
      case "dulhan":
        return "Join the bride's side of the family for these beautiful celebrations and traditions.";
    }
  };

  return (
    <div className="text-center mb-16">
      <motion.h2
        key={activeSegment}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-wedding-sindoor-800 mb-8 font-playfair"
      >
        {getTitle()}
      </motion.h2>
      <motion.p
        key={`${activeSegment}-desc`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-wedding-sindoor-700 max-w-3xl mx-auto font-crimson leading-relaxed"
      >
        {getDescription()}
      </motion.p>
    </div>
  );
};

const EventCard = ({ event, index }: { event: Event; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group"
  >
    <Card
      className={`${getColorClasses(event.color)} shadow-xl hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden relative backdrop-blur-sm group-hover:scale-[1.02] transform-gpu`}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/3 relative overflow-hidden">
            <div className="aspect-[4/3] lg:aspect-[3/4] relative">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-wedding-gold-100 to-wedding-gold-200 flex items-center justify-center">
                  <div className="p-1 md:p-6 bg-white/90 rounded-full shadow-lg">
                    {event.icon}
                  </div>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content Section - Made more compact for mobile */}
          <div className="lg:w-2/3 p-4 sm:p-6 lg:p-10 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Header - Updated border with dynamic color */}
              <div className="flex items-start justify-between flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center space-x-3 sm:space-x-5">
                  <div className={`flex-shrink-0 p-2 sm:p-3 lg:p-4 bg-white/90 rounded-full shadow-lg border-2 ${getBorderColorClasses(event.color)} backdrop-blur-sm ${getIconColorClasses(event.color)}`}>
                    <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8">
                      {event.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-800 font-['Playfair_Display'] leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Event Details - Updated icons with dynamic colors */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                <div className="flex items-center text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-2.5 sm:p-3 lg:p-4 backdrop-blur-sm shadow-sm">
                  <Calendar className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 lg:mr-4 ${getIconColorClasses(event.color)} flex-shrink-0`} />
                  <span className="font-semibold text-xs sm:text-sm lg:text-lg">
                    {event.date}
                  </span>
                </div>
                <div className="flex items-center text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-2.5 sm:p-3 lg:p-4 backdrop-blur-sm shadow-sm">
                  <Clock className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 lg:mr-4 ${getIconColorClasses(event.color)} flex-shrink-0`} />
                  <span className="font-semibold text-xs sm:text-sm lg:text-lg">
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Venue - Updated icon with dynamic color */}
              <div className="flex items-start text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-2.5 sm:p-3 lg:p-4 backdrop-blur-sm shadow-sm">
                <MapPin className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 lg:mr-4 mt-0.5 sm:mt-1 flex-shrink-0 ${getIconColorClasses(event.color)}`} />
                <div>
                  <div className="font-bold font-['Poppins'] text-gray-800 text-xs sm:text-sm lg:text-lg">
                    {event.venue}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-['Poppins'] mt-0.5 sm:mt-1">
                    {event.address}
                  </div>
                </div>
              </div>

              {/* Dress Code - Updated border and icon with dynamic colors */}
              <div className={`flex items-start text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-2.5 sm:p-3 lg:p-4 backdrop-blur-sm shadow-sm border ${getBorderColorClasses(event.color)}`}>
                <Shirt className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 lg:mr-4 mt-0.5 sm:mt-1 flex-shrink-0 ${getIconColorClasses(event.color)}`} />
                <div>
                  <div className={`font-bold font-['Poppins'] ${getIconColorClasses(event.color)} text-xs sm:text-sm lg:text-lg mb-0.5 sm:mb-1`}>
                    Dress Code
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 font-['Poppins']">
                    {event.dressCode}
                  </div>
                </div>
              </div>

              {/* Description - Reduced padding and font size */}
              <div className="bg-white/40 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm shadow-sm">
                <p className="text-gray-700 leading-relaxed font-['Poppins'] text-xs sm:text-sm lg:text-lg">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const EventsList = ({ events }: { events: Event[] }) => {
  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-wedding-gold-200">
          <h3 className="text-2xl font-bold text-wedding-sindoor-700 mb-4 font-['Playfair_Display']">
            No Events Found
          </h3>
          <p className="text-wedding-sindoor-600 font-['Poppins']">
            There are no events scheduled for this category yet.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10 lg:space-y-14">
      {events.map((event, index) => (
        <EventCard
          key={`${event.title}-${index}`}
          event={event}
          index={index}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

// ============================================================================
// FLOWER DECORATION CONFIGURATION
// ============================================================================

interface FlowerPosition {
  id: string;
  position: string; // Tailwind positioning classes
  size: string; // Tailwind size classes
  opacity: string; // Tailwind opacity classes
  rotation: string; // Tailwind rotation classes
  hideOnMobile?: boolean;
}

const FLOWER_LILY_POSITIONS: FlowerPosition[] = [
  {
    id: "top-right",
    position: "top-20 -right-4 md:top-32 md:right-8",
    size: "w-[20%] md:w-[25%]",
    opacity: "opacity-80",
    rotation: "-rotate-75",
  },
];

// ============================================================================
// FLOWER DECORATION COMPONENTS
// ============================================================================

const FlowerDecorations = () => {
  return (
    <>
      {/* Flower Top - Top Left */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 pointer-events-none max-h-full">
        <img
          src={flowerTop}
          alt="Decorative flower"
          className="w-1/2 lg:w-full max-h-full object-fill opacity-60 transform rotate-1"
        />
      </div>

      {/* Single Flower Lily - Top Right */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <img
          src={flowerLily}
          alt="Decorative lily"
          className="absolute top-4 -right-4 md:top-32 md:right-8 w-[20%] sm:w-[30%] object-contain opacity-80 transform -rotate-45 transition-transform duration-300 hover:scale-110"
        />
      </div>
    </>
  );
};

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [activeSegment, setActiveSegment] = useState<EventSide>("dulha");

  // Filter events based on active segment
  const filteredEvents = EVENTS_DATA.filter((event) => {
    return event.side.includes(activeSegment);
  });

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <section
        id="events"
        className="py-24 px-4 lg:px-6 bg-gradient-to-b from-white to-wedding-gold-50/30 relative overflow-hidden"
      >
        {/* Simplified Flower Decorations */}
        <FlowerDecorations />

        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-wedding-gold-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-wedding-sindoor-300 rounded-full blur-3xl" />
        </div>

        <motion.div
          ref={ref}
          className="max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader activeSegment={activeSegment} />
          <SegmentedControl
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
          />
          <motion.div
            key={activeSegment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EventsList events={filteredEvents} />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
