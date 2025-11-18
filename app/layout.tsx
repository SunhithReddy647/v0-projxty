import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from 'next/font/google'
import "./globals.css"

const monumentExtended = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-monument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Projxty - Web Development, Design & Digital Solutions | AICTE Approved",
  description:
    "Transform your ideas into reality with Projxty. Award-winning web design, development, branding, e-commerce, and digital marketing solutions. AICTE-approved internships available.",
  keywords: [
    "web development",
    "web design",
    "UI/UX design",
    "e-commerce solutions",
    "digital marketing",
    "branding",
    "SEO",
    "web development company",
    "AICTE approved",
    "MSME registered",
    "Startup India",
  ],

  metadataBase: new URL("https://projxty.com"),
  canonical: "https://projxty.com",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://projxty.com",
    title: "Projxty - Web Development, Design & Digital Solutions",
    description:
      "Transform your ideas into reality with cutting-edge web development, design, and digital marketing. AICTE-approved internship programs available.",
    siteName: "Projxty",
    images: [
      {
        url: "https://projxty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projxty - Web Development & Design",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Projxty - Web Development, Design & Digital Solutions",
    description:
      "Transform your ideas into reality. Award-winning web development, design, branding & digital marketing.",
    images: ["https://projxty.com/og-image.png"],
    creator: "@projxty",
    site: "@projxty",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },

  authors: [{ name: "Sunhith Reddy", url: "https://projxty.com" }],
  creator: "Sunhith Reddy",
  publisher: "Projxty",
  category: "Technology",
  classification: "Business",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://projxty.com/#website",
        url: "https://projxty.com",
        name: "Projxty",
        description: "Web Development, Design & Digital Solutions Company",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://projxty.com/?s={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://projxty.com/#organization",
        name: "Projxty",
        url: "https://projxty.com",
        logo: "https://projxty.com/images/design-mode/cropped_circle_image.png",
        description: "Modern web development and design company creating digital experiences",
        founder: {
          "@type": "Person",
          name: "Sunhith Reddy",
          url: "https://projxty.com",
        },
        foundingDate: "2024",
        areaServed: "Worldwide",
        serviceType: [
          "Web Development",
          "Web Design",
          "UI/UX Design",
          "E-commerce Solutions",
          "Digital Marketing",
          "Brand Identity",
          "SEO Optimization",
        ],
        sameAs: [
          "https://www.linkedin.com/company/projxty",
          "https://www.instagram.com/projxty",
          "https://www.facebook.com/projxty",
        ],
        contact: {
          "@type": "ContactPoint",
          telephone: "+91-XXXXXXXXXX",
          contactType: "Customer Service",
          email: "projxty@gmail.com",
        },
        knowsAbout: ["AICTE Approved", "MSME Registered", "Startup India Recognized"],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://projxty.com/#service",
        name: "Web Development & Design Services",
        provider: {
          "@type": "Organization",
          name: "Projxty",
        },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Web Design & Development",
              description: "Fast, functional, visually dynamic websites built for scalability",
            },
            {
              "@type": "Offer",
              name: "UI/UX Design",
              description: "Smooth, intuitive user experiences that feel effortless",
            },
            {
              "@type": "Offer",
              name: "E-Commerce Solutions",
              description: "Secure, high-performing e-commerce platforms",
            },
            {
              "@type": "Offer",
              name: "Digital Marketing",
              description: "SEO, social media, and performance tracking",
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://projxty.com/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://projxty.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://projxty.com#about",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Services",
            item: "https://projxty.com#services",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Pricing",
            item: "https://projxty.com#pricing",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Careers",
            item: "https://projxty.com#careers",
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Contact",
            item: "https://projxty.com#contact",
          },
        ],
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${monumentExtended.variable} font-sans antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
