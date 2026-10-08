"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Volume1 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SoundControl() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [showControls, setShowControls] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load sound preferences from localStorage
    const savedSoundEnabled = localStorage.getItem("sound-enabled")
    const savedVolume = localStorage.getItem("sound-volume")

    if (savedSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(savedSoundEnabled))
    }
    if (savedVolume !== null) {
      setVolume(Number.parseFloat(savedVolume))
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Save preferences to localStorage
    localStorage.setItem("sound-enabled", JSON.stringify(soundEnabled))
    localStorage.setItem("sound-volume", volume.toString())

    // Update global audio context volume
    const event = new CustomEvent("soundSettingsChanged", {
      detail: { enabled: soundEnabled, volume },
    })
    window.dispatchEvent(event)
  }, [soundEnabled, volume, mounted])

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)

    // Play a test sound when enabling
    if (!soundEnabled) {
      // Dispatch a test sound event
      setTimeout(() => {
        const testEvent = new CustomEvent("soundSettingsChanged", {
          detail: { enabled: true, volume },
        })
        window.dispatchEvent(testEvent)
      }, 100)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (newVolume === 0) {
      setSoundEnabled(false)
    } else if (!soundEnabled) {
      setSoundEnabled(true)
    }
  }

  const getVolumeIcon = () => {
    if (!soundEnabled || volume === 0) return VolumeX
    if (volume < 0.5) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowControls(!showControls)}
          className={`bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 transition-all duration-200 shadow-md ${
            !soundEnabled ? "text-muted-foreground" : ""
          }`}
          aria-label="Sound settings"
        >
          <VolumeIcon className="h-4 w-4" />
        </Button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-2 p-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg min-w-[200px]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sound Effects</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSound}
                    className={`h-6 px-2 ${soundEnabled ? "text-green-600" : "text-red-500"}`}
                  >
                    {soundEnabled ? "On" : "Off"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>{Math.round(volume * 100)}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 text-xs">
                  <Button
                    variant={volume === 0.2 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVolumeChange(0.2)}
                    className="h-6 px-1"
                  >
                    Low
                  </Button>
                  <Button
                    variant={volume === 0.4 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVolumeChange(0.4)}
                    className="h-6 px-1"
                  >
                    Med
                  </Button>
                  <Button
                    variant={volume === 0.8 ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleVolumeChange(0.8)}
                    className="h-6 px-1"
                  >
                    High
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <Button variant="ghost" size="sm" onClick={toggleSound} className="w-full h-8 text-xs">
                    {soundEnabled ? "🔇 Mute All" : "🔊 Unmute All"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
