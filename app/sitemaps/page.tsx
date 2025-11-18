"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Link from "next/link"

export default function SitemapsPage() {
  return (
    <main className="relative min-h-screen w-full bg-background">
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
        <h1 className="text-7xl md:text-9xl font-bold text-center text-foreground">Sitemaps</h1>
      </div>
    </main>
  )
}
