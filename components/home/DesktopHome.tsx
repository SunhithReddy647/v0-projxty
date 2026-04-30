"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import {
    sections,
    services,
    clientBrands,
    internshipHighlights,
    internshipDurations
} from "@/lib/data"

import { useShaderLoader } from "@/hooks/use-shader-loader"

export default function DesktopHome() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const sectionRefsRef = useRef<(HTMLElement | null)[]>([])
    const [currentSection, setCurrentSection] = useState(0)
    const shaderContainerRef = useRef<HTMLDivElement>(null)
    const isLoaded = useShaderLoader(shaderContainerRef)

    const isTransitioningRef = useRef(false)
    const lastScrollTimeRef = useRef(0)
    const scrollAccumulatorRef = useRef(0)

    const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

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
        if (!scrollContainerRef.current || isTransitioningRef.current || index < 0 || index >= sections.length) return

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

                if (scrollAccumulatorRef.current > 0 && currentSection < sections.length - 1) { // Fixed: use sections.length
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
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false })
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel)
            }
        }
    }, [currentSection, canSectionScroll, isAtSectionBottom, isAtSectionTop, scrollToSection])

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
                        colorA="#000033"
                        colorB="#0066ff"
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
                        baseColor="#001a33"
                        upColor="#0066ff"
                        downColor="#000033"
                        leftColor="#0099ff"
                        rightColor="#00ccff"
                        intensity={0.9}
                        radius={1.8}
                        momentum={25}
                        maskType="alpha"
                        opacity={0.97}
                    />
                </Shader>
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <nav
                className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-4 sm:px-6 md:px-12 h-16 sm:h-20 backdrop-blur-sm transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
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
                            className={`group relative font-sans text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer ${index === currentSection ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                                }`}
                            style={{ pointerEvents: "auto" }}
                        >
                            {item}
                            <span
                                className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-accent to-primary transition-all duration-300 ${index === currentSection ? "w-full" : "w-0 group-hover:w-full"
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

            <div
                ref={scrollContainerRef}
                data-scroll-container
                className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollSnapType: "x mandatory",
                    scrollBehavior: "smooth",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {/* Home Section (0) */}
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
                                    scrollToSection(4) // Navigating to Internships
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
                                    150+ Capstone Teams
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

                {/* About Us Section (1) */}
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

                {/* Services Section (2) */}
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
                            {services.map((service, idx) => (
                                <div key={idx} className={`group relative rounded-xl border border-foreground/20 bg-foreground/5 p-4 sm:p-5 hover:border-foreground/40 hover:bg-foreground/8 transition-all duration-300 ${idx === 0 ? "sm:col-span-2 overflow-hidden" : ""} ${idx === 6 ? "sm:col-span-2 lg:col-span-4 bg-gradient-to-br from-foreground/5 to-foreground/10" : ""}`}>
                                    {idx === 0 && <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                                    <div className="relative">
                                        <div className={`flex items-start justify-between mb-2.5 sm:mb-3 ${idx === 6 ? "flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3" : ""}`}>
                                            {idx === 6 ? (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                                                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                                                {idx === 6 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <h3 className="font-sans text-sm sm:text-base lg:text-lg font-bold text-foreground">{service.title}</h3>
                                                                <span className="text-[10px] font-mono text-foreground/40">0{idx + 1}</span>
                                                            </div>
                                                            <p className="text-xs text-foreground/70 leading-relaxed">{service.desc}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-foreground/50">
                                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                        <span className="font-mono">24/7</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent flex-shrink-0">
                                                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                                                        </svg>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-foreground/40">0{idx + 1}</span>
                                                </>
                                            )}
                                        </div>
                                        {idx !== 6 && (
                                            <>
                                                <h3 className={`font-sans ${idx === 0 ? "text-base sm:text-lg lg:text-xl" : "text-sm sm:text-base"} font-bold text-foreground mb-1.5 sm:mb-2`}>
                                                    {service.title}
                                                </h3>
                                                <p className={`text-xs ${idx === 0 ? "sm:text-sm" : ""} text-foreground/70 leading-relaxed`}>{service.desc}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Clients Section (3) */}
                <section
                    ref={(el) => {
                        sectionRefsRef.current[3] = el
                    }}
                    className="flex min-h-screen w-screen shrink-0 flex-col items-center justify-start px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 pb-16 overflow-y-auto"
                    style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
                >
                    <div className="max-w-4xl mx-auto w-full pt-12">
                        <h1 className="text-center font-monument text-7xl font-bold text-foreground">Clients Brands</h1>
                        <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {clientBrands.map((brand) => (
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

                {/* Internships Section (4) */}
                <section
                    ref={(el) => {
                        sectionRefsRef.current[4] = el
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
                                    {internshipHighlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <svg className="h-6 w-6 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d={highlight.icon} clipRule="evenodd" />
                                            </svg>
                                            <span className="text-base text-foreground/80">{highlight.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Duration Options */}
                            <div className="rounded-2xl bg-foreground/5 border border-foreground/10 p-8 sm:p-10">
                                <h2 className="font-monument text-2xl sm:text-3xl font-bold text-foreground mb-6">
                                    Internship Duration Options
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {internshipDurations.map((duration) => (
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
                                            <img
                                                src="/images/rahul-offer-letter.png"
                                                alt="Sample Offer Letter"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-monument text-lg text-foreground/80 text-center">Certificate</h3>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 bg-white/5 transition-transform hover:scale-[1.02] duration-300">
                                            <img
                                                src="/images/rahul-certificate.png"
                                                alt="Sample Internship Certificate"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Us Section (5) */}
                <section
                    ref={(el) => {
                        sectionRefsRef.current[5] = el
                    }}
                    className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
                    style={{
                        scrollSnapAlign: "center",
                        scrollSnapStop: "always"
                    }}
                >
                    <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <h1 className="font-monument text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[0.9]">
                                {"Let's"} Build
                                <br />
                                Something
                                <br />
                                <span className={gradientText}>Great Together.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-foreground/70 max-w-lg leading-relaxed">
                                Reach out to collaborate, discuss projects, or just say hello. We are always looking for new challenges.
                            </p>

                            <div className="flex gap-4">
                                <a
                                    href="https://www.linkedin.com/company/projxty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 hover:scale-110 transition-all"
                                >
                                    <svg className="h-5 w-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/projxty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 hover:scale-110 transition-all"
                                >
                                    <svg className="h-5 w-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.275-.045-1.65-.06-4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.facebook.com/projxty"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 hover:bg-foreground/20 hover:scale-110 transition-all"
                                >
                                    <svg className="h-5 w-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-110">
                                    <svg className="h-6 w-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">Email Us</p>
                                    <a href="mailto:projxty@gmail.com" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                                        projxty@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-110">
                                    <svg className="h-6 w-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">Call Us</p>
                                    <a href="tel:+916361064550" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                                        +91 6361064550
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-110">
                                    <svg className="h-6 w-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-foreground/50 mb-1">Visit Us</p>
                                    <p className="text-xl font-bold text-foreground">
                                        Banglore, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
