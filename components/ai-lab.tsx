"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Play, CheckCircle2, Sliders, Sparkles, Layers, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiLab() {
  const [featureEngagement, setFeatureEngagement] = useState(78)
  const [featureTenure, setFeatureTenure] = useState(14)
  const [isInferencing, setIsInferencing] = useState(false)
  const [predictionResult, setPredictionResult] = useState<{
    risk: "Low Risk" | "High Risk"
    probability: number
    label: string
  }>({
    risk: "Low Risk",
    probability: 14.2,
    label: "Likely to Renew / Expand",
  })

  const pipelineSteps = [
    { step: "01", name: "Data Ingestion", desc: "Multi-source tabular, telemetry & support tickets" },
    { step: "02", name: "Data Cleaning", desc: "Outlier suppression, imputation & categorical encoding" },
    { step: "03", name: "Feature Engineering", desc: "Cohort behavioral lags & sentiment embeddings" },
    { step: "04", name: "ML Architecture", desc: "XGBoost + Transformer ensemble model" },
    { step: "05", name: "Cross Evaluation", desc: "5-fold stratified cross-validation" },
    { step: "06", name: "Real-Time Inference", desc: "Sub-40ms REST microservice scoring" },
  ]

  const metrics = [
    { label: "Validation Accuracy", value: "96.4%", desc: "+3.2% over baseline" },
    { label: "Precision Score", value: "94.8%", desc: "Low false positives" },
    { label: "Recall Rate", value: "95.2%", desc: "Catches 95% of churn events" },
    { label: "F1 Score", value: "0.950", desc: "Harmonic balanced mean" },
  ]

  const runSimulation = () => {
    setIsInferencing(true)
    setTimeout(() => {
      setIsInferencing(false)
      const calculatedProbability = Math.max(
        5,
        Math.min(95, Math.round(100 - (featureEngagement * 0.7 + featureTenure * 1.5))),
      )
      setPredictionResult({
        risk: calculatedProbability > 50 ? "High Risk" : "Low Risk",
        probability: calculatedProbability,
        label:
          calculatedProbability > 50
            ? "Requires Immediate Customer Success Intervention"
            : "Strong Account Health (High Retention Probability)",
      })
    }, 450)
  }

  return (
    <section id="ai-lab" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-violet uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" /> Data Science & AI Lab
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Predictive Intelligence & <span className="aurora-text-gradient">Machine Learning Pipeline</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            From raw features to deployable inference engines. Architecting models with high precision,
            explainable decisions, and real-time inference latency.
          </p>
        </div>

        {/* 6-Step Visual Architecture Pipeline */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-[#0B1020]/90 border border-[#26324A] shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#26324A]/70 flex-wrap gap-2">
            <span className="text-xs uppercase tracking-wider font-bold text-[#94A3B8]">
              Automated MLOps Production Flow
            </span>
            <span className="text-xs font-mono text-aurora-cyan">End-to-End Pipeline</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelineSteps.map((p, idx) => (
              <div
                key={p.step}
                className="p-4 rounded-xl bg-[#111827]/80 border border-[#26324A]/70 space-y-2 relative group hover:border-aurora-violet/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-aurora-violet">{p.step}</span>
                  {idx < pipelineSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-[#94A3B8]/40 hidden lg:block" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-[#F8FAFC] group-hover:text-aurora-cyan transition-colors">
                  {p.name}
                </h4>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-6 rounded-2xl bg-[#0B1020]/90 border border-[#26324A] hover:border-aurora-violet/40 transition-colors space-y-2"
            >
              <span className="text-xs font-medium text-[#94A3B8]">{m.label}</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] aurora-text-gradient">
                {m.value}
              </div>
              <p className="text-xs text-emerald-400 font-mono">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Model Simulator Playground */}
        <div className="grid lg:grid-cols-12 gap-8 items-center rounded-2xl bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#151D32] border border-[#26324A] p-6 sm:p-8 shadow-2xl">
          {/* Left: Interactive Input Sliders (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aurora-violet/15 text-aurora-violet text-xs font-semibold mb-2">
                <Sliders className="h-3.5 w-3.5" /> Interactive Model Playground
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="text-2xl font-bold text-[#F8FAFC]">Live Churn & Retention Scoring</h3>
                <a
                  href="https://churnplatform.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-all"
                >
                  churnplatform.vercel.app
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                Tune customer behavioral parameters below and run inference against the trained classification model.
              </p>
            </div>

            {/* Slider 1: User Engagement Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#F8FAFC]">Product Activity Index (DAU/MAU)</span>
                <span className="text-aurora-cyan font-mono">{featureEngagement}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={featureEngagement}
                onChange={(e) => setFeatureEngagement(Number(e.target.value))}
                className="w-full accent-aurora-cyan h-2 bg-[#151D32] rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2: Account Tenure Months */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#F8FAFC]">Subscription Tenure (Months)</span>
                <span className="text-aurora-violet font-mono">{featureTenure} Months</span>
              </div>
              <input
                type="range"
                min="1"
                max="36"
                value={featureTenure}
                onChange={(e) => setFeatureTenure(Number(e.target.value))}
                className="w-full accent-aurora-violet h-2 bg-[#151D32] rounded-lg cursor-pointer"
              />
            </div>

            <Button
              onClick={runSimulation}
              disabled={isInferencing}
              className="bg-gradient-to-r from-aurora-violet to-aurora-purple text-white hover:opacity-90 rounded-xl px-6 font-semibold"
            >
              <Play className="h-4 w-4 mr-2" />
              {isInferencing ? "Computing Matrix..." : "Execute Real-Time Inference"}
            </Button>
          </div>

          {/* Right: Live Model Prediction Output (6 cols) */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#070B14]/90 border border-[#26324A] space-y-5">
            <div className="flex items-center justify-between text-xs border-b border-[#26324A]/70 pb-3">
              <span className="font-mono text-[#94A3B8]">Model: XGBoost_Classifier_v3.2</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Active Endpoint
              </span>
            </div>

            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold">Predicted Risk Category</div>
              <div className="flex items-center justify-between">
                <div
                  className={`text-2xl sm:text-3xl font-extrabold ${
                    predictionResult.risk === "High Risk" ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {predictionResult.risk}
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-[#F8FAFC]">
                    {predictionResult.probability}%
                  </div>
                  <div className="text-[10px] text-[#94A3B8]">Churn Probability</div>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="w-full h-2 rounded-full bg-[#151D32] overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    predictionResult.probability > 50 ? "bg-red-500" : "bg-emerald-400"
                  }`}
                  style={{ width: `${predictionResult.probability}%` }}
                />
              </div>

              <div className="p-3 rounded-lg bg-[#111827] border border-[#26324A]/60 text-xs text-[#94A3B8]">
                <strong>Insight:</strong> {predictionResult.label}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
