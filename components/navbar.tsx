"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Solutions", href: "/solutions", isDropdown: true },
  { name: "Companies", href: "/companies" },
  { name: "Blogs", href: "/blogs" },
];

interface Solution {
  id: string;
  title: string;
  label?: string;
  [key: string]: any;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [groupedSolutions, setGroupedSolutions] = useState<Record<string, Solution[]>>({});
  const [loading, setLoading] = useState(false);

  const isSolutionsPage = pathname === "/solutions";

  useEffect(() => {
    if ((isSolutionsDropdownOpen || isMobileMenuOpen) && solutions.length === 0) {
      const fetchSolutions = async () => {
        setLoading(true);
        try {
          const querySnapshot = await getDocs(collection(db, "solutions"));
          const solutionsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            label: doc.data().label || "Other",
            ...doc.data(),
          }));
          setSolutions(solutionsData);

          const grouped = solutionsData.reduce((acc: Record<string, Solution[]>, solution: Solution) => {
            const label = solution.label || "Other";
            if (!acc[label]) acc[label] = [];
            acc[label].push(solution);
            return acc;
          }, {});
          setGroupedSolutions(grouped);
        } catch (error) {
          console.error("Error fetching solutions:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSolutions();
    }
  }, [isSolutionsDropdownOpen, isMobileMenuOpen, solutions.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsSolutionsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white shadow-md border-b" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center group">
            <div className={`relative w-12 h-12 transition-all duration-300 ${isScrolled ? "brightness-0" : ""}`}>
              <Image src={isSolutionsPage ? "/images/buildchem-small.png" : "/images/vah-white-small.png"} alt="Logo" fill className="object-contain" />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.isDropdown ? (
                  <button
                    onClick={() => setIsSolutionsDropdownOpen(!isSolutionsDropdownOpen)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isSolutionsDropdownOpen || pathname?.startsWith("/solutions")
                        ? isScrolled ? "text-black bg-gray-100" : "text-white bg-white/10"
                        : isScrolled ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionsDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link href={item.href!} className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg block ${pathname === item.href ? (isScrolled ? "text-black bg-gray-100" : "text-white bg-white/10") : (isScrolled ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white")}`}>
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CONTACT BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact" className="px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-lg bg-[#d9b98e] text-black hover:bg-[#c4a47a]">
              Contact Us
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 z-[60] ${isScrolled || isMobileMenuOpen ? "text-black" : "text-white"}`}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- DESKTOP MEGA MENU --- */}
      {isSolutionsDropdownOpen && (
        <div className="hidden md:block absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto px-12 py-12">
            <div className="grid grid-cols-4 gap-12">
              {/* SORTING LOGIC: We convert to array and sort by length descending */}
              {Object.entries(groupedSolutions)
                .sort((a, b) => b[1].length - a[1].length)
                .map(([label, items]) => (
                  <div key={label} className="space-y-6">
                    <h3 className="font-black text-black text-[11px] uppercase tracking-[0.2em] border-b border-gray-100 pb-4">
                      {label} ({items.length})
                    </h3>
                    <ul className="space-y-4">
                      {items.map((solution) => (
                        <li key={solution.id}>
                          <Link href={`/solutions/${solution.id}`} className="text-[13px] font-medium text-gray-500 hover:text-black hover:translate-x-1 transition-all inline-block">
                            {solution.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-gray-50 px-12 py-4 border-t border-gray-100 text-right">
             <Link href="/solutions" onClick={() => setIsSolutionsDropdownOpen(false)} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                View All Solutions →
             </Link>
          </div>
        </div>
      )}

      {/* --- MOBILE MENU --- */}
      <div className={`fixed inset-0 bg-white z-50 md:hidden transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full pt-24 px-8 pb-10 overflow-y-auto">
          <div className="space-y-2">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-50">
                {item.isDropdown ? (
                  <div className="py-4">
                    <button 
                      onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                      className="flex items-center justify-between w-full text-2xl font-black uppercase italic tracking-tighter text-black"
                    >
                      {item.name}
                      <ChevronRight size={24} className={`transition-transform duration-300 ${isMobileSolutionsOpen ? "rotate-90" : ""}`} />
                    </button>
                    
                    <div className={`mt-4 space-y-6 overflow-hidden transition-all duration-300 ${isMobileSolutionsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      {/* Also sorted on mobile for consistency */}
                      {Object.entries(groupedSolutions)
                        .sort((a, b) => b[1].length - a[1].length)
                        .map(([label, items]) => (
                        <div key={label} className="pl-4">
                          <h4 className="text-[10px] font-black uppercase text-[#d9b98e] tracking-widest mb-3">{label}</h4>
                          <ul className="space-y-3">
                            {items.map((sol) => (
                              <li key={sol.id}>
                                <Link href={`/solutions/${sol.id}`} className="text-gray-500 font-bold uppercase text-xs tracking-tight">{sol.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <Link href="/solutions" className="block pl-4 py-2 text-xs font-black uppercase tracking-widest text-black underline">
                        View All Solutions →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link href={item.href!} className="block py-4 text-2xl font-black uppercase italic tracking-tighter text-black">
                    {item.name}
                  </Link>
                )}
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

      {isSolutionsDropdownOpen && (
        <div className="fixed inset-0 bg-black/20 -z-10 backdrop-blur-[2px] hidden md:block" onClick={() => setIsSolutionsDropdownOpen(false)} />
      )}
    </nav>
  );
}