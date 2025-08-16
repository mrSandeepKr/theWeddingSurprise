import { Card, CardContent } from "@/components/ui/card";
import { Heart, Calendar, Gem, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function OurStorySection() {
  const milestones = [
    {
      icon: <Heart className="h-8 w-8 text-rose-600" />,
      title: "First Meeting",
      date: "June 2023",
      description:
        "Our paths crossed on a trip to Rameshwaram, and there was an instant connection that we both felt.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-rose-600" />,
      title: "First Date",
      date: "July 2023",
      description:
        "A night of watching Harry potter series and cooking Dosa together XD. We knew we had found something special.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-rose-600" />,
      title: "Telling our parents",
      date: "Aug 2024",
      description:
        "Taking the next step in our relationship, we decided to share the happy news with our parents.",
    },
    {
      icon: <Gem className="h-8 w-8 text-rose-600" />,
      title: "The Proposal",
      date: "TBD",
      description:
        "She will kill the person building the website if he doesn't propose. He has all the intentions to just not getting a chance :)",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section
      id="story"
      className="py-20 px-6 bg-gradient-to-br from-rose-50 to-pink-50"
    >
      <motion.div
        ref={ref}
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-playfair">
            Our Love Story
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto font-crimson">
            Every love story is beautiful, but ours is our favorite. Here's how
            our journey began and led us to this magical day.
          </p>
          {/* Indian Wedding "Fluff" - Placeholder for decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Consider adding a small diya or paisley SVG here */}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {milestones.map((milestone, index) => (
            <Card
              key={index}
              className="border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-rose-100 rounded-full group-hover:bg-rose-200 transition-colors">
                    {milestone.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-rose-800 mb-2 font-playfair">
                      {milestone.title}
                    </h3>
                    <p className="text-rose-600 font-medium mb-3 font-crimson">
                      {milestone.date}
                    </p>
                    <p className="text-rose-700 leading-relaxed font-crimson text-sm md:text-base">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-rose-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-rose-800 mb-4 font-playfair">
                And now...
              </h3>
              <p className="text-lg text-rose-700 italic leading-relaxed font-crimson mb-4">
                "We're ready to say 'I do' and begin the greatest adventure of
                our lives together. Thank you for being part of our story and
                for joining us as we start this new chapter."
              </p>
              <div className="mt-6 text-rose-800 font-semibold font-crimson">
                With all our love, Sandeep & Payal
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
