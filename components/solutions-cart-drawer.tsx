"use client";

import { useCart } from "@/components/cart-context";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function SolutionsCartDrawer() {
  const { cart, removeFromCart, clearCart, cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Sticky Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 group"
        aria-label="Solutions cart"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] font-bold text-blue-600 bg-white rounded-full border border-blue-100 shadow-sm">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-sm font-bold tracking-tight uppercase">
          Catalog Cart
        </span>
      </button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                Solutions Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-900 font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                    Select products from the catalog to add them here.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 border border-gray-100 rounded-2xl bg-white shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-1">
                          {item.solutionTitle}
                        </p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.seriesName}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4 bg-gray-50/50">
                <Link
                  href="/solutions/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                >
                  Request Catalogs
                </Link>

                <button
                  onClick={() => clearCart()}
                  className="w-full py-3 text-sm text-gray-500 hover:text-red-600 font-bold transition-colors"
                >
                  Clear All Items
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
