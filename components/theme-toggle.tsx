"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative overflow-hidden w-10 h-10">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group w-10 h-10 hover:bg-primary/10 transition-all duration-300"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-md transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            : "bg-gradient-to-br from-yellow-400/20 to-orange-500/20"
        }`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-4 w-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200 drop-shadow-sm" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-4 w-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-200 drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-md"
        initial={{ scale: 0, opacity: 0.8 }}
        whileTap={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  )
}
