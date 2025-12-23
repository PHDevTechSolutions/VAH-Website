"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SolutionsCarouselItem {
  index: number
  title: string
  description: string
  image: string
}

const applications: SolutionsCarouselItem[] = [
  {
    index: 1,
    title: "Superplasticizers & High-Range Water Reducers",
    description:
      "Enhance concrete flow, reduce water-cement ratio, and achieve superior strength with our HP, PC, and SI series. Perfect for ready-mix, precast, high-performance, and fiber-reinforced concrete.",
    image: "/images/index1.png",
  },
  {
    index: 2,
    title: "Set Retarders & Accelerators",
    description:
      "Control setting times, improve workability, and ensure high early strength with our retarder and accelerator products. Perfect for remote job sites, high traffic areas, and temperature-sensitive applications.",
    image: "/images/index2.png",
  },
  {
    index: 3,
    title: "Underwater Concrete Solutions",
    description:
      "Maintain concrete integrity in extreme underwater conditions with our UW series. Prevent washout while preserving workability, pumpability, and placement.",
    image: "/images/index3.png",
  },
  {
    index: 4,
    title: "Waterproofing Solutions",
    description:
      "Chloride-free waterproofing products to prevent water ingress, enhance durability, and strengthen concrete surfaces.",
    image: "/images/index4.png",
  },
  {
    index: 5,
    title: "Soil Stabilization & Road Foundation",
    description:
      "Strengthen soil and road foundations using polymer-based stabilization technology. Achieve higher durability, load capacity, and resistance to water and erosion.",
    image: "/images/index5.png",
  },
  {
    index: 6,
    title: "Mould Release Agents",
    description:
      "Chemicals applied to formwork surfaces to prevent fresh concrete from sticking, ensuring smooth, defect-free finishes and reducing cleaning time for molds.",
    image: "/images/index6.png",
  },
  {
    index: 7,
    title: "Corrosion Protection Solutions",
    description:
      "Admixtures formulated to protect reinforcing steel from chloride attack and deterioration, extending the structural lifespan of concrete exposed to harsh environments.",
    image: "/images/index7.png",
  },
  {
    index: 8,
    title: "Curing Compounds",
    description:
      "Moisture-retaining coatings designed to control water loss in fresh concrete, promoting proper hydration, reducing cracking, and improving long-term strength.",
    image: "/images/index8.png",
  },
  {
    index: 9,
    title: "Cement Processing & Grinding Aids",
    description:
      "Additives used during cement production to improve milling efficiency, prevent agglomeration, and enhance early and final strength development.",
    image: "/images/index9.png",
  },
  {
    index: 10,
    title: "Cleaning & Surface Preparation Chemicals",
    description:
      "Specialized cleaners engineered to remove cement residue, efflorescence, and contaminants, preparing surfaces for coatings, repairs, or finishing.",
    image: "/images/index10.png",
  },
]

export function SolutionsCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => {
        const totalPages = Math.ceil(applications.length / (isMobile ? 1 : 2))
        return (prev + 1) % totalPages
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile])

  const itemsPerPage = isMobile ? 1 : 2
  const totalPages = Math.ceil(applications.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const currentItems = applications.slice(startIdx, startIdx + itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="space-y-6 sm:space-y-8 bg-black px-4 sm:px-6 lg:px-8 py-8 sm:py-12 rounded-lg">
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="hidden md:flex flex-shrink-0 bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 flex-1 w-full max-w-5xl">
          {currentItems.map((app) => (
            <div
              key={app.index}
              className="group relative overflow-hidden rounded-xl border border-white/20 hover:border-accent transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-gray-900">
                <Image
                  src={app.image || "/placeholder.svg?height=288&width=400"}
                  alt={app.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors line-clamp-2">
                  {app.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 line-clamp-2 sm:line-clamp-3 group-hover:text-white transition-colors">
                  {app.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="hidden md:flex flex-shrink-0 bg-accent/20 hover:bg-accent/30 border border-accent/50 text-accent p-2.5 sm:p-3 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
          aria-label="Next page"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 sm:gap-4">
        {/* Page Indicator */}
        <div className="text-white text-xs sm:text-sm font-medium tracking-wide">
          {currentPage + 1} / {totalPages}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-accent w-7 h-2.5 sm:w-8 sm:h-3"
                  : "bg-white/30 hover:bg-white/50 w-2.5 h-2.5 sm:w-3 sm:h-3"
              }`}
              aria-label={`Go to page ${index + 1}`}
              aria-current={index === currentPage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
