"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, query, orderBy, getDocs, where } from "firebase/firestore"

export default function BlogsPage() {
  const [allPosts, setAllPosts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const postsPerPage = 6

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Query remains "VAH" as per your requirement
        const q = query(
          collection(db, "blogs"), 
          where("website", "==", "VAH"),
          orderBy("createdAt", "desc")
        )
        
        const querySnapshot = await getDocs(q)
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setAllPosts(blogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const totalPages = Math.ceil(allPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost)

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image src="/images/HERO.png" alt="Blogs Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Blogs</h1>
          <p className="text-xl md:text-2xl text-white/90">Insights and Updates from Our Industry Experts</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Empty State */}
          {allPosts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-xl text-muted-foreground mb-4">
                No blogs available at the moment.
              </p>
              <p className="text-sm text-muted-foreground">
                Check back later for insights and updates from our industry experts.
              </p>
            </div>
          ) : (
            <>
              {/* Blogs Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {currentPosts.map((blog, index) => (
                  <Link href={`/blogs/${blog.slug || blog.id}`} key={blog.id}>
                    <div
                      className="bg-white border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden group transition-all duration-500 animate-fade-in relative rounded-lg cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={blog.coverImage || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 space-y-4 relative z-10">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={16} />
                          <span>
                            {blog.createdAt?.toDate 
                              ? new Date(blog.createdAt.toDate()).toLocaleDateString()
                              : blog.date || "Recent Post"}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-black group-hover:text-accent transition-colors duration-500">
                          {blog.title}
                        </h3>
<p className="text-muted-foreground leading-relaxed">
  {(
    blog.excerpt ||
    blog.sections?.[0]?.description ||
    ""
  )
    .replace(/<\/?[^>]+(>|$)/g, "") // Heto ang magic line para burahin ang <h2>, <strong>, etc.
    .slice(0, 120) + ((blog.excerpt?.length || blog.sections?.[0]?.description?.length) > 120 ? "…" : "")}
</p>
                        <div className="text-sm font-semibold text-black group-hover:text-accent flex items-center space-x-2 transition-colors duration-500">
                          <span>Read More</span>
                          <span className="transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo(0, 0);
                    }}
                    disabled={currentPage === 1}
                    className="border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => {
                          setCurrentPage(page);
                          window.scrollTo(0, 0);
                      }}
                      className={
                        currentPage === page
                          ? "bg-accent hover:bg-accent/90 text-white border-2 border-accent"
                          : "border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        window.scrollTo(0, 0);
                    }}
                    disabled={currentPage === totalPages}
                    className="border-2 border-border hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}