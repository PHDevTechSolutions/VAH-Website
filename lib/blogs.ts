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

    "5": {
    id: "5",
    title: "Buildchem Introduces Advanced Waterproofing Solutions",
    date: "November 20, 2024",
    excerpt:
      "New waterproofing systems from Buildchem ensure durability and protection for residential and commercial projects.",
    image: "/images/blogs.jpg",
    content: `
      <p>Buildchem has launched a range of advanced waterproofing solutions designed to protect structures from water damage and extend lifespan.</p>
      
      <h2>Innovative Products</h2>
      <p>These solutions include liquid-applied membranes, cementitious coatings, and sheet membranes, all engineered for maximum performance.</p>
      
      <h2>Benefits</h2>
      <ul>
        <li>Long-lasting protection</li>
        <li>Easy application</li>
        <li>Eco-friendly formulations</li>
      </ul>
    `,
    seo: {
      title: "Buildchem Waterproofing Solutions | Blog",
      description:
        "Buildchem launches new waterproofing solutions designed to provide durable protection for residential and commercial construction projects.",
    },
  },

  "6": {
    id: "6",
    title: "OKO Secures Mega Commercial Project in Metro Manila",
    date: "November 15, 2024",
    excerpt:
      "OKO wins a large-scale commercial construction project, showcasing expertise in high-rise building development.",
    image: "/images/blogs.jpg",
    content: `
      <p>OKO has been awarded a major commercial project in Metro Manila, reflecting its strong reputation in high-rise construction and project management.</p>
      
      <h2>Project Details</h2>
      <p>The project involves a state-of-the-art office complex with sustainable design features and innovative construction techniques.</p>
      
      <h2>Impact</h2>
      <p>This project strengthens OKO’s presence in the urban construction market and creates opportunities for local employment.</p>
    `,
    seo: {
      title: "OKO Mega Commercial Project | Blog",
      description:
        "OKO secures a landmark commercial construction project in Metro Manila, demonstrating expertise in high-rise development and sustainable design.",
    },
  },

  "7": {
    id: "7",
    title: "Progressive Dynamics Implements Smart Manufacturing Systems",
    date: "November 10, 2024",
    excerpt:
      "Introducing Industry 4.0 technologies to streamline production and improve efficiency in industrial manufacturing.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Dynamics is integrating smart manufacturing systems to optimize production, reduce waste, and enhance product quality.</p>
      
      <h2>Technology Integration</h2>
      <p>Advanced IoT sensors, automation, and real-time monitoring improve operational efficiency across all facilities.</p>
      
      <h2>Benefits</h2>
      <ul>
        <li>Reduced downtime</li>
        <li>Higher production quality</li>
        <li>Real-time analytics</li>
      </ul>
    `,
    seo: {
      title: "Progressive Dynamics Smart Manufacturing | Blog",
      description:
        "Progressive Dynamics adopts smart manufacturing systems to enhance operational efficiency and product quality in industrial production.",
    },
  },

  "8": {
    id: "8",
    title: "Progressive Materials Launches Eco-Friendly Cement Solutions",
    date: "November 5, 2024",
    excerpt:
      "New sustainable cement products reduce carbon footprint while maintaining high-quality performance for construction projects.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Materials introduces a line of eco-friendly cement products that align with global sustainability goals without compromising strength or durability.</p>
      
      <h2>Environmental Benefits</h2>
      <ul>
        <li>Lower CO2 emissions</li>
        <li>Renewable raw materials</li>
        <li>Energy-efficient production</li>
      </ul>
      
      <h2>Application</h2>
      <p>Ideal for commercial and residential projects requiring sustainable building solutions.</p>
    `,
    seo: {
      title: "Progressive Materials Eco-Friendly Cement | Blog",
      description:
        "Progressive Materials launches eco-friendly cement solutions that reduce environmental impact while delivering high-quality construction performance.",
    },
  },

  "9": {
    id: "9",
    title: "Buildchem Hosts Industry Training Workshop",
    date: "October 30, 2024",
    excerpt:
      "Hands-on training workshop for engineers and contractors on advanced construction chemical applications.",
    image: "/images/blogs.jpg",
    content: `
      <p>Buildchem conducted a comprehensive training workshop for industry professionals, covering the latest applications of construction chemicals and materials.</p>
      
      <h2>Topics Covered</h2>
      <ul>
        <li>Concrete admixture optimization</li>
        <li>Waterproofing techniques</li>
        <li>Protective coating applications</li>
      </ul>
      
      <h2>Outcome</h2>
      <p>Participants gained practical knowledge and skills to implement advanced construction solutions in real-world projects.</p>
    `,
    seo: {
      title: "Buildchem Industry Training Workshop | Blog",
      description:
        "Buildchem hosts a professional training workshop for engineers and contractors, providing hands-on learning in advanced construction chemical applications.",
    },
  },

  "10": {
    id: "10",
    title: "OKO Implements Sustainable Urban Development Practices",
    date: "October 25, 2024",
    excerpt:
      "OKO adopts green construction practices to enhance urban development sustainability and reduce environmental impact.",
    image: "/images/blogs.jpg",
    content: `
      <p>OKO is incorporating sustainable construction practices in all urban development projects, focusing on energy efficiency and eco-friendly materials.</p>
      
      <h2>Green Initiatives</h2>
      <ul>
        <li>Solar-powered project sites</li>
        <li>Waste reduction programs</li>
        <li>Environmentally responsible materials</li>
      </ul>
      
      <h2>Impact</h2>
      <p>These practices improve community wellbeing while supporting regulatory compliance and environmental stewardship.</p>
    `,
    seo: {
      title: "OKO Sustainable Urban Development | Blog",
      description:
        "OKO implements sustainable construction practices for urban development projects, promoting eco-friendly materials and energy efficiency.",
    },
  },

  "11": {
    id: "11",
    title: "Progressive Dynamics Receives Safety Excellence Award",
    date: "October 20, 2024",
    excerpt:
      "Recognition for maintaining the highest standards of safety and compliance across all industrial projects.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Dynamics is honored with a Safety Excellence Award for outstanding performance in workplace safety, risk management, and compliance.</p>
      
      <h2>Award Criteria</h2>
      <ul>
        <li>Zero accident record</li>
        <li>Proactive safety protocols</li>
        <li>Employee training and awareness</li>
      </ul>
      
      <h2>Commitment</h2>
      <p>This recognition reinforces the company's ongoing commitment to safe operations across all projects.</p>
    `,
    seo: {
      title: "Progressive Dynamics Safety Excellence | Blog",
      description:
        "Progressive Dynamics receives a Safety Excellence Award for maintaining high standards of workplace safety and compliance across industrial projects.",
    },
  },

  "12": {
    id: "12",
    title: "Progressive Materials Partners with Local Suppliers for Sustainable Growth",
    date: "October 15, 2024",
    excerpt:
      "Collaboration with regional suppliers strengthens supply chain sustainability and supports community development.",
    image: "/images/blogs.jpg",
    content: `
      <p>Progressive Materials has partnered with local suppliers to enhance supply chain sustainability and foster regional economic growth.</p>
      
      <h2>Partnership Benefits</h2>
      <ul>
        <li>Reduced transportation emissions</li>
        <li>Support for local businesses</li>
        <li>Improved supply chain reliability</li>
      </ul>
      
      <h2>Community Impact</h2>
      <p>These partnerships promote local development while aligning with corporate sustainability goals.</p>
    `,
    seo: {
      title: "Progressive Materials Local Supplier Partnership | Blog",
      description:
        "Progressive Materials collaborates with local suppliers to enhance sustainable growth, support communities, and strengthen supply chains.",
    },
  },
}
