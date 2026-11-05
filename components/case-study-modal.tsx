"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { ProjectItem } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CaseStudyModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "engineering" | "results">("architecture")

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (project) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [project, onClose])

  if (!project) return null

  const { caseStudy } = project

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070B14]/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Shell */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl bg-[#070B14]/95 backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="p-6 sm:p-8 border-b border-white/10 bg-[#111B30]/60 relative">
            {/* Top Right Action & Close */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-cyan-500/10 border-cyan-400/30 text-cyan-300 text-xs font-mono">
                  {project.primaryPillar}
                </Badge>
                {project.pillars.map(
                  (pillar) =>
                    pillar !== project.primaryPillar && (
                      <Badge
                        key={pillar}
                        variant="outline"
                        className="border-white/10 text-slate-400 text-xs font-mono"
                      >
                        {pillar}
                      </Badge>
                    )
                )}
                {project.flagship && (
                  <Badge className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-bold text-xs">
                    <Sparkles className="w-3 h-3 mr-1" /> Flagship Case Study
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                {project.liveDemo && (
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 hidden sm:inline-flex"
                  >
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-white/10 bg-[#070B14]/80 text-[#E0F2FE] hover:bg-[#111B30] text-xs rounded-xl hidden sm:inline-flex"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Code
                    </a>
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-[#111B30] hover:bg-[#15223E] border border-white/10 text-slate-400 hover:text-[#E0F2FE] transition-colors"
                  aria-label="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title & Tagline */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed max-w-4xl">
              {project.tagline}
            </p>

            {/* Internal Tab Navigation */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto">
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "architecture"
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Architecture & System Flow
              </button>

              <button
                onClick={() => setActiveTab("engineering")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "engineering"
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE]"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                Engineering Deep Dive
              </button>

              <button
                onClick={() => setActiveTab("results")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "results"
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                    : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE]"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Verified Impact & Evidence
              </button>
            </div>
          </div>

          {/* Modal Body: Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {activeTab === "architecture" && (
              <div className="space-y-8">
                {/* Executive Overview & Problem */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 space-y-2">
                    <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> Project Overview
                    </div>
                    <p className="text-[#E0F2FE]/90 text-sm leading-relaxed">
                      {caseStudy.overview}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 space-y-2">
                    <div className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> The Core Problem
                    </div>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {caseStudy.problemStatement}
                    </p>
                  </div>
                </div>

                {/* System Architecture Diagram Preview */}
                <div className="rounded-2xl border border-white/10 bg-[#070B14]/80 overflow-hidden shadow-2xl">
                  <div className="px-5 py-3 border-b border-white/10 bg-[#111B30]/60 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#E0F2FE] flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      System Architecture Topology
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Representative Engineering Diagram • Not Screenshot
                    </span>
                  </div>
                  <div className="p-2 sm:p-4 bg-[#070B14]">
                    <img
                      src={caseStudy.systemArchitecture.diagramPath}
                      alt={`${project.title} Architecture Diagram`}
                      className="w-full h-auto rounded-xl border border-white/5"
                    />
                  </div>
                </div>

                {/* Step-by-Step Architectural Pipeline */}
                <div>
                  <h4 className="text-base font-bold text-[#E0F2FE] mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    Multi-Tier System Execution Flow
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {caseStudy.systemArchitecture.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#111B30]/60 border border-white/10 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase mb-1">
                            Phase {idx + 1}: {step.phase}
                          </div>
                          <div className="text-sm font-bold text-[#E0F2FE] mb-1">
                            {step.component}
                          </div>
                          <div className="text-xs font-mono text-slate-400 mb-2">
                            {step.technology}
                          </div>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed pt-2 border-t border-white/10">
                          {step.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "engineering" && (
              <div className="space-y-8">
                {/* Implementation Highlights */}
                <div className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 space-y-4">
                  <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {caseStudy.implementationDetails.title}
                  </div>
                  <p className="text-sm text-[#E0F2FE]/90 leading-relaxed font-medium">
                    {caseStudy.implementationDetails.highlight}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    {caseStudy.implementationDetails.keyPractices.map((practice, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Decisions Table */}
                <div>
                  <h4 className="text-base font-bold text-[#E0F2FE] mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    Key Architecture & Technology Decisions
                  </h4>
                  <div className="space-y-4">
                    {caseStudy.technologyDecisions.map((decision, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[#111B30]/60 border border-white/10 grid md:grid-cols-3 gap-4"
                      >
                        <div className="md:col-span-1">
                          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                            Decision
                          </span>
                          <span className="text-sm font-bold text-[#E0F2FE]">
                            {decision.choice}
                          </span>
                        </div>
                        <div className="md:col-span-1">
                          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                            Rationale
                          </span>
                          <span className="text-xs text-[#94A3B8] leading-relaxed">
                            {decision.rationale}
                          </span>
                        </div>
                        <div className="md:col-span-1">
                          <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block mb-1">
                            Tradeoff Considered
                          </span>
                          <span className="text-xs text-[#94A3B8] leading-relaxed">
                            {decision.tradeoffConsidered}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Engineered Solutions */}
                <div>
                  <h4 className="text-base font-bold text-[#E0F2FE] mb-4 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    Technical Challenges & Engineered Solutions
                  </h4>
                  <div className="space-y-4">
                    {caseStudy.challengesAndSolutions.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[#070B14]/80 border border-white/10 space-y-3"
                      >
                        <div className="text-xs font-bold text-rose-300">
                          <strong className="text-rose-400 uppercase font-mono mr-2">Challenge:</strong>
                          {item.challenge}
                        </div>
                        <div className="text-xs text-cyan-200">
                          <strong className="text-cyan-400 uppercase font-mono mr-2">Engineered Fix:</strong>
                          {item.engineeredSolution}
                        </div>
                        <div className="text-xs text-emerald-300 pt-2 border-t border-white/10 flex items-center gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                          <span><strong>Outcome:</strong> {item.outcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-8">
                {/* Verified Results Cards */}
                <div>
                  <h4 className="text-base font-bold text-[#E0F2FE] mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Verified Outcomes & Engineering Context
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {caseStudy.verifiedResults.map((result, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-lg"
                      >
                        <div>
                          <Badge className="bg-emerald-500/10 border-emerald-400/30 text-emerald-300 text-[10px] font-mono mb-3">
                            {result.evidenceType}
                          </Badge>
                          <div className="text-xl font-extrabold text-[#E0F2FE] mb-2">
                            {result.metric}
                          </div>
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed pt-3 border-t border-white/10">
                          {result.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal Scope vs Team Scope / Credibility Statement */}
                <div className="p-6 rounded-2xl bg-[#070B14]/90 border border-white/10 space-y-2">
                  <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Data Integrity & Individual Contribution Statement
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    All metrics and architectures documented here reflect direct individual engineering contributions—including SQL data modeling, schema authoring, API contracts, machine learning pipeline orchestration, and React frontend engineering. Production data is grounded in actual operational artifacts and client deployments.
                  </p>
                </div>

                {/* External Verification Links */}
                <div className="p-6 rounded-2xl bg-[#111B30]/60 border border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-[#E0F2FE]">Explore Project Assets</h5>
                    <p className="text-xs text-[#94A3B8]">Review the live interface or inspect the source repository.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.liveDemo && (
                      <Button
                        asChild
                        className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20"
                      >
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          Launch Live Application
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/10 bg-[#070B14]/80 text-[#E0F2FE] hover:bg-[#111B30] text-xs rounded-xl"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3.5 h-3.5 mr-1.5" />
                          GitHub Repository
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
