"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MagneticCursor } from "@/components/magnetic-cursor"

interface InteractiveButtonProps {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
  href?: string
  asChild?: boolean
  [key: string]: any
}

export function InteractiveButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}: InteractiveButtonProps) {
  const handleClick = () => {
    // Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    if (onClick) {
      onClick()
    }
  }

  return (
    <MagneticCursor>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant={variant}
          size={size}
          className={`cursor-magnetic transition-all duration-200 hover:shadow-lg active:shadow-md ${className}`}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </MagneticCursor>
  )
}
