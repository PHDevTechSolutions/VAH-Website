"use client";

import { useState } from "react";
import { ChevronDown, FileText, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useParams } from "next/navigation";

interface Product {
  name: string;
  pdfUrl: string;
  fileName: string;
}

interface Series {
  id: string;
  name: string;
  products: Product[];
}

interface SeriesAccordionProps {
  series: Series[];
  solutionTitle?: string;
}

export function SeriesAccordion({
  series,
  solutionTitle = "Solution",
}: SeriesAccordionProps) {
  const params = useParams();
  const solutionId = params.id as string;
  const { cart, addItem } = useCart();
  const [expandedId, setExpandedId] = useState<string | null>(
    series[0]?.id || null,
  );
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const toggleSeries = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddToCart = (product: Product, seriesName: string) => {
    const productId = `${solutionId}-${seriesName}-${product.name}`.replace(
      /\s+/g,
      "-",
    );

    addItem({
      productId,
      productName: product.name,
      seriesName,
      solutionTitle,
      pdfUrl: product.pdfUrl,
    });

    setAddedItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedItems((prev) => {
        const updated = new Set(prev);
        updated.delete(productId);
        return updated;
      });
    }, 2000);
  };

  const getSolutionTitle = () => solutionTitle; // Declare the getSolutionTitle function

  return (
    <div className="space-y-4">
      {series.map((s) => {
        const isOpen = expandedId === s.id;

        return (
          <div
            key={s.id}
            className={`border transition-all duration-300 rounded-lg overflow-hidden ${
              isOpen
                ? "border-primary bg-card shadow-lg"
                : "border-border bg-card hover:border-accent/50"
            }`}
          >
            {/* Header */}
            <button
              onClick={() => toggleSeries(s.id)}
              className="w-full flex items-center justify-between p-6 md:p-8 text-left"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold transition-colors ${
                    isOpen
                      ? "bg-accent border-accent text-primary"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  {s.products.length}
                </span>
                <h3
                  className={`text-xl md:text-3xl font-bold uppercase italic tracking-tight transition-colors ${
                    isOpen ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.name}
                </h3>
              </div>
              <ChevronDown
                size={24}
                className={`text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
              />
            </button>

            {/* Content (Products List) */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-8 md:px-8 md:pb-10 pt-0">
                  <div className="w-full h-px bg-border mb-6"></div>

                  {s.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {s.products.map((product, idx) => {
                        const productId =
                          `${solutionId}-${s.name}-${product.name}`.replace(
                            /\s+/g,
                            "-",
                          );
                        const isAdded =
                          addedItems.has(productId) ||
                          cart.some((item) => item.productId === productId);

                        return (
                          <div
                            key={idx}
                            className="group bg-background border border-border p-4 rounded-lg flex items-center justify-between hover:border-accent hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="bg-card p-2.5 rounded-lg text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                                <FileText size={20} />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-foreground uppercase text-xs truncate group-hover:text-accent transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider truncate">
                                  Data Sheet (PDF)
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(product, s.name)}
                              className={`ml-4 p-2 rounded-lg transition-colors flex-shrink-0 ${
                                isAdded
                                  ? "bg-emerald-600 text-white"
                                  : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                              }`}
                              title={
                                isAdded ? "Added to catalog" : "Add to catalog"
                              }
                            >
                              {isAdded ? (
                                <Check size={16} />
                              ) : (
                                <Plus size={16} />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center py-4">
                      No technical documents available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
