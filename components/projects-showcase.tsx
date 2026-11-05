"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ExternalLink,
  Github,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  BookOpen,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  projectsData,
  careerPillars,
  CareerPillar,
  ProjectItem,
} from "@/lib/projects-data"
import { CaseStudyModal } from "@/components/case-study-modal"

export function ProjectsShowcase() {
  const [activePillar, setActivePillar] = useState<CareerPillar>("All Projects")
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        const found = projectsData.find((p) => p.slug === hash || p.id === hash)
        if (found) {
          setSelectedProject(found)
        }
      }
    }
  }, [])

  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedProject(project)
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${project.slug}`)
    }
  }

  const handleCloseCaseStudy = () => {
    setSelectedProject(null)
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname)
    }
  }

  const filteredProjects =
    activePillar === "All Projects"
      ? projectsData
      : projectsData.filter((p) => p.pillars.includes(activePillar))

  return (
    <section id="projects" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider backdrop-blur-md">
            <Layers className="h-3.5 w-3.5" /> Engineering Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#E0F2FE]">
            Flagship Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Engineering Case Studies</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Production-grade architectures, real-time analytics pipelines, and calibrated machine learning models. Built with strict data integrity, architectural rigor, and verifiable impact.
          </p>
        </div>

        {/* 5 Career-Focused Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 max-w-4xl mx-auto">
          {careerPillars.map((pillar) => {
            const isActive = activePillar === pillar
            return (
              <button
                key={pillar}
                onClick={() => setActivePillar(pillar)}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                    : "bg-[#111B30]/75 backdrop-blur-md text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE] hover:border-white/20"
                }`}
              >
                {pillar === "All Projects" && <Filter className="w-3 h-3" />}
                {pillar}
              </button>
            )
          })}
        </div>

        {/* Editorial Projects Grid */}
        <motion.div layout className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`rounded-3xl p-6 sm:p-8 bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-2xl relative overflow-hidden ${
                  project.flagship
                    ? "lg:col-span-2 bg-gradient-to-br from-[#111B30]/90 via-[#0D1527]/85 to-[#16223B]/80"
                    : ""
                }`}
              >
                {/* Subtle Backlight Glow */}
                <div
                  className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${project.gradient} rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Bar: Primary Pillar, Flags, and Metric */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/30 text-xs font-mono">
                        {project.primaryPillar}
                      </Badge>

                      {project.pillars.map(
                        (p) =>
                          p !== project.primaryPillar && (
                            <Badge
                              key={p}
                              variant="outline"
                              className="border-white/10 text-slate-400 text-xs font-mono"
                            >
                              {p}
                            </Badge>
                          )
                      )}

                      {project.flagship && (
                        <Badge className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-xs">
                          <Sparkles className="w-3 h-3 mr-1" /> Flagship
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      <TrendingUp className="h-3 w-3" />
                      {project.verifiedMetric}
                    </div>
                  </div>

                  {/* Layout for Flagship Projects: Side-by-Side with Topology Preview */}
                  <div className={project.flagship ? "grid md:grid-cols-12 gap-6 items-center" : "space-y-4"}>
                    <div className={project.flagship ? "md:col-span-7 space-y-4" : "space-y-3"}>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-400 font-mono">
                        {project.tagline}
                      </p>
                      <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base font-light">
                        {project.solutionSummary}
                      </p>

                      {/* Challenge / Engineered Solution Cards */}
                      <div className="grid sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                        <div>
                          <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                            The Challenge
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                            {project.businessProblem}
                          </p>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1">
                            Impact Highlight
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                            {project.impactHighlight}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Architecture Topology Preview */}
                    <div className={project.flagship ? "md:col-span-5" : "mt-2"}>
                      <div
                        onClick={() => handleOpenCaseStudy(project)}
                        className="cursor-pointer group/diag rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 bg-[#070B14]/90 p-2 shadow-xl transition-all"
                      >
                        <div className="relative">
                          <img
                            src={project.previewImage}
                            alt={`${project.title} Architecture Preview`}
                            className="w-full h-auto rounded-xl object-contain opacity-90 group-hover/diag:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-[#070B14]/40 opacity-0 group-hover/diag:opacity-100 backdrop-blur-xs transition-opacity rounded-xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg">
                              <BookOpen className="w-3.5 h-3.5" /> Inspect Full Architecture
                            </span>
                          </div>
                        </div>
                        <div className="text-[10px] text-center font-mono text-slate-400 mt-2">
                          [REPRESENTATIVE ARCHITECTURE • TAP TO EXPLORE]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#070B14]/80 text-[#E0F2FE]/90 border border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between flex-wrap gap-4 relative z-10">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <Button
                      onClick={() => handleOpenCaseStudy(project)}
                      size="sm"
                      className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-cyan-500/20"
                    >
                      <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                      Explore Case Study
                    </Button>

                    {project.liveDemo && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-white/10 bg-[#070B14]/80 text-[#E0F2FE] hover:bg-[#111B30] hover:border-white/20 rounded-xl text-xs backdrop-blur-sm"
                      >
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Live Project
                        </a>
                      </Button>
                    )}

                    {project.github && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#070B14]/60 text-xs"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-3.5 w-3.5" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>

                  <span className="text-xs font-medium text-[#94A3B8]">
                    Verification: <strong className="text-emerald-300 font-semibold">{project.verifiedMetric}</strong>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={handleCloseCaseStudy}
      />
    </section>
  )
}
