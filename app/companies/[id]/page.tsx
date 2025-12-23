import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { companies } from "@/lib/companies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-static";

type PageProps = {
  params: { id: string };
};

// Make the page an async server component
export default async function CompanyDetailPage({ params }: PageProps) {
  // unwrap params (in Next 16+, params can be a Promise)
  const resolvedParams = await params;
  const company = companies[resolvedParams.id];

  if (!company) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={
              resolvedParams.id === "buildchem"
                ? "/images/buildchem-hero.png"
                : "/images/HERO.png"
            }
            alt="Modern corporate buildings"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-accent font-semibold mb-8"
          >
            <ArrowLeft size={20} /> Back to Companies
          </Link>

          <div className="border-2 border-border rounded-lg p-10 space-y-12">
            <Image
              src={company.logo}
              alt="company logo"
              width={220}
              height={120}
              className="object-contain"
            />

            <div>
              <p className="text-xl text-muted-foreground">
                {company.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground text-lg">
                {company.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2">Services</h2>
                <ul className="space-y-2">
                  {company.services.map((service) => (
                    <li key={service} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-muted-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2">Key Features</h2>
                <ul className="space-y-2">
                  {company.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
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

      <Footer />
      <ScrollToTop />
    </main>
  );
}
