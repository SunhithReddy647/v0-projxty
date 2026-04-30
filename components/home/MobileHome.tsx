"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
    itDomains,
    nonItDomains,
    services,
    clientBrands,
    internshipHighlights,
    internshipDurations,
    socialLinks,
    conferencePillars,
    conferenceStats
} from "@/lib/data"

import { useShaderLoader } from "@/hooks/use-shader-loader"

export default function MobileHome() {
    const shaderContainerRef = useRef<HTMLDivElement>(null)
    const isLoaded = useShaderLoader(shaderContainerRef)
    const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

    const scrollToInternships = () => {
        const internshipsSection = document.getElementById("internships")
        if (internshipsSection) {
            internshipsSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact")
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" })
        }
    }

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
                            onClick={scrollToInternships}
                            className="group rounded-full border-2 border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5"
                        >
                            Explore Internships
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </button>
                    </div>

                    <div className="mt-12 grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-widest text-foreground/50">Trusted By</p>
                            <p className="text-sm font-semibold text-foreground">150+ Capstone Teams</p>
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
                        {services.map((service, idx) => (
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

                {/* Clients Section */}
                <section className="min-h-screen px-6 py-16">
                    <h1 className="font-monument text-4xl font-bold text-foreground text-center mb-8">Clients Brands</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {clientBrands.map((brand) => (
                            <div
                                key={brand}
                                className="flex items-center justify-center rounded-lg border border-foreground/20 p-6"
                            >
                                <p className="text-sm font-semibold text-foreground/60">{brand}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="conference" className="min-h-screen px-6 py-16">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        PGTC 2026
                    </div>
                    <h1 className="font-monument text-4xl font-bold text-foreground mb-2">Projxty Global</h1>
                    <h2 className={`font-monument text-3xl font-bold mb-6 ${gradientText}`}>Tech Conference 2026</h2>
                    <p className="text-lg font-medium text-foreground/90 mb-4 tracking-tight">Unlock the Future. Be There.</p>
                    <p className="text-sm text-foreground/60 mb-8 font-mono tracking-widest uppercase">#PGTC2K26</p>

                    {/* Three Pillars */}
                    <div className="space-y-6 mb-12">
                        <h3 className="font-monument text-xl font-bold text-foreground">Three Pillars of Innovation</h3>
                        <div className="space-y-4">
                            {conferencePillars.map((pillar, i) => (
                                <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-5">
                                    <h4 className="font-bold text-primary mb-2 text-base">{pillar.title}</h4>
                                    <p className="text-sm text-foreground/70 leading-relaxed">{pillar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-12">
                        {conferenceStats.map((stat, i) => (
                            <div
                                key={i}
                                className="text-center rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-foreground/5 p-4"
                            >
                                <p className="text-2xl font-monument font-bold text-foreground">{stat.val}</p>
                                <p className="text-[10px] uppercase tracking-widest text-foreground/40 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Registration */}
                    <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-6 text-center">
                        <h3 className="font-monument text-xl font-bold text-foreground mb-3">Register for PGTC 2026</h3>
                        <p className="text-2xl font-bold text-primary mb-2">₹800</p>
                        <p className="text-xs text-foreground/60 mb-6 italic">Max group of 5 - ideal for teams!</p>
                        <div className="space-y-3">
                            <a
                                href="https://forms.gle/QQCWt9xTRKh63cBDA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 rounded-full bg-gradient-to-r from-primary to-accent text-sm font-bold text-background"
                            >
                                Register now
                            </a>
                            <a
                                href="mailto:projxty@gmail.com"
                                className="block w-full py-3 rounded-full border border-foreground/20 text-sm font-bold text-foreground"
                            >
                                Contact us
                            </a>
                        </div>
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
                            {internshipHighlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <svg className="h-5 w-5 text-primary mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d={highlight.icon} clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm text-foreground/80">{highlight.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Duration Options */}
                    <div className="mb-8 rounded-xl bg-foreground/5 border border-foreground/10 p-6">
                        <h2 className="font-monument text-xl font-bold text-foreground mb-4">Internship Duration Options</h2>
                        <div className="flex flex-wrap gap-2">
                            {internshipDurations.map((duration) => (
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
                                +91 6303459155
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
                            onClick={scrollToContact}
                            className="block w-full text-center rounded-full border-2 border-foreground/30 px-10 py-4 font-sans text-base font-bold text-foreground hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300"
                        >
                            Contact Us
                        </button>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="min-h-screen px-6 py-16">
                    <h1 className="font-monument text-3xl font-bold text-foreground mb-2">
                        {"Let's"} Build Something
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
                            {socialLinks.map((social) => (
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
