"use client"

import React from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  BrainCircuit, 
  Code2, 
  Cloud, 
  Palette, 
  Camera, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles 
} from "lucide-react"

interface ServiceItem {
  id: string
  title: string
  tagline: string
  description: string
  icon: React.ElementType
  deliverables: string[]
  accentColor: string
  gradient: string
  anchorLink: string
}

const services: ServiceItem[] = [
  {
    id: "data-analytics",
    title: "Data Analytics & BI",
    tagline: "Turn complex datasets into actionable insights.",
    description: "Transforming disorganized raw data into automated executive dashboards, statistical KPIs, and commercial intelligence models that drive revenue and operational efficiency.",
    icon: BarChart3,
    deliverables: ["Interactive Power BI / Tableau Dashboards", "Automated SQL Ingestion Pipelines", "Cohort & Retention Telemetry", "Executive KPI Reporting"],
    accentColor: "border-cyan-500/30 group-hover:border-cyan-400",
    gradient: "from-cyan-500/20 to-transparent",
    anchorLink: "#data-analytics"
  },
  {
    id: "ai-data-science",
    title: "Data Science & AI",
    tagline: "Build predictive and intelligent systems.",
    description: "Architecting machine learning pipelines, LLM-powered interfaces, predictive forecasting models, and automated classification systems tuned for precision.",
    icon: BrainCircuit,
    deliverables: ["Predictive Churn & Demand Forecasting", "End-to-End MLOps Training & Inference", "LLM Prompt Engineering & RAG Systems", "Anomaly Detection Pipelines"],
    accentColor: "border-purple-500/30 group-hover:border-purple-400",
    gradient: "from-purple-500/20 to-transparent",
    anchorLink: "#ai-lab"
  },
  {
    id: "fullstack-development",
    title: "Full-Stack Development",
    tagline: "Build scalable, modern web applications.",
    description: "Crafting robust, high-performance web applications using modern JavaScript/TypeScript ecosystems, microservices, secure authentication, and cloud databases.",
    icon: Code2,
    deliverables: ["Next.js & React Single Page Applications", "Secure Node.js & Express REST/GraphQL APIs", "PostgreSQL & MongoDB Database Schema", "Production Vercel/AWS Cloud Deployments"],
    accentColor: "border-emerald-500/30 group-hover:border-emerald-400",
    gradient: "from-emerald-500/20 to-transparent",
    anchorLink: "#architecture"
  },
  {
    id: "salesforce-solutions",
    title: "Salesforce Development",
    tagline: "Create customized CRM solutions and automation.",
    description: "Empowering business workflows with bespoke Lightning Web Components, scalable Apex trigger architectures, complex Flow automations, and enterprise third-party API integrations.",
    icon: Cloud,
    deliverables: ["Custom Lightning Web Components (LWC)", "Bulkified Apex Triggers & Test Classes", "Sales & Service Cloud Flow Automation", "Third-Party REST API Data Integrations"],
    accentColor: "border-blue-500/30 group-hover:border-blue-400",
    gradient: "from-blue-500/20 to-transparent",
    anchorLink: "#salesforce"
  },
  {
    id: "uiux-design",
    title: "UI/UX Product Design",
    tagline: "Design intuitive digital experiences.",
    description: "Bridging human psychology and software architecture through comprehensive design systems, high-fidelity clickable Figma prototypes, and accessible token hierarchies.",
    icon: Palette,
    deliverables: ["Figma Design Systems & Atomic Components", "High-Fidelity Mobile & Web Wireframing", "Usability Testing & Empathy Journeys", "Production CSS & Motion Specification"],
    accentColor: "border-pink-500/30 group-hover:border-pink-400",
    gradient: "from-pink-500/20 to-transparent",
    anchorLink: "#design"
  },
  {
    id: "photography-services",
    title: "Commercial Photography",
    tagline: "Create professional visual stories and content.",
    description: "Producing cinematic, high-resolution imagery for personal branding, architecture, editorial lookbooks, and corporate narratives with deliberate lighting and optical precision.",
    icon: Camera,
    deliverables: ["Architectural & Interior Showcase", "Executive & Creative Portraits", "Commercial Product Imagery", "Complete Color Grading & Digital Retouching"],
    accentColor: "border-amber-500/30 group-hover:border-amber-400",
    gradient: "from-amber-500/20 to-transparent",
    anchorLink: "#photography"
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070B14] overflow-hidden border-t border-[#26324A]/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/5 via-purple-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Capabilities & Offerings
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Digital Services
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            One partner bridging analytical rigor, robust software engineering, enterprise CRM automation, and high-impact visual aesthetics.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group relative p-7 rounded-2xl bg-[#0F162B] border ${service.accentColor} shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                {/* Subtle Gradient Backlight */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${service.gradient} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity`} />

                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#151D32] border border-[#26324A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all">
                    <Icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wide mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-4 border-t border-[#26324A]/70">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-6 border-t border-[#26324A]/60 flex items-center justify-between">
                  <a
                    href={service.anchorLink}
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Explore Lab Module
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151D32] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-[#26324A] hover:border-transparent group-hover:shadow-md"
                  >
                    Request Service
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
