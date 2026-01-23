"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SolutionsGrid from "@/components/solutions-grid";
import { fetchAllSolutions, Solution } from "@/lib/fetch-solutions";

export const SolutionsContent = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [solutionsData, setSolutionsData] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const targetIndex = searchParams?.get("scrollTo");

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const solutions = await fetchAllSolutions();
        setSolutionsData(solutions);
      } catch (err) {
        console.error('Error loading solutions:', err);
        setError('Failed to load solutions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSolutions();
  }, []);

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

  // Fallback data if Firestore fetch fails or returns empty
  const fallbackData = [
    {
      index: 1,
      title: "Superplasticizers & High-Range Water Reducers",
      description:
        "Enhance concrete flow, reduce water-cement ratio, and achieve superior strength with our HP, PC, and SI series. Perfect for ready-mix, precast, high-performance, and fiber-reinforced concrete.",
      products: [
        { category: "BUILDCHEM HP Series", items: [
          { name: "HP 1000", pdfUrl: "https://example.com/catalogs/hp-1000.pdf" },
          { name: "HP 515", pdfUrl: "https://example.com/catalogs/hp-515.pdf" }
        ] },
        {
          category: "BUILDCHEM PC Series",
          items: [
            { name: "PC 700", pdfUrl: "https://example.com/catalogs/pc-700.pdf" },
            { name: "PC 800", pdfUrl: "https://example.com/catalogs/pc-800.pdf" },
            { name: "PC 900", pdfUrl: "https://example.com/catalogs/pc-900.pdf" },
            { name: "PC 1000", pdfUrl: "https://example.com/catalogs/pc-1000.pdf" },
            { name: "PC 1100", pdfUrl: "https://example.com/catalogs/pc-1100.pdf" },
            { name: "PC 1180", pdfUrl: "https://example.com/catalogs/pc-1180.pdf" },
            { name: "RCC", pdfUrl: "https://example.com/catalogs/rcc.pdf" }
          ],
        },
        { category: "BUILDCHEM SI Series", items: [
          { name: "SI 90-112", pdfUrl: "https://example.com/catalogs/si-90-112.pdf" },
          { name: "SI 115-111", pdfUrl: "https://example.com/catalogs/si-115-111.pdf" },
          { name: "SI 102 AIR", pdfUrl: "https://example.com/catalogs/si-102-air.pdf" }
        ] },
      ],
    },
    {
      index: 2,
      title: "Set Retarders & Accelerators",
      description:
        "Control setting times, improve workability, and ensure high early strength with our retarder and accelerator products. Perfect for remote job sites, high traffic areas, and temperature-sensitive applications.",
      products: [
        { category: "BUILDCHEM Retarders", items: [
          { name: "BUILDCHEM RETARDER", pdfUrl: "https://example.com/catalogs/retarder.pdf" },
          { name: "BUILDCHEM STABLE", pdfUrl: "https://example.com/catalogs/stable.pdf" }
        ] },
        { category: "BUILDCHEM SET Series", items: [
          { name: "BUILDCHEM SET 100", pdfUrl: "https://example.com/catalogs/set-100.pdf" },
          { name: "BUILDCHEM SET 500", pdfUrl: "https://example.com/catalogs/set-500.pdf" },
          { name: "BUILDCHEM SET 500P", pdfUrl: "https://example.com/catalogs/set-500p.pdf" }
        ] },
      ],
    },
    {
      index: 3,
      title: "Underwater Concrete Solutions",
      description:
        "Maintain concrete integrity in extreme underwater conditions with our UW series. Prevent washout while preserving workability, pumpability, and placement.",
      products: [
        { category: "BUILDCHEM UW Series", items: [
          { name: "BUILDCHEM UW", pdfUrl: "https://example.com/catalogs/uw.pdf" },
          { name: "BUILDCHEM UW50", pdfUrl: "https://example.com/catalogs/uw50.pdf" },
          { name: "BUILDCHEM BP ENERGY-100", pdfUrl: "https://example.com/catalogs/bp-energy-100.pdf" }
        ] },
      ],
    },
    {
      index: 4,
      title: "Waterproofing Solutions",
      description:
        "Chloride-free waterproofing products to prevent water ingress, enhance durability, and strengthen concrete surfaces.",
      products: [
        { category: "BUILDCHEM WP Series", items: [
          { name: "BUILDCHEM WP®10L", pdfUrl: "https://example.com/catalogs/wp-10l.pdf" },
          { name: "BUILDCHEM WP®20", pdfUrl: "https://example.com/catalogs/wp-20.pdf" },
          { name: "BUILDCHEM SBX 100", pdfUrl: "https://example.com/catalogs/sbx-100.pdf" }
        ] },
      ],
    },
    {
      index: 5,
      title: "Soil Stabilization & Road Foundation",
      description:
        "Strengthen soil and road foundations using polymer-based stabilization technology. Achieve higher durability, load capacity, and resistance to water and erosion.",
      products: [{ category: "BUILDCHEM SSTAB Series", items: [
        { name: "BUILDCHEM SSTAB-1000", pdfUrl: "https://example.com/catalogs/sstab-1000.pdf" },
        { name: "BUILDCHEM SSTAB-2000", pdfUrl: "https://example.com/catalogs/sstab-2000.pdf" }
      ] }],
    },
    {
      index: 6,
      title: "Mould Release Agents",
      description:
        "Chemicals applied to formwork surfaces to prevent fresh concrete from sticking, ensuring smooth, defect-free finishes and reducing cleaning time for molds.",
      products: [
        { category: "BUILDCHEM FORM Series", items: [
          { name: "BUILDCHEM DE-BONDING AGENT", pdfUrl: "https://example.com/catalogs/debonding-agent.pdf" },
          { name: "BUILDCHEM FORM MRA", pdfUrl: "https://example.com/catalogs/form-mra.pdf" },
          { name: "BUILDCHEM FORM WB10", pdfUrl: "https://example.com/catalogs/form-wb10.pdf" },
          { name: "BUILDCHEM FORM WB", pdfUrl: "https://example.com/catalogs/form-wb.pdf" }
        ] },
      ],
    },
    {
      index: 7,
      title: "Corrosion Protection Solutions",
      description:
        "Admixtures formulated to protect reinforcing steel from chloride attack and deterioration, extending the structural lifespan of concrete exposed to harsh environments.",
      products: [{ category: "BUILDCHEM CI Series", items: [
        { name: "BUILDCHEM®CI 1000", pdfUrl: "https://example.com/catalogs/ci-1000.pdf" },
        { name: "BUILDCHEM®CNI 500", pdfUrl: "https://example.com/catalogs/cni-500.pdf" }
      ] }],
    },
    {
      index: 8,
      title: "Curing Compounds",
      description:
        "Moisture-retaining coatings designed to control water loss in fresh concrete, promoting proper hydration, reducing cracking, and improving long-term strength.",
      products: [{ category: "BUILDCHEM CURE Series", items: [
        { name: "BUILDCHEM®CURE 100", pdfUrl: "https://example.com/catalogs/cure-100.pdf" },
        { name: "BUILDCHEM®CURE 150", pdfUrl: "https://example.com/catalogs/cure-150.pdf" }
      ] }],
    },
    {
      index: 9,
      title: "Cement Processing & Grinding Aids",
      description:
        "Additives used during cement production to improve milling efficiency, prevent agglomeration, and enhance early and final strength development.",
      products: [{ category: "BUILDCHEM CEM Series", items: [
        { name: "BUILDCHEM®CEM 100", pdfUrl: "https://example.com/catalogs/cem-100.pdf" }
      ] }],
    },
    {
      index: 10,
      title: "Cleaning & Surface Preparation Chemicals",
      description:
        "Specialized cleaners engineered to remove cement residue, efflorescence, and contaminants, preparing surfaces for coatings, repairs, or finishing.",
      products: [{ category: "BUILDCHEM ECO Series", items: [
        { name: "BUILDCHEM ECO CR", pdfUrl: "https://example.com/catalogs/eco-cr.pdf" }
      ] }],

    },
  ];

  // Transform Firestore data to match SolutionsGrid expected format
  const transformedData = (data: Solution[]) => {
    if (data.length === 0) {
      return fallbackData.map((sol) => ({
        ...sol,
        solutionId: undefined,
      }));
    }

    return data.map((solution) => ({
      index: solution.index,
      title: solution.title,
      description: solution.description,
      solutionId: solution.id,
      products: solution.series.map((series) => ({
        id: series.id,
        category: series.name,
        items: series.products.map((product) => ({
          id: product.id,
          name: product.name,
          pdfUrl: product.pdfUrl,
        })),
      })),
    }));
  };

  const displayData = transformedData(solutionsData);

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

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-500">Loading solutions...</div>
          </div>
        ) : (
          <div className="space-y-16 md:space-y-24">
            {displayData.map((sol) => (
              <div key={sol.index} id={`solution-${sol.index}`}>
                <SolutionsGrid
                  id={`solution-${sol.index}`}
                  solutionId={sol.solutionId}
                  index={sol.index}
                  title={sol.title}
                  description={sol.description}
                  products={sol.products}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
