"use client"

import { Suspense } from "react"
import { ProjectsShowcase } from "@/components/projects-showcase"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#070B14]">
      <Suspense fallback={<div className="text-center py-24 text-slate-400 font-mono">Loading Engineering Portfolio...</div>}>
        <ProjectsShowcase />
      </Suspense>
    </div>
  )
}
