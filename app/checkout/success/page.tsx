import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="py-24 bg-background flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <CheckCircle size={80} className="text-accent mx-auto mb-8" />

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Order Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been successfully
            processed and you will receive a confirmation email shortly.
          </p>

          <div className="bg-white border-2 border-border rounded-lg p-8 mb-8 space-y-4">
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-black">Order Status:</span>{" "}
              Processing
            </p>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-black">
                Estimated Delivery:
              </span>{" "}
              5-7 business days
            </p>
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-black">Tracking Info:</span>{" "}
              Will be sent via email
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/solutions">
              <Button className="bg-accent hover:bg-accent/90 text-white font-semibold">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-border hover:border-accent bg-transparent"
              >
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
