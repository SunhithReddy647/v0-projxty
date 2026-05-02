"use client"

import { useState, useMemo } from "react"
import { projects, projectDomains, type ProjectDomain } from "@/lib/data"
import { ProjectVideoModal } from "@/components/ProjectVideoModal"

const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

export function ProjectsSectionMobile() {
  const [activeDomain, setActiveDomain] = useState<ProjectDomain>("All Projects")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Filter projects by domain
  const filteredProjects = useMemo(() => {
    if (activeDomain === "All Projects") return projects
    return projects.filter((p) => p.domain === activeDomain)
  }, [activeDomain])

  return (
    <>
      <section id="projects" className="min-h-screen px-4 sm:px-6 pt-20 pb-16">
        {/* Header */}
        <div className="mb-8 space-y-3">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            150+ Capstone
          </div>
          <h1 className="font-monument text-3xl sm:text-4xl font-bold text-foreground">Capstone</h1>
          <h2 className={`font-monument text-2xl sm:text-3xl font-bold ${gradientText}`}>Projects</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Explore award-winning projects built by our talented engineering and CS students.
          </p>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex gap-2 pb-6 overflow-x-auto scrollbar-hide">
          {projectDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`px-3.5 py-2 rounded-full font-semibold text-xs whitespace-nowrap transition-all ${
                activeDomain === domain
                  ? "bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/30"
                  : "bg-foreground/5 text-foreground border border-foreground/10"
              }`}
            >
              {domain === "All Projects" ? "All" : domain.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-5">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <div
                key={`${project.domain}-${i}`}
                className="rounded-xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-foreground/2 overflow-hidden hover:border-primary/30 transition-all active:scale-95"
              >
                {/* Video Container */}
                <div
                  className="relative w-full aspect-video bg-black/20 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(project.videoLink)}?modestbranding=1&rel=0`}
                    title={project.title}
                    className="w-full h-full border-0 pointer-events-none"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-primary to-accent rounded-full p-3">
                      <svg className="w-5 h-5 text-white" fill="white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Domain Badge */}
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    {project.domain}
                  </span>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-sm text-foreground line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-foreground/70 line-clamp-2 mt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Watch Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 mt-2 rounded-lg bg-gradient-to-r from-primary to-accent text-xs font-bold text-background hover:shadow-lg hover:shadow-primary/40 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Full Demo
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-foreground/60 text-sm">No projects in this category.</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-10 pt-6 border-t border-foreground/10">
          <div className="text-center py-4">
            <p className="font-monument text-2xl font-bold text-primary">{projects.length}+</p>
            <p className="text-[11px] text-foreground/70 mt-1">Projects</p>
          </div>
          <div className="text-center py-4">
            <p className="font-monument text-2xl font-bold text-accent">{projectDomains.length - 1}</p>
            <p className="text-[11px] text-foreground/70 mt-1">Domains</p>
          </div>
          <div className="text-center py-4">
            <p className="font-monument text-2xl font-bold text-foreground">100%</p>
            <p className="text-[11px] text-foreground/70 mt-1">Ready</p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedProject && (
        <ProjectVideoModal
          isOpen={!!selectedProject}
          videoLink={selectedProject.videoLink}
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

// Utility function to extract YouTube ID
function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}
