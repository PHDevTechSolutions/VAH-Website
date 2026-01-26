"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions" },
  { name: "Companies", href: "/companies" },
  { name: "Blogs", href: "/blogs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isSolutionsPage = pathname === "/solutions";
  const isContactPage = pathname === "/contact";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-md border-b-2" : "bg-transparent"
      } ${isSolutionsPage && isScrolled ? "border-blue-600" : "border-accent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="flex items-center group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div
              className={`relative w-12 h-12 transition-all duration-300 ${isScrolled ? "brightness-0" : ""}`}
            >
              <Image
                src={
                  isSolutionsPage
                    ? "/images/buildchem-small.png"
                    : "/images/vah-white-small.png"
                }
                alt={isSolutionsPage ? "Buildchem Logo" : "VAH Logo"}
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group rounded-lg ${
                  pathname === item.href
                    ? isScrolled
                      ? isSolutionsPage
                        ? "text-black bg-blue-600/20"
                        : "text-black bg-accent/20"
                      : isSolutionsPage
                        ? "text-white bg-blue-600/20"
                        : "text-white bg-white/20"
                    : isScrolled
                      ? "text-muted-foreground hover:text-black"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                {pathname !== item.href && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-transform origin-left duration-300 rounded-full scale-x-0 group-hover:scale-x-100 ${
                      isSolutionsPage ? "bg-blue-600" : "bg-accent"
                    }`}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`px-6 py-2 text-sm font-medium transition-all duration-300 rounded-lg border-2 ${
                isSolutionsPage
                  ? isContactPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : isContactPage
                    ? "bg-accent text-black border-accent"
                    : "bg-accent text-black border-accent hover:bg-accent/90"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors rounded-lg ${isScrolled ? "text-black" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-4 space-y-2">
            {[...navItems, { name: "Contact Us", href: "/contact" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                    pathname === item.href
                      ? isSolutionsPage
                        ? "text-black bg-blue-600/20 font-semibold"
                        : "text-black bg-accent/20 font-semibold"
                      : "text-muted-foreground hover:text-black hover:bg-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
