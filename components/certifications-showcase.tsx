"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Cloud, 
  Zap, 
  Database, 
  Code, 
  Palette, 
  ShieldCheck,
  Sparkles
} from "lucide-react"

interface CertificationItem {
  id: string
  title: string
  organization: string
  issuerLogoBg: string
  year: string
  credentialId: string
  skillsCovered: string[]
  verifyUrl: string
  accentColor: string
}

const certifications: CertificationItem[] = [
  {
    id: "cert-salesforce-pdi",
    title: "Salesforce Certified Platform Developer I (PD-I)",
    organization: "Salesforce",
    issuerLogoBg: "bg-blue-600/20 text-blue-400 border-blue-500/40",
    year: "2024",
    credentialId: "SF-PDI-2984104",
    skillsCovered: ["Apex Programming", "LWC", "SOQL / SOSL", "Trigger Frameworks", "Salesforce Security"],
    verifyUrl: "https://trailhead.salesforce.com/credentials",
    accentColor: "border-blue-500/40 hover:border-blue-400"
  },
  {
    id: "cert-trailhead-ranger",
    title: "Trailhead Ranger Milestone (100+ Badges)",
    organization: "Salesforce Trailhead",
    issuerLogoBg: "bg-emerald-600/20 text-emerald-400 border-emerald-500/40",
    year: "2024",
    credentialId: "TH-RANGER-RANK-1",
    skillsCovered: ["Enterprise Flows", "Data Modeling", "Process Automation", "Platform Events", "AppExchange"],
    verifyUrl: "https://trailhead.salesforce.com",
    accentColor: "border-emerald-500/40 hover:border-emerald-400"
  },
  {
    id: "cert-data-science-python",
    title: "Applied Data Science & Machine Learning",
    organization: "Cognitive AI Lab",
    issuerLogoBg: "bg-purple-600/20 text-purple-400 border-purple-500/40",
    year: "2024",
    credentialId: "ML-PY-910283",
    skillsCovered: ["Pandas & NumPy", "Supervised Learning", "Model Evaluation", "Statistical Modeling", "Matplotlib"],
    verifyUrl: "https://verify.certificate.net",
    accentColor: "border-purple-500/40 hover:border-purple-400"
  },
  {
    id: "cert-cloud-computing",
    title: "Cloud Computing & Distributed Systems",
    organization: "Cloud Academy / AWS Foundations",
    issuerLogoBg: "bg-cyan-600/20 text-cyan-400 border-cyan-500/40",
    year: "2023",
    credentialId: "AWS-CF-882039",
    skillsCovered: ["EC2 & S3", "Serverless Lambdas", "VPC Networking", "IAM Security", "CloudWatch"],
    verifyUrl: "https://aws.amazon.com/verification",
    accentColor: "border-cyan-500/40 hover:border-cyan-400"
  },
  {
    id: "cert-fullstack-dev",
    title: "Full-Stack Web Development & Modern React",
    organization: "Meta / Coursera Professional",
    issuerLogoBg: "bg-amber-600/20 text-amber-400 border-amber-500/40",
    year: "2023",
    credentialId: "META-FS-441092",
    skillsCovered: ["React 18", "Node.js & Express", "RESTful Architecture", "MongoDB", "Async Testing"],
    verifyUrl: "https://coursera.org/verify",
    accentColor: "border-amber-500/40 hover:border-amber-400"
  },
  {
    id: "cert-uiux-design",
    title: "UI/UX Design Systems & Design Thinking",
    organization: "Interaction Design Institute",
    issuerLogoBg: "bg-pink-600/20 text-pink-400 border-pink-500/40",
    year: "2023",
    credentialId: "UXD-SYS-771205",
    skillsCovered: ["Figma Variables", "Design Tokens", "Wireframing", "Cognitive Heuristics", "WCAG Accessibility"],
    verifyUrl: "https://interaction-design.org",
    accentColor: "border-pink-500/40 hover:border-pink-400"
  }
]

export function CertificationsShowcase() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0B1020] to-[#070B14] overflow-hidden border-t border-[#26324A]/60">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            Accreditations & Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Certified Expertise
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Formally validated knowledge across enterprise platforms, modern software engineering, cloud infrastructures, and design disciplines.
          </p>
        </div>

        {/* 6 Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`group relative p-6 rounded-2xl bg-[#151D32]/90 backdrop-blur-md border border-[#26324A] ${cert.accentColor} shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                {/* Card Top: Issuer Tag + Year */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${cert.issuerLogoBg}`}>
                    {cert.organization}
                  </span>
                  <span className="text-xs font-mono text-slate-400 bg-[#0B1020] px-2 py-0.5 rounded border border-[#26324A]">
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                  {cert.title}
                </h3>

                {/* Credential ID badge */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0B1020] border border-[#26324A] text-xs font-mono text-slate-300 mb-4">
                  <div className="flex items-center gap-2 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{cert.credentialId}</span>
                  </div>
                  <button
                    onClick={(e) => handleCopyId(cert.credentialId, e)}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 flex-shrink-0 ml-2 uppercase font-sans font-bold"
                  >
                    {copiedId === cert.credentialId ? "Copied!" : "Copy"}
                  </button>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#111827] text-slate-300 border border-[#26324A]/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Verification Button */}
              <div className="pt-4 border-t border-[#26324A]/60 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Credential
                </span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
