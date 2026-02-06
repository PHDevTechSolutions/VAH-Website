"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import Link from "next/link";
import { ShoppingCart, X, Trash2 } from "lucide-react";

export function FloatingCartButton() {
  const pathname = usePathname();
  const { cart, removeItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Only show on solutions and solution detail pages
  const isOnSolutionsPage = pathname.includes("/solutions");

  useEffect(() => {
    setIsVisible(isOnSolutionsPage && cart.length > 0);
  }, [isOnSolutionsPage, cart.length]);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-accent hover:bg-accent/80 text-primary rounded-full p-4 shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
      >
        <ShoppingCart size={24} />
        {cart.length > 0 && (
          <span className="bg-primary text-accent rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {cart.length}
          </span>
        )}
      </button>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Catalog Request</h2>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.productId}
                className="bg-card border border-border p-4 rounded-lg hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-semibold text-accent mb-1">
                      {item.solutionTitle}
                    </p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                      {item.seriesName}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="flex-shrink-0 p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              No items selected
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 space-y-3">
          <p className="text-xs text-muted-foreground text-center font-semibold uppercase tracking-wider">
            {cart.length} catalog{cart.length !== 1 ? "s" : ""} selected
          </p>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              onClick={() => setIsDrawerOpen(false)}
              className="w-full block"
            >
              <button className="w-full py-3 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg transition-all uppercase tracking-wider">
                Proceed to Checkout
              </button>
            </Link>
          )}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all uppercase tracking-wider"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
