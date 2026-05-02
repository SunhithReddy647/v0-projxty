"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ProjectVideoModalProps {
  isOpen: boolean
  videoLink: string
  title: string
  phoneNumber?: string
  onClose: () => void
}

export function ProjectVideoModal({ isOpen, videoLink, title, phoneNumber = "6303459155", onClose }: ProjectVideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => {
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtu.be") 
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.includes("youtube.com")
      ? new URLSearchParams(new URL(url).search).get("v")
      : null
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
  }

  const handleContactDeveloper = () => {
    const message = `Hi, I'm interested in enquiring about the project: ${title}. Can you provide more details?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const modalContent = (
    <div
      className="fixed bottom-4 right-4 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-black border border-primary/20 shadow-2xl shadow-primary/30 overflow-hidden"
      style={{ zIndex: 9999 }}
      ref={modalRef}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 p-4 border-b border-primary/10">
        <h3 className="font-bold text-sm text-foreground line-clamp-1">
          {title}
        </h3>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-foreground/10 transition-all flex-shrink-0"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5 text-foreground/70"
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
      <div className="relative w-full bg-black aspect-video">
        <iframe
          src={getYouTubeEmbedUrl(videoLink)}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Contact Button */}
      <div className="p-4 border-t border-primary/10">
        <button
          onClick={handleContactDeveloper}
          className="w-full px-4 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-sm font-bold text-background hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.707 12.293a.999.999 0 0 0-1.414 0L13 15.586V6a1 1 0 1 0-2 0v9.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414z"/>
          </svg>
          Contact Developer
        </button>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
