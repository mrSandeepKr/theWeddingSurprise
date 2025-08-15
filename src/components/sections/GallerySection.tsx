import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Play, X } from 'lucide-react';

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'prewedding', name: 'Pre-Wedding' },
    { id: 'engagement', name: 'Engagement' },
    { id: 'ceremonies', name: 'Ceremonies' },
    { id: 'family', name: 'Family Moments' }
  ];

  // Placeholder gallery items (in real app, these would come from the video frames)
  const galleryItems = [
    { id: 1, category: 'prewedding', type: 'image', title: 'Pre-Wedding Shoot', description: 'Beautiful moments captured during our pre-wedding session' },
    { id: 2, category: 'engagement', type: 'image', title: 'Engagement Ceremony', description: 'The day we officially got engaged' },
    { id: 3, category: 'ceremonies', type: 'video', title: 'Haldi Highlights', description: 'Fun moments from the Haldi ceremony' },
    { id: 4, category: 'prewedding', type: 'image', title: 'Romantic Moments', description: 'Candid shots from our photo session' },
    { id: 5, category: 'family', type: 'image', title: 'Family Gathering', description: 'Both families coming together' },
    { id: 6, category: 'ceremonies', type: 'image', title: 'Mehendi Night', description: 'Beautiful henna designs and celebrations' },
    { id: 7, category: 'ceremonies', type: 'video', title: 'Sangeet Performances', description: 'Dance performances from sangeet night' },
    { id: 8, category: 'family', type: 'image', title: 'Blessing Moments', description: 'Receiving blessings from elders' },
    { id: 9, category: 'prewedding', type: 'image', title: 'Traditional Attire', description: 'Dressed in traditional wedding outfits' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 px-6 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-serif">
            Photo & Video Gallery
          </h2>
          <p className="text-lg text-rose-700 max-w-2xl mx-auto mb-8">
            Relive the beautiful moments from our journey together through these carefully curated photos and videos.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                    : "border-rose-600 text-rose-600 hover:bg-rose-50"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-rose-200 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center cursor-pointer"
                     onClick={() => item.type === 'image' && setLightboxImage(item.title)}>
                  {item.type === 'image' ? (
                    <Camera className="h-16 w-16 text-rose-400 group-hover:text-rose-600 transition-colors" />
                  ) : (
                    <Play className="h-16 w-16 text-rose-400 group-hover:text-rose-600 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Note about actual content */}
        <div className="mt-12 text-center">
          <Card className="border-rose-200 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <Camera className="h-8 w-8 text-rose-600 mx-auto mb-4" />
              <p className="text-rose-700 italic">
                High-resolution photos and videos from our wedding celebrations will be added here. 
                Stay tuned for beautiful memories from our special day!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 aspect-video flex items-center justify-center rounded-lg">
              <div className="text-center text-rose-700">
                <Camera className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{lightboxImage}</h3>
                <p className="text-sm opacity-75 mt-2">Photo will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}