"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  Layers,
  Cloud,
  BrainCircuit,
  Code2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

type CredentialCategory = "all" | "certifications" | "education" | "milestones"

interface BaseCredential {
  id: string
  title: string
  organization: string
  yearOrPeriod: string
  scoreOrId?: string
  credentialId?: string
  type: "certification" | "education" | "milestone"
  typeLabel: string
  skills: string[]
  verificationUrl?: string
  description: string
  accentBorder: string
  badgeBg: string
}

const credentialsData: BaseCredential[] = [
  // 1. Formal Professional Certifications
  {
    id: "cert-salesforce-pdi",
    title: "Salesforce Certified Platform Developer I (PD-I)",
    organization: "Salesforce",
    yearOrPeriod: "2024",
    credentialId: "SF-PDI-2984104",
    type: "certification",
    typeLabel: "Formal Professional Certification",
    skills: ["Apex Programming", "Lightning Web Components", "SOQL / SOSL", "Trigger Frameworks", "Governor Limits"],
    verificationUrl: "https://trailhead.salesforce.com/credentials/verification",
    description: "Official global accreditation validating comprehensive programmatic development expertise across the Salesforce multi-tenant architecture.",
    accentBorder: "border-blue-400/40 text-blue-300",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30"
  },
  {
    id: "cert-aws-cloud",
    title: "AWS Cloud Foundations & Distributed Systems",
    organization: "AWS Academy / Cloud Foundations",
    yearOrPeriod: "2023",
    credentialId: "AWS-CF-882039",
    type: "certification",
    typeLabel: "Formal Professional Certification",
    skills: ["Cloud Architecture", "EC2 Compute", "S3 Storage", "IAM Security", "VPC Networking"],
    verificationUrl: "https://aws.amazon.com/verification",
    description: "Core competence in enterprise cloud infrastructure, virtualization, distributed storage paradigms, and security boundaries.",
    accentBorder: "border-cyan-400/40 text-cyan-300",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
  },
  {
    id: "cert-data-science",
    title: "Applied Data Science & Machine Learning",
    organization: "Cognitive AI Lab",
    yearOrPeriod: "2024",
    credentialId: "ML-PY-910283",
    type: "certification",
    typeLabel: "Specialized Technical Credential",
    skills: ["Python", "Scikit-Learn", "Pandas & NumPy", "Statistical Modeling", "Supervised Learning"],
    verificationUrl: "https://verify.certificate.net",
    description: "Rigorous curriculum encompassing exploratory data analysis, predictive statistical modeling, cross-validation, and production inference.",
    accentBorder: "border-purple-400/40 text-purple-300",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30"
  },
  {
    id: "cert-fullstack-meta",
    title: "Full-Stack Web Development & Modern React",
    organization: "Meta / Coursera Professional",
    yearOrPeriod: "2023",
    credentialId: "META-FS-441092",
    type: "certification",
    typeLabel: "Professional Program Completion",
    skills: ["React 18", "Node.js & Express", "MongoDB", "REST APIs", "Modern JavaScript (ES6+)"],
    verificationUrl: "https://coursera.org/verify",
    description: "In-depth engineering curriculum covering scalable single-page architecture, asynchronous Node.js backends, and full-stack API integration.",
    accentBorder: "border-indigo-400/40 text-indigo-300",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
  },

  // 2. Academic & Educational Qualifications
  {
    id: "edu-btech",
    title: "B.Tech in Electronics & Computer Engineering",
    organization: "Walchand Institute of Technology, Solapur",
    yearOrPeriod: "2021 – 2025",
    scoreOrId: "CGPA: 8.5 / 10.0",
    type: "education",
    typeLabel: "Degree with Distinction",
    skills: ["Electronics & Computer Engg", "Data Structures & Algorithms", "DBMS & SQL", "Embedded Systems", "IoT"],
    description: "Graduated with distinction. Comprehensive academic grounding across computer architectures, algorithm design, relational database systems, and hardware-software telemetry.",
    accentBorder: "border-cyan-400/40 text-cyan-300",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
  },
  {
    id: "edu-hsc",
    title: "Higher Secondary Certificate (HSC) – Science Stream",
    organization: "Chhatrapati Shivaji Maharaj High School, Dharashiv",
    yearOrPeriod: "2019 – 2021",
    scoreOrId: "Score: 88.83%",
    type: "education",
    typeLabel: "Higher Secondary Qualification",
    skills: ["Physics", "Chemistry", "Mathematics", "Analytical Problem Solving"],
    description: "Rigorous scientific foundation with strong analytical and mathematical problem-solving focus.",
    accentBorder: "border-sky-400/40 text-sky-300",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30"
  },
  {
    id: "edu-ssc",
    title: "Secondary School Certificate (SSC) – Semi-English",
    organization: "Chhatrapati Shivaji Maharaj High School, Dharashiv",
    yearOrPeriod: "2018 – 2019",
    scoreOrId: "Score: 71.20%",
    type: "education",
    typeLabel: "Secondary School Qualification",
    skills: ["Mathematics", "General Science", "English Communication"],
    description: "Solid foundational education across mathematics, natural sciences, and bilingual communication.",
    accentBorder: "border-slate-400/40 text-slate-300",
    badgeBg: "bg-slate-500/10 text-slate-400 border-slate-500/30"
  },

  // 3. Platform Milestones & Applied Coursework
  {
    id: "milestone-trailhead-ranger",
    title: "Trailhead Ranger Milestone (100+ Badges, 55k+ Points)",
    organization: "Salesforce Trailhead",
    yearOrPeriod: "2024",
    scoreOrId: "Rank: Ranger (55,000+ Pts)",
    type: "milestone",
    typeLabel: "Platform Learning Milestone • Not Certification",
    skills: ["Flow Automation", "Data Modeling", "Process Automation", "Sales & Service Cloud", "AppExchange"],
    verificationUrl: "https://trailhead.salesforce.com",
    description: "Hands-on platform achievement demonstrating continuous skill development, practical sandboxes, and enterprise architectural modules across Salesforce Trailhead.",
    accentBorder: "border-emerald-400/40 text-emerald-300",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "cert-uiux-design",
    title: "UI/UX Design Systems & Design Thinking",
    organization: "Interaction Design Institute",
    yearOrPeriod: "2023",
    credentialId: "UXD-SYS-771205",
    type: "milestone",
    typeLabel: "Specialized Course Completion",
    skills: ["Figma Design Tokens", "8pt Spatial Grid", "Wireframing", "WCAG AAA Accessibility", "User Testing"],
    verificationUrl: "https://interaction-design.org",
    description: "Specialized study of human-computer interaction, cognitive heuristics, design systems, and inclusive digital accessibility.",
    accentBorder: "border-pink-400/40 text-pink-300",
    badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/30"
  }
]

const categoryFilters: { id: CredentialCategory; label: string }[] = [
  { id: "all", label: "All Credentials & Degrees" },
  { id: "certifications", label: "Formal Certifications" },
  { id: "education", label: "Academic Education" },
  { id: "milestones", label: "Platform Milestones" },
]

export function CertificationsShowcase() {
  const [activeCategory, setActiveCategory] = useState<CredentialCategory>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const filteredCredentials = credentialsData.filter((item) => {
    if (activeCategory === "all") return true
    if (activeCategory === "certifications") return item.type === "certification"
    if (activeCategory === "education") return item.type === "education"
    if (activeCategory === "milestones") return item.type === "milestone"
    return true
  })

  return (
    <section id="certifications" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B14] via-[#090E1C] to-[#070B14] overflow-hidden border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            Accreditations & Education
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E0F2FE] tracking-tight">
            Academic Grounding & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Verified Credentials</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Formally accredited engineering degrees and verified professional certifications. Distinguishing accredited industry qualifications from platform learning milestones.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categoryFilters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold"
                    : "bg-[#111B30]/75 backdrop-blur-md text-[#94A3B8] hover:text-[#E0F2FE] border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCredentials.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Issuer Tag + Year/Period */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${item.badgeBg}`}>
                      {item.organization}
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8] bg-[#070B14]/80 px-2 py-0.5 rounded border border-white/10">
                      {item.yearOrPeriod}
                    </span>
                  </div>

                  {/* Type Label Badge */}
                  <div className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider mb-2">
                    {item.typeLabel}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#E0F2FE] group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 font-light">
                    {item.description}
                  </p>

                  {/* Credential ID or Score Badge */}
                  {(item.credentialId || item.scoreOrId) && (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08] text-xs font-mono text-[#E0F2FE]/90 mb-4">
                      <div className="flex items-center gap-2 truncate">
                        {item.type === "education" ? (
                          <GraduationCap className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        ) : (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        )}
                        <span className="truncate">{item.credentialId || item.scoreOrId}</span>
                      </div>

                      {item.credentialId && (
                        <button
                          onClick={(e) => handleCopyId(item.credentialId!, e)}
                          className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40 ml-2 flex-shrink-0"
                          title="Copy Credential ID"
                        >
                          {copiedId === item.credentialId ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Skills Covered */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Validated Capabilities
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14]/70 text-[#E0F2FE]/80 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Verification Link or Authority Status */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Verified Credential
                  </span>

                  {item.verificationUrl && (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Verify
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
