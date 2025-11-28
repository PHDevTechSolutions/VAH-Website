"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SolutionsSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const solutions = [
    {
      label: "OUR SOLUTIONS",
      title: "BUILDCHEM HP Series",
      description: "EXTENDED WORKABILITY RETENTION, COHESIVE CONCRETE, OPTIMIZED PLACEMENT",
      image: "/concrete-aggregate.jpg",
    },
    {
      label: "OUR SOLUTIONS",
      title: "BUILDCHEM Premium Blend",
      description: "ENHANCED DURABILITY, SUPERIOR PERFORMANCE, SUSTAINABLE FORMULATION",
      image: "/concrete-aggregate.jpg",
    },
    {
      label: "OUR SOLUTIONS",
      title: "BUILDCHEM Eco Series",
      description: "ENVIRONMENTALLY FRIENDLY, REDUCED CARBON FOOTPRINT, RELIABLE STRENGTH",
      image: "/concrete-aggregate.jpg",
    },
  ]

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % solutions.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + solutions.length) % solutions.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = solutions[activeSlide]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden bg-gray-900 h-96 md:h-96 group">
          {/* Background image */}
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover opacity-40" />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-12">
            <div className="mb-4 inline-block px-4 py-2 bg-white/20 rounded-full">
              <span className="text-white text-sm font-semibold">{slide.label}</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h3>
            <p className="text-white/90 mb-8 max-w-lg">{slide.description}</p>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2">Find Out More</Button>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSlide ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
