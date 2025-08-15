import { Card, CardContent } from '@/components/ui/card';
import { Heart, Calendar, Gem, Sparkles } from 'lucide-react';

export default function OurStorySection() {
  const milestones = [
    {
      icon: <Heart className="h-8 w-8 text-rose-600" />,
      title: "First Meeting",
      date: "January 2020",
      description: "Our paths crossed at a mutual friend's gathering, and there was an instant connection that we both felt."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-rose-600" />,
      title: "First Date",
      date: "February 2020",
      description: "Coffee turned into dinner, and dinner turned into a long walk under the stars. We knew we had found something special."
    },
    {
      icon: <Calendar className="h-8 w-8 text-rose-600" />,
      title: "Moving In Together",
      date: "June 2022",
      description: "Taking the next step in our relationship, we decided to build a home together and create beautiful memories."
    },
    {
      icon: <Gem className="h-8 w-8 text-rose-600" />,
      title: "The Proposal",
      date: "March 2024",
      description: "Under the same stars where we had our first long walk, Sandeep asked the question that changed everything."
    }
  ];

  return (
    <section id="story" className="py-20 px-6 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-serif">
            Our Love Story
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto">
            Every love story is beautiful, but ours is our favorite. Here's how our journey began and led us to this magical day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {milestones.map((milestone, index) => (
            <Card key={index} className="border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-rose-100 rounded-full group-hover:bg-rose-200 transition-colors">
                    {milestone.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-rose-800 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-rose-600 font-medium mb-3">
                      {milestone.date}
                    </p>
                    <p className="text-rose-700 leading-relaxed">
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
              <h3 className="text-2xl font-semibold text-rose-800 mb-4">
                And now...
              </h3>
              <p className="text-lg text-rose-700 italic leading-relaxed">
                "We're ready to say 'I do' and begin the greatest adventure of our lives together. 
                Thank you for being part of our story and for joining us as we start this new chapter."
              </p>
              <div className="mt-6 text-rose-800 font-semibold">
                With all our love,<br />
                Sandeep & Payal
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}