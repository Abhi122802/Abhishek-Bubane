"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Database,
  Code2,
  Palette,
  Camera,
  Layers,
  BarChart3,
  Cpu,
  Mail,
  User,
  Workflow,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [pillarsDropdownOpen, setPillarsDropdownOpen] = useState(false)
  const pathname = usePathname()

  // 4 Core Career Pillars
  const careerPillars = [
    { label: "Data Analyst", id: "data-lab", icon: BarChart3, color: "text-aurora-cyan" },
    { label: "Data Engineer", id: "data-engineering", icon: Workflow, color: "text-aurora-blue" },
    { label: "Full-Stack Dev", id: "architecture", icon: Code2, color: "text-aurora-violet" },
    { label: "AI Engineer", id: "ai-lab", icon: Cpu, color: "text-aurora-purple" },
  ]

  const navItems = [
    { href: "/about", label: "About", icon: User },
    { href: "#operations-center", label: "Operations Lab", icon: Cpu },
    { href: "#projects", label: "Projects", icon: Layers },
    { href: "#experience", label: "Experience", icon: Workflow },
    { href: "#certifications", label: "Credentials", icon: Sparkles },
    { href: "#specialized-studios", label: "Studios", icon: Camera },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  // Standalone Sub-Page Links
  const standalonePages = [
    { href: "/about", label: "Full Journey (/about)" },
    { href: "/projects", label: "All Projects (/projects)" },
    { href: "/photography", label: "Darkroom Studio (/photography)" },
    { href: "/contact", label: "Get in Touch (/contact)" },
  ]

  // Smart Anchor Resolver: On "/" uses local anchor "#id"; on sub-pages uses "/#id"
  const resolveHref = (anchor: string) => {
    if (!anchor.startsWith("#")) return anchor
    return pathname === "/" ? anchor : `/${anchor}`
  }

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Active section observer on root page
  useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = [
      "hero",
      "overview",
      "career-pillars",
      "operations-center",
      "projects",
      "experience",
      "certifications",
      "specialized-studios",
      "contact",
    ]

    const handleScrollObserver = () => {
      const scrollPos = window.scrollY + 200
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScrollObserver, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollObserver)
  }, [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070B14]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl shadow-cyan-950/20 py-3"
            : "bg-transparent backdrop-blur-[3px] py-5"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-between max-w-7xl">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-cyan via-aurora-blue to-aurora-violet p-[1px] shadow-sm shadow-aurora-cyan/20">
              <div className="w-full h-full bg-[#0B1020] rounded-[11px] flex items-center justify-center font-bold text-sm tracking-wider text-[#E0F2FE] group-hover:bg-transparent transition-colors">
                AB
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-[#E0F2FE] text-base group-hover:text-aurora-cyan transition-colors">
                Abhishek Bubane
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] font-semibold">
                Command Center
              </span>
            </div>
          </Link>

          {/* 4 Career Pillar Quick Shortcuts (Desktop Centered) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider pl-1 pr-2 border-r border-white/10">
              Pillars:
            </span>
            {careerPillars.map((p) => {
              const Icon = p.icon
              const isPillarActive =
                activeSection === p.id ||
                (p.label === "Data Analyst" && activeSection === "data-lab") ||
                (p.label === "AI Engineer" && activeSection === "ai-lab") ||
                (p.label.includes("Engineer") && activeSection === "architecture")

              return (
                <a
                  key={p.label}
                  href={resolveHref(`#${p.id}`)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                    isPillarActive
                      ? "bg-white/10 text-[#E0F2FE] border border-white/20 shadow-sm"
                      : "text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-white/[0.06]"
                  }`}
                >
                  <Icon className={`h-3 w-3 ${p.color}`} />
                  <span>{p.label}</span>
                </a>
              )
            })}
          </div>

          {/* Navigation Items (XL screen view) */}
          <div className="hidden xl:flex items-center gap-1 bg-[#111B30]/65 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            {navItems.map((item) => {
              const itemTarget = item.href.replace("#", "")
              const isActive = activeSection === itemTarget && pathname === "/"

              return (
                <a
                  key={item.href}
                  href={resolveHref(item.href)}
                  className={`px-3 py-1 text-xs font-medium transition-all rounded-full ${
                    isActive
                      ? "bg-gradient-to-r from-aurora-cyan to-aurora-blue text-slate-950 font-bold shadow-sm shadow-aurora-cyan/30"
                      : "text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Live Operational Status */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#111B30]/80 border border-emerald-500/20 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">Available for Hire</span>
            </div>

            <ThemeToggle />

            {/* Direct Connect CTA */}
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet text-slate-950 hover:opacity-90 shadow-md shadow-aurora-cyan/20 rounded-full px-4 text-xs font-extrabold"
            >
              <a href={resolveHref("#contact")}>
                Let's Connect
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="border-white/10 bg-[#111B30]/80 text-[#F8FAFC] hover:bg-white/[0.06]"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-[#070B14]/98 backdrop-blur-2xl border-b border-[#26324A] shadow-2xl px-6 py-6"
          >
            <div className="flex flex-col space-y-4 max-h-[78vh] overflow-y-auto">
              {/* 4 Pillars Mobile Grid */}
              <div className="space-y-1.5 pb-3 border-b border-[#26324A]/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                  Core Career Pillars
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {careerPillars.map((p) => {
                    const Icon = p.icon
                    return (
                      <a
                        key={p.label}
                        href={resolveHref(`#${p.id}`)}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[#111827] border border-[#26324A] text-xs font-semibold text-[#F8FAFC] hover:border-aurora-cyan/50"
                      >
                        <Icon className={`h-4 w-4 ${p.color}`} />
                        <span>{p.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Navigation Anchors */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                  Command Sections
                </span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={resolveHref(item.href)}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D32] transition-colors"
                    >
                      <item.icon className="h-3.5 w-3.5 text-aurora-cyan" />
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Standalone Deep-Dive Pages */}
              <div className="space-y-1 pt-2 border-t border-[#26324A]/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
                  Standalone Pages
                </span>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {standalonePages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-[#151D32]/60 hover:bg-[#151D32] border border-[#26324A]/50"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet text-slate-950 font-bold rounded-xl py-5 shadow-lg"
                >
                  <a href={resolveHref("#contact")} onClick={() => setIsOpen(false)}>
                    Initiate Collaboration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
