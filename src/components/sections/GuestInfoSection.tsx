import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Plane, Hotel, Utensils, Gift, Info } from "lucide-react";

export default function GuestInfoSection() {
  const accommodations = [
    {
      name: "Grand Palace Hotel",
      distance: "0.2 miles from venue",
      amenities: "Pool, Spa, Restaurant",
      contact: "+1 (555) 123-4567",
      special: "Wedding block available with 20% discount",
    },
    {
      name: "Comfort Inn & Suites",
      distance: "1.5 miles from venue",
      amenities: "Breakfast, WiFi, Gym",
      contact: "+1 (555) 987-6543",
      special: "Budget-friendly option",
    },
    {
      name: "Boutique Garden Resort",
      distance: "0.8 miles from venue",
      amenities: "Garden View, Restaurant, Bar",
      contact: "+1 (555) 456-7890",
      special: "Luxury experience with complimentary shuttle",
    },
  ];

  return (
    <section
      id="guest-info"
      className="py-20 px-6 bg-gradient-to-br from-rose-50 to-pink-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-serif">
            Guest Information
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto">
            Everything you need to know to make your visit comfortable and
            memorable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Transportation */}
          <Card className="border-rose-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Car className="h-8 w-8 text-rose-600 mr-3" />
                <h3 className="text-2xl font-semibold text-rose-800">
                  Transportation
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">By Air</h4>
                  <p className="text-rose-600 mb-2">
                    City International Airport (CIX) - 25 minutes drive
                  </p>
                  <p className="text-sm text-rose-500">
                    Uber/Lyft readily available, Airport shuttle services
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">By Car</h4>
                  <p className="text-rose-600 mb-2">
                    Free parking available at all venues
                  </p>
                  <p className="text-sm text-rose-500">
                    Valet service available at wedding venue
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Local Transport
                  </h4>
                  <p className="text-rose-600 mb-2">
                    Complimentary shuttle between hotel and venues
                  </p>
                  <p className="text-sm text-rose-500">
                    Shuttle times: 3:30 PM, 7:30 PM on wedding day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="border-rose-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Info className="h-8 w-8 text-rose-600 mr-3" />
                <h3 className="text-2xl font-semibold text-rose-800">
                  Weather & What to Expect
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    December Weather
                  </h4>
                  <p className="text-rose-600 mb-2">
                    Average temperature: 45-65°F (7-18°C)
                  </p>
                  <p className="text-sm text-rose-500">
                    Mild winter weather, light jacket recommended for evenings
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Venue Details
                  </h4>
                  <p className="text-rose-600 mb-2">
                    Indoor ceremony and reception with heating
                  </p>
                  <p className="text-sm text-rose-500">
                    Some pre-wedding events may have outdoor elements
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    What to Bring
                  </h4>
                  <p className="text-rose-600 mb-2">
                    Comfortable shoes for dancing, light wrap/shawl
                  </p>
                  <p className="text-sm text-rose-500">
                    Camera for memories (ceremony will be photographed
                    professionally)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accommodations */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <Hotel className="h-8 w-8 text-rose-600 mr-3" />
            <h3 className="text-3xl font-semibold text-rose-800">
              Recommended Accommodations
            </h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {accommodations.map((hotel, index) => (
              <Card
                key={index}
                className="border-rose-200 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-rose-800 mb-3">
                    {hotel.name}
                  </h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-rose-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{hotel.distance}</span>
                    </div>
                    <p className="text-sm text-rose-600">{hotel.amenities}</p>
                    <p className="text-sm text-rose-600">{hotel.contact}</p>
                  </div>
                  <div className="bg-rose-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-rose-700 font-medium">
                      {hotel.special}
                    </p>
                  </div>
                  <Button
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                    onClick={() =>
                      window.open(
                        "tel:" + hotel.contact.replace(/\D/g, ""),
                        "_blank",
                      )
                    }
                  >
                    Call to Book
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-rose-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Gift className="h-8 w-8 text-rose-600 mr-3" />
                <h3 className="text-2xl font-semibold text-rose-800">
                  Gift Information
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-rose-700">
                  Your presence is the greatest gift we could ask for! However,
                  if you'd like to honor us with a gift:
                </p>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Registry Information
                  </h4>
                  <p className="text-rose-600 text-sm mb-2">
                    We're registered at:
                  </p>
                  <ul className="text-rose-600 text-sm space-y-1">
                    <li>• Williams Sonoma</li>
                    <li>• Target</li>
                    <li>• Amazon</li>
                  </ul>
                </div>
                <p className="text-sm text-rose-600 italic">
                  Cash gifts are also gratefully accepted and will help us start
                  our new journey together.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rose-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Utensils className="h-8 w-8 text-rose-600 mr-3" />
                <h3 className="text-2xl font-semibold text-rose-800">
                  Food & Dining
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Menu Options
                  </h4>
                  <p className="text-rose-600 text-sm mb-2">
                    Vegetarian and non-vegetarian options available
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Special Dietary Needs
                  </h4>
                  <p className="text-rose-600 text-sm mb-2">
                    Gluten-free, vegan, and other dietary accommodations
                    available
                  </p>
                  <p className="text-rose-600 text-sm">
                    Contact us directly for specific requirements
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Beverages
                  </h4>
                  <p className="text-rose-600 text-sm">
                    Full bar service with signature cocktails
                  </p>
                  <p className="text-rose-600 text-sm">
                    Non-alcoholic options available
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <Card className="border-rose-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-rose-800 mb-4">
                Need Help?
              </h3>
              <p className="text-rose-700 mb-6">
                If you have any questions or need assistance, please don't
                hesitate to contact us or our wedding coordinator.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Couple Contact
                  </h4>
                  <p className="text-rose-600">Sandeep: +1 (555) 123-0000</p>
                  <p className="text-rose-600">Payal: +1 (555) 456-0000</p>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-700 mb-2">
                    Wedding Coordinator
                  </h4>
                  <p className="text-rose-600">Sarah Johnson</p>
                  <p className="text-rose-600">+1 (555) 789-0000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
