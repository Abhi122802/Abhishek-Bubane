"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Workflow,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  Radio,
} from "lucide-react"

import { DataAnalyticsLab } from "@/components/data-analytics-lab"
import { DataEngineeringLab } from "@/components/data-engineering-lab"
import { FullstackArchitecture } from "@/components/fullstack-architecture"
import { AiLab } from "@/components/ai-lab"

export type LabTabId = "data-analytics" | "data-engineering" | "fullstack" | "ai-engineering"

interface LabTabDef {
  id: LabTabId
  title: string
  codeLabel: string
  anchorHash: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  color: string
  borderColor: string
  activeBg: string
}

const labTabs: LabTabDef[] = [
  {
    id: "data-analytics",
    title: "Data Analytics",
    codeLabel: "LAB_01 // BI & COHORTS",
    anchorHash: "#data-lab",
    subtitle: "Revenue Streams, Variance & Attribution Models",
    icon: BarChart3,
    badge: "1.2M+ Transactions",
    color: "#22D3EE", // Cyan
    borderColor: "border-aurora-cyan",
    activeBg: "bg-aurora-cyan/10",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    codeLabel: "LAB_02 // PIPELINE & SCHEMA",
    anchorHash: "#data-engineering",
    subtitle: "13-Table PostgreSQL Schema, Airflow & Temporal SQL",
    icon: Workflow,
    badge: "PostgreSQL 16",
    color: "#14B8A6", // Teal & Electric Blue
    borderColor: "border-teal-400",
    activeBg: "rgba(20, 184, 166, 0.12)",
  },
  {
    id: "fullstack",
    title: "Full-Stack Architecture",
    codeLabel: "LAB_03 // SYSTEMS & APIS",
    anchorHash: "#architecture",
    subtitle: "Next.js 16, FastAPI, Edge Auth & Persistence",
    icon: Code2,
    badge: "Sub-40ms P95",
    color: "#818CF8", // Indigo
    borderColor: "border-indigo-400",
    activeBg: "bg-indigo-500/10",
  },
  {
    id: "ai-engineering",
    title: "AI Engineering",
    codeLabel: "LAB_04 // PREDICTIVE ML",
    anchorHash: "#ai-lab",
    subtitle: "3D Neural Net, XGBoost & TreeSHAP Explainability",
    icon: Cpu,
    badge: "96.4% Accuracy",
    color: "#C084FC", // Purple
    borderColor: "border-purple-400",
    activeBg: "bg-purple-500/10",
  },
]

export function EngineeringOperationsCenter() {
  const [activeTab, setActiveTab] = useState<LabTabId>("data-analytics")
  const [isInViewport, setIsInViewport] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabListRef = useRef<HTMLDivElement | null>(null)

  // Sync with URL Hash changes (supports #data-lab, #data-engineering, #architecture, #ai-lab)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#data-lab" || hash === "#analytics") {
        setActiveTab("data-analytics")
      } else if (hash === "#data-engineering" || hash === "#pipeline" || hash === "#schema") {
        setActiveTab("data-engineering")
      } else if (hash === "#architecture" || hash === "#fullstack" || hash === "#full-stack") {
        setActiveTab("fullstack")
      } else if (hash === "#ai-lab" || hash === "#ai" || hash === "#machine-learning") {
        setActiveTab("ai-engineering")
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Viewport IntersectionObserver to pause offscreen heavy animations
  useEffect(() => {
    if (!containerRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting)
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Keyboard navigation for tablist (Left / Right arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % labTabs.length
      setActiveTab(labTabs[nextIndex].id)
      const nextTab = tabListRef.current?.children[nextIndex] as HTMLButtonElement
      nextTab?.focus()
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + labTabs.length) % labTabs.length
      setActiveTab(labTabs[prevIndex].id)
      const prevTab = tabListRef.current?.children[prevIndex] as HTMLButtonElement
      prevTab?.focus()
    }
  }

  const activeLab = labTabs.find((t) => t.id === activeTab) || labTabs[0]
  const ActiveIcon = activeLab.icon

  return (
    <section
      id="operations-center"
      ref={containerRef}
      className="py-24 px-4 relative scroll-mt-16 overflow-hidden bg-[#070B14]"
    >
      {/* Anchor targets to preserve smooth navigation from existing links */}
      <div id="data-lab" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div id="data-engineering" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div id="architecture" className="absolute -top-20 opacity-0 pointer-events-none" />
      <div id="ai-lab" className="absolute -top-20 opacity-0 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-aurora-cyan/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[350px] bg-aurora-violet/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-mono font-bold text-aurora-cyan uppercase tracking-wider shadow-sm">
            <Radio className="h-3.5 w-3.5 text-aurora-cyan animate-pulse" />
            ENGINEERING COMMAND SUITE &bull; FOUR SPECIALIZED LABS
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#F8FAFC]">
            ENGINEERING <span className="aurora-text-gradient">OPERATIONS CENTER</span>
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            One unified interactive workspace. Switch between quantitative BI analytics, resilient data pipelines, multi-tier full-stack architectures, and explainable AI models.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Production Grounded Logic
            </span>
            <span>&bull;</span>
            <span className="text-aurora-cyan">Gated Animation Budgeting</span>
          </div>
        </div>

        {/* 4 Interactive Operations Tabs Navigation */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Engineering Operations Center Labs"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
        >
          {labTabs.map((tab, idx) => {
            const Icon = tab.icon
            const isSelected = activeTab === tab.id

            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", tab.anchorHash)
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative border backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#111B30]/90 border-white/20 ring-1 shadow-2xl scale-[1.02]"
                    : "bg-[#111B30]/40 border-white/[0.08] hover:bg-[#111B30]/70 hover:border-white/20 text-[#94A3B8]"
                }`}
              >
                {/* Active Indicator Top Pill */}
                {isSelected && (
                  <div
                    className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: tab.color }}
                  >
                    Active Lab
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-colors"
                    style={{
                      backgroundColor: isSelected ? tab.color : "rgba(38, 50, 74, 0.4)",
                      color: isSelected ? "#05070E" : tab.color,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#94A3B8]">0{idx + 1}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#94A3B8] block mb-0.5">
                    {tab.codeLabel}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#E0F2FE] tracking-tight leading-snug">
                    {tab.title}
                  </h3>
                  <span className="text-xs text-[#94A3B8] line-clamp-1 mt-0.5">
                    {tab.badge}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Selected Mode Banner HUD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111B30]/70 backdrop-blur-xl border border-white/10 flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto shadow-xl">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
              style={{ backgroundColor: activeLab.activeBg, color: activeLab.color }}
            >
              <ActiveIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#E0F2FE]">
                  {activeLab.title.toUpperCase()} CONSOLE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#151D32] border border-[#26324A] text-emerald-400">
                  {activeLab.badge}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">{activeLab.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#94A3B8]">
              Viewport Status:{" "}
              <strong className={isInViewport ? "text-emerald-400" : "text-amber-400"}>
                {isInViewport ? "ONLINE [ACTIVE]" : "PAUSED [OFFSCREEN]"}
              </strong>
            </span>
          </div>
        </div>

        {/* Dynamic Lab Panels */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "data-analytics" && (
              <motion.div
                key="data-analytics"
                role="tabpanel"
                id="panel-data-analytics"
                aria-labelledby="tab-data-analytics"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DataAnalyticsLab />
              </motion.div>
            )}

            {activeTab === "data-engineering" && (
              <motion.div
                key="data-engineering"
                role="tabpanel"
                id="panel-data-engineering"
                aria-labelledby="tab-data-engineering"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DataEngineeringLab />
              </motion.div>
            )}

            {activeTab === "fullstack" && (
              <motion.div
                key="fullstack"
                role="tabpanel"
                id="panel-fullstack"
                aria-labelledby="tab-fullstack"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <FullstackArchitecture />
              </motion.div>
            )}

            {activeTab === "ai-engineering" && (
              <motion.div
                key="ai-engineering"
                role="tabpanel"
                id="panel-ai-engineering"
                aria-labelledby="tab-ai-engineering"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AiLab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
