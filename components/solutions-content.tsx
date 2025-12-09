"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SolutionsGrid from "@/components/solutions-grid";

export const SolutionsContent = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const targetIndex = searchParams?.get("scrollTo");

  useEffect(() => {
    if (targetIndex && pathname === "/solutions") {
      const element = document.getElementById(`solution-${targetIndex}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, [targetIndex, pathname]);

  const solutionsData = [
    {
      index: 1,
      title: "Superplasticizers & High-Range Water Reducers",
      description:
        "Enhance concrete flow, reduce water-cement ratio, and achieve superior strength with our HP, PC, and SI series. Perfect for ready-mix, precast, high-performance, and fiber-reinforced concrete.",
      products: [
        { category: "BUILDCHEM HP Series", items: ["HP 1000", "HP 515"] },
        {
          category: "BUILDCHEM PC Series",
          items: ["PC 700", "PC 800", "PC 900", "PC 1000", "PC 1100", "PC 1180", "RCC"],
        },
        { category: "BUILDCHEM SI Series", items: ["SI 90-112", "SI 115-111", "SI 102 AIR"] },
      ],
    },
    {
      index: 2,
      title: "Set Retarders & Accelerators",
      description:
        "Control setting times, improve workability, and ensure high early strength with our retarder and accelerator products. Perfect for remote job sites, high traffic areas, and temperature-sensitive applications.",
      products: [
        { category: "BUILDCHEM Retarders", items: ["BUILDCHEM RETARDER", "BUILDCHEM STABLE"] },
        { category: "BUILDCHEM SET Series", items: ["BUILDCHEM SET 100", "BUILDCHEM SET 500", "BUILDCHEM SET 500P"] },
      ],
    },
    {
      index: 3,
      title: "Underwater Concrete Solutions",
      description:
        "Maintain concrete integrity in extreme underwater conditions with our UW series. Prevent washout while preserving workability, pumpability, and placement.",
      products: [
        { category: "BUILDCHEM UW Series", items: ["BUILDCHEM UW", "BUILDCHEM UW50", "BUILDCHEM BP ENERGY-100"] },
      ],
    },
    {
      index: 4,
      title: "Waterproofing Solutions",
      description:
        "Chloride-free waterproofing products to prevent water ingress, enhance durability, and strengthen concrete surfaces.",
      products: [
        { category: "BUILDCHEM WP Series", items: ["BUILDCHEM WP®10L", "BUILDCHEM WP®20", "BUILDCHEM SBX 100"] },
      ],
    },
    {
      index: 5,
      title: "Soil Stabilization & Road Foundation",
      description:
        "Strengthen soil and road foundations using polymer-based stabilization technology. Achieve higher durability, load capacity, and resistance to water and erosion.",
      products: [{ category: "BUILDCHEM SSTAB Series", items: ["BUILDCHEM SSTAB-1000", "BUILDCHEM SSTAB-2000"] }],
    },
    {
      index: 6,
      title: "Mould Release Agents",
      description:
        "Chemicals applied to formwork surfaces to prevent fresh concrete from sticking, ensuring smooth, defect-free finishes and reducing cleaning time for molds.",
      products: [
        { category: "BUILDCHEM FORM Series", items: ["BUILDCHEM DE-BONDING AGENT", "BUILDCHEM FORM MRA", "BUILDCHEM FORM WB10", "BUILDCHEM FORM WB"] },
      ],
    },
    {
      index: 7,
      title: "Corrosion Protection Solutions",
      description:
        "Admixtures formulated to protect reinforcing steel from chloride attack and deterioration, extending the structural lifespan of concrete exposed to harsh environments.",
      products: [{ category: "BUILDCHEM CI Series", items: ["BUILDCHEM®CI 1000", "BUILDCHEM®CNI 500"] }],
    },
    {
      index: 8,
      title: "Curing Compounds",
      description:
        "Moisture-retaining coatings designed to control water loss in fresh concrete, promoting proper hydration, reducing cracking, and improving long-term strength.",
      products: [{ category: "BUILDCHEM CURE Series", items: ["BUILDCHEM®CURE 100", "BUILDCHEM®CURE 150"] }],
    },
    {
      index: 9,
      title: "Cement Processing & Grinding Aids",
      description:
        "Additives used during cement production to improve milling efficiency, prevent agglomeration, and enhance early and final strength development.",
      products: [{ category: "BUILDCHEM CEM Series", items: ["BUILDCHEM®CEM 100"] }],
    },
    {
      index: 10,
      title: "Cleaning & Surface Preparation Chemicals",
      description:
        "Specialized cleaners engineered to remove cement residue, efflorescence, and contaminants, preparing surfaces for coatings, repairs, or finishing.",
      products: [{ category: "BUILDCHEM ECO Series", items: ["BUILDCHEM ECO CR"] }],

    },
  ];

  return (
    <section id="products" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Complete Product Catalog
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {solutionsData.map((sol) => (
            <div key={sol.index} id={`solution-${sol.index}`}>
              <SolutionsGrid
                id={`solution-${sol.index}`} // add this prop
                index={sol.index}
                title={sol.title}
                description={sol.description}
                products={sol.products}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
