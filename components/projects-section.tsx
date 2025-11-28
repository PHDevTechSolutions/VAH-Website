import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProjectsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center border-2 border-gray-200 rounded-xl p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              OUR IMPACTFUL <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">PROJECTS</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mb-6" />
            <p className="text-gray-600 mb-8 text-lg">FROM PAST TO PRESENT, SEE THE PROJECTS THAT SHAPED US</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 transition-all">READ MORE</Button>
          </div>

          {/* Right Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border-2 border-gray-200">
            <Image src="/concrete-structure.jpg" alt="Impactful Projects" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
