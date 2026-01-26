"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { fetchAllSolutions, Solution } from "@/lib/fetch-solutions";

export function SolutionsCarousel() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllSolutions();
        // Sort by index to ensure carousel matches the Solutions Grid order
        const sortedData = data.sort((a, b) => (a.index || 0) - (b.index || 0));
        setSolutions(sortedData);
      } catch (err) {
        console.error("Error fetching carousel data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSolutions();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Items per page logic
  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(solutions.length / itemsPerPage);
  const startIdx = currentPage * itemsPerPage;
  const currentItems = solutions.slice(startIdx, startIdx + itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  /**
   * NAVIGATION LOGIC
   * This matches the useEffect inside your SolutionsContent component
   * which looks for the "scrollTo" param.
   */
  const goToSolutionPage = (index: number) => {
    router.push(`/solutions?scrollTo=${index}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black rounded-lg">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (solutions.length === 0) return null;

  return (
    <div className="space-y-6 sm:space-y-8 bg-black px-4 sm:px-6 lg:px-8 py-8 sm:py-12 rounded-lg">
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="hidden md:flex flex-shrink-0 bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 flex-1 w-full max-w-5xl">
          {currentItems.map((sol) => (
            <div
              key={sol.id}
              onClick={() => goToSolutionPage(sol.index)}
              className="cursor-pointer group relative overflow-hidden rounded-xl border border-white/20 hover:border-accent transition-all duration-300"
            >
              <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-gray-900">
                <Image
                  src={`/images/index${sol.index}.png`}
                  alt={sol.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {sol.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2">
                  {sol.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="hidden md:flex flex-shrink-0 bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentPage ? "bg-accent w-8" : "bg-white/30 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
