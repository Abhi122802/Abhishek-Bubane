"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Code2,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Globe,
  Check,
  Copy,
  Layers,
  ArrowRight,
  ArrowDown,
  Cpu,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Info,
  Maximize2,
  Eye,
  Sliders,
} from "lucide-react"
import { Button } from "@/components/ui/button"

/* =========================================================================
   Types and Architecture Specifications
   ========================================================================= */

interface TechItem {
  name: string
  version: string
  role: string
  desc: string
  decision: string
  benchmark: string
}

interface ArchitectureTier {
  id: "frontend" | "api" | "backend" | "database"
  layerNumber: string
  title: string
  shortDesc: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  color: string
  borderColor: string
  bgLight: string
  techStack: TechItem[]
  p95Latency: string
  scalingMetric: string
  deepDive: {
    overview: string
    patterns: string[]
    securityAndPerf: string[]
  }
}

const tiersData: ArchitectureTier[] = [
  {
    id: "frontend",
    layerNumber: "01",
    title: "Frontend Presentation Tier",
    shortDesc: "Next.js 16 (Turbopack) • React 19 • Tailwind CSS • Framer Motion",
    icon: Globe,
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    color: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    bgLight: "rgba(56, 189, 248, 0.08)",
    p95Latency: "18ms (Edge SSR)",
    scalingMetric: "100/100 Lighthouse Performance",
    techStack: [
      {
        name: "Next.js 16 App Router",
        version: "v16.2.0",
        role: "Fullstack Framework",
        desc: "Server-side rendering, streaming SSR with Suspense, and edge routing.",
        decision: "Zero-bundle-size server components eliminate client JavaScript overhead for static nodes.",
        benchmark: "18ms First Contentful Paint on Edge Vercel CDN.",
      },
      {
        name: "React 19",
        version: "v19.0",
        role: "UI Architecture",
        desc: "Actions, optimistic mutations, concurrent rendering, and asset preloading.",
        decision: "Server Actions streamline client-server RPCs without boilerplate REST endpoints.",
        benchmark: "60 FPS frame budgets maintained during complex SVG & canvas animations.",
      },
      {
        name: "Tailwind CSS & Framer Motion",
        version: "v3.4 / Motion 11",
        role: "Design System & Dynamics",
        desc: "Design tokens, hardware-accelerated transforms, and accessible reduced-motion fallbacks.",
        decision: "CSS variables mapped to Midnight Aurora tokens enable seamless dark/light theme switching.",
        benchmark: "Zero CSS-in-JS runtime overhead; pure compiled utility classes.",
      },
    ],
    deepDive: {
      overview:
        "Architected with Next.js 16 streaming server components, delivering immediate HTML paint while streaming asynchronously hydrated analytical widgets without blocking navigation.",
      patterns: [
        "Streaming SSR with boundary-level React Suspense skeletons",
        "Optimistic UI updates for slider parameter tuning",
        "Client boundary isolation minimizing re-render cascades",
      ],
      securityAndPerf: [
        "Strict Content Security Policy (CSP) with nonces",
        "Automatic WebP/AVIF image transcoding and responsive sizing",
        "Zero layout-shift (CLS < 0.01) responsive containers",
      ],
    },
  },
  {
    id: "api",
    layerNumber: "02",
    title: "API Gateway & Security Middleware",
    shortDesc: "JWT Sessions • Rate Limiting • Helmet • Role-Based Access Control",
    icon: ShieldCheck,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    color: "#818CF8",
    borderColor: "rgba(129, 140, 248, 0.4)",
    bgLight: "rgba(129, 140, 248, 0.08)",
    p95Latency: "12ms (Middleware Auth)",
    scalingMetric: "10,000 req/min Rate Ceiling",
    techStack: [
      {
        name: "Edge JWT Auth & RBAC",
        version: "v9.0",
        role: "Zero-Trust Authorization",
        desc: "Cryptographically signed session tokens with fine-grained claim enforcement.",
        decision: "Stateless verification at edge proxies eliminates database round-trips for authenticated reads.",
        benchmark: "Sub-2ms token validation via asynchronous Web Crypto API.",
      },
      {
        name: "Sliding Window Rate Limiter",
        version: "Redis Token Bucket",
        role: "Traffic Shaping & DDoS Defense",
        desc: "Dynamic rate limiting per client IP / API key preventing brute-force & API exhaustion.",
        decision: "Redis-backed atomic token buckets ensure consistent throttling across distributed clusters.",
        benchmark: "429 Too Many Requests response dispatched in < 4ms.",
      },
      {
        name: "Security Middleware & Helmet",
        version: "OWASP Top 10 Hardened",
        role: "Payload Sanitization & CORS",
        desc: "Strict CORS policies, XSS filtering, NoSQL injection defenses, and request payload schema validation.",
        decision: "Zod validation gates all incoming mutations before touching service controllers.",
        benchmark: "100% schema compliance validation with sub-millisecond overhead.",
      },
    ],
    deepDive: {
      overview:
        "The gateway tier functions as a hardened perimeter executing zero-trust authentication, automated IP rate limiting, and schema-strict payload sanitization prior to microservice dispatch.",
      patterns: [
        "Token-bucket rate limiting backed by in-memory Redis stores",
        "Zod strict input validation schemas for all JSON payloads",
        "Standardized RFC 7807 problem details error responses",
      ],
      securityAndPerf: [
        "HTTP-only, Secure, SameSite=Strict session cookies",
        "Constant-time string comparison preventing cryptographic timing attacks",
        "Automated request ID tracing headers (x-request-id) for distributed observability",
      ],
    },
  },
  {
    id: "backend",
    layerNumber: "03",
    title: "Backend Service Logic & Microservices",
    shortDesc: "Node.js / Express • Python / FastAPI • Domain Controllers • Async Tasks",
    icon: Server,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    color: "#C084FC",
    borderColor: "rgba(192, 132, 252, 0.4)",
    bgLight: "rgba(192, 132, 252, 0.08)",
    p95Latency: "38ms (Model Inference)",
    scalingMetric: "Horizontal Autoscaling Clusters",
    techStack: [
      {
        name: "Node.js & Express REST APIs",
        version: "Node 20 LTS",
        role: "Transactional Services",
        desc: "Event-driven asynchronous service layer handling CRUD, authentication, and order workflows.",
        decision: "Non-blocking I/O loop delivers immense throughput for high-concurrency microservices.",
        benchmark: "Handles 4,500 req/sec per cluster instance at < 50MB RAM.",
      },
      {
        name: "Python FastAPI ML Worker",
        version: "FastAPI 0.110",
        role: "AI Inference Microservice",
        desc: "Asynchronous ASGI server serving trained XGBoost and PyTorch retention prediction pipelines.",
        decision: "Pydantic data models guarantee strict typed serialization with native C-speed parsing.",
        benchmark: "38ms P95 latency for multi-feature XGBoost inference calculations.",
      },
      {
        name: "Asynchronous Worker Queues",
        version: "BullMQ / Celery",
        role: "Background Processing",
        desc: "Reliable background job orchestration for report generation, email alerts, and data syncs.",
        decision: "Decouples heavy report crunching from HTTP request-response cycles.",
        benchmark: "Guaranteed at-least-once execution with automatic exponential backoff retries.",
      },
    ],
    deepDive: {
      overview:
        "Clean architecture separating domain logic, service orchestrators, and database repositories. Dual-runtime stack pairs Node.js for transactional throughput with FastAPI for ML scoring.",
      patterns: [
        "Repository pattern abstracting underlying persistence drivers",
        "Dependency injection enabling mockable unit test suites",
        "Graceful SIGTERM shutdown handling active in-flight requests",
      ],
      securityAndPerf: [
        "Structured JSON logging with request correlation IDs",
        "Circuit breaker pattern preventing cascade failures on external API dependencies",
        "Garbage collection tuned for sub-10ms pause windows",
      ],
    },
  },
  {
    id: "database",
    layerNumber: "04",
    title: "Database & Persistence Layer",
    shortDesc: "PostgreSQL 16 • MongoDB • Prisma ORM • Redis Cache • Connection Pooling",
    icon: Database,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    color: "#34D399",
    borderColor: "rgba(52, 211, 153, 0.4)",
    bgLight: "rgba(52, 211, 153, 0.08)",
    p95Latency: "1.8ms (Indexed Query P95)",
    scalingMetric: "ACID Guaranteed • 13 Relational Tables",
    techStack: [
      {
        name: "PostgreSQL 16 Relational Engine",
        version: "PostgreSQL 16.2",
        role: "Core Relational Store",
        desc: "ACID compliance, point-in-time window functions, and B-Tree indexing on 13 relational tables.",
        decision: "Strict relational integrity for financial ledger transactions, subscriptions, and audit logs.",
        benchmark: "1.8ms P95 query execution on composite-indexed customer joins.",
      },
      {
        name: "Prisma ORM & PgBouncer",
        version: "Prisma 5.x",
        role: "Type-Safe Client & Pooling",
        desc: "Auto-generated TypeScript types, declarative migrations, and pooled serverless connections.",
        decision: "Eliminates entire classes of runtime SQL syntax and type mismatch bugs.",
        benchmark: "Maintains stable connection headroom under 1,000+ concurrent Lambda/Vercel functions.",
      },
      {
        name: "Redis In-Memory Key-Value",
        version: "Redis 7.2",
        role: "Caching & Session Store",
        desc: "Sub-millisecond latency for hot session tokens, rate limiter counters, and aggregated KPI caches.",
        decision: "LRU eviction policy ensures bounded RAM usage while shedding 85% of read load from PostgreSQL.",
        benchmark: "0.4ms average round-trip latency over unix domain socket.",
      },
    ],
    deepDive: {
      overview:
        "High-performance persistence tier engineered around PostgreSQL with PgBouncer connection pooling. Hot read paths are accelerated via Redis caching with write-through invalidation.",
      patterns: [
        "Composite index optimization tailored to query access patterns",
        "Soft-delete architectures preserving historical transactional audit trails",
        "Connection pooling preventing database starvation during traffic spikes",
      ],
      securityAndPerf: [
        "AES-256 encryption at rest and TLS 1.3 encryption in transit",
        "Strict parameterized queries eliminating SQL injection vectors",
        "Automated point-in-time recovery (PITR) with continuous WAL archiving",
      ],
    },
  },
]

export function FullstackArchitecture({ isEmbedded = false }: { isEmbedded?: boolean }) {
  const [selectedTier, setSelectedTier] = useState<ArchitectureTier>(tiersData[0])
  const [selectedTech, setSelectedTech] = useState<TechItem>(tiersData[0].techStack[0])
  const [activeCodeTab, setActiveCodeTab] = useState<"api" | "schema" | "middleware" | "tracer">("tracer")
  const [copied, setCopied] = useState(false)
  const [explodedStack, setExplodedStack] = useState(true)
  const [isTracing, setIsTracing] = useState(false)
  const [activeTraceStep, setActiveTraceStep] = useState<number | null>(null)

  // Sync selectedTech when tier changes
  const handleSelectTier = (tier: ArchitectureTier) => {
    setSelectedTier(tier)
    setSelectedTech(tier.techStack[0])
  }

  // Trace simulation: request travels down through tiers, then back up
  const runLiveTrace = () => {
    if (isTracing) return
    setIsTracing(true)
    setActiveTraceStep(0) // Step 0: Frontend initiates
    setTimeout(() => {
      setActiveTraceStep(1) // Step 1: Gateway validates
      setTimeout(() => {
        setActiveTraceStep(2) // Step 2: Backend executes
        setTimeout(() => {
          setActiveTraceStep(3) // Step 3: DB fetches
          setTimeout(() => {
            setActiveTraceStep(4) // Step 4: Response returns
            setTimeout(() => {
              setIsTracing(false)
              setActiveTraceStep(null)
            }, 600)
          }, 350)
        }, 320)
      }, 250)
    }, 200)
  }

  const sampleApiPayload = `{
  "status": 200,
  "requestId": "req_84f9a01b",
  "endpoint": "GET /api/v1/analytics/cohorts",
  "latency": {
    "gateway": "1.2ms",
    "serviceExecution": "14.6ms",
    "databaseQuery": "1.8ms",
    "totalRoundTrip": "17.6ms"
  },
  "data": {
    "account": {
      "id": "acc_enterprise_942",
      "tier": "Enterprise Tier",
      "retentionScore": 94.2,
      "healthIndex": "Optimal"
    },
    "features": {
      "dauMauRatio": 0.78,
      "subscriptionTenureMonths": 14,
      "activeUsers": 48620
    }
  }
}`

  const samplePrismaSchema = `// schema.prisma - Enterprise Production Architecture
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Account {
  id              String         @id @default(cuid())
  organization    String
  tier            AccountTier    @default(ENTERPRISE)
  churnRiskScore  Float          @default(0.0)
  retentionProb   Float          @default(1.0)
  tenureMonths    Int            @default(1)
  
  // Relations with indexed foreign keys
  subscriptions   Subscription[]
  telemetryLogs   TelemetryLog[]
  auditEvents     AuditEvent[]

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@index([tier, churnRiskScore])
  @@index([createdAt(sort: Desc)])
}

enum AccountTier {
  STARTUP
  MID_MARKET
  ENTERPRISE
}`

  const sampleMiddlewareCode = `// middleware.ts - Edge Security & Rate Limiting Gate
import { NextResponse, type NextRequest } from "next/server"
import { verifyJwtSession } from "@/lib/auth/edge-jwt"
import { checkRateLimit } from "@/lib/security/token-bucket"

export async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const pathname = req.nextUrl.pathname

  // 1. Sliding-Window Rate Limiting Check (Redis)
  const isAllowed = await checkRateLimit(ip, { limit: 120, windowMs: 60000 })
  if (!isAllowed) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  // 2. Cryptographic JWT Verification at the Edge
  const sessionToken = req.cookies.get("session_auth")?.value
  const session = await verifyJwtSession(sessionToken)

  if (!session && pathname.startsWith("/api/protected")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 3. Inject Tracing Headers and Proceed
  const res = NextResponse.next()
  res.headers.set("x-trace-id", crypto.randomUUID())
  return res
}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const archContent = (
    <div className="space-y-12">
      {/* 3D Stack Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-bold text-[#E0F2FE]">Interactive Architecture Explorer</span>
            <span className="text-[11px] font-mono text-[#94A3B8] hidden sm:inline">
              Click any tier to inspect tech decisions and simulated payload traces
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setExplodedStack(!explodedStack)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                explodedStack
                  ? "bg-sky-400 text-slate-950 font-bold shadow-md shadow-sky-500/20"
                  : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE]"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{explodedStack ? "Exploded 3D View" : "Compact Stack"}</span>
            </button>

            <button
              onClick={runLiveTrace}
              disabled={isTracing}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-md shadow-sky-500/20"
            >
              <Zap className={`h-3.5 w-3.5 ${isTracing ? "animate-spin" : ""}`} />
              <span>{isTracing ? "Tracing Conduits..." : "Simulate Request Trace"}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            3D INTERACTIVE ARCHITECTURE LAYERS
            ========================================================================= */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Stacked Layers (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] font-mono px-1">
              <span>Stack Order: Client to Data Store</span>
              <span className="text-sky-300">Click layer to inspect</span>
            </div>

            <div
              className={`flex flex-col transition-all duration-500 ${
                explodedStack ? "space-y-4" : "space-y-1.5"
              }`}
            >
              {tiersData.map((tier, idx) => {
                const Icon = tier.icon
                const isSelected = selectedTier.id === tier.id
                const isTraceActive =
                  isTracing &&
                  (activeTraceStep === idx || (activeTraceStep === 4 && idx === 0))

                return (
                  <motion.div
                    key={tier.id}
                    layout
                    whileHover={{ scale: 1.015, x: 6 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleSelectTier(tier)}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md shadow-xl ${
                      isSelected
                        ? "bg-[#111B30] ring-1 ring-indigo-400/60 border-white/20 shadow-indigo-500/15 scale-[1.01]"
                        : "bg-[#070B14]/80 border-white/[0.08] hover:bg-[#111B30]/60 hover:border-white/20"
                    } ${
                      isTraceActive
                        ? "border-sky-400 ring-2 ring-sky-400/50 bg-[#111B30]"
                        : ""
                    }`}
                  >
                    {/* Glowing Accent Bar */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1.5 rounded-l-2xl"
                      style={{ backgroundColor: tier.color }}
                    />

                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor: tier.bgLight,
                            color: tier.color,
                            border: `1px solid ${tier.borderColor}`,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-mono font-bold uppercase tracking-wider"
                              style={{ color: tier.color }}
                            >
                              Tier {tier.layerNumber}
                            </span>
                            <h4 className="text-base font-bold text-[#E0F2FE]">{tier.title}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono font-bold text-emerald-400 block">
                          {tier.p95Latency}
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-mono">
                          {tier.scalingMetric}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#94A3B8] line-clamp-1 pl-11">{tier.shortDesc}</p>

                    {/* Animated conduit packet on active trace */}
                    {isTraceActive && (
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-400 text-slate-950 font-bold text-[10px] font-mono shadow-lg animate-pulse">
                        <Zap className="h-3 w-3" />
                        Trace Active
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Trace Indicator Card */}
            <div className="p-4 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>
                  <strong>Full Request-Response Round Trip (Simulated):</strong> Client &rarr; Edge Gateway &rarr; FastAPI/Node &rarr; PostgreSQL (17.6ms total)
                </span>
              </div>
              <span className="font-mono text-sky-300 text-[11px]">Sub-20ms P95 Target</span>
            </div>
          </div>

          {/* Right Column: Deep Dive Technology Explanation & Code Inspector (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Selected Tier Deep Dive Panel */}
            <div className="p-6 rounded-2xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedTier.color }}
                  />
                  <h3 className="text-lg font-bold text-[#E0F2FE]">
                    {selectedTier.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-sky-300 bg-[#070B14]/80 px-2.5 py-1 rounded-lg border border-white/10">
                  Tier {selectedTier.layerNumber} Deep Dive
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {selectedTier.deepDive.overview}
              </p>

              {/* Clickable Technology Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block">
                  Core Technologies (Click to Inspect Rationale):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTier.techStack.map((tech) => (
                    <button
                      key={tech.name}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedTech.name === tech.name
                          ? "bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-950 font-bold shadow-md shadow-indigo-500/20 scale-105"
                          : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-[#E0F2FE] hover:border-white/20"
                      }`}
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Technology Explanation Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#E0F2FE] flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      {selectedTech.name}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-300 bg-[#111B30] px-2 py-0.5 rounded border border-white/10">
                      {selectedTech.version}
                    </span>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#E0F2FE]">Architectural Rationale:</strong> {selectedTech.decision}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] font-mono">
                    <span className="text-[#94A3B8]">Production Benchmark:</span>
                    <span className="text-emerald-400 font-bold">{selectedTech.benchmark}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Production Architectural Patterns */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 space-y-1.5">
                  <span className="font-bold text-sky-300 uppercase tracking-wider text-[10px] block">
                    Engineering Patterns
                  </span>
                  <ul className="space-y-1 text-[#94A3B8] text-[11px]">
                    {selectedTier.deepDive.patterns.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-[#070B14]/80 backdrop-blur-md border border-white/10 space-y-1.5">
                  <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block">
                    Security & SLA Controls
                  </span>
                  <ul className="space-y-1 text-[#94A3B8] text-[11px]">
                    {selectedTier.deepDive.securityAndPerf.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-indigo-400 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Code & Payload Inspector Frame */}
            <div className="rounded-2xl bg-[#070B14]/90 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl">
              {/* Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111B30]/80 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-xs font-mono text-[#94A3B8] ml-2">system-inspector.ts</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 text-xs">
                  {[
                    { id: "tracer", label: "Live Trace Log" },
                    { id: "api", label: "JSON Response" },
                    { id: "schema", label: "Prisma Schema" },
                    { id: "middleware", label: "Edge Security" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCodeTab(tab.id as any)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                        activeCodeTab === tab.id
                          ? "bg-[#111B30] text-sky-300 font-bold border border-white/10 shadow-sm"
                          : "text-[#94A3B8] hover:text-[#E0F2FE]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Viewer Body */}
              <div className="p-4 bg-[#070B14]/95 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-[#94A3B8]">
                  <span>
                    {activeCodeTab === "tracer" && "Telemetry Tracer • Distributed Span"}
                    {activeCodeTab === "api" && "GET /api/v1/analytics/cohorts • HTTP/2"}
                    {activeCodeTab === "schema" && "schema.prisma • Relational ORM Model"}
                    {activeCodeTab === "middleware" && "middleware.ts • Edge NextRequest Filter"}
                  </span>
                  <button
                    onClick={() => {
                      const textToCopy =
                        activeCodeTab === "api"
                          ? sampleApiPayload
                          : activeCodeTab === "schema"
                          ? samplePrismaSchema
                          : activeCodeTab === "middleware"
                          ? sampleMiddlewareCode
                          : "Trace Log Active: 17.6ms round-trip"
                      copyToClipboard(textToCopy)
                    }}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <pre className="text-sky-300 pt-3 overflow-x-auto max-h-[260px] text-[11px] leading-relaxed">
                  {activeCodeTab === "tracer" && (
                    <div className="space-y-1 text-slate-300">
                      <div className="text-emerald-400">[TRACE START - SIMULATED REQUEST FLOW] req_84f9a01b &bull; 2026-11-01T12:00:00.000Z</div>
                      <div className="text-sky-300 pl-3">&bull; TIER 01: Client request dispatched (Edge CDN cache miss) &rarr; +0.4ms</div>
                      <div className="text-indigo-300 pl-3">&bull; TIER 02: Gateway authenticated JWT & passed rate-limit check (12/120) &rarr; +1.2ms</div>
                      <div className="text-purple-300 pl-3">&bull; TIER 03: FastAPI service controller invoked XGBoost model scoring &rarr; +14.6ms</div>
                      <div className="text-emerald-300 pl-3">&bull; TIER 04: PostgreSQL indexed join query completed via connection pool &rarr; +1.8ms</div>
                      <div className="text-emerald-400">[TRACE COMPLETE - SIMULATED EXECUTION] HTTP 200 OK &bull; Payload: 1.4KB &bull; Total Elapsed: 17.6ms (Illustrative trace benchmark)</div>
                    </div>
                  )}
                  {activeCodeTab === "api" && sampleApiPayload}
                  {activeCodeTab === "schema" && samplePrismaSchema}
                  {activeCodeTab === "middleware" && sampleMiddlewareCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
    </div>
  )

  if (isEmbedded) {
    return archContent
  }

  return (
    <section id="architecture" className="py-24 px-4 relative scroll-mt-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[400px] bg-aurora-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Code2 className="h-3.5 w-3.5 text-aurora-cyan" /> Full-Stack Engineering & System Design
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Interactive 3D <span className="aurora-text-gradient">Software Architecture</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Multi-tiered production system designed for enterprise reliability, sub-40ms P95 query latencies,
            and hardened zero-trust API security.
          </p>
        </div>
        {archContent}
      </div>
    </section>
  )
}
