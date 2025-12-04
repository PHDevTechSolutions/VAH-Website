"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

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
  title: string;
  description: string;
  products: Product[];
  reverse?: boolean;
  index: number;
}

const SolutionsGrid = ({
  title,
  description,
  products,
  reverse,
  index,
}: SolutionsGridProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* LEFT SIDE */}
      <div className={`${reverse ? "md:order-2" : ""}`}>
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

      {/* RIGHT SIDE ACCORDION WITH CARD SHADOW */}
      <div className={`${reverse ? "md:order-1" : ""}`}>
        <div
          className="
            bg-white 
            rounded-2xl 
            p-6 
            border border-gray-200
            shadow-lg shadow-blue-100
          "
        >
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Available Products
            </h4>
          </div>

          <Accordion type="single" defaultValue="item-0">
            {products.map((product, idx) => {
              const value = `item-${idx}`; // ✅ define value here
              return (
                <AccordionItem
                  key={idx}
                  value={value} // must pass value here
                  className="
                    border border-gray-300 
                    rounded-xl 
                    px-4 
                    bg-white
                    hover:bg-blue-50
                    transition-all duration-200
                  "
                >
                  {/* Trigger */}
                  <AccordionTrigger value={value} className="text-[#0A0A0A] font-semibold hover:no-underline py-4">
                    <span className="flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                      {product.category}
                    </span>
                  </AccordionTrigger>

                  {/* CONTENT */}
                  <AccordionContent value={value} className="pb-4">
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {product.items.map((item, i) => (
                        <div
                          key={i}
                          className="
                            flex items-center 
                            text-sm 
                            text-gray-700 
                            bg-white 
                            rounded-lg 
                            px-3 py-2 
                            border border-gray-200
                          "
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionsGrid;
