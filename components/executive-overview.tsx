"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Layers,
  Database,
  CheckCircle2,
  Cpu,
  Zap,
  Award,
  Globe2,
  TrendingUp,
} from "lucide-react"

interface MetricItem {
  id: string
  value: string
  label: string
  context: string
  subtext: string
  icon: React.ComponentType<{ className?: string }>
  accent: string
  borderAccent: string
}

const verifiedMetrics: MetricItem[] = [
  {
    id: "apps",
    value: "4",
    label: "Production Web Apps",
    context: "Deployed & Publicly Live",
    subtext: "ChurnPlatform, SuperShopy, Elevate Technologies & QA-Pramaan",
    icon: Globe2,
    accent: "text-aurora-cyan",
    borderAccent: "border-aurora-cyan/30",
  },
  {
    id: "transactions",
    value: "1.2M+",
    label: "Monitored Transactions",
    context: "Data Pipeline Modeling",
    subtext: "Processed across OmniChannel Revenue & retention analytics schemas",
    icon: TrendingUp,
    accent: "text-aurora-blue",
    borderAccent: "border-aurora-blue/30",
  },
  {
    id: "schema",
    value: "13",
    label: "Relational Schema Tables",
    context: "PostgreSQL 16 Architecture",
    subtext: "Engineered with temporal integrity, anomaly constraints & Airflow DAGs",
    icon: Database,
    accent: "text-indigo-400",
    borderAccent: "border-indigo-400/30",
  },
  {
    id: "ml-accuracy",
    value: "96.4%",
    label: "ML Validation Accuracy",
    context: "XGBoost 2.0 Classifier",
    subtext: "95.2% recall on 45,000 records with TreeSHAP decision transparency",
    icon: Cpu,
    accent: "text-aurora-violet",
    borderAccent: "border-aurora-violet/30",
  },
  {
    id: "latency",
    value: "<40ms",
    label: "P95 Inference Latency",
    context: "FastAPI REST Microservice",
    subtext: "Asynchronous Python scoring engine with sub-2ms connection pooling",
    icon: Zap,
    accent: "text-emerald-400",
    borderAccent: "border-emerald-400/30",
  },
  {
    id: "salesforce",
    value: "100+",
    label: "Trailhead Badges",
    context: "Platform Developer I",
    subtext: "Certified in Apex, Lightning Web Components & enterprise integrations",
    icon: Award,
    accent: "text-amber-400",
    borderAccent: "border-amber-400/30",
  },
]

export function ExecutiveOverview() {
  return (
    <section id="overview" className="py-20 px-4 relative scroll-mt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-aurora-blue/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#26324A]/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 text-aurora-cyan" /> Executive Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Verified Technical Benchmarks &bull;{" "}
              <span className="aurora-text-gradient">Real Engineering Footprint</span>
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Every metric below is grounded in actual shipping software, production database schemas, and trained machine learning pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3.5 py-2 rounded-xl self-start md:self-auto">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Zero Fabricated Statistics &bull; Production Grounded</span>
          </div>
        </div>

        {/* 6 Metric Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedMetrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 relative group shadow-xl flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top Row: Icon + Context Tag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#070B14]/80 border border-white/10 flex items-center justify-center">
                    <Icon className={`h-5 w-5 ${metric.accent}`} />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E0F2FE] bg-[#070B14]/80 px-2.5 py-1 rounded-md border border-white/10">
                    {metric.context}
                  </span>
                </div>

                {/* Big Value + Label */}
                <div className="space-y-1 mb-4">
                  <div className={`text-4xl sm:text-5xl font-black tracking-tight ${metric.accent}`}>
                    {metric.value}
                  </div>
                  <h3 className="text-base font-bold text-[#E0F2FE] tracking-tight">
                    {metric.label}
                  </h3>
                </div>

                {/* Grounding Subtext */}
                <p className="text-xs text-[#94A3B8] leading-relaxed border-t border-white/10 pt-3">
                  {metric.subtext}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Executive Summary Architecture Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-2xl border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-aurora-cyan flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Multidisciplinary Engineering Command
            </span>
            <p className="text-sm sm:text-base text-[#E0F2FE] leading-relaxed">
              Bridging the gap between <strong>rigorous quantitative analysis</strong> and <strong>scalable full-stack infrastructure</strong>. From SQL window calculations and Airflow batch orchestration to high-concurrency Next.js/FastAPI apps with explainable AI models.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <a
              href="#career-pillars"
              className="text-xs font-bold font-mono text-[#E0F2FE] bg-[#070B14]/80 hover:bg-white/[0.08] border border-white/15 px-4 py-2.5 rounded-xl transition-colors"
            >
              Explore 4 Pillars &rarr;
            </a>
            <a
              href="#projects"
              className="text-xs font-bold font-mono text-slate-950 bg-gradient-to-r from-aurora-cyan to-aurora-blue px-4 py-2.5 rounded-xl hover:opacity-95 shadow-md shadow-aurora-cyan/20 transition-opacity"
            >
              View Flagship Projects &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
