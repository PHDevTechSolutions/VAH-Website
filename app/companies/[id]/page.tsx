import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetching from 'companies' collection
  const docRef = doc(db, "company", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) notFound();
  const company = docSnap.data();

  return (
    <main className="min-h-screen bg-white">
      {/* Corporate Header */}
      <section className="bg-slate-950 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            {company.companyName}
          </h1>
        </div>
      </section>

      <div className="pb-24 -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-16 space-y-16">
              {/* Logo Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative w-56 h-28">
                  <Image
                    src={company.mainImage || "/images/placeholder-logo.png"}
                    alt={`${company.companyName} logo`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Overview & Navigation */}
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-accent font-black mb-6">
                    About
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                    {company.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-4 lg:pt-10">
                  <Link href="/solutions">
                    <button className="w-full bg-accent hover:brightness-110 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/20">
                      View Our Solutions <ChevronRight size={20} />
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="w-full  bg-slate-900 hover:bg-slate-800 text-white hover:border-accent hover:text-accen px-8 py-4 rounded-xl font-bold transition-all">
                      Get In Touch
                    </button>
                  </Link>
                </div>
              </div>

              {/* Technical Breakdown */}
              <div className="grid md:grid-cols-2 gap-16 pt-16 border-t border-gray-100">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="h-8 w-1 bg-accent rounded-full" /> Services
                  </h3>
                  <ul className="space-y-4">
                    {company.services?.map((service: string) => (
                      <li
                        key={service}
                        className="text-lg text-muted-foreground pl-4 border-l border-gray-100"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <span className="h-8 w-1 bg-accent rounded-full" /> Key
                    Features
                  </h3>
                  <ul className="space-y-4">
                    {company.keyFeatures?.map((feature: string) => (
                      <li
                        key={feature}
                        className="text-lg text-muted-foreground pl-4 border-l border-gray-100"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Partners Slider - Only renders if the array exists and has items */}
              {company.partnersImage && company.partnersImage.length > 0 && (
                <div className="pt-16 border-t border-gray-100">
                  <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">
                    Strategic Partners & Affiliates
                  </p>
                  <div className="relative px-4">
                    {/* Edge Fades for Blending */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <InfiniteSlider gap={80} speed={30}>
                      {company.partnersImage.map((url: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center"
                        >
                          <img
                            src={url}
                            alt="Partner"
                            className="h-10 md:h-12 w-auto object-contain grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                          />
                        </div>
                      ))}
                    </InfiniteSlider>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </main>
  );
}
