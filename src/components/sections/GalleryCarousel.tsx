import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MasterImage {
  image: string;
  category: "couple" | "family" | "preWedding";
  loaded?: boolean;
}

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

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-rose-100">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
    </div>
  );
}

function ErrorPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center text-rose-400 p-4">
      <div className="text-4xl mb-2">📷</div>
      <p className="text-sm text-center">Image not available</p>
    </div>
  );
}

function HoverOverlay() {
  return (
    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
      <div className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
        View Image
      </div>
    </div>
  );
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
}: {
  item: MasterImage;
  idx: number;
  isLoading: boolean;
  hasError: boolean;
  onImageClick: (imageSrc: string) => void;
  onImageLoadStart: (imageSrc: string) => void;
  onImageLoad: (imageSrc: string) => void;
  onImageError: (imageSrc: string) => void;
}) {
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
              decoding="async"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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

export default function GalleryCarousel({
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
