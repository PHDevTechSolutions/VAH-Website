import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ValuesSection from "@/components/values-section"
import SolutionsSection from "@/components/solutions-section"
import ProjectsSection from "@/components/projects-section"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ValuesSection />
        <SolutionsSection />
        <ProjectsSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}
