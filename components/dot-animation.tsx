"use client"

import { useEffect, useState } from "react"

export function DotAnimation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <div className="dot-animation" />
}
