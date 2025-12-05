"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isOnSolutions = pathname.startsWith("/solutions");

  const navItems = [
    { label: "HOME", href: "/home" },
    { label: "ABOUT US", href: "/about" },
    {
      label: "COMPANIES",
      href: "/companies",
      dropdown: [
        { label: "Progressive Dynamics", href: "/companies/progdy" },
        { label: "ÖKO", href: "/companies/oko" },
        { label: "Progressive Materials", href: "/companies/progma" },
        { label: "BuildChem", href: "/companies/buildchem" },
      ],
    },
    {
      label: "SOLUTIONS",
      href: "/solutions",
      dropdown: [
        { label: "Superplasticizers & High-Range Water Reducers", scrollTo: "1" },
        { label: "Set Retarders & Accelerators", scrollTo: "2" },
        { label: "Underwater Concrete Solutions", scrollTo: "3" },
        { label: "Waterproofing Solutions", scrollTo: "4" },
        { label: "Soil Stabilization & Road Foundation Solutions", scrollTo: "5" },
        { label: "Mould Release Agents", scrollTo: "6" },
        { label: "Corrosion Protection Solutions", scrollTo: "7" },
        { label: "Curing Compounds", scrollTo: "8" },
        { label: "Cement Processing & Grinding Aids", scrollTo: "9" },
        { label: "Cleaning & Surface Preparation Chemicals", scrollTo: "10" },
      ],
      twoRows: true,
    },
    { label: "BLOGS", href: "/blogs" },
    { label: "CONTACT US", href: "/contact" },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<string | null>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSolution = (id: string) => {
    const element = document.getElementById(`solution-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLinkClick = (href: string, scrollTo?: string) => {
    if (isOnSolutions && scrollTo) {
      scrollToSolution(scrollTo);
    } else if (href) {
      router.push(href);
    }
  };

  const navBg = isOnSolutions
    ? "linear-gradient(180deg, #5DE0E6 0%, #004AAD 100%)"
    : "linear-gradient(180deg, #000000 0%, #261c12 100%)";

  const textColor = isOnSolutions ? "#ffffff" : "#DCB485";
  const logoSrc = isOnSolutions ? "/images/vah-white-small.png" : "/images/logo-vah.png";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 transition-all duration-300"
      style={{ background: navBg }}
    >
      <div className="flex items-center">
        <Link href="/home" className="flex items-center">
          <Image
            src={logoSrc || "/placeholder.svg"}
            alt="VI Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-8 md:h-8 transition-all duration-300 hover:scale-110 shrink-0"
          />
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center justify-center flex-1" ref={desktopMenuRef}>
        <div
          className="flex items-center justify-center gap-6 px-8 py-3 rounded-full backdrop-blur-xl border shadow-lg relative transition-all duration-300"
          style={{
            background: isOnSolutions
              ? "rgba(255, 255, 255, 0.15)"
              : "linear-gradient(135deg, rgba(26, 20, 16, 0.9) 0%, rgba(18, 14, 10, 0.85) 100%)",
            borderColor: isOnSolutions ? "rgba(255, 255, 255, 0.3)" : "rgba(220, 180, 133, 0.3)",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative flex items-center gap-1">
              <button
                onClick={() => handleLinkClick(item.href, (item as any).scrollTo)}
                className="text-sm font-medium transition-all duration-300 whitespace-nowrap hover:opacity-80"
                style={{ color: textColor }}
              >
                {item.label}
              </button>

              {item.dropdown && (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="flex items-center"
                    style={{ color: textColor }}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 rounded-lg border border-amber-600/30 backdrop-blur-xl shadow-lg p-4 min-w-max ${
                      (item as any).twoRows ? "grid grid-cols-2 gap-2" : "flex flex-col gap-2"
                    } ${
                      openDropdown === item.label
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none"
                    } transition-all duration-200`}
                    style={{
                      background: "linear-gradient(135deg, rgba(26, 20, 16, 0.95) 0%, rgba(18, 14, 10, 0.9) 100%)",
                    }}
                  >
                    {(item.dropdown as any[]).map((subitem) => (
                      <button
                        key={subitem.label}
                        onClick={() =>
                          handleLinkClick("/solutions", subitem.scrollTo)
                        }
                        className="text-sm px-3 py-2 rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap text-left"
                        style={{ color: textColor }}
                      >
                        {subitem.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE TOGGLE */}
      <button
        className="md:hidden shrink-0 p-2 transition-colors duration-300"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{ color: textColor }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 flex flex-col gap-2 pb-4 rounded-lg border p-4 max-h-96 overflow-y-auto mobile-scroll-hide transition-all duration-300"
          style={{
            backgroundColor: isOnSolutions ? "rgba(5, 74, 173, 0.95)" : "#1a1410",
            borderColor: isOnSolutions ? "rgba(255, 255, 255, 0.3)" : "rgba(220, 180, 133, 0.3)",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <button
                  onClick={() =>
                    setMobileExpandedDropdown(mobileExpandedDropdown === item.label ? null : item.label)
                  }
                  className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80 w-full text-left flex items-center justify-between"
                  style={{ color: textColor }}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileExpandedDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => handleLinkClick(item.href)}
                  className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80 block w-full text-left"
                  style={{ color: textColor }}
                >
                  {item.label}
                </button>
              )}

              {item.dropdown && mobileExpandedDropdown === item.label && (
                <div className="pl-4 flex flex-col gap-1 max-h-48 overflow-y-auto mobile-scroll-hide">
                  {(item.dropdown as any[]).map((subitem) => (
                    <button
                      key={subitem.label}
                      onClick={() => handleLinkClick("/solutions", subitem.scrollTo)}
                      className="text-xs px-2 py-1 rounded transition-all duration-300 hover:opacity-80 block wrap-break-word text-left"
                      style={{ color: textColor, opacity: 0.8 }}
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
