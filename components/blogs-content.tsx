"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function BlogsContent() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Pagination
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const blogPosts = [
    { id: 1, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 2, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 3, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 4, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 5, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 6, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 7, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 8, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 9, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 10, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 11, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 12, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 13, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 14, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 15, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 16, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 17, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
    { id: 18, title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE", description: "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem", category: "BUILDCHEM", image: "/images/blogs.jpg" },
  ];

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentPage(page);
      setIsVisible(true);
    }, 200);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-12"
      style={{ backgroundColor: "#261c12" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Blog Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer rounded-xl overflow-hidden p-4 border bg-[#1e160f]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              style={{ borderColor: "rgba(220, 180, 133, 0.3)" }}
            >
              <div
                className="relative h-64 md:h-72 rounded-lg overflow-hidden mb-6 border bg-black"
                style={{ borderColor: "rgba(220, 180, 133, 0.4)" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-blue-900/80 text-white text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              <h3
                className="text-lg md:text-xl font-bold mb-3 group-hover:opacity-80 transition-colors"
                style={{ color: "#DCB485" }}
              >
                Control the pace and perfect the process.
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "#ffffff" }}>
                {post.description}
              </p>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-2 text-sm rounded-full border disabled:opacity-30 transition"
            style={{ borderColor: "#DCB485", color: "#DCB485" }}
          >
            Previous
          </button>

          {/* Page indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm transition ${
                  currentPage === i + 1
                    ? "bg-[#DCB485] text-black"
                    : "border"
                }`}
                style={{
                  borderColor: currentPage === i + 1 ? "#DCB485" : "#DCB485",
                  color: currentPage === i + 1 ? "#000" : "#DCB485",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-2 text-sm rounded-full border disabled:opacity-30 transition"
            style={{ borderColor: "#DCB485", color: "#DCB485" }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
