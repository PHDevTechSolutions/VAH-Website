import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import type { Metadata } from "next"
import Link from "next/link"
import { GoldButton } from "@/components/gold-button"
import Image from "next/image"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata: Metadata = {
  title: "Our Companies | Industrial Holdings Group",
  description:
    "Explore our portfolio of market-leading companies in construction, cement production, and industrial materials.",
}

const companies = [
  {
    id: "buildchem",
    name: "Buildchem",
    description:
      "Leading provider of construction chemicals and building materials solutions with innovative products for modern construction needs.",
    logo: "/images/buildchem.png",
  },
  {
    id: "oko",
    name: "OKO",
    description:
      "Innovative construction and infrastructure development company delivering excellence in large-scale projects.",
    logo: "/images/oko.png",
  },
  {
    id: "progressive-dynamics",
    name: "Progressive Dynamics",
    description:
      "Advanced engineering and industrial manufacturing solutions provider with cutting-edge technology and expertise.",
    logo: "/images/progdy.png",
  },
  {
    id: "progressive-materials",
    name: "Progressive Materials",
    description: "Premium industrial materials and specialty construction products supplier for diverse applications.",
    logo: "/images/progma.png",
  },
]

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/HERO.png" alt="Modern corporate buildings" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">Our Companies</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty">
            A diverse portfolio of market-leading companies driving excellence across construction, cement production,
            and industrial materials sectors.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {companies.map((company, index) => (
              <Link href={`/companies/${company.id}`} key={company.name}>
                <div
                  className="bg-white border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] p-12 space-y-6 group transition-all duration-500 animate-fade-in relative overflow-hidden rounded-lg cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative z-10">
                    <div className="h-32 flex items-center justify-start mb-6">
                      <Image
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        width={180}
                        height={100}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">{company.description}</p>
                    </div>
                    <div className="pt-6">
                      <div className="text-sm font-semibold text-black group-hover:text-accent flex items-center space-x-2 transition-colors duration-500">
                        <span>Learn More</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Overview */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader title="Industry Focus" subtitle="Strategic presence across critical industrial sectors" />
          <div className="grid md:grid-cols-3 gap-12 mt-16">
            {[
              {
                title: "Construction",
                count: "3 Companies",
                description:
                  "From infrastructure to commercial buildings, our construction companies deliver projects of all scales.",
              },
              {
                title: "Cement Production",
                count: "1 Company",
                description:
                  "Modern production facilities providing essential cement products for the construction industry.",
              },
              {
                title: "Industrial Materials",
                count: "2 Companies",
                description:
                  "Comprehensive material suppliers serving construction and industrial applications nationwide.",
              },
            ].map((industry, index) => (
              <div
                key={industry.title}
                className="bg-white p-8 space-y-4 hover:shadow-xl transition-shadow duration-500 animate-fade-in rounded-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-black">{industry.title}</h3>
                  <span className="text-sm font-semibold text-accent">{industry.count}</span>
                </div>
                <div className="h-1 w-16 gradient-gold-accent rounded-full" />
                <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold-to-transparent opacity-10" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Interested in Partnering With Our Companies?</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Reach out to explore collaboration opportunities with our portfolio companies.
          </p>
          <Link href="/contact">
            <GoldButton>Contact Us</GoldButton>
          </Link>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
