import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Upload, Send, Camera } from "lucide-react";

interface Memory {
  id: number;
  name: string;
  message: string;
  date: string;
  type: "message" | "photo";
}

export default function MemoryWallSection() {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      name: "Priya Sharma",
      message:
        "Wishing you both a lifetime of love, laughter, and endless happiness! Can't wait to celebrate with you! ❤️",
      date: "2 days ago",
      type: "message",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      message:
        "So excited for the big day! You two are perfect for each other. Looking forward to the sangeet night! 🕺💃",
      date: "3 days ago",
      type: "message",
    },
    {
      id: 3,
      name: "Anita Patel",
      message: "Shared a beautiful photo from your engagement ceremony",
      date: "5 days ago",
      type: "photo",
    },
    {
      id: 4,
      name: "Michael Chen",
      message:
        "Congratulations to the happy couple! May your marriage be filled with all the right ingredients: a heap of love, a dash of humor, a touch of romance, and a spoonful of understanding.",
      date: "1 week ago",
      type: "message",
    },
  ]);

  const [newMemory, setNewMemory] = useState({
    name: "",
    message: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMemory.name && newMemory.message) {
      const memory: Memory = {
        id: memories.length + 1,
        name: newMemory.name,
        message: newMemory.message,
        date: "Just now",
        type: "message",
      };
      setMemories([memory, ...memories]);
      setNewMemory({ name: "", message: "" });
      setShowForm(false);
    }
  };

  return (
    <section id="memory-wall" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-playfair">
            Memory Wall
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto mb-8 font-crimson">
            Share your wishes, memories, and blessings for Sandeep and Payal.
            Your messages mean the world to us!
          </p>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Share a Message
            </Button>
            <Button
              variant="outline"
              className="border-rose-600 text-rose-600 hover:bg-rose-50 px-6 py-3"
            >
              <Camera className="h-5 w-5 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>

        {/* Submission Form */}
        {showForm && (
          <Card className="border-rose-200 shadow-lg mb-12">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-rose-800 mb-6">
                Share Your Wishes
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="guestName">Your Name</Label>
                  <Input
                    id="guestName"
                    value={newMemory.name}
                    onChange={(e) =>
                      setNewMemory((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guestMessage">Your Message</Label>
                  <Textarea
                    id="guestMessage"
                    value={newMemory.message}
                    onChange={(e) =>
                      setNewMemory((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Share your wishes, memories, or blessings for the couple..."
                    rows={4}
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Post Message
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Memory Feed */}
        <div className="space-y-6">
          {memories.map((memory) => (
            <Card
              key={memory.id}
              className="border-rose-200 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-rose-100 text-rose-600 font-semibold">
                      {memory.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-rose-800">
                        {memory.name}
                      </h4>
                      <span className="text-sm text-rose-500">
                        {memory.date}
                      </span>
                    </div>

                    {memory.type === "photo" ? (
                      <div>
                        <p className="text-rose-700 mb-3">{memory.message}</p>
                        <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg p-8 flex items-center justify-center">
                          <div className="text-center text-rose-600">
                            <Camera className="h-12 w-12 mx-auto mb-2" />
                            <p className="text-sm">
                              Photo shared by {memory.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-rose-700 leading-relaxed">
                        {memory.message}
                      </p>
                    )}

                    <div className="flex items-center mt-4 space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-sm">Like</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Moderation Notice */}
        <div className="mt-12 text-center">
          <Card className="border-rose-200 shadow-lg bg-rose-50/50">
            <CardContent className="p-6">
              <p className="text-sm text-rose-600 italic">
                All messages and photos are moderated before appearing on the
                memory wall. Thank you for keeping this space positive and
                joyful! ✨
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
