"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { GoldButton } from "@/components/gold-button";
import Stack from "@/components/stack";
import { Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SolutionsCarousel } from "@/components/solutions-carousel";
import { SocialMediaSection } from "@/components/social-media-section";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]); // New state for companies
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Blogs
        const blogQuery = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          where("website", "==", "VAH"),
        );
        const blogSnap = await getDocs(blogQuery);
        const blogs = blogSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllPosts(blogs);

        // 2. Fetch Companies
        const companyQuery = query(
          collection(db, "company"),
          where("website", "==", "VAH"),
          orderBy("companyName", "asc"), // Alphabetical order
        );
        const companySnap = await getDocs(companyQuery);
        const companiesData = companySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </main>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* HERO SECTION (Static/Existing) */}
        {/* HERO SECTION */}
        {/* HERO SECTION */}
        {/* HERO SECTION */}
        <section className="relative min-h-[85vh] md:h-screen flex items-center overflow-hidden pt-safe-top pb-safe-bottom bg-black">
          {/* 1. IMAGE CONTAINER */}
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Image
              src="/images/vah-hero.png"
              alt="Modern corporate buildings"
              fill
              className="object-contain brightness-[0.45]" // Slightly higher brightness since gradients handle the darkness now
              priority
            />
          </div>

          {/* 2. MULTI-DIRECTIONAL GRADIENTS */}
          {/* TOP: Fades the image into the Navbar */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />

          {/* BOTTOM: Fades the image into the Solutions section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

          {/* RIGHT: Intense horizontal gradient to provide a dark backdrop for the text */}
          <div className="absolute inset-y-0 right-0 w-full md:w-2/3 bg-gradient-to-l from-black via-black/90 to-transparent z-10 hidden md:block" />

          {/* 3. CONTENT CONTAINER */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-center md:justify-end">
            {/* TEXT CONTENT - Pushed to the right and right-aligned */}
            <div className="max-w-xl w-full text-center md:text-right animate-[fadeUp_0.6s_ease-out] md:animate-fade-in flex flex-col items-center md:items-end">
              <h1 className="text-[24px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 text-balance leading-[1.1]">
                Building the Foundation
                <span className="block text-accent">of Tomorrow</span>
              </h1>

              <p className="text-[14px] xs:text-base md:text-lg text-white/90 mb-8 text-pretty leading-relaxed max-w-md">
                A leading industrial holdings company managing construction,
                cement production, and industrial materials with strength,
                reliability, and scale.
              </p>

              <div className="flex justify-center md:justify-end w-full">
                <Link href="/companies">
                  <GoldButton className="px-8 py-6 text-lg">
                    Learn More
                  </GoldButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS SECTION */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance text-left">
                Our Solutions
              </h2>
              <Link href="/solutions">
                <GoldButton>View our Solutions</GoldButton>
              </Link>
            </div>
            <div className="mt-16">
              <SolutionsCarousel />
            </div>
          </div>
        </section>

        {/* DYNAMIC OUR COMPANIES SECTION */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader
              title="Our Companies"
              subtitle="Strategic investments across critical industrial sectors"
            />

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mt-16">
              {companies.map((company, index) => (
                <Link key={company.id} href={`/companies/${company.id}`}>
                  <div
                    className="bg-white p-6 sm:p-8 border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group transition-all duration-500 animate-fade-in relative overflow-hidden rounded-lg h-40 sm:h-48 flex items-center justify-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Image
                      src={company.mainImage || "/placeholder.svg"} // Using mainImage from Firestore
                      alt={company.companyName}
                      width={200}
                      height={120}
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BLOGS SECTION */}
        {allPosts.length > 0 && (
          <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <SectionHeader
                title="What's New"
                subtitle="Latest updates and insights from our companies"
              />
              <div className="grid md:grid-cols-2 gap-8 mt-16">
                {currentPosts.map((blog, index) => (
                  <Link href={`/blogs/${blog.slug || blog.id}`} key={blog.id}>
                    <div
                      className="bg-white border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden group transition-all duration-500 animate-fade-in relative rounded-lg"
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
                            {blog.createdAt instanceof Object
                              ? new Date(
                                  blog.createdAt.toDate(),
                                ).toLocaleDateString()
                              : blog.createdAt}
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
                          ).slice(0, 120)}
                          ...
                        </p>
                        <div className="text-sm font-semibold text-black group-hover:text-accent flex items-center space-x-2">
                          <span>Read More</span>
                          <span className="transform group-hover:translate-x-2 transition-transform duration-500">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA & FOOTER */}
        <section className="py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 gradient-gold-to-transparent opacity-10" />
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Build the Future Together?
            </h2>
            <p className="text-xl text-gray-300">
              Connect with us to explore partnership opportunities.
            </p>
            <Link href="/contact">
              <GoldButton>Get In Touch</GoldButton>
            </Link>
          </div>
        </section>
        <SocialMediaSection />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
