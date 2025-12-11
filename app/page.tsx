"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefsRef = useRef<(HTMLElement | null)[]>([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [careersTab, setCareersTab] = useState<"fulltime" | "internships" | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const isTransitioningRef = useRef(false)
  const lastScrollTimeRef = useRef(0)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const scrollAccumulatorRef = useRef(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const canSectionScroll = useCallback((sectionElement: HTMLElement | null): boolean => {
    if (!sectionElement) return false
    return sectionElement.scrollHeight > sectionElement.clientHeight + 10
  }, [])

  const isAtSectionBottom = useCallback((sectionElement: HTMLElement | null): boolean => {
    if (!sectionElement) return true
    const threshold = 10
    return sectionElement.scrollHeight - sectionElement.clientHeight - sectionElement.scrollTop < threshold
  }, [])

  const isAtSectionTop = useCallback((sectionElement: HTMLElement | null): boolean => {
    if (!sectionElement) return true
    return sectionElement.scrollTop < 10
  }, [])

  const scrollToSection = useCallback((index: number) => {
    if (!scrollContainerRef.current || isTransitioningRef.current || index < 0 || index >= 8) return

    isTransitioningRef.current = true

    const sectionWidth = scrollContainerRef.current.offsetWidth
    scrollContainerRef.current.scrollTo({
      left: sectionWidth * index,
      behavior: "smooth",
    })

    setCurrentSection(index)

    setTimeout(() => {
      isTransitioningRef.current = false
    }, 700)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()

      if (isTransitioningRef.current) {
        e.preventDefault()
        return
      }

      const currentSectionElement = sectionRefsRef.current[currentSection]
      const canScroll = canSectionScroll(currentSectionElement)
      const atBottom = isAtSectionBottom(currentSectionElement)
      const atTop = isAtSectionTop(currentSectionElement)

      if (canScroll && currentSectionElement) {
        if (e.deltaY < 0 && !atTop) {
          currentSectionElement.scrollBy({ top: e.deltaY, behavior: "auto" })
          e.preventDefault()
          return
        } else if (e.deltaY > 0 && !atBottom) {
          currentSectionElement.scrollBy({ top: e.deltaY, behavior: "auto" })
          e.preventDefault()
          return
        }
      }

      const timeSinceLastScroll = now - lastScrollTimeRef.current
      if (timeSinceLastScroll < 800) {
        e.preventDefault()
        return
      }

      scrollAccumulatorRef.current += e.deltaY

      const shouldNavigate =
        Math.abs(scrollAccumulatorRef.current) > 50 &&
        (!canScroll || (e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop))

      if (shouldNavigate) {
        e.preventDefault()

        if (scrollAccumulatorRef.current > 0 && currentSection < 7) {
          lastScrollTimeRef.current = now
          scrollAccumulatorRef.current = 0
          scrollToSection(currentSection + 1)
        } else if (scrollAccumulatorRef.current < 0 && currentSection > 0) {
          lastScrollTimeRef.current = now
          scrollAccumulatorRef.current = 0
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container && !isMobile) {
      // Only add listener if not mobile
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isMobile, canSectionScroll, isAtSectionBottom, isAtSectionTop, scrollToSection])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      const threshold = 50

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && currentSection < 7) {
          scrollToSection(currentSection + 1)
        } else if (deltaX < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container && isMobile) {
      // Only add listener if mobile
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isMobile, scrollToSection])

  const sections = [
    "Home",
    "About Us",
    "Services",
    "Our Pricing",
    "Clients Brands",
    "Internships",
    "Blog",
    "Contact Us",
  ]

  const itDomains = [
    { name: "Web Development" },
    { name: "Mobile App Development" },
    { name: "Data Science & Analytics" },
    { name: "Machine Learning & AI" },
    { name: "Generative AI" },
    { name: "Prompt Engineering" },
    { name: "Cloud Computing" },
    { name: "Cybersecurity" },
    { name: "DevOps" },
    { name: "UI/UX Design" },
    { name: "Database Management" },
    { name: "Blockchain" },
  ]

  const nonItDomains = [
    { name: "Digital Marketing" },
    { name: "Content Writing & Copywriting" },
    { name: "Graphic Design" },
    { name: "Human Resources (HR)" },
    { name: "Business Development & Sales" },
    { name: "Finance & Accounting" },
    { name: "Operations Management" },
    { name: "Market Research & Analytics" },
    { name: "Public Relations (PR)" },
    { name: "Video Editing & Production" },
  ]

  const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

  if (isMobile) {
    return (
      <main className="relative min-h-screen w-full bg-background overflow-y-auto overflow-x-hidden">
        <GrainOverlay />

        {/* Simplified shader for mobile */}
        <div
          ref={shaderContainerRef}
          className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <Shader className="h-full w-full">
            <Swirl
              colorA="#1275d8"
              colorB="#e19136"
              speed={0.8}
              detail={0.8}
              blend={50}
              coarseX={40}
              coarseY={40}
              mediumX={40}
              mediumY={40}
              fineX={40}
              fineY={40}
            />
            <ChromaFlow
              baseColor="#0066ff"
              upColor="#0066ff"
              downColor="#d1d1d1"
              leftColor="#e19136"
              rightColor="#e19136"
              intensity={0.9}
              radius={1.8}
              momentum={25}
              maskType="alpha"
              opacity={0.97}
            />
          </Shader>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Mobile Header */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 h-16 backdrop-blur-sm bg-background/80 border-b border-foreground/10">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img src="/images/design-mode/cropped_circle_image.png" alt="Projxty Logo" className="h-6 w-6" />
            <span className="font-monument text-lg font-bold tracking-tight text-foreground">Projxty</span>
          </Link>
          <button className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-background">
            <Link href="/start-project" className="block w-full h-full flex items-center justify-center">
              Get Started
            </Link>
          </button>
        </nav>

        {/* Mobile Content - Vertically scrolling sections */}
        <div className="relative z-10 pt-16">
          {/* Home Section */}
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
              <button
                onClick={() => {
                  const internshipsSection = document.getElementById("internships")
                  if (internshipsSection) {
                    internshipsSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="group rounded-full border-2 border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5"
              >
                Explore Internships
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
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

          {/* About Us Section */}
          <section className="min-h-screen px-6 py-16">
            <h1 className="font-monument text-4xl font-bold text-foreground mb-6">About Us</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs font-semibold text-foreground">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                AICTE APPROVED
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs font-semibold text-foreground">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                MSME REGISTERED
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs font-semibold text-foreground">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                STARTUP INDIA
              </span>
            </div>

            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">Projxty</span> is a modern web development and design
                company built on one simple belief — great ideas deserve great execution.
              </p>

              <p>
                We combine creativity with clean, powerful code — turning concepts into sleek, high-performing websites
                and brand platforms.
              </p>

              <div className="pt-3 border-t border-foreground/10">
                <p className="text-base font-semibold text-foreground leading-tight">
                  We don't just build websites.
                  <br />
                  <span className={gradientText}>We create digital identities that last.</span>
                </p>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="min-h-screen px-6 py-16">
            <h1 className="font-monument text-4xl font-bold text-foreground mb-6">Services</h1>

            <div className="space-y-4">
              {[
                {
                  icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Web Design & Development",
                  desc: "Fast, functional, and visually dynamic websites",
                },
                {
                  icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
                  title: "Branding & Visual Identity",
                  desc: "Build recognition through storytelling",
                },
                {
                  icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z",
                  title: "UI/UX Design",
                  desc: "Smooth, intuitive user experiences",
                },
                {
                  icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                  title: "E-Commerce Solutions",
                  desc: "Secure platforms with smart integrations",
                },
                {
                  icon: "M11 3.055A9.001 9.001 0 110 0v13a9.001 9.001 0 0111-9.945z",
                  title: "Digital Marketing",
                  desc: "SEO, social media, and performance tracking",
                },
                {
                  icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                  title: "Digital Strategy & SEO",
                  desc: "Data-driven optimization for reach",
                },
                {
                  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z",
                  title: "Maintenance & Support",
                  desc: "24/7 website care and updates",
                },
              ].map((service, idx) => (
                <div key={idx} className="rounded-lg border border-foreground/20 bg-foreground/5 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                      <svg className="h-5 w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-sans text-base font-bold text-foreground mb-1">{service.title}</h3>
                      <p className="text-xs text-foreground/70">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="min-h-screen px-6 py-16">
            <div className="text-center mb-8">
              <h1 className="font-monument text-4xl font-bold text-foreground mb-2">Our Pricing</h1>
              <p className="text-sm text-foreground/60">Choose the perfect plan</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Starter */}
              <div className="rounded-lg border-2 border-foreground/20 bg-foreground/5 p-6">
                <h3 className="font-monument text-2xl font-bold text-foreground mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-foreground">₹5,999</span>
                </div>
                <p className="text-sm text-foreground/60 mb-4">For individuals and small businesses</p>
                <ul className="space-y-2 mb-4">
                  {["Up to 5 web pages", "Responsive design", "Basic SEO setup", "Contact form", "1 week delivery"].map(
                    (feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                        <svg
                          className="h-5 w-5 text-primary shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <button className="w-full rounded-lg border-2 border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground">
                  Get Started
                </button>
              </div>

              {/* Professional */}
              <div className="rounded-lg border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-accent/15 to-primary/20 p-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 shadow-lg border-2 border-background">
                    <svg className="h-4 w-4 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-background uppercase">Recommended</span>
                  </div>
                </div>
                <h3 className="font-monument text-2xl font-bold text-foreground mb-2 mt-2">Professional</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-4xl font-bold ${gradientText}`}>₹9,999</span>
                </div>
                <p className="text-sm text-foreground/60 mb-4">For brands ready to grow</p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Custom design + animations",
                    "CMS/API integration",
                    "SEO + analytics",
                    "Priority support",
                    "2-3 weeks delivery",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <svg
                        className="h-5 w-5 text-primary shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-semibold text-background">
                  Get Started
                </button>
              </div>

              {/* Enterprise */}
              <div className="rounded-lg border-2 border-foreground/20 bg-foreground/5 p-6">
                <h3 className="font-monument text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-foreground">Custom</span>
                </div>
                <p className="text-sm text-foreground/60 mb-4">Complete digital solutions</p>
                <ul className="space-y-2 mb-4">
                  {["Full-scale development", "Branding + marketing", "SEO strategy", "Maintenance + updates"].map(
                    (feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                        <svg
                          className="h-5 w-5 text-primary shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <button className="w-full rounded-lg border-2 border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground">
                  Contact Us
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-foreground/5 via-foreground/8 to-foreground/5 border border-foreground/10 p-6 text-center">
              <h3 className="font-sans text-lg font-bold text-foreground mb-2">Need a custom plan?</h3>
              <p className="text-sm text-foreground/60 mb-4">Tell us your goals — we'll craft the perfect package.</p>
              <button className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
                Let's Talk
              </button>
            </div>
          </section>

          {/* Clients Section */}
          <section className="min-h-screen px-6 py-16">
            <h1 className="font-monument text-4xl font-bold text-foreground text-center mb-8">Clients Brands</h1>
            <div className="grid grid-cols-2 gap-4">
              {[
                "TechCorp",
                "Design Co",
                "Start Up",
                "Digital Pro",
                "Cloud Nine",
                "Code Labs",
                "Web Studio",
                "Brand X",
              ].map((brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-lg border border-foreground/20 p-6"
                >
                  <p className="text-sm font-semibold text-foreground/60">{brand}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internships Section */}
          <section id="internships" className="min-h-screen px-6 py-16">
            <div className="text-center mb-8">
              <h1 className="font-monument text-4xl font-bold text-foreground mb-3">Internships</h1>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Work on real-world projects, gain verified experience, and build your portfolio with our internship
                programs.
              </p>
            </div>

            {/* Program Highlights */}
            <div className="mb-8 rounded-xl bg-foreground/5 border border-foreground/10 p-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-4">Program Highlights</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Official Offer Letter and Completion Certificate</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Work-from-home based internship</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Real-time industry projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Flexible work schedule and task submission</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Placement guidance and interview preparation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">Resume building support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-foreground/80">
                    Certificate and LOR hard copies couriered (post-completion)
                  </span>
                </li>
              </ul>
            </div>

            {/* Duration Options */}
            <div className="mb-8 rounded-xl bg-foreground/5 border border-foreground/10 p-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-4">Internship Duration Options</h2>
              <div className="flex flex-wrap gap-2">
                {["4 Weeks", "6 Weeks", "8 Weeks", "12 Weeks", "6 Months"].map((duration) => (
                  <span
                    key={duration}
                    className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-semibold text-foreground"
                  >
                    {duration}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Documents Section for Mobile */}
            <div className="mb-8 rounded-xl bg-foreground/5 border border-foreground/10 p-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-4">Sample Documents</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-semibold text-foreground/80">Offer Letter</h3>
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-foreground/10">
                    <Image
                      src="/images/rahul-offer-letter.png"
                      alt="Sample Offer Letter"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-sm font-semibold text-foreground/80">Certificate of Internship</h3>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-foreground/10">
                    <Image
                      src="/images/rahul-certificate.png"
                      alt="Sample Internship Certificate"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-3">IT Domains</h2>
              <ul className="space-y-2 list-disc list-inside">
                {itDomains.map((domain, idx) => (
                  <li key={idx} className="font-sans text-sm text-foreground/80">
                    {domain.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-monument text-xl font-bold text-foreground mb-3">Non-IT Domains</h2>
              <ul className="space-y-2 list-disc list-inside">
                {nonItDomains.map((domain, idx) => (
                  <li key={idx} className="font-sans text-sm text-foreground/80">
                    {domain.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="mb-8 rounded-xl bg-foreground/5 border border-foreground/10 p-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-3">Eligibility</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Open to students, recent graduates, and professionals from technical and non-technical backgrounds.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-6">
              <h2 className="font-monument text-xl font-bold text-foreground mb-4">Contact HR</h2>
              <div className="space-y-3">
                <a
                  href="mailto:projxty@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  projxty@gmail.com
                </a>
                <a
                  href="tel:+919392768519"
                  className="flex items-center gap-3 text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +91 93927 68519
                </a>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="space-y-3">
              <a
                href="https://forms.gle/pZ5quDYmozAHk6AC6"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 font-sans text-base font-bold text-background hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Apply Now
              </a>
              <button
                onClick={() => window.open("/sample-certificate.pdf", "_blank")}
                className="block w-full text-center rounded-full border-2 border-primary px-10 py-4 font-sans text-base font-semibold text-primary hover:bg-primary/10 transition-all duration-300"
              >
                View Sample Certificate
              </button>
            </div>
          </section>

          {/* Blog Section */}
          <section className="min-h-screen px-6 py-16">
            <h1 className="font-monument text-4xl font-bold text-foreground text-center mb-8">Blog</h1>
            <div className="space-y-4">
              {[
                { title: "Web Design Trends 2025", date: "Jan 15, 2025" },
                { title: "React Performance Tips", date: "Jan 10, 2025" },
                { title: "UX Best Practices", date: "Jan 5, 2025" },
                { title: "Next.js Guide", date: "Dec 28, 2024" },
              ].map((post) => (
                <div key={post.title} className="rounded-lg border border-foreground/20 p-5">
                  <h3 className="text-base font-semibold text-foreground mb-2">{post.title}</h3>
                  <p className="text-xs text-foreground/60">{post.date}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="min-h-screen px-6 py-16">
            <h1 className="font-monument text-3xl font-bold text-foreground mb-2">
              Let's Build Something
              <br />
              <span className={gradientText}>Great Together.</span>
            </h1>
            <p className="text-sm text-foreground/70 mb-8">Reach out to collaborate or discuss projects.</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                  <svg className="h-5 w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase">Email</p>
                  <a href="mailto:projxty@gmail.com" className="text-sm font-medium text-foreground">
                    projxty@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                  <svg className="h-5 w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase">Phone</p>
                  <a href="tel:+916361064550" className="text-sm font-medium text-foreground">
                    +91 6361064550
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent">
                  <svg className="h-5 w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase">Location</p>
                  <p className="text-sm font-medium text-foreground">Banglore, India</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs text-foreground/50 uppercase mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/projxty",
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/projxty",
                    icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.275-.045-1.65-.06-4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/projxty",
                    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/10"
                  >
                    <svg className="h-4 w-4 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }

  // Desktop version - existing horizontal scroll layout
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-4 sm:px-6 md:px-12 h-16 sm:h-20 backdrop-blur-sm transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ pointerEvents: "auto" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 transition-transform hover:scale-105 flex-shrink-0 cursor-pointer"
        >
          <img
            src="/images/design-mode/cropped_circle_image.png"
            alt="Projxty Logo"
            className="h-6 w-6 sm:h-7 sm:w-7"
          />
          <span className="font-monument text-lg sm:text-xl font-bold tracking-tight text-foreground hidden sm:inline">
            Projxty
          </span>
        </Link>

        <div className="hidden items-center gap-6 sm:gap-8 lg:flex">
          {sections.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                index === currentSection ? "text-foreground" : "text-foreground/60 hover:text-foreground"
              }`}
              style={{ pointerEvents: "auto" }}
            >
              {item}
              <span
                className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-300 ${
                  index === currentSection ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <Link
          href="/start-project"
          className="hidden rounded-full bg-foreground/10 px-4 sm:px-6 py-2 font-sans text-xs sm:text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-foreground/20 lg:block flex-shrink-0"
        >
          Get Started
        </Link>
      </nav>

      {/* Use isMobile to conditionally apply styles or behaviors for horizontal/vertical scrolling */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: isMobile ? "y mandatory" : "x mandatory", // Conditional scroll snap
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Home Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[0] = el
          }}
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
              <button
                onClick={() => {
                  if (isMobile) {
                    const internshipsSection = document.getElementById("internships")
                    if (internshipsSection) {
                      internshipsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  } else {
                    scrollToSection(5)
                  }
                }}
                className="group rounded-full border-2 border-foreground/30 px-6 sm:px-8 py-3 sm:py-4 font-sans text-sm sm:text-base font-semibold text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5"
              >
                Explore Internships
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="absolute right-4 sm:right-8 md:right-12 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4 sm:gap-6 text-right">
              <div className="space-y-1 opacity-0 animate-fade-in-up-1">
                <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Trusted By</p>
                <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  500+ Companies
                </p>
              </div>
              <div className="space-y-1 opacity-0 animate-fade-in-up-2">
                <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Industry</p>
                <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">
                  MSME Registered
                </p>
              </div>
              <div className="space-y-1 opacity-0 animate-fade-in-up-3">
                <p className="font-sans text-xs uppercase tracking-widest text-foreground/50">Recognized</p>
                <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground">Startup India</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[1] = el
          }}
          className="flex min-h-screen w-screen shrink-0 overflow-hidden pt-16 sm:pt-20"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          {/* Left Half - Company Story & Mission */}
          <div className="flex w-1/2 flex-col justify-start px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 border-r border-foreground/10 overflow-y-auto">
            <div className="max-w-xl">
              <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6">
                About Us
              </h1>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  MSME REGISTERED
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  STARTUP INDIA
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 text-foreground/80 leading-relaxed">
                <p className="text-xs sm:text-sm lg:text-base">
                  <span className="font-semibold text-foreground">Projxty</span> is a modern web development and design
                  company built on one simple belief — great ideas deserve great execution.
                </p>

                <p className="text-xs sm:text-sm lg:text-base">
                  We combine creativity with clean, powerful code — turning concepts into sleek, high-performing
                  websites and brand platforms.
                </p>

                <div className="pt-3 sm:pt-4 border-t border-foreground/10">
                  <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground leading-tight">
                    We don't just build websites.
                    <br />
                    <span className={gradientText}>We create digital identities that last.</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm lg:text-base">
                  Our focus is simple: create websites that are{" "}
                  <span className="font-semibold text-foreground">fast, flawless, and future-ready</span>. Every project
                  is a partnership — your vision, our expertise, and a shared goal of making something that truly works.
                </p>
              </div>
            </div>
          </div>

          {/* Right Half - Founder & Values */}
          <div className="flex w-1/2 flex-col justify-start px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 bg-foreground/5 overflow-y-auto">
            <div className="max-w-xl">
              <div className="mb-5 sm:mb-7">
                <h2 className="font-monument text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                  Founded by
                  <br />
                  <span className={gradientText}>Sunhith Reddy</span>
                </h2>
                <p className="text-xs sm:text-xs text-foreground/60 uppercase tracking-widest">Founder & CEO</p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-foreground/80 leading-relaxed">
                <p className="text-xs sm:text-sm lg:text-base">
                  Projxty was created to build digital experiences that stand out. We believe in making the web more
                  beautiful, more functional, and more human.
                </p>

                <div className="pt-3 sm:pt-4 space-y-2.5 sm:space-3">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                      <span className="text-sm sm:text-base font-bold text-background">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5 sm:mb-1 text-xs sm:text-sm">Innovation</h3>
                      <p className="text-xs sm:text-xs lg:text-sm text-foreground/70">
                        We push boundaries and explore new technologies to deliver cutting-edge solutions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                      <span className="text-sm sm:text-base font-bold text-background">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5 sm:mb-1 text-xs sm:text-sm">Learning</h3>
                      <p className="text-xs sm:text-xs lg:text-sm text-foreground/70">
                        We invest in the next wave of creators through comprehensive internship programs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                      <span className="text-sm sm:text-base font-bold text-background">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5 sm:mb-1 text-xs sm:text-sm">Purpose</h3>
                      <p className="text-xs sm:text-xs lg:text-sm text-foreground/70">
                        Design meets purpose, innovation never stops, and learning never ends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[2] = el
          }}
          className="flex min-h-screen max-h-screen w-screen shrink-0 flex-col px-6 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 pb-6 sm:pb-8 overflow-hidden"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          <div className="flex flex-col h-full">
            <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6">
              Services
            </h1>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 overflow-hidden">
              {/* Web Design & Development - Spans 2 columns */}
              <div className="sm:col-span-2 group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] font-mono text-foreground/40">01</span>
                  </div>
                  <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1.5 sm:mb-2">
                    Web Design & Development
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    We create fast, functional, and visually dynamic websites built for scalability and performance.
                  </p>
                </div>
              </div>

              {/* Branding & Visual Identity */}
              <div className="group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">02</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-1.5">
                  Branding & Visual Identity
                </h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Build recognition through storytelling and visual systems.
                </p>
              </div>

              {/* UI/UX Design */}
              <div className="group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">03</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-1.5">UI/UX Design</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Smooth, intuitive experiences that feel effortless.
                </p>
              </div>

              {/* E-Commerce Solutions */}
              <div className="group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">04</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-1.5">
                  E-Commerce Solutions
                </h3>
                <p className="text-xs text-foreground/70 leading-relaxed">Secure platforms with smart integrations.</p>
              </div>

              {/* Digital Marketing */}
              <div className="group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 3.055A9.001 9.001 0 110 0v13a9.001 9.001 0 0111-9.945z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">05</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-1.5">Digital Marketing</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  SEO, social media, and performance tracking.
                </p>
              </div>

              {/* Digital Strategy & SEO */}
              <div className="group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300">
                <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono text-foreground/40">06</span>
                </div>
                <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-1.5">
                  Digital Strategy & SEO
                </h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Data-driven optimization for reach and ranking.
                </p>
              </div>

              {/* Maintenance & Support - Spans all 4 columns on large screens, 2 on medium */}
              <div className="sm:col-span-2 lg:col-span-4 group relative rounded-xl border border-foreground/20 bg-gradient-to-br from-foreground/5 to-foreground/10 p-4 sm:p-5 hover:border-foreground/40 hover:from-foreground/8 hover:to-foreground/12 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                      <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-background"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-sans text-sm sm:text-base lg:text-lg font-bold text-foreground">
                          Maintenance & Support
                        </h3>
                        <span className="text-[10px] font-mono text-foreground/40">07</span>
                      </div>
                      <p className="text-xs text-foreground/70 leading-relaxed">
                        Keep your website fast, secure, and updated.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[3] = el
          }}
          className="flex min-h-screen max-h-screen w-screen shrink-0 flex-col px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 sm:pt-20 pb-6 sm:pb-10 overflow-hidden"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          <div className="flex-1 flex flex-col h-full max-w-7xl mx-auto w-full">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2 sm:mb-3 mt-1">
                Our Pricing
              </h1>
              <p className="text-sm sm:text-base text-foreground/60">Choose the perfect plan for your needs.</p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-5 sm:mb-6">
              {/* Starter Plan */}
              <div
                onMouseEnter={() => setHoveredPlan("starter")}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-lg border-2 bg-foreground/5 backdrop-blur-sm p-6 sm:p-7 flex flex-col transition-all duration-500 ${
                  hoveredPlan === "starter"
                    ? "scale-[1.08] border-foreground/40 bg-foreground/10 shadow-2xl z-20"
                    : hoveredPlan
                      ? "scale-90 opacity-40 border-foreground/10"
                      : "border-foreground/20 hover:border-foreground/30"
                }`}
              >
                <div className="mb-6">
                  <h3 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-2">Starter</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground">₹5,999</span>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    For individuals and small businesses starting online.
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Up to 5 web pages",
                    "Responsive design",
                    "Basic SEO setup",
                    "Contact form integration",
                    "Delivery in 1 week",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full rounded-lg border-2 border-foreground/30 px-6 py-3 font-sans text-sm font-semibold text-foreground hover:bg-foreground/5 hover:border-foreground/50 transition-all duration-200">
                  Get Started
                </button>
              </div>

              {/* Professional Plan - Recommended */}
              <div
                onMouseEnter={() => setHoveredPlan("professional")}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-lg border-2 bg-gradient-to-br from-primary/15 via-accent/15 to-primary/20 backdrop-blur-sm p-6 sm:p-7 flex flex-col transition-all duration-500 ${
                  hoveredPlan === "professional"
                    ? "scale-[1.08] border-primary/60 from-primary/15 via-accent/15 to-primary/20 shadow-2xl shadow-primary/30 z-20"
                    : hoveredPlan
                      ? "scale-90 opacity-40 border-primary/20"
                      : "border-primary/40 shadow-lg shadow-primary/10"
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 shadow-lg border-2 border-background">
                    <svg className="h-4 w-4 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold text-background uppercase tracking-wide">Recommended</span>
                  </div>
                </div>

                <div className="mb-6 mt-2">
                  <h3 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-2">Professional</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className={`text-4xl sm:text-5xl font-bold ${gradientText}`}>₹9,999</span>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    For brands ready to grow their digital presence.
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Custom design and animations",
                    "CMS or API integration",
                    "SEO optimization + analytics",
                    "Priority support",
                    "Delivery in 2–3 weeks",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/start-project"
                  className="w-full rounded-lg bg-gradient-to-r from-primary to-accent px-6 py-3 font-sans text-sm font-semibold text-background text-center"
                >
                  Get Started
                </Link>
              </div>

              {/* Enterprise */}
              <div
                onMouseEnter={() => setHoveredPlan("enterprise")}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-lg border-2 bg-foreground/5 backdrop-blur-sm p-6 sm:p-7 flex flex-col transition-all duration-500 ${
                  hoveredPlan === "enterprise"
                    ? "scale-[1.08] border-foreground/40 bg-foreground/10 shadow-2xl z-20"
                    : hoveredPlan
                      ? "scale-90 opacity-40 border-foreground/10"
                      : "border-foreground/20 hover:border-foreground/30"
                }`}
              >
                <div className="mb-6">
                  <h3 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-2">Enterprise</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl sm:text-5xl font-bold text-foreground">Custom</span>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    For startups or companies needing complete digital solutions.
                  </p>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {[
                    "Full-scale web or e-commerce development",
                    "Branding & marketing",
                    "SEO and performance strategy",
                    "Maintenance & updates",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                      <svg
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full rounded-lg border-2 border-foreground/30 px-6 py-3 font-sans text-sm font-semibold text-foreground hover:bg-foreground/5 hover:border-foreground/50 transition-all duration-200">
                  Contact Us
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-foreground/5 via-foreground/8 to-foreground/5 border border-foreground/10 p-6 text-center">
              <h3 className="font-sans text-lg font-bold text-foreground mb-2">Need a custom plan?</h3>
              <p className="text-sm text-foreground/60 mb-4">Tell us your goals — we'll craft the perfect package.</p>
              <button className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
                Let's Talk
              </button>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[4] = el
          }}
          className="flex min-h-screen w-screen shrink-0 flex-col items-center justify-start px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 pb-16 overflow-y-auto"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          <div className="max-w-4xl mx-auto w-full pt-12">
            <h1 className="text-center font-monument text-7xl font-bold text-foreground">Clients Brands</h1>
            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {[
                "TechCorp",
                "Design Co",
                "Start Up",
                "Digital Pro",
                "Cloud Nine",
                "Code Labs",
                "Web Studio",
                "Brand X",
              ].map((brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-lg border border-foreground/20 p-3 sm:p-4 md:p-6 hover:border-foreground/40 transition-colors"
                >
                  <p className="font-sans text-xs sm:text-sm md:text-base font-semibold text-foreground/60">{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[5] = el
          }}
          className="flex min-h-screen w-screen shrink-0 flex-col items-center px-4 sm:px-6 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-16 overflow-y-auto"
          style={{
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            overscrollBehavior: "contain",
          }}
        >
          <div className="max-w-7xl mx-auto w-full pb-16 sm:pb-24 pt-16 sm:pt-20">
            <div className="animate-in fade-in slide-in-from-top-2 duration-700">
              <h1 className="font-monument text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-center">
                Internships
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto text-center">
                Work on real-world projects, gain verified experience, and build your portfolio with our internship
                programs across IT and Non-IT domains.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-top-2 duration-500 space-y-10 sm:space-y-12">
              {/* Program Highlights */}
              <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-8 sm:p-10">
                <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Program Highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">
                      Official Offer Letter and Completion Certificate
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">Work-from-home based internship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">Real-time industry projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">Flexible work schedule and task submission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">Placement guidance and interview preparation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">Resume building support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-base text-foreground/80">
                      Certificate and LOR hard copies couriered (post-completion)
                    </span>
                  </li>
                </ul>
              </div>

              {/* Duration Options */}
              <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-8 sm:p-10">
                <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-6">
                  Internship Duration Options
                </h2>
                <div className="flex flex-wrap gap-3">
                  {["4 Weeks", "6 Weeks", "8 Weeks", "12 Weeks"].map((duration) => (
                    <span
                      key={duration}
                      className="px-6 py-3 rounded-full bg-primary/20 border-2 border-primary/30 text-base font-semibold text-foreground hover:bg-primary/30 transition-colors"
                    >
                      {duration}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Documents Section for Desktop */}
              <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-8 sm:p-10">
                <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-8">Sample Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-monument text-lg text-foreground/80 text-center">Offer Letter</h3>
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-foreground/10 bg-white/5 transition-transform hover:scale-[1.02] duration-300">
                      <Image
                        src="/images/rahul-offer-letter.png"
                        alt="Sample Offer Letter"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-monument text-lg text-foreground/80 text-center">Certificate of Internship</h3>
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 bg-white/5 transition-transform hover:scale-[1.02] duration-300">
                      <Image
                        src="/images/rahul-certificate.png"
                        alt="Sample Internship Certificate"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                <div>
                  <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center lg:text-left">
                    IT Domains
                  </h2>
                  <ul className="space-y-2 list-disc list-inside pl-4">
                    {itDomains.map((domain, idx) => (
                      <li key={idx} className="font-sans text-base text-foreground/80">
                        {domain.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center lg:text-left">
                    Non-IT Domains
                  </h2>
                  <ul className="space-y-2 list-disc list-inside pl-4">
                    {nonItDomains.map((domain, idx) => (
                      <li key={idx} className="font-sans text-base text-foreground/80">
                        {domain.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Eligibility and Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-8">
                  <h2 className="font-monument text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    Open to students, recent graduates, and professionals from technical and non-technical backgrounds.
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8">
                  <h2 className="font-monument text-2xl font-bold text-foreground mb-4">Contact HR</h2>
                  <div className="space-y-3">
                    <a
                      href="mailto:projxty@gmail.com"
                      className="flex items-center gap-3 text-base text-foreground/80 hover:text-primary transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      projxty@gmail.com
                    </a>
                    <a
                      href="tel:+919392768519"
                      className="flex items-center gap-3 text-base text-foreground/80 hover:text-primary transition-colors"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      +91 93927 68519
                    </a>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 sm:mt-16 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary/20 p-8 sm:p-10 lg:p-12 text-center backdrop-blur-sm">
                <h2 className="font-monument text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Start Your Internship with Projxty
                </h2>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto mb-8">
                  Work on real-world projects, gain verified experience, and build your portfolio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://forms.gle/pZ5quDYmozAHk6AC6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 font-sans text-base font-bold text-background hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[6] = el
          }}
          className="flex min-h-screen w-screen shrink-0 flex-col items-center justify-start px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 pb-16 overflow-y-auto"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          <div className="max-w-4xl mx-auto w-full pt-12">
            <h1 className="text-center font-monument text-7xl font-bold text-foreground">Blog</h1>
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {[
                { title: "Web Design Trends 2025", date: "Jan 15, 2025" },
                { title: "React Performance Tips", date: "Jan 10, 2025" },
                { title: "UX Best Practices", date: "Jan 5, 2025" },
                { title: "Next.js Guide", date: "Dec 28, 2024" },
              ].map((post) => (
                <div
                  key={post.title}
                  className="rounded-lg border border-foreground/20 p-4 sm:p-6 hover:border-foreground/40 transition-colors"
                >
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-foreground/60">{post.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={(el) => {
            sectionRefsRef.current[7] = el
          }}
          className="flex min-h-screen w-screen shrink-0 overflow-hidden pt-16 sm:pt-20"
          style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
        >
          {/* Left Section - Contact Info */}
          <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-md w-full space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div>
                <h1 className="font-monument text-3xl font-bold text-foreground mb-3 sm:mb-4 leading-tight sm:text-4xl">
                  Let's Build Something
                  <br />
                  <span className={gradientText}>Great Together.</span>
                </h1>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  Reach out to collaborate, discuss projects, or just say hello.
                </p>
              </div>

              <div className="space-y-4 sm:space-5">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide mb-0.5">Email</p>
                    <a
                      href="mailto:projxty@gmail.com"
                      className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      projxty@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide mb-0.5">Phone</p>
                    <a
                      href="tel:+919392768519"
                      className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {"+91 6361064550\n"}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-accent group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                    <svg
                      className="h-5 w-5 sm:h-6 sm:w-6 text-background"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase tracking-wide mb-0.5">Location</p>
                    <p className="text-sm sm:text-base font-medium text-foreground">Banglore, India</p>
                  </div>
                </div>
              </div>

              {/* Social Icons - Reduced gap from pt-6 to pt-3 */}
              <div className="pt-3 sm:pt-4 border-t border-foreground/10">
                <p className="text-xs text-foreground/50 uppercase tracking-wide mb-4">Follow Us</p>
                <div className="flex gap-3 sm:gap-4">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/projxty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-foreground/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    <svg
                      className="h-5 w-5 text-foreground group-hover:text-background transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/projxty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-foreground/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    <svg
                      className="h-5 w-5 text-foreground group-hover:text-background transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.275-.045-1.65-.06-4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/projxty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-foreground/10 hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
                  >
                    <svg
                      className="h-5 w-5 text-foreground group-hover:text-background transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Links Only */}
          <div className="flex w-full md:w-1/2 flex-col justify-center items-center px-6 sm:px-10 lg:px-16">
            <div className="text-center mb-10 flex items-center gap-4">
              <svg className="w-12 h-12" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#FF6600"
                  d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M179.664,202.064l-125.04,62.672v0.672l125.04,62.672v22.064l-148.4-76.432v-17.264l148.4-76.432V202.064z M221.872,362.928h-21.44 l89.232-231.872h21.728L221.872,362.928z M331.568,350.128v-22.064l126-62.672v-0.672l-126-62.672V180l148.4,76.096v17.936 L331.568,350.128z"
                />
              </svg>
              <h2 className="font-monument text-3xl font-bold text-foreground">Get in Touch</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {/* Internship */}
              <div className="group relative border border-foreground/20 rounded-2xl p-6 bg-background/50 backdrop-blur-sm hover:border-foreground/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    Internship Opportunities
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed flex-1">
                    Join our team and gain real-world experience in web development.
                  </p>
                  <a
                    href="https://wa.me/916361064550?text=Hi%2C%20I%27m%20interested%20in%20internship%20opportunities"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-primary text-background font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 w-full"
                  >
                    <span>Apply Now</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Web Development */}
              <div className="group relative border border-foreground/20 rounded-2xl p-6 bg-background/50 backdrop-blur-sm hover:border-foreground/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    Web Development
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed flex-1">
                    Professional websites that drive results for your business.
                  </p>
                  <a
                    href="https://wa.me/916361064550?text=Hi%2C%20I%27m%20interested%20in%20web%20development%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-accent text-background font-semibold hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300 w-full"
                  >
                    <span>Get Started</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Capstone Projects Portfolio */}
              <div className="group relative border border-foreground/20 rounded-2xl p-6 bg-background/50 backdrop-blur-sm hover:border-foreground/40 hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                    Capstone Projects
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed flex-1">
                    Browse our portfolio of successful capstone projects
                  </p>
                  <a
                    href="https://projxty.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold hover:shadow-lg hover:shadow-foreground/30 hover:scale-105 transition-all duration-300 w-full"
                  >
                    <span>View Portfolio</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Capstone Project Help */}
              <div className="group relative border border-foreground/20 rounded-2xl p-6 bg-background/50 backdrop-blur-sm hover:border-foreground/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    Capstone Project Help
                  </h3>
                  <p className="text-sm text-foreground/60 mb-4 leading-relaxed flex-1">
                    Get expert guidance for your final year capstone project
                  </p>
                  <a
                    href="https://wa.me/916361064550?text=Hi%2C%20I%27m%20interested%20in%20capstone%20project%20help"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-accent text-background font-semibold hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300 w-full"
                  >
                    <span>Learn More</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
