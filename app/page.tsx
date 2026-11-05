"use client"

import React from "react"
import { HeroMultidisciplinary } from "@/components/hero-multidisciplinary"
import { ExecutiveOverview } from "@/components/executive-overview"
import { CareerSwitcher } from "@/components/career-switcher"
import { EngineeringOperationsCenter } from "@/components/engineering-operations-center"
import { ProjectsShowcase } from "@/components/projects-showcase"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { CertificationsShowcase } from "@/components/certifications-showcase"
import { SpecializedStudios } from "@/components/specialized-studios"
import { ContactSection } from "@/components/contact-section"
import { TelemetryStatusDock } from "@/components/telemetry-status-dock"

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#070B14] text-[#F8FAFC] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Immersive 3D Hero Section */}
      <HeroMultidisciplinary />

      {/* 2. Executive Overview (Verified Benchmarks) */}
      <ExecutiveOverview />

      {/* 3. Four-Pillar Career Switcher */}
      <CareerSwitcher />

      {/* 4. Unified Engineering Operations Center */}
      <EngineeringOperationsCenter />

      {/* 5. Flagship Systems & Engineering Case Studies */}
      <ProjectsShowcase />

      {/* 6. Professional Career Trajectory & Experience Timeline */}
      <ExperienceTimeline />

      {/* 7. Education, Degrees & Verified Certifications */}
      <CertificationsShowcase />

      {/* 8. Specialized Studios (Salesforce CRM, UI/UX Design, Photography) */}
      <SpecializedStudios />

      {/* 9. Contact & Collaboration */}
      <ContactSection />

      {/* Operational Telemetry Status Dock (Floating Command HUD) */}
      <TelemetryStatusDock />
    </div>
  )
}
