import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

const blogPosts = {
  "1": {
    title: "Buildchem Launches New Eco-Friendly Product Line",
    date: "December 15, 2024",
    image: "/modern-industrial-facility.jpg",
    content: `
      <p>Buildchem Solutions Inc. is proud to announce the launch of our groundbreaking eco-friendly product line, representing a significant milestone in sustainable construction technology.</p>
      
      <h2>Innovation Meets Sustainability</h2>
      <p>Our new range of construction chemicals has been developed with environmental responsibility at its core. These products deliver the same exceptional performance our clients have come to expect, while significantly reducing environmental impact.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Reduced carbon footprint in production</li>
        <li>Bio-based raw materials</li>
        <li>Zero VOC emissions</li>
        <li>Enhanced durability and longevity</li>
      </ul>
      
      <h2>Industry Impact</h2>
      <p>This launch positions Buildchem as a leader in sustainable construction solutions, helping our clients meet increasingly stringent environmental regulations while maintaining project quality and efficiency.</p>
    `,
  },
  "2": {
    title: "Progressive Dynamics Completes Major Infrastructure Project",
    date: "December 10, 2024",
    image: "/industrial-construction-site-with-cranes-and-build.jpg",
    content: `
      <p>Progressive Dynamics has successfully completed a landmark bridge construction project, delivering exceptional results ahead of schedule and under budget.</p>
      
      <h2>Project Overview</h2>
      <p>The multi-span bridge represents one of the most complex infrastructure projects undertaken in the region, featuring innovative engineering solutions and state-of-the-art construction techniques.</p>
      
      <h2>Engineering Excellence</h2>
      <p>Our team employed advanced modeling and simulation technologies to optimize structural design, resulting in a bridge that exceeds safety standards while minimizing material usage.</p>
      
      <h2>Community Benefits</h2>
      <p>This infrastructure project will improve connectivity for thousands of residents and businesses, supporting economic growth and development in the region for decades to come.</p>
    `,
  },
  "3": {
    title: "OKO Expands Operations to New Markets",
    date: "December 5, 2024",
    image: "/modern-corporate-hq.png",
    content: `
      <p>OKO is excited to announce our strategic expansion into emerging markets across Southeast Asia, bringing our innovative construction solutions to new regions.</p>
      
      <h2>Strategic Growth</h2>
      <p>This expansion represents a carefully planned growth strategy, leveraging our proven expertise to serve new markets with high demand for quality construction services.</p>
      
      <h2>Market Opportunities</h2>
      <p>Southeast Asia's rapidly growing infrastructure needs present significant opportunities for OKO to deliver value through our comprehensive construction capabilities.</p>
      
      <h2>Local Partnerships</h2>
      <p>We are committed to building strong relationships with local partners and communities, ensuring our expansion benefits all stakeholders.</p>
    `,
  },
  "4": {
    title: "Progressive Materials Achieves ISO Certification",
    date: "November 28, 2024",
    image: "/modern-industrial-facility-with-steel-structures.jpg",
    content: `
      <p>Progressive Materials has achieved prestigious ISO certification, reinforcing our commitment to the highest quality standards in industrial materials production.</p>
      
      <h2>Quality Excellence</h2>
      <p>This certification validates our comprehensive quality management systems and demonstrates our dedication to delivering consistent, reliable products to our customers.</p>
      
      <h2>Certification Process</h2>
      <p>The rigorous certification process evaluated every aspect of our operations, from raw material sourcing to final product delivery, ensuring compliance with international standards.</p>
      
      <h2>Customer Benefits</h2>
      <p>Our ISO certification provides customers with additional assurance of product quality and consistency, supporting their own quality objectives and regulatory compliance.</p>
    `,
  },
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <article className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>

          <div className="bg-white border-2 border-border rounded-lg overflow-hidden">
            <div className="relative h-[400px]">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div className="p-8 md:p-12 space-y-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>{post.date}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-black">{post.title}</h1>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  color: "#666",
                  lineHeight: "1.8",
                }}
              />
            </div>
          </div>
        </div>
      </article>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
