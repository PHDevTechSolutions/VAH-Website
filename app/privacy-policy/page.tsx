import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Privacy Policy | Value Acquisitions Holdings Inc.",
  description: "Our privacy policy outlines how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/HERO.png" alt="Modern corporate buildings" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-foreground">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
                <p>
                  Value Acquisitions Holdings Inc. ("we," "our," or "us") values your privacy. This policy explains what
                  information we collect, how we use it, and the choices you have. By using our website, you agree to
                  the practices described here.
                </p>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Information We Collect</h2>
                  <p>
                    We collect personal information that you provide to us, such as your name, contact details, and
                    payment information, when you place an order or register with us. If you transact with us as a
                    company, we may also collect certain business details such as your business name, size, or project
                    requirements. In addition, we collect non-personal information automatically when you browse our
                    site, including your browser type, device details, and usage data, which may be gathered through
                    cookies.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">How We Use Your Information</h2>
                  <p>
                    The information we collect is used to process and deliver your orders, respond to inquiries, and
                    provide customer support. It also helps us improve our website and services, share updates and
                    promotions that may interest you, and ensure compliance with legal and safety requirements. You may
                    opt out of receiving promotional messages at any time.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Information Sharing and Disclosure</h2>
                  <p>
                    We do not sell your personal data. However, we may share your information with trusted service
                    providers, such as payment processors or logistics partners, when it is necessary to deliver our
                    services. We may also disclose information if required by law, or when it is reasonably necessary to
                    protect the rights, safety, and security of Value Acquisitions Holdings Inc., our users, or the
                    public.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Cookies and Tracking Technologies</h2>
                  <p>
                    Our website uses cookies to enhance your browsing experience, remember your preferences, and improve
                    security. You may disable cookies through your browser settings, but some features of the site may
                    not function properly if cookies are turned off.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Data Security</h2>
                  <p>
                    We take security seriously and use industry-standard safeguards, including encryption and restricted
                    access, to protect your data. While we make every effort to maintain a secure system, no method of
                    transmission or storage over the Internet can be guaranteed to be completely secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Your Rights</h2>
                  <p>
                    As a user, you have the right to access and update your personal information, request corrections,
                    and ask for the deletion of your data. You may also choose to stop receiving marketing
                    communications from us. To exercise these rights, you may contact us at
                    valueacquisitionsholdings@gmail.com.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Changes to This Policy</h2>
                  <p>
                    This Privacy Policy may be updated from time to time, and any changes will be posted on this page
                    along with the date of revision. We encourage you to review this policy periodically to stay
                    informed about how we protect your information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-black">Contact Us</h2>
                  <p>
                    If you have any questions or concerns regarding this Privacy Policy, you may contact us at
                    valueacquisitionsholdings@gmail.com or call us through our official hotlines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
