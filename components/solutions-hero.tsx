"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SolutionsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="max-h-screen flex items-center pt-16 md:pt-32 px-3 md:px-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Advanced Concrete Solutions
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            BuildChem Solutions Inc., a subsidiary under Progressive Materials
            Solutions Inc., delivers high-performance chemical admixtures for
            concrete and soil stabilization. Our products optimize workability,
            strength, durability, and water resistance for ready-mix, precast,
            underwater, or road foundation applications.
          </p>
        </div>

        {/* Right – Single Static Image */}
        <div className="relative w-full aspect-1280/720 rounded-lg overflow-hidden shadow-2xl bg-black">
          <Image
            src="/images/buildchem-hero.png"
            alt="BuildChem Hero"
            fill
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
}
