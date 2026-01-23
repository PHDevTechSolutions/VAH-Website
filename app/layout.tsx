import React from "react"
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import { CartProvider } from "@/components/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Value Acquisitions Inc.",
  description:
    "Leading industrial holdings company managing construction, cement production, and industrial materials companies with strength, reliability, and scale.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/logo-vah.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/logo-vah.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/images/logo-vah.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
