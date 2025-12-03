import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CompaniesHero } from "@/components/companies-hero";
import { CompanyGrid } from "@/components/company-grid";
import { companiesData } from "@/lib/companies-data";

export const metadata = {
  title: "Our Companies | Value Acquisitions Holdings Inc.",
  description:
    "Explore our portfolio of companies leading in construction, distribution, and industrial solutions.",
};

export default function CompaniesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#261c12" }}>
      <Navigation />
      <main className="pt-24">
        <CompaniesHero />
        <CompanyGrid companies={companiesData} />
      </main>
      <Footer />
    </div>
  );
}
