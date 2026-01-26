import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SolutionsContent } from "@/components/solutions-content";
import { SolutionsScrollNav } from "@/components/solutions-scroll-nav";
import { SolutionsCartDrawer } from "@/components/solutions-cart-drawer"; // Import here

export const metadata: Metadata = {
  title: "Solutions | Buildchem",
  description:
    "Complete catalog of concrete admixtures and construction chemicals.",
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* FLOATING CART BUTTON */}
      <SolutionsCartDrawer />

      <section className="relative h-[60vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* ... hero content remains the same ... */}
        <div className="absolute inset-0">
          <Image
            src="/images/HERO.png"
            alt="Modern corporate buildings"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            BuildChem Solutions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Advanced concrete admixtures and construction chemicals for superior
            performance and durability.
          </p>
        </div>
      </section>

      <Suspense fallback={<div>Loading solutions...</div>}>
        <SolutionsScrollNav
          solutions={[
            {
              index: 1,
              title: "Superplasticizers & High-Range Water Reducers",
            },
            { index: 2, title: "Set Retarders & Accelerators" },
            { index: 3, title: "Underwater Concrete Solutions" },
            { index: 4, title: "Waterproofing Solutions" },
            { index: 5, title: "Soil Stabilization & Road Foundation" },
            { index: 6, title: "Mould Release Agents" },
            { index: 7, title: "Corrosion Protection Solutions" },
            { index: 8, title: "Curing Compounds" },
            { index: 9, title: "Cement Processing & Grinding Aids" },
            { index: 10, title: "Cleaning & Surface Preparation Chemicals" },
          ]}
        />
        <SolutionsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
