"use client";

import { useState, useRef } from "react";
import type React from "react";
import toast from "react-hot-toast";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GoldButton } from "@/components/gold-button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Upload, 
  CheckCircle2, 
  Loader2, 
  X 
} from "lucide-react";
import Image from "next/image";
import { ScrollToTop } from "@/components/scroll-to-top";
import { motion, AnimatePresence } from "framer-motion";

// --- EXTERNAL LOGIC ---
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- CLOUDINARY UPLOAD FUNCTION ---
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  const uploadPreset = "taskflow_preset"; // Replace with your preset
  const cloudName = "dvmpn8mjh"; // Replace with your cloud name

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Cloudinary Upload Failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw error;
  }
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setStatus("idle");

    try {
      // 1. Upload to Cloudinary if a file is attached
      let finalFileUrl = "";
      if (file) {
        finalFileUrl = await uploadToCloudinary(file);
      }

      const submissionData = {
        ...formData,
        attachmentUrl: finalFileUrl,
        status: "unread",
        type: "contact_inquiry",
        processStatus: "pending",
      };

      // 2. Save to Firebase
      await addDoc(collection(db, "contact_inquiries"), {
        ...submissionData,
        createdAt: serverTimestamp(),
      });

      // 3. Send Email via API Route (Optional)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) throw new Error("Failed to send message via API");

      toast.success("✅ Your message has been sent!");
      setStatus("success");
      
      // Reset form
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFile(null);

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(`❌ ${error.message || "Failed to send message"}`);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/HERO.png"
            alt="Modern corporate buildings"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our team to discuss partnership opportunities,
              investments, or general inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Left Side - Contact Details */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-black mb-6">Let's Connect</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're interested in partnership opportunities,
                  investment inquiries, or general questions, we're here to help.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Mail size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Email</h3>
                    <p className="text-muted-foreground">info@valueacquisitions.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Phone size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Phone</h3>
                    <p className="text-muted-foreground">+63 917 514 2168</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Office Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      35B Primex Tower, EDSA, corner Connecticut, <br />
                      San Juan City, 1554 Metro Manila
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <Clock size={24} className="text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Sat: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden h-64 shadow-inner border border-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.1661646247345!2d121.0538!3d14.602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM2JzA3LjIiTiAxMjHCsDAzJzEzLjciRQ!5e0!3m2!1sen!2sph!4v1625648123456!5m2!1sen!2sph"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Side - Form Container */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-200 shadow-xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-black">Message Sent!</h2>
                    <p className="text-gray-500 max-w-xs">
                      Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-[#DCB485] font-semibold hover:underline transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="text-3xl font-bold text-black mb-8">Send us a message</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          placeholder="Jane Doe"
                          className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-[#DCB485] focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Organization"
                          className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-[#DCB485] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="jane@example.com"
                          className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-[#DCB485] focus:outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+63 000 000 0000"
                          className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-[#DCB485] focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiry Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-[#DCB485] focus:outline-none transition-all appearance-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="investment">Investment Inquiry</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Message</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#DCB485] focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* File Upload Logic integrated into UI */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Attachments (Optional)</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`group border-2 border-dashed rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${file ? 'border-[#DCB485] bg-orange-50/30' : 'border-gray-200 hover:border-[#DCB485]'}`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={(e) => setFile(e.target.files?.[0] || null)} 
                          className="hidden" 
                        />
                        <div className="flex items-center gap-3">
                          <Upload size={18} className={file ? "text-[#DCB485]" : "text-gray-400 group-hover:text-[#DCB485]"} />
                          <span className="text-sm font-medium text-gray-600">
                            {file ? file.name : "Upload documents or briefs"}
                          </span>
                        </div>
                        {file && (
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="p-1 hover:bg-red-100 rounded-full text-red-500"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <GoldButton type="submit" className="w-full py-6" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={20} /> Sending...
                        </span>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </GoldButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}