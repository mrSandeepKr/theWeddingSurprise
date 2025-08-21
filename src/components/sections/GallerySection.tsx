import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, useInView } from "framer-motion";
import { X } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Direct imports for all images
import couple1 from "@/assets/couple_1.webp";
import couple2 from "@/assets/couple_2.webp";
import couple3 from "@/assets/couple_3.webp";
import couple4 from "@/assets/couple_4.webp";
import couple5 from "@/assets/couple_5.webp";
import couple6 from "@/assets/couple_6.webp";
import couple7 from "@/assets/couple_7.webp";
import couple8 from "@/assets/couple_8.webp";
import couple9 from "@/assets/couple_9.webp";
import couple10 from "@/assets/couple_10.webp";
import couple11 from "@/assets/couple_11.webp";
import couple12 from "@/assets/couple_12.webp";
import couple13 from "@/assets/couple_13.webp";
import couple14 from "@/assets/couple_14.webp";
import couple15 from "@/assets/couple_15.webp";
import couple16 from "@/assets/couple_16.webp";
import couple17 from "@/assets/couple_17.webp";
import couple18 from "@/assets/couple_18.webp";
import couple19 from "@/assets/couple_19.webp";
import couple20 from "@/assets/couple_20.webp";
import couple21 from "@/assets/couple_21.webp";
import couple22 from "@/assets/couple_22.webp";
import couple23 from "@/assets/couple_23.webp";
import couple24 from "@/assets/couple_24.webp";
import family1 from "@/assets/family_1.webp";
import family2 from "@/assets/family_2.webp";
import family3 from "@/assets/family_3.webp";
import family4 from "@/assets/family_4.webp";
import family5 from "@/assets/family_5.webp";
import family6 from "@/assets/family_6.webp";
import family7 from "@/assets/family_7.webp";
import preWedding1 from "@/assets/pre_wedding_1.webp";
import preWedding2 from "@/assets/pre_wedding_2.webp";

// Types and Constants
const CATEGORIES = [
  "All Photos",
  "US",
  "Pre-Wedding",
  "Family Moments",
] as const;

type Category = (typeof CATEGORIES)[number];
type SpecificCategory = Exclude<Category, "All Photos">;
type MasterImage = { image: string; category: SpecificCategory };

const masterImages: MasterImage[] = [
  // US (Couple) photos
  { image: couple1, category: "US" },
  { image: couple2, category: "US" },
  { image: couple3, category: "US" },
  { image: couple4, category: "US" },
  { image: couple5, category: "US" },
  { image: couple6, category: "US" },
  { image: couple7, category: "US" },
  { image: couple8, category: "US" },
  { image: couple9, category: "US" },
  { image: couple10, category: "US" },
  { image: couple11, category: "US" },
  { image: couple12, category: "US" },
  { image: couple13, category: "US" },
  { image: couple14, category: "US" },
  { image: couple15, category: "US" },
  { image: couple16, category: "US" },
  { image: couple17, category: "US" },
  { image: couple18, category: "US" },
  { image: couple19, category: "US" },
  { image: couple20, category: "US" },
  { image: couple21, category: "US" },
  { image: couple22, category: "US" },
  { image: couple23, category: "US" },
  { image: couple24, category: "US" },
  // Pre-Wedding photos
  { image: preWedding1, category: "Pre-Wedding" },
  { image: preWedding2, category: "Pre-Wedding" },
  // Family photos
  { image: family1, category: "Family Moments" },
  { image: family2, category: "Family Moments" },
  { image: family3, category: "Family Moments" },
  { image: family4, category: "Family Moments" },
  { image: family5, category: "Family Moments" },
  { image: family6, category: "Family Moments" },
  { image: family7, category: "Family Moments" },
];

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-rose-100">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
    </div>
  );
}

// Error Placeholder Component
function ErrorPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-rose-400 p-4">
      <div className="text-4xl mb-2">📷</div>
      <p className="text-sm text-center">Image not available</p>
    </div>
  );
}

// Hover Overlay Component
function HoverOverlay() {
  return (
    <div className="absolute inset-0 bg-red-100 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-sm font-medium">Click to enlarge</span>
      </div>
    </div>
  );
}

// Gallery Item Component
interface GalleryItemProps {
  item: MasterImage;
  idx: number;
  isLoading: boolean;
  hasError: boolean;
  onImageClick: (imageSrc: string) => void;
  onImageLoadStart: (imageSrc: string) => void;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
}

function GalleryItem({
  item,
  idx,
  isLoading,
  hasError,
  onImageClick,
  onImageLoadStart,
  onImageLoad,
  onImageError,
}: GalleryItemProps) {
  return (
    <CarouselItem className="rounded-2xl pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <motion.div
        className="p-1"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div
          className="relative flex h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] items-center justify-center rounded-2xl shadow-sm cursor-pointer overflow-hidden group"
          onClick={() => !hasError && onImageClick(item.image)}
        >
          {isLoading && <LoadingSpinner />}

          {hasError ? (
            <ErrorPlaceholder />
          ) : (
            <img
              src={item.image}
              alt={`${item.category} ${idx + 1}`}
              className="w-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onLoadStart={() => onImageLoadStart(item.image)}
              onLoad={() => onImageLoad(item.image)}
              onError={() => onImageError(item.image)}
              style={{
                opacity: isLoading ? 0 : 1,
                transition: "opacity 0.3s ease-in-out",
              }}
            />
          )}

          {!hasError && <HoverOverlay />}
        </div>
      </motion.div>
    </CarouselItem>
  );
}

// Category Filter Component
interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "default" : "outline"}
          onClick={() => onCategoryChange(cat)}
          className={`${
            selectedCategory === cat
              ? "bg-wedding-sindoor-700 hover:bg-rose-700 text-white md:h-14 rounded-md md:px-8 text-base"
              : "border-rose-600 text-rose-600 hover:bg-rose-50 md:h-14 rounded-md md:px-8 text-base"
          }`}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}

// Gallery Carousel Component
interface GalleryCarouselProps {
  images: MasterImage[];
  imageErrors: Set<string>;
  imageLoading: Set<string>;
  onImageClick: (imageSrc: string) => void;
  onImageLoadStart: (imageSrc: string) => void;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
  autoplay: React.MutableRefObject<any>;
}

function GalleryCarousel({
  images,
  imageErrors,
  imageLoading,
  onImageClick,
  onImageLoadStart,
  onImageLoad,
  onImageError,
  autoplay,
}: GalleryCarouselProps) {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
        align: "start",
        skipSnaps: false,
        dragFree: true,
      }}
      plugins={[autoplay.current]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((item, idx) => {
          const imageKey = `${item.category}-${idx}`;
          const hasError = imageErrors.has(item.image);
          const isLoading = imageLoading.has(item.image);

          return (
            <GalleryItem
              key={imageKey}
              item={item}
              idx={idx}
              isLoading={isLoading}
              hasError={hasError}
              onImageClick={onImageClick}
              onImageLoadStart={onImageLoadStart}
              onImageLoad={onImageLoad}
              onImageError={onImageError}
            />
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex -left-12 hover:bg-rose-100" />
      <CarouselNext className="hidden md:flex -right-12 hover:bg-rose-100" />
    </Carousel>
  );
}

// Image Modal Component
interface ImageModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

function ImageModal({ selectedImage, onClose }: ImageModalProps) {
  if (!selectedImage) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-7xl max-h-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedImage}
          alt="Enlarged view"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Navigation hint */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
          Press ESC to close
        </div>
      </motion.div>
    </motion.div>
  );
}

// Gallery Header Component
function GalleryHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-rose-800 mb-6 font-playfair">
        Gallery
      </h2>
      <p className="text-lg text-rose-700 max-w-2xl mx-auto font-crimson">
        Browse moments from US, Pre-Wedding, and Family celebrations.
      </p>
    </div>
  );
}

// Main Gallery Section Component
export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All Photos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoading, setImageLoading] = useState<Set<string>>(new Set());

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Autoplay plugin for continuous carousel
  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }),
  );

  const imagesToShow =
    selectedCategory === "All Photos"
      ? masterImages
      : masterImages.filter((i) => i.category === selectedCategory);

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
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
    <>
      <section
        id="gallery"
        className="py-16 px-6 bg-gradient-to-br from-rose-50 to-pink-50"
      >
        <motion.div
          ref={sectionRef}
          className="max-w-full mx-auto md:px-10"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GalleryHeader />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <GalleryCarousel
            images={imagesToShow}
            imageErrors={imageErrors}
            imageLoading={imageLoading}
            onImageClick={handleImageClick}
            onImageLoadStart={handleImageLoadStart}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
            autoplay={autoplay}
          />
        </motion.div>
      </section>

      <ImageModal selectedImage={selectedImage} onClose={closeModal} />
    </>
  );
}
