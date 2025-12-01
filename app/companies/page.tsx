import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CompaniesHero } from "@/components/companies-hero"
// import { AboutContent } from "@/components/about-content"

export const metadata = {
  title: "About Us | Value Acquisitions Holdings Inc.",
  description:
    "Learn about Value Acquisitions Holdings Inc. and our portfolio of companies leading in construction, distribution, and industrial solutions.",
}

export default function CompaniesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#261c12" }}>
      <Navigation />
      <main className="pt-24">
        <CompaniesHero />
        {/* <AboutContent /> */}
      </main>
      <Footer />
    </div>
  )
}