"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Projxty Web Development Services",
            description: "Professional web development, UI/UX design, e-commerce, and digital marketing services across India",
            provider: {
              "@type": "Organization",
              name: "Projxty",
              url: "https://projxty.com",
            },
            areaServed: [
              { "@type": "City", name: "Hyderabad" },
              { "@type": "City", name: "Bengaluru" },
              { "@type": "City", name: "Chennai" },
              { "@type": "City", name: "Pune" },
              { "@type": "City", name: "Delhi" },
              { "@type": "Country", name: "India" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Web Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Web Design & Development",
                    description: "Custom website development using React, Next.js, and modern frameworks",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "UI/UX Design",
                    description: "User-centric design with smooth, intuitive experiences",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "E-Commerce Solutions",
                    description: "Secure online stores with payment integration",
                  },
                },
              ],
            },
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12">
        <h1 className="text-7xl md:text-9xl font-bold text-center text-foreground">Services</h1>
      </div>
    </main>
  )
}
