"use client"

import { useState, useMemo } from "react"
import { projects, projectDomains, type ProjectDomain } from "@/lib/data"
import { ProjectVideoModal } from "@/components/ProjectVideoModal"

const gradientText = "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"

export function ProjectsSection() {
  const [activeDomain, setActiveDomain] = useState<ProjectDomain>("All Projects")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Filter projects by domain
  const filteredProjects = useMemo(() => {
    if (activeDomain === "All Projects") return projects
    return projects.filter((p) => p.domain === activeDomain)
  }, [activeDomain])

  return (
    <>
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-sm font-bold text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            150+ Capstone Projects
          </div>
          <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
            Student Capstone
          </h1>
          <h2 className={`font-monument text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${gradientText}`}>
            Projects Showcase
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl leading-relaxed">
            Explore award-winning capstone projects built by our talented engineering and CS students across diverse domains using enterprise-grade technologies.
          </p>
        </div>

        {/* Domain Filter Tabs */}
        <div className="flex flex-wrap gap-3 pb-2 overflow-x-auto">
          {projectDomains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                activeDomain === domain
                  ? "bg-gradient-to-r from-primary to-accent text-background shadow-lg shadow-primary/30"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10 border border-foreground/10 hover:border-primary/30"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <div
                key={`${project.domain}-${i}`}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/2 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 h-full hover:-translate-y-2"
              >
                {/* Video Container */}
                <div className="relative w-full aspect-video bg-black/20 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(project.videoLink)}?modestbranding=1&rel=0&controls=1`}
                    title={project.title}
                    className="w-full h-full border-0 pointer-events-none"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-gradient-to-r from-primary to-accent rounded-full p-4 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Domain Badge */}
                <div className="px-6 pt-4">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {project.domain}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-6 pb-6 pt-3 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
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

                  {/* Watch Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 mt-auto rounded-full bg-gradient-to-r from-primary to-accent text-sm font-bold text-background hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-all duration-300 w-full"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Full Demo
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-foreground/60 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 pt-8">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
            <p className="font-monument text-3xl font-bold text-primary">{projects.length}+</p>
            <p className="text-sm text-foreground/70 mt-2">Projects Delivered</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20">
            <p className="font-monument text-3xl font-bold text-accent">{projectDomains.length - 1}</p>
            <p className="text-sm text-foreground/70 mt-2">Technology Domains</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
            <p className="font-monument text-3xl font-bold text-foreground">100%</p>
            <p className="text-sm text-foreground/70 mt-2">Industry Ready</p>
          </div>
        </div>
      </div>

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
