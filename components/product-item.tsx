"use client";

import { useCart } from "@/components/cart-context";
import { CartItem } from "@/components/cart-context";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductItemProps {
  solutionId: string;
  solutionTitle: string;
  seriesId: string;
  seriesName: string;
  productId: string;
  productName: string;
  pdfUrl: string;
}

export function ProductItem({
  solutionId,
  solutionTitle,
  seriesId,
  seriesName,
  productId,
  productName,
  pdfUrl,
}: ProductItemProps) {
  const { addToCart, isInCart } = useCart();
  const [showFeedback, setShowFeedback] = useState(false);
  const inCart = isInCart(productId);

  const handleAddToCart = () => {
    if (!inCart) {
      const cartItem: CartItem = {
        solutionId,
        solutionTitle,
        seriesId,
        seriesName,
        productId,
        productName,
        pdfUrl,
      };

      const added = addToCart(cartItem);
      if (added) {
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 2000);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200">
        <span className="text-sm text-gray-700">{productName}</span>
        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`flex items-center gap-1 flex-shrink-0 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
            inCart
              ? "bg-green-50 text-green-600 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95"
          }`}
          aria-label={inCart ? "Added to cart" : "Add to Catalog Cart"}
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4" />
              Added
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Add to Catalog Cart
            </>
          )}
        </button>
      </div>

      {/* Feedback Toast */}
      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium whitespace-nowrap"
        >
          Added to cart
        </motion.div>
      )}
    </motion.div>
  );
}
