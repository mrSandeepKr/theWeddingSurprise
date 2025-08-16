import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Palette, Music, Users, Shirt } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  dressCode: string; // Added dress code to individual events
}

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const EVENTS_DATA: Event[] = [
  {
    title: "Haldi Ceremony",
    date: "February 4, 2026",
    time: "10:00 AM - 12:00 AM",
    venue: "Family Home - Garden Area",
    address: "123 Family Street, City, State",
    description:
      "Join us for the traditional Haldi ceremony filled with turmeric, laughter, and blessings. This sacred ritual marks the beginning of our wedding celebrations.",
    icon: <Palette className="h-8 w-8 text-wedding-haldi-600" />,
    color: "haldi",
    image: "/src/assets/couple_1.webp",
    dressCode: "Bright colors, comfortable traditional wear",
  },
  {
    title: "Sangeet Night",
    date: "December 20, 2024",
    time: "7:00 PM - 11:00 PM",
    venue: "Royal Palace Hotel",
    address: "789 Dance Floor Road, City, State",
    description:
      "Dance the night away as both families come together for music and performances. An evening filled with joy, laughter, and unforgettable memories.",
    icon: <Music className="h-8 w-8 text-wedding-magenta-600" />,
    color: "magenta",
    image: "/src/assets/couple_2.webp",
    dressCode: "Festive attire, ready to dance!",
  },
  {
    title: "Wedding Ceremony",
    date: "December 21, 2024",
    time: "4:00 PM - 7:00 PM",
    venue: "Grand Celebration Hall",
    address: "123 Wedding Avenue, City, State",
    description:
      "The sacred ceremony where we exchange vows and begin our journey as one. Witness the union of two hearts in the presence of family and friends.",
    icon: <Calendar className="h-8 w-8 text-wedding-sindoor-600" />,
    color: "sindoor",
    image: "/src/assets/couple_3.webp",
    dressCode: "Formal traditional or contemporary wear",
  },
  {
    title: "Reception Dinner",
    date: "December 21, 2024",
    time: "8:00 PM - 12:00 AM",
    venue: "Grand Celebration Hall",
    address: "123 Wedding Avenue, City, State",
    description:
      "Celebrate with us over dinner, dancing, and creating beautiful memories. An elegant evening of fine dining and joyous celebration.",
    icon: <Users className="h-8 w-8 text-wedding-royal-600" />,
    color: "royal",
    image: "/src/assets/couple_4.webp",
    dressCode: "Formal traditional or contemporary wear",
  },
];

const COLOR_MAP = {
  haldi: "border-wedding-haldi-200 bg-gradient-to-br from-wedding-haldi-50/80 to-wedding-haldi-100/60",
  mehendi: "border-wedding-mehendi-200 bg-gradient-to-br from-wedding-mehendi-50/80 to-wedding-mehendi-100/60",
  magenta: "border-wedding-magenta-200 bg-gradient-to-br from-wedding-magenta-50/80 to-wedding-magenta-100/60",
  sindoor: "border-wedding-sindoor-200 bg-gradient-to-br from-wedding-sindoor-50/80 to-wedding-sindoor-100/60",
  royal: "border-wedding-royal-200 bg-gradient-to-br from-wedding-royal-50/80 to-wedding-royal-100/60",
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

// ============================================================================
// COMPONENT SECTIONS
// ============================================================================

const SectionHeader = () => (
  <div className="text-center mb-16">
    <h2 className="text-5xl md:text-6xl font-bold text-wedding-sindoor-800 mb-8 font-['Playfair_Display']">
      Wedding Events
    </h2>
    <p className="text-xl text-wedding-sindoor-700 max-w-3xl mx-auto font-['Poppins'] leading-relaxed">
      Join us for a series of beautiful celebrations leading up to our
      special day. Each event is a unique part of our wedding journey.
    </p>
  </div>
);

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
                  <div className="p-6 bg-white/90 rounded-full shadow-lg">
                    {event.icon}
                  </div>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-5">
                  <div className="flex-shrink-0 p-4 bg-white/90 rounded-full shadow-lg border-2 border-wedding-gold-200 backdrop-blur-sm">
                    {event.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 font-['Playfair_Display'] leading-tight">
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-4 backdrop-blur-sm shadow-sm">
                  <Calendar className="h-6 w-6 mr-4 text-wedding-marigold-600 flex-shrink-0" />
                  <span className="font-semibold text-lg">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-4 backdrop-blur-sm shadow-sm">
                  <Clock className="h-6 w-6 mr-4 text-wedding-marigold-600 flex-shrink-0" />
                  <span className="font-semibold text-lg">{event.time}</span>
                </div>
              </div>

              {/* Venue */}
              <div className="flex items-start text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-4 backdrop-blur-sm shadow-sm">
                <MapPin className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-wedding-marigold-600" />
                <div>
                  <div className="font-bold font-['Poppins'] text-gray-800 text-lg">
                    {event.venue}
                  </div>
                  <div className="text-base text-gray-600 font-['Poppins'] mt-1">
                    {event.address}
                  </div>
                </div>
              </div>

              {/* Dress Code */}
              <div className="flex items-start text-gray-700 font-['Poppins'] bg-white/60 rounded-xl p-4 backdrop-blur-sm shadow-sm border border-wedding-gold-200">
                <Shirt className="h-6 w-6 mr-4 mt-1 flex-shrink-0 text-wedding-sindoor-600" />
                <div>
                  <div className="font-bold font-['Poppins'] text-wedding-sindoor-800 text-lg mb-1">
                    Dress Code
                  </div>
                  <div className="text-base text-gray-700 font-['Poppins']">
                    {event.dressCode}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white/40 rounded-xl p-3 backdrop-blur-sm shadow-sm">
                <p className="text-gray-700 leading-relaxed font-['Poppins'] text-lg">
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

const EventsList = () => (
  <div className="space-y-10 lg:space-y-14">
    {EVENTS_DATA.map((event, index) => (
      <EventCard key={index} event={event} index={index} />
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      
      <section
        id="events"
        className="py-24 px-4 lg:px-6 bg-gradient-to-b from-white to-wedding-gold-50/30 relative overflow-hidden"
      >
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
          <SectionHeader />
          <EventsList />
        </motion.div>
      </section>
    </>
  );
}
