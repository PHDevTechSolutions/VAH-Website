import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const companiesData = {
  buildchem: {
    name: "Buildchem",
    logo: "/buildchem-logo.jpg",
    description:
      "Buildchem Solutions Inc. is a leading provider of construction chemicals and building materials solutions, delivering innovative products for modern construction needs.",
    overview: `Buildchem has established itself as a trusted partner in the construction industry, offering a comprehensive range of products that enhance building performance, durability, and sustainability. Our commitment to innovation and quality has made us a preferred supplier for contractors and developers across the region.`,
    services: [
      "Construction Chemicals",
      "Waterproofing Solutions",
      "Concrete Admixtures",
      "Tile Adhesives & Grouts",
      "Protective Coatings",
      "Repair & Rehabilitation Products",
    ],
    keyFeatures: [
      "Over 20 years of industry experience",
      "ISO 9001 certified quality management",
      "Extensive product portfolio",
      "Technical support and training",
      "Sustainable and eco-friendly solutions",
    ],
  },
  oko: {
    name: "OKO",
    logo: "/oko-logo.jpg",
    description:
      "OKO is an innovative construction and infrastructure development company delivering excellence in large-scale projects across multiple sectors.",
    overview: `OKO combines cutting-edge construction methodologies with traditional craftsmanship to deliver projects that exceed client expectations. Our integrated approach ensures seamless project execution from planning through completion.`,
    services: [
      "Commercial Construction",
      "Infrastructure Development",
      "Residential Projects",
      "Industrial Facilities",
      "Project Management",
      "Design-Build Services",
    ],
    keyFeatures: [
      "Proven track record in complex projects",
      "Advanced project management systems",
      "Safety-first culture",
      "On-time, on-budget delivery",
      "Experienced engineering teams",
    ],
  },
  "progressive-dynamics": {
    name: "Progressive Dynamics",
    logo: "/progressive-dynamics-logo.jpg",
    description:
      "Progressive Dynamics is an advanced engineering and industrial manufacturing solutions provider with cutting-edge technology and expertise.",
    overview: `Progressive Dynamics leverages advanced engineering principles and modern manufacturing capabilities to deliver innovative solutions for complex industrial challenges. Our multidisciplinary approach ensures optimal outcomes for every project.`,
    services: [
      "Industrial Engineering",
      "Manufacturing Solutions",
      "Structural Engineering",
      "Equipment Design & Fabrication",
      "Process Optimization",
      "Technical Consulting",
    ],
    keyFeatures: [
      "State-of-the-art manufacturing facilities",
      "Expert engineering team",
      "Custom solution development",
      "Quality assurance protocols",
      "Continuous innovation focus",
    ],
  },
  "progressive-materials": {
    name: "Progressive Materials",
    logo: "/progressive-materials-logo.jpg",
    description:
      "Progressive Materials is a premium industrial materials and specialty construction products supplier for diverse applications.",
    overview: `Progressive Materials provides a comprehensive range of high-quality industrial materials that meet the demanding requirements of modern construction and manufacturing. Our commitment to quality and reliability has made us a trusted supplier across multiple industries.`,
    services: [
      "Industrial Raw Materials",
      "Specialty Construction Products",
      "Material Supply & Logistics",
      "Quality Testing Services",
      "Technical Consultation",
      "Custom Material Solutions",
    ],
    keyFeatures: [
      "ISO certified quality standards",
      "Extensive material inventory",
      "Reliable supply chain",
      "Competitive pricing",
      "Expert technical support",
    ],
  },
}

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = companiesData[params.id as keyof typeof companiesData]

  if (!company) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Companies
          </Link>

          <div className="bg-white border-2 border-border rounded-lg overflow-hidden">
            <div className="p-8 md:p-12 space-y-12">
              <div className="flex items-center gap-6">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={200}
                  height={120}
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-black">{company.name}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">{company.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-black">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{company.overview}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Services</h2>
                  <ul className="space-y-3">
                    {company.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Key Features</h2>
                  <ul className="space-y-3">
                    {company.keyFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <Link href="/contact">
                  <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
