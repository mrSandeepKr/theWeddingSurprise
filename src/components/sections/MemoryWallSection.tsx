import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, ChevronLeft, ChevronRight } from "lucide-react";
import Papa from 'papaparse';
import memoryWallBg from '@/assets/memory_wall_background.jpeg';

interface MessageStruct {
  id: number;
  name: string;
  message: string;
  thumbnailPic?: string;
  images: string[];
  date: string;
}

interface CSVRow {
  "Timestamp": string;
  "Name to Show (Please be nice XD)": string;
  "Message": string;
  "Pictures (Optional)": string;
  "Display Picture (Optional)": string;
  "Approved": string;
}

// Header Component
function MemoryWallHeader() {
  const handleShareMessage = () => {
    window.open('https://forms.gle/JiTvouwuuEdZavgy7', '_blank');
  };

  return (
    <div className="relative z-10 text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair drop-shadow-lg">
        Memory Wall
      </h2>
      <p className="text-lg text-white max-w-2xl mx-auto mb-8 font-crimson drop-shadow-md">
        Share your wishes, memories, and blessings.
        Your messages mean the world to us!
      </p>

      <div className="flex justify-center">
        <Button
          onClick={handleShareMessage}
          className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 shadow-lg"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Share a Message
        </Button>
      </div>
    </div>
  );
}

// Memory Image Gallery Component
function MemoryImageGallery({ images, authorName }: { images: string[]; authorName: string }) {
  if (images.length === 0) return null;

  // Single image - let it adjust to natural height
  if (images.length === 1) {
    return (
      <div className="mb-4">
        <div className="rounded-lg overflow-hidden">
          <img
            src={images[0]}
            alt={`Photo by ${authorName}`}
            className="w-full object-cover hover:scale-105 transition-transform cursor-pointer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </div>
    );
  }

  // Multiple images - horizontal scroll with controlled height
  const imageWidth = images.length > 3 ? 'w-40' : 'w-48'; // Show 2.5 images if more than 3
  
  return (
    <div className="mb-4 w-full min-w-0"> {/* Added min-w-0 to allow shrinking */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 w-full">
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

// Memory Card Component
function MemoryCard({ memory }: { memory: MessageStruct }) {
  return (
    <Card className="border-rose-200 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"> {/* Added overflow-hidden to card */}
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 min-w-0"> {/* Added min-w-0 */}
          <Avatar className="h-12 w-12 flex-shrink-0"> {/* Added flex-shrink-0 */}
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
          <div className="flex-1 min-w-0"> {/* Added min-w-0 to allow proper shrinking */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-rose-800">
                {memory.name}
              </h4>
              <span className="text-sm text-rose-500 flex-shrink-0"> {/* Added flex-shrink-0 */}
                {memory.date}
              </span>
            </div>

            <p className="text-rose-700 leading-relaxed mb-3">
              {memory.message}
            </p>

            <MemoryImageGallery images={memory.images} authorName={memory.name} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <section id="memory-wall" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
        <p className="mt-4 text-rose-600">Loading memories...</p>
      </div>
    </section>
  );
}

// Error State Component
function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <section id="memory-wall" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={onRetry} className="bg-rose-600 hover:bg-rose-700 text-white">
          Try Again
        </Button>
      </div>
    </section>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-rose-600 text-lg">No approved memories yet. Be the first to share!</p>
    </div>
  );
}

// Moderation Notice Component
function ModerationNotice() {
  return (
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
  );
}

// Pagination Component
function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void; 
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={index} className="px-2 text-rose-400">...</span>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={currentPage === page 
              ? "bg-rose-600 hover:bg-rose-700 text-white" 
              : "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
            }
          >
            {page}
          </Button>
        )
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Results Summary Component
function ResultsSummary({ 
  currentPage, 
  totalPages, 
  totalMemories, 
  memoriesPerPage 
}: { 
  currentPage: number; 
  totalPages: number; 
  totalMemories: number; 
  memoriesPerPage: number; 
}) {
  const startIndex = (currentPage - 1) * memoriesPerPage + 1;
  const endIndex = Math.min(currentPage * memoriesPerPage, totalMemories);
  
  if (totalMemories === 0) return null;
  
  return (
    <div className="text-center mb-8">
      <p className="text-rose-600 text-sm">
        Showing {startIndex}-{endIndex} of {totalMemories} memories
      </p>
    </div>
  );
}

// Main Component
export default function MemoryWallSection() {
  const [memories, setMemories] = useState<MessageStruct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const memoriesPerPage = 7
  const totalPages = Math.ceil(memories.length / memoriesPerPage);
  const startIndex = (currentPage - 1) * memoriesPerPage;
  const endIndex = startIndex + memoriesPerPage;
  const currentMemories = memories.slice(startIndex, endIndex);

  // Function to convert Google Drive URL to viewable format
  const convertGoogleDriveUrl = (urlString: string): string => {
    // Otherwise try to extract from ?id= style
    const url = new URL(urlString);
    const fileId = url.searchParams.get("id");
    if (fileId) {
      return `https://drive.google.com/thumbnail?id=${fileId}`
    }

    throw new Error("Invalid Google Drive URL");
  };

  // Function to parse CSV data
  const parseCSV = (csvText: string): CSVRow[] => {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => value.trim()
    });
    
    if (result.errors.length > 0) {
      console.error('CSV parsing errors:', result.errors);
    }
    
    return result.data as CSVRow[];
  };

  // Function to format timestamp and determine if it should show "Recently"
  const formatTimestamp = (timestamp: string): string => {
    try {
      // Parse the timestamp format: "8/30/2025 19:47:56"
      const date = new Date(timestamp);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return 'Recently';
      }
      
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      
      // If less than 2 days, show "Recently"
      if (diffInDays < 2) {
        return 'Recently';
      }
      
      // Otherwise, format the date nicely
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error parsing timestamp:', error);
      return 'Recently';
    }
  };

  // Function to fetch and process CSV data
  const fetchMemories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSDur-hVADdtcLTMwwTqkzqcrBOPwfMdQjpo4BDsyltiniqAEkm9ZquqjElrCmvHVDzHVyn1tzAyjYG/pub?gid=1961168836&single=true&output=csv',
        {
          cache: 'no-store'
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch CSV data');
      }
      const csvText = await response.text();
      const csvRows = parseCSV(csvText);
      
      // Filter only approved rows
      const approvedRows = csvRows.filter(row => 
        row.Approved && row.Approved.trim().toLowerCase() === 'y' || 
        row.Approved && row.Approved.trim().toLowerCase() === 'Y' 
      );

      // Transform to MessageStruct format
      const transformedMemories: MessageStruct[] = approvedRows.map((row, index) => {
        const images = row["Pictures (Optional)"] 
          ? row["Pictures (Optional)"].split(',').map(url => convertGoogleDriveUrl(url.trim())).filter(url => url)
          : [];
        
        const thumbnailPic = row["Display Picture (Optional)"] 
          ? convertGoogleDriveUrl(row["Display Picture (Optional)"].trim())
          : undefined;

        return {
          id: index + 1,
          name: row["Name to Show (Please be nice XD)"] || 'Anonymous',
          message: row["Message"] || '',
          thumbnailPic,
          images,
          date: formatTimestamp(row.Timestamp) // Use the new formatting function
        };
      });

      console.log(transformedMemories)

      setMemories(transformedMemories);
      setError(null);
    } catch (err) {
      console.error('Error fetching memories:', err);
      setError('Failed to load memories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of memory wall section
    document.getElementById('memory-wall')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Reset to page 1 when memories change
  useEffect(() => {
    setCurrentPage(1);
  }, [memories.length]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchMemories} />;
  }

  return (
    <section id="memory-wall" className="relative py-20 px-6 bg-white overflow-hidden">
      {/* Background Image with Blur Effect */}
        <div className="absolute h-96 inset-0 w-full">
        <div 
          className="w-full h-96 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${memoryWallBg})`,
          }}
        />
        {/* Gradient overlay for blur effect at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        {/* Additional blur overlay at bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <MemoryWallHeader />

        {memories.length > 0 && (
          <ResultsSummary 
            currentPage={currentPage}
            totalPages={totalPages}
            totalMemories={memories.length}
            memoriesPerPage={memoriesPerPage}
          />
        )}

        <div className="space-y-6">
          {currentMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>

        {memories.length === 0 && <EmptyState />}
        
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        
        <ModerationNotice />
      </div>
    </section>
  );
}
