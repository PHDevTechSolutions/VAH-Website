"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Solution {
  id: string;
  title: string;
  description: string;
  mainImage: string;
}

export function SolutionsCarousel() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "solutions"));
        const solutionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "",
          description: doc.data().description || "",
          mainImage: doc.data().mainImage || "/placeholder.svg",
        }));
        setSolutions(solutionsData);
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
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-black rounded-lg">
        <Loader2 className="w-8 h-8 text-[#d9b98e] animate-spin" />
      </div>
    );
  }

  if (solutions.length === 0) return null;

  return (
    <div className="space-y-6 sm:space-y-8 bg-black px-4 sm:px-6 lg:px-8 py-8 sm:py-12 rounded-lg">
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* Nav Buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="hidden md:flex flex-shrink-0 bg-[#d9b98e]/20 hover:bg-[#d9b98e]/30 border border-[#d9b98e]/50 text-[#d9b98e] p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 flex-1 w-full max-w-5xl">
          {currentItems.map((sol) => (
            <Link
              href={`/solutions/${sol.id}`}
              key={sol.id}
              className="group relative overflow-hidden rounded-xl border border-white/20 hover:border-[#d9b98e] transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-gray-900">
                <Image
                  src={sol.mainImage}
                  alt={sol.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 group-hover:text-[#d9b98e] transition-colors uppercase tracking-tight">
                  {sol.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2">
                  {sol.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="hidden md:flex flex-shrink-0 bg-[#d9b98e]/20 hover:bg-[#d9b98e]/30 border border-[#d9b98e]/50 text-[#d9b98e] p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30"
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
              idx === currentPage ? "bg-[#d9b98e] w-8" : "bg-white/30 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}