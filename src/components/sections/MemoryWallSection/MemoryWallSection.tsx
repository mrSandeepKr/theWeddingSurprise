import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Papa from "papaparse";
import memoryWallBg from "@/assets/memory_wall_background.jpeg";
import MemoryCard from "./MemoryCard";
import { PaginationControls, ResultsSummary } from "./Pagination";
import { MessageStruct, CSVRow } from "./types";
import BackgroundWithBlur from "../../BackgroundWithBlur";

// Header Component
function MemoryWallHeader() {
  const handleShareMessage = () => {
    window.open("https://forms.gle/JiTvouwuuEdZavgy7", "_blank");
  };

  return (
    <div className="relative z-10 text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-playfair drop-shadow-lg">
        Memory Wall
      </h2>
      <p className="text-lg text-white max-w-2xl mx-auto mb-8 font-crimson drop-shadow-md">
        Share your wishes, memories, and blessings. Your messages mean the world
        to us!
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
function ErrorState({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <section id="memory-wall" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          onClick={onRetry}
          className="bg-rose-600 hover:bg-rose-700 text-white"
        >
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
      <p className="text-rose-600 text-lg">
        No approved memories yet. Be the first to share!
      </p>
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
            All messages and photos are moderated before appearing on the memory
            wall. Thank you for keeping this space positive and joyful! ✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Component
export default function MemoryWallSection() {
  const [memories, setMemories] = useState<MessageStruct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const memoriesPerPage = 7;
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
      return `https://drive.google.com/thumbnail?id=${fileId}`;
    }

    throw new Error("Invalid Google Drive URL");
  };

  // Function to parse CSV data
  const parseCSV = (csvText: string): CSVRow[] => {
    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => value.trim(),
    });

    if (result.errors.length > 0) {
      console.error("CSV parsing errors:", result.errors);
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
        return "Recently";
      }

      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      // If less than 2 days, show "Recently"
      if (diffInDays < 2) {
        return "Recently";
      }

      // Otherwise, format the date nicely
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error parsing timestamp:", error);
      return "Recently";
    }
  };

  // Function to fetch and process CSV data
  const fetchMemories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSDur-hVADdtcLTMwwTqkzqcrBOPwfMdQjpo4BDsyltiniqAEkm9ZquqjElrCmvHVDzHVyn1tzAyjYG/pub?gid=1961168836&single=true&output=csv",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch CSV data");
      }
      const csvText = await response.text();
      const csvRows = parseCSV(csvText);

      // Filter only approved rows
      const approvedRows = csvRows.filter(
        (row) =>
          (row.Approved && row.Approved.trim().toLowerCase() === "y") ||
          (row.Approved && row.Approved.trim().toLowerCase() === "Y"),
      );

      // Transform to MessageStruct format
      const transformedMemories: MessageStruct[] = approvedRows.map(
        (row, index) => {
          const images = row["Pictures (Optional)"]
            ? row["Pictures (Optional)"]
                .split(",")
                .map((url) => convertGoogleDriveUrl(url.trim()))
                .filter((url) => url)
            : [];

          const thumbnailPic = row["Display Picture (Optional)"]
            ? convertGoogleDriveUrl(row["Display Picture (Optional)"].trim())
            : undefined;

          return {
            id: index + 1,
            name: row["Name to Show (Please be nice XD)"] || "Anonymous",
            message: row["Message"] || "",
            thumbnailPic,
            images,
            date: formatTimestamp(row.Timestamp), // Use the new formatting function
          };
        },
      );

      setMemories(transformedMemories);
      setError(null);
    } catch (err) {
      console.error("Error fetching memories:", err);
      setError("Failed to load memories. Please try again later.");
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
    document.getElementById("memory-wall")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
    <section
      id="memory-wall"
      className="relative py-20 px-6 bg-white overflow-hidden"
    >
      {/* Background Image with Blur Effect */}
      <BackgroundWithBlur backgroundImageUrl={memoryWallBg} />

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
