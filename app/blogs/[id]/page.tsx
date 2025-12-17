import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blogs"
import type { Metadata } from "next"

type PageProps = { params: { id: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = blogPosts[resolvedParams.id]

  if (!post) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post does not exist.",
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image],
    },
  }
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params
  const post = blogPosts[resolvedParams.id]

  if (!post) notFound()

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
                style={{ color: "#666", lineHeight: "1.8" }}
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
