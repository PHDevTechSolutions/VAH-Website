"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export function ContactContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    // Reset form
    setFormData({
      fullName: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <section className="grow px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20" style={{ background: "#261c12" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Side - Contact Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#DCB485" }}>
              Get in touch
            </h2>

            {/* Office Address */}
            <div className="mb-8 flex gap-4">
              <div className="shrink-0">
                <MapPin size={24} style={{ color: "#DCB485" }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-base md:text-lg" style={{ color: "#DCB485" }}>
                  Office Address
                </h3>
                <p className="text-sm md:text-base" style={{ color: "#FFFFFF" }}>
                  Block 14, Lot 1, 10TH Street, Golden Mile Business Park, Brgy. Maduya, City of Carmona, Cavite, Carmona, Philippines
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mb-8 flex gap-4">
              <div className="shrink-0">
                <Mail size={24} style={{ color: "#DCB485" }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-base md:text-lg" style={{ color: "#DCB485" }}>
                  Email
                </h3>
                <a
                  href="mailto:info@valueacquisitions.com"
                  className="text-sm md:text-base hover:opacity-80 transition-opacity"
                  style={{ color: "#FFFFFF" }}
                >
                  info@valueacquisitions.com
                </a>
              </div>
            </div>

            {/* Telephone */}
            <div className="mb-8 flex gap-4">
              <div className="shrink-0">
                <Phone size={24} style={{ color: "#DCB485" }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-base md:text-lg" style={{ color: "#DCB485" }}>
                  Telephone
                </h3>
                <a
                  href="tel:+639175142168"
                  className="text-sm md:text-base hover:opacity-80 transition-opacity"
                  style={{ color: "#FFFFFF" }}
                >
                  +63 917 514 2168
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-4">
              <div className="shrink-0">
                <Clock size={24} style={{ color: "#DCB485" }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-base md:text-lg" style={{ color: "#DCB485" }}>
                  Office Hours
                </h3>
                <p className="text-sm md:text-base" style={{ color: "#FFFFFF" }}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm md:text-base" style={{ color: "#FFFFFF" }}>
                  Saturday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-sm md:text-base" style={{ color: "#FFFFFF" }}>
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Map Container */}
            <div className="mt-12 rounded-lg overflow-hidden h-64 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15463.788358680811!2d121.07034672834733!3d14.314506154854623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d766f1ccefab%3A0x5da93d4097464345!2sGolden%20Mile%20Business%20Park!5e0!3m2!1sen!2sph!4v1764729906423!5m2!1sen!2sph"
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
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: "#DCB485" }}>
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Full Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Company / Organization */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Email Address <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Phone Number <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Subject <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm md:text-base font-medium mb-2"
                  style={{ color: "#DCB485" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    background: "#1a1410",
                    color: "#FFFFFF",
                    borderColor: "#3c3223",
                    borderWidth: "1px",
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(220, 180, 133, 0.1)")}
                  onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-md font-semibold text-base md:text-lg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{
                  background: "#DCB485",
                  color: "#261c12",
                }}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
