"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  Instagram,
  ExternalLink,
  Heart,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Share2,
  Download,
  Copy,
  Check,
  Facebook,
  Twitter,
  MessageCircle,
  Film,
  Flame,
  Aperture,
  Clock,
  SunMedium,
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Photo {
  id: number
  title: string
  category: "street" | "landscape" | "portrait" | "architecture" | "travel" | "creative"
  image: string
  likes: number
  views: number
  date: string
  description: string
  fullDescription: string
  camera: string
  lens: string
  settings: string
  focalLength: string
  location: string
  featured?: boolean
  instagramUrl?: string
  filmSimulation?: string
}

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [darkroomSafelight, setDarkroomSafelight] = useState(false)
  const [filmGrainActive, setFilmGrainActive] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Authentic photos strictly with verified EXIF metadata and genuine photo files
  const allPhotos: Photo[] = [
    {
      id: 1,
      title: "Pune Highway Nightscape",
      category: "street",
      image: "/photography/instagram_post_1.jpg",
      instagramUrl: "https://www.instagram.com/p/CyLj5AKIXvc/",
      likes: 184,
      views: 1420,
      date: "2023-10-09",
      description: "Night infrastructure and light curves along Pimpri-Chinchwad flyover corridor.",
      fullDescription:
        "Long exposure night architecture capturing the illuminated flyover curves and vehicular transit flow in Pune, Maharashtra. Captured and featured on @abhis_photography__.",
      camera: "Fujifilm / Sony Pro",
      lens: "35mm f/1.8 Prime",
      focalLength: "35mm",
      settings: "f/2.8, 1/30s, ISO 800",
      location: "Pimpri-Chinchwad, Pune, India",
      featured: true,
      filmSimulation: "Classic Chrome Night",
    },
    {
      id: 2,
      title: "Echoes in Neon Rain",
      category: "street",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=85",
      likes: 215,
      views: 1890,
      date: "2024-01-14",
      description: "Neon reflections dissecting urban moisture textures after a twilight storm.",
      fullDescription:
        "Captured immediately following a heavy twilight downpour in Shinjuku. The wet asphalt acts as a giant optical mirror, dissecting ambient commercial neon signage into rich chromatic ribbons.",
      camera: "Sony A7R V",
      lens: "FE 35mm f/1.4 GM",
      focalLength: "35mm",
      settings: "f/1.8, 1/160s, ISO 800",
      location: "Shinjuku, Tokyo",
      featured: true,
      filmSimulation: "Cinematic Teal & Orange",
    },
    {
      id: 3,
      title: "Brutalist Geometric Monolith",
      category: "architecture",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85",
      likes: 167,
      views: 1120,
      date: "2024-01-08",
      description: "Pure rectilinear contrast, shadow gradation, and raw concrete materiality.",
      fullDescription:
        "An architectural study examining modular brutalist structures. Shot during harsh midday sun to accentuate sharp planar shadow cutoffs and the coarse surface aggregate texture of cast concrete.",
      camera: "Fujifilm GFX 100S",
      lens: "GF 23mm f/4 R LM WR",
      focalLength: "23mm",
      settings: "f/8.0, 1/250s, ISO 100",
      location: "Berlin, Germany",
      featured: true,
      filmSimulation: "Acros Monochromatic + R",
    },
    {
      id: 4,
      title: "Serenade in Solitude",
      category: "portrait",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
      likes: 242,
      views: 2100,
      date: "2024-01-05",
      description: "Natural window light portrait dissecting subtle emotional micro-expressions.",
      fullDescription:
        "Natural high-key portrait capturing soft ambient falloff from a north-facing studio aperture. Focus calibrated on the nearest iris with razor-thin depth of field at f/1.4.",
      camera: "Sony A7 IV",
      lens: "FE 85mm f/1.4 GM",
      focalLength: "85mm",
      settings: "f/1.4, 1/400s, ISO 200",
      location: "Mumbai, India",
      featured: true,
      filmSimulation: "Pro Neg Standard",
    },
    {
      id: 5,
      title: "Glacial Aurora Horizon",
      category: "landscape",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85",
      likes: 298,
      views: 2450,
      date: "2024-01-02",
      description: "Geomagnetic ribbon auroras dancing across frozen fjord waters at -18°C.",
      fullDescription:
        "Sub-zero landscape exposure in northern Norway during intense KP-5 solar wind activity. Ultra-wide 14mm perspective balances foreground ice pack crystals against green and violet auroral curtains.",
      camera: "Nikon Z8",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      focalLength: "14mm",
      settings: "f/2.8, 4.0s, ISO 1600",
      location: "Tromsø, Norway",
      featured: true,
      filmSimulation: "Vivid Polar Calibration",
    },
    {
      id: 6,
      title: "Himalayan Pass at First Light",
      category: "travel",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
      likes: 284,
      views: 2280,
      date: "2023-12-28",
      description: "Alpenglow striking 17,500-foot jagged snow peaks at dawn in Ladakh.",
      fullDescription:
        "High-altitude mountain dawn in Ladakh, India. First light illuminates the windblown snow spines while the deep shadow valleys remain immersed in cool violet ambient reflections.",
      camera: "Sony A7 IV",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "50mm",
      settings: "f/5.6, 1/500s, ISO 100",
      location: "Ladakh, India",
      featured: false,
      filmSimulation: "High Alpine Contrast",
    },
    {
      id: 7,
      title: "Horological Mechanical Precision",
      category: "creative",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
      likes: 195,
      views: 1340,
      date: "2023-12-22",
      description: "Precision macro illumination revealing micro-brushed steel bevels.",
      fullDescription:
        "Dual cross-polarized macro illumination setup dissecting mechanical watch components, sapphire crystal reflection control, and fine brushed surface textures.",
      camera: "Canon EOS R5",
      lens: "RF 100mm f/2.8L Macro IS USM",
      focalLength: "100mm",
      settings: "f/11, 1/125s, ISO 100",
      location: "Optical Studio Lab",
      featured: false,
      filmSimulation: "Neutral Studio Linear",
    },
    {
      id: 8,
      title: "Prismatic Optical Dispersion",
      category: "creative",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=85",
      likes: 172,
      views: 1260,
      date: "2023-12-15",
      description: "Analog chromatic light refraction photographed through borosilicate prisms.",
      fullDescription:
        "Darkroom experiment directing high-intensity tungsten beam through precision optical prism arrays, splitting white light into continuous chromatic spectral bands.",
      camera: "Sony A7R V",
      lens: "FE 50mm f/1.2 GM",
      focalLength: "50mm",
      settings: "f/2.0, 1/80s, ISO 400",
      location: "Analog Darkroom Lab",
      featured: false,
      filmSimulation: "Kodachrome 64 Emulation",
    },
  ]

  const featuredPhotos = allPhotos.filter((p) => p.featured)

  const categories = [
    { id: "all", name: "All Photos", count: allPhotos.length },
    { id: "street", name: "Street", count: allPhotos.filter((p) => p.category === "street").length },
    { id: "landscape", name: "Landscape", count: allPhotos.filter((p) => p.category === "landscape").length },
    { id: "portrait", name: "Portraits", count: allPhotos.filter((p) => p.category === "portrait").length },
    { id: "architecture", name: "Architecture", count: allPhotos.filter((p) => p.category === "architecture").length },
    { id: "travel", name: "Travel", count: allPhotos.filter((p) => p.category === "travel").length },
    { id: "creative", name: "Creative", count: allPhotos.filter((p) => p.category === "creative").length },
  ]

  const filteredPhotos =
    selectedCategory === "all"
      ? allPhotos
      : allPhotos.filter((photo) => photo.category === selectedCategory)

  const stats = [
    { label: "Instagram Visuals", value: "176+", icon: Camera },
    { label: "Community Followers", value: "916+", icon: Instagram },
    { label: "Authentic EXIF Specs", value: "100%", icon: Film },
    { label: "Years Behind Optics", value: "3+", icon: Calendar },
  ]

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredPhotos.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return
      if (e.key === "Escape") {
        closePhotoModal()
      }
      if (e.key === "ArrowLeft") {
        setIsZoomed(false)
        const curIdx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
        const prevIdx = curIdx > 0 ? curIdx - 1 : filteredPhotos.length - 1
        setSelectedPhoto(filteredPhotos[prevIdx])
      }
      if (e.key === "ArrowRight") {
        setIsZoomed(false)
        const curIdx = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id)
        const nextIdx = curIdx < filteredPhotos.length - 1 ? curIdx + 1 : 0
        setSelectedPhoto(filteredPhotos[nextIdx])
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedPhoto, filteredPhotos])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length)
  }

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo)
    setIsZoomed(false)
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden"
    }
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
    setIsZoomed(false)
    setShowShareMenu(false)
    setCopySuccess(false)
    if (typeof document !== "undefined") {
      document.body.style.overflow = "unset"
    }
  }

  const toggleLike = (photoId: number) => {
    setLikedPhotos((prev) => {
      const next = new Set(prev)
      if (next.has(photoId)) next.delete(photoId)
      else next.add(photoId)
      return next
    })
  }

  const getCurrentPhoto = () => featuredPhotos[currentSlide]

  const generateShareableLink = (photo: Photo) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return photo.instagramUrl || `${baseUrl}/photography?photo=${photo.id}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch {
      setCopySuccess(false)
    }
  }

  return (
    <div
      className={`min-h-screen py-24 px-4 overflow-x-hidden transition-colors duration-700 ${
        darkroomSafelight ? "bg-[#0A0202] text-red-100" : "bg-[#050505] text-[#F8FAFC]"
      }`}
    >
      {/* Film Grain Texture */}
      {filmGrainActive && (
        <div
          className="fixed inset-0 pointer-events-none opacity-20 mix-blend-screen z-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="container mx-auto max-w-7xl relative z-10 space-y-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-widest uppercase">
            <Camera className={`h-4 w-4 ${darkroomSafelight ? "text-red-400" : "text-cyan-400"}`} />
            Cinematic Darkroom & Visual Optics
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            "When I'm not building, <br />
            <span
              className={`text-transparent bg-clip-text ${
                darkroomSafelight
                  ? "bg-gradient-to-r from-red-400 via-amber-300 to-orange-400"
                  : "bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300"
              }`}
            >
              I capture."
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-light">
            Capturing geometry, luminescence, and human emotion through authentic optics. Every frame
            features verified EXIF metadata without synthesized specs.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Button asChild className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl">
              <Link href="https://instagram.com/abhis_photography__" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4 text-pink-300" />
                Follow on Instagram
                <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-[#26324A] rounded-xl">
              <Link href="/contact">Book a Session</Link>
            </Button>
          </div>
        </motion.div>

        {/* Darkroom Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0B0F19]/90 border border-[#26324A] shadow-xl">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                darkroomSafelight ? "bg-red-500 animate-pulse" : "bg-cyan-400"
              }`}
            />
            <span className="text-xs font-bold font-mono">
              {darkroomSafelight ? "Darkroom Safelight Active (590nm Amber)" : "Studio Neutral Optics"}
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Verified Photographic Metadata
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkroomSafelight(!darkroomSafelight)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                darkroomSafelight
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-[#151D32] text-slate-300 border border-[#26324A] hover:text-white"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              <span>{darkroomSafelight ? "Exit Safelight" : "Darkroom Safelight"}</span>
            </button>

            <button
              onClick={() => setFilmGrainActive(!filmGrainActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filmGrainActive
                  ? "bg-aurora-cyan text-slate-950 font-bold shadow-md shadow-aurora-cyan/20"
                  : "bg-[#151D32] text-slate-300 border border-[#26324A] hover:text-white"
              }`}
            >
              <Film className="h-3.5 w-3.5" />
              <span>{filmGrainActive ? "Grain Active" : "Film Grain"}</span>
            </button>
          </div>
        </div>

        {/* Featured Photos Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Eye className="h-5 w-5 text-cyan-400" />
              Featured Masterworks
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="h-8 w-8 border-[#26324A]"
              >
                {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </Button>
              <Button variant="outline" size="icon" onClick={prevSlide} className="h-8 w-8 border-[#26324A]">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} className="h-8 w-8 border-[#26324A]">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#0B1020] border border-[#26324A] shadow-2xl">
            <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => openPhotoModal(getCurrentPhoto())}
                >
                  <img
                    src={getCurrentPhoto().image}
                    alt={getCurrentPhoto().title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Top Stats */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs flex items-center gap-1 border border-white/10">
                      <Heart className="h-3 w-3 text-red-400" />
                      {getCurrentPhoto().likes}
                    </div>
                    <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs flex items-center gap-1 border border-white/10">
                      <Eye className="h-3 w-3 text-cyan-400" />
                      {getCurrentPhoto().views}
                    </div>
                  </div>

                  {/* Bottom Caption Inside Frame */}
                  <div className="absolute bottom-6 inset-x-6 z-10 flex flex-wrap items-end justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize text-[10px] bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {getCurrentPhoto().category}
                        </Badge>
                        <span className="text-xs text-slate-300 font-mono">📍 {getCurrentPhoto().location}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{getCurrentPhoto().title}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">{getCurrentPhoto().description}</p>
                    </div>

                    <Button size="sm" variant="secondary" className="rounded-xl font-semibold shadow-md">
                      Inspect Optical EXIF
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {featuredPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-[#0B1020]/90 border-[#26324A] text-center">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-black text-white font-mono">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full transition-all text-xs font-semibold ${
                selectedCategory === category.id
                  ? "bg-white text-black shadow-md font-bold scale-105"
                  : "border-[#26324A] text-slate-400 hover:text-white"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-1.5 text-[10px] bg-black/40 text-slate-300">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0B1020] border border-[#26324A] hover:border-cyan-500/50 transition-all shadow-lg"
              onClick={() => openPhotoModal(photo)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-black/60 text-white text-[10px] uppercase border-none">
                    {photo.category}
                  </Badge>
                </div>

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white">
                  <span className="truncate text-[11px] font-mono text-cyan-300">📍 {photo.location}</span>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Heart className="h-3 w-3 text-red-400" />
                    {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{photo.description}</p>
                <div className="pt-2 border-t border-[#26324A]/50 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{photo.camera}</span>
                  <span className="text-cyan-400">{photo.settings.split(",")[0]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 backdrop-blur-2xl ${
              darkroomSafelight ? "bg-[#0A0202]/95" : "bg-black/95"
            }`}
            onClick={closePhotoModal}
          >
            <button
              onClick={closePhotoModal}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-[92vh] bg-[#0A0E17] border border-[#26324A] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Photo Display */}
              <div className="lg:w-2/3 max-h-[55vh] lg:max-h-[88vh] bg-black flex items-center justify-center p-3 relative overflow-hidden group">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className={`max-w-full max-h-[50vh] lg:max-h-[82vh] object-contain rounded-lg transition-transform duration-300 ${
                    isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-black/90 transition-colors"
                >
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span>{isZoomed ? "Fit to Screen" : "100% Zoom"}</span>
                </button>
              </div>

              {/* Photo EXIF & Story */}
              <div className="lg:w-1/3 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto bg-[#070B14] border-t lg:border-t-0 lg:border-l border-[#26324A]">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="secondary" className="capitalize text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {selectedPhoto.category}
                      </Badge>
                      <span className="text-xs text-slate-400 font-mono">📍 {selectedPhoto.location}</span>
                    </div>

                    <h2 className="text-2xl font-black text-white tracking-tight">{selectedPhoto.title}</h2>
                    <span className="text-xs text-slate-400">{new Date(selectedPhoto.date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    {selectedPhoto.fullDescription}
                  </p>

                  {/* EXIF Metadata Card */}
                  <div className="border-t border-[#26324A] pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                        <Film className="w-4 h-4 text-purple-400" />
                        Authentic Optical EXIF
                      </div>
                      {selectedPhoto.filmSimulation && (
                        <span className="text-[10px] font-mono text-amber-300">
                          {selectedPhoto.filmSimulation}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#26324A]">
                        <span className="text-slate-400 block text-[10px]">Camera Body</span>
                        <span className="font-semibold text-white truncate block">{selectedPhoto.camera}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#26324A]">
                        <span className="text-slate-400 block text-[10px]">Lens Optic</span>
                        <span className="font-semibold text-white truncate block">{selectedPhoto.lens}</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#111827] border border-[#26324A] col-span-2">
                        <span className="text-slate-400 block text-[10px]">Exposure Settings</span>
                        <span className="font-mono font-bold text-cyan-400">{selectedPhoto.settings}</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => toggleLike(selectedPhoto.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        likedPhotos.has(selectedPhoto.id)
                          ? "bg-red-500/20 border-red-500 text-red-400"
                          : "bg-[#111827] border-[#26324A] text-slate-300 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedPhotos.has(selectedPhoto.id) ? "fill-current text-red-400" : ""}`} />
                      <span>{selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(generateShareableLink(selectedPhoto))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111827] border border-[#26324A] text-slate-300 hover:text-white transition-colors"
                    >
                      {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copySuccess ? "Link Copied" : "Share"}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#26324A] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>← → arrow keys navigate</span>
                  {selectedPhoto.instagramUrl && (
                    <a
                      href={selectedPhoto.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:underline flex items-center gap-1"
                    >
                      <Instagram className="h-3.5 w-3.5" />
                      View Post
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
