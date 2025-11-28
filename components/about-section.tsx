import { ArrowRight } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">BUILDCHEM SOLUTIONS</h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            BUILDCHEM SOLUTIONS INC., A SUBSIDIARY UNDER PROGRESSIVE MATERIALS SOLUTIONS INC.
          </p>
          <button className="flex items-center gap-2 text-cyan-500 font-semibold hover:gap-3 transition-all duration-300 hover:text-cyan-600">
            LEARN MORE <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
