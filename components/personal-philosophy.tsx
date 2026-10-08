"use client"

import React from "react"
import { motion } from "framer-motion"
import { Compass, Sparkles, Layers } from "lucide-react"

export function PersonalPhilosophy() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B14] via-[#0B1020] to-[#070B14] overflow-hidden border-t border-[#26324A]/60 text-center">
      {/* Background Aurora Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <Compass className="w-3.5 h-3.5" />
          Core Personal Philosophy
        </motion.div>

        {/* Large Statement Typography */}
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
          >
            Analyze deeply.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 leading-none"
          >
            Build intelligently.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 leading-none"
          >
            Design intentionally.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 leading-none"
          >
            Capture beautifully.
          </motion.div>
        </div>

        {/* Supporting Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-14 max-w-2xl mx-auto p-6 rounded-2xl bg-[#151D32]/70 backdrop-blur-md border border-[#26324A] shadow-2xl"
        >
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
            "Engineering without empathy produces rigid systems. Design without technical rigor produces fragile illusions. By intertwining data intelligence, scalable code, and visual storytelling, we craft digital products that truly resonate."
          </p>
          <div className="mt-4 pt-4 border-t border-[#26324A]/60 flex items-center justify-center gap-3 text-xs font-mono text-cyan-400">
            <span>DATA</span> • <span>AI</span> • <span>CODE</span> • <span>SALESFORCE</span> • <span>DESIGN</span> • <span>PHOTOGRAPHY</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
