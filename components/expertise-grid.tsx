"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Cpu,
  Code2,
  Database,
  Palette,
  Camera,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"

export function ExpertiseGrid() {
  const cards = [
    {
      id: "data-analytics",
      anchor: "#data-lab",
      title: "Data Analytics",
      badge: "Intelligence & Insights",
      icon: BarChart3,
      accent: "from-aurora-blue to-aurora-cyan",
      borderColor: "hover:border-aurora-cyan/50",
      glowColor: "rgba(56, 189, 248, 0.15)",
      description:
        "Transforming massive raw business datasets into executive KPI dashboards, statistical insights, and data-backed decisions.",
      skills: ["SQL", "Excel", "Power BI", "Tableau", "Python", "Statistics", "Data Modeling"],
    },
    {
      id: "data-science",
      anchor: "#ai-lab",
      title: "Data Science & AI",
      badge: "Machine Learning & NLP",
      icon: Cpu,
      accent: "from-aurora-violet to-aurora-purple",
      borderColor: "hover:border-aurora-violet/50",
      glowColor: "rgba(139, 92, 246, 0.15)",
      description:
        "Building end-to-end intelligent systems, predictive models, NLP text classifiers, and neural architectures that solve real-world problems.",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Predictive Analytics", "Scikit-Learn", "PyTorch"],
    },
    {
      id: "full-stack",
      anchor: "#architecture",
      title: "Full-Stack Engineering",
      badge: "Scalable Web Systems",
      icon: Code2,
      accent: "from-aurora-cyan to-aurora-blue",
      borderColor: "hover:border-aurora-cyan/50",
      glowColor: "rgba(34, 211, 238, 0.15)",
      description:
        "Architecting modern, blazing-fast web applications with React, Next.js, robust Node.js REST APIs, and relational/document databases.",
      skills: ["React", "Next.js", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs"],
    },
    {
      id: "salesforce",
      anchor: "#salesforce",
      title: "Salesforce Development",
      badge: "Enterprise CRM & Flows",
      icon: Database,
      accent: "from-aurora-purple to-aurora-blue",
      borderColor: "hover:border-aurora-purple/50",
      glowColor: "rgba(167, 139, 250, 0.15)",
      description:
        "Customizing enterprise Salesforce clouds with clean Apex controllers, Lightning Web Components (LWC), SOQL optimization, and automated Flows.",
      skills: ["Apex", "LWC", "SOQL", "Process Automation", "Flows", "Salesforce DX", "Platform Developer I"],
    },
    {
      id: "ui-ux",
      anchor: "#design",
      title: "UI/UX Product Design",
      badge: "Human-Centered Design",
      icon: Palette,
      accent: "from-aurora-amber to-pink-500",
      borderColor: "hover:border-aurora-amber/50",
      glowColor: "rgba(251, 191, 36, 0.15)",
      description:
        "Designing polished SaaS product interfaces, scalable design systems, interactive Figma prototypes, and friction-free user journeys.",
      skills: ["Figma", "Wireframing", "Prototypes", "Design Systems", "User Research", "Interaction Design"],
    },
    {
      id: "photography",
      anchor: "#photography",
      title: "Cinematic Photography",
      badge: "Visual Storytelling",
      icon: Camera,
      accent: "from-aurora-emerald to-aurora-cyan",
      borderColor: "hover:border-aurora-emerald/50",
      glowColor: "rgba(52, 211, 153, 0.15)",
      description:
        "Capturing human emotion, architectural geometry, and natural light through high-resolution photography and editorial visual compositions.",
      skills: ["Portraits", "Street", "Landscape", "Architecture", "Product", "Creative Photography"],
    },
  ]

  return (
    <section id="expertise" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Multidisciplinary Core
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            Six Pillars of <span className="aurora-text-gradient">Technical & Creative Depth</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Every capability reinforces the next: data fuels AI, software delivers products, CRM automates workflows,
            design crafts experiences, and photography tells the human story.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group rounded-2xl p-6 bg-[#0B1020]/90 border border-[#26324A] transition-all duration-300 ${card.borderColor} flex flex-col justify-between relative overflow-hidden`}
              style={{
                boxShadow: `0 8px 30px -10px ${card.glowColor}`,
              }}
            >
              {/* Background gradient flare on hover */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} p-[1px] shadow-md`}
                  >
                    <div className="w-full h-full bg-[#0B1020] rounded-[11px] flex items-center justify-center text-[#F8FAFC]">
                      <card.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#94A3B8] bg-[#151D32] px-2.5 py-1 rounded-full border border-[#26324A]">
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#F8FAFC] group-hover:text-aurora-cyan transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#94A3B8] leading-relaxed">{card.description}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#151D32] text-[#94A3B8] border border-[#26324A]/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Explore CTA Link */}
              <div className="pt-6 border-t border-[#26324A]/70 mt-6 relative z-10">
                <a
                  href={card.anchor}
                  className="inline-flex items-center text-xs font-semibold text-aurora-cyan group-hover:text-[#F8FAFC] transition-colors"
                >
                  Explore Studio Module
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
