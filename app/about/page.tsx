import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { Target, Eye, Award, Leaf } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { ScrollToTop } from "@/components/scroll-to-top";

export const metadata: Metadata = {
  title: "About Us | Industrial Holdings Group",
  description:
    "Learn about our mission, vision, and commitment to industrial excellence, sustainability, and long-term value creation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
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
            About Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            Value Acquisitions Holdings Inc. is a holding company leading brands
            in trade, distribution, modern building materials, and industrial
            construction solutions.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[324px] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/corporate-hierarchy.jpg"
                alt="Company headquarters"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-6">
              <div className="h-1 w-20 bg-accent rounded-full" />
              <h2 className="text-4xl font-bold text-black">Who Are We</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Value Acquisitions Holdings Inc. oversees a portfolio of brands
                that support the nation’s construction, commercial, and
                industrial sectors. Through unified leadership and strategic
                direction, we enable each company to operate with excellence,
                efficiency, and long-term growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our group is built on a commitment to quality, innovation, and
                dependable service, delivering essential products and solutions
                that drive progress across multiple industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 space-y-6 rounded-lg">
              <div className="w-16 h-16 bg-accent flex items-center justify-center rounded-lg">
                <Target size={32} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-black">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To build and manage market-leading industrial companies that
                deliver essential products and services, create sustainable
                value, and contribute to economic development through
                operational excellence and strategic innovation.
              </p>
            </div>
            <div className="bg-white p-12 space-y-6 rounded-lg">
              <div className="w-16 h-16 bg-accent flex items-center justify-center rounded-lg">
                <Eye size={32} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-black">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted and respected industrial holdings
                company, recognized for developing world-class businesses,
                fostering innovation, and setting the standard for responsible
                corporate stewardship in our industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="Strategic Pillars"
            subtitle="The foundation of our long-term approach"
          />
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            {[
              {
                icon: Award,
                title: "Governance & Excellence",
                description:
                  "We maintain the highest standards of corporate governance, operational excellence, and ethical business practices across all our portfolio companies. Our rigorous oversight and performance management systems ensure accountability and continuous improvement.",
              },
              {
                icon: Leaf,
                title: "Sustainability & Growth",
                description:
                  "Sustainability is integral to our business strategy. We invest in technologies and practices that reduce environmental impact, enhance resource efficiency, and create long-term value while supporting economic development in our communities.",
              },
            ].map((pillar) => (
              <div key={pillar.title} className="space-y-6">
                <div className="w-16 h-16 bg-black flex items-center justify-center rounded-lg">
                  <pillar.icon size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-black">
                  {pillar.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Approach */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
          <h2 className="text-4xl md:text-5xl font-bold">
            Leadership Approach
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Our leadership team brings decades of industrial experience,
            combining strategic vision with operational expertise. We empower
            our portfolio companies with the resources, guidance, and autonomy
            they need to excel in their markets while maintaining strong
            alignment with our corporate values and standards.
          </p>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
