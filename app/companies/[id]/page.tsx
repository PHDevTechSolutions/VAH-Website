import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CompanyHero } from "@/components/company-hero";
import Image from "next/image";
import { getCompanyById, companiesData } from "@/lib/companies-data";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return companiesData.map((company) => ({
    id: company.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = getCompanyById(id);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: `${company.name} | Value Acquisitions Holdings Inc.`,
    description: company.longDescription,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = getCompanyById(id);

  if (!company) {
    notFound();
  }

  const otherCompanies = companiesData.filter((c) => c.id !== company.id);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#261c12" }}>
      <Navigation />

      <main className="pt-24">
        {/* Hero Section with animation */}
        <CompanyHero
          name={company.name}
          category={company.category}
          heroImage={company.heroImage}
        />

        {/* Content Section */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Logo + Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
              <div className="md:col-span-1 flex items-center justify-center">
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={200}
                  height={120}
                  className="object-contain"
                />
              </div>

              <div className="md:col-span-2">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#DCB485" }}
                >
                  About {company.shortName}
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "#FFFFFF" }}
                >
                  {company.longDescription}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-12">
              <h3
                className="text-2xl md:text-3xl font-bold mb-8"
                style={{ color: "#DCB485" }}
              >
                Key Highlights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {company.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(220, 180, 133, 0.15) 0%, rgba(220, 180, 133, 0.05) 100%)",
                      border: "1px solid rgba(220, 180, 133, 0.2)",
                    }}
                  >
                    <p
                      className="text-base md:text-lg"
                      style={{ color: "#DCB485" }}
                    >
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="pt-8 border-t border-gray-700">
              <Link
                href="/companies"
                className="inline-flex items-center gap-2 text-lg hover:opacity-80 transition-opacity"
              >
                <span style={{ color: "#DCB485" }}>
                  ← Back to All Companies
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Companies */}
        <section
          className="py-12 md:py-20 px-4 md:px-8"
          style={{ backgroundColor: "#1a1410" }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: "#DCB485" }}
            >
              Other Companies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherCompanies.map((relatedCompany) => (
                <Link
                  key={relatedCompany.id}
                  href={`/companies/${relatedCompany.id}`}
                >
                  <div
                    className="p-8 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(60, 50, 35, 0.5) 0%, rgba(38, 28, 18, 0.4) 100%)",
                      border: "1px solid rgba(220, 180, 133, 0.2)",
                    }}
                  >
                    <Image
                      src={relatedCompany.logo || "/placeholder.svg"}
                      alt={relatedCompany.name}
                      width={100}
                      height={60}
                      className="object-contain mb-4"
                    />

                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: "#DCB485" }}
                    >
                      {relatedCompany.name}
                    </h3>

                    <p className="text-sm" style={{ color: "#FFFFFF" }}>
                      {relatedCompany.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
