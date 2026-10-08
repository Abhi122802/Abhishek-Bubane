"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, CheckCircle2, TrendingUp, Award, Layers } from "lucide-react"

export function AboutMultidisciplinary() {
  const stats = [
    { value: "10+", label: "Technology Domains", subtext: "From SQL to PyTorch & LWC" },
    { value: "25+", label: "Projects Delivered", subtext: "Data, Web & CRM Systems" },
    { value: "5+", label: "Certifications", subtext: "Salesforce PD-I, Cloud & AI" },
    { value: "12+", label: "Collaborations", subtext: "Clients, Startups & Teams" },
  ]

  const highlights = [
    "Synthesizing quantitative data analysis with human-centered product design.",
    "Certified Salesforce Platform Developer I with full-stack enterprise engineering depth.",
    "Designing high-conversion UI/UX workflows with Figma and modern component design tokens.",
    "Documenting stories and architecture through cinematic digital photography.",
  ]

  return (
    <section id="about" className="py-24 px-4 relative scroll-mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#151D32] border border-[#26324A] text-xs font-semibold text-aurora-cyan uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> About Me
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F8FAFC]">
            One Mind, <span className="aurora-text-gradient">Multiple Dimensions</span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            Bridging analytical data precision with creative software craftsmanship and aesthetic visual storytelling.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Large Professional Portrait Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md rounded-2xl p-2 bg-gradient-to-b from-[#26324A] to-[#151D32] shadow-2xl">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0B1020]">
                <Image
                  src="/profile.jpg"
                  alt="Abhishek Balasaheb Bubane Portrait"
                  fill
                  className="object-cover object-[50%_12%]"
                />
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-80" />

                {/* Floating identity pill at bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#F8FAFC]">Abhishek Balasaheb Bubane</h4>
                      <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mt-0.5">
                        <MapPin className="h-3 w-3 text-aurora-cyan" /> Maharashtra, India
                      </div>
                    </div>
                    <Badge className="bg-aurora-blue/20 text-aurora-blue border-aurora-blue/40 text-[10px]">
                      Open to Work
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Stats (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                I don't just write code or build models — I engineer <span className="aurora-text-gradient">end-to-end digital solutions.</span>
              </h3>
              <p className="text-[#94A3B8] leading-relaxed text-base sm:text-lg">
                Modern technology challenges rarely live in silos. An effective AI solution requires clean data engineering,
                a performant full-stack application layer, seamless CRM workflow automation, and an intuitive UI/UX
                interface that real people can understand and use.
              </p>
              <p className="text-[#94A3B8] leading-relaxed text-base">
                Having mastered disciplines across data science, cloud databases, full-stack web architectures, Salesforce Apex/LWC,
                and Figma product design, I bridge the gap between technical complexity and business impact.
              </p>
            </div>

            {/* Core Values / Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111827]/70 border border-[#26324A]/60"
                >
                  <CheckCircle2 className="h-4 w-4 text-aurora-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#F8FAFC]/90 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Animated Counters / Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#26324A]/70">
              {stats.map((s) => (
                <div key={s.label} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] aurora-text-gradient">
                    {s.value}
                  </div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">{s.label}</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">{s.subtext}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
