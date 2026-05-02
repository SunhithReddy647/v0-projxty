import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/lib/data"
import { ProjectDetailPage } from "@/components/ProjectDetailPage"

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

// Generate metadata for each project page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const baseUrl = "https://projxty.com"
  const projectUrl = `${baseUrl}/projects/${project.slug}`

  return {
    title: `${project.title} - Capstone Project | Projxty`,
    description: project.description,
    keywords: [
      project.title,
      project.domain,
      "capstone project",
      "final year project",
      ...project.highlights,
    ],
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: projectUrl,
      images: [
        {
          url: `https://img.youtube.com/vi/${getYouTubeId(project.videoLink)}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          alt: project.title,
        },
      ],
    },
    alternates: {
      canonical: projectUrl,
    },
  }
}

function getYouTubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const project = projects.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailPage project={project} />
}
