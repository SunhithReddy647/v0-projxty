"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-full flex-col items-center justify-center">
          <h2 className="text-center font-sans text-5xl font-light text-foreground md:text-6xl lg:text-7xl">Contact</h2>
        </div>
      </div>
    </section>
  )
}
