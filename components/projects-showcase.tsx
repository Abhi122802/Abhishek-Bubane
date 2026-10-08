"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Layers, ArrowUpRight, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProjectsShowcase() {
  const categories = ["All", "Data", "AI", "Full Stack", "Salesforce", "UI/UX"]
  const [activeCategory, setActiveCategory] = useState("All")

  const projects = [
    {
      id: "str-analytics-platform",
      title: "STR Analytics Platform",
      category: "Data",
      tag: "Data Analytics • DJRB Services",
      featured: true,
      description:
        "Full-cycle data analytics and business intelligence system encompassing data ingestion, cleaning, structured relational modeling, and executive KPI dashboards.",
      problem: "Raw operational datasets suffered from format inconsistencies, missing records, and lack of centralized executive visibility.",
      solution: "Authored optimized SQL scripts for table joins and aggregation, created comprehensive data validation rules, and built interactive executive dashboard views.",
      impact: "Eliminated reporting errors while providing leadership with immediate insights into operational performance and key business growth trends.",
      technologies: ["SQL", "PostgreSQL", "Data Modeling", "ETL Pipelines", "Executive Dashboards", "Data Validation"],
      github: "https://github.com/Abhi122802",
      demo: "https://github.com/Abhi122802",
      metric: "Automated Data Validation & Reporting",
    },
    {
      id: "mortgage-loan-appraisal-verifier",
      title: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
      category: "Full Stack",
      tag: "FinTech Compliance • qa-pramaan.vercel.app",
      featured: true,
      description:
        "Automated auditing software verifying mortgage loan appraisal files against compliance rules with Python/Django backend APIs and a reactive React audit interface.",
      problem: "Manual appraisal report reviews were slow, labor-intensive, and prone to overlooking missing file attributes and underwriting rule mismatches.",
      solution: "Engineered automated rule-checking logic in Python, Django, and SQL with a fast React frontend connected via backend auditing APIs.",
      impact: "Enabled rapid, high-accuracy loan file audits, flagging missing attributes, mismatched values, and compliance issues in seconds.",
      technologies: ["Python", "Django", "SQL", "React", "REST APIs", "Automated Auditing"],
      github: "https://github.com/Abhi122802",
      demo: "https://qa-pramaan.vercel.app/",
      metric: "Instant Underwriting Auditing",
    },
    {
      id: "sales-analytics-engine",
      title: "OmniChannel Revenue & Cohort Analytics Platform",
      category: "Data",
      tag: "Data Analytics & BI",
      featured: false,
      description:
        "High-performance automated data analytics pipeline processing over 1.2M transactions to identify customer cohort churn and forecast quarterly sales.",
      problem: "Marketing & sales leadership had fragmented CSVs with a 2-week lag in revenue reporting and no cohort retention clarity.",
      solution: "Engineered an automated SQL/Python pipeline feeding interactive Power BI dashboards with real-time conversion and LTV cohort tracking.",
      impact: "Reduced reporting turnaround from 14 days to real-time; discovered $140K in cross-sell customer cohorts.",
      technologies: ["SQL", "Python", "Power BI", "Pandas", "PostgreSQL", "Data Modeling"],
      github: "https://github.com/Abhi122802",
      demo: "https://github.com/Abhi122802",
      metric: "+24% Retention Insight",
    },
    {
      id: "churn-platform",
      title: "ChurnPlatform – AI Customer Analytics & Retention Engine",
      category: "AI",
      tag: "AI & Retention Engine • Live Production",
      featured: true,
      description:
        "Engineered an end-to-end customer predictive analytics platform with a 13-table PostgreSQL schema, point-in-time feature extraction, and XGBoost models to predict churn risk. Explained predictions to non-technical teams, configured Airflow automated pipelines, and built a React dashboard powered by FastAPI.",
      problem: "Customer success teams lacked early predictive signals to identify high-risk customer accounts before cancellation, suffering from fragmented data silos.",
      solution: "Engineered point-in-time feature extraction on a 13-table PostgreSQL schema, trained XGBoost models, orchestrated Airflow pipelines, and deployed a FastAPI backend serving a real-time React dashboard.",
      impact: "Empowered business and technical teams with actionable churn risk scores and automated alert pipelines.",
      technologies: ["Python", "SQL", "PostgreSQL", "XGBoost", "FastAPI", "Airflow", "React", "Docker", "AWS"],
      github: "https://github.com/Abhi122802",
      demo: "https://churnplatform.vercel.app",
      metric: "Live AI Retention Engine",
    },
    {
      id: "supershopy-platform",
      title: "SuperShopy – Quick-Commerce Delivery & Logistics Platform",
      category: "Full Stack",
      tag: "Logistics & Quick-Commerce • Live Production",
      featured: true,
      description:
        "Designed a multi-tenant delivery system with client storefronts, warehouse portals, admin dashboards, and a driver app; built immutable order checkout snapshots to prevent data inconsistencies. Built courier verification via HTML5-Qrcode SDK scanning and hardened backend APIs with rate limiting, Helmet headers, and Role-Based Access Control (RBAC).",
      problem: "High-frequency quick-commerce delivery required synchronous state synchronization across storefronts, warehouse teams, and delivery couriers without order data drift.",
      solution: "Engineered multi-tenant architecture with client storefronts, warehouse portals, admin dashboards, and driver apps. Implemented immutable order checkout snapshots, HTML5-Qrcode courier scanning, and enterprise security with rate limiting, Helmet, and RBAC.",
      impact: "Achieved seamless end-to-end order handoffs with QR-verified proof of delivery and zero checkout data inconsistencies.",
      technologies: ["Node.js", "Express", "TypeScript", "MongoDB", "React", "Tailwind CSS", "Docker", "JWT"],
      github: "https://github.com/Abhi122802",
      demo: "https://supershopy.vercel.app",
      metric: "Multi-Tenant & QR Verification",
    },
    {
      id: "elevate-tech-platform",
      title: "Elevate Technology – E-Commerce & SaaS Licensing Platform",
      category: "Full Stack",
      tag: "SaaS Licensing & E-Commerce • Live Production",
      featured: true,
      description:
        "Built an e-commerce platform with automated hardware node-locked licensing keys, Razorpay payments, real-time stock updates, and automated tax (CGST/SGST) ledger logic. Created an interactive ROI calculator tool in React and secured backend routes using JWT auth, CORS whitelisting, and system audit logging (AuditLog).",
      problem: "Digital licensing sales struggled with manual license generation, untracked node lock-ins, tax ledger reconciliation, and customer drop-offs during complex evaluation.",
      solution: "Built a React 19 storefront with Redux Toolkit and Node.js/Express backend. Integrated automated hardware node-locked key generators, Razorpay payments, automated CGST/SGST tax accounting, interactive ROI calculator, and JWT auth with AuditLog tracking.",
      impact: "Automated instant hardware-bound key delivery, ensured automated tax compliance, and increased conversion via interactive ROI tooling.",
      technologies: ["React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Razorpay API", "AuditLog"],
      github: "https://github.com/Abhi122802",
      demo: "https://elevatetechnologies.in",
      metric: "Automated Node-Locked Licensing",
    },
    {
      id: "salesforce-crm-lead-engine",
      title: "Enterprise Lead Automation & Apex Lightning CRM",
      category: "Salesforce",
      tag: "Salesforce PD-I Certified",
      featured: false,
      description:
        "Comprehensive custom Salesforce application automating inbound lead scoring, round-robin assignment, and executive Lightning dashboard reports.",
      problem: "Sales representatives spent 3+ hours daily manually sorting unqualified leads and updating opportunity stages.",
      solution: "Built custom Apex Trigger frameworks, asynchronous batch jobs, custom SOQL queries, and reactive Lightning Web Components (LWC).",
      impact: "Eliminated manual lead triage, saving 15+ hours weekly per sales rep with automated qualification rules.",
      technologies: ["Salesforce", "Apex", "LWC", "SOQL", "Flows", "Salesforce DX"],
      github: "https://github.com/Abhi122802",
      demo: "https://github.com/Abhi122802",
      metric: "15hrs/week Saved",
    },
    {
      id: "fintech-mobile-banking",
      title: "Fintech Mobile Banking App & Design System",
      category: "UI/UX",
      tag: "Product Design & Research",
      featured: false,
      description:
        "Human-centered UI/UX design architecture for next-generation mobile banking, complete with atomic component library, micro-interactions, and accessibility testing.",
      problem: "Users experienced cognitive overload and drop-offs during international money transfers and investment onboarding.",
      solution: "Conducted 15+ user interview sessions, created low-to-high fidelity interactive Figma prototypes, and built an 8pt grid design system.",
      impact: "User task completion rate improved by 38% in usability testing benchmarks.",
      technologies: ["Figma", "Design Systems", "User Research", "Wireframing", "Interaction Design"],
      github: "https://github.com/Abhi122802",
      demo: "https://github.com/Abhi122802",
      metric: "+38% Task Completion",
    },
    {
      id: "iot-sensor-stream",
      title: "Real-Time Android Sensor Telemetry & Telematics",
      category: "Full Stack",
      tag: "IoT & Mobile Engineering",
      featured: false,
      description:
        "Connected mobile application capturing high-frequency environmental sensor data (temperature, humidity, motion) with cloud sync for Sathe Engineering.",
      problem: "Industrial machines required constant physical inspection without historical sensor logging.",
      solution: "Engineered an Android telemetry client communicating via REST APIs with cloud storage and anomaly alerts.",
      impact: "Deployed on active production machines with continuous real-time uptime monitoring.",
      technologies: ["Android", "Java", "REST APIs", "Node.js", "IoT Protocols"],
      github: "https://github.com/Abhi122802",
      demo: "https://github.com/Abhi122802",
      metric: "99.9% Telemetry Uptime",
    },
  ]

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="projects" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" /> Project Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Selected Works & <span className="aurora-text-gradient">Case Studies</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Real systems built across the spectrum of data intelligence, machine learning, modern software, Salesforce, and product design.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-aurora-blue via-aurora-violet to-aurora-purple text-white shadow-md shadow-aurora-blue/20"
                  : "bg-[#0B1020] text-[#94A3B8] border border-[#26324A] hover:text-[#F8FAFC] hover:border-aurora-cyan/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Editorial Grid */}
        <motion.div layout className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl p-7 bg-[#0B1020]/95 border border-[#26324A] hover:border-aurora-cyan/40 transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                  project.featured ? "lg:col-span-2 bg-gradient-to-br from-[#0B1020] via-[#111827] to-[#151D32]" : ""
                }`}
              >
                <div className="space-y-6">
                  {/* Top Bar: Tag & Metric */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-aurora-blue/15 text-aurora-blue border-aurora-blue/30 text-xs font-mono">
                        {project.tag}
                      </Badge>
                      <Badge variant="outline" className="border-[#26324A] text-[#94A3B8] text-xs">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <TrendingUp className="h-3 w-3" />
                      {project.metric}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-[#F8FAFC] group-hover:text-aurora-cyan transition-colors mb-3">
                      {project.title}
                    </h3>
                    <p className="text-[#94A3B8] leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Problem & Solution Accordion-style layout */}
                  <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#070B14]/80 border border-[#26324A]/60">
                    <div>
                      <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider mb-1">
                        The Challenge
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-aurora-cyan uppercase tracking-wider mb-1">
                        The Engineered Solution
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#151D32] text-[#F8FAFC]/80 border border-[#26324A]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-6 border-t border-[#26324A]/70 mt-6 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-aurora-blue to-aurora-violet text-white hover:opacity-90 rounded-xl text-xs font-semibold"
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-[#26324A] bg-[#111827] text-[#F8FAFC] hover:bg-[#151D32] rounded-xl text-xs"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        Source Code
                      </a>
                    </Button>
                  </div>

                  <span className="text-xs font-medium text-[#94A3B8]">
                    Results: <strong className="text-emerald-400 font-semibold">{project.impact}</strong>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
