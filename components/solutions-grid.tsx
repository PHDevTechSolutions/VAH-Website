"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Product {
  category: string;
  items: string[];
}

interface SolutionsGridProps {
  id?: string;
  title: string;
  description: string;
  products: Product[];
  reverse?: boolean;
  index: number;
}

const SolutionsGrid = ({
  id,
  title,
  description,
  products,
  reverse,
  index,
}: SolutionsGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const productImages = [
    "/images/index1.png", 
    "/images/index2.png",
    "/images/index3.png",
    "/images/index4.png",
    "/images/index5.png",
    "/images/index6.png",
    "/images/index7.png",
    "/images/index8.png",
    "/images/index9.png",
    "/images/index10.png",
  ];

  const currentImage = productImages[index - 1] || "/images/buildchem.png";

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start"
    >
      <div className={`space-y-6 ${reverse ? "md:order-2" : ""}`}>
        {/* Product Line Section */}
        <div>
          <div className="inline-flex items-center space-x-2 text-blue-600 text-sm font-semibold uppercase tracking-wider mb-3">
            <span className="w-8 h-0.5 bg-blue-600 rounded-full"></span>
            <span>Product Line {String(index).padStart(2, "0")}</span>
          </div>

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4 leading-tight">
            {title}
          </h3>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg shadow-blue-100">
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Available Products
            </h4>
          </div>

          <Accordion type="single" defaultValue="item-0">
            {products.map((product, idx) => {
              const value = `item-${idx}`;
              return (
                <div key={idx} className="mb-4">
                  <AccordionItem
                    value={value}
                    className="border border-gray-300 rounded-xl px-4 bg-white hover:bg-blue-50 transition-all duration-200"
                  >
                    <AccordionTrigger
                      value={value}
                      className="text-[#0A0A0A] font-semibold hover:no-underline py-4"
                    >
                      <span className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        {product.category}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent value={value} className="pb-4">
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {product.items.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center text-sm text-gray-700 bg-white rounded-lg px-3 py-2 border border-gray-200"
                          >
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </div>
              );
            })}
          </Accordion>
        </div>
      </div>

      <div className={`${reverse ? "md:order-1" : ""}`}>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

// -------------------- Navigation Header --------------------

interface SolutionsNavProps {
  solutions: { id?: string; title: string }[];
}

export const SolutionsNav = ({ solutions }: SolutionsNavProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let current = null;
      for (const sol of solutions) {
        const el = document.getElementById(sol.id || "");
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100) current = sol.id || null;
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [solutions]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md py-3 px-6 flex space-x-6 overflow-x-auto scrollbar-hide">
      {solutions.map((sol) => (
        <a
          key={sol.id}
          href={`#${sol.id}`}
          className={`whitespace-nowrap px-3 py-1 rounded-md font-semibold transition-all ${
            activeId === sol.id
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-blue-50"
          }`}
        >
          {sol.title}
        </a>
      ))}
    </nav>
  );
};

// -------------------- Page Wrapper --------------------

interface SolutionsPageProps {
  solutionsData: {
    id?: string;
    title: string;
    description: string;
    products: Product[];
  }[];
}

export const SolutionsPage = ({ solutionsData }: SolutionsPageProps) => {
  return (
    <div>
      <SolutionsNav
        solutions={solutionsData.map((s) => ({ id: s.id, title: s.title }))}
      />

      <div className="space-y-32 mt-6">
        {solutionsData.map((sol, idx) => (
          <SolutionsGrid
            key={sol.id}
            id={sol.id}
            title={sol.title}
            description={sol.description}
            products={sol.products}
            index={idx + 1}
            reverse={idx % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default SolutionsGrid;
