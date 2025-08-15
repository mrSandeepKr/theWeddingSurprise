import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Mail, Phone, CheckCircle } from 'lucide-react';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    attendance: '',
    events: [] as string[],
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const events = [
    { id: 'haldi', name: 'Haldi Ceremony (Dec 19, 10 AM)' },
    { id: 'mehendi', name: 'Mehendi Night (Dec 19, 6 PM)' },
    { id: 'sangeet', name: 'Sangeet Night (Dec 20, 7 PM)' },
    { id: 'ceremony', name: 'Wedding Ceremony (Dec 21, 4 PM)' },
    { id: 'reception', name: 'Reception Dinner (Dec 21, 8 PM)' }
  ];

  const handleEventChange = (eventId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      events: checked 
        ? [...prev.events, eventId]
        : prev.events.filter(id => id !== eventId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('RSVP Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="rsvp" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-green-200 shadow-lg bg-green-50">
            <CardContent className="p-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-green-700 mb-6">
                Your RSVP has been received successfully. We're so excited to celebrate with you!
              </p>
              <p className="text-green-600">
                A confirmation email will be sent to {formData.email} shortly.
              </p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-6 border-green-600 text-green-600 hover:bg-green-50"
              >
                Submit Another RSVP
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-serif">
            RSVP
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto">
            Please confirm your attendance by December 15, 2024. We can't wait to celebrate with you!
          </p>
        </div>

        <Card className="border-rose-200 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({...prev, guests: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Will you be attending? *</Label>
                <RadioGroup 
                  value={formData.attendance} 
                  onValueChange={(value) => setFormData(prev => ({...prev, attendance: value}))}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I'll be there!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Sorry, can't make it</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attendance === 'yes' && (
                <div className="space-y-4">
                  <Label>Which events will you attend?</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={event.id}
                          checked={formData.events.includes(event.id)}
                          onCheckedChange={(checked) => handleEventChange(event.id, checked as boolean)}
                        />
                        <Label htmlFor={event.id} className="text-sm">{event.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Restrictions / Special Requirements</Label>
                <Textarea
                  id="dietary"
                  value={formData.dietaryRestrictions}
                  onChange={(e) => setFormData(prev => ({...prev, dietaryRestrictions: e.target.value}))}
                  placeholder="Please let us know about any dietary restrictions or special requirements..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message for the Couple</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                  placeholder="Share your wishes and blessings for Sandeep and Payal..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 text-lg"
                disabled={!formData.name || !formData.email || !formData.attendance}
              >
                Submit RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}