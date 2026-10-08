"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  Filter,
  Layers,
} from "lucide-react"

export function DataAnalyticsLab() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D" | "1Y">("30D")

  // Realistic mock data corresponding to timeframe
  const dataSets = {
    "7D": [
      { name: "Mon", revenue: 12400, target: 11000, users: 3400 },
      { name: "Tue", revenue: 14800, target: 12000, users: 4100 },
      { name: "Wed", revenue: 19200, target: 14000, users: 5200 },
      { name: "Thu", revenue: 16800, target: 13000, users: 4800 },
      { name: "Fri", revenue: 24500, target: 18000, users: 6900 },
      { name: "Sat", revenue: 21900, target: 17000, users: 6200 },
      { name: "Sun", revenue: 26800, target: 20000, users: 7400 },
    ],
    "30D": [
      { name: "W1", revenue: 78000, target: 65000, users: 19200 },
      { name: "W2", revenue: 92400, target: 75000, users: 24100 },
      { name: "W3", revenue: 118000, target: 90000, users: 31000 },
      { name: "W4", revenue: 136500, target: 105000, users: 38400 },
    ],
    "90D": [
      { name: "Month 1", revenue: 312000, target: 280000, users: 84000 },
      { name: "Month 2", revenue: 389000, target: 320000, users: 104000 },
      { name: "Month 3", revenue: 462000, target: 390000, users: 128000 },
    ],
    "1Y": [
      { name: "Q1", revenue: 980000, target: 850000, users: 260000 },
      { name: "Q2", revenue: 1150000, target: 990000, users: 310000 },
      { name: "Q3", revenue: 1340000, target: 1150000, users: 380000 },
      { name: "Q4", revenue: 1580000, target: 1300000, users: 450000 },
    ],
  }

  const channelData = [
    { channel: "Organic Search", visitors: 42500, color: "#38BDF8" },
    { channel: "Direct Referral", visitors: 28400, color: "#8B5CF6" },
    { channel: "Product Hunt", visitors: 19200, color: "#22D3EE" },
    { channel: "Email & CRM", visitors: 14800, color: "#34D399" },
    { channel: "Social / Tech", visitors: 11600, color: "#FBBF24" },
  ]

  const cohortMixData = [
    { name: "Enterprise", value: 48, color: "#38BDF8" },
    { name: "Mid-Market", value: 32, color: "#8B5CF6" },
    { name: "Startups", value: 20, color: "#34D399" },
  ]

  return (
    <section id="data-lab" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <BarChart3 className="h-3.5 w-3.5" /> Interactive Analytics Lab
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Enterprise <span className="aurora-text-gradient">Data Intelligence Dashboard</span>
          </h2>
          <p className="text-base sm:text-lg font-medium text-aurora-cyan/90">
            "Turning raw data into actionable decisions."
          </p>
          <p className="text-sm text-[#94A3B8] max-w-2xl mx-auto">
            A live simulation of high-granularity executive dashboards I design using SQL transformations,
            Python analytical logic, and modern frontend data visualizers.
          </p>
        </div>

        {/* Dashboard Shell Frame */}
        <div className="rounded-2xl bg-[#0B1020]/95 border border-[#26324A] p-6 lg:p-8 shadow-2xl space-y-8">
          {/* Dashboard Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#26324A]/70">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-bold text-[#F8FAFC]">Global Performance Analytics</h3>
              </div>
              <span className="text-xs text-[#94A3B8]">Telemetry data synchronized via SQL automated pipelines</span>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#151D32] border border-[#26324A]">
              {(["7D", "30D", "90D", "1Y"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    timeframe === t
                      ? "bg-aurora-blue text-white shadow-sm"
                      : "text-[#94A3B8] hover:text-[#F8FAFC]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Realistic Executive KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "ARR / Revenue Run Rate",
                value: "$1,248,500",
                change: "+18.4%",
                trend: "vs previous period",
                icon: DollarSign,
                color: "text-aurora-blue",
              },
              {
                title: "Active Platform Users",
                value: "48,620",
                change: "+12.1%",
                trend: "organic + referral",
                icon: Users,
                color: "text-aurora-violet",
              },
              {
                title: "Conversion to Paid",
                value: "4.82%",
                change: "+0.8%",
                trend: "LTV:CAC ratio 4.2x",
                icon: Target,
                color: "text-aurora-emerald",
              },
              {
                title: "Net Retention Rate",
                value: "114.6%",
                change: "+2.4%",
                trend: "cohort churn 1.2%",
                icon: TrendingUp,
                color: "text-aurora-amber",
              },
            ].map((kpi) => (
              <div
                key={kpi.title}
                className="p-5 rounded-xl bg-[#111827]/80 border border-[#26324A]/70 space-y-2 hover:border-[#38BDF8]/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>{kpi.title}</span>
                  <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
                <div className="text-2xl font-bold text-[#F8FAFC]">{kpi.value}</div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-emerald-400 font-semibold">{kpi.change}</span>
                  <span className="text-[#94A3B8]/80 text-[11px]">{kpi.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row: Trend Chart (8 cols) + Mix & Channel (4 cols) */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Primary Area Chart (8 cols) */}
            <div className="lg:col-span-8 p-6 rounded-xl bg-[#111827]/70 border border-[#26324A]/70 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#F8FAFC]">Revenue Growth & Target Projections</h4>
                  <p className="text-xs text-[#94A3B8]">Historical performance vs automated statistical forecasts</p>
                </div>
                <span className="text-[11px] font-mono text-aurora-cyan px-2.5 py-1 rounded bg-[#151D32] border border-[#26324A]">
                  Active: {timeframe}
                </span>
              </div>

              <div className="h-64 sm:h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataSets[timeframe]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#26324A" opacity={0.5} />
                    <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0B1020",
                        borderColor: "#26324A",
                        borderRadius: "12px",
                        fontSize: "12px",
                        color: "#F8FAFC",
                      }}
                      formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#38BDF8"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#revenueGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#8B5CF6"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#targetGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channels & Mix (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Acquisition Channels Bar Chart */}
              <div className="p-5 rounded-xl bg-[#111827]/70 border border-[#26324A]/70 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#94A3B8]">
                  Acquisition Channel Volume
                </h4>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 10, left: 15, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="channel" type="category" stroke="#94A3B8" fontSize={10} tickLine={false} width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0B1020",
                          borderColor: "#26324A",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                      <Bar dataKey="visitors" fill="#38BDF8" radius={[0, 6, 6, 0]}>
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Customer Tier Donut Mix */}
              <div className="p-5 rounded-xl bg-[#111827]/70 border border-[#26324A]/70 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#94A3B8]">Revenue by Customer Tier</h4>
                  <span className="text-[11px] font-mono text-emerald-400">100% Attributed</span>
                </div>
                <div className="flex items-center justify-around pt-2">
                  <div className="h-24 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cohortMixData}
                          innerRadius={28}
                          outerRadius={44}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {cohortMixData.map((entry, index) => (
                            <Cell key={`pie-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1 text-xs">
                    {cohortMixData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[#94A3B8]">{item.name}:</span>
                        <span className="font-bold text-[#F8FAFC]">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
