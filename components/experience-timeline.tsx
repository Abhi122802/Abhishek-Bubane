"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Layers,
  Code2,
  Database,
  BrainCircuit,
  Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type ExperiencePillar = "All Positions" | "Data Analytics" | "Data Engineering" | "Full-Stack Development"

export interface ProfessionalRole {
  id: string
  role: string
  organization: string
  location: string
  period: string
  duration: string
  pillars: ("Data Analyst" | "Data Engineer" | "Full-Stack Developer" | "AI Engineer")[]
  primaryPillar: "Data Analyst" | "Data Engineer" | "Full-Stack Developer" | "AI Engineer"
  responsibilities: string
  keyProjects?: {
    name: string
    highlight: string
    details: string[]
  }[]
  achievements: string[]
  personalContribution: string
  technologies: string[]
  accentColor: string
}

const professionalExperiences: ProfessionalRole[] = [
  {
    id: "exp-djrb-analyst",
    role: "Data Analyst",
    organization: "DJRB SERVICES",
    location: "Pune, India",
    period: "Dec 2025 – Present",
    duration: "Active Role",
    pillars: ["Data Analyst", "Data Engineer"],
    primaryPillar: "Data Analyst",
    responsibilities:
      "Leading relational data operations, optimized SQL data pipeline modeling, and executive intelligence dashboards. Built automated loan file auditing logic and React inspection console for mortgage compliance verification.",
    keyProjects: [
      {
        name: "STR Analytics Platform",
        highlight: "Operational BI & Data Normalization",
        details: [
          "Handled end-to-end data lifecycle: raw dataset collection, automated cleaning, relational modeling in PostgreSQL, and weekly executive trend reporting.",
          "Authored high-efficiency SQL scripts for multi-table joins, aggregations, and business metrics calculation.",
          "Established automated data validation rules to detect missing attributes, format anomalies, and constraint violations across operational records."
        ]
      },
      {
        name: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
        highlight: "FinTech Compliance Auditing Logic",
        details: [
          "Engineered automated compliance rule-checking logic using Python, Django, SQL, and React to verify mortgage appraisal packages.",
          "Created validation logic to catch missing attributes, valuation mismatches, and underwriting compliance discrepancies in seconds.",
          "Integrated backend REST auditing APIs to a reactive React screen for rapid underwriter inspection (qa-pramaan.vercel.app)."
        ]
      }
    ],
    achievements: [
      "Eliminated manual reporting errors for operational leadership through automated SQL validation rules.",
      "Delivered real-time mortgage appraisal exception detection, cutting review turnaround times."
    ],
    personalContribution:
      "Directly authored all core SQL transformation pipelines, validation rules, Django auditing rule classes, and the responsive React audit dashboard.",
    technologies: ["SQL", "PostgreSQL", "Python", "Django", "React", "Data Modeling", "ETL Pipelines", "Executive Dashboards", "Compliance Logic"],
    accentColor: "border-cyan-400/40 text-cyan-300"
  },
  {
    id: "exp-elevate-freelance",
    role: "Freelance Web & Application Developer",
    organization: "Elevate Technologies",
    location: "Pune, India",
    period: "2025 – Present",
    duration: "Production Contract",
    pillars: ["Full-Stack Developer"],
    primaryPillar: "Full-Stack Developer",
    responsibilities:
      "Architected and deployed the core commercial E-Commerce & SaaS Licensing Platform for Elevate Technologies (elevatetechnologies.in) with automated hardware node-locked licensing keys, Razorpay checkout, and compliance logic.",
    achievements: [
      "Built automated hardware node-locked licensing key generation, binding keys to encrypted machine signatures.",
      "Integrated Razorpay payment webhooks with automated statutory CGST/SGST tax split ledger calculations.",
      "Engineered an interactive software ROI calculation tool in React and secured backend routes using JWT auth, CORS whitelisting, and system audit logging (AuditLog)."
    ],
    personalContribution:
      "Designed and coded the complete full-stack web application from React 19 storefront and Redux Toolkit state architecture to Node.js/Express backend APIs and MongoDB database schemas.",
    technologies: ["React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Razorpay API", "AuditLog"],
    accentColor: "border-indigo-400/40 text-indigo-300"
  },
  {
    id: "exp-djrb-intern",
    role: "Data Analyst Intern",
    organization: "DJRB SERVICES",
    location: "Pune, India",
    period: "Jun 2025 – Nov 2025",
    duration: "6 Months",
    pillars: ["Data Analyst", "Data Engineer"],
    primaryPillar: "Data Analyst",
    responsibilities:
      "Prepared, normalized, and transformed enterprise operational data foundations before importing records into PostgreSQL databases.",
    achievements: [
      "Cleaned, normalized, and validated raw data before importing it into production PostgreSQL schemas.",
      "Wrote complex PostgreSQL analytical queries to build reliable datasets for weekly and monthly business analytics reports."
    ],
    personalContribution:
      "Authored SQL extraction queries and data cleaning scripts that converted unstructured spreadsheet records into standardized relational database tables.",
    technologies: ["PostgreSQL", "SQL Queries", "Data Cleaning", "Data Normalization", "Business Analytics", "Report Generation"],
    accentColor: "border-teal-400/40 text-teal-300"
  },
  {
    id: "exp-mass-it-web",
    role: "Web Developer",
    organization: "MASS IT",
    location: "India",
    period: "Jan 2025 – Apr 2025",
    duration: "4 Months",
    pillars: ["Full-Stack Developer"],
    primaryPillar: "Full-Stack Developer",
    responsibilities:
      "Engineered web application backend service connections, integrated database models, implemented input validation logic, and resolved production service defects.",
    achievements: [
      "Assisted with application database connection pools, input validation sanitization, and backend service fixes.",
      "Collaborated with senior engineers to diagnose and resolve API latency bottlenecks."
    ],
    personalContribution:
      "Implemented server-side validation middleware and contributed database integration routines across multi-user web modules.",
    technologies: ["Web Development", "Node.js", "REST APIs", "Database Integration", "Input Validation", "Debugging"],
    accentColor: "border-purple-400/40 text-purple-300"
  },
  {
    id: "exp-sathe-iot",
    role: "Sensor Data & Telemetry Systems Engineer",
    organization: "Sathe Engineering",
    location: "Solapur, India",
    period: "Jan 2024 – Mar 2024",
    duration: "3 Months",
    pillars: ["Full-Stack Developer", "Data Engineer"],
    primaryPillar: "Data Engineer",
    responsibilities:
      "Engineered an industrial Android sensor monitoring client that continuously captures temperature, humidity, and vibration telematics from plant machinery for proactive safety.",
    achievements: [
      "Designed offline-tolerant local SQLite buffering to prevent data loss during factory Wi-Fi interruptions.",
      "Created intuitive mobile charts and status dashboards for plant floor operators and maintenance technicians.",
      "Reduced anomalous machine temperature detection delays through real-time threshold alert notifications."
    ],
    personalContribution:
      "Individually built the Android telemetry application, local SQLite buffer logic, REST cloud synchronization worker, and operator charting UI.",
    technologies: ["Android", "Java", "SQLite", "REST APIs", "IoT Protocols", "Telemetry Streaming", "Data Visualization"],
    accentColor: "border-emerald-400/40 text-emerald-300"
  }
]

const filterTabs: { id: ExperiencePillar; label: string }[] = [
  { id: "All Positions", label: "All Trajectory" },
  { id: "Data Analytics", label: "Data Analytics" },
  { id: "Data Engineering", label: "Data Engineering" },
  { id: "Full-Stack Development", label: "Full-Stack Dev" },
]

export function ExperienceTimeline() {
  const [activeFilter, setActiveFilter] = useState<ExperiencePillar>("All Positions")

  const filteredRoles = professionalExperiences.filter((item) => {
    if (activeFilter === "All Positions") return true
    if (activeFilter === "Data Analytics") return item.pillars.includes("Data Analyst")
    if (activeFilter === "Data Engineering") return item.pillars.includes("Data Engineer")
    if (activeFilter === "Full-Stack Development") return item.pillars.includes("Full-Stack Developer")
    return true
  })

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070B14] overflow-hidden border-t border-white/10 scroll-mt-20">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5" />
            Professional Career Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E0F2FE] tracking-tight">
            Engineering & Industry Experience
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Documented roles across analytical modeling, production full-stack engineering, and real-time systems. Each milestone connected to core engineering pillars with verified individual contributions.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold"
                    : "bg-[#111B30]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#E0F2FE] border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-500 opacity-40 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredRoles.map((item, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Glowing Center Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1 sm:mt-6 z-20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#070B14] border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                    </div>

                    {/* Timeline Content Card */}
                    <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                      <div className="group relative p-6 sm:p-7 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        {/* Top Metadata: Period + Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border border-cyan-400/30 text-cyan-300 bg-cyan-950/40">
                              {item.period}
                            </span>
                            <span className="text-[10px] font-mono text-[#94A3B8] bg-[#070B14]/80 px-2 py-0.5 rounded border border-white/10">
                              {item.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-xl font-bold text-[#E0F2FE] group-hover:text-cyan-300 transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-sm font-semibold text-purple-300 mb-2">
                          {item.organization}
                        </p>

                        {/* Career Pillar Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.pillars.map((pillar) => (
                            <Badge
                              key={pillar}
                              variant="outline"
                              className="text-[10px] font-mono border-white/10 text-slate-300 bg-[#070B14]/80"
                            >
                              {pillar}
                            </Badge>
                          ))}
                        </div>

                        {/* Core Responsibilities */}
                        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4 font-light">
                          {item.responsibilities}
                        </p>

                        {/* Projects Breakdown (if any) */}
                        {item.keyProjects && item.keyProjects.length > 0 && (
                          <div className="space-y-3 mb-4">
                            {item.keyProjects.map((proj, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-3.5 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]"
                              >
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                                  <h4 className="text-xs font-bold text-cyan-300">
                                    {proj.name}
                                  </h4>
                                </div>
                                <div className="space-y-1">
                                  {proj.details.map((detail, dIdx) => (
                                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#94A3B8] leading-relaxed">
                                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                      <span>{detail}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Achievements Bullet Points */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="space-y-1.5 mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                              Engineering Impact
                            </span>
                            {item.achievements.map((ach, achIdx) => (
                              <div key={achIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span className="leading-tight">{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Direct Personal Contribution Callout */}
                        <div className="p-3 rounded-lg bg-[#070B14]/90 border border-white/10 mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                            Individual Engineering Ownership
                          </span>
                          <p className="text-xs text-[#E0F2FE]/90 leading-relaxed font-light">
                            {item.personalContribution}
                          </p>
                        </div>

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14]/80 text-[#E0F2FE]/80 border border-white/10 backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
