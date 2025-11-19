"use client"

interface AboutUsSectionProps {
  isMobile: boolean
  sectionRef?: (el: HTMLDivElement | null) => void
}

export function AboutUsSection({ isMobile, sectionRef }: AboutUsSectionProps) {
  const gradientText = "bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"

  if (isMobile) {
    return (
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
            AICTE APPROVED
          </span>
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

        <div className="space-y-4 text-sm text-foreground/80 leading-relaxed mb-8">
          <p>
            <span className="font-semibold text-foreground">Projxty</span> is a modern web development and design
            company built on one simple belief — great ideas deserve great execution.
          </p>

          <p>
            We combine creativity with clean, powerful code — turning concepts into sleek, high-performing websites and
            brand platforms.
          </p>

          <div className="pt-4 border-t border-foreground/10">
            <p className="text-base font-semibold text-foreground leading-tight">
              We don't just build websites.
              <br />
              <span className={gradientText}>We create digital identities that last.</span>
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-lg bg-foreground/5">
          <h2 className="font-monument text-xl font-bold text-foreground mb-2">
            Founded by
            <br />
            <span className={gradientText}>Sunhith Reddy</span>
          </h2>
          <p className="text-xs text-foreground/60 uppercase tracking-widest">Founder & CEO</p>
        </div>

        <div className="space-y-3">
          {[
            { num: "1", title: "Innovation", desc: "Push boundaries with cutting-edge solutions" },
            { num: "2", title: "Learning", desc: "Comprehensive internship programs" },
            { num: "3", title: "Purpose", desc: "Design meets purpose, innovation never stops" },
          ].map((item) => (
            <div key={item.num} className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                <span className="text-sm font-bold text-background">{item.num}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-0.5 text-sm">{item.title}</h3>
                <p className="text-xs text-foreground/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-screen shrink-0 overflow-hidden pt-16 sm:pt-20"
      style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
    >
      {/* Left Half - Company Story & Mission */}
      <div className="flex w-1/2 flex-col justify-start px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 border-r border-foreground/10 overflow-y-auto">
        <div className="max-w-xl">
          <h1 className="font-monument text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6">
            About Us
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground">
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              MSME REGISTERED
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 px-3 py-1.5 text-xs sm:text-sm font-semibold text-foreground">
              <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              STARTUP INDIA
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 text-foreground/80 leading-relaxed">
            <p className="text-xs sm:text-sm lg:text-base">
              <span className="font-semibold text-foreground">Projxty</span> is a modern web development and design
              company built on one simple belief — great ideas deserve great execution.
            </p>

            <p className="text-xs sm:text-sm lg:text-base">
              We combine creativity with clean, powerful code — turning concepts into sleek, high-performing websites
              and brand platforms.
            </p>

            <div className="pt-3 sm:pt-4 border-t border-foreground/10">
              <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground leading-tight">
                We don't just build websites.
                <br />
                <span className={gradientText}>We create digital identities that last.</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm lg:text-base pt-2">
              Our focus is simple: create websites that are{" "}
              <span className="font-semibold text-foreground">fast, flawless, and future-ready</span>. Every project is
              a partnership — your vision, our expertise, and a shared goal of making something that truly works.
            </p>
          </div>
        </div>
      </div>

      {/* Right Half - Founder & Values */}
      <div className="flex w-1/2 flex-col justify-start px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-xl">
          <div className="mb-8 sm:mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5 border border-foreground/10">
            <h2 className="font-monument text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3">
              Founded by
              <br />
              <span className={gradientText}>Sunhith Reddy</span>
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 uppercase tracking-widest">Founder & CEO</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                num: "1",
                title: "Innovation",
                desc: "We push boundaries and explore new technologies to deliver cutting-edge solutions.",
              },
              {
                num: "2",
                title: "Learning",
                desc: "We invest in the next wave of creators through comprehensive internship programs.",
              },
              {
                num: "3",
                title: "Purpose",
                desc: "Design meets purpose, innovation never stops, and learning never ends.",
              },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                  <span className="text-base sm:text-lg font-bold text-background">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-sans text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
