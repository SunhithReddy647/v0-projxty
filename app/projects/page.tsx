import type { Metadata } from "next"
import Link from "next/link"
import { projects, projectDomains } from "@/lib/data"

export const metadata: Metadata = {
  title: "50 Real Capstone Projects | Projxty - Final Year Project Showcase",
  description:
    "Explore 50 real student capstone projects across AI/ML, Web Development, Mobile Apps, Healthcare, Blockchain & more. Each project includes video demos and complete source code.",
  keywords: [
    "capstone projects",
    "final year projects",
    "student projects",
    "IT projects",
    "engineering projects",
    "CS projects",
    "project showcase"
  ],
  openGraph: {
    title: "50 Real Capstone Projects | Projxty",
    description: "Explore student capstone projects with video demos and source code",
    type: "website",
    url: "https://projxty.com/projects",
  },
  alternates: {
    canonical: "https://projxty.com/projects",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-foreground/10 bg-foreground/2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Capstone Projects
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl">
            Explore {projects.length} real student capstone projects across multiple technology domains. Each project includes video demos, complete documentation, and source code.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/2 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 h-full hover:-translate-y-2"
              >
                {/* Domain Badge */}
                <div className="px-6 pt-6">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {project.domain}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-6 pb-6 pt-4 space-y-4">
                  <div>
                    <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full border border-accent/20 font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                      {project.highlights.length > 2 && (
                        <span className="text-xs text-foreground/50 px-2.5 py-1">
                          +{project.highlights.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Arrow */}
                  <div className="pt-2 inline-flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-bold">View Project</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-foreground/10 bg-foreground/2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-monument text-4xl font-bold text-primary mb-2">{projects.length}</p>
              <p className="text-foreground/70">Real Projects</p>
            </div>
            <div className="text-center">
              <p className="font-monument text-4xl font-bold text-accent mb-2">{projectDomains.length - 1}</p>
              <p className="text-foreground/70">Tech Domains</p>
            </div>
            <div className="text-center">
              <p className="font-monument text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-foreground/70">Source Code</p>
            </div>
            <div className="text-center">
              <p className="font-monument text-4xl font-bold text-accent mb-2">24/7</p>
              <p className="text-foreground/70">Support</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
