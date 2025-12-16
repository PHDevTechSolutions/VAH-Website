"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GoldButton } from "@/components/gold-button"
import { Mail, Phone, MapPin, Building2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission
    alert("Thank you for your message. We will get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/HERO.png" alt="Modern corporate buildings" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Get in touch with our team to discuss partnership opportunities, investments, or general inquiries.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="h-1 w-20 bg-accent rounded-full" />
                <h2 className="text-4xl font-bold text-black">Let's Connect</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're interested in partnership opportunities, investment inquiries, or general questions
                  about our holdings group, we're here to help.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0 rounded-lg">
                    <Mail size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p className="text-muted-foreground">info@industrialholdings.com</p>
                    <p className="text-muted-foreground">investor.relations@industrialholdings.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0 rounded-lg">
                    <Phone size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">+1 (555) 123-4568 (Investor Relations)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0 rounded-lg">
                    <MapPin size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Address</h3>
                    <p className="text-muted-foreground">Industrial Holdings Group</p>
                    <p className="text-muted-foreground">123 Industrial Parkway, Suite 500</p>
                    <p className="text-muted-foreground">Corporate City, ST 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent flex items-center justify-center shrink-0 rounded-lg">
                    <Building2 size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary p-8 md:p-12 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-black mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors rounded-lg"
                  >
                    <option value="">Select a subject</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="press">Press / Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-border focus:border-accent focus:outline-none transition-colors resize-none rounded-lg"
                  />
                </div>

                <GoldButton type="submit" className="w-full">
                  Send Message
                </GoldButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[450px] bg-secondary">
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.951172645823!2d121.0562963758742!3d14.601857377044297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7ed028007bf%3A0xfa756d0be917a0cf!2sPrimex%20Tower!5e0!3m2!1sen!2sph!4v1765864599368!5m2!1sen!2sph"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
