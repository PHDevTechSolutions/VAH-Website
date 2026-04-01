"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Companies", href: "/companies" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSolutionsPage = pathname === "/solutions";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-md border-b" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div
              className={`relative w-12 h-12 transition-all duration-300 ${isScrolled ? "brightness-0" : ""}`}
            >
              <Image
                src={
                  isSolutionsPage
                    ? "/images/buildchem-small.png"
                    : "/images/vah-white-small.png"
                }
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg block ${
                  pathname === item.href
                    ? isScrolled
                      ? "text-black bg-gray-100"
                      : "text-white bg-white/10"
                    : isScrolled
                      ? "text-gray-600 hover:text-black"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CONTACT BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#d9b98e] text-black hover:bg-[#c4a47a]"
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 z-60 ${isScrolled || isMobileMenuOpen ? "text-black" : "text-white"}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-white z-50 md:hidden transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-50">
                <Link
                  href={item.href}
                  className="block py-4 text-2xl font-black uppercase italic tracking-tighter text-black"
                >
                  {item.name}
                </Link>
              </div>
            ))}

            <div className="pt-6">
              <Link
                href="/contact"
                className="block w-full text-center py-5 bg-black text-white text-sm font-black uppercase tracking-[0.2em] rounded-2xl"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
