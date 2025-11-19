"use client"

import Link from "next/link"

interface HeroSectionProps {
  isMobile: boolean
  sectionRef?: (el: HTMLDivElement | null) => void
}

export function HeroSection({ isMobile, sectionRef }: HeroSectionProps) {
  const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

  if (isMobile) {
    return (
      <section className="min-h-screen flex flex-col justify-center px-6 py-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-2 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-foreground/70">Now Building Tomorrow's Web</span>
        </div>

        <h1 className="font-monument font-black uppercase text-foreground text-4xl leading-[0.95] mb-4">
          Transform
          <br />
          <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent font-black">
            Ideas
          </span>
          <br />
          Into Reality
        </h1>

        <p className="mt-6 text-sm text-foreground/70 leading-relaxed">
          Elevate your digital presence with cutting-edge web development and design. We craft experiences that
          captivate, inspire, and convert.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/start-project"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-background text-center"
          >
            Start Your Project
          </Link>
          <Link
            href="/clients-brands"
            className="rounded-full border-2 border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground text-center"
          >
            View Our Work →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-foreground/50">Trusted By</p>
            <p className="text-sm font-semibold text-foreground">500+ Companies</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-foreground/50">Industry</p>
            <p className="text-sm font-semibold text-foreground">MSME Registered</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-foreground/50">Recognized</p>
            <p className="text-sm font-semibold text-foreground">Startup India</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-y-auto pt-16 sm:pt-20"
      style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 sm:px-4 py-2 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse flex-shrink-0" />
          <span className="font-sans text-xs sm:text-xs font-medium tracking-wide text-foreground/70">
            Now Building Tomorrow's Web
          </span>
        </div>

        <h1 className="font-monument font-black uppercase text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-4 sm:mb-6 tracking-tight">
          Transform
          <br className="hidden sm:block" />
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-40" />
            <span className={`relative inline-block ${gradientText} font-black`}>Ideas</span>
          </span>
          <br className="hidden sm:block" />
          Into Reality
        </h1>

        <p className="mt-6 sm:mt-8 max-w-2xl font-sans text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed">
          Elevate your digital presence with cutting-edge web development and design. We craft experiences that
          captivate, inspire, and convert.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:gap-6">
          <Link
            href="/start-project"
            className="rounded-full bg-gradient-to-r from-primary to-accent px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-background transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 text-center"
          >
            Start Your Project
          </Link>
          <Link
            href="/clients-brands"
            className="group rounded-full border-2 border-foreground/30 px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5 text-center"
          >
            View Our Work
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="absolute right-4 sm:right-8 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4 sm:gap-6 text-right">
          <div className="space-y-1 opacity-0 animate-fade-in-up-1">
            <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Trusted By</p>
            <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">500+ Companies</p>
          </div>
          <div className="space-y-1 opacity-0 animate-fade-in-up-2">
            <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Industry</p>
            <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">MSME Registered</p>
          </div>
          <div className="space-y-1 opacity-0 animate-fade-in-up-3">
            <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Recognized</p>
            <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">Startup India</p>
          </div>
        </div>
      </div>
    </section>
  )
}
