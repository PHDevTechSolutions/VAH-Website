"use client"

import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden">
      <Image
        src="/images/hero-img.jpg"
        alt="Modern concrete architecture"
        fill
        className="absolute inset-0 object-cover brightness-[0.4]"
        priority
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 md:pt-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-white">
            <p className="text-sm md:text-base font-semibold tracking-widest mb-4 opacity-90">CONCRETE MADE</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">BETTER.</h1>
            <p className="text-lg opacity-90 max-w-md">
              Advanced concrete solutions for superior performance and durability.
            </p>
          </div>

          {/* Right - Empty space for image focus */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  )
}
