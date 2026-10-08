"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star, Building2, Sparkles } from "lucide-react"

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  organization: string
  avatar: string
  tags: string[]
}

const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote: "Abhishek possesses that rare dual capability: deep analytical rigor when designing data models, combined with an eye for stunning UI/UX aesthetics. He delivered our web application weeks ahead of deadline with zero bugs in production.",
    author: "Rohan Deshmukh",
    role: "Engineering Lead",
    organization: "Mass IT Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    tags: ["Full-Stack Dev", "REST APIs", "Node.js"]
  },
  {
    id: "test-2",
    quote: "Our industrial sensor telemetry app demanded rock-solid reliability and low-latency streaming. Abhishek engineered an Android solution that made complex sensor readings immediately legible to our field operators. Exceptional work.",
    author: "K. Sathe",
    role: "Operations Director",
    organization: "Sathe Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    tags: ["IoT Telemetry", "Real-time Charts", "Mobile"]
  },
  {
    id: "test-3",
    quote: "His mastery of Salesforce Apex architecture and Lightning Web Components transformed our CRM automation. Complex business logic that used to trigger errors now runs asynchronously without hitting any governor limits.",
    author: "Pooja Sharma",
    role: "CRM Solution Architect",
    organization: "CloudSphere Consulting",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    tags: ["Salesforce PD-I", "Apex", "Flow Automation"]
  },
  {
    id: "test-4",
    quote: "From our Figma design system to editorial brand photography, Abhishek brought our digital product to life with exquisite detail. Clients frequently comment on how intuitive and polished our interface feels.",
    author: "Aditya Verma",
    role: "Co-Founder & Product Head",
    organization: "Aura Creative Studio",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    tags: ["UI/UX Systems", "Figma", "Branding"]
  }
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoplay])

  const current = testimonials[currentIndex]

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B1020] overflow-hidden border-t border-[#26324A]/60">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Endorsements & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Collaborator Testimonials
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Perspectives from engineering leaders, product founders, and clients who have collaborated across engineering and design disciplines.
          </p>
        </div>

        {/* Testimonial Stage */}
        <div 
          className="relative bg-[#151D32]/90 backdrop-blur-md rounded-3xl border border-[#26324A] p-8 sm:p-12 shadow-2xl overflow-hidden"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <Quote className="w-16 h-16 text-cyan-500/20 absolute -top-2 -left-2 rotate-180 pointer-events-none" />

          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-mono text-slate-400 ml-2">Verified Collaboration</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl text-slate-200 font-light leading-relaxed italic">
                "{current.quote}"
              </p>

              <div className="pt-6 border-t border-[#26324A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/60 shadow-md"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white">{current.author}</h4>
                    <p className="text-xs text-cyan-400">{current.role} • <span className="text-slate-400">{current.organization}</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#0B1020] text-slate-300 border border-[#26324A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev / Next Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#26324A]/60">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === idx ? "w-8 bg-gradient-to-r from-cyan-400 to-purple-500" : "w-2 bg-[#26324A] hover:bg-slate-500"
                  }`}
                  aria-label={`Jump to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="p-2.5 rounded-xl bg-[#0B1020] hover:bg-[#151D32] border border-[#26324A] text-slate-300 hover:text-white transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="p-2.5 rounded-xl bg-[#0B1020] hover:bg-[#151D32] border border-[#26324A] text-slate-300 hover:text-white transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
