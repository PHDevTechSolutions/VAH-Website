import { Card } from "@/components/ui/card"

export default function ValuesSection() {
  const benefits = [
    {
      title: "Improved Workability",
      description: "Easier to use and compact even on surfaces, especially in complex forms or tight spaces",
    },
    {
      title: "Energy and Cost Savings",
      description: "Less cement and water needed for the same performance",
    },
    {
      title: "Higher Strength",
      description: "Less water means a lower water-to-cement ratio, which boosts final strength",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-white font-semibold mb-2 text-sm tracking-wide">OUR VALUES</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">HOW IS BUILDCHEM HELPING YOUR BUSINESS</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-8 bg-white border-2 border-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
