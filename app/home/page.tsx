import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { GoldButton } from "@/components/gold-button";
import Stack from "@/components/stack";
import { Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] md:h-screen flex items-center justify-center overflow-hidden pt-safe-top pb-safe-bottom">
        <div className="absolute inset-0">
          <Image
            src="/images/HERO.png"
            alt="Modern corporate buildings"
            fill
            className="object-cover brightness-[0.20]"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 text-center md:text-left">
            {/* Text */}
            <div
              className="max-w-lg shrink w-full md:w-auto mx-auto md:mx-0
              animate-[fadeUp_0.6s_ease-out] md:animate-fade-in"
            >
              <h1 className="text-[22px] xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 text-balance leading-tight">
                Building the Foundation
                <span className="block text-accent">of Tomorrow</span>
              </h1>

              <p className="text-[13px] xs:text-sm sm:text-base md:text-lg text-white/90 mb-6 text-pretty leading-relaxed">
                A leading industrial holdings company managing construction,
                cement production, and industrial materials with strength,
                reliability, and scale.
              </p>

              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
                <Link href="/companies">
                  <GoldButton>Learn More</GoldButton>
                </Link>
              </div>
            </div>

            {/* Stack */}
            <div className="w-[300px] h-[112px] sm:w-[380px] sm:h-36 md:w-[450px] md:h-[171px] lg:w-[600px] lg:h-[227px] shrink-0 drop-shadow-2xl mx-auto md:mx-0">
              <Stack
                randomRotation={false}
                sensitivity={180}
                sendToBackOnClick={true}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                cards={[
                  <div
                    key={0}
                    className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="/images/vah-hero.png"
                      alt="VALUE ACQUISITIONS HOLDINGS INC."
                      fill
                      className="object-contain"
                    />
                  </div>,
                  <div
                    key={1}
                    className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image
                      src="/images/buildchem-hero.png"
                      alt="Buildchem Solutions"
                      fill
                      className="object-contain"
                    />
                  </div>,
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="Our Companies"
            subtitle="Strategic investments across critical industrial sectors"
          />

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mt-16">
            {[
              { name: "Buildchem", logo: "/images/buildchem.png" },
              { name: "OKO", logo: "/images/oko.png" },
              { name: "Progressive Dynamics", logo: "/images/progdy.png" },
              { name: "Progressive Materials", logo: "/images/progma.png" },
            ].map((company, index) => (
              <div
                key={company.name}
                className="bg-white p-6 sm:p-8 border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group transition-all duration-500 animate-fade-in relative overflow-hidden rounded-lg h-40 sm:h-48 flex items-center justify-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={200}
                  height={120}
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="Our Solutions"
            subtitle="Comprehensive industrial solutions for every need"
          />
          <div className="mt-16 max-w-full mx-auto">
            <div className="relative h-[400px] md:h-[500px] border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden group transition-all duration-500 rounded-lg">
              <div className="absolute inset-0">
                <Image
                  src="/images/solutions.png"
                  alt="Industrial construction project"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
              </div>
              <div className="relative z-10 h-full flex items-center justify-center px-8 md:px-16">
                <div className="text-center space-y-6 max-w-3xl">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    Explore Our Solutions
                  </h3>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    From construction services to industrial materials and
                    specialized products, discover how our integrated solutions
                    drive success across every project.
                  </p>
                  <Link href="/solutions">
                    <GoldButton>View Solutions</GoldButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="What's New"
            subtitle="Latest updates and insights from our companies"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                id: "1",
                title: "Buildchem Launches New Eco-Friendly Product Line",
                date: "December 15, 2024",
                excerpt:
                  "Introducing sustainable construction chemicals that reduce environmental impact without compromising performance.",
                image: "/images/blogs.jpg",
              },
              {
                id: "2",
                title:
                  "Progressive Dynamics Completes Major Infrastructure Project",
                date: "December 10, 2024",
                excerpt:
                  "Successfully delivered a landmark bridge construction project ahead of schedule, showcasing engineering excellence.",
                image: "/images/blogs.jpg",
              },
            ].map((post, index) => (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                className="bg-white border-2 border-border hover:border-accent hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] overflow-hidden group transition-all duration-500 animate-fade-in relative rounded-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 space-y-4 relative z-10">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-black group-hover:text-accent transition-colors duration-500">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-sm font-semibold text-black group-hover:text-accent flex items-center space-x-2 transition-colors duration-500">
                    <span>Read More</span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-500">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-gold-to-transparent opacity-10" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Ready to Build the Future Together?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Connect with us to explore partnership opportunities and learn more
            about our companies.
          </p>
          <Link href="/contact">
            <GoldButton>Get In Touch</GoldButton>
          </Link>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
