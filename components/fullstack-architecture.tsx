"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Server, Database, Cloud, ShieldCheck, Globe, Check, Copy } from "lucide-react"

export function FullstackArchitecture() {
  const [activeTab, setActiveTab] = useState<"app" | "api" | "schema">("app")
  const [copied, setCopied] = useState(false)

  const architectureLayers = [
    {
      layer: "01. Presentation",
      title: "Frontend Tier",
      icon: Globe,
      tech: "Next.js 16 • React 19 • Tailwind CSS",
      desc: "Server-side rendering, streaming SSR, responsive UI state & optimistic mutations.",
    },
    {
      layer: "02. API Gateway",
      title: "Middleware & Auth",
      icon: ShieldCheck,
      tech: "JWT Sessions • Rate Limiting • CORS",
      desc: "Zero-trust session authorization, route protection & payload validation schemas.",
    },
    {
      layer: "03. Service Logic",
      title: "Backend Microservices",
      icon: Server,
      tech: "Node.js • Express • RESTful Endpoints",
      desc: "Stateless controllers, domain business logic, caching layers & error handling.",
    },
    {
      layer: "04. Data Layer",
      title: "Relational & Document DBs",
      icon: Database,
      tech: "PostgreSQL • MongoDB • Prisma ORM",
      desc: "ACID transactions, indexed query performance & connection pooling.",
    },
    {
      layer: "05. Infrastructure",
      title: "Cloud & DevOps",
      icon: Cloud,
      tech: "Docker • Vercel Edge • AWS S3",
      desc: "Automated CI/CD build pipelines, edge caching & container orchestration.",
    },
  ]

  const mockApiJson = `{
  "status": 200,
  "message": "User session validated",
  "data": {
    "userId": "usr_948194",
    "email": "abhibubane12@gmail.com",
    "role": "Lead Architect",
    "permissions": ["analytics:read", "models:execute", "deploy:write"],
    "metrics": {
      "queriesRun": 1420,
      "uptime": "99.98%"
    }
  }
}`

  const copyCode = () => {
    navigator.clipboard.writeText(mockApiJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="architecture" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Code2 className="h-3.5 w-3.5" /> Full-Stack Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Full-Stack Software <span className="aurora-text-gradient">Architecture & Execution</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Scalable, production-ready system architecture designed for enterprise reliability, high concurrent users,
            and sub-100ms response times.
          </p>
        </div>

        {/* 5-Tier Architecture Diagram */}
        <div className="grid md:grid-cols-5 gap-4 mb-16">
          {architectureLayers.map((tier) => (
            <div
              key={tier.layer}
              className="p-5 rounded-2xl bg-[#0B1020]/95 border border-[#26324A] hover:border-aurora-cyan/50 transition-all space-y-3 shadow-lg relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-aurora-cyan uppercase">
                  {tier.layer}
                </span>
                <tier.icon className="h-4 w-4 text-aurora-blue" />
              </div>
              <h4 className="font-bold text-base text-[#F8FAFC] group-hover:text-aurora-cyan transition-colors">
                {tier.title}
              </h4>
              <div className="text-xs font-mono text-aurora-violet/90 bg-[#151D32] p-1.5 rounded-lg border border-[#26324A]/60">
                {tier.tech}
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{tier.desc}</p>
            </div>
          ))}
        </div>

        {/* Realistic Browser Mockup Frame with Interactive Tabs */}
        <div className="rounded-2xl bg-[#0B1020] border border-[#26324A] overflow-hidden shadow-2xl">
          {/* Browser Top Chrome Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-[#26324A]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-[#94A3B8] ml-2">https://app.abhishekbubane.com/dashboard</span>
            </div>

            {/* Interactive Browser Tabs */}
            <div className="flex items-center gap-1">
              {[
                { id: "app", label: "App View" },
                { id: "api", label: "REST API Endpoint" },
                { id: "schema", label: "Prisma Schema" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#151D32] text-aurora-cyan font-bold"
                      : "text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Browser Inner Body */}
          <div className="p-6 sm:p-8 min-h-[320px] bg-[#070B14]/95 flex flex-col justify-center">
            {activeTab === "app" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#26324A]/70 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-aurora-blue/20 flex items-center justify-center text-aurora-blue font-bold text-sm">
                      NX
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-[#F8FAFC]">Production System Live Demo</h5>
                      <span className="text-xs text-emerald-400 font-mono">● All Services Operational</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8]">Region: us-east (Edge Active)</span>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#111827] border border-[#26324A] space-y-1">
                    <span className="text-xs text-[#94A3B8]">Authentication</span>
                    <div className="font-bold text-sm text-[#F8FAFC]">OAuth2 & JWT Token</div>
                    <span className="text-[11px] text-emerald-400 font-mono">Zero-Trust Secured</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111827] border border-[#26324A] space-y-1">
                    <span className="text-xs text-[#94A3B8]">Database Read/Write</span>
                    <div className="font-bold text-sm text-[#F8FAFC]">PostgreSQL Pool</div>
                    <span className="text-[11px] text-aurora-blue font-mono">1.8ms Query P95</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111827] border border-[#26324A] space-y-1">
                    <span className="text-xs text-[#94A3B8]">Client Rendering</span>
                    <div className="font-bold text-sm text-[#F8FAFC]">Next.js Streaming SSR</div>
                    <span className="text-[11px] text-aurora-violet font-mono">100/100 Lighthouse</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-[#94A3B8] pb-2 border-b border-[#26324A]">
                  <span className="text-aurora-emerald font-bold">GET /api/v1/user/session</span>
                  <button
                    onClick={copyCode}
                    className="flex items-center gap-1 text-xs hover:text-[#F8FAFC] transition-colors"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy Payload"}
                  </button>
                </div>
                <pre className="text-aurora-cyan p-4 rounded-xl bg-[#0B1020] border border-[#26324A] overflow-x-auto">
                  {mockApiJson}
                </pre>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="text-aurora-violet font-bold pb-2 border-b border-[#26324A]">
                  schema.prisma • Relational ORM Definition
                </div>
                <pre className="text-[#94A3B8] p-4 rounded-xl bg-[#0B1020] border border-[#26324A] overflow-x-auto">
{`model User {
  id            String       @id @default(cuid())
  email         String       @unique
  name          String
  role          UserRole     @default(ANALYST)
  projects      Project[]
  analyticsLogs LogEvent[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt

  @@index([email, role])
}`}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
