export type BlogPost = {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  content: string
  seo: {
    title: string
    description: string
  }
}

export const blogPosts: Record<string, BlogPost> = {
  "1": {
    id: "1",
    title: "Buildchem Launches New Eco-Friendly Product Line",
    date: "December 15, 2024",
    excerpt:
      "Introducing sustainable construction chemicals that reduce environmental impact without compromising performance.",
    image: "/images/blogs.jpg",
    content: `
      <p>Buildchem Solutions Inc. is proud to announce the launch of our groundbreaking eco-friendly product line, representing a significant milestone in sustainable construction technology.</p>
      
      <h2>Innovation Meets Sustainability</h2>
      <p>Our new range of construction chemicals has been developed with environmental responsibility at its core. These products deliver the same exceptional performance our clients have come to expect, while significantly reducing environmental impact.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Reduced carbon footprint in production</li>
        <li>Bio-based raw materials</li>
        <li>Zero VOC emissions</li>
        <li>Enhanced durability and longevity</li>
      </ul>
      
      <h2>Industry Impact</h2>
      <p>This launch positions Buildchem as a leader in sustainable construction solutions, helping our clients meet increasingly stringent environmental regulations while maintaining project quality and efficiency.</p>
    `,
    seo: {
      title: "Buildchem Eco-Friendly Product Launch | Blog",
      description:
        "Buildchem introduces a new eco-friendly line of construction chemicals that deliver performance while reducing environmental impact.",
    },
  },

  "2": {
    id: "2",
    title: "Progressive Dynamics Completes Major Infrastructure Project",
    date: "December 10, 2024",
    excerpt:
      "Successfully delivered a landmark bridge construction project ahead of schedule, showcasing engineering excellence.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Dynamics has successfully completed a landmark bridge construction project, delivering exceptional results ahead of schedule and under budget.</p>
      
      <h2>Project Overview</h2>
      <p>The multi-span bridge represents one of the most complex infrastructure projects undertaken in the region, featuring innovative engineering solutions and state-of-the-art construction techniques.</p>
      
      <h2>Engineering Excellence</h2>
      <p>Our team employed advanced modeling and simulation technologies to optimize structural design, resulting in a bridge that exceeds safety standards while minimizing material usage.</p>
      
      <h2>Community Benefits</h2>
      <p>This infrastructure project will improve connectivity for thousands of residents and businesses, supporting economic growth and development in the region for decades to come.</p>
    `,
    seo: {
      title: "Progressive Dynamics Infrastructure Project | Blog",
      description:
        "Progressive Dynamics successfully delivers a landmark infrastructure project, showcasing engineering excellence and community impact.",
    },
  },

  "3": {
    id: "3",
    title: "OKO Expands Operations to New Markets",
    date: "December 5, 2024",
    excerpt:
      "Strategic expansion brings our innovative solutions to emerging markets across Southeast Asia.",
    image: "/images/blogs.jpg",
    content: `
      <p>OKO is excited to announce our strategic expansion into emerging markets across Southeast Asia, bringing our innovative construction solutions to new regions.</p>
      
      <h2>Strategic Growth</h2>
      <p>This expansion represents a carefully planned growth strategy, leveraging our proven expertise to serve new markets with high demand for quality construction services.</p>
      
      <h2>Market Opportunities</h2>
      <p>Southeast Asia's rapidly growing infrastructure needs present significant opportunities for OKO to deliver value through our comprehensive construction capabilities.</p>
      
      <h2>Local Partnerships</h2>
      <p>We are committed to building strong relationships with local partners and communities, ensuring our expansion benefits all stakeholders.</p>
    `,
    seo: {
      title: "OKO Expansion to Southeast Asia | Blog",
      description:
        "OKO expands operations to new markets in Southeast Asia, delivering innovative construction solutions and building local partnerships.",
    },
  },

  "4": {
    id: "4",
    title: "Progressive Materials Achieves ISO Certification",
    date: "November 28, 2024",
    excerpt:
      "New quality standards certification reinforces our commitment to excellence in industrial materials.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Materials has achieved prestigious ISO certification, reinforcing our commitment to the highest quality standards in industrial materials production.</p>
      
      <h2>Quality Excellence</h2>
      <p>This certification validates our comprehensive quality management systems and demonstrates our dedication to delivering consistent, reliable products to our customers.</p>
      
      <h2>Certification Process</h2>
      <p>The rigorous certification process evaluated every aspect of our operations, from raw material sourcing to final product delivery, ensuring compliance with international standards.</p>
      
      <h2>Customer Benefits</h2>
      <p>Our ISO certification provides customers with additional assurance of product quality and consistency, supporting their own quality objectives and regulatory compliance.</p>
    `,
    seo: {
      title: "Progressive Materials ISO Certification | Blog",
      description:
        "Progressive Materials achieves ISO certification, reinforcing commitment to quality and excellence in industrial materials production.",
    },
  },
}
