import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
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
      <head>
        <meta name="google-site-verification" content="ZmQ30Eoo_grE_3GEMiZoWyKFGhj6LdE2hxvWpUKyAFE" />
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TC7926M3');</script>

      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TC7926M3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
