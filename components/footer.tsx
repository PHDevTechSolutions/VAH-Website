"use client";

import Image from "next/image";
import { Mail, Facebook, Instagram, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function Footer() {
  const pathname = usePathname();
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isSolutionsPage = pathname === "/solutions";

  const footerBg = isSolutionsPage
    ? "linear-gradient(180deg, #FFFFFF 0%, #E6F0FF 50%, #4A90E2 100%)"
    : "linear-gradient(180deg, #FFFFFF 0%, #F5F5DC 50%, #DCB485 100%)";

  const logoSrc = isSolutionsPage
    ? "/images/buildchem.png"
    : "/images/vah-logo-2.png";
  const textColor = "#1a1a1a";
  const accentColor = isSolutionsPage ? "#4A90E2" : "#DCB485";
  const borderColor = isSolutionsPage
    ? "rgba(74, 144, 226, 0.1)"
    : "rgba(220, 180, 133, 0.1)";

  useEffect(() => {
    const fetchFooterCompanies = async () => {
      try {
        const q = query(
          collection(db, "company"),
          where("website", "==", "Value Acquisitions Holdings"),
          orderBy("companyName", "asc"),
        );
        const querySnapshot = await getDocs(q);
        const companiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching footer companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterCompanies();
  }, []);

  return (
    <footer
      className="border-t py-12 md:py-16 px-4 md:px-12 transition-all duration-300"
      style={{ background: footerBg, borderColor: borderColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="Logo"
              width={300}
              height={120}
              className="w-full max-w-[240px] h-auto mb-4 object-contain"
            />
          </div>

          {/* Links Column */}
          <div>
            <h4
              className="font-semibold mb-6 text-sm tracking-widest opacity-60"
              style={{ color: textColor }}
            >
              QUICK LINKS
            </h4>
            <ul
              className="space-y-3 text-xs md:text-sm"
              style={{ color: textColor }}
            >
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Companies", href: "/companies" },
                { name: "Solutions", href: "/solutions" },
                { name: "Contact Us", href: "/contact" },
                { name: "Careers", href: "/careers" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:opacity-50 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DYNAMIC COMPANIES - TRANSPARENT BG STYLE */}
          <div className="flex flex-col items-center lg:items-start">
            <h4
              className="font-semibold mb-6 text-sm tracking-widest opacity-60"
              style={{ color: textColor }}
            >
              OUR COMPANIES
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full max-w-[280px]">
              {loading ? (
                <div className="col-span-2 flex justify-center py-4">
                  <Loader2 className="animate-spin opacity-20" size={20} />
                </div>
              ) : (
                companies.map((company) => (
                  <Link
                    key={company.id}
                    href={`/companies/${company.id}`}
                    className="group relative flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <Image
                      src={company.mainImage || "/placeholder.svg"}
                      alt={company.companyName}
                      width={100}
                      height={45}
                      className="w-full h-auto object-contain max-h-[40px] transition-all duration-500 mix-blend-multiply"
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4
              className="font-semibold mb-6 text-sm tracking-widest opacity-60"
              style={{ color: textColor }}
            >
              CONNECT
            </h4>
            <p
              className="text-xs md:text-sm mb-4 leading-relaxed opacity-80"
              style={{ color: textColor }}
            >
              35B Primex Tower, EDSA, San Juan City, 1554 Metro Manila
            </p>
            <p
              className="font-bold mb-6 text-sm md:text-lg"
              style={{ color: accentColor }}
            >
              +63 (2) 8123-4567
            </p>

            <div className="flex gap-5">
              <a
                href="https://www.facebook.com/BuildChemSolutionsInc/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-50"
                style={{ color: textColor }}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/buildchemsolutionsincph/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-50"
                style={{ color: textColor }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:info@buildchem.com.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:opacity-50"
                style={{ color: textColor }}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 text-center text-[10px] uppercase tracking-[0.3em] opacity-40"
          style={{ borderColor: borderColor, color: textColor }}
        >
          &copy; {new Date().getFullYear()} Value Acquisitions Holdings Inc. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
