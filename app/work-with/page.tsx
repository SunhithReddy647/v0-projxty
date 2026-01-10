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
    <main className="relative w-full min-h-screen bg-background text-foreground">
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

      {/* Fixed Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-foreground/10 bg-background/80 px-4 sm:px-6 lg:px-12 py-4 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 flex-shrink-0">
          <img src="/images/design-mode/cropped_circle_image.png" alt="Projxty Logo" className="h-6 w-6" />
          <span className="font-monument text-lg font-bold tracking-tight text-foreground hidden sm:inline">
            Projxty
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:gap-6 lg:gap-8 md:flex">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Pricing", href: "/our-pricing" },
            { label: "Work With Us", href: "/work-with" },
            { label: "Internships", href: "/internships" },
            { label: "Contact", href: "/contact-us" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative font-sans text-xs sm:text-sm font-medium transition-colors text-foreground/60 hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-primary to-accent transition-all duration-300 w-0 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <Link
          href="/start-project"
          className="rounded-full bg-gradient-to-r from-primary to-accent px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-semibold text-background transition-all hover:shadow-lg hover:shadow-primary/30 flex-shrink-0"
        >
          Get Started
        </Link>
      </nav>

      {/* Content Area - Vertically Scrollable */}
      <div className="relative z-10 w-full pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Hero Section */}
        <section className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full text-center space-y-6 sm:space-y-8">
            <h1 className="font-monument text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
              Work With
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projxty</span>
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              Join our comprehensive internship program and grow your skills across diverse IT and Non-IT domains
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6">
              <a
                href="#it-domains"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-background hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              >
                Explore Domains
              </a>
              <Link
                href="/start-project"
                className="inline-flex items-center justify-center rounded-full border-2 border-foreground/30 px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-foreground hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300 w-full sm:w-auto"
              >
                Start Project
              </Link>
            </div>
          </div>
        </section>

        {/* IT Domains Section */}
        <section id="it-domains" className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h2 className="font-monument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                IT Domains
              </h2>
              <p className="font-sans text-sm sm:text-base text-foreground/60">
                Explore opportunities in cutting-edge technology domains
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {IT_DOMAINS.map((domain, index) => (
                <div
                  key={domain}
                  className="group relative p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-foreground/20 hover:border-primary/40 bg-foreground/5 hover:bg-foreground/8 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 30}ms both`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-between">
                    <p className="font-sans text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:translate-x-1 transition-transform duration-300">
                      {domain}
                    </p>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Non-IT Domains Section */}
        <section className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-foreground/2 to-background">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h2 className="font-monument text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                Non-IT Domains
              </h2>
              <p className="font-sans text-sm sm:text-base text-foreground/60">
                Discover diverse career paths beyond technology
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {NON_IT_DOMAINS.map((domain, index) => (
                <div
                  key={domain}
                  className="group relative p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl border border-foreground/20 hover:border-accent/40 bg-foreground/5 hover:bg-foreground/8 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 30}ms both`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-between">
                    <p className="font-sans text-sm sm:text-base md:text-lg font-semibold text-foreground group-hover:translate-x-1 transition-transform duration-300">
                      {domain}
                    </p>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto w-full">
            <div className="rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border border-primary/20 p-6 sm:p-8 md:p-10 lg:p-12 text-center space-y-4 sm:space-y-6">
              <h2 className="font-monument text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Ready to Join?
              </h2>
              <p className="font-sans text-sm sm:text-base md:text-lg text-foreground/70 leading-relaxed">
                Choose your domain and start your journey with Projxty. Learn from industry experts and build real-world
                experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6">
                <a
                  href="https://forms.gle/pZ5quDYmozAHk6AC6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-background hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95 w-full sm:w-auto"
                >
                  Apply Now
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border-2 border-foreground/30 px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-foreground hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300 w-full sm:w-auto"
                >
                  Learn More
                </Link>
              </div>
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

        /* Mobile-first responsive behavior */
        @media (max-width: 640px) {
          section {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </main>
  )
}
