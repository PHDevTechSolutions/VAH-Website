"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function BlogSection() {
  const blogPosts = [
    {
      title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE",
      description:
        "Control the pace and perfect the process. BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision.",
    },
    {
      title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE",
      description:
        "Control the pace and perfect the process. BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">What's New</h2>
          <a href="#" className="text-cyan-500 font-semibold hover:text-cyan-600">
            Go to Blogs →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="absolute top-4 left-4 bg-white/20 px-3 py-1 rounded text-white text-xs font-semibold">
                  BUILDCHEM
                </div>
                <Image src="/construction-site-city.png" alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
