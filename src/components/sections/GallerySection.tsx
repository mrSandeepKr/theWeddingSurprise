import { useState, useRef, useEffect, useMemo, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";

// Dynamic image loading function
const loadImage = (imageName: string) => {
  return import(`@/assets/${imageName}.webp`).then((module) => module.default);
};

// Image metadata for dynamic loading
const IMAGE_METADATA = {
  couple: Array.from({ length: 21 }, (_, i) => `couple_${i + 1}`),
  family: Array.from({ length: 8 }, (_, i) => `family_${i + 1}`),
  preWedding: Array.from({ length: 1 }, (_, i) => `pre_wedding_${i + 1}`),
};

interface MasterImage {
  image: string;
  category: "couple" | "family" | "preWedding";
  loaded?: boolean;
}

// Lazy load gallery components
const LazyGalleryCarousel = lazy(() => import("./GalleryCarousel"));
const LazyImageModal = lazy(() => import("./ImageModal"));

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-rose-100">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
    </div>
  );
}

// Category Filter Component
interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const categories = [
    { key: "all", label: "All Photos", emoji: "💕" },
    { key: "couple", label: "Couple", emoji: "👫" },
    { key: "family", label: "Family", emoji: "👨‍👩‍👧‍👦" },
    { key: "preWedding", label: "Pre-Wedding", emoji: "💍" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <Button
          key={category.key}
          variant={activeCategory === category.key ? "default" : "outline"}
          onClick={() => onCategoryChange(category.key)}
          className={`px-6 py-3 rounded-full transition-all duration-300 ${
            activeCategory === category.key
              ? "bg-wedding-sindoor-700 hover:bg-rose-700 text-white md:h-14 rounded-xl md:px-8 text-base"
              : "border-rose-600 text-rose-600 hover:bg-rose-50 md:h-14 rounded-xl md:px-8 text-base"
          }`}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
        </Button>
      ))}
    </div>
  );
}

// Gallery Header Component
function GalleryHeader() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-playfair">
        Our Gallery
      </h2>
      <p className="text-lg text-rose-700 max-w-2xl mx-auto font-crimson">
        Capturing the beautiful moments of our journey together. Each photo
        tells a story of love, laughter, and the memories we've created.
      </p>
    </motion.div>
  );
}

// Main Gallery Section Component
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Map<string, string>>(
    new Map(),
  );

  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Dynamically create master images with lazy loading
  const masterImages = useMemo(() => {
    const images: MasterImage[] = [];

    Object.entries(IMAGE_METADATA).forEach(([category, imageNames]) => {
      imageNames.forEach((imageName) => {
        const imageUrl = loadedImages.get(imageName);
        if (imageUrl) {
          images.push({
            image: imageUrl,
            category: category as "couple" | "family" | "preWedding",
            loaded: true,
          });
        } else {
          // Placeholder for unloaded images
          images.push({
            image: "", // Will be loaded dynamically
            category: category as "couple" | "family" | "preWedding",
            loaded: false,
          });
        }
      });
    });

    return images;
  }, [loadedImages]);

  // Load images dynamically when component mounts
  useEffect(() => {
    const loadImagesAsync = async () => {
      const imagePromises = Object.entries(IMAGE_METADATA).flatMap(
        ([category, imageNames]) =>
          imageNames.map(async (imageName) => {
            try {
              const imageUrl = await loadImage(imageName);
              return { imageName, imageUrl };
            } catch (error) {
              console.warn(`Failed to load image: ${imageName}`);
              return null;
            }
          }),
      );

      const results = await Promise.allSettled(imagePromises);
      const newLoadedImages = new Map();

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          const { imageName, imageUrl } = result.value;
          newLoadedImages.set(imageName, imageUrl);
        }
      });

      setLoadedImages(newLoadedImages);
    };

    loadImagesAsync();
  }, []);

  const filteredImages = masterImages.filter((image) => {
    if (activeCategory === "all") {
      return image.loaded && image.category !== "preWedding";
    }
    return activeCategory === image.category && image.loaded;
  });
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleImageError = (imageSrc: string) => {
    setImageErrors((prev) => new Set([...prev, imageSrc]));
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageSrc);
      return newSet;
    });
  };

  const handleImageLoad = (imageSrc: string) => {
    setImageLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(imageSrc);
      return newSet;
    });
  };

  const handleImageLoadStart = (imageSrc: string) => {
    setImageLoading((prev) => new Set([...prev, imageSrc]));
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section
      id="gallery"
      className="py-20 px-6 bg-gradient-to-br from-orange-50 to-rose-50"
    >
      <div className="max-w-full mx-auto md:px-10">
        <GalleryHeader />
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <Suspense fallback={<LoadingSpinner />}>
          {filteredImages.length === 1 ? (
            <SingleImageDisplay
              image={filteredImages[0]}
              imageLoading={imageLoading}
              onImageClick={handleImageClick}
              onImageLoadStart={handleImageLoadStart}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
            />
          ) : (
            // Multiple images - show carousel
            <LazyGalleryCarousel
              images={filteredImages}
              imageErrors={imageErrors}
              imageLoading={imageLoading}
              onImageClick={handleImageClick}
              onImageLoadStart={handleImageLoadStart}
              onImageLoad={handleImageLoad}
              onImageError={handleImageError}
              autoplay={autoplay}
            />
          )}
        </Suspense>

        {selectedImage && (
          <Suspense fallback={null}>
            <LazyImageModal
              imageSrc={selectedImage}
              onClose={() => setSelectedImage(null)}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}

// Single Image Display Component
interface SingleImageDisplayProps {
  image: MasterImage;
  imageLoading: Set<string>;
  onImageClick: (imageSrc: string) => void;
  onImageLoadStart: (imageSrc: string) => void;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
}

function SingleImageDisplay({
  image,
  imageLoading,
  onImageClick,
  onImageLoadStart,
  onImageLoad,
  onImageError,
}: SingleImageDisplayProps) {
  return (
    <div className="flex justify-center items-center min-h-[60vh] py-8">
      <div className="relative max-w-2xl w-full">
        <img
          src={image.image}
          alt="Gallery image"
          className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105"
          onLoadStart={() => onImageLoadStart(image.image)}
          onLoad={() => onImageLoad(image.image)}
          onError={() => onImageError(image.image)}
        />
        {imageLoading.has(image.image) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}