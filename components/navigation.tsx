"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  const navItems = [
    { href: "#about", label: "About", icon: User },
    { href: "#expertise", label: "Expertise", icon: Sparkles },
    { href: "#projects", label: "Projects", icon: Layers },
    { href: "#data-lab", label: "Data Lab", icon: BarChart3 },
    { href: "#ai-lab", label: "AI Lab", icon: Cpu },
    { href: "#architecture", label: "Full Stack", icon: Code2 },
    { href: "#salesforce", label: "Salesforce", icon: Database },
    { href: "#design", label: "Design", icon: Palette },
    { href: "#photography", label: "Photography", icon: Camera },
    { href: "#contact", label: "Contact", icon: Mail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070B14]/85 backdrop-blur-xl border-b border-[#26324A]/60 shadow-lg shadow-black/40"
            : "bg-transparent backdrop-blur-[2px]"
        }`}
      >
        <nav className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-blue via-aurora-violet to-aurora-purple p-[1px] shadow-sm shadow-aurora-blue/20">
              <div className="w-full h-full bg-[#0B1020] rounded-[11px] flex items-center justify-center font-bold text-sm tracking-wider text-white group-hover:bg-transparent transition-colors">
                AB
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-foreground text-base group-hover:text-aurora-blue transition-colors">
                Abhishek Bubane
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1 bg-[#111827]/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#26324A]/60 shadow-inner">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors rounded-full hover:bg-[#151D32]/80"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-4">
            {/* Status indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#151D32]/80 border border-[#26324A]/70 text-xs text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-aurora-emerald"></span>
              </span>
              <span className="text-[11px] font-medium text-emerald-400">Available</span>
            </div>

            <ThemeToggle />

            {/* Let's Talk CTA */}
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-aurora-blue via-aurora-violet to-aurora-purple text-white hover:opacity-95 shadow-md shadow-aurora-blue/20 rounded-full px-5 text-xs font-semibold"
            >
              <a href="#contact">
                Let's Talk
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="border-[#26324A] bg-[#111827]/80 text-[#F8FAFC] hover:bg-[#151D32]"
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
            className="fixed top-20 left-0 right-0 z-40 md:hidden bg-[#070B14]/95 backdrop-blur-2xl border-b border-[#26324A] shadow-2xl px-6 py-8"
          >
            <div className="flex flex-col space-y-2 max-h-[75vh] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D32] transition-colors"
                >
                  <item.icon className="h-4 w-4 text-aurora-blue" />
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-[#26324A] mt-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-aurora-blue via-aurora-violet to-aurora-purple text-white rounded-xl py-6"
                >
                  <a href="#contact" onClick={() => setIsOpen(false)}>
                    Let's Connect
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
