import type React from "react"
import type { Metadata } from "next"
import { Josefin_Sans } from 'next/font/google'
import "./globals.css"

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-josefin",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Projxty - Web Development Company in India | Capstone Projects, Final Year Projects & AICTE Internships",
  description:
    "Top-rated web development company in India offering custom websites, UI/UX design, e-commerce, capstone projects, final year projects & AICTE-approved internships in Hyderabad, Bengaluru, Chennai, Pune, Delhi. Startup India recognized & MSME registered. Budget-friendly solutions under ₹40,000.",
  keywords: [
    // Geo-targeted primary keywords
    "web development company in India",
    "web development company Hyderabad",
    "web development company Bengaluru",
    "web development company Chennai",
    "web development company Pune",
    "web development company Delhi",
    "best web development company India",
    "top web development agency India",
    
    // Core services with geo-targeting
    "capstone projects India",
    "capstone projects Hyderabad",
    "final year projects India",
    "final year projects Hyderabad",
    "final year projects Bengaluru",
    "college projects assistance",
    "academic projects India",
    "student projects help",
    "engineering projects India",
    "CSE projects Hyderabad",
    "IT projects Bengaluru",
    "ECE projects Chennai",
    
    // Internship keywords with location
    "AICTE approved internship India",
    "AICTE internship Hyderabad",
    "AICTE internship Bengaluru",
    "web development internship Hyderabad",
    "web development internship Bengaluru",
    "web development internship Chennai",
    "UI/UX internship India",
    "digital marketing internship",
    "paid internship for students",
    "remote internship India",
    "virtual internship opportunities",
    "internship with certificate",
    "summer internship 2025",
    "winter internship 2025",
    
    // Near me optimization
    "web development near me",
    "website design near me",
    "final year project help near me",
    "internship near me",
    
    // Technology stack
    "React development India",
    "Next.js development India",
    "Node.js development Hyderabad",
    "MERN stack development",
    "full stack development Hyderabad",
    "frontend development",
    "backend development",
    "JavaScript development",
    "TypeScript development",
    
    // Service offerings
    "web design services",
    "UI/UX design Hyderabad",
    "UI/UX design Bengaluru",
    "e-commerce development",
    "online store development",
    "digital marketing services",
    "SEO services India",
    "branding services",
    "logo design India",
    "graphic design",
    
    // Budget-focused keywords
    "affordable web development India",
    "cheap website development",
    "budget website under 40000",
    "website development under 40000 rupees",
    "low cost web development",
    "startup web development",
    "small business website",
    
    // Academic project types
    "BE projects",
    "BTech projects",
    "MCA projects",
    "BCA projects",
    "MSc projects",
    "mini projects",
    "major projects",
    "project report writing",
    "project documentation",
    "project presentation",
    
    // AI & Emerging Technologies
    "AI projects India",
    "machine learning projects",
    "data analytics projects",
    "IoT projects",
    "blockchain development",
    "cybersecurity projects",
    "cloud computing projects",
    "DevOps training",
    
    // Long-tail keywords
    "where to get final year project help",
    "best company for capstone projects in India",
    "AICTE internship with stipend",
    "paid internship for engineering students",
    "web development training with certificate",
    "how to build capstone project",
    "final year project ideas for CSE",
    "best internship program in Hyderabad",
    
    // LSI keywords
    "digital transformation",
    "web solutions",
    "software development",
    "app development",
    "mobile responsive design",
    "progressive web apps",
    "API development",
    "database design",
    "website maintenance",
    "website optimization",
    "performance optimization",
    "SEO optimization",
    "content management",
    "WordPress development",
    "Shopify development",
    "custom software",
    
    // Certification & Trust
    "MSME registered company",
    "Startup India recognized",
    "government approved internship",
    "AICTE recognized company",
    "certified training program",
    "industry-ready skills",
    "professional certification",
    
    // Competitive keywords
    "better than freelancer",
    "professional than Upwork",
    "reliable project development",
    "guaranteed project delivery",
    "quality web development",
    "experienced developers India",
  ],

  metadataBase: new URL("https://projxty.com"),
  alternates: {
    canonical: "https://projxty.com",
  },
  
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
    title: "Projxty - #1 Web Development Company in India | Projects & AICTE Internships in Hyderabad",
    description:
      "Top web development company in India. Custom websites, capstone projects, final year projects & AICTE-approved internships in Hyderabad, Bengaluru, Chennai. Startup India recognized & MSME registered. Budget solutions under ₹40,000.",
    siteName: "Projxty",
    images: [
      {
        url: "https://projxty.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Projxty - Web Development, Capstone Projects, Final Year Projects & AICTE Internships in India",
        type: "image/png",
      },
      {
        url: "https://projxty.com/images/design-mode/cropped_circle_image.png",
        width: 512,
        height: 512,
        alt: "Projxty Logo",
        type: "image/png",
      },
    ],
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Projxty - Web Development India | AICTE Internships Hyderabad",
    description:
      "Top web dev company in Hyderabad. Capstone projects, final year projects & AICTE internships under ₹40,000. Startup India & MSME registered.",
    images: ["https://projxty.com/og-image.png"],
    creator: "@projxty",
    site: "@projxty",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: "#6366f1",
  },

  authors: [{ name: "Sunhith Reddy", url: "https://projxty.com" }],
  creator: "Sunhith Reddy",
  publisher: "Projxty",
  category: "Technology",
  classification: "Business",
  generator: 'Next.js',
  
  verification: {
    google: "google-site-verification-code-here",
    yandex: "yandex-verification-code-here",
    other: {
      "facebook-domain-verification": "facebook-verification-code-here",
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/design-mode/cropped_circle_image.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },

  manifest: '/manifest.json',
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
        description: "Web Development, Capstone Projects, Final Year Projects & AICTE Internships in India",
        inLanguage: "en-IN",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://projxty.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://projxty.com/#organization",
        name: "Projxty",
        legalName: "Projxty Private Limited",
        url: "https://projxty.com",
        logo: {
          "@type": "ImageObject",
          url: "https://projxty.com/images/design-mode/cropped_circle_image.png",
          width: 512,
          height: 512,
        },
        image: "https://projxty.com/og-image.png",
        description: "Leading web development and design company in India offering custom web solutions, capstone projects, final year projects, and AICTE-approved internship programs for students",
        founder: {
          "@type": "Person",
          name: "Sunhith Reddy",
          url: "https://projxty.com",
          jobTitle: "Founder & CEO",
        },
        foundingDate: "2024",
        foundingLocation: {
          "@type": "City",
          name: "Hyderabad",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "City",
            name: "Hyderabad",
          },
          {
            "@type": "City",
            name: "Bengaluru",
          },
          {
            "@type": "City",
            name: "Chennai",
          },
          {
            "@type": "City",
            name: "Pune",
          },
          {
            "@type": "City",
            name: "Delhi",
          },
        ],
        serviceArea: [
          {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: "17.3850",
              longitude: "78.4867",
              name: "Hyderabad, Telangana, India",
            },
            geoRadius: "5000000",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-XXXXXXXXXX",
            contactType: "Customer Service",
            email: "projxty@gmail.com",
            availableLanguage: ["English", "Hindi", "Telugu"],
            areaServed: "IN",
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "09:00",
              closes: "18:00",
            },
          },
          {
            "@type": "ContactPoint",
            contactType: "Sales",
            email: "projxty@gmail.com",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "Technical Support",
            email: "projxty@gmail.com",
            availableLanguage: ["English"],
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/projxty",
          "https://www.instagram.com/projxty",
          "https://www.facebook.com/projxty",
          "https://twitter.com/projxty",
          "https://github.com/projxty",
        ],
        knowsAbout: [
          "Web Development",
          "Web Design",
          "UI/UX Design",
          "React Development",
          "Next.js Development",
          "Full Stack Development",
          "E-commerce Solutions",
          "Digital Marketing",
          "SEO Optimization",
          "Capstone Projects",
          "Final Year Projects",
          "Academic Projects",
          "AICTE Approved Internships",
          "Student Training Programs",
          "Professional Certifications",
          "AI & Machine Learning",
          "Data Analytics",
          "IoT Development",
          "Blockchain",
          "Cybersecurity",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Registration",
            name: "MSME Registration",
            recognizedBy: {
              "@type": "Organization",
              name: "Ministry of Micro, Small and Medium Enterprises, Government of India",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Recognition",
            name: "Startup India Recognition",
            recognizedBy: {
              "@type": "Organization",
              name: "Department for Promotion of Industry and Internal Trade, Government of India",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "Approval",
            name: "AICTE Approval for Internship Programs",
            recognizedBy: {
              "@type": "Organization",
              name: "All India Council for Technical Education",
            },
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://projxty.com/#localbusiness",
        name: "Projxty",
        image: "https://projxty.com/og-image.png",
        url: "https://projxty.com",
        telephone: "+91-XXXXXXXXXX",
        email: "projxty@gmail.com",
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Hyderabad Tech Hub",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500001",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 17.3850,
          longitude: 78.4867,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          "https://www.linkedin.com/company/projxty",
          "https://www.instagram.com/projxty",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://projxty.com/#service",
        name: "Web Development, Design & Project Services",
        provider: {
          "@id": "https://projxty.com/#organization",
        },
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "City",
            name: "Hyderabad",
          },
          {
            "@type": "City",
            name: "Bengaluru",
          },
          {
            "@type": "City",
            name: "Chennai",
          },
          {
            "@type": "City",
            name: "Pune",
          },
          {
            "@type": "City",
            name: "Delhi",
          },
        ],
        priceRange: "₹₹",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services & Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Web Development",
                description: "Fast, scalable, visually dynamic websites using React, Next.js, Node.js, and modern frameworks",
                serviceType: "Web Development",
              },
              price: "40000",
              priceCurrency: "INR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "40000",
                priceCurrency: "INR",
                referenceQuantity: {
                  "@type": "QuantitativeValue",
                  value: "1",
                  unitText: "Project",
                },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UI/UX Design Services",
                description: "Smooth, intuitive user experiences with modern design principles",
                serviceType: "Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-Commerce Development",
                description: "Secure, high-performing online stores with payment integration",
                serviceType: "E-Commerce",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Digital Marketing & SEO",
                description: "SEO optimization, social media marketing, and content strategy",
                serviceType: "Marketing",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Capstone Project Development",
                description: "Professional capstone projects for engineering and computer science students",
                serviceType: "Academic",
              },
              eligibleCustomerType: "Student",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Final Year Project Assistance",
                description: "Complete development, mentorship, and documentation for final year projects",
                serviceType: "Academic",
              },
              eligibleCustomerType: "Student",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AICTE Approved Internships",
                description: "Virtual internship programs in web development, design, and marketing with certification",
                serviceType: "Training",
              },
              eligibleCustomerType: "Student",
            },
          ],
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://projxty.com/#education",
        name: "Projxty Internship Program",
        description: "AICTE-approved virtual internship programs for students in web development, UI/UX design, and digital marketing",
        provider: {
          "@id": "https://projxty.com/#organization",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "AICTE Approved Internship Certificate",
          credentialCategory: "Certificate",
          recognizedBy: {
            "@type": "Organization",
            name: "AICTE - All India Council for Technical Education",
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Internship Programs",
          itemListElement: [
            {
              "@type": "Course",
              name: "Web Development Internship",
              description: "Hands-on training in React, Next.js, Node.js, and full-stack development",
              provider: {
                "@id": "https://projxty.com/#organization",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                duration: "P1M",
              },
            },
            {
              "@type": "Course",
              name: "UI/UX Design Internship",
              description: "Learn modern design principles, Figma, user research, and prototyping",
              provider: {
                "@id": "https://projxty.com/#organization",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                duration: "P1M",
              },
            },
            {
              "@type": "Course",
              name: "Digital Marketing Internship",
              description: "SEO, social media marketing, content strategy, and analytics",
              provider: {
                "@id": "https://projxty.com/#organization",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Online",
                duration: "P1M",
              },
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
            name: "Services",
            item: "https://projxty.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Pricing",
            item: "https://projxty.com/our-pricing",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "About Us",
            item: "https://projxty.com/about-us",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Careers & Internships",
            item: "https://projxty.com/work-with",
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Contact",
            item: "https://projxty.com/contact-us",
          },
          
          {
            "@type": "ListItem",
            position: 7,
            name: "Start Project",
            item: "https://projxty.com/start-project",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://projxty.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the cost of web development at Projxty?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our web development services start under ₹40,000, making professional websites affordable for students, startups, and small businesses across India.",
            },
          },
          {
            "@type": "Question",
            name: "Are Projxty internships AICTE approved?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all our internship programs are AICTE approved, providing students with recognized certificates upon completion.",
            },
          },
          {
            "@type": "Question",
            name: "Do you help with capstone and final year projects?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We provide complete capstone project and final year project development, mentorship, documentation, and presentation support for engineering and computer science students.",
            },
          },
          {
            "@type": "Question",
            name: "Which cities does Projxty serve in India?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We serve clients across India, with primary focus on Hyderabad, Bengaluru, Chennai, Pune, and Delhi. Our services are available nationwide through remote collaboration.",
            },
          },
          {
            "@type": "Question",
            name: "What technologies does Projxty work with?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We specialize in modern web technologies including React, Next.js, Node.js, TypeScript, JavaScript, MERN stack, UI/UX design tools, and various CMS platforms like WordPress and Shopify.",
            },
          },
        ],
      },
    ],
  }

  return (
    <html lang="en-IN">
      <head>
        <link rel="canonical" href="https://projxty.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        />
      </head>
      <body className={`${josefinSans.variable} font-sans antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
