"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function Navigation() {
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
      href: "#",
      dropdown: [
        "Superplasticizers & High-Range Water Reducers",
        "Set Retarders & Accelerators",
        "Underwater Concrete Solutions",
        "Soil Stabilization & Road Foundation Solutions",
        "Mould Release Agents",
        "Corrosion Protection Solutions",
        "Curing Compounds",
        "Cement Processing & Grinding Aids",
        "Cleaning & Surface Preparation Chemicals",
      ],
      twoRows: true,
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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #261c12 100%)",
      }}
    >
      <div className="flex items-center">
        <Image
          src="/images/logo-vah.png"
          alt="VI Logo"
          width={40}
          height={40}
          className="w-8 h-8 md:w-8 md:h-8 transition-transform duration-300 hover:scale-110 shrink-0"
        />
      </div>

      {/* DESKTOP MENU */}
      <div
        className="hidden md:flex items-center justify-center flex-1"
        ref={desktopMenuRef}
      >
        <div
          className="flex items-center justify-center gap-6 px-8 py-3 rounded-full backdrop-blur-xl border border-amber-600/30 shadow-lg relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(26, 20, 16, 0.9) 0%, rgba(18, 14, 10, 0.85) 100%)",
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative flex items-center gap-1">
              {/* TEXT LINK */}
              <a
                href={item.href}
                className="text-sm font-medium transition-all duration-300 whitespace-nowrap hover:opacity-80"
                style={{ color: "#DCB485" }}
              >
                {item.label}
              </a>

              {/* ONLY CHEVRON CLICK */}
              {item.dropdown && (
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  className="flex items-center"
                  style={{ color: "#DCB485" }} // added color style to make chevron visible
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
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 rounded-lg
                    border border-amber-600/30 backdrop-blur-xl shadow-lg p-4 min-w-max
                    ${
                      item.twoRows
                        ? "grid grid-cols-2 gap-2"
                        : "flex flex-col gap-2"
                    }
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
                  {item.dropdown.map((subitem) => (
                    <a
                      key={
                        typeof subitem === "string" ? subitem : subitem.label
                      }
                      href={typeof subitem === "string" ? "#" : subitem.href}
                      className="text-sm px-3 py-2 rounded transition-all duration-200 hover:opacity-80 whitespace-nowrap"
                      style={{ color: "#DCB485" }}
                    >
                      {typeof subitem === "string" ? subitem : subitem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE TOGGLE */}
      <button
        className="md:hidden shrink-0 p-2"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{ color: "#DCB485" }}
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
          className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 flex flex-col gap-2 pb-4 rounded-lg border border-amber-600/30 p-4 max-h-96 overflow-y-auto mobile-scroll-hide"
          style={{
            backgroundColor: "#1a1410", // Made background solid dark instead of transparent gradient
          }}
        >
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              {item.dropdown ? (
                <button
                  onClick={() =>
                    setMobileExpandedDropdown(
                      mobileExpandedDropdown === item.label ? null : item.label
                    )
                  }
                  className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80 w-full text-left flex items-center justify-between"
                  style={{ color: "#DCB485" }}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <a
                  href={item.href}
                  className="text-sm font-medium px-4 py-2 rounded transition-all duration-300 hover:opacity-80 block w-full text-left"
                  style={{ color: "#DCB485" }}
                >
                  {item.label}
                </a>
              )}
              {item.dropdown && mobileExpandedDropdown === item.label && (
                <div className="pl-4 flex flex-col gap-1 max-h-48 overflow-y-auto mobile-scroll-hide">
                  {item.dropdown.map((subitem) => (
                    <a
                      key={
                        typeof subitem === "string" ? subitem : subitem.label
                      }
                      href={typeof subitem === "string" ? "#" : subitem.href}
                      className="text-xs px-2 py-1 rounded transition-all duration-300 hover:opacity-80 block wrap-break-word"
                      style={{ color: "#DCB485", opacity: 0.8 }}
                    >
                      {typeof subitem === "string" ? subitem : subitem.label}
                    </a>
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
