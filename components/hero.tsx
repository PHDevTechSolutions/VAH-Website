"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const heroImages = [
  {
    src: "/images/vah-hero.png",
    alt: "VAH Office",
  },
  {
    src: "/images/buildchem-hero.png",
    alt: "Buildchem Solutions",
  },
  {
    src: "/images/HERO.png",
    alt: "Modern Architecture",
  },
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      className="min-h-screen flex items-center pt-28 md:pt-32 px-3 md:px-12"
      style={{ backgroundColor: "#261c12" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in" style={{ color: "#DCB485" }}>
            Value Acquisitions Inc.
          </h1>
          <p className="text-sm md:text-lg animate-fade-in" style={{ color: "#FFFFFF" }}>
            Value Acquisitions Holdings Inc. is a holding company leading brands in trade, distribution, modern building materials, and industrial construction solutions.
          </p>
        </div>

        {/* Right - Carousel - removed black border and adjusted container for full image display */}
        <div className="relative w-full aspect-1280/720 rounded-lg overflow-hidden shadow-2xl bg-black animate-fade-in">
  {heroImages.map((image, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-fill" />
    </div>
  ))}

  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
    {heroImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className="w-2 h-2 rounded-full transition-all duration-300 hover:scale-125"
        style={{
          backgroundColor: index === currentIndex ? "#DCB485" : "#8b7765",
        }}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>
 
      </div>
    </section>
  )
}
