"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Mail, 
  Send, 
  Linkedin, 
  Github, 
  Twitter, 
  Instagram, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  PhoneCall,
  ArrowRight
} from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Construct mailto link as reliable client fallback
    const mailtoUrl = `mailto:abhibubane12@gmail.com?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      window.location.href = mailtoUrl
    }, 600)
  }

  return (
    <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B14] via-[#0A0E1A] to-[#070B14] overflow-hidden border-t border-white/10">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Availability Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111B30]/80 backdrop-blur-md border border-white/10 text-xs font-medium text-slate-200 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-emerald-400">Available for selected opportunities</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Full-time, Contract & Advisory</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#E0F2FE] tracking-tight leading-tight">
            Have an idea, problem, or <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              project worth solving?
            </span>
          </h2>
          <p className="mt-5 text-[#94A3B8] text-lg sm:text-xl font-light">
            "Let's turn it into something meaningful."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl">
              <h3 className="text-xl font-bold text-[#E0F2FE] mb-2">Connect Directly</h3>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                Whether you need data science consulting, scalable full-stack development, Salesforce automation, or creative direction, I respond within 24 hours.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4">
                <a
                  href="mailto:abhibubane12@gmail.com"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08] hover:border-white/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider block">Email Inquiries</span>
                    <span className="text-sm font-semibold text-[#E0F2FE] group-hover:text-cyan-300 transition-colors truncate block">
                      abhibubane12@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider block">Location</span>
                    <span className="text-sm font-semibold text-[#E0F2FE]">
                      Maharashtra, India (Open to Remote Globally)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.08]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider block">Timezone</span>
                    <span className="text-sm font-semibold text-[#E0F2FE]">
                      IST (UTC+5:30) • Flexible for US/EU overlaps
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels Network */}
              <div className="pt-8 mt-8 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] block mb-4">
                  Professional Networks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/abhishek-bubane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#070B14]/80 text-[#E0F2FE]/80 hover:text-white border border-white/10 hover:border-blue-400 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/Abhibubane12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#070B14]/80 text-[#E0F2FE]/80 hover:text-white border border-white/10 hover:border-slate-400 transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/AbhiBubane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#070B14]/80 text-[#E0F2FE]/80 hover:text-white border border-white/10 hover:border-cyan-400 transition-all hover:scale-110"
                    aria-label="Twitter / X"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com/abhis_photography__"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#070B14]/80 text-[#E0F2FE]/80 hover:text-white border border-white/10 hover:border-pink-400 transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E0F2FE]">Message Prepared!</h3>
                  <p className="text-[#94A3B8] text-sm max-w-md mx-auto">
                    Your email client has been opened with your inquiry. You can also reach out directly anytime at{" "}
                    <span className="text-cyan-400 font-mono">abhibubane12@gmail.com</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-[#070B14]/80 border border-white/10 text-[#E0F2FE] hover:bg-[#111B30] text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#070B14]/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-[#E0F2FE] placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                        Your Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#070B14]/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-[#E0F2FE] placeholder-slate-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Subject / Discipline of Interest
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js App, Salesforce Architecture, or Data Pipeline"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#070B14]/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-[#E0F2FE] placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Message / Project Scope <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project, timeline, target goals, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#070B14]/80 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-[#E0F2FE] placeholder-slate-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:opacity-95 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        Initiating...
                      </span>
                    ) : (
                      <>
                        <span>Start a Conversation</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
