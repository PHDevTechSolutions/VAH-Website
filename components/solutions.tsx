"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Solutions() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/images/solutions.png",
      title: "Superplasticizers & High-Range Water Reducers",
      description: "EXTENDED WORKABILITY RETENTION. COHESIVE CONCRETE. OPTIMIZED PLACEMENT.",
    },
    {
      image: "/images/solutions.png",
      title: "Set Retarders & Accelerators",
      description: "EXTENDED WORKABILITY RETENTION. COHESIVE CONCRETE. OPTIMIZED PLACEMENT.",
    },
    {
      image: "/images/solutions.png",
      title: "Underwater Concrete Solutions",
      description: "EXTENDED WORKABILITY RETENTION. COHESIVE CONCRETE. OPTIMIZED PLACEMENT.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-12" style={{ backgroundColor: "#1a1410" }}>
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="inline-block mb-8">
          <div
            className="px-4 py-2 rounded-full border"
            style={{ borderColor: "rgba(220, 180, 133, 0.5)", backgroundColor: "rgba(220, 180, 133, 0.1)" }}
          >
            <span className="text-sm font-medium uppercase" style={{ color: "#DCB485" }}>
              Our Solutions
            </span>
          </div>
        </div>

        <div className="relative h-96 md:h-screen-2/3 rounded-lg overflow-hidden">
          {/* Image with dim overlay */}
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          {/* Dim overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content overlay - centered text on image */}
          <div className="absolute inset-0 flex flex-col justify-center items-start pl-8 md:pl-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl" style={{ color: "#DCB485" }}>
              {slides[currentSlide].title}
            </h2>

            <p className="text-lg md:text-xl max-w-2xl mb-8" style={{ color: "#ffffff" }}>
              {slides[currentSlide].description}
            </p>


            <Link href="/solutions">
            <button
              className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{ backgroundColor: "#DCB485", color: "#261c12" }}
            >
              Find Out More
            </button>
            </Link>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "rgba(220, 180, 133, 0.2)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="#DCB485" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "rgba(220, 180, 133, 0.2)" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="#DCB485" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: index === currentSlide ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: index === currentSlide ? "#DCB485" : "rgba(220, 180, 133, 0.5)",
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
