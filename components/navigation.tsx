"use client"

import Image from "next/image"
import { useState } from "react"

export function Navigation() {
  const navItems = ["HOME", "ABOUT US", "SOLUTIONS", "BLOGS", "CONTACT US", "COMPANIES"]
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #261c12 100%)",
      }}
    >
      {/* Logo - visible on all screen sizes */}
      <div className="flex items-center">
        <Image
          src="/images/logo-vah.png"
          alt="VI Logo"
          width={40}
          height={40}
          className="w-8 h-8 md:w-8 md:h-8 transition-transform duration-300 hover:scale-110 flex-shrink-0"
        />
      </div>

      {/* Desktop - Pill nav with centered nav items only */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div
          className="flex items-center justify-center gap-6 px-8 py-3 rounded-full backdrop-blur-xl border border-amber-600/30 shadow-lg"
          style={{
            background: "linear-gradient(135deg, rgba(26, 20, 16, 0.9) 0%, rgba(18, 14, 10, 0.85) 100%)",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-all duration-300 whitespace-nowrap hover:opacity-80"
              style={{ color: "#DCB485" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex-shrink-0 p-2"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{ color: "#DCB485" }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu - collapsible */}
      {isMobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 flex flex-col gap-2 pb-4 rounded-lg backdrop-blur-xl border border-amber-600/30 p-4"
          style={{
            background: "linear-gradient(135deg, rgba(220, 180, 133, 0.1) 0%, rgba(220, 180, 133, 0.05) 100%)",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80"
              style={{ color: "#DCB485" }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
