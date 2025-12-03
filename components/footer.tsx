"use client"

import Image from "next/image"
import { Mail, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="border-t py-20 px-4 md:px-8 lg:px-16"
      style={{
        background: "linear-gradient(180deg, #261c12 0%, #000000 100%)",
        borderColor: "rgba(220, 180, 133, 0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-14 mb-16">
          {/* Logo Column */}
          <div className="flex flex-col justify-start">
            <Image
              src="/images/logo-footer.png"
              alt="VALUE ACQUISITIONS HOLDINGS INC."
              width={280}
              height={100}
              className="w-full max-w-[280px] h-auto object-contain"
            />
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-bold mb-5 text-base tracking-wide" style={{ color: "#DCB485" }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  Companies
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  Solutions
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  Blogs
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="hover:text-[#DCB485] transition-colors duration-300" 
                  style={{ color: "#FFFFFF" }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Companies Column */}
          <div>
            <h4 className="font-bold mb-5 text-base tracking-wide" style={{ color: "#DCB485" }}>
              OUR COMPANIES
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <Image
                  src="/images/buildchem.png"
                  alt="Buildschem Solutions Inc."
                  width={100}
                  height={35}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <Image
                  src="/images/oko.png"
                  alt="Öko"
                  width={100}
                  height={35}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <Image
                  src="/images/progdy.png"
                  alt="Progressive Dynamics Inc."
                  width={100}
                  height={35}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="p-3 rounded-md hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                <Image
                  src="/images/progma.png"
                  alt="Progressive Materials Solutions Inc."
                  width={100}
                  height={35}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold mb-5 text-base tracking-wide" style={{ color: "#DCB485" }}>
              CONNECT WITH US
            </h4>
            <div className="space-y-5">
              <p className="text-sm leading-relaxed" style={{ color: "#FFFFFF" }}>
                Block 14, Brgy. Golden Mile Business Park, Lot 110TH Street, Maduya, Carmona, 4116 Cavite
              </p>
              <p className="font-semibold text-base" style={{ color: "#DCB485" }}>
                09175142168
              </p>

              {/* Social Icons */}
              <div className="flex gap-5 pt-2">
                <a 
                  href="#" 
                  className="transition-all duration-300 hover:scale-110" 
                  style={{ color: "#FFFFFF" }}
                >
                  <Facebook size={22} className="hover:text-[#DCB485]" />
                </a>
                <a 
                  href="#" 
                  className="transition-all duration-300 hover:scale-110" 
                  style={{ color: "#FFFFFF" }}
                >
                  <Instagram size={22} className="hover:text-[#DCB485]" />
                </a>
                <a 
                  href="#" 
                  className="transition-all duration-300 hover:scale-110" 
                  style={{ color: "#FFFFFF" }}
                >
                  <Mail size={22} className="hover:text-[#DCB485]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t pt-10 text-center text-sm"
          style={{ borderColor: "rgba(220, 180, 133, 0.2)", color: "#FFFFFF" }}
        >
          <p>&copy; 2025 Value Acquisitions Holdings Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}