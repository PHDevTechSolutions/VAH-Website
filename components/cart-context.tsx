'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  solutionId: string;
  solutionTitle: string;
  seriesId: string;
  seriesName: string;
  productId: string;
  productName: string;
  pdfUrl: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => boolean;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('solutions-cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    setIsMounted(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('solutions-cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (item: CartItem): boolean => {
    // Prevent duplicates
    if (cart.some((cartItem) => cartItem.productId === item.productId)) {
      return false;
    }
    setCart([...cart, item]);
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some((item) => item.productId === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
