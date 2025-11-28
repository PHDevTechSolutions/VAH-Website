"use client"

import Image from "next/image"
import { Mail, Instagram, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <Image
              src="/images/bc-black.png"
              alt="BUILDCHEM Logo"
              width={150}
              height={50}
              className="h-12 w-auto mb-4"
            />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Warranty Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-100 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Connect With Us</h3>
            <p className="mb-6 leading-relaxed text-sm">
              Block 14, Brgy, Golden Mile <br />
              Business Park, Lot 1 10TH <br />
              Street, Maduya, Carmona, <br />
              4116 Cavite
            </p>
            <p className="font-semibold mb-6">09175142168</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-100 transition">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-100 transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-100 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-100 transition">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 BUILDCHEM Solutions Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
