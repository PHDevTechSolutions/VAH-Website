"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const isSolutionsPage = pathname === "/solutions"

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollPercentage = (scrollTop / scrollHeight) * 100

      setIsVisible(scrollPercentage > 50)
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isSolutionsPage ? "bg-[#0066CC] hover:bg-[#0052A3] text-white" : "bg-accent hover:bg-accent/90 text-white"
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
}
