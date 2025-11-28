"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navData = [
    { label: "HOME", link: "#" },

    {
      label: "COMPANIES",
      submenu: [
        "Progressive Materials Solutions Inc.",
        "BuildChem Solutions Inc.",
        "Progressive Dynamics Inc.",
        "OKO",
      ],
    },

    {
      label: "SOLUTIONS",
      submenu: [
        "Superplasticizers & High-Range Water Reducers",
        "Set Retarders & Accelerators",
        "Underwater Concrete Solutions",
        "Waterproofing Solutions",
        "Soil Stabilization",
        "Mould Release Agents",
        "Corrosion Protection",
        "Curing Compounds",
        "Grinding Aids",
        "Surface Preparation Chemicals",
      ],
    },

    { label: "BLOGS", link: "#" },
    { label: "ABOUT US", link: "#" },
    { label: "CONTACT US", link: "#" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 py-4 px-4">
      <nav className="max-w-5xl mx-auto">

        {/* NAV CONTAINER */}
        <div
          className={cn(
            "flex items-center justify-between px-6 rounded-full transition-all duration-300",
            "h-14 md:h-16",
            isScrolled
              ? "bg-gradient-to-r from-gray-900/80 to-amber-900/80 backdrop-blur-md shadow-lg border border-white/10"
              : "bg-black/20 backdrop-blur-sm border border-white/5 hover:border-white/10"
          )}
        >
          {/* LEFT: LOGO */}
          <Image
            src="/images/vah-small.png"
            alt="BUILDCHEM Logo"
            width={100}
            height={40}
            className="h-7 md:h-8 w-auto"
          />

          {/* CENTER: NAV MENU */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-3">

              {navData.map((item) => (
           <NavigationMenuItem key={item.label}>
  {item.submenu ? (
    <>
      <NavigationMenuTrigger
        className="!bg-transparent !text-white/80 hover:!text-white !shadow-none !px-2 !py-2 !rounded-none data-[state=open]:!bg-transparent text-xs font-semibold"
      >
        {item.label}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="p-4 min-w-[260px] bg-black/90 border border-white/10 rounded-lg shadow-xl backdrop-blur-md">
        <ul className="space-y-2">
          {item.submenu.map((sub) => (
            <li key={sub}>
              <NavigationMenuLink
                href="#"
                className="block text-sm !bg-transparent !text-white/80 hover:!text-white hover:bg-white/10 px-3 py-2 rounded-md transition"
              >
                {sub}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
  ) : (
    <NavigationMenuLink
      href={item.link}
      className="!bg-transparent !text-white/80 hover:!text-white !px-2 !py-2 !rounded-none text-xs font-semibold"
    >
      {item.label}
    </NavigationMenuLink>
  )}
</NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT: SEARCH ICON */}
          <button className="hidden md:flex p-2 text-white/80 hover:text-white">
            <Search className="w-5 h-5" />
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 bg-gradient-to-r from-gray-900/90 to-amber-900/90 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            {navData.map((item) => (
              <a
                key={item.label}
                href="#"
                className="block px-4 py-3 text-white text-sm font-semibold hover:bg-white/10 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
