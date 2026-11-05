"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart, Sparkles } from "lucide-react"

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navLinks = [
    { href: "/about", label: "Professional About" },
    { href: "#overview", label: "Executive Overview" },
    { href: "#operations-center", label: "Operations Lab" },
    { href: "#projects", label: "Flagship Projects" },
    { href: "#experience", label: "Career Trajectory" },
    { href: "#certifications", label: "Credentials & Degrees" },
    { href: "#specialized-studios", label: "Specialized Studios" },
    { href: "/photography", label: "Photography Gallery" },
    { href: "#contact", label: "Contact" },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Abhibubane12",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/abhishek-bubane",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/AbhiBubane",
      label: "Twitter / X",
    },
    {
      icon: Mail,
      href: "mailto:abhibubane12@gmail.com",
      label: "Email",
    },
  ]

  return (
    <footer className="relative bg-[#070B14] text-white border-t border-white/10 overflow-hidden">
      {/* Animated signature gradient line at top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
          {/* Brand & Slogan (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px]">
                <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-sm">
                    AB
                  </span>
                </div>
              </div>
              <div>
                <span className="font-bold text-lg text-[#E0F2FE] group-hover:text-cyan-300 transition-colors">
                  Abhishek Bubane
                </span>
                <span className="block text-[11px] font-mono text-[#94A3B8]">
                  Multidisciplinary Digital Studio
                </span>
              </div>
            </a>

            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              "Data. Code. Design. Intelligence. Visual Storytelling." — Bridging data science, enterprise CRM, software engineering, and visual media into cohesive experiences.
            </p>

            <div className="text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for high-impact projects & full-time roles</span>
            </div>
          </div>

          {/* Quick Anchor Navigation Links (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] block mb-4">
              Dimension Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#94A3B8] hover:text-cyan-300 transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Connect (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] block">
              Global Presence
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#111B30]/75 backdrop-blur-md border border-white/10 hover:border-cyan-400 text-[#E0F2FE]/80 hover:text-cyan-300 transition-all hover:scale-110 shadow-lg"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            <p className="text-xs text-[#94A3B8]">
              Inquiries:{" "}
              <a href="mailto:abhibubane12@gmail.com" className="text-cyan-300 hover:underline">
                abhibubane12@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p>© {new Date().getFullYear()} Abhishek Balasaheb Bubane. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Crafted with precision using <span className="text-cyan-400 font-mono">Next.js</span>,{" "}
            <span className="text-purple-400 font-mono">TypeScript</span> &{" "}
            <span className="text-sky-400 font-mono">Midnight Aurora Glass</span>
          </p>

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#111B30]/90 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-indigo-500 hover:text-slate-950 text-white shadow-2xl transition-all hover:scale-110"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
