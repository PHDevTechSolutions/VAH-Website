'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/cart-context';
import { Footer } from '@/components/footer';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({ email: '', name: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/solutions/send-catalogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          company: formData.company,
          catalogs: cart.map(item => ({
            productId: item.productId,
            productName: item.productName,
            pdfUrl: item.pdfUrl,
            solutionTitle: item.solutionTitle,
          })),
        }),
      });

      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // SUCCESS PAGE
  // --------------------------
  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted</h1>
            <p className="text-gray-600 mb-6">
              We've received your catalog request. The product catalogs will be sent to your email shortly.
            </p>
            <Link href="/solutions">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Back to Solutions
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --------------------------
  // EMPTY CART PAGE
  // --------------------------
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add products to your cart before checking out.</p>
            <Link href="/solutions">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // --------------------------
  // MAIN CHECKOUT FORM
  // --------------------------
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 py-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <Link href="/solutions" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Solutions
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* FORM */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Request Catalogs</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Catalog Request'
                  )}
                </button>
              </form>
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div className="sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.productId} className="pb-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-blue-600 font-semibold uppercase mb-1">{item.solutionTitle}</p>
                            <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                            <p className="text-xs text-gray-500">{item.seriesName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-700">Total Items</span>
                    <span className="text-lg font-bold text-gray-900">{cart.length}</span>
                  </div>

                  <p className="text-xs text-gray-500 pt-2">
                    Catalogs will be delivered via email to the address you provide.
                  </p>
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
