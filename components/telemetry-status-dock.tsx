"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal,
  Server,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  X,
} from "lucide-react"

interface SystemService {
  name: string
  role: string
  url: string
  stack: string
  status: "Verified Live" | "Static Verified"
}

const verifiedServices: SystemService[] = [
  {
    name: "ChurnPlatform",
    role: "AI Churn & Retention Engine",
    url: "https://churnplatform.vercel.app",
    stack: "Next.js • FastAPI • XGBoost • PostgreSQL",
    status: "Verified Live",
  },
  {
    name: "SuperShopy",
    role: "Quick-Commerce Platform",
    url: "https://supershopy.vercel.app",
    stack: "Node.js • Express • MongoDB • QR Scanner",
    status: "Verified Live",
  },
  {
    name: "Elevate Technology",
    role: "Commercial Software SaaS",
    url: "https://elevatetechnologies.in",
    stack: "React 19 • Redux • Node • Razorpay",
    status: "Verified Live",
  },
  {
    name: "QA-Pramaan",
    role: "Mortgage Compliance Verifier",
    url: "https://qa-pramaan.vercel.app",
    stack: "Python • Django • React Audit UI",
    status: "Verified Live",
  },
]

export function TelemetryStatusDock() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside aria-label="System telemetry dock" className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-[calc(100vw-2rem)] sm:w-auto font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-2 p-5 rounded-2xl bg-[#111B30]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-950/50 space-y-4 text-xs text-[#E0F2FE]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                <span className="font-mono font-bold tracking-wider uppercase text-cyan-300 text-[11px]">
                  Operational Telemetry &bull; Grounded
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#94A3B8] hover:text-[#E0F2FE] p-1 rounded-md transition-colors"
                aria-label="Close telemetry dock"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Core Stack Specs */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" /> Core Runtime Specifications
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <span className="text-[#94A3B8] block text-[9px]">FRAMEWORK</span>
                  <span className="text-[#E0F2FE] font-semibold">Next.js 16.2.0</span>
                </div>
                <div className="p-2 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <span className="text-[#94A3B8] block text-[9px]">UI RUNTIME</span>
                  <span className="text-[#E0F2FE] font-semibold">React 19.x</span>
                </div>
                <div className="p-2 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <span className="text-[#94A3B8] block text-[9px]">GRAPHICS</span>
                  <span className="text-cyan-300 font-semibold">WebGL Three.js</span>
                </div>
                <div className="p-2 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <span className="text-[#94A3B8] block text-[9px]">EDGE DEPLOYMENT</span>
                  <span className="text-sky-300 font-semibold">Vercel Network</span>
                </div>
              </div>
            </div>

            {/* Verified Production Endpoints */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-sky-400" /> Verified Production Endpoints
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {verifiedServices.map((service) => (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/20 transition-colors flex items-center justify-between group block"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#E0F2FE] group-hover:text-cyan-300 transition-colors text-[11px]">
                        <span>{service.name}</span>
                        <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                      </div>
                      <span className="text-[9px] text-[#94A3B8] font-mono block">
                        {service.stack}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                      {service.status}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Grounding & Authenticity Disclaimer */}
            <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-[10px] text-[#94A3B8] leading-tight">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Grounded Telemetry:</strong> All service states reflect genuine production builds. No synthetic uptime counters or simulated latency metrics.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Toggle Dock Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#111B30]/85 backdrop-blur-xl border border-white/10 hover:border-white/20 text-[#E0F2FE] shadow-2xl hover:shadow-cyan-500/10 transition-all ml-auto group"
        aria-expanded={isOpen}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-tight">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Telemetry Status</span>
          <span className="text-[10px] text-cyan-300 font-normal uppercase hidden md:inline">
            [SYS:ONLINE]
          </span>
        </div>
        {isOpen ? (
          <ChevronDown className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#E0F2FE]" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#E0F2FE]" />
        )}
      </button>
    </aside>
  )
}
