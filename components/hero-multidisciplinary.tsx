"use client"

import React, { useEffect, useRef, useState } from "react"
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
  Workflow,
  ExternalLink,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import * as THREE from "three"

/* =========================================================================
   WebGL Three.js Deep-Space & Floating Geometric Scene
   - 1,200 particle quantum starfield
   - Floating crystalline wireframe icosahedron, torus knot & octahedron
   - Dual cinematic point lights: Electric Cyan & Nebula Violet
   - Smooth mouse parallax tracking
   - Automatic pause when scrolled out of viewport (IntersectionObserver)
   ========================================================================= */

function WebGLHeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const isVisibleRef = useRef(true)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const targetCameraPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05070e, 0.04)

    const width = container.clientWidth
    const height = container.clientHeight
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)

    // Lighting: Cinematic Cyan, Lavender, and Violet
    const ambientLight = new THREE.AmbientLight(0x0e172a, 1.4)
    scene.add(ambientLight)

    const cyanLight = new THREE.PointLight(0x22d3ee, 5.5, 30)
    cyanLight.position.set(-8, 5, 6)
    scene.add(cyanLight)

    const violetLight = new THREE.PointLight(0x8b5cf6, 6, 28)
    violetLight.position.set(8, -5, 6)
    scene.add(violetLight)

    const lavenderLight = new THREE.PointLight(0xa78bfa, 4, 24)
    lavenderLight.position.set(0, -6, 5)
    scene.add(lavenderLight)

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    blueRimLight.position.set(0, 10, 8)
    scene.add(blueRimLight)

    // 1. Quantum Data Particles System
    const particleCount = prefersReducedMotion ? 400 : 1200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color(0x22d3ee)
    const colorViolet = new THREE.Color(0x8b5cf6)
    const colorBlue = new THREE.Color(0x38bdf8)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 45
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 35
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30

      // Blend between cyan, blue and violet
      const mixedColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorViolet : colorBlue
      particleColors[i * 3] = mixedColor.r
      particleColors[i * 3 + 1] = mixedColor.g
      particleColors[i * 3 + 2] = mixedColor.b
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 2. Central 3D Crystalline Icosahedron (AI & Neural Symbol)
    const icoGeo = new THREE.IcosahedronGeometry(2.6, 0)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x151d32,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.18,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
    })
    const icosahedron = new THREE.Mesh(icoGeo, icoMat)
    icosahedron.position.set(5.5, 0.5, 0)
    scene.add(icosahedron)

    // Solid inner core
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.9,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    icosahedron.add(coreMesh)

    // 3. Floating Torus Knot (Data Pipelines & Engineering Symbol)
    const torusGeo = new THREE.TorusKnotGeometry(1.3, 0.35, 80, 16)
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2,
      roughness: 0.35,
      metalness: 0.8,
    })
    const torusKnot = new THREE.Mesh(torusGeo, torusMat)
    torusKnot.position.set(-6.5, -2.5, -2)
    torusKnot.scale.set(0.7, 0.7, 0.7)
    scene.add(torusKnot)

    // 4. Floating Octahedron (Full-Stack Distributed Node)
    const octGeo = new THREE.OctahedronGeometry(1.4, 0)
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
    })
    const octahedron = new THREE.Mesh(octGeo, octMat)
    octahedron.position.set(7.5, 4.2, -3)
    scene.add(octahedron)

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mousePosRef.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: -(e.clientY / innerHeight) * 2 + 1,
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", handleResize)

    // Viewport Visibility Observer (Pauses rendering when scrolled out of view)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // Animation Loop
    let animationFrameId: number
    const startTime = performance.now()
    let previousTime = startTime

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisibleRef.current) return

      const now = performance.now()
      const delta = Math.min((now - previousTime) / 1000, 0.1)
      previousTime = now
      const elapsedTime = (now - startTime) / 1000

      if (!prefersReducedMotion) {
        // Continuous organic rotation
        icosahedron.rotation.x += delta * 0.25
        icosahedron.rotation.y += delta * 0.35
        coreMesh.rotation.y -= delta * 0.4

        torusKnot.rotation.x += delta * 0.4
        torusKnot.rotation.y += delta * 0.3
        torusKnot.position.y = -2.5 + Math.sin(elapsedTime * 1.2) * 0.4

        octahedron.rotation.y += delta * 0.5
        octahedron.rotation.z += delta * 0.3
        octahedron.position.y = 4.2 + Math.cos(elapsedTime * 1.5) * 0.35

        particleSystem.rotation.y += delta * 0.04
        particleSystem.rotation.x += delta * 0.015
      }

      // Smooth camera lerp toward mouse target
      targetCameraPosRef.current.x = mousePosRef.current.x * 2.5
      targetCameraPosRef.current.y = mousePosRef.current.y * 1.8

      camera.position.x += (targetCameraPosRef.current.x - camera.position.x) * 0.05
      camera.position.y += (targetCameraPosRef.current.y - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()

      // Dispose Three.js objects
      particleGeometry.dispose()
      particleMaterial.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      octGeo.dispose()
      octMat.dispose()
      renderer.dispose()

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}

/* =========================================================================
   Main Immersive 3D Hero Component
   ========================================================================= */

export function HeroMultidisciplinary() {
  const coreDisciplines = [
    { title: "Data Analyst", desc: "SQL • Power BI • Telemetry", color: "text-aurora-cyan" },
    { title: "Data Engineer", desc: "Airflow • ETL • PostgreSQL", color: "text-aurora-blue" },
    { title: "Full-Stack Dev", desc: "Next.js • React • FastAPI", color: "text-aurora-violet" },
    { title: "AI Engineer", desc: "XGBoost • Python • TreeSHAP", color: "text-aurora-purple" },
  ]

  // Actual verified Google Drive Resume link
  const resumeUrl =
    "https://drive.google.com/file/d/1Ly7v_7PTshSX3_bibUZSJeillfMH6PN2/view?usp=drive_link"

  return (
    <section id="hero" className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Real WebGL Three.js 3D Background */}
      <WebGLHeroCanvas />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070E]/60 via-transparent to-[#05070E] pointer-events-none z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] bg-aurora-cyan/10 rounded-full blur-[160px] pointer-events-none z-[1]" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Command Center Identity & Core Roles (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Top Pill: Command Center Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111B30]/75 border border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl"
            >
              <span className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse shadow-sm shadow-cyan-400/80" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E0F2FE]">
                Engineering Command Center &bull; Operational
              </span>
            </motion.div>

            {/* Giant Display Name & 4-Pillar Subtitle */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-[#E0F2FE] leading-[1.04]">
                ABHISHEK <br />
                <span className="aurora-text-gradient">BUBANE</span>
              </h1>

              {/* 4 Core Pillars Subtitle Banner */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
                {coreDisciplines.map((item) => (
                  <span
                    key={item.title}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111B30]/65 border border-white/10 backdrop-blur-md shadow-sm"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color.replace("text-", "bg-")}`} />
                    <span className="text-[#E0F2FE]">{item.title}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Value Statement */}
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed font-normal">
              Architecting end-to-end data pipelines, executive business intelligence dashboards,
              scalable full-stack web applications, and production machine learning models with measurable business impact.
            </p>

            {/* CTAs: Explore Work & Download Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-aurora-cyan via-aurora-blue to-aurora-violet text-slate-950 hover:opacity-95 shadow-xl shadow-cyan-400/20 rounded-xl px-7 font-extrabold h-12 text-sm"
              >
                <a href="#career-pillars">
                  Explore My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 bg-[#111B30]/75 text-[#E0F2FE] hover:bg-white/[0.08] hover:border-aurora-cyan/60 rounded-xl px-7 font-semibold h-12 transition-all shadow-md backdrop-blur-xl"
              >
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 text-aurora-cyan" />
                  Download Resume
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D32]/50 rounded-xl px-5 h-12"
              >
                <a href="#contact">Let&apos;s Connect</a>
              </Button>
            </div>

            {/* Social Connectivity Links */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#94A3B8]/80 font-mono font-semibold mr-1">
                Profiles:
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
                  className="w-10 h-10 rounded-xl bg-[#111827]/90 border border-[#26324A] flex items-center justify-center text-[#94A3B8] hover:text-aurora-cyan hover:border-aurora-cyan/40 hover:bg-[#151D32] transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Holographic Portrait & Telemetry Dock (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Ambient circular backdrop */}
            <div className="relative w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] flex items-center justify-center">
              {/* Spinning decorative orbit rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#26324A] animate-spin-slow opacity-60" />
              <div className="absolute -inset-6 rounded-full border border-aurora-cyan/20 animate-spin-slow [animation-direction:reverse] opacity-40" />

              {/* Center Portrait with Aurora Glow Frame */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1 bg-gradient-to-tr from-aurora-cyan via-aurora-blue to-aurora-violet shadow-2xl shadow-cyan-950/50 z-20">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0B1020] border-4 border-[#070B14]">
                  <Image
                    src="/profile.jpg"
                    alt="Abhishek Balasaheb Bubane"
                    fill
                    priority
                    className="object-cover object-[50%_12%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/20 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 4 Orbit Dimension Nodes Mapping to the 4 Pillars */}
              {/* Pillar 1: Data Analytics Node */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 z-30 p-2.5 rounded-xl bg-[#0B1020]/95 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-aurora-blue/20 flex items-center justify-center text-aurora-blue">
                  <BarChart3 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#F8FAFC]">Data Analyst</div>
                  <div className="text-[10px] text-aurora-cyan font-mono">1.2M+ Telemetry</div>
                </div>
              </motion.div>

              {/* Pillar 2: Data Engineering Node */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-2 -right-8 z-30 p-2.5 rounded-xl bg-[#0B1020]/95 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan">
                  <Workflow className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#F8FAFC]">Data Engineer</div>
                  <div className="text-[10px] text-aurora-blue font-mono">ETL &bull; Airflow DAGs</div>
                </div>
              </motion.div>

              {/* Pillar 3: Full Stack Node */}
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 z-30 p-2.5 rounded-xl bg-[#0B1020]/95 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-aurora-violet/20 flex items-center justify-center text-aurora-violet">
                  <Code2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#F8FAFC]">Full-Stack Dev</div>
                  <div className="text-[10px] text-aurora-violet font-mono">Next.js 16 &bull; React 19</div>
                </div>
              </motion.div>

              {/* Pillar 4: AI Engineer Node */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -right-6 z-30 p-2.5 rounded-xl bg-[#0B1020]/95 backdrop-blur-md border border-[#26324A] shadow-xl flex items-center gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#F8FAFC]">AI Engineer</div>
                  <div className="text-[10px] text-purple-400 font-mono">XGBoost &bull; FastAPI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
