"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  dropdown?: { label: string; href?: string; index?: number }[];
}

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const isOnSolutions = pathname === "/solutions";

  const navItems: NavItem[] = [
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
        { label: "Superplasticizers & High-Range Water Reducers", index: 1 },
        { label: "Set Retarders & Accelerators", index: 2 },
        { label: "Underwater Concrete Solutions", index: 3 },
        { label: "Waterproofing Solutions", index: 4 },
        { label: "Soil Stabilization & Road Foundation Solutions", index: 5 },
        { label: "Mould Release Agents", index: 6 },
        { label: "Corrosion Protection Solutions", index: 7 },
        { label: "Curing Compounds", index: 8 },
        { label: "Cement Processing & Grinding Aids", index: 9 },
        { label: "Cleaning & Surface Preparation Chemicals", index: 10 },
      ],
    },
    { label: "BLOGS", href: "/blogs" },
    { label: "CONTACT US", href: "/contact" },
  ];

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState<
    string | null
  >(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navBg = isOnSolutions
    ? "linear-gradient(180deg, #5DE0E6 0%, #004AAD 100%)"
    : "linear-gradient(180deg, #000000 0%, #261c12 100%)";

  const textColor = isOnSolutions ? "#ffffff" : "#DCB485";
  const logoSrc = isOnSolutions
    ? "/images/buildchem-small.png"
    : "/images/logo-vah.png";

  const handleSolutionClick = (index: number) => {
    if (pathname === "/solutions") {
      const element = document.getElementById(`solution-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(`/solutions?scrollTo=${index}`);
    }
    setOpenDropdown(null);
    setIsMobileOpen(false);
  };

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
            width={520}
            height={124}
            className="h-10 w-auto md:h-12 transition-all duration-300 hover:scale-105 shrink-0"
            priority
          />
        </Link>
      </div>

      {/* DESKTOP MENU */}
      <div
        className="hidden md:flex items-center justify-center flex-1"
        ref={desktopMenuRef}
      >
        <div
          className="flex items-center justify-center gap-6 px-8 py-3 rounded-full backdrop-blur-xl border shadow-lg relative transition-all duration-300"
          style={{
            background: isOnSolutions
              ? "rgba(255, 255, 255, 0.15)"
              : "linear-gradient(135deg, rgba(26, 20, 16, 0.9) 0%, rgba(18, 14, 10, 0.85) 100%)",
            borderColor: isOnSolutions
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(220, 180, 133, 0.3)",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative flex items-center gap-1">
              {/* TEXT LINK */}
              <Link
                href={item.href}
                className="text-sm font-medium transition-all duration-300 whitespace-nowrap hover:opacity-80"
                style={{ color: textColor }}
              >
                {item.label}
              </Link>

              {/* CHEVRON (desktop toggle) */}
              {item.dropdown && (
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  className="flex items-center"
                  style={{ color: textColor }}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {/* DROPDOWN */}
              {item.dropdown && (
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 rounded-lg border border-amber-600/30 backdrop-blur-xl shadow-lg p-4 min-w-max z-50 flex flex-col gap-2
                    ${
                      openDropdown === item.label
                        ? "opacity-100 visible pointer-events-auto"
                        : "opacity-0 invisible pointer-events-none"
                    }
                    transition-all duration-200`}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(26, 20, 16, 0.95) 0%, rgba(18, 14, 10, 0.9) 100%)",
                  }}
                >
                  {item.dropdown.map((subitem: any) =>
                    item.label === "SOLUTIONS" && subitem.index ? (
                      <button
                        key={subitem.index}
                        onClick={() => handleSolutionClick(subitem.index)}
                        className="text-sm px-3 py-2 rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap text-left w-full"
                        style={{ color: textColor }}
                      >
                        {subitem.label}
                      </button>
                    ) : (
                      <Link
                        key={subitem.label}
                        href={subitem.href!}
                        className="text-sm px-3 py-2 rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap block"
                        style={{ color: textColor }}
                      >
                        {subitem.label}
                      </Link>
                    )
                  )}
                </div>
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
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* MOBILE MENU */}
      {isMobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 flex flex-col gap-2 pb-4 rounded-lg border p-4 max-h-96 overflow-y-auto mobile-scroll-hide transition-all duration-300"
          style={{
            backgroundColor: isOnSolutions
              ? "rgba(5, 74, 173, 0.95)"
              : "#1a1410",
            borderColor: isOnSolutions
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(220, 180, 133, 0.3)",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {/* TEXT ALWAYS A LINK */}
              <Link
                href={item.href}
                className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80 block w-full text-left"
                style={{ color: textColor }}
              >
                {item.label}
              </Link>

              {/* CHEVRON ONLY FOR TOGGLING */}
              {item.dropdown && (
                <button
                  onClick={() =>
                    setMobileExpandedDropdown(
                      mobileExpandedDropdown === item.label ? null : item.label
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: textColor }}
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      mobileExpandedDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}

              {/* MOBILE DROPDOWN */}
              {item.dropdown && mobileExpandedDropdown === item.label && (
                <div className="pl-4 flex flex-col gap-1 max-h-48 overflow-y-auto mobile-scroll-hide mt-1">
                  {item.dropdown.map((subitem: any) =>
                    item.label === "SOLUTIONS" && subitem.index ? (
                      <button
                        key={subitem.index}
                        onClick={() => handleSolutionClick(subitem.index)}
                        className="text-xs px-2 py-1 rounded transition-all duration-300 hover:opacity-80 block text-left"
                        style={{ color: textColor, opacity: 0.8 }}
                      >
                        {subitem.label}
                      </button>
                    ) : (
                      <Link
                        key={subitem.label}
                        href={subitem.href!}
                        className="text-xs px-2 py-1 rounded transition-all duration-300 hover:opacity-80 block"
                        style={{ color: textColor, opacity: 0.8 }}
                      >
                        {subitem.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
