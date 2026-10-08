"use client"

import { useEffect, useRef, useState } from "react"

export function SoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Helper — returns true if the AudioContext exists but is already closed
  const isAudioCtxClosed = () => audioContextRef.current?.state === "closed"

  const [soundEnabled, setSoundEnabled] = useState(false)
  const [volume, setVolume] = useState(0.4)

  useEffect(() => {
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
    // Listen for sound settings changes from the control panel
    const handleSoundSettingsChange = (event: CustomEvent) => {
      setSoundEnabled(event.detail.enabled)
      setVolume(event.detail.volume)
    }

    window.addEventListener("soundSettingsChanged", handleSoundSettingsChange as EventListener)

    return () => {
      window.removeEventListener("soundSettingsChanged", handleSoundSettingsChange as EventListener)
    }
  }, [])

  useEffect(() => {
    // Update gain node volume when settings change
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = soundEnabled ? volume : 0
    }
  }, [soundEnabled, volume])

  useEffect(() => {
    // Initialize Web Audio API
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.connect(audioContextRef.current.destination)
        gainNodeRef.current.gain.value = soundEnabled ? volume : 0
      } catch (error) {
        console.log("Web Audio API not supported")
      }
    }

    // Enhanced sound creation with more complex waveforms
    const playSound = (
      frequency: number,
      duration: number,
      type: OscillatorType = "sine",
      soundVolume = 0.4,
      fadeOut = true,
    ) => {
      // Check if sounds are enabled before playing
      if (!soundEnabled || isAudioCtxClosed() || !audioContextRef.current || !gainNodeRef.current) return

      try {
        const oscillator = audioContextRef.current.createOscillator()
        const envelope = audioContextRef.current.createGain()
        const filter = audioContextRef.current.createBiquadFilter()

        oscillator.connect(filter)
        filter.connect(envelope)
        envelope.connect(gainNodeRef.current)

        oscillator.frequency.value = frequency
        oscillator.type = type

        // Add filter for richer sound
        filter.type = "lowpass"
        filter.frequency.value = frequency * 2

        const now = audioContextRef.current.currentTime
        const adjustedVolume = soundVolume * volume // Apply global volume

        envelope.gain.setValueAtTime(0, now)
        envelope.gain.linearRampToValueAtTime(adjustedVolume, now + 0.02)

        if (fadeOut) {
          envelope.gain.exponentialRampToValueAtTime(0.001, now + duration)
        } else {
          envelope.gain.setValueAtTime(adjustedVolume, now + duration - 0.02)
          envelope.gain.linearRampToValueAtTime(0, now + duration)
        }

        oscillator.start(now)
        oscillator.stop(now + duration)
      } catch (error) {
        console.log("Error playing sound:", error)
      }
    }

    // Play multiple tones simultaneously
    const playChord = (frequencies: number[], duration: number, type: OscillatorType = "sine") => {
      if (!soundEnabled) return

      frequencies.forEach((freq, index) => {
        setTimeout(() => playSound(freq, duration, type, 0.2), index * 50)
      })
    }

    // Create noise burst for click effects
    const playNoiseBurst = (duration: number, soundVolume = 0.3) => {
      if (!soundEnabled || isAudioCtxClosed() || !audioContextRef.current || !gainNodeRef.current) return

      try {
        const bufferSize = audioContextRef.current.sampleRate * duration
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
        const data = buffer.getChannelData(0)

        // Generate pink noise
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * soundVolume * volume
        }

        const source = audioContextRef.current.createBufferSource()
        const envelope = audioContextRef.current.createGain()
        const filter = audioContextRef.current.createBiquadFilter()

        source.buffer = buffer
        source.connect(filter)
        filter.connect(envelope)
        envelope.connect(gainNodeRef.current)

        filter.type = "highpass"
        filter.frequency.value = 1000

        const now = audioContextRef.current.currentTime
        const adjustedVolume = soundVolume * volume

        envelope.gain.setValueAtTime(adjustedVolume, now)
        envelope.gain.exponentialRampToValueAtTime(0.001, now + duration)

        source.start(now)
      } catch (error) {
        console.log("Error playing noise:", error)
      }
    }

    // Enhanced sound effects library
    const sounds = {
      // Hover effects
      buttonHover: () => playSound(1200, 0.15, "sine", 0.3),
      linkHover: () => playSound(800, 0.12, "triangle", 0.25),
      cardHover: () => playSound(600, 0.1, "sine", 0.2),

      // Click effects
      primaryClick: () => {
        if (!soundEnabled) return
        playNoiseBurst(0.05, 0.2)
        setTimeout(() => playChord([523, 659, 784], 0.3, "sine"), 50) // C major chord
      },
      secondaryClick: () => {
        if (!soundEnabled) return
        playSound(400, 0.2, "square", 0.35)
        setTimeout(() => playSound(600, 0.15, "triangle", 0.25), 100)
      },
      iconClick: () => playSound(1000, 0.1, "sine", 0.4),

      // Navigation sounds
      pageTransition: () => {
        if (!soundEnabled) return
        playSound(440, 0.1, "sine", 0.3) // A note
        setTimeout(() => playSound(554, 0.1, "sine", 0.3), 100) // C# note
        setTimeout(() => playSound(659, 0.2, "sine", 0.3), 200) // E note
      },
      menuOpen: () => playChord([330, 415, 523], 0.25, "triangle"),
      menuClose: () => playChord([523, 415, 330], 0.2, "triangle"),

      // Success/Error sounds
      success: () => {
        if (!soundEnabled) return
        playSound(523, 0.15, "sine", 0.4) // C
        setTimeout(() => playSound(659, 0.15, "sine", 0.4), 120) // E
        setTimeout(() => playSound(784, 0.15, "sine", 0.4), 240) // G
        setTimeout(() => playSound(1047, 0.3, "sine", 0.4), 360) // High C
      },
      error: () => {
        if (!soundEnabled) return
        playSound(200, 0.1, "sawtooth", 0.5)
        setTimeout(() => playSound(150, 0.2, "sawtooth", 0.4), 100)
      },

      // Special effects
      whoosh: () => {
        if (!soundEnabled) return
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            playSound(2000 - i * 150, 0.05, "sine", 0.2 - i * 0.02)
          }, i * 20)
        }
      },
      pop: () => {
        if (!soundEnabled) return
        playSound(800, 0.05, "square", 0.5)
        setTimeout(() => playSound(400, 0.1, "sine", 0.3), 50)
      },
      ding: () => {
        if (!soundEnabled) return
        playSound(2093, 0.3, "sine", 0.4) // High C
        setTimeout(() => playSound(1568, 0.4, "sine", 0.3), 100) // G
      },

      // Theme toggle sound
      themeToggle: () => {
        if (!soundEnabled) return
        playSound(880, 0.1, "triangle", 0.3) // A
        setTimeout(() => playSound(1108, 0.15, "sine", 0.3), 80) // C#
      },

      // Scroll sound
      scroll: () => playSound(1500, 0.05, "sine", 0.15),

      // Form sounds
      inputFocus: () => playSound(1000, 0.08, "sine", 0.25),
      inputType: () => playSound(1200, 0.03, "triangle", 0.15),
      formSubmit: () => {
        if (!soundEnabled) return
        playNoiseBurst(0.1, 0.3)
        setTimeout(() => sounds.success(), 100)
      },
    }

    // Event handlers with enhanced detection
    const handleButtonHover = (e: Event) => {
      if (!soundEnabled) return

      const target = e.target as HTMLElement

      if (target.matches("button:not([disabled])")) {
        if (target.classList.contains("bg-primary") || target.getAttribute("variant") === "default") {
          sounds.buttonHover()
        } else if (target.getAttribute("size") === "icon") {
          sounds.cardHover()
        } else {
          sounds.linkHover()
        }
      } else if (target.matches("a[href]:not([disabled])")) {
        sounds.linkHover()
      } else if (target.matches('.cursor-magnetic, [data-cursor="pointer"]')) {
        sounds.cardHover()
      }
    }

    const handleButtonClick = (e: Event) => {
      if (!soundEnabled) return

      const target = e.target as HTMLElement

      if (target.matches("button:not([disabled])")) {
        if (target.classList.contains("bg-primary") || target.getAttribute("variant") === "default") {
          sounds.primaryClick()
        } else if (target.getAttribute("size") === "icon") {
          sounds.iconClick()
        } else {
          sounds.secondaryClick()
        }
      } else if (target.matches("a[href]:not([disabled])")) {
        if (target.getAttribute("href")?.startsWith("/")) {
          sounds.pageTransition()
        } else {
          sounds.pop()
        }
      }
    }

    const handleSpecialInteractions = (e: Event) => {
      if (!soundEnabled) return

      const target = e.target as HTMLElement

      // Theme toggle detection
      if (target.closest('[aria-label*="theme"], [aria-label*="mode"]')) {
        sounds.themeToggle()
      }

      // Menu toggle detection
      if (target.matches('[aria-label*="menu"], .menu-toggle')) {
        const isOpen = target.getAttribute("aria-expanded") === "true"
        if (isOpen) {
          sounds.menuClose()
        } else {
          sounds.menuOpen()
        }
      }

      // Card interactions
      if (target.closest('.card, [class*="card"]')) {
        sounds.pop()
      }
    }

    const handleFormInteractions = (e: Event) => {
      if (!soundEnabled) return

      const target = e.target as HTMLElement

      if (e.type === "focus" && target.matches("input, textarea, select")) {
        sounds.inputFocus()
      }

      if (e.type === "input" && target.matches('input[type="text"], input[type="email"], textarea')) {
        sounds.inputType()
      }

      if (e.type === "submit") {
        sounds.formSubmit()
      }
    }

    const handleScroll = () => {
      // Intentionally silent on scroll for comfortable UX
    }

    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      if (!soundEnabled) return

      // Escape key closes menus
      if (e.key === "Escape") {
        sounds.menuClose()
      }
    }

    // Initialize audio on first user interaction
    const initOnInteraction = () => {
      initAudio()
      // Play a welcome sound only if sounds are enabled
      if (soundEnabled) {
        setTimeout(() => sounds.ding(), 100)
      }
      document.removeEventListener("click", initOnInteraction)
      document.removeEventListener("keydown", initOnInteraction)
    }

    // Add event listeners
    document.addEventListener("click", initOnInteraction)
    document.addEventListener("keydown", initOnInteraction)
    document.addEventListener("mouseover", handleButtonHover)
    document.addEventListener("click", handleButtonClick)
    document.addEventListener("click", handleSpecialInteractions)
    document.addEventListener("focus", handleFormInteractions, true)
    document.addEventListener("input", handleFormInteractions)
    document.addEventListener("submit", handleFormInteractions)
    document.addEventListener("keydown", handleKeyboardShortcuts)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("click", initOnInteraction)
      document.removeEventListener("keydown", initOnInteraction)
      document.removeEventListener("mouseover", handleButtonHover)
      document.removeEventListener("click", handleButtonClick)
      document.removeEventListener("click", handleSpecialInteractions)
      document.removeEventListener("focus", handleFormInteractions, true)
      document.removeEventListener("input", handleFormInteractions)
      document.removeEventListener("submit", handleFormInteractions)
      document.removeEventListener("keydown", handleKeyboardShortcuts)
      window.removeEventListener("scroll", handleScroll)

      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {
          /* ignore already-closed errors */
        })
      }
    }
  }, [soundEnabled, volume])

  return null
}
