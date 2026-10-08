"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Terminal } from "lucide-react"

export function TechUniverse() {
  const categories = [
    "All",
    "Data & Analytics",
    "AI / ML",
    "Frontend",
    "Backend & APIs",
    "Databases",
    "Salesforce",
    "UI/UX Design",
    "Cloud & DevOps",
  ]

  const [activeCategory, setActiveCategory] = useState("All")

  const technologies = [
    { name: "Python", category: "Data & Analytics", level: "Expert", icon: "🐍" },
    { name: "SQL (PostgreSQL/MySQL)", category: "Databases", level: "Advanced", icon: "🗄️" },
    { name: "Power BI", category: "Data & Analytics", level: "Advanced", icon: "📊" },
    { name: "Tableau", category: "Data & Analytics", level: "Proficient", icon: "📈" },
    { name: "Excel Advanced / VBA", category: "Data & Analytics", level: "Expert", icon: "📑" },
    { name: "Pandas & NumPy", category: "Data & Analytics", level: "Expert", icon: "🐼" },
    { name: "Scikit-Learn", category: "AI / ML", level: "Advanced", icon: "🧠" },
    { name: "PyTorch", category: "AI / ML", level: "Proficient", icon: "🔥" },
    { name: "TensorFlow", category: "AI / ML", level: "Proficient", icon: "⚡" },
    { name: "NLP & Transformer Models", category: "AI / ML", level: "Advanced", icon: "🤖" },
    { name: "Predictive Analytics", category: "AI / ML", level: "Advanced", icon: "🔮" },
    { name: "JavaScript (ES6+)", category: "Frontend", level: "Expert", icon: "🟨" },
    { name: "TypeScript", category: "Frontend", level: "Advanced", icon: "🔷" },
    { name: "React 19", category: "Frontend", level: "Expert", icon: "⚛️" },
    { name: "Next.js (App Router)", category: "Frontend", level: "Advanced", icon: "▲" },
    { name: "Tailwind CSS", category: "Frontend", level: "Expert", icon: "🎨" },
    { name: "Framer Motion", category: "Frontend", level: "Advanced", icon: "🎬" },
    { name: "Node.js", category: "Backend & APIs", level: "Advanced", icon: "🟢" },
    { name: "Express.js", category: "Backend & APIs", level: "Advanced", icon: "🚂" },
    { name: "REST APIs & JSON", category: "Backend & APIs", level: "Expert", icon: "🔌" },
    { name: "MongoDB", category: "Databases", level: "Advanced", icon: "🍃" },
    { name: "PostgreSQL", category: "Databases", level: "Advanced", icon: "🐘" },
    { name: "Salesforce Apex", category: "Salesforce", level: "Certified PD-I", icon: "☁️" },
    { name: "Lightning Web Components", category: "Salesforce", level: "Certified PD-I", icon: "⚡" },
    { name: "SOQL & SOSL", category: "Salesforce", level: "Advanced", icon: "🔍" },
    { name: "Salesforce Flows & Process", category: "Salesforce", level: "Expert", icon: "🔄" },
    { name: "Salesforce DX & CLI", category: "Salesforce", level: "Advanced", icon: "🛠️" },
    { name: "Figma", category: "UI/UX Design", level: "Advanced", icon: "📐" },
    { name: "Design Systems & Tokens", category: "UI/UX Design", level: "Advanced", icon: "🧩" },
    { name: "Wireframing & Prototyping", category: "UI/UX Design", level: "Expert", icon: "📱" },
    { name: "Git & GitHub", category: "Cloud & DevOps", level: "Advanced", icon: "🐙" },
    { name: "Docker", category: "Cloud & DevOps", level: "Proficient", icon: "🐳" },
    { name: "Vercel / Cloudflare", category: "Cloud & DevOps", level: "Advanced", icon: "🚀" },
    { name: "AWS Basics", category: "Cloud & DevOps", level: "Certified", icon: "☁️" },
    { name: "Postman", category: "Backend & APIs", level: "Expert", icon: "📮" },
  ]

  const filtered =
    activeCategory === "All"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory)

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Terminal className="h-3.5 w-3.5" /> Technology Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            The <span className="aurora-text-gradient">Technology Universe</span>
          </h2>
          <p className="text-base text-[#94A3B8]">
            Curated tools, frameworks, and platforms spanning analytical calculation, software architecture, and design execution.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-aurora-blue to-aurora-violet text-white shadow-md shadow-aurora-blue/20"
                  : "bg-[#111827] text-[#94A3B8] border border-[#26324A] hover:text-[#F8FAFC] hover:border-[#38BDF8]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <motion.div layout className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
          <AnimatePresence>
            {filtered.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B1020]/90 border border-[#26324A] hover:border-aurora-cyan/40 hover:bg-[#151D32] transition-all cursor-default shadow-sm"
              >
                <span className="text-base">{tech.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-[#F8FAFC] group-hover:text-aurora-cyan transition-colors">
                  {tech.name}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono pl-1 border-l border-[#26324A]">
                  {tech.level}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
