"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cloud, Palette, Camera, Sparkles, Layers } from "lucide-react"
import { SalesforceStudio } from "@/components/salesforce-studio"
import { DesignStudio } from "@/components/design-studio"
import { PhotographyGallery } from "@/components/photography-gallery"

type StudioTab = "salesforce" | "design" | "photography"

export function SpecializedStudios() {
  const [activeStudio, setActiveStudio] = useState<StudioTab>("salesforce")

  // Sync with URL hashes if user clicks direct studio links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash === "salesforce" || hash === "design" || hash === "photography") {
        setActiveStudio(hash as StudioTab)
      }
    }
  }, [])

  const handleTabChange = (tab: StudioTab) => {
    setActiveStudio(tab)
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`)
    }
  }

  const studios = [
    {
      id: "salesforce" as StudioTab,
      label: "Salesforce CRM Studio",
      icon: Cloud,
      tagline: "Platform Developer I • Apex & LWC Architecture",
      accent: "from-sky-400 to-indigo-500",
    },
    {
      id: "design" as StudioTab,
      label: "UI/UX Design Studio",
      icon: Palette,
      tagline: "Design Systems • Figma Prototypes • 8pt Grid",
      accent: "from-purple-400 to-pink-500",
    },
    {
      id: "photography" as StudioTab,
      label: "Photography Studio",
      icon: Camera,
      tagline: "Visual Arts • Cinematic Darkroom • EXIF Optics",
      accent: "from-amber-400 to-rose-500",
    },
  ]

  return (
    <section id="specialized-studios" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070B14] overflow-hidden border-t border-white/10 scroll-mt-20">
      {/* Background Studio Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-600/5 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Layers className="w-3.5 h-3.5" />
            Specialized Studios & Creative Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E0F2FE] tracking-tight">
            Creative Craft & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Specialized Practices</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Consolidated secondary disciplines complementing the primary engineering pillars. Demonstrating end-to-end execution across enterprise CRM automation, digital product systems, and cinematic optical storytelling.
          </p>

          {/* 3 Selectable Glass Studio Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {studios.map((studio) => {
              const Icon = studio.icon
              const isActive = activeStudio === studio.id
              return (
                <button
                  key={studio.id}
                  onClick={() => handleTabChange(studio.id)}
                  className={`relative px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 shadow-xl shadow-cyan-500/20 font-bold scale-[1.02]"
                      : "bg-[#111B30]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#E0F2FE] border border-white/10 hover:border-white/20"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-cyan-400"}`} />
                  <div className="text-left">
                    <span className="block leading-none">{studio.label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Studio Active Workspace Canvas */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeStudio === "salesforce" && (
              <motion.div
                key="salesforce"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <SalesforceStudio />
              </motion.div>
            )}

            {activeStudio === "design" && (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <DesignStudio />
              </motion.div>
            )}

            {activeStudio === "photography" && (
              <motion.div
                key="photography"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PhotographyGallery />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
