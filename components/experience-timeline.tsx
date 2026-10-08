"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code2, 
  Cloud, 
  Database, 
  Calendar, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react"

interface TimelineProject {
  name: string
  points: string[]
}

interface TimelineEvent {
  id: string
  type: "experience" | "internship" | "education" | "salesforce" | "data"
  title: string
  organization: string
  location: string
  period: string
  description: string
  projects?: TimelineProject[]
  achievements?: string[]
  skills: string[]
  badgeColor: string
}

const timelineData: TimelineEvent[] = [
  {
    id: "exp-djrb-analyst",
    type: "experience",
    title: "Data Analyst",
    organization: "DJRB SERVICES",
    location: "Pune, India",
    period: "Dec 2025 – Present",
    description: "Leading data operations, SQL data pipeline optimization, executive intelligence dashboards, and automated mortgage appraisal audit software.",
    projects: [
      {
        name: "STR Analytics Platform",
        points: [
          "Handled step-by-step data work including collecting raw details, cleaning datasets, structuring database models, and generating business performance reports.",
          "Wrote clean, optimized SQL scripts to join, aggregate, and prepare raw operational data for reporting.",
          "Set up data validation rules to find missing values, wrong formatting, and rule violations across database records.",
          "Built executive dashboard views to highlight key business metrics and trend insights for decision-makers."
        ]
      },
      {
        name: "Mortgage Loan Appraisal Report Verification Software (QA-Pramaan)",
        points: [
          "Built automated rule-checking logic using Python, Django, SQL, and React to verify mortgage loan files.",
          "Created validation logic to catch missing attributes, mismatched values, and compliance issues across loan entries.",
          "Connected backend API checking logic to a React user screen for simple, rapid loan auditing (qa-pramaan.vercel.app)."
        ]
      }
    ],
    skills: ["Python", "Django", "SQL", "PostgreSQL", "React", "Data Modeling", "ETL Pipelines", "Executive Dashboards", "Compliance Logic"],
    badgeColor: "border-cyan-500/40 text-cyan-400 bg-cyan-950/30"
  },
  {
    id: "exp-elevate-freelance",
    type: "experience",
    title: "Freelance Web & Application Developer",
    organization: "Elevate Technologies",
    location: "Pune, India",
    period: "2025 – Present",
    description: "Architected and delivered the full-stack E-Commerce & SaaS Licensing Platform (elevatetechnologies.in) for Elevate Technologies, engineering automated licensing keys, Razorpay checkout, and ROI calculation tools.",
    achievements: [
      "Built an e-commerce platform with automated hardware node-locked licensing keys, Razorpay payments, real-time stock updates, and automated tax (CGST/SGST) ledger logic",
      "Created an interactive ROI calculator tool in React and secured backend routes using JWT auth, CORS whitelisting, and system audit logging (AuditLog)",
      "Engineered high-performance React 19 interfaces with Redux Toolkit and Node.js/Express backend APIs"
    ],
    skills: ["React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Razorpay API", "AuditLog"],
    badgeColor: "border-pink-500/40 text-pink-400 bg-pink-950/30"
  },
  {
    id: "exp-djrb-intern",
    type: "internship",
    title: "Data Analyst Intern",
    organization: "DJRB SERVICES",
    location: "Pune, India",
    period: "Jun 2025 – Nov 2025",
    description: "Prepared and transformed enterprise data foundations, engineering structured PostgreSQL datasets for recurring executive business analytics.",
    achievements: [
      "Cleaned, normalized, and transformed raw data before importing it into PostgreSQL databases.",
      "Wrote PostgreSQL queries to build datasets for weekly and monthly business analytics reports."
    ],
    skills: ["PostgreSQL", "SQL Queries", "Data Cleaning", "Data Normalization", "Business Analytics", "Report Generation"],
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
  },
  {
    id: "exp-mass-it-web",
    type: "experience",
    title: "Web Developer",
    organization: "MASS IT",
    location: "India",
    period: "Jan 2025 – Apr 2025",
    description: "Engineered web application backend services, integrated database connections, implemented input validation logic, and resolved production service issues.",
    achievements: [
      "Assisted with application database connection, user input validation, and backend service fixes."
    ],
    skills: ["Web Development", "Backend Services", "Database Integration", "Input Validation", "Debugging"],
    badgeColor: "border-purple-500/40 text-purple-400 bg-purple-950/30"
  },
  {
    id: "exp-sathe-iot",
    type: "experience",
    title: "Sensor Data & Telemetry Systems Engineer",
    organization: "Sathe Engineering",
    location: "Solapur, Maharashtra, India",
    period: "Jan 2024 – Mar 2024",
    description: "Designed a real-time sensor telemetry and monitoring application capturing industrial environmental data (temperature, pressure, vibration, humidity) for proactive hardware safety.",
    achievements: [
      "Designed real-time streaming data ingestion engine with WebSocket listeners and sub-second alert triggers",
      "Created intuitive mobile charts and status dashboards for floor managers and safety technicians",
      "Reduced sensor anomaly detection delay from 45 minutes to under 3 seconds"
    ],
    skills: ["Android", "Java/Kotlin", "IoT Telemetry", "Real-Time Systems", "Data Visualization"],
    badgeColor: "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
  },
  {
    id: "exp-salesforce-cert",
    type: "salesforce",
    title: "Salesforce Platform Developer I (PD-I) & Ranger",
    organization: "Salesforce Trailhead & Ecosystem",
    location: "Global Credential",
    period: "2024",
    description: "Attained official Salesforce Platform Developer I accreditation, mastering programmatic customization across Apex triggers, SOQL optimization, asynchronous batches, and Lightning Web Components (LWC).",
    achievements: [
      "Earned prestigious Trailhead Ranger milestone with 100+ badges and 55,000+ points",
      "Implemented enterprise separation-of-concerns pattern in Apex triggers to avoid recursion",
      "Engineered secure reactive LWC components integrated with external REST APIs"
    ],
    skills: ["Apex", "LWC", "SOQL / SOSL", "Flows", "Salesforce DX", "Platform Events"],
    badgeColor: "border-blue-500/40 text-blue-400 bg-blue-950/30"
  },
  {
    id: "exp-education-btech",
    type: "education",
    title: "B.Tech in Electronics & Computer Engineering",
    organization: "Walchand Institute of Technology",
    location: "Solapur, India",
    period: "2021 – 2025",
    description: "Graduated with a CGPA of 8.5/10.0. Core academic grounding in Electronics and Computer Engineering, systems architecture, embedded logic, database management, and advanced algorithms.",
    achievements: [
      "Graduated with CGPA: 8.5 / 10.0 in Electronics & Computer Engineering",
      "Completed engineering capstone projects integrating sensor telemetry, data analytics, and real-time dashboards",
      "Active participant in technical symposiums, developer hackathons, and software engineering initiatives"
    ],
    skills: ["Electronics & Computer Engg", "Data Structures", "Algorithms", "DBMS", "Embedded Systems", "IoT"],
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30"
  },
  {
    id: "exp-education-school",
    type: "education",
    title: "Higher Secondary (HSC) & Secondary School (SSC)",
    organization: "Chhatrapati Shivaji Maharaj High School",
    location: "Dharashiv, India",
    period: "2018 – 2021",
    description: "Built a solid academic foundation in science, mathematics, and analytical reasoning across pre-university and secondary schooling.",
    achievements: [
      "HSC (Higher Secondary Certificate) – Science: 88.83% (2019 – 2021)",
      "SSC (Secondary School Certificate) – Semi-English: 71.20% (2018 – 2019)"
    ],
    skills: ["Science & Mathematics", "Physics", "Chemistry", "Analytical Problem Solving"],
    badgeColor: "border-amber-500/40 text-amber-400 bg-amber-950/30"
  }
]

const filterTabs = [
  { id: "all", label: "All Milestones" },
  { id: "experience", label: "Professional Experience" },
  { id: "data", label: "Data Analytics" },
  { id: "internship", label: "Internships" },
  { id: "salesforce", label: "Salesforce Milestones" },
  { id: "education", label: "Education" },
]

export function ExperienceTimeline() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredEvents = activeFilter === "all"
    ? timelineData
    : activeFilter === "data"
      ? timelineData.filter(event =>
          event.skills.some(s => ["SQL", "PostgreSQL", "Python", "Data Modeling", "Business Analytics", "ETL Pipelines"].includes(s)) ||
          event.title.toLowerCase().includes("data")
        )
      : timelineData.filter(event => event.type === activeFilter)

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B1020] overflow-hidden border-t border-[#26324A]/60">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Trajectory & Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Experience & Journey
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            A track record of translating complex engineering requirements into elegant, resilient systems across academic, enterprise, and startup environments.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/20 font-bold"
                    : "bg-[#151D32] text-slate-400 hover:text-white border border-[#26324A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Glowing Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-30 shadow-[0_0_12px_rgba(56,189,248,0.5)]" />

          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((item, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Glowing Center Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 mt-1 sm:mt-6 z-20 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#0B1020] border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      </div>
                    </div>

                    {/* Timeline Content Card */}
                    <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-8 w-full">
                      <div className="group relative p-6 rounded-2xl bg-[#151D32]/90 backdrop-blur-md border border-[#26324A] hover:border-cyan-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1">
                        {/* Top Metadata */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md border ${item.badgeColor}`}>
                            {item.period}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Title & Organization */}
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm font-medium text-purple-400 mb-3">
                          {item.organization}
                        </p>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Projects Breakdown (if item has sub-projects) */}
                        {item.projects && item.projects.length > 0 && (
                          <div className="space-y-3.5 mb-4">
                            {item.projects.map((proj, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-3.5 rounded-xl bg-[#0B1020]/80 border border-[#26324A] hover:border-cyan-500/40 transition-colors"
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                                  <h4 className="text-xs font-bold text-cyan-300 tracking-wide">
                                    {proj.name}
                                  </h4>
                                </div>
                                <div className="space-y-1.5">
                                  {proj.points.map((point, ptIdx) => (
                                    <div key={ptIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                      <span>{point}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Key Achievements Bullet points */}
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="space-y-1.5 mb-4">
                            {item.achievements.map((ach, achIdx) => (
                              <div key={achIdx} className="flex items-start gap-2 text-xs text-slate-400">
                                <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                <span className="leading-tight">{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#26324A]/60">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1020] text-slate-300 border border-[#26324A]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
