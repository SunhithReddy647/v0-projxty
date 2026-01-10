"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import components to reduce initial bundle size
// Loading state or null can be passed as loading component
const MobileHome = dynamic(() => import("@/components/home/MobileHome"))
const DesktopHome = dynamic(() => import("@/components/home/DesktopHome"))

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Prevent hydration mismatch by rendering nothing or a robust loader until mounted
  // However, for SEO, we usually want to render *something* on the server.
  // The original code rendered Desktop view by default (since isMobile was false).
  // We will replicate that behavior to ensure SEO content is present.

  if (!isMounted) {
    return <DesktopHome />
  }

  if (isMobile) {
    return <MobileHome />
  }

  return <DesktopHome />
}
