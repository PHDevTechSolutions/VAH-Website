import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { GoldButton } from "@/components/gold-button";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Companies | Value Acquisitions Inc.",
  description: "Explore our portfolio of market-leading companies.",
};

export default async function CompaniesPage() {
  // 1. Create a query: Filter by website and sort by companyName
  const companiesRef = collection(db, "company");
  const q = query(
    companiesRef,
    where("website", "==", "VAH"),
    orderBy("companyName", "asc"),
  );

  // 2. Fetch data
  const querySnapshot = await getDocs(q);
  const companies = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/HERO.png"
          alt="Corporate buildings"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl font-bold text-white mb-4">Our Companies</h1>
          <p className="text-xl text-white/90">
            A diverse portfolio of market-leading companies.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <div className="border-2 border-border p-10 rounded-lg hover:border-accent hover:shadow-xl transition-all cursor-pointer group">
                <div className="relative h-[100px] w-[180px] mb-6">
                  <Image
                    src={company.mainImage}
                    alt={company.companyName}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {company.companyName}
                </h3>
                <p className="text-muted-foreground text-lg line-clamp-3">
                  {company.description}
                </p>
                <div className="mt-6 font-semibold text-accent">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}

          {/* Optional: Empty State */}
          {companies.length === 0 && (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              No companies found for this sector.
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Interested in Partnering With Us?
        </h2>
        <Link href="/contact">
          <GoldButton>Contact Us</GoldButton>
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
