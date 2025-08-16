import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Palette, Music, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function EventsSection() {
  const events = [
    {
      title: "Haldi Ceremony",
      date: "February 4, 2026",
      time: "10:00 AM - 12:00 AM",
      venue: "Family Home - Garden Area",
      address: "123 Family Street, City, State",
      description:
        "Join us for the traditional Haldi ceremony filled with turmeric, laughter, and blessings.",
      icon: <Palette className="h-8 w-8 text-wedding-haldi-600" />,
      color: "haldi",
    },
    {
      title: "Mehendi Night",
      date: "December 19, 2024",
      time: "6:00 PM - 10:00 PM",
      venue: "Grand Banquet Hall",
      address: "456 Celebration Avenue, City, State",
      description:
        "An evening of intricate henna designs, music, and celebration with the ladies.",
      icon: <Users className="h-8 w-8 text-wedding-mehendi-600" />,
      color: "mehendi",
    },
    {
      title: "Sangeet Night",
      date: "December 20, 2024",
      time: "7:00 PM - 11:00 PM",
      venue: "Royal Palace Hotel",
      address: "789 Dance Floor Road, City, State",
      description:
        "Dance the night away as both families come together for music and performances.",
      icon: <Music className="h-8 w-8 text-wedding-magenta-600" />,
      color: "magenta",
    },
    {
      title: "Wedding Ceremony",
      date: "December 21, 2024",
      time: "4:00 PM - 7:00 PM",
      venue: "Grand Celebration Hall",
      address: "123 Wedding Avenue, City, State",
      description:
        "The sacred ceremony where we exchange vows and begin our journey as one.",
      icon: <Calendar className="h-8 w-8 text-wedding-sindoor-600" />,
      color: "sindoor",
    },
    {
      title: "Reception Dinner",
      date: "December 21, 2024",
      time: "8:00 PM - 12:00 AM",
      venue: "Grand Celebration Hall",
      address: "123 Wedding Avenue, City, State",
      description:
        "Celebrate with us over dinner, dancing, and creating beautiful memories.",
      icon: <Users className="h-8 w-8 text-wedding-royal-600" />,
      color: "royal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      haldi: "border-wedding-haldi-200 bg-wedding-haldi-50/50",
      mehendi: "border-wedding-mehendi-200 bg-wedding-mehendi-50/50",
      magenta: "border-wedding-magenta-200 bg-wedding-magenta-50/50",
      sindoor: "border-wedding-sindoor-200 bg-wedding-sindoor-50/50",
      royal: "border-wedding-royal-200 bg-wedding-royal-50/50",
    };
    return (
      colorMap[color as keyof typeof colorMap] ||
      "border-wedding-sindoor-200 bg-wedding-sindoor-50/50"
    );
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section
      id="events"
      className="py-20 px-6 bg-gradient-to-b from-white to-wedding-gold-50/30"
    >
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wedding-sindoor-800 mb-6 font-playfair">
            Wedding Events
          </h2>
          <p className="text-lg text-wedding-sindoor-700 max-w-2xl mx-auto font-crimson">
            Join us for a series of beautiful celebrations leading up to our
            special day. Each event is a unique part of our wedding journey.
          </p>
        </div>

        <div className="space-y-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className={`${getColorClasses(event.color)} shadow-lg hover:shadow-xl transition-all duration-300 border-2`}
            >
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-white rounded-full shadow-sm border-2 border-wedding-gold-200">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 font-playfair">
                          {event.title}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-700 font-crimson">
                            <Calendar className="h-4 w-4 mr-2 text-wedding-marigold-600" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-700 font-crimson">
                            <Clock className="h-4 w-4 mr-2 text-wedding-marigold-600" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-start text-gray-700 font-crimson">
                            <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-wedding-marigold-600" />
                            <div>
                              <div className="font-medium font-crimson">
                                {event.venue}
                              </div>
                              <div className="text-sm font-crimson">
                                {event.address}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1 text-center md:text-right">
                    <Button
                      className="bg-wedding-sindoor-600 hover:bg-wedding-sindoor-700 text-white border-2 border-wedding-gold-300 shadow-lg"
                      onClick={() =>
                        window.open("https://maps.google.com", "_blank")
                      }
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-wedding-gold-300 border-2 shadow-lg bg-gradient-to-r from-wedding-gold-50 to-wedding-marigold-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-wedding-sindoor-800 mb-4 font-playfair">
                Dress Code
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-wedding-haldi-100/50 border border-wedding-haldi-200">
                  <h4 className="font-semibold text-wedding-haldi-800 mb-2 font-playfair">
                    Haldi & Mehendi
                  </h4>
                  <p className="text-wedding-haldi-700 font-crimson">
                    Bright colors, comfortable traditional wear
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-wedding-magenta-100/50 border border-wedding-magenta-200">
                  <h4 className="font-semibold text-wedding-magenta-800 mb-2 font-playfair">
                    Sangeet
                  </h4>
                  <p className="text-wedding-magenta-700 font-crimson">
                    Festive attire, ready to dance!
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-wedding-royal-100/50 border border-wedding-royal-200">
                  <h4 className="font-semibold text-wedding-royal-800 mb-2 font-playfair">
                    Wedding & Reception
                  </h4>
                  <p className="text-wedding-royal-700 font-crimson">
                    Formal traditional or contemporary wear
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
