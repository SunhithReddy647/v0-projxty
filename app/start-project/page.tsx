"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'

export default function StartProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    features: [] as string[],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        console.log('[v0] Project inquiry submitted successfully')
        setIsSuccess(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            projectType: "",
            budget: "",
            timeline: "",
            description: "",
            features: [],
          })
        }, 3000)
      } else {
        console.error('[v0] Submission failed:', result.message)
        alert(result.message || 'Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error('[v0] Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Start Your Project - Projxty",
            description: "Get your capstone project, final year project, or custom website developed under ₹40,000",
            url: "https://projxty.com/start-project",
            provider: {
              "@type": "Organization",
              name: "Projxty",
              areaServed: ["Hyderabad", "Bengaluru", "Chennai", "Pune", "Delhi", "India"],
            },
          }),
        }}
      />
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
              {'Start Your '}
              <span className="text-primary">Project</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {'Tell us about your vision. We\'ll transform it into reality with cutting-edge design and development.'}
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-6 lg:p-10 border-border/40 bg-card/50 backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{'Contact Information'}</h2>
                  <p className="text-sm text-muted-foreground">{'Let\'s get to know you better'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{'Full Name *'}</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{'Email Address *'}</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{'Company/Organization'}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{'Phone Number'}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6 pt-6 border-t border-border/40">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{'Project Details'}</h2>
                  <p className="text-sm text-muted-foreground">{'Help us understand your requirements'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">{'Project Type *'}</Label>
                    <Select required value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                      <SelectTrigger id="projectType" className="bg-background border-border">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">{'Website'}</SelectItem>
                        <SelectItem value="webapp">{'Web Application'}</SelectItem>
                        <SelectItem value="ecommerce">{'E-commerce'}</SelectItem>
                        <SelectItem value="mobile">{'Mobile App'}</SelectItem>
                        <SelectItem value="design">{'UI/UX Design'}</SelectItem>
                        <SelectItem value="branding">{'Branding'}</SelectItem>
                        <SelectItem value="other">{'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">{'Budget Range *'}</Label>
                    <Select required value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                      <SelectTrigger id="budget" className="bg-background border-border">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5k-10k">{'$5k - $10k'}</SelectItem>
                        <SelectItem value="10k-25k">{'$10k - $25k'}</SelectItem>
                        <SelectItem value="25k-50k">{'$25k - $50k'}</SelectItem>
                        <SelectItem value="50k-100k">{'$50k - $100k'}</SelectItem>
                        <SelectItem value="100k+">{'$100k+'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">{'Timeline *'}</Label>
                    <Select required value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                      <SelectTrigger id="timeline" className="bg-background border-border">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">{'ASAP (1-2 weeks)'}</SelectItem>
                        <SelectItem value="1month">{'1 Month'}</SelectItem>
                        <SelectItem value="2-3months">{'2-3 Months'}</SelectItem>
                        <SelectItem value="3-6months">{'3-6 Months'}</SelectItem>
                        <SelectItem value="6months+">{'6+ Months'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{'Project Description *'}</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your project goals, target audience, and any specific requirements..."
                    className="bg-background border-border min-h-32 resize-none"
                  />
                </div>
              </div>

              {/* Features & Services */}
              <div className="space-y-6 pt-6 border-t border-border/40">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{'Features & Services'}</h2>
                  <p className="text-sm text-muted-foreground">{'Select all that apply to your project'}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Custom Design",
                    "Responsive Layout",
                    "SEO Optimization",
                    "Content Management",
                    "E-commerce Integration",
                    "Payment Processing",
                    "User Authentication",
                    "API Integration",
                    "Analytics Setup",
                    "Performance Optimization",
                    "Security Features",
                    "Ongoing Support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                        className="border-border"
                      />
                      <label
                        htmlFor={feature}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full h-12 text-base font-semibold relative overflow-hidden"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {'Submitting...'}
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {'Request Submitted!'}
                    </>
                  ) : (
                    'Submit Project Request'
                  )}
                </Button>
                {isSuccess && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    {'Thank you! We\'ll get back to you within 24 hours.'}
                  </p>
                )}
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
