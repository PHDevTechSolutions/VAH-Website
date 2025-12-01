"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function CompaniesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      <Image
        src="/images/HERO.png"
        alt="Corporate buildings"
        fill
        className="object-cover"
        quality={90}
      />

      {/* Dimming overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16">
        <div
          className={`max-w-xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-300"
            style={{ color: "#DCB485" }}
          >
            Our Companies
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: "#FFFFFF" }}
          >
            Value Acquisitions Holdings Inc. manages a portfolio of brands
            operating across trade, distribution, modern building materials,
            industrial construction solutions, and chemical-based technologies.
          </p>
        </div>
      </div>
    </div>
  );
}
