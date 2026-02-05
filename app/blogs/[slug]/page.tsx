"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function BlogDetailPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;

            try {
                // Naka-filter na ito sa "VAH" para hindi maghalo ang blogs
                const q = query(
                    collection(db, "blogs"), 
                    where("slug", "==", slug),
                    where("website", "==", "VAH"), 
                    limit(1)
                );
                
                const querySnapshot = await getDocs(q);
                
                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setBlog(data);
                } else {
                    setBlog(null);
                }
            } catch (err) {
                console.error("Firestore Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={40} />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="h-screen flex items-center justify-center font-bold uppercase tracking-widest text-muted-foreground">
                Blog post not found
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* --- NAVIGATION --- */}
            <nav className="pt-32 pb-6 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-6">
                    <Link 
                        href="/blogs" 
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Blogs
                    </Link>
                </div>
            </nav>

               <article className="max-w-5xl mx-auto px-6 py-16">
                {/* --- BLOG HEADER --- */}
                <header className="mb-12">         
                    {blog.sections?.[0]?.type === "paragraph" && (
                        <div className="text-base text-gray-700 leading-relaxed mb-10">
                            <style jsx global>{`
                              .blog-intro h1 {
                                font-size: 2em;
                                font-weight: 800;
                                margin-top: 0.67em;
                                margin-bottom: 0.67em;
                                line-height: 1.2;
                              }
                              .blog-intro h2 {
                                font-size: 1.5em;
                                font-weight: 700;
                                margin-top: 0.83em;
                                margin-bottom: 0.83em;
                                line-height: 1.3;
                              }
                              .blog-intro p {
                                margin: 1em 0;
                              }
                              .blog-intro strong {
                                font-weight: 700;
                              }
                              .blog-intro em {
                                font-style: italic;
                              }
                              .blog-intro ul {
                                list-style-type: disc;
                                padding-left: 1.5em;
                                margin: 1em 0;
                              }
                              .blog-intro ol {
                                list-style-type: decimal;
                                padding-left: 1.5em;
                                margin: 1em 0;
                              }
                              .blog-intro li {
                                margin: 0.25em 0;
                              }
                              .blog-intro a {
                                color: rgba(210, 140, 42, 1);
                                text-decoration: underline;
                                cursor: pointer;
                              }
                              .blog-intro a:hover {
                                color: #000;
                              }
                            `}</style>
                            <div 
                                className="blog-intro"
                                dangerouslySetInnerHTML={{ __html: blog.sections[0].description }}
                            />
                        </div>
                    )}
                </header>

                {/* --- CONTENT SECTIONS --- */}
                <div className="space-y-16">
                    {blog.sections?.map((section: any, index: number) => {
                        // Skip the first paragraph since we used it in the header
                        if (index === 0 && section.type === "paragraph") return null;

                        return (
                            <div key={index} className="flex flex-col gap-6">
                                {/* Section Title */}
                                {section.title && (
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                                        {section.title}
                                    </h2>
                                )}

                                {/* Section Image - If it exists, show it first (Box Style) */}
                                {section.imageUrl && (
                                    <div className="w-full bg-gray-50 border border-gray-100 overflow-hidden rounded-2xl">
                                        <img 
                                            src={section.imageUrl}
                                             
                                            alt={section.title || "Blog section"} 
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                )}

                                {/* Section Description */}
                                {section.description && (
                                    <div className="text-base text-gray-700 leading-relaxed">
                                        <style jsx global>{`
                                          .blog-content h1 {
                                            font-size: 2em;
                                            font-weight: 800;
                                            margin-top: 0.67em;
                                            margin-bottom: 0.67em;
                                            line-height: 1.2;
                                          }
                                          .blog-content h2 {
                                            font-size: 1.5em;
                                            font-weight: 700;
                                            margin-top: 0.83em;
                                            margin-bottom: 0.83em;
                                            line-height: 1.3;
                                          }
                                          .blog-content p {
                                            margin: 1em 0;
                                          }
                                          .blog-content strong {
                                            font-weight: 700;
                                          }
                                          .blog-content em {
                                            font-style: italic;
                                          }
                                          .blog-content ul {
                                            list-style-type: disc;
                                            padding-left: 1.5em;
                                            margin: 1em 0;
                                          }
                                          .blog-content ol {
                                            list-style-type: decimal;
                                            padding-left: 1.5em;
                                            margin: 1em 0;
                                          }
                                          .blog-content li {
                                            margin: 0.25em 0;
                                          }
                                          .blog-content a {
                                            color: rgba(210, 140, 42, 1);
                                            text-decoration: underline;
                                            cursor: pointer;
                                          }
                                          .blog-content a:hover {
                                            color: #000;
                                          }
                                        `}</style>
                                        <div 
                                            className="blog-content"
                                            dangerouslySetInnerHTML={{ __html: section.description }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </article>

            <Footer />
            <ScrollToTop />
        </main>
    );
}