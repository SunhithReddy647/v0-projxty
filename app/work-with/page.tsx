"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"

const IT_DOMAINS = [
  "Web Development",
  "App Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Software Development",
  "DevOps",
  "Blockchain",
  "Internet of Things (IoT)",
  "UI/UX Design",
  "Game Development",
  "Database Management",
  "Networking",
]

const NON_IT_DOMAINS = [
  "Marketing",
  "Digital Marketing",
  "Finance",
  "Accounting",
  "Human Resources",
  "Operations",
  "Business Development",
  "Sales",
  "Entrepreneurship",
  "Content Writing",
  "Graphic Design",
]

export default function WorkWithPage() {
  return (
    <main className="relative w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            name: "Projxty Internship Program",
            description:
              "Comprehensive internship program in web development, UI/UX design, and digital marketing with certification",
            provider: {
              "@type": "EducationalOrganization",
              name: "Projxty",
              url: "https://projxty.com",
            },
            educationalCredentialAwarded: {
              "@type": "EducationalOccupationalCredential",
              name: "Internship Certificate",
              credentialCategory: "Certificate",
            },
            occupationalCategory: ["Web Developer", "UI/UX Designer", "Digital Marketer", "Full Stack Developer"],
            areaServed: [
              { "@type": "City", name: "Hyderabad" },
              { "@type": "City", name: "Bengaluru" },
              { "@type": "City", name: "Chennai" },
              { "@type": "Country", name: "India" },
            ],
          }),
        }}
      />
      <CustomCursor />
      <GrainOverlay />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-background/50 px-6 py-6 backdrop-blur-md md:px-12">
        <Link href="/" className="transition-transform hover:scale-105">
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Projxty</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            "Home",
            "About Us",
            "Services",
            "Our Pricing",
            "Clients Brands",
            "Work With",
            "Blog",
            "Sitemaps",
            "Contact Us",
          ].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative font-sans text-sm font-medium transition-colors text-foreground/80 hover:text-foreground"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 w-0 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative z-10 pt-20">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-12 py-12">
          <h1 className="text-6xl md:text-8xl font-bold text-center text-foreground mb-12">Work With Us</h1>
          <p className="text-lg md:text-xl text-foreground/70 text-center max-w-2xl mb-16">
            Join our internship program and grow your skills in diverse domains
          </p>
        </div>

        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">IT Domains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {IT_DOMAINS.map((domain, index) => (
                <div
                  key={domain}
                  className="group p-6 rounded-lg border border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:bg-foreground/5 cursor-pointer"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 50}ms both`,
                  }}
                >
                  <p className="text-lg font-medium text-foreground group-hover:translate-x-1 transition-transform duration-300">
                    {domain}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16 md:py-24 bg-foreground/2">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">Non-IT Domains</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NON_IT_DOMAINS.map((domain, index) => (
                <div
                  key={domain}
                  className="group p-6 rounded-lg border border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:bg-foreground/5 cursor-pointer"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 50}ms both`,
                  }}
                >
                  <p className="text-lg font-medium text-foreground group-hover:translate-x-1 transition-transform duration-300">
                    {domain}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
