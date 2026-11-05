"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Workflow,
  Code2,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export type CareerPillarId = "data-analyst" | "data-engineer" | "full-stack" | "ai-engineer"

interface PillarConfig {
  id: CareerPillarId
  title: string
  badge: string
  tagline: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  borderColor: string
  accentGradient: string
  bgLight: string
  description: string
  coreCompetencies: string[]
  architectureFocus: string
  keyProjects: {
    title: string
    role: string
    impact: string
    url?: string
    anchor: string
  }[]
  targetLabAnchor: string
  targetLabName: string
}

const pillars: PillarConfig[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    badge: "Business Intelligence & Analytics",
    tagline: "Translating transactional datasets into executive decision intelligence.",
    icon: BarChart3,
    color: "#22D3EE",
    borderColor: "border-aurora-cyan/40",
    accentGradient: "from-aurora-cyan to-aurora-blue",
    bgLight: "rgba(34, 211, 238, 0.08)",
    description:
      "Specialized in transforming multi-million row operational datasets into clean, relational models, automated validation rules, and executive KPI dashboards that drive revenue retention and identify cross-sell cohorts.",
    coreCompetencies: [
      "SQL (PostgreSQL / MySQL)",
      "Executive KPI Dashboards",
      "Power BI & Tableau",
      "Cohort & Retention Analytics",
      "Data Cleaning & Validation",
      "Pandas & Statistical Modeling",
      "Excel Advanced & VBA",
    ],
    architectureFocus:
      "Automated SQL queries for table joins and aggregation, multi-dimensional cohort retention matrices, and executive trend monitoring.",
    keyProjects: [
      {
        title: "STR Analytics Platform",
        role: "Data Analyst at DJRB Services",
        impact: "Engineered SQL pipelines, data validation rules, and executive KPI trend dashboards.",
        anchor: "#data-lab",
      },
      {
        title: "OmniChannel Revenue & Cohort Analytics",
        role: "Lead Analytics Architect",
        impact: "Processed 1.2M+ transactions; uncovered $140K in cross-sell cohorts with +24% retention insight.",
        anchor: "#data-lab",
      },
    ],
    targetLabAnchor: "#data-lab",
    targetLabName: "Enter Data Analytics Lab",
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    badge: "Pipelines, ETL & Warehousing",
    tagline: "Building resilient data conduits, relational schemas, and automated Airflow DAGs.",
    icon: Workflow,
    color: "#14B8A6",
    borderColor: "border-teal-400/40",
    accentGradient: "from-teal-400 to-sky-400",
    bgLight: "rgba(20, 184, 166, 0.12)",
    description:
      "Engineering robust point-in-time feature extraction pipelines, 13-table PostgreSQL relational schemas, automated data cleaning rules, and Apache Airflow DAGs with zero data drift across multi-tenant infrastructures.",
    coreCompetencies: [
      "Apache Airflow Orchestration",
      "PostgreSQL 16 Relational Schema",
      "ETL / ELT Ingestion Pipelines",
      "Point-in-Time SQL Windows",
      "Data Cleaning & Imputation",
      "Data Validation & Anomaly Rules",
      "PgBouncer Connection Pooling",
    ],
    architectureFocus:
      "Relational integrity on 13-table customer schemas, scheduled Airflow batch retraining pipelines, and sub-2ms indexed database queries.",
    keyProjects: [
      {
        title: "ChurnPlatform Pipeline Engine",
        role: "Data & Systems Engineer",
        impact: "Designed 13-table PostgreSQL schema, point-in-time feature extraction, and automated Airflow pipelines.",
        url: "https://churnplatform.vercel.app",
        anchor: "#ai-lab",
      },
      {
        title: "DJRB Services Data Ingestion Pipeline",
        role: "Data Pipeline Engineer",
        impact: "Created automated validation logic eliminating reporting discrepancies across operational databases.",
        anchor: "#data-lab",
      },
    ],
    targetLabAnchor: "#data-engineering",
    targetLabName: "Explore Data Engineering Lab",
  },
  {
    id: "full-stack",
    title: "Full-Stack Developer",
    badge: "High-Performance Web Architecture",
    tagline: "Architecting end-to-end web applications with Next.js, Node.js, and Python services.",
    icon: Code2,
    color: "#818CF8",
    borderColor: "border-indigo-400/40",
    accentGradient: "from-indigo-400 to-aurora-violet",
    bgLight: "rgba(129, 140, 248, 0.08)",
    description:
      "Designing responsive, production-ready fullstack software with Next.js 16 (App Router), React 19, TypeScript, Node.js/Express, Python/FastAPI, Prisma ORM, Redis caching, and zero-trust authentication.",
    coreCompetencies: [
      "Next.js 16 & React 19",
      "TypeScript & Tailwind CSS",
      "Node.js & Express REST APIs",
      "FastAPI & Django Services",
      "PostgreSQL, MongoDB & Prisma",
      "Redis Caching & Token Buckets",
      "JWT Zero-Trust Security",
    ],
    architectureFocus:
      "Edge rendering, streaming SSR, rate-limited API gateways, sub-100ms response times, and multi-tenant e-commerce architectures.",
    keyProjects: [
      {
        title: "SuperShopy Quick-Commerce Platform",
        role: "Full-Stack Architect",
        impact: "Multi-tenant storefronts, warehouse portals, HTML5-Qrcode courier verification, and RBAC security.",
        url: "https://supershopy.vercel.app",
        anchor: "#projects",
      },
      {
        title: "Elevate Technology SaaS Platform",
        role: "Freelance Application Developer",
        impact: "Automated hardware node-locked licensing keys, Razorpay payments, and tax ledger logic.",
        url: "https://elevatetechnologies.in",
        anchor: "#projects",
      },
    ],
    targetLabAnchor: "#architecture",
    targetLabName: "Launch 3D Architecture Explorer",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    badge: "Machine Learning & Production Inference",
    tagline: "Deploying predictive ML models with explainable decision boundaries.",
    icon: Cpu,
    color: "#C084FC",
    borderColor: "border-purple-400/40",
    accentGradient: "from-aurora-violet to-purple-500",
    bgLight: "rgba(192, 132, 252, 0.08)",
    description:
      "Building and serving trained XGBoost classification models and neural architectures. Delivering sub-40ms REST inference endpoints with TreeSHAP explainability for customer retention and churn risk scoring.",
    coreCompetencies: [
      "XGBoost 2.0 & Scikit-Learn",
      "TreeSHAP Explainable AI",
      "FastAPI Asynchronous Scoring",
      "Feature Engineering & Ensembles",
      "Stratified 5-Fold Validation",
      "Predictive Churn Modeling",
      "Dockerized ML Deployments",
    ],
    architectureFocus:
      "96.4% validation accuracy, 95.2% recall rate, 38ms P95 inference latency, and game-theoretic SHAP feature attribution.",
    keyProjects: [
      {
        title: "ChurnPlatform AI Retention Engine",
        role: "AI & ML Engineer",
        impact: "Production XGBoost model trained on 45,000 records with TreeSHAP feature explanations and FastAPI.",
        url: "https://churnplatform.vercel.app",
        anchor: "#ai-lab",
      },
      {
        title: "QA-Pramaan Compliance Verifier",
        role: "Backend & Rules Engineer",
        impact: "Automated rule-checking algorithms validating appraisal records in seconds.",
        url: "https://qa-pramaan.vercel.app",
        anchor: "#projects",
      },
    ],
    targetLabAnchor: "#ai-lab",
    targetLabName: "Enter Data Science & AI Lab",
  },
]

export function CareerSwitcher() {
  const [selectedPillar, setSelectedPillar] = useState<CareerPillarId>("data-analyst")

  const current = pillars.find((p) => p.id === selectedPillar) || pillars[0]
  const CurrentIcon = current.icon

  return (
    <section id="career-pillars" className="py-24 px-4 relative scroll-mt-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-aurora-cyan/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-aurora-cyan" /> Core Career Positioning
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Four Engineering Pillars &bull; <span className="aurora-text-gradient">One Integrated Vision</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Select a specialization below to explore verified competencies, system architectures, and flagship projects.
          </p>
        </div>

        {/* 4 Pillar Selection Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {pillars.map((p) => {
            const Icon = p.icon
            const isSelected = selectedPillar === p.id

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative border backdrop-blur-xl shadow-xl ${
                  isSelected
                    ? "bg-[#111B30]/85 border-white/20 ring-1 shadow-2xl scale-[1.02]"
                    : "bg-[#111B30]/50 border-white/[0.08] hover:bg-[#111B30]/75 hover:border-white/20 text-[#94A3B8]"
                }`}
                aria-pressed={isSelected}
              >
                {/* Active Indicator Top Pill */}
                {isSelected && (
                  <div
                    className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: p.color }}
                  >
                    Active Focus
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-colors"
                    style={{
                      backgroundColor: isSelected ? p.color : "rgba(38, 50, 74, 0.4)",
                      color: isSelected ? "#05070E" : p.color,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8] uppercase">
                    0{pillars.findIndex((item) => item.id === p.id) + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] tracking-tight mb-1">
                  {p.title}
                </h3>
                <span className="text-xs text-[#94A3B8] line-clamp-1">{p.badge}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Pillar Deep-Dive Shell */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#111B30]/75 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden space-y-8"
          >
            {/* Top Bar: Title, Badge, and Action Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg"
                  style={{ backgroundColor: current.bgLight, border: `1px solid ${current.color}` }}
                >
                  <CurrentIcon className="h-6 w-6" style={{ color: current.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: current.bgLight, color: current.color }}
                    >
                      {current.badge}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Production Verified
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#E0F2FE] tracking-tight mt-1">
                    {current.title} Specialization
                  </h3>
                </div>
              </div>

              {/* Lab Navigation Button */}
              <Button
                asChild
                className="bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet text-slate-950 font-bold hover:opacity-90 rounded-xl px-5 py-5 shadow-lg shadow-aurora-cyan/20"
              >
                <a href={current.targetLabAnchor} className="flex items-center gap-2">
                  <span>{current.targetLabName}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Description & Narrative */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    Professional Focus & Value Proposition
                  </h4>
                  <p className="text-base sm:text-lg text-[#E0F2FE] font-medium leading-relaxed">
                    &ldquo;{current.tagline}&rdquo;
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{current.description}</p>
                </div>

                {/* Architecture Focus Box */}
                <div className="p-4 rounded-xl bg-[#070B14]/80 border border-white/10 backdrop-blur-md space-y-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-aurora-cyan flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> Systems & Architecture Focus
                  </span>
                  <p className="text-xs sm:text-sm text-[#E0F2FE] leading-relaxed">
                    {current.architectureFocus}
                  </p>
                </div>
              </div>

              {/* Verified Core Competencies Pills (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Verified Skills & Core Tooling
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.coreCompetencies.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/[0.05] border border-white/10 text-[#E0F2FE] hover:border-white/25 transition-colors shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Grounded Key Projects Row */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Proven Flagship Implementations
                </span>
                <span className="text-[11px] text-[#94A3B8] font-mono">100% Authentic Project Data</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {current.keyProjects.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-4 rounded-xl bg-[#070B14]/75 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all space-y-2 group shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-sm text-[#E0F2FE] group-hover:text-aurora-cyan transition-colors">
                        {proj.title}
                      </h5>
                      {proj.url ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-aurora-cyan hover:underline flex items-center gap-1"
                          title="Open live deployment"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <a
                          href={proj.anchor}
                          className="text-xs text-[#94A3B8] hover:text-[#E0F2FE] flex items-center gap-1"
                        >
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs font-mono text-aurora-violet block">{proj.role}</span>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">{proj.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
