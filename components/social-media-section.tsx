"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { GoldButton } from "./gold-button"
import Image from "next/image"

interface SocialPost {
  id: number
  platform: string
  videoUrl: string
  thumbnail: string
  caption: string
}

const socialPosts: SocialPost[] = [
  {
    id: 1,
    platform: "TikTok",
    videoUrl: "#",
    thumbnail: "/construction-worker-helmet.png",
    caption: "Building the future, one project at a time",
  },
  {
    id: 2,
    platform: "Facebook",
    videoUrl: "#",
    thumbnail: "/concrete-pouring.png",
    caption: "Quality concrete solutions for every need",
  },
  {
    id: 3,
    platform: "TikTok",
    videoUrl: "#",
    thumbnail: "/industrial-construction-equipment.jpg",
    caption: "Innovation in every build",
  },
]

const itemsPerPage = 3

export function SocialMediaSection() {
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = Math.ceil(socialPosts.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const currentPosts = socialPosts.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">Follow Us</h3>
          <p className="text-gray-300 text-sm">
            Bringing ideas to your feed! Discover the latest trends and must-have styles
          </p>
        </div>
        <GoldButton>Follow us on TikTok / Facebook</GoldButton>
      </div>

      <div className="relative">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-[300px]">
                <Image
                  src={post.thumbnail || "/placeholder.svg"}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-all">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Platform Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent px-3 py-1 rounded-full text-xs font-semibold text-black">
                    {post.platform}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">{post.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Indicator */}
          <span className="text-white text-sm">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPage ? "bg-accent w-8" : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
