"use client"

import { useEffect, useRef } from "react"

interface ProjectVideoModalProps {
  isOpen: boolean
  videoLink: string
  title: string
  onClose: () => void
}

export function ProjectVideoModal({ isOpen, videoLink, title, onClose }: ProjectVideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
      return () => {
        document.removeEventListener("keydown", handleEscape)
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtu.be") 
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.includes("youtube.com")
      ? new URLSearchParams(new URL(url).search).get("v")
      : null
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      ref={modalRef}
    >
      <div
        className="w-full max-w-4xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-monument text-2xl font-bold text-foreground text-pretty">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-foreground/10 transition-all"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6 text-foreground/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl shadow-primary/25">
          <div className="relative pb-[56.25%]">
            <iframe
              src={getYouTubeEmbedUrl(videoLink)}
              title={title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-foreground/60">
            Press <kbd className="rounded bg-foreground/10 px-2 py-1">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
