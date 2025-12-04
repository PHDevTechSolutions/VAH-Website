"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function CompanyHero({
  name,
  category,
  heroImage,
}: {
  name: string;
  category: string;
  heroImage: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
      <Image
        src={heroImage || "/placeholder.svg"}
        alt={name}
        fill
        className="object-cover"
        quality={90}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Animated Content */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-12 lg:px-16">
        <div
          className={`max-w-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ color: "#DCB485" }}
          >
            {name}
          </h1>

          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#FFFFFF" }}>
            {category}
          </p>
        </div>
      </div>
    </div>
  );
}
