"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { Footer } from "@/components/footer";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// Firestore Imports
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Process items and prepare "Force Download" URLs
      // FIX: Removed .filter() so that all 3 items stay in the list
      const processedItems = cart.map((item) => {
        let downloadUrl = item.pdfUrl || "";
        
        // Apply Cloudinary "Force Download" fix only if URL exists
        if (downloadUrl && downloadUrl.includes("cloudinary")) {
          downloadUrl = downloadUrl
            .replace("/f_auto,q_auto/", "/") 
            .replace("/upload/", "/upload/fl_attachment/");
        }

        return {
          productId: item.productId,
          productName: item.productName,
          solutionTitle: item.solutionTitle,
          pdfUrl: downloadUrl, // Will be a real link or an empty string
        };
      });

      const inquiryData = {
        customerName: formData.name,
        customerEmail: formData.email,
        company: formData.company,
        requestedItems: processedItems,
        source: "Website Catalog Request",
        status: "new",
        requestedAt: serverTimestamp(),
      };

      // 2. Record lead in Firestore
      const docRef = await addDoc(collection(db, "catalog_requests"), inquiryData);

      // 3. Trigger Email API
      const response = await fetch("/api/solutions/send-catalogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryId: docRef.id,
          catalogs: processedItems,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || "Failed to send automated email, but your request was recorded."
        );
      }

      // 4. Cleanup
      clearCart();
      setSuccess(true);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE
  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Sent!</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thank you for your interest. We've recorded your request and sent
              the catalogs to <strong>{formData.email}</strong>.
            </p>
            <Link href="/solutions">
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95">
                Return to Solutions
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your request list is empty</h1>
            <p className="text-gray-600 mb-8">Browse our solutions and add catalogs to your request list.</p>
            <Link href="/solutions">
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">
                Browse Solutions
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Solutions
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Request Catalogs</h1>
              <p className="text-gray-500 mb-10">Complete the form below to receive detailed technical datasheets.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@company.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} placeholder="Your Construction Firm" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    "Request Selected Catalogs"
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-32">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Selected Products ({cart.length})</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.productId} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600 mb-1">{item.solutionTitle}</p>
                      <p className="text-sm font-bold text-gray-900">{item.productName}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.seriesName}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-400 text-center">All catalogs will be sent as PDF attachments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}