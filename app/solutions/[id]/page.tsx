"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { SeriesAccordion } from "@/components/series-accordion";

interface Solution {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  websites: string[];
  series: string[];
  seo?: {
    title?: string;
    slug?: string;
    description?: string;
    canonical?: string;
  };
}

interface Product {
  name: string;
  pdfUrl: string;
  fileName: string;
}

interface Series {
  id: string;
  name: string;
  products: Product[];
}

export default function SolutionDetailPage() {
  const params = useParams();
  const slug = params.id as string; // This is now a slug, not a document ID

  const [solution, setSolution] = useState<Solution | null>(null);
  const [seriesList, setSeriesList] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutionAndSeries = async () => {
      try {
        let solutionData: Solution | null = null;

        // Method 1: Try to find by seo.slug
        const solutionsRef = collection(db, "solutions");
        const slugQuery = query(solutionsRef, where("seo.slug", "==", slug));
        const slugSnapshot = await getDocs(slugQuery);

        if (!slugSnapshot.empty) {
          const solutionDoc = slugSnapshot.docs[0];
          solutionData = {
            id: solutionDoc.id,
            ...solutionDoc.data(),
          } as Solution;
        } else {
          // Method 2: Fallback - fetch all solutions and match by generated slug
          const allSolutionsSnapshot = await getDocs(solutionsRef);
          
          for (const doc of allSolutionsSnapshot.docs) {
            const data = doc.data();
            const generatedSlug = data.title
              ?.toLowerCase()
              .replace(/[^\w ]+/g, "")
              .replace(/ +/g, "-");
            
            if (generatedSlug === slug || data.seo?.slug === slug) {
              solutionData = {
                id: doc.id,
                ...data,
              } as Solution;
              break;
            }
          }
        }

        if (solutionData) {
          setSolution(solutionData);

          // Fetch related series
          if (solutionData.series && Array.isArray(solutionData.series)) {
            const seriesPromises = solutionData.series.map(
              async (seriesId: string) => {
                const seriesDocRef = doc(db, "series", seriesId);
                const seriesDoc = await getDoc(seriesDocRef);

                if (seriesDoc.exists()) {
                  const data = seriesDoc.data();
                  return {
                    id: seriesDoc.id,
                    name: data.name,
                    products: data.products || [],
                  } as Series;
                }
                return null;
              },
            );

            const seriesData = await Promise.all(seriesPromises);
            setSeriesList(seriesData.filter((s) => s !== null) as Series[]);
          }
        } else {
          setSolution(null);
        }
      } catch (error) {
        console.error("Error fetching solution:", error);
        setSolution(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchSolutionAndSeries();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={40} />
      </main>
    );
  }

  if (!solution) {
    return (
      <main className="min-h-screen bg-background">
        <div className="py-24 text-center flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Solution Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The solution "{slug}" could not be found.
          </p>
          <Link
            href="/solutions"
            className="text-accent underline font-semibold uppercase tracking-widest text-sm hover:text-accent/80 transition-colors"
          >
            Return to Solutions
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-primary">
      {/* HEADER / HERO */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {solution.mainImage && (
            <Image
              src={solution.mainImage || "/placeholder.svg"}
              alt={solution.seo?.title || solution.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-16 md:pb-24">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-white/80 hover:text-accent transition-colors mb-6 text-[10px] uppercase font-semibold tracking-[0.2em]"
          >
            <ArrowLeft size={14} /> Back to Solutions
          </Link>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
            {solution.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl font-medium leading-relaxed">
            {solution.description}
          </p>
        </div>
      </section>

      {/* SERIES ACCORDION SECTION */}
      {seriesList.length > 0 && (
        <section className="py-24 bg-card relative border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px bg-border flex-1"></div>
              <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-foreground text-center italic">
                Available Series & Specs
              </h2>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <SeriesAccordion
              series={seriesList}
              solutionTitle={solution?.title || "Solution"}
            />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}