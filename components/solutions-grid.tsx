"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ProductItem } from "@/components/product-item"
import { cn } from "@/lib/utils"

interface ProductSubItem {
  id?: string
  name: string
  pdfUrl: string
}

interface Product {
  id?: string
  category: string
  items: ProductSubItem[]
}

interface SolutionsGridProps {
  id?: string
  solutionId?: string
  title: string
  description: string
  products: Product[]
  reverse?: boolean
  index: number
}

const SolutionsGrid = ({
  id,
  solutionId,
  title,
  description,
  products,
  reverse,
  index,
}: SolutionsGridProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "-10% 0px -40% 0px",
  })

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")

  useEffect(() => {
    if (isInView) {
      const slug = slugify(title)
      document.title = `${title} | Buildchem Solutions`
      window.history.replaceState(null, "", `#${slug}`)
    }
  }, [isInView, title])

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
  ]

  const currentImage = productImages[index - 1] || "/images/buildchem.png"

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start py-16 border-b border-gray-100 last:border-0 scroll-mt-24"
    >
      {/* LEFT CONTENT */}
      <div className={cn("space-y-8", reverse ? "md:order-2" : "md:order-1")}>
        <div>
          <div className="inline-flex items-center space-x-3 text-blue-600 mb-6">
            <span className="w-12 h-[2px] bg-blue-600" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">
              Product Line {String(index).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h3>

          <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
            {description}
          </p>
        </div>

        {/* ACCORDION */}
        <div className="bg-[#F8FAFC] rounded-3xl p-2 border border-gray-100">
          <Accordion collapsible className="w-full space-y-2">
            {products.map((product, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${index}-${idx}`}
                className="border-0 bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                  <div className="flex items-center text-left">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                      <ChevronRight className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-900 font-bold tracking-tight">
                      {product.category}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-4">
                  {/* 🔥 SCROLL CONTAINER FIX */}
                  <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {product.items.map((item, i) => (
                      <ProductItem
                        key={i}
                        solutionId={solutionId || `solution-${index}`}
                        solutionTitle={title}
                        seriesId={product.id || `series-${idx}`}
                        seriesName={product.category}
                        productId={item.id || item.name}
                        productName={item.name}
                        pdfUrl={item.pdfUrl}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div
        className={cn(
          "relative md:sticky md:top-32",
          reverse ? "md:order-1" : "md:order-2"
        )}
      >
        <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
          <Image
            src={currentImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default SolutionsGrid
