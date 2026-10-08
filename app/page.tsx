"use client"

import React from "react"
import { HeroMultidisciplinary } from "@/components/hero-multidisciplinary"
import { AboutMultidisciplinary } from "@/components/about-multidisciplinary"
import { ExpertiseGrid } from "@/components/expertise-grid"
import { TechUniverse } from "@/components/tech-universe"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { DataAnalyticsLab } from "@/components/data-analytics-lab"
import { AiLab } from "@/components/ai-lab"
import { FullstackArchitecture } from "@/components/fullstack-architecture"
import { SalesforceStudio } from "@/components/salesforce-studio"
import { DesignStudio } from "@/components/design-studio"
import { PhotographyGallery } from "@/components/photography-gallery"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { CertificationsShowcase } from "@/components/certifications-showcase"
import { ServicesSection } from "@/components/services-section"
import { PersonalPhilosophy } from "@/components/personal-philosophy"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070B14] text-[#F8FAFC] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Hero Section */}
      <HeroMultidisciplinary />

      {/* 2. Personal Introduction / About Me */}
      <AboutMultidisciplinary />

      {/* 3. Multidisciplinary Expertise (6 Cards) */}
      <ExpertiseGrid />

      {/* 4. Skills / Technology Universe */}
      <TechUniverse />

      {/* 5. Featured Projects Showcase */}
      <ProjectsShowcase />

      {/* 6. Data Analytics Lab */}
      <DataAnalyticsLab />

      {/* 7. Data Science & AI Lab */}
      <AiLab />

      {/* 8. Full-Stack Software Architecture */}
      <FullstackArchitecture />

      {/* 9. Salesforce Enterprise Development Studio */}
      <SalesforceStudio />

      {/* 10. UI/UX Design Studio */}
      <DesignStudio />

      {/* 11. Photography Gallery (#050505 transition) */}
      <PhotographyGallery />

      {/* 12. Trajectory & Experience Timeline */}
      <ExperienceTimeline />

      {/* 13. Certifications Showcase */}
      <CertificationsShowcase />

      {/* 14. Comprehensive Services */}
      <ServicesSection />

      {/* 15. Core Personal Philosophy */}
      <PersonalPhilosophy />

      {/* 16. Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 17. Contact & Collaboration */}
      <ContactSection />
    </div>
  )
}
