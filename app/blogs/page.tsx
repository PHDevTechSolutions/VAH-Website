"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: "1",
    title: "Buildchem Launches New Eco-Friendly Product Line",
    date: "December 15, 2024",
    excerpt:
      "Introducing sustainable construction chemicals that reduce environmental impact without compromising performance.",
    image: "/modern-industrial-facility.jpg",
  },
  {
    id: "2",
    title: "Progressive Dynamics Completes Major Infrastructure Project",
    date: "December 10, 2024",
    excerpt:
      "Successfully delivered a landmark bridge construction project ahead of schedule, showcasing engineering excellence.",
    image: "/industrial-construction-site-with-cranes-and-build.jpg",
  },
  {
    id: "3",
    title: "OKO Expands Operations to New Markets",
    date: "December 5, 2024",
    excerpt: "Strategic expansion brings our innovative solutions to emerging markets across Southeast Asia.",
    image: "/modern-corporate-hq.png",
  },
  {
    id: "4",
    title: "Progressive Materials Achieves ISO Certification",
    date: "November 28, 2024",
    excerpt: "New quality standards certification reinforces our commitment to excellence in industrial materials.",
    image: "/modern-industrial-facility-with-steel-structures.jpg",
  },
]

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image src="/HERO.png" alt="Blogs Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Blogs</h1>
          <p className="text-xl md:text-2xl text-white/90">Insights and Updates from Our Industry Experts</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {currentPosts.map((post, index) => (
              <Link href={`/blogs/${post.id}`} key={post.id}>
                <div
                  className="bg-white border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden group transition-all duration-500 animate-fade-in relative rounded-lg cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 space-y-4 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-black group-hover:text-accent transition-colors duration-500">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <div className="text-sm font-semibold text-black group-hover:text-accent flex items-center space-x-2 transition-colors duration-500">
                      <span>Read More</span>
                      <span className="transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                Previous
              </Button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-accent hover:bg-accent/90 text-white border-2 border-accent"
                        : "border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                    }
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
