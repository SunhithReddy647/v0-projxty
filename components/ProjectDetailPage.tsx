"use client"

import Link from "next/link"
import { ProjectVideoModal } from "./ProjectVideoModal"
import { useState } from "react"

interface ProjectWithSlug {
  title: string
  slug: string
  description: string
  videoLink: string
  domain: string
  highlights?: string[]
}

export function ProjectDetailPage({ project }: { project: ProjectWithSlug }) {
  const [showVideo, setShowVideo] = useState(false)

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: project.title,
    description: project.description,
    category: project.domain,
    keywords: [project.domain, ...( project.highlights || [])],
    image: `https://img.youtube.com/vi/${getYouTubeId(project.videoLink)}/maxresdefault.jpg`,
  }

  function getYouTubeId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ""
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-foreground/10 bg-foreground/2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-primary hover:text-accent transition-colors">
                Home
              </Link>
              <span className="text-foreground/40">/</span>
              <Link href="/projects" className="text-primary hover:text-accent transition-colors">
                Projects
              </Link>
              <span className="text-foreground/40">/</span>
              <span className="text-foreground">{project.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            {/* Domain Badge */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary">
                {project.domain}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-foreground/80 max-w-3xl mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowVideo(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-foreground-dark font-bold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Video
              </button>
              <a
                href={`https://wa.me/6303459155?text=Hi, I'm interested in enquiring about the project: ${project.title}. Can you provide more details?`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-foreground/10 border border-primary/30 text-foreground font-bold hover:bg-foreground/20 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.736L1.821 23.84l8.115-2.129C11.39 23.088 14.2 24 17.051 24c9.866 0 17.881-8.023 17.881-17.89 0-4.767-1.85-9.243-5.21-12.596-3.36-3.353-7.82-5.202-12.542-5.202z"/>
                </svg>
                Contact Developer
              </a>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Project Demo</h2>
            <div className="relative w-full bg-black rounded-2xl overflow-hidden aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(project.videoLink)}?modestbranding=1&rel=0`}
                title={project.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Project Details Section */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">About This Project</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {project.description}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  This capstone project demonstrates real-world application of cutting-edge technologies. Students can explore the complete implementation, source code, and deployment strategies used in this project.
                </p>
              </div>

              {/* Right Column */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Technology Stack</h2>
                {project.highlights && project.highlights.length > 0 ? (
                  <div className="space-y-3">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-lg bg-foreground/5 border border-primary/20"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-foreground/60">Technologies used in this project coming soon</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I use this project for my college submission?",
                  a: "Yes! This project is designed to meet academic requirements. You can customize it based on your college's guidelines."
                },
                {
                  q: "Is the source code included?",
                  a: "Yes, you get complete source code, documentation, and deployment guide. Contact us for code repository access."
                },
                {
                  q: "Do you provide support after delivery?",
                  a: "Absolutely! We provide 3 months of technical support including bug fixes, updates, and guidance."
                },
                {
                  q: "What are the system requirements?",
                  a: "The project is built using modern web technologies. Specific requirements are listed in the project documentation."
                },
                {
                  q: "Can I modify the project?",
                  a: "Yes, the project is fully customizable. You can modify features, add new functionalities, or change the tech stack."
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-foreground/10 bg-foreground/2">
                  <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-foreground/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects Section */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Related Projects</h2>
            <p className="text-foreground/60 mb-8">
              Explore other projects in the {project.domain} domain
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary/20 transition-all"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Sticky Video Modal */}
      <ProjectVideoModal
        isOpen={showVideo}
        videoLink={project.videoLink}
        title={project.title}
        onClose={() => setShowVideo(false)}
      />
    </>
  )
}
