"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Sparkles,
  BarChart3,
  Code2,
  Cpu,
  Layers,
  Camera,
  Database,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroMultidisciplinary() {
  const disciplines = [
    "Data Analyst",
    "Data Scientist",
    "Full-Stack Developer",
    "Salesforce Developer",
    "UI/UX Designer",
    "Photographer",
  ]

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151D32]/80 border border-[#26324A] shadow-sm backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-aurora-cyan" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Multidisciplinary Technology & Design Studio
              </span>
            </motion.div>

            {/* Giant Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08]">
                I Turn <span className="aurora-text-gradient">Data</span> Into Intelligence <br />
                And Ideas Into <span className="aurora-text-gradient">Digital Experiences.</span>
              </h1>

              {/* Roles subheadline banner */}
              <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base font-medium text-[#94A3B8]">
                {disciplines.map((role, idx) => (
                  <span key={role} className="flex items-center gap-3">
                    <span className="hover:text-aurora-cyan transition-colors">{role}</span>
                    {idx < disciplines.length - 1 && (
                      <span className="text-aurora-violet/60 font-bold">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Short Narrative statement */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
              I operate at the intersection of data science, artificial intelligence, software engineering,
              enterprise Salesforce solutions, UI/UX architecture, and cinematic visual storytelling —
              turning complex challenges into intelligent, scalable, and beautifully designed digital systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-aurora-blue via-aurora-violet to-aurora-purple text-white hover:opacity-95 shadow-lg shadow-aurora-blue/20 rounded-xl px-7 font-semibold h-12"
              >
                <a href="#projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#26324A] bg-[#111827]/70 text-[#F8FAFC] hover:bg-[#151D32] hover:border-aurora-cyan/50 rounded-xl px-7 font-semibold h-12 transition-all"
              >
                <a href="#contact">Let's Connect</a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D32]/50 rounded-xl px-5 h-12"
              >
                <a
                  href="https://drive.google.com/file/d/1Ly7v_7PTshSX3_bibUZSJeillfMH6PN2/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4 text-aurora-cyan" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Social links */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs uppercase tracking-widest text-[#94A3B8]/70 font-semibold mr-2">
                Connect
              </span>
              {[
                { icon: Github, href: "https://github.com/Abhi122802", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-bubane", label: "LinkedIn" },
                { icon: Instagram, href: "https://instagram.com/abhis_photography__", label: "Instagram" },
                { icon: Mail, href: "mailto:abhibubane12@gmail.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#111827] border border-[#26324A] flex items-center justify-center text-[#94A3B8] hover:text-aurora-cyan hover:border-aurora-cyan/40 hover:bg-[#151D32] transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Futuristic Visual Composition (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient circular backdrop */}
            <div className="relative w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] flex items-center justify-center">
              {/* Spinning decorative orbit rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#26324A] animate-spin-slow opacity-60" />
              <div className="absolute -inset-6 rounded-full border border-aurora-blue/15 animate-spin-slow [animation-direction:reverse] opacity-40" />

              {/* Center Portrait / Identity Anchor */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1 bg-gradient-to-tr from-aurora-blue via-aurora-violet to-aurora-purple shadow-2xl shadow-aurora-violet/25 z-20">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B1020] border-4 border-[#070B14]">
                  <Image
                    src="/profile.jpg"
                    alt="Abhishek Balasaheb Bubane"
                    fill
                    priority
                    className="object-cover object-[50%_12%] scale-100"
                  />
                  {/* Subtle glass rim and smooth bottom fade into circle frame */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/30 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Connected Orbit Dimension 1: Data Analytics Node */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 z-30 p-3 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-aurora-blue/15 flex items-center justify-center text-aurora-blue">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F8FAFC]">Data Analytics</div>
                  <div className="text-[10px] text-aurora-emerald font-mono">+18.4% Accuracy</div>
                </div>
              </motion.div>

              {/* Connected Orbit Dimension 2: AI Neural Network Node */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-2 -right-8 z-30 p-3 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-aurora-violet/20 flex items-center justify-center text-aurora-violet">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F8FAFC]">AI & Intelligence</div>
                  <div className="text-[10px] text-[#94A3B8] font-mono">PyTorch • NLP • ML</div>
                </div>
              </motion.div>

              {/* Connected Orbit Dimension 3: Full Stack Software Code */}
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-12 -translate-y-1/2 z-30 p-2.5 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5 font-mono text-[11px] text-aurora-cyan"
              >
                <Code2 className="h-4 w-4 text-aurora-blue" />
                <span>{"<FullStack />"}</span>
              </motion.div>

              {/* Connected Orbit Dimension 4: Salesforce Enterprise CRM */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-1/2 -right-12 -translate-y-1/2 z-30 p-2.5 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5"
              >
                <Database className="h-4 w-4 text-aurora-purple" />
                <span className="text-[11px] font-semibold text-[#F8FAFC]">Salesforce PD-I</span>
              </motion.div>

              {/* Connected Orbit Dimension 5: UI/UX Studio */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-4 -left-6 z-30 p-3 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-aurora-amber/15 flex items-center justify-center text-aurora-amber">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F8FAFC]">UI/UX Studio</div>
                  <div className="text-[10px] text-[#94A3B8]">Figma • Systems</div>
                </div>
              </motion.div>

              {/* Connected Orbit Dimension 6: Visual Storytelling Photography */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-4 -right-6 z-30 p-3 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-aurora-emerald/15 flex items-center justify-center text-aurora-emerald">
                  <Camera className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#F8FAFC]">Photography</div>
                  <div className="text-[10px] text-[#94A3B8] font-mono">f/1.4 • 85mm</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
