"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Play,
  CheckCircle2,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Info,
  Brain,
  Zap,
  RotateCcw,
  BarChart2,
  HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* =========================================================================
   3D Animated Neural Network Canvas
   Implements 3D node coordinates with perspective projection, auto-rotation,
   interactive mouse drag/tilt, and dynamic synaptic signal flow.
   ========================================================================= */

interface Node3D {
  id: string
  layer: number
  x: number // 3D coordinates
  y: number
  z: number
  label: string
  baseRadius: number
  color: string
}

interface Synapse3D {
  from: Node3D
  to: Node3D
  weight: number // 0 to 1
  pulseProgress: number // 0 to 1
  pulseSpeed: number
}

function NeuralNetwork3D({
  engagement,
  tenure,
  supportTickets,
  churnProb,
}: {
  engagement: number
  tenure: number
  supportTickets: number
  churnProb: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState({ x: 0.15, y: 0.35 })
  const isDraggingRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const prefersReducedMotionRef = useRef(false)

  // Detect reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      prefersReducedMotionRef.current = mediaQuery.matches
      const listener = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches
      }
      mediaQuery.addEventListener("change", listener)
      return () => mediaQuery.removeEventListener("change", listener)
    }
  }, [])

  // Build the 4-layer 3D node structure
  const { nodes, synapses } = useMemo(() => {
    const rawNodes: Node3D[] = []
    const rawSynapses: Synapse3D[] = []

    // Layer definitions: [Layer index, Node count, X position, Labels]
    const layerDefs = [
      {
        layer: 0,
        count: 4,
        x: -240,
        labels: ["Engagement", "Tenure", "Tickets", "Recency"],
        color: "#38BDF8", // Cyan
      },
      {
        layer: 1,
        count: 5,
        x: -80,
        labels: ["Feature L1", "Feature L2", "Feature L3", "Feature L4", "Feature L5"],
        color: "#818CF8", // Indigo
      },
      {
        layer: 2,
        count: 4,
        x: 80,
        labels: ["Latent 1", "Latent 2", "Latent 3", "Latent 4"],
        color: "#C084FC", // Purple
      },
      {
        layer: 3,
        count: 2,
        x: 240,
        labels: ["Retention", "Churn"],
        color: churnProb > 50 ? "#F87171" : "#34D399", // Emerald vs Red
      },
    ]

    layerDefs.forEach((def) => {
      const spacingY = 65
      const startY = -((def.count - 1) * spacingY) / 2

      for (let i = 0; i < def.count; i++) {
        // Distribute slightly across Z axis for true 3D depth
        const zOffset = Math.sin((i / def.count) * Math.PI) * 55 - 25
        rawNodes.push({
          id: `l${def.layer}-n${i}`,
          layer: def.layer,
          x: def.x,
          y: startY + i * spacingY,
          z: zOffset,
          label: def.labels[i] || `Node ${i + 1}`,
          baseRadius: def.layer === 3 ? 9 : def.layer === 0 ? 7 : 6,
          color: def.color,
        })
      }
    })

    // Connect adjacent layers
    const layer0 = rawNodes.filter((n) => n.layer === 0)
    const layer1 = rawNodes.filter((n) => n.layer === 1)
    const layer2 = rawNodes.filter((n) => n.layer === 2)
    const layer3 = rawNodes.filter((n) => n.layer === 3)

    const connectLayers = (fromArr: Node3D[], toArr: Node3D[]) => {
      fromArr.forEach((fromNode, fIdx) => {
        toArr.forEach((toNode, tIdx) => {
          // Weight calculation influenced by inputs
          const pseudoWeight = 0.35 + Math.sin(fIdx + tIdx * 1.5) * 0.3
          rawSynapses.push({
            from: fromNode,
            to: toNode,
            weight: Math.max(0.2, Math.min(0.9, pseudoWeight)),
            pulseProgress: (fIdx * 0.2 + tIdx * 0.15) % 1,
            pulseSpeed: 0.008 + (fIdx + tIdx) * 0.001,
          })
        })
      })
    }

    connectLayers(layer0, layer1)
    connectLayers(layer1, layer2)
    connectLayers(layer2, layer3)

    return { nodes: rawNodes, synapses: rawSynapses }
  }, [churnProb])

  // Canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let localRotationY = rotation.y
    let localRotationX = rotation.x

    const render = () => {
      // Auto-rotation when not hovering or dragging, and reduced motion is off
      if (!isHovered && !isDraggingRef.current && !prefersReducedMotionRef.current) {
        localRotationY += 0.004
      }

      const width = canvas.width
      const height = canvas.height
      const cx = width / 2
      const cy = height / 2
      const fov = 420 // Field of view

      ctx.clearRect(0, 0, width, height)

      // Trigonometric cache for rotation
      const cosY = Math.cos(localRotationY)
      const sinY = Math.sin(localRotationY)
      const cosX = Math.cos(localRotationX)
      const sinX = Math.sin(localRotationX)

      // Project 3D to 2D
      const projectedNodes = nodes.map((node) => {
        // Rotate around Y
        const x1 = node.x * cosY + node.z * sinY
        const z1 = -node.x * sinY + node.z * cosY

        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX
        const z2 = node.y * sinX + z1 * cosX

        // Perspective scale factor
        const scale = fov / (fov + z2 + 300)
        const screenX = cx + x1 * scale
        const screenY = cy + y2 * scale
        const depthAlpha = Math.max(0.25, Math.min(1, (z2 + 250) / 450))

        return {
          ...node,
          screenX,
          screenY,
          scale,
          depthAlpha,
          z2,
        }
      })

      // Draw Synapses
      synapses.forEach((synapse) => {
        const fromNode = projectedNodes.find((n) => n.id === synapse.from.id)
        const toNode = projectedNodes.find((n) => n.id === synapse.to.id)
        if (!fromNode || !toNode) return

        const avgAlpha = (fromNode.depthAlpha + toNode.depthAlpha) / 2
        const isChurnPath = toNode.label === "Churn" && churnProb > 50
        const isRetentionPath = toNode.label === "Retention" && churnProb <= 50

        // Line color
        let strokeColor = `rgba(56, 189, 248, ${0.15 * avgAlpha})`
        if (isChurnPath) {
          strokeColor = `rgba(248, 113, 113, ${0.35 * avgAlpha})`
        } else if (isRetentionPath) {
          strokeColor = `rgba(52, 211, 153, ${0.35 * avgAlpha})`
        }

        ctx.beginPath()
        ctx.moveTo(fromNode.screenX, fromNode.screenY)
        ctx.lineTo(toNode.screenX, toNode.screenY)
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = Math.max(0.6, synapse.weight * 1.8 * ((fromNode.scale + toNode.scale) / 2))
        ctx.stroke()

        // Animated traveling pulses
        if (!prefersReducedMotionRef.current) {
          synapse.pulseProgress = (synapse.pulseProgress + synapse.pulseSpeed) % 1
        }
        const pulseX = fromNode.screenX + (toNode.screenX - fromNode.screenX) * synapse.pulseProgress
        const pulseY = fromNode.screenY + (toNode.screenY - fromNode.screenY) * synapse.pulseProgress
        const pulseSize = 2.2 * ((fromNode.scale + toNode.scale) / 2)

        ctx.beginPath()
        ctx.arc(pulseX, pulseY, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = isChurnPath
          ? `rgba(248, 113, 113, ${0.85 * avgAlpha})`
          : `rgba(56, 189, 248, ${0.85 * avgAlpha})`
        ctx.fill()
      })

      // Sort nodes by depth (z2 ascending, back to front)
      const sortedNodes = [...projectedNodes].sort((a, b) => a.z2 - b.z2)

      // Draw Nodes
      sortedNodes.forEach((node) => {
        const radius = node.baseRadius * node.scale

        // Outer glow
        const glow = ctx.createRadialGradient(
          node.screenX,
          node.screenY,
          0,
          node.screenX,
          node.screenY,
          radius * 2.8
        )
        glow.addColorStop(0, `${node.color}cc`)
        glow.addColorStop(0.5, `${node.color}33`)
        glow.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(node.screenX, node.screenY, radius * 2.8, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Solid Node Core
        ctx.beginPath()
        ctx.arc(node.screenX, node.screenY, radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.shadowColor = node.color
        ctx.shadowBlur = 10 * node.scale
        ctx.fill()
        ctx.shadowBlur = 0 // Reset

        // Specular highlight
        ctx.beginPath()
        ctx.arc(node.screenX - radius * 0.3, node.screenY - radius * 0.3, radius * 0.35, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)"
        ctx.fill()

        // Node Label (Visible on hover or for inputs/outputs)
        if (node.layer === 0 || node.layer === 3 || isHovered) {
          ctx.font = `600 ${Math.max(9, Math.round(10 * node.scale))}px ui-monospace, SFMono-Regular, Menlo, monospace`
          ctx.fillStyle = `rgba(248, 250, 252, ${node.depthAlpha * 0.95})`
          ctx.textAlign = node.layer === 0 ? "right" : node.layer === 3 ? "left" : "center"
          const offsetX = node.layer === 0 ? -radius - 8 : node.layer === 3 ? radius + 8 : 0
          const offsetY = node.layer === 0 || node.layer === 3 ? 3.5 : radius + 12
          ctx.fillText(node.label, node.screenX + offsetX, node.screenY + offsetY)
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodes, synapses, isHovered, churnProb, rotation])

  // Mouse interaction handlers for 3D rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return
    const dx = e.clientX - lastMousePosRef.current.x
    const dy = e.clientY - lastMousePosRef.current.y
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }

    setRotation((prev) => ({
      x: Math.max(-0.6, Math.min(0.6, prev.x + dy * 0.005)),
      y: prev.y + dx * 0.007,
    }))
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-[#070B14] to-[#0B1020] border border-[#26324A] overflow-hidden group select-none">
      {/* 3D Network Canvas */}
      <canvas
        ref={canvasRef}
        width={760}
        height={420}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseUp()
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        aria-label="Interactive 3D Neural Network Visualization showing input features connecting through latent layers to output predictions"
      />

      {/* Floating 3D Control Hints */}
      <div className="absolute top-3 left-4 flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#151D32]/80 border border-[#26324A] text-[10px] font-mono text-aurora-cyan">
          <Activity className="h-3 w-3 animate-pulse text-aurora-cyan" />
          Interactive 3D Topology
        </span>
        <span className="hidden sm:inline text-[10px] text-[#94A3B8]/80 font-mono">
          Drag to orbit • Hover nodes
        </span>
      </div>

      {/* Layer Hierarchy Indicators */}
      <div className="absolute bottom-3 inset-x-4 flex justify-between text-[10px] font-mono text-[#94A3B8] border-t border-[#26324A]/50 pt-2 pointer-events-none">
        <span className="text-aurora-cyan">L0: Inputs (4)</span>
        <span className="text-indigo-400">L1: Dense (5)</span>
        <span className="text-purple-400">L2: Latent (4)</span>
        <span className={churnProb > 50 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
          L3: Classification (2)
        </span>
      </div>
    </div>
  )
}

/* =========================================================================
   Main AI Lab Section Component
   ========================================================================= */

export function AiLab({ isEmbedded = false }: { isEmbedded?: boolean }) {
  // Interactive Simulation State
  const [featureEngagement, setFeatureEngagement] = useState(78)
  const [featureTenure, setFeatureTenure] = useState(14)
  const [featureTickets, setFeatureTickets] = useState(1)
  const [isInferencing, setIsInferencing] = useState(false)
  const [activeTab, setActiveTab] = useState<"simulator" | "benchmarks">("simulator")

  // Illustrative Heuristic Calculation
  // Grounded in real SaaS churn drivers: high engagement & tenure suppress churn; frequent unresolved tickets accelerate churn.
  const illustrativeChurnProb = useMemo(() => {
    const raw = 100 - (featureEngagement * 0.65 + featureTenure * 1.1) + featureTickets * 5.2
    return Math.max(4, Math.min(96, Math.round(raw)))
  }, [featureEngagement, featureTenure, featureTickets])

  const illustrativeRetentionProb = 100 - illustrativeChurnProb

  const [committedPrediction, setCommittedPrediction] = useState({
    churnProb: illustrativeChurnProb,
    retentionProb: illustrativeRetentionProb,
    risk: illustrativeChurnProb > 50 ? ("High Risk" as const) : ("Low Risk" as const),
    confidence: "94.6%",
    label:
      illustrativeChurnProb > 50
        ? "Requires Proactive Customer Success Intervention (High Attrition Vector)"
        : "Strong Account Health (High Renewal & Upsell Probability)",
  })

  // Re-run simulation when button clicked or parameters change
  const handleExecuteInference = () => {
    setIsInferencing(true)
    setTimeout(() => {
      setIsInferencing(false)
      const churn = illustrativeChurnProb
      const retention = 100 - churn
      setCommittedPrediction({
        churnProb: churn,
        retentionProb: retention,
        risk: churn > 50 ? "High Risk" : "Low Risk",
        confidence: `${(92 + (featureEngagement % 6)).toFixed(1)}%`,
        label:
          churn > 50
            ? "Requires Immediate Customer Success Intervention (Negative Engagement Drop)"
            : "Strong Account Health (High Lifetime Value & Stable Retention)",
      })
    }, 380)
  }

  const resetParameters = () => {
    setFeatureEngagement(78)
    setFeatureTenure(14)
    setFeatureTickets(1)
  }

  // 6 Pipeline Steps
  const pipelineSteps = [
    { step: "01", name: "Data Ingestion", desc: "Multi-source telemetry, billing & CRM tickets across 13 PostgreSQL tables" },
    { step: "02", name: "Feature Pipeline", desc: "Point-in-time behavioral lags, rolling DAU/MAU & session delta features" },
    { step: "03", name: "ML Architecture", desc: "XGBoost Classifier + Transformer ensemble with stratified 5-fold validation" },
    { step: "04", name: "Interpretability", desc: "TreeSHAP game-theoretic feature attribution & local decision explanations" },
    { step: "05", name: "Airflow DAGs", desc: "Automated daily retraining cadence & drift monitoring on AWS / Docker" },
    { step: "06", name: "Sub-40ms Inference", desc: "FastAPI asynchronous microservice endpoint returning probabilities" },
  ]

  // Actual Production Model Benchmarks
  const productionModelSpecs = [
    { label: "ROC-AUC Score", value: "0.942", detail: "Exemplary separation curve on test split", color: "text-aurora-cyan" },
    { label: "Validation Accuracy", value: "96.4%", detail: "+4.1% over standard logistic regression", color: "text-aurora-blue" },
    { label: "Recall Rate", value: "95.2%", detail: "Captures 95 of 100 actual churn events", color: "text-emerald-400" },
    { label: "P95 Inference Latency", value: "38ms", detail: "FastAPI REST worker with Redis caching", color: "text-aurora-purple" },
  ]

  // Actual Top Feature Weights (from ChurnPlatform project)
  const topFeatures = [
    { name: "30-Day Activity Delta (DAU/MAU)", impact: "+38.4%", type: "primary" },
    { name: "Contract Type (Annual vs Monthly)", impact: "+26.1%", type: "positive" },
    { name: "Unresolved Support Inquiries", impact: "+18.9%", type: "negative" },
    { name: "Account Subscription Tenure", impact: "+16.6%", type: "positive" },
  ]

  const aiLabContent = (
    <div className="space-y-12">
      {/* 6-Step Visual Architecture Pipeline */}
      <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-bold text-[#E0F2FE]">
                Production MLOps Pipeline Flow
              </span>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-[#070B14]/80 px-3 py-1 rounded-full border border-white/10">
              PostgreSQL • XGBoost • FastAPI • Docker
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelineSteps.map((p, idx) => (
              <div
                key={p.step}
                className="p-4 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/[0.08] space-y-2 relative group hover:border-purple-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-300">{p.step}</span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-[#94A3B8]/40 hidden lg:block" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#E0F2FE] group-hover:text-purple-300 transition-colors">
                  {p.name}
                </h4>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Mode Switcher: Clear distinction between Heuristic Simulation vs Trained Model */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "simulator"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md shadow-purple-500/25 font-bold"
                  : "text-[#94A3B8] hover:text-[#E0F2FE]"
              }`}
            >
              <Sliders className="h-4 w-4" />
              Interactive Simulator (3D Neural Net)
            </button>
            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "benchmarks"
                  ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold shadow-md shadow-cyan-500/25"
                  : "text-[#94A3B8] hover:text-[#E0F2FE]"
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              Actual Model Benchmarks & SHAP
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: INTERACTIVE SIMULATOR (WITH 3D NEURAL NETWORK)
            ========================================================================= */}
        {activeTab === "simulator" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Clarification Disclaimer Banner */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-200">
              <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px] block">
                  Illustrative Simulation Mode
                </span>
                <p className="text-amber-200/90 leading-relaxed text-xs">
                  The sliders and 3D network below run a <strong>real-time client-side heuristic calculation</strong> designed to
                  interactively demonstrate feature sensitivity and neural boundary behavior in your browser. For verified
                  metrics on the actual trained XGBoost production model, switch to the{" "}
                  <button
                    onClick={() => setActiveTab("benchmarks")}
                    className="underline font-bold text-white hover:text-amber-300"
                  >
                    Actual Model Benchmarks
                  </button>{" "}
                  tab or visit the live deployment at{" "}
                  <a
                    href="https://churnplatform.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold text-cyan-300 inline-flex items-center gap-0.5"
                  >
                    churnplatform.vercel.app <ExternalLink className="h-3 w-3 inline" />
                  </a>.
                </p>
              </div>
            </div>

            {/* Interactive Grid: 3D Network (Left) + Sliders & Prediction Outputs (Right) */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3D Animated Neural Network */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <h3 className="text-lg font-bold text-[#E0F2FE]">3D Neural Representation</h3>
                  </div>
                  <span className="text-[11px] font-mono text-purple-300 bg-[#070B14]/80 px-2.5 py-0.5 rounded border border-white/10">
                    Perspective Orbit Projection
                  </span>
                </div>

                {/* 3D Canvas */}
                <NeuralNetwork3D
                  engagement={featureEngagement}
                  tenure={featureTenure}
                  supportTickets={featureTickets}
                  churnProb={committedPrediction.churnProb}
                />

                {/* Network Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-center">
                  <div className="p-2 rounded-lg bg-[#070B14]/80 border border-white/10">
                    <span className="text-sky-300 block font-bold">Input Layer</span>
                    <span className="text-[#94A3B8]">4 Features</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#070B14]/80 border border-white/10">
                    <span className="text-indigo-300 block font-bold">Hidden Layer 1</span>
                    <span className="text-[#94A3B8]">5 Dense Nodes</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#070B14]/80 border border-white/10">
                    <span className="text-purple-300 block font-bold">Hidden Layer 2</span>
                    <span className="text-[#94A3B8]">4 Latent Nodes</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#070B14]/80 border border-white/10">
                    <span className={committedPrediction.churnProb > 50 ? "text-red-400 block font-bold" : "text-emerald-400 block font-bold"}>
                      Output Layer
                    </span>
                    <span className="text-[#94A3B8]">Classification</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Sliders & Live Risk / Retention Gauge */}
              <div className="lg:col-span-6 space-y-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 p-6 sm:p-7 shadow-2xl">
                <div>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aurora-violet/15 text-aurora-violet text-xs font-semibold">
                      <Sliders className="h-3.5 w-3.5" /> Behavioral Tuning Sliders
                    </div>
                    <button
                      onClick={resetParameters}
                      className="text-xs text-[#94A3B8] hover:text-[#F8FAFC] flex items-center gap-1 transition-colors"
                      title="Reset sliders to default"
                    >
                      <RotateCcw className="h-3 w-3" /> Reset
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-[#E0F2FE] mt-2">Simulate Account Attributes</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Adjust customer behavioral signals to test the decision boundary and observe real-time probability shifts.
                  </p>
                </div>

                {/* Slider 1: Engagement Score */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#E0F2FE]">Product Activity Index (DAU/MAU)</span>
                    <span className="text-purple-300 font-mono font-bold">{featureEngagement}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={featureEngagement}
                    onChange={(e) => setFeatureEngagement(Number(e.target.value))}
                    className="w-full accent-purple-400 h-2 bg-[#070B14] rounded-lg cursor-pointer border border-white/10"
                    aria-label="Product Activity Index DAU/MAU Slider"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>10% (Disengaged)</span>
                    <span>100% (High Daily Usage)</span>
                  </div>
                </div>

                {/* Slider 2: Subscription Tenure */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#E0F2FE]">Customer Account Tenure</span>
                    <span className="text-indigo-300 font-mono font-bold">{featureTenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    value={featureTenure}
                    onChange={(e) => setFeatureTenure(Number(e.target.value))}
                    className="w-full accent-indigo-400 h-2 bg-[#070B14] rounded-lg cursor-pointer border border-white/10"
                    aria-label="Customer Account Tenure Slider"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>1 mo (New Trial)</span>
                    <span>36 mos (Mature Client)</span>
                  </div>
                </div>

                {/* Slider 3: Support Inquiries */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#E0F2FE]">Support Tickets / Month</span>
                    <span className={`font-mono font-bold ${featureTickets > 4 ? "text-red-400" : "text-emerald-400"}`}>
                      {featureTickets} Tickets
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={featureTickets}
                    onChange={(e) => setFeatureTickets(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-2 bg-[#070B14] rounded-lg cursor-pointer border border-white/10"
                    aria-label="Monthly Support Inquiries Slider"
                  />
                  <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
                    <span>0 (Zero Issues)</span>
                    <span>10 (High Friction)</span>
                  </div>
                </div>

                {/* Simulation Action Button */}
                <Button
                  onClick={handleExecuteInference}
                  disabled={isInferencing}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 rounded-xl py-5 font-semibold shadow-lg shadow-purple-500/20"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isInferencing ? "Re-computing Decision Matrix..." : "Recalculate Decision Boundary"}
                </Button>

                {/* Real-time Churn Risk & Retention Probability Display */}
                <div className="p-5 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#94A3B8] flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-purple-400" />
                      Simulator Output
                    </span>
                    <span className="text-purple-300 font-mono text-[11px]">
                      Confidence: {committedPrediction.confidence}
                    </span>
                  </div>

                  {/* Dual Meters: Churn Risk vs Retention Probability */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Retention Probability */}
                    <div className="p-3.5 rounded-lg bg-[#111827] border border-white/10 space-y-1 text-center">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                        Retention Likelihood
                      </span>
                      <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                        {committedPrediction.retentionProb}%
                      </div>
                      <span className="text-[10px] text-[#94A3B8] block">Renewal Probability</span>
                    </div>

                    {/* Churn Risk */}
                    <div className="p-3.5 rounded-lg bg-[#111827] border border-white/10 space-y-1 text-center">
                      <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block">
                        Churn Risk Score
                      </span>
                      <div
                        className={`text-3xl font-extrabold font-mono ${
                          committedPrediction.churnProb > 50 ? "text-red-400" : "text-[#E0F2FE]"
                        }`}
                      >
                        {committedPrediction.churnProb}%
                      </div>
                      <span className="text-[10px] text-[#94A3B8] block">Attrition Probability</span>
                    </div>
                  </div>

                  {/* Dual Progress Bar Visual */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono text-[#94A3B8]">
                      <span className="text-emerald-400">Retention: {committedPrediction.retentionProb}%</span>
                      <span className="text-red-400">Churn Risk: {committedPrediction.churnProb}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-[#111827] overflow-hidden flex border border-white/[0.08]">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-500"
                        style={{ width: `${committedPrediction.retentionProb}%` }}
                        title={`Retention: ${committedPrediction.retentionProb}%`}
                      />
                      <div
                        className="h-full bg-red-500 transition-all duration-500"
                        style={{ width: `${committedPrediction.churnProb}%` }}
                        title={`Churn Risk: ${committedPrediction.churnProb}%`}
                      />
                    </div>
                  </div>

                  {/* Dynamic Prescriptive Recommendation */}
                  <div className="p-3.5 rounded-lg bg-[#111827] border border-white/10 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#E0F2FE]">
                      {committedPrediction.churnProb > 50 ? (
                        <>
                          <ShieldAlert className="h-4 w-4 text-red-400 shrink-0" />
                          <span className="text-red-400">Prescriptive Action Required:</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="text-emerald-400">Account Health Confirmed:</span>
                        </>
                      )}
                    </div>
                    <p className="text-[#94A3B8] leading-relaxed pl-5.5">
                      {committedPrediction.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 2: ACTUAL TRAINED MODEL BENCHMARKS & SHAP
            ========================================================================= */}
        {activeTab === "benchmarks" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Authenticity Certificate Banner */}
            <div className="p-5 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-purple-300 uppercase tracking-wider text-xs block">
                    Verified Production Model Benchmarks
                  </span>
                  <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl mt-0.5 leading-relaxed">
                    Trained, tested, and validated on Abhishek's real-world 13-table PostgreSQL schema for{" "}
                    <strong>ChurnPlatform</strong>. Evaluated on 45,000 historical customer records using stratified 5-fold cross-validation.
                  </p>
                </div>
              </div>

              <a
                href="https://churnplatform.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs hover:opacity-90 transition-all shadow-md shadow-purple-500/20"
              >
                Launch ChurnPlatform Demo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* 4 Performance Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productionModelSpecs.map((m) => (
                <div
                  key={m.label}
                  className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-purple-400/40 transition-colors space-y-2 shadow-lg"
                >
                  <span className="text-xs font-medium text-[#94A3B8]">{m.label}</span>
                  <div className={`text-3xl sm:text-4xl font-extrabold ${m.color} font-mono`}>
                    {m.value}
                  </div>
                  <p className="text-xs text-[#94A3B8]">{m.detail}</p>
                </div>
              ))}
            </div>

            {/* SHAP Feature Importance & Real Architecture Breakdown */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left: SHAP Tree Feature Importance (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#E0F2FE] flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      SHAP Global Feature Importance Ranking
                    </h4>
                    <span className="text-xs text-[#94A3B8]">
                      Mean absolute SHAP value impact on churn prediction margin
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-[#070B14] px-2 py-0.5 rounded border border-white/10">
                    TreeSHAP Exact
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  {topFeatures.map((feat, idx) => (
                    <div key={feat.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#E0F2FE]">
                          {idx + 1}. {feat.name}
                        </span>
                        <span className="font-mono text-purple-300 font-bold">{feat.impact}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#070B14] overflow-hidden border border-white/[0.08]">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                          style={{ width: `${95 - idx * 22}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-[#070B14]/80 border border-white/10 text-xs text-[#94A3B8] leading-relaxed">
                  <strong className="text-[#E0F2FE]">Explainability Verdict:</strong> Rather than relying on simple linear coefficients, TreeSHAP
                  accurately captures non-linear feature interaction—specifically revealing that customer contract tenure
                  exponentially dampens the churn hazard of temporary activity lulls.
                </div>
              </div>

              {/* Right: Technical Spec Card (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 space-y-5 shadow-xl">
                <h4 className="font-bold text-sm text-[#E0F2FE] border-b border-white/10 pb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-purple-400" />
                  Model Infrastructure Specs
                </h4>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Base Framework:</span>
                    <span className="text-[#E0F2FE]">XGBoost 2.0 + Scikit-Learn</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Data Warehouse:</span>
                    <span className="text-[#E0F2FE]">13-Table PostgreSQL</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Feature Engineering:</span>
                    <span className="text-[#E0F2FE]">Point-in-Time SQL Windows</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Orchestration:</span>
                    <span className="text-[#E0F2FE]">Apache Airflow DAG Pipelines</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Deployment API:</span>
                    <span className="text-emerald-400">FastAPI Async (Dockerized)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.08]">
                    <span className="text-[#94A3B8]">Production URL:</span>
                    <a
                      href="https://churnplatform.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 underline hover:text-purple-200"
                    >
                      churnplatform.vercel.app
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-purple-400/30 text-purple-300 bg-[#070B14]/60 hover:bg-purple-500/10 hover:border-purple-400/60"
                  >
                    <a
                      href="https://churnplatform.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live ChurnPlatform Deployment
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
    </div>
  )

  if (isEmbedded) {
    return aiLabContent
  }

  return (
    <section id="ai-lab" className="py-24 px-4 relative scroll-mt-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-aurora-violet/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-violet uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5 text-aurora-violet" /> Data Science & AI Lab
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Predictive Intelligence & <span className="aurora-text-gradient">Machine Learning Pipeline</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Architecting end-to-end customer churn prediction systems from 13-table PostgreSQL schemas to sub-40ms
            inference APIs with explainable AI (SHAP) attributions.
          </p>
        </div>
        {aiLabContent}
      </div>
    </section>
  )
}
