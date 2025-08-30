import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageStruct } from "./types";

// Memory Image Gallery Component
function MemoryImageGallery({ images, authorName, isMobile }: { images: string[]; authorName: string; isMobile?: boolean }) {
  if (images.length === 0) return null;

  // Multiple images - horizontal scroll with controlled height
  const imageWidth = images.length === 1 ? 'w-60' : (images.length > 3 ? 'w-40' : 'w-48'); // Show 2.5 images if more than 3
  
  return (
    <div className={`w-full min-w-0 ${isMobile ? "-mx-4" : ""}`}>
      <div className={`flex gap-4 overflow-x-auto scrollbar-hide pb-2 w-full ${isMobile ? "px-4" : ""}`}>
        {images.map((imageUrl, index) => (
          <div 
            key={index} 
            className={`${imageWidth} flex-shrink-0 rounded-lg overflow-hidden`}
          >
            <img
              src={imageUrl}
              alt={`Photo ${index + 1} by ${authorName}`}
              className="w-full h-32 md:h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Memory Card Avatar Component
function MemoryCardAvatar({ memory, isMobile }: { memory: MessageStruct; isMobile: boolean }) {
  return (
    <Avatar className={`${isMobile ? "h-10 w-10" : "h-12 w-12"} flex-shrink-0`}>
      {memory.thumbnailPic ? (
        <AvatarImage src={memory.thumbnailPic} alt={memory.name} />
      ) : null}
      <AvatarFallback className="bg-rose-100 text-rose-600 font-semibold">
        {memory.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

// Memory Card Header Component
function MemoryCardHeader({ memory, isMobile }: { memory: MessageStruct; isMobile: boolean }) {
  return (
    <div className={`flex ${isMobile ? "flex-col space-y-1" : "items-center justify-between"} mb-2`}>
      <h4 className={`font-semibold text-rose-800 ${isMobile ? "text-sm" : "text-base"}`}>
        {memory.name}
      </h4>
      <span className={`${isMobile ? "text-xs" : "text-sm"} text-rose-500 ${isMobile ? "" : "flex-shrink-0"}`}>
        {memory.date}
      </span>
    </div>
  );
}

// Memory Card Message Component
function MemoryCardMessage({ message, isMobile }: { message: string; isMobile: boolean }) {
  return (
    <p className={`text-rose-700 leading-relaxed mb-3 ${isMobile ? "text-sm" : "text-base"}`}>
      {message}
    </p>
  );
}

// Memory Card Content Component
function MemoryCardContent({ memory, isMobile }: { memory: MessageStruct; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div className="flex-1 min-w-0">
        <MemoryCardHeader memory={memory} isMobile={isMobile} />
        <MemoryCardMessage message={memory.message} isMobile={isMobile} />
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <MemoryCardHeader memory={memory} isMobile={isMobile} />
      <MemoryCardMessage message={memory.message} isMobile={isMobile} />
      <MemoryImageGallery images={memory.images} authorName={memory.name} isMobile={isMobile} />
    </div>
  );
}

// Main Memory Card Component
export default function MemoryCard({ memory }: { memory: MessageStruct }) {
  const isMobile = useIsMobile();
  
  return (
    <Card className="border-rose-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <CardContent className={isMobile ? "p-4" : "p-6"}>
        <div className={`flex items-start ${isMobile ? "space-x-3" : "space-x-4"} min-w-0`}>
          <MemoryCardAvatar memory={memory} isMobile={isMobile} />
          <MemoryCardContent memory={memory} isMobile={isMobile} />
        </div>
        {isMobile && (
          <div className="mt-3">
            <MemoryImageGallery images={memory.images} authorName={memory.name} isMobile={isMobile} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}