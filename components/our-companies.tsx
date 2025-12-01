"use client"

import { useState } from "react"
import Image from "next/image"

const companies = [
  {
    id: "progdy",
    name: "Progressive Dynamics Inc.",
    logo: "/images/progdy.png",
  },
  {
    id: "buildchem",
    name: "Buildchem",
    logo: "/images/buildchem.png",
  },
  {
    id: "oko",
    name: "OKO",
    logo: "/images/oko.png",
  },
  {
    id: "progma",
    name: "Progressive Materials Inc.",
    logo: "/images/progma.png",
  },
]

export function OurCompanies() {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null)

  return (
    <section className="py-16 md:py-24 px-4 md:px-8" style={{ backgroundColor: "#261c12" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Title and Company Names - Centered */}
          <div className="text-center w-full">
            <h2
              className="text-4xl md:text-5xl font-bold transition-all duration-500"
              style={{
                color: "#DCB485",
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: hoveredCompany ? "translateY(-10px)" : "translateY(0)",
              }}
            >
              {hoveredCompany ? companies.find((c) => c.id === hoveredCompany)?.name : "Our Companies"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12 justify-center w-full">
            {companies.map((company) => (
              <div
                key={company.id}
                onMouseEnter={() => setHoveredCompany(company.id)}
                onMouseLeave={() => setHoveredCompany(null)}
                className="relative cursor-pointer transition-all duration-300"
              >
                {/* Container Background with darker depth colors */}
                <div
                  className="absolute inset-0 rounded-lg transition-all duration-300 ease-out"
                  style={{
                    background:
                      hoveredCompany === company.id
                        ? "linear-gradient(135deg, rgba(220, 180, 133, 0.3) 0%, rgba(220, 180, 133, 0.15) 100%)"
                        : "linear-gradient(135deg, rgba(38, 28, 18, 0.8) 0%, rgba(26, 20, 16, 0.6) 100%)",
                    border:
                      hoveredCompany === company.id
                        ? "1px solid rgba(220, 180, 133, 0.5)"
                        : "1px solid rgba(60, 50, 35, 0.4)",
                    transform: hoveredCompany === company.id ? "scale(1.08)" : "scale(1)",
                  }}
                />

                {/* Logo - tan color by default */}
                <div className="relative p-8 md:p-12 flex items-center justify-center h-40 md:h-48 w-56 md:w-64 transition-all duration-300">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    width={150}
                    height={80}
                    className="object-contain max-w-full max-h-full transition-all duration-300"
                    style={{
                      filter: hoveredCompany === company.id ? "brightness(1.2)" : "brightness(1) opacity(0.9)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
