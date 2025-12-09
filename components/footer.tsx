"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { Mail, Facebook, Instagram } from "lucide-react"

export function Footer() {
  const pathname = usePathname()
  const isOnSolutions = pathname === "/solutions"

  const footerBg = isOnSolutions
    ? "linear-gradient(180deg, #5DE0E6 0%, #004AAD 100%)"
    : "linear-gradient(180deg, #261c12 0%, #000000 100%)"

  const logoSrc = isOnSolutions ? "/images/buildchem-white.png" : "/images/logo-footer.png"
  const textColor = isOnSolutions ? "#ffffff" : "#FFFFFF"
  const accentColor = isOnSolutions ? "rgba(255, 255, 255, 0.9)" : "#DCB485"
  const borderColor = isOnSolutions ? "rgba(255, 255, 255, 0.2)" : "rgba(220, 180, 133, 0.2)"

  return (
    <footer
      className="border-t py-12 md:py-16 px-4 md:px-12 transition-all duration-300"
      style={{
        background: footerBg,
        borderColor: borderColor,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo Column */}
          <div>
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="VALUE ACQUISITIONS HOLDINGS INC."
              width={300}
              height={120}
              className="w-full h-auto mb-4 object-contain transition-all duration-300"
            />
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-semibold mb-4 text-sm md:text-base" style={{ color: accentColor }}>
              INFORMATION
            </h4>
            <ul className="space-y-2 text-xs md:text-sm" style={{ color: textColor }}>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>
                  Warranty Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity" style={{ color: textColor }}>
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Empty Column */}
          <div className="flex flex-col items-center lg:items-start">
             <h4 className="font-semibold mb-4 text-sm md:text-base" style={{ color: accentColor }}>
              OUR COMPANIES
            </h4>
            <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
              <a 
                href="/companies/buildchem" 
                className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center min-h-[70px]"
              >
                <Image
                  src="/images/buildchem.png"
                  alt="Buildschem Solutions Inc."
                  width={100}
                  height={40}
                  className="w-full h-auto object-contain max-h-[45px]"
                />
              </a>
              <a 
                href="/companies/oko" 
                className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center min-h-[70px]"
              >
                <Image
                  src="/images/oko.png"
                  alt="Öko"
                  width={100}
                  height={40}
                  className="w-full h-auto object-contain max-h-[45px]"
                />
              </a>
              <a 
                href="/companies/progdy" 
                className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center min-h-[70px]"
              >
                <Image
                  src="/images/progdy.png"
                  alt="Progressive Dynamics Inc."
                  width={100}
                  height={40}
                  className="w-full h-auto object-contain max-h-[45px]"
                />
              </a>
              <a 
                href="#/companies/progma" 
                className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center min-h-[70px]"
              >
                <Image
                  src="/images/progma.png"
                  alt="Progressive Materials Solutions Inc."
                  width={100}
                  height={40}
                  className="w-full h-auto object-contain max-h-[45px]"
                />
              </a>
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4 text-sm md:text-base" style={{ color: accentColor }}>
              Connect With Us
            </h4>
            <p className="text-xs md:text-sm mb-4 leading-relaxed" style={{ color: textColor }}>
              Block 14, Brgy. Golden Mile Business Park, Lot 110TH Street, Maduya, Carmona, 4116 Cavite
            </p>
            <p className="font-semibold mb-6 text-sm md:text-base" style={{ color: accentColor }}>
              09175142168
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="transition-colors" style={{ color: textColor }}>
                <Facebook size={18} />
              </a>
              <a href="#" className="transition-colors" style={{ color: textColor }}>
                <Instagram size={18} />
              </a>
              <a href="#" className="transition-colors" style={{ color: textColor }}>
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t pt-6 md:pt-8 text-center text-xs md:text-sm transition-all duration-300"
          style={{ borderColor: borderColor, color: textColor }}
        >
          <p>&copy; 2025 Value Acquisitions Holdings Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
