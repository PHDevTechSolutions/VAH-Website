export interface Company {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  category: string;
  description: string;
  longDescription: string;
  heroImage: string;
  highlights: string[];
}

export const companiesData: Company[] = [
  {
    id: "progdy",
    name: "Progressive Dynamics Inc.",
    shortName: "Progressive Dynamics",
    logo: "/images/progdy.png",
    category: "Trade & Distribution",
    description: "Leading brands in trade and distribution services",
    longDescription:
      "Progressive Dynamics Inc. is a leading provider of trade and distribution solutions, serving the industrial and construction sectors with innovative products and services designed to optimize supply chain efficiency and deliver exceptional value to our partners.",
    heroImage: "/images/HERO.png",
    highlights: [
      "Comprehensive distribution network",
      "Industry-leading logistics",
      "24/7 customer support",
      "Innovative supply chain solutions",
    ],
  },
  {
    id: "oko",
    name: "ÖKO",
    shortName: "ÖKO",
    logo: "/images/oko.png",
    category: "Modern Building Materials & Tools",
    description: "Premium building materials and construction tools",
    longDescription:
      "ÖKO specializes in providing modern, sustainable building materials and professional-grade tools for construction projects. Our product portfolio combines quality, durability, and environmental responsibility to meet the evolving needs of today's construction industry.",
    heroImage: "/images/HERO.png",
    highlights: [
      "Sustainable building solutions",
      "Premium quality materials",
      "Professional-grade tools",
      "Eco-friendly practices",
    ],
  },
  {
    id: "progma",
    name: "Progressive Materials Solutions Inc.",
    shortName: "Progressive Materials",
    logo: "/images/progma.png",
    category: "Industrial Construction Solutions",
    description: "Advanced solutions for industrial construction",
    longDescription:
      "Progressive Materials Solutions Inc. delivers cutting-edge industrial construction solutions designed to meet the complex demands of modern infrastructure projects. We provide comprehensive support from planning to execution with a focus on safety, efficiency, and innovation.",
    heroImage: "/images/HERO.png",
    highlights: [
      "Advanced engineering solutions",
      "Safety-first approach",
      "Project management expertise",
      "Infrastructure innovation",
    ],
  },
  {
    id: "buildchem",
    name: "BuildChem Solutions Inc.",
    shortName: "BuildChem",
    logo: "/images/buildchem.png",
    category: "Chemical-Based Technologies",
    description: "Chemical solutions for building and infrastructure",
    longDescription:
      "BuildChem Solutions Inc. develops and manufactures high-performance chemical products for the building and infrastructure sectors. Our innovative formulations enhance durability, performance, and sustainability of construction materials and systems.",
    heroImage: "/images/HERO.png",
    highlights: [
      "High-performance formulations",
      "Innovation-driven R&D",
      "Sustainable chemistry",
      "Industry expertise",
    ],
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companiesData.find((company) => company.id === id);
}
