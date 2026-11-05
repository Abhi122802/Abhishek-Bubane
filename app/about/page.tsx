"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Database,
  BrainCircuit,
  Compass,
  Layers,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const careerPillars = [
    {
      title: "Data Analyst",
      badge: "Analytics & BI",
      icon: Database,
      desc: "SQL data modeling, automated ETL pipelines, cohort retention decay matrices, and executive intelligence dashboards driving operational revenue.",
      accent: "border-cyan-400/30 text-cyan-300",
    },
    {
      title: "Data Engineer",
      badge: "Pipelines & Warehousing",
      icon: Layers,
      desc: "Star-schema dimensional modeling, point-in-time feature extraction DAGs in Airflow, automated data validation rules, and PostgreSQL infrastructure.",
      accent: "border-teal-400/30 text-teal-300",
    },
    {
      title: "Full-Stack Developer",
      badge: "Modern Web & APIs",
      icon: Code2,
      desc: "Production Next.js, React 19, TypeScript, Node.js/Express REST APIs, MongoDB, Razorpay payment integrations, and hardware node-locked licensing.",
      accent: "border-indigo-400/30 text-indigo-300",
    },
    {
      title: "AI Engineer",
      badge: "Predictive Intelligence",
      icon: BrainCircuit,
      desc: "XGBoost customer churn models, TreeSHAP feature attributions, FastAPI low-latency inference services, and client-side behavioral tuning simulators.",
      accent: "border-purple-400/30 text-purple-300",
    },
  ]

  const careerMilestones = [
    {
      role: "Data Analyst",
      organization: "DJRB SERVICES",
      period: "Dec 2025 – Present",
      location: "Pune, India",
      desc: "Leading SQL modeling and operational analytics for STR Analytics Platform. Built compliance rule-checking logic and React audit screens for mortgage verification software (QA-Pramaan).",
      pillar: "Data Analyst",
      tech: ["SQL", "PostgreSQL", "Python", "Django", "React", "ETL"],
    },
    {
      role: "Freelance Web & Application Developer",
      organization: "Elevate Technologies",
      period: "2025 – Present",
      location: "Pune, India",
      desc: "Architected the commercial e-commerce & SaaS licensing platform (elevatetechnologies.in) with automated hardware node-locked keys, Razorpay checkout, and CGST/SGST tax ledgers.",
      pillar: "Full-Stack Developer",
      tech: ["React 19", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Razorpay"],
    },
    {
      role: "Data Analyst Intern",
      organization: "DJRB SERVICES",
      period: "Jun 2025 – Nov 2025",
      location: "Pune, India",
      desc: "Prepared and normalized raw operational service records for production PostgreSQL databases, writing analytical queries for weekly executive reports.",
      pillar: "Data Analyst",
      tech: ["PostgreSQL", "SQL Queries", "Data Cleaning", "Normalization"],
    },
    {
      role: "Web Developer",
      organization: "MASS IT",
      period: "Jan 2025 – Apr 2025",
      location: "India",
      desc: "Engineered web application backend service connections, integrated database models, implemented input validation logic, and resolved production bugs.",
      pillar: "Full-Stack Developer",
      tech: ["Web Development", "Node.js", "REST APIs", "Validation"],
    },
    {
      role: "Sensor Data & Telemetry Systems Engineer",
      organization: "Sathe Engineering",
      period: "Jan 2024 – Mar 2024",
      location: "Solapur, India",
      desc: "Built an industrial Android sensor monitoring client capturing temperature, humidity, and vibration telematics with offline SQLite caching and cloud anomaly alerts.",
      pillar: "Data Engineer",
      tech: ["Android", "Java", "SQLite", "IoT Protocols", "REST"],
    },
  ]

  const credentials = [
    {
      title: "B.Tech in Electronics & Computer Engineering",
      issuer: "Walchand Institute of Technology, Solapur",
      period: "2021 – 2025",
      badge: "Degree with Distinction (CGPA: 8.5 / 10.0)",
      type: "education",
    },
    {
      title: "Salesforce Certified Platform Developer I (PD-I)",
      issuer: "Salesforce",
      period: "2024",
      badge: "Credential ID: SF-PDI-2984104",
      type: "certification",
    },
    {
      title: "AWS Cloud Foundations & Distributed Systems",
      issuer: "AWS Academy / Cloud Foundations",
      period: "2023",
      badge: "Credential ID: AWS-CF-882039",
      type: "certification",
    },
    {
      title: "Applied Data Science & Machine Learning",
      issuer: "Cognitive AI Lab",
      period: "2024",
      badge: "Credential ID: ML-PY-910283",
      type: "certification",
    },
    {
      title: "Trailhead Ranger Milestone (100+ Badges, 55k+ Points)",
      issuer: "Salesforce Trailhead",
      period: "2024",
      badge: "Platform Learning Milestone • Not Certification",
      type: "milestone",
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-[#070B14] text-[#F8FAFC]">
      <div className="max-w-6xl mx-auto space-y-24">
        {/* 1. PROFESSIONAL INTRODUCTION */}
        <section className="relative">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Portrait & Core Identity */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#070B14]">
                  <Image
                    src="/profile.jpg"
                    alt="Abhishek Balasaheb Bubane Portrait"
                    fill
                    priority
                    className="object-cover object-[50%_15%]"
                  />
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E0F2FE] tracking-tight mb-2">
                Abhishek Balasaheb Bubane
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-[#94A3B8] font-mono mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Maharashtra, India
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" /> B.Tech (Electronics & CSE)
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Engineering Roles & Impact Projects
              </div>
            </div>

            {/* Narrative Story */}
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Professional Biography
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE] leading-snug">
                Bridging analytical mathematical rigor, robust software engineering, and human-centered design.
              </h2>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light">
                I am an engineer with foundational depth across analytical data modeling, full-stack software systems, and predictive machine learning. Graduating with distinction in Electronics & Computer Engineering from Walchand Institute of Technology (CGPA 8.5/10.0), I build systems where data integrity and user experience are equally prioritized.
              </p>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-light">
                From authoring high-throughput SQL validation rules at DJRB Services to delivering commercial software licensing storefronts with hardware node-locked encryption at Elevate Technologies, my focus remains on building reliable, verifiable software that drives measurable business outcomes.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20"
                >
                  <Link href="/projects">
                    Explore Flagship Case Studies
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-white/10 bg-[#111B30]/75 text-[#E0F2FE] hover:bg-[#15223E] text-xs rounded-xl"
                >
                  <Link href="/contact">
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FOUR-PILLAR CAREER POSITIONING */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE]">
              Four-Pillar Career Positioning
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Interconnected disciplines creating a unified engineering skill set.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerPillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#070B14]/80 border border-white/10 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#E0F2FE] mb-1">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold block mb-2">
                        {pillar.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 3. CAREER JOURNEY */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Verified Trajectory
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE]">
                Professional Career Journey
              </h2>
            </div>
            <Link
              href="/#experience"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              View Full Timeline
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {careerMilestones.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-[#E0F2FE]">{item.role}</h3>
                    <span className="text-sm font-semibold text-purple-300">@ {item.organization}</span>
                    <Badge variant="outline" className="text-[10px] font-mono border-white/10 text-slate-300">
                      {item.pillar}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14]/80 text-[#E0F2FE]/80 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-left sm:text-right flex-shrink-0">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md border border-cyan-400/30 text-cyan-300 bg-cyan-950/40 block mb-1">
                    {item.period}
                  </span>
                  <span className="text-xs text-[#94A3B8] flex items-center sm:justify-end gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EDUCATION & CREDENTIALS */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Accreditations
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE]">
                Education & Verified Credentials
              </h2>
            </div>
            <Link
              href="/#certifications"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              Verify All Accreditations
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {credentials.map((cred, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 hover:border-white/25 shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono">
                    <span>{cred.issuer}</span>
                    <span>{cred.period}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#E0F2FE] leading-snug">
                    {cred.title}
                  </h3>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-[#070B14]/80 px-2 py-1 rounded border border-white/10">
                      {cred.type === "education" ? (
                        <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      {cred.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TECHNICAL PHILOSOPHY */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111B30]/85 via-[#0D1527]/80 to-[#16223B]/80 backdrop-blur-xl border border-white/10 shadow-2xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
            <Compass className="w-3.5 h-3.5" /> Core Philosophy
          </div>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#E0F2FE] max-w-3xl mx-auto leading-tight">
            "Analyze deeply. Build intelligently. Design intentionally. Capture beautifully."
          </blockquote>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-light">
            Engineering without empathy produces rigid systems. Design without technical rigor produces fragile illusions. By intertwining mathematical data modeling, production code quality, and human-centered design systems, we craft digital products that truly endure.
          </p>
        </section>

        {/* 6. LINK TO FLAGSHIP PROJECTS */}
        <section className="p-8 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#E0F2FE]">
              Ready to examine technical architectures?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Inspect comprehensive engineering case studies across ChurnPlatform, OmniChannel Analytics, SuperShopy, and QA-Pramaan.
            </p>
          </div>

          <Button
            asChild
            className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 flex-shrink-0"
          >
            <Link href="/projects">
              Explore All Case Studies
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </section>

        {/* 7. CONTACT CTA */}
        <section className="text-center space-y-4 pt-4 border-t border-white/10">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Initiate Collaboration
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E0F2FE]">
            Let's build something intelligent together.
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            Whether you need a data analytics pipeline, modern full-stack web application, or machine learning integration, I am open to discussing new opportunities.
          </p>
          <div className="pt-2">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20"
            >
              <Link href="/contact">
                Contact Abhishek Bubane
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
