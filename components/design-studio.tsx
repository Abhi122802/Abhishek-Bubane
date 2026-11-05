"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Palette, 
  Layers, 
  Type, 
  Smartphone, 
  Monitor, 
  Search, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowRight, 
  Sliders, 
  Eye,
  MousePointer,
  Figma
} from "lucide-react"

const processStages = [
  { id: "research", title: "Research & Discovery", icon: Search, desc: "User interviews, empathy mapping, quantitative telemetry analysis, and competitive heuristic benchmarks." },
  { id: "wireframe", title: "Low-Fi Wireframing", icon: Layers, desc: "Information architecture, user task flow diagrams, and low-fidelity structural skeletons." },
  { id: "prototype", title: "Interactive Prototyping", icon: MousePointer, desc: "High-fidelity micro-interactions, responsive states, transitions, and usability validation loops." },
  { id: "designsystem", title: "Design Systems", icon: Palette, desc: "Comprehensive token architecture, atomic component kits, accessible contrast ratios, and typography hierarchies." },
  { id: "final", title: "Production Hand-off", icon: Monitor, desc: "Pixel-perfect CSS variables, React component specs, responsive breakpoints, and motion orchestration." },
]

const colorSwatches = [
  { name: "Electric Cyan", hex: "#22D3EE", role: "Primary Accent / Edge Illumination", hsl: "hsl(187, 85%, 53%)" },
  { name: "Sky Blue", hex: "#38BDF8", role: "Key Interactive Focus / Action", hsl: "hsl(199, 89%, 60%)" },
  { name: "Periwinkle", hex: "#818CF8", role: "Full-Stack & Systems Tone", hsl: "hsl(234, 93%, 74%)" },
  { name: "Soft Violet", hex: "#C084FC", role: "AI & Neural Network Accents", hsl: "hsl(273, 94%, 75%)" },
  { name: "Glass Navy", hex: "#111B30", role: "Translucent Glass Surface", hsl: "hsl(221, 48%, 13%)" },
  { name: "Deep Void", hex: "#070B14", role: "Infinite Midnight Canvas", hsl: "hsl(223, 47%, 5%)" },
]

export function DesignStudio() {
  const [activeStage, setActiveStage] = useState(0)
  const [copiedHex, setCopiedHex] = useState<string | null>(null)
  const [activeScreenTab, setActiveScreenTab] = useState<"desktop" | "mobile">("desktop")

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 1800)
  }

  return (
    <section id="design" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B14] via-[#0A0F1D] to-[#070B14] overflow-hidden border-t border-white/10">
      {/* Background Studio Grids & Figma Ruler accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf806_1px,transparent_1px),linear-gradient(to_bottom,#38bdf806_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111B30]/80 backdrop-blur-md border border-white/10 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-3">
              <Figma className="w-3.5 h-3.5" />
              UI / UX Design Studio
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E0F2FE] tracking-tight">
              Design Intentionally. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Crafting Human-Centric Systems
              </span>
            </h2>
            <p className="mt-4 text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
              Where analytical depth meets editorial aesthetics. Every interface is built upon systematic design tokens, validated through user psychology, and tuned for tactile responsiveness.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#111B30]/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveScreenTab("desktop")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeScreenTab === "desktop"
                  ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-[#94A3B8] hover:text-[#E0F2FE]"
              }`}
            >
              <Monitor className="w-4 h-4" />
              Desktop Canvas
            </button>
            <button
              onClick={() => setActiveScreenTab("mobile")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeScreenTab === "mobile"
                  ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "text-[#94A3B8] hover:text-[#E0F2FE]"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Mobile Experience
            </button>
          </div>
        </div>

        {/* 5-Step Design Methodology Ribbon */}
        <div className="mb-16 bg-[#111B30]/75 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {processStages.map((stage, idx) => {
              const Icon = stage.icon
              const isActive = activeStage === idx
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`relative text-left p-4 rounded-xl transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#070B14]/90 border border-cyan-400/40 shadow-lg shadow-cyan-500/10"
                      : "hover:bg-[#070B14]/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${isActive ? "text-cyan-400" : "text-slate-500"}`}>
                      0{idx + 1}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold mb-1 ${isActive ? "text-[#E0F2FE]" : "text-[#94A3B8]"}`}>
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="stage-active-line"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Two-Column Studio Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Interactive Design System Tokens Inspector (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Color System Swatches */}
            <div className="bg-[#111B30]/75 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-bold text-[#E0F2FE]">Midnight Aurora Color Tokens</h4>
                </div>
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  WCAG AAA
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {colorSwatches.map((color) => (
                  <div
                    key={color.hex}
                    onClick={() => copyToClipboard(color.hex)}
                    className="group relative p-3 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/25 cursor-pointer transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg shadow-md border border-white/10 flex-shrink-0 transition-transform group-hover:rotate-6"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#E0F2FE] truncate">{color.name}</p>
                          <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                            {copiedHex === color.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-cyan-300 mt-0.5">{color.hex}</p>
                        <p className="text-[10px] text-[#94A3B8] truncate mt-0.5">{color.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography Scale Card */}
            <div className="bg-[#111B30]/75 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-purple-400" />
                  <h4 className="text-base font-bold text-[#E0F2FE]">Typographic Hierarchy</h4>
                </div>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                  Inter & Plus Jakarta
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
                    <span>Display Heavy / 700 / -0.03em</span>
                    <span className="text-purple-400">48px</span>
                  </div>
                  <p className="text-2xl font-black text-[#E0F2FE] tracking-tight">Digital Clarity</p>
                </div>

                <div className="p-3 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
                    <span>Section Heading / 600 / -0.02em</span>
                    <span className="text-cyan-400">28px</span>
                  </div>
                  <p className="text-lg font-bold text-[#E0F2FE]">Architecture & Experiences</p>
                </div>

                <div className="p-3 rounded-xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
                    <span>Body Regular / 400 / 1.6em</span>
                    <span className="text-[#94A3B8]">16px</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Accessible micro-copy structured for cognitive ease, minimal friction, and intuitive navigation loops.
                  </p>
                </div>
              </div>
            </div>

            {/* Atomic Component Library Showcase */}
            <div className="bg-[#111B30]/75 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-base font-bold text-white">Atomic Component Kit</h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">Production Ready</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all">
                    Primary CTA
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-[#0B1020] border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-950/30 transition-all">
                    Ghost Aurora
                  </button>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Node
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      readOnly
                      value="Search design components..."
                      className="w-full bg-[#0B1020] border border-[#26324A] text-slate-400 text-xs rounded-lg px-3 py-2 outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                  <div className="w-12 h-6 bg-cyan-600 rounded-full p-1 cursor-pointer flex items-center justify-end">
                    <div className="w-4 h-4 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Realistic Figma Editorial Screen Showcase (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#111B30]/85 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Figma Window Chrome */}
              <div className="bg-[#070B14]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
                    <Figma className="w-3.5 h-3.5 text-purple-400" />
                    fintech-app-v3.fig • Frame: Dashboard / Main Screen [1440 × 900]
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
                  <span className="hidden sm:inline bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px] font-mono">
                    100% Zoom
                  </span>
                  <Eye className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
              </div>

              {/* Viewport Frame Container */}
              <div className="p-6 sm:p-8 bg-[#070B14] min-h-[580px] flex items-center justify-center relative overflow-hidden">
                {/* Rulers / Guides simulation */}
                <div className="absolute top-0 left-0 right-0 h-4 border-b border-white/10 flex justify-between px-2 text-[9px] font-mono text-slate-600 select-none">
                  <span>0</span><span>200</span><span>400</span><span>600</span><span>800</span><span>1000</span><span>1200</span><span>1440</span>
                </div>

                <AnimatePresence mode="wait">
                  {activeScreenTab === "desktop" ? (
                    <motion.div
                      key="desktop-screen"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="w-full bg-[#070B14]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl p-5 space-y-5"
                    >
                      {/* App Mockup Topbar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                            N
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#E0F2FE]">Nova Wealth Platform</div>
                            <div className="text-[10px] text-[#94A3B8]">Institutional Portfolio Architecture</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/30">
                            Live Stream
                          </span>
                          <div className="w-7 h-7 rounded-full bg-slate-700 border border-purple-500/40" />
                        </div>
                      </div>

                      {/* Mockup Metrics Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#111B30]/60 backdrop-blur-sm p-3 rounded-lg border border-white/[0.08]">
                          <span className="text-[10px] text-[#94A3B8]">Total Asset Value</span>
                          <p className="text-base font-bold text-[#E0F2FE] mt-1">$4,289,120</p>
                          <span className="text-[10px] text-emerald-400 font-medium">↑ +14.2% MoM</span>
                        </div>
                        <div className="bg-[#111B30]/60 backdrop-blur-sm p-3 rounded-lg border border-white/[0.08]">
                          <span className="text-[10px] text-[#94A3B8]">System Latency</span>
                          <p className="text-base font-bold text-cyan-400 mt-1">18.4 ms</p>
                          <span className="text-[10px] text-cyan-300 font-medium">99.99% SLA</span>
                        </div>
                        <div className="bg-[#111B30]/60 backdrop-blur-sm p-3 rounded-lg border border-white/[0.08]">
                          <span className="text-[10px] text-[#94A3B8]">Risk Variance</span>
                          <p className="text-base font-bold text-purple-400 mt-1">0.14 β</p>
                          <span className="text-[10px] text-purple-300 font-medium">Optimal Hedge</span>
                        </div>
                      </div>

                      {/* Mockup Graphic Visualization Frame */}
                      <div className="bg-[#111B30]/60 backdrop-blur-sm p-4 rounded-xl border border-white/[0.08] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-semibold text-[#E0F2FE]">Algorithmic Portfolio Yield Curve</span>
                          <span className="text-[10px] font-mono text-cyan-400">Deep Learning Model v4</span>
                        </div>
                        <div className="h-28 w-full flex items-end gap-1.5 pt-4">
                          {[35, 48, 42, 60, 55, 75, 68, 85, 92, 88, 97, 105].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                              <div
                                style={{ height: `${(val / 110) * 100}%` }}
                                className="w-full rounded-t bg-gradient-to-t from-cyan-600/40 via-purple-600 to-cyan-400 transition-all group-hover:brightness-125"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Mockup Action Bar */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-[11px] text-slate-400 font-mono">Synchronized with Node 04 (Tokyo)</span>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-[11px] font-medium">
                          Generate Audit Report
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mobile-screen"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3 }}
                      className="w-72 bg-[#0F162B] rounded-3xl border-4 border-[#26324A] shadow-2xl p-4 space-y-4 relative"
                    >
                      {/* Mobile Notch */}
                      <div className="w-24 h-4 bg-[#070B14] rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-700" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Nova Mobile</span>
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      </div>

                      <div className="p-3 rounded-2xl bg-gradient-to-br from-[#151D32] to-[#1E293B] border border-cyan-500/20">
                        <span className="text-[10px] text-slate-400">Portfolio Balance</span>
                        <p className="text-xl font-black text-white mt-0.5">$4,289,120</p>
                        <span className="text-[10px] text-emerald-400 font-medium">↑ +14.2% this month</span>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Quick Actions</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="p-2 rounded-xl bg-[#151D32] border border-[#26324A] text-left">
                            <span className="text-[11px] font-bold text-white block">Rebalance</span>
                            <span className="text-[9px] text-slate-400">One-tap AI</span>
                          </button>
                          <button className="p-2 rounded-xl bg-[#151D32] border border-[#26324A] text-left">
                            <span className="text-[11px] font-bold text-white block">Liquidity</span>
                            <span className="text-[9px] text-slate-400">Instant wire</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-[#151D32]/80 border border-[#26324A] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                            AI
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-200">Neural Risk Guard</div>
                            <div className="text-[9px] text-emerald-400">Active Monitoring</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Specs Annotation */}
              <div className="bg-[#0B1020] px-6 py-3.5 border-t border-[#26324A] flex flex-wrap items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <span>Methodology: <strong>Atomic Design (Brad Frost)</strong></span>
                  <span>Grid: <strong>8pt Fluid Base</strong></span>
                </div>
                <div className="text-cyan-400 font-mono text-[11px]">
                  Figma Component Variants: 48 tokens linked
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
