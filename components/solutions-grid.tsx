"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductItem } from "@/components/product-item"

interface Product {
  id?: string
  category: string
  items: Array<{
    id?: string
    name: string
    pdfUrl: string
  }>
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

const SolutionsGrid = ({ id, solutionId, title, description, products, reverse, index }: SolutionsGridProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const productImages = [
    "/images/index1.png", // index 1
    "/images/index2.png", // index 2
    "/images/index3.png", // index 3
    "/images/index4.png", // index 4
    "/images/index5.png", // index 5
    "/images/index6.png", // index 6
    "/images/index7.png", // index 7
    "/images/index8.png", // index 8
    "/images/index9.png", // index 9
    "/images/index10.png", // index 10
  ]

  const currentImage = productImages[index - 1] || "/images/buildchem.png"

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

          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4 leading-tight">{title}</h3>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">{description}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg shadow-blue-100">
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider">Available Products</h4>
          </div>

          <Accordion type="single" defaultValue="item-0">
            {products.map((product, idx) => {
              const value = `item-${idx}`
              return (
                <div key={idx} className="mb-4">
                  <AccordionItem
                    value={value}
                    className="border border-gray-300 rounded-xl px-4 bg-white hover:bg-blue-50 transition-all duration-200"
                  >
                    <AccordionTrigger value={value} className="text-[#0A0A0A] font-semibold hover:no-underline py-4">
                      <span className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-blue-600" />
                        {product.category}
                      </span>
                    </AccordionTrigger>

                    <AccordionContent value={value} className="pb-4">
                      <div className="space-y-2 pt-1">
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
                </div>
              )
            })}
          </Accordion>
        </div>
      </div>

      <div className={`${reverse ? "md:order-1" : ""}`}>
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image src={currentImage || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </div>
    </motion.div>
  )
}

export default SolutionsGrid
