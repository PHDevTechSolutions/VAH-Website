export type Company = {
  id: string
  logo: string
  description: string
  overview: string
  services: string[]
  keyFeatures: string[]
  seo: {
    title: string
    description: string
  }
}

export const companies: Record<string, Company> = {
  buildchem: {
    id: "buildchem",
    logo: "/images/buildchem.png",
    description: "Buildchem Solutions Inc. is a leading provider of construction chemicals and building materials solutions.",
    overview: "Buildchem has established itself as a trusted partner in the construction industry, offering innovative products that enhance performance, durability, and sustainability.",
    services: ["Construction Chemicals","Waterproofing Solutions","Concrete Admixtures","Tile Adhesives & Grouts","Protective Coatings","Repair & Rehabilitation Products"],
    keyFeatures: ["Expert Technical Services and On-Site Support","Flexible Pricing Designed for Project Needs","International-Grade Quality and Performance"],
    seo: {
      title: "Buildchem | Construction Chemicals & Building Solutions",
      description: "Buildchem provides premium construction chemicals, concrete admixtures, waterproofing systems, and building solutions.",
    },
  },
  oko: {
    id: "oko",
    logo: "/images/okonew.png",
    description: "OKO is an innovative construction and infrastructure development company delivering excellence in large-scale projects.",
    overview: "OKO combines modern construction techniques with engineering expertise to deliver complex infrastructure and commercial projects.",
    services: ["Commercial Construction","Infrastructure Development","Residential Projects","Industrial Facilities","Project Management","Design-Build Services"],
    keyFeatures: ["Large-scale project expertise","Advanced project management","Safety-first culture","On-time delivery","Experienced engineering teams"],
    seo: {
      title: "OKO | Infrastructure & Construction Development",
      description: "OKO delivers large-scale construction and infrastructure projects with precision, innovation, and reliability.",
    },
  },
  "progressive-dynamics": {
    id: "progressive-dynamics",
    logo: "/images/progdy.png",
    description: "Advanced engineering and industrial manufacturing solutions provider with cutting-edge technology.",
    overview: "Progressive Dynamics specializes in industrial engineering and manufacturing solutions using modern technologies and best practices.",
    services: ["Industrial Engineering","Manufacturing Solutions","Structural Engineering","Equipment Design & Fabrication","Process Optimization","Technical Consulting"],
    keyFeatures: ["State-of-the-art facilities","Expert engineering teams","Custom-built solutions","Strict quality control","Innovation-driven culture"],
    seo: {
      title: "Progressive Dynamics | Engineering & Manufacturing Solutions",
      description: "Progressive Dynamics offers industrial engineering, manufacturing, and consulting services for complex projects.",
    },
  },
  "progressive-materials": {
    id: "progressive-materials",
    logo: "/images/progma.png",
    description: "Premium industrial materials and specialty construction products supplier.",
    overview: "Progressive Materials supplies high-quality industrial and construction materials supported by a reliable supply chain.",
    services: ["Industrial Raw Materials","Specialty Construction Products","Material Supply & Logistics","Quality Testing Services","Technical Consultation","Custom Material Solutions"],
    keyFeatures: ["ISO certified standards","Wide product inventory","Reliable logistics","Competitive pricing","Expert technical support"],
    seo: {
      title: "Progressive Materials | Industrial & Construction Materials",
      description: "Progressive Materials supplies premium industrial materials and specialty construction products nationwide.",
    },
  },
}
