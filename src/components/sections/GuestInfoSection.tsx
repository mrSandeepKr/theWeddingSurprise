import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car, Plane, Hotel, Utensils, Gift, Info } from "lucide-react";

// Types
interface Accommodation {
  name: string;
  distance: string;
  amenities: string;
  contact: string;
  special: string;
}

// Data
const accommodations: Accommodation[] = [
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

// Component Functions
function SectionHeader() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-serif">
        Guest Information
      </h2>
      <p className="text-lg text-rose-700 max-w-2xl mx-auto">
        Everything you need to know to make your visit comfortable and
        memorable.
      </p>
    </div>
  );
}

function TransportationCard() {
  return (
    <Card className="border-rose-200 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <Car className="h-8 w-8 text-rose-600 mr-3" />
          <h3 className="text-2xl font-semibold text-rose-800">
            Transportation
          </h3>
        </div>
        <div className="space-y-4">
          <TransportationOption
            title="By Air"
            description="City International Airport (CIX) - 25 minutes drive"
            details="Uber/Lyft readily available, Airport shuttle services"
          />
          <TransportationOption
            title="By Car"
            description="Free parking available at all venues"
            details="Valet service available at wedding venue"
          />
          <TransportationOption
            title="Local Transport"
            description="Complimentary shuttle between hotel and venues"
            details="Shuttle times: 3:30 PM, 7:30 PM on wedding day"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function TransportationOption({
  title,
  description,
  details,
}: {
  title: string;
  description: string;
  details: string;
}) {
  return (
    <div>
      <h4 className="font-semibold text-rose-700 mb-2">{title}</h4>
      <p className="text-rose-600 mb-2">{description}</p>
      <p className="text-sm text-rose-500">{details}</p>
    </div>
  );
}

function WeatherCard() {
  return (
    <Card className="border-rose-200 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <Info className="h-8 w-8 text-rose-600 mr-3" />
          <h3 className="text-2xl font-semibold text-rose-800">
            Weather & What to Expect
          </h3>
        </div>
        <div className="space-y-4">
          <WeatherInfo
            title="December Weather"
            description="Average temperature: 45-65°F (7-18°C)"
            details="Mild winter weather, light jacket recommended for evenings"
          />
          <WeatherInfo
            title="Venue Details"
            description="Indoor ceremony and reception with heating"
            details="Some pre-wedding events may have outdoor elements"
          />
          <WeatherInfo
            title="What to Bring"
            description="Comfortable shoes for dancing, light wrap/shawl"
            details="Camera for memories (ceremony will be photographed professionally)"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherInfo({
  title,
  description,
  details,
}: {
  title: string;
  description: string;
  details: string;
}) {
  return (
    <div>
      <h4 className="font-semibold text-rose-700 mb-2">{title}</h4>
      <p className="text-rose-600 mb-2">{description}</p>
      <p className="text-sm text-rose-500">{details}</p>
    </div>
  );
}

function AccommodationsSection() {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-8">
        <Hotel className="h-8 w-8 text-rose-600 mr-3" />
        <h3 className="text-3xl font-semibold text-rose-800">
          Recommended Accommodations
        </h3>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {accommodations.map((hotel, index) => (
          <AccommodationCard key={index} accommodation={hotel} />
        ))}
      </div>
    </div>
  );
}

function AccommodationCard({
  accommodation,
}: {
  accommodation: Accommodation;
}) {
  const handleCallClick = () => {
    window.open("tel:" + accommodation.contact.replace(/\D/g, ""), "_blank");
  };

  return (
    <Card className="border-rose-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <h4 className="text-xl font-semibold text-rose-800 mb-3">
          {accommodation.name}
        </h4>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-rose-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{accommodation.distance}</span>
          </div>
          <p className="text-sm text-rose-600">{accommodation.amenities}</p>
          <p className="text-sm text-rose-600">{accommodation.contact}</p>
        </div>
        <div className="bg-rose-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-rose-700 font-medium">
            {accommodation.special}
          </p>
        </div>
        <Button
          className="w-full bg-rose-600 hover:bg-rose-700 text-white"
          onClick={handleCallClick}
        >
          Call to Book
        </Button>
      </CardContent>
    </Card>
  );
}

function GiftInfoCard() {
  return (
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
            Your presence is the greatest gift we could ask for! However, if
            you'd like to honor us with a gift:
          </p>
          <RegistryInfo />
          <p className="text-sm text-rose-600 italic">
            Cash gifts are also gratefully accepted and will help us start our
            new journey together.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function RegistryInfo() {
  const registries = ["Williams Sonoma", "Target", "Amazon"];

  return (
    <div className="bg-rose-50 p-4 rounded-lg">
      <h4 className="font-semibold text-rose-700 mb-2">Registry Information</h4>
      <p className="text-rose-600 text-sm mb-2">We're registered at:</p>
      <ul className="text-rose-600 text-sm space-y-1">
        {registries.map((registry, index) => (
          <li key={index}>• {registry}</li>
        ))}
      </ul>
    </div>
  );
}

function FoodDiningCard() {
  return (
    <Card className="border-rose-200 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <Utensils className="h-8 w-8 text-rose-600 mr-3" />
          <h3 className="text-2xl font-semibold text-rose-800">
            Food & Dining
          </h3>
        </div>
        <div className="space-y-4">
          <DiningInfo
            title="Menu Options"
            description="Vegetarian and non-vegetarian options available"
          />
          <DiningInfo
            title="Special Dietary Needs"
            description="Gluten-free, vegan, and other dietary accommodations available"
            additionalInfo="Contact us directly for specific requirements"
          />
          <DiningInfo
            title="Beverages"
            description="Full bar service with signature cocktails"
            additionalInfo="Non-alcoholic options available"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DiningInfo({
  title,
  description,
  additionalInfo,
}: {
  title: string;
  description: string;
  additionalInfo?: string;
}) {
  return (
    <div>
      <h4 className="font-semibold text-rose-700 mb-2">{title}</h4>
      <p className="text-rose-600 text-sm mb-2">{description}</p>
      {additionalInfo && (
        <p className="text-rose-600 text-sm">{additionalInfo}</p>
      )}
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-12 text-center">
      <Card className="border-rose-200 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-rose-800 mb-4">
            Need Help?
          </h3>
          <p className="text-rose-700 mb-6">
            If you have any questions or need assistance, please don't hesitate
            to contact us or our wedding coordinator.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-center">
            <ContactInfo
              title="Couple Contact"
              contacts={[
                "Sandeep: +1 (555) 123-0000",
                "Payal: +1 (555) 456-0000",
              ]}
            />
            <ContactInfo
              title="Wedding Coordinator"
              contacts={["Sarah Johnson", "+1 (555) 789-0000"]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContactInfo({
  title,
  contacts,
}: {
  title: string;
  contacts: string[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-rose-700 mb-2">{title}</h4>
      {contacts.map((contact, index) => (
        <p key={index} className="text-rose-600">
          {contact}
        </p>
      ))}
    </div>
  );
}

// Main Component
export default function GuestInfoSection() {
  return (
    <section
      id="guest-info"
      className="py-20 px-6 bg-gradient-to-br from-rose-50 to-pink-50"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader />

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <TransportationCard />
          <WeatherCard />
        </div>

        <AccommodationsSection />

        <div className="grid md:grid-cols-2 gap-8">
          <GiftInfoCard />
          <FoodDiningCard />
        </div>

        <ContactCard />
      </div>
    </section>
  );
}
