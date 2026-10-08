"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticCursorProps {
  children: React.ReactNode
  className?: string
}

export function MagneticCursor({ children, className = "" }: MagneticCursorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((e.clientX - centerX) * 0.2)
      y.set((e.clientY - centerY) * 0.2)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y])

  return (
    <motion.div ref={ref} style={{ x: xSpring, y: ySpring }} className={className}>
      {children}
    </motion.div>
  )
}
