"use client";

import { useState } from "react";
import type React from "react";
import toast from "react-hot-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GoldButton } from "@/components/gold-button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("✅ Your message has been sent!");
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(`❌ ${error.message || "Failed to send message"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/HERO.png"
            alt="Modern corporate buildings"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Get in touch with our team to discuss partnership opportunities,
            investments, or general inquiries.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Details */}
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-black">Let's Connect</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're interested in partnership opportunities,
                investment inquiries, or general questions, we're here to help.
              </p>

              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail size={24} className="text-black shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      info@valueacquisitions.com
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone size={24} className="text-black shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <p className="text-muted-foreground">+63 917 514 2168</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-black shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">
                      Office Address
                    </h3>
                    <p className="text-muted-foreground">
                      35B Primex Tower, EDSA, corner Connecticut, San Juan City,
                      1554 Metro Manila
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <Clock size={24} className="text-black shrink-0" />
                  <div>
                    <h3 className="font-semibold text-black mb-1">
                      Office Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-muted-foreground">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map Below Contact Details */}
              <div className="mt-12 rounded-lg overflow-hidden h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.951172645823!2d121.0562963758742!3d14.601857377044297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7ed028007bf%3A0xfa756d0be917a0cf!2sPrimex%20Tower!5e0!3m2!1sen!2sph!4v1765959826579!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Subject <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCB485] transition-all resize-none"
                  />
                </div>

                {/* Use imported GoldButton */}
                <GoldButton type="submit" className="w-full">
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </GoldButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
