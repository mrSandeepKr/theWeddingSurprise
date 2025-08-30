import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Pagination Controls Component
function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
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
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
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

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-rose-400">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page as number)}
            className={
              currentPage === page
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
            }
          >
            {page}
          </Button>
        ),
      )}

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
  memoriesPerPage,
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

export { PaginationControls, ResultsSummary };
