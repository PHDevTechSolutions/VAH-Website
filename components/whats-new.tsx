"use client";

import Image from "next/image";

export function WhatsNew() {
  const blogPosts = [
    {
      id: 1,
      title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE",
      description:
        "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem",
      image: "/images/blogs.jpg",
    },
    {
      id: 2,
      title: "PRECISION TIMING FOR SUPERIOR CONCRETE PERFORMANCE",
      description:
        "BuildChem's Retarding Admixture gives you precision timing for superior concrete performance. Build with precision. Build with BuildChem",
      image: "/images/blogs.jpg",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 px-4 md:px-12"
      style={{ backgroundColor: "#261c12" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#DCB485" }}
          >
            What's New
          </h2>
          <a
            href="/blogs"
            className="transition-colors"
            style={{ color: "#DCB485" }}
          >
            Go to Blogs →
          </a>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer rounded-xl overflow-hidden p-4 border bg-[#1e160f]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              style={{ borderColor: "rgba(220, 180, 133, 0.3)" }}
            >
              {/* Image */}
              <div
                className="relative h-64 md:h-72 rounded-lg overflow-hidden mb-6 border bg-black"
                style={{ borderColor: "rgba(220, 180, 133, 0.4)" }}
              >
                <Image
                  src={post.image || "/images/blogs.png"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-blue-900/80 text-white text-xs font-semibold">
                    BUILDCHEM
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3
                className="text-lg md:text-xl font-bold mb-3 group-hover:opacity-80 transition-colors"
                style={{ color: "#DCB485" }}
              >
                Control the pace and perfect the process.
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#FFFFFF" }}
              >
                {post.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
