"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { GoldButton } from "@/components/gold-button"
// Make sure you have your firebase config initialized in @/lib/firebase
import { db } from "@/lib/firebase" 
import { collection, getDocs } from "firebase/firestore"

export function SocialMediaSection() {
  const [videos, setVideos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  // 1. Fetch data from Firebase Firestore
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reels"))
        // Map through docs to grab the 'url' field
        const videoIds = querySnapshot.docs.map(doc => doc.data().url)
        setVideos(videoIds)
      } catch (error) {
        console.error("Error fetching reels:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // 2. Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w >= 1280) setItemsPerPage(3)
      else if (w >= 768) setItemsPerPage(2)
      else setItemsPerPage(1)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(videos.length / itemsPerPage)
  const startIdx = currentPage * itemsPerPage
  const currentVideos = videos.slice(startIdx, startIdx + itemsPerPage)

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            Follow Us
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            BuildChem Solutions Inc., a subsidiary under Progressive Materials Solutions Inc...
          </p>
        </div>

        <a
          href="https://www.tiktok.com/@buildchemsolutionsinc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <GoldButton>Follow us on TikTok</GoldButton>
        </a>
      </div>

      {loading ? (
        // Loading State
        <div className="flex flex-col items-center justify-center h-[400px] gap-2">
          <Loader2 className="animate-spin text-accent" size={40} />
          <p className="text-gray-500 text-sm">Loading reels...</p>
        </div>
      ) : (
        <>
          {/* TikTok Video Carousel */}
          <div className="relative flex items-center">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="hidden md:flex items-center justify-center bg-accent/20 hover:bg-accent/30 text-accent p-2 rounded-full border border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed mr-4"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-4 overflow-hidden w-full">
              {currentVideos.map((videoPath, index) => {
                // Extracts the ID if a full URL is provided, otherwise uses it as an ID
                const videoId = videoPath.split('/').pop()?.split('?')[0]

                return (
                  <div
                    key={`${videoId}-${index}`}
                    className="flex-shrink-0 w-full sm:w-1/2 xl:w-1/3 rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <iframe
                      src={`https://www.tiktok.com/player/v1/${videoId}?&music_info=1&description=1&loop=1`}
                      height="400"
                      width="100%"
                      allow="fullscreen"
                      className="rounded-lg"
                      title={`TikTok video ${videoId}`}
                    />
                  </div>
                )
              })}
            </div>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="hidden md:flex items-center justify-center bg-accent/20 hover:bg-accent/30 text-accent p-2 rounded-full border border-accent/50 disabled:opacity-30 disabled:cursor-not-allowed ml-4"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentPage
                      ? "bg-accent w-8 h-3"
                      : "bg-gray-300 w-3 h-3"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}