"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"

export default function AboutUsPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Projxty",
            description: "Learn about Projxty's mission, values, and services in web development and internships",
            mainEntity: {
              "@type": "Organization",
              name: "Projxty",
              foundingDate: "2024",
              founder: {
                "@type": "Person",
                name: "Sunhith Reddy",
              },
              knowsAbout: ["Web Development", "UI/UX Design", "Capstone Projects"],
              areaServed: {
                "@type": "Country",
                name: "India",
              },
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

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-6 md:px-12 pt-12">
        <h1 className="text-7xl font-bold text-center text-foreground mb-12">About Us</h1>

        <div className="max-w-4xl mx-auto space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-lg md:text-xl">
            <span className="font-semibold">Projxty</span> is a modern web development and design company built on one
            simple belief — great ideas deserve great execution.
          </p>

          <p className="text-lg md:text-xl">
            Founded by <span className="font-semibold">Sunhith Reddy</span>, Projxty was created to build digital
            experiences that stand out. We combine creativity with clean, powerful code — turning concepts into sleek,
            high-performing websites and brand platforms.
          </p>

          <p className="text-lg md:text-xl">
            Our focus is simple: create websites that are fast, flawless, and future-ready. Every project is a
            partnership — your vision, our expertise, and a shared goal of making something that truly works.
          </p>

          <p className="text-xl md:text-2xl font-semibold text-center my-8">
            We don't just build websites...
            <br />
            We create digital identities that last.
          </p>

          <p className="text-lg md:text-xl">
            At Projxty, we also invest in the next wave of creators through our internship programs — giving students
            and learners the chance to gain real-time experience, work on live projects, and grow alongside industry
            professionals.
          </p>

          <p className="text-xl md:text-2xl font-semibold text-center mt-8">
            Projxty — where design meets purpose, innovation never stops, and learning never ends.
          </p>
        </div>
      </div>
    </main>
  )
}
