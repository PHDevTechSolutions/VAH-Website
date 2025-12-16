import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import Image from "next/image"
import { Suspense } from 'react';
import { SolutionsContent } from "@/components/solutions-content"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Solutions | Buildchem",
  description: "Complete catalog of concrete admixtures and construction chemicals.",
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[60vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/HERO.png" alt="Modern corporate buildings" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">BuildChem Solutions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Advanced concrete admixtures and construction chemicals for superior performance and durability.
          </p>
        </div>
      </section>
      <Suspense fallback={<div>Loading solutions...</div>}>
      <SolutionsContent />
      </Suspense>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
