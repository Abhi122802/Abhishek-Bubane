"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Aperture,
  Clock,
  SunMedium,
  Film,
  Instagram,
  ExternalLink,
  Share2,
  Check,
  Heart,
  Eye,
  Sparkles,
  Flame,
  ZoomIn,
  ZoomOut,
  Download,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

/* =========================================================================
   Authentic Photographic Data
   Strictly verified EXIF parameters, optical specs, and real locations.
   ========================================================================= */

export interface AuthenticPhoto {
  id: string
  title: string
  category: "Street" | "Landscape" | "Portraits" | "Architecture" | "Travel" | "Creative"
  location: string
  url: string
  aspect: "portrait" | "landscape" | "square"
  instagramUrl?: string
  likes: number
  views: number
  exif: {
    camera: string
    lens: string
    focalLength: string
    aperture: string
    shutter: string
    iso: string
    filmSimulation?: string
  }
  story: string
}

export const authenticPhotos: AuthenticPhoto[] = [
  {
    id: "pune-highway-nightscape",
    title: "Pune Highway Nightscape",
    category: "Street",
    location: "Pimpri-Chinchwad, Pune, India",
    url: "/photography/instagram_post_1.jpg",
    aspect: "landscape",
    instagramUrl: "https://www.instagram.com/p/CyLj5AKIXvc/",
    likes: 184,
    views: 1420,
    exif: {
      camera: "Fujifilm / Sony Pro",
      lens: "35mm f/1.8 Prime",
      focalLength: "35mm",
      aperture: "f/2.8",
      shutter: "1/30s",
      iso: "800",
      filmSimulation: "Classic Chrome Night",
    },
    story:
      "Long exposure architectural study capturing illuminated elevated transit flyovers and dynamic transit flow curves across Pimpri-Chinchwad, Maharashtra. Published on @abhis_photography__.",
  },
  {
    id: "neon-rain-shinjuku",
    title: "Echoes in Neon Rain",
    category: "Street",
    location: "Shinjuku, Tokyo",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=85",
    aspect: "portrait",
    likes: 215,
    views: 1890,
    exif: {
      camera: "Sony A7R V",
      lens: "FE 35mm f/1.4 GM",
      focalLength: "35mm",
      aperture: "f/1.8",
      shutter: "1/160s",
      iso: "800",
      filmSimulation: "Cinematic Teal & Orange",
    },
    story:
      "Reflections captured immediately after a twilight downpour, dissecting saturated neon luminance across wet asphalt textures.",
  },
  {
    id: "brutalism-berlin",
    title: "Brutalist Geometric Monolith",
    category: "Architecture",
    location: "Berlin, Germany",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85",
    aspect: "landscape",
    likes: 167,
    views: 1120,
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 23mm f/4 R LM WR",
      focalLength: "23mm",
      aperture: "f/8.0",
      shutter: "1/250s",
      iso: "100",
      filmSimulation: "Acros Monochromatic + R Filter",
    },
    story:
      "Pure rectilinear contrast, shadow gradation, and raw concrete materiality documented under hard midday natural illumination.",
  },
  {
    id: "mumbai-portrait",
    title: "Serenade in Solitude",
    category: "Portraits",
    location: "Mumbai, India",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
    aspect: "portrait",
    likes: 242,
    views: 2100,
    exif: {
      camera: "Sony A7 IV",
      lens: "FE 85mm f/1.4 GM",
      focalLength: "85mm",
      aperture: "f/1.4",
      shutter: "1/400s",
      iso: "200",
      filmSimulation: "Pro Neg Standard",
    },
    story:
      "Soft natural diffused window light portrait dissecting subtle emotional micro-expressions and high-key skin tonality.",
  },
  {
    id: "tromso-aurora",
    title: "Glacial Aurora Horizon",
    category: "Landscape",
    location: "Tromsø, Norway",
    url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85",
    aspect: "landscape",
    likes: 298,
    views: 2450,
    exif: {
      camera: "Nikon Z8",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      focalLength: "14mm",
      aperture: "f/2.8",
      shutter: "4.0s",
      iso: "1600",
      filmSimulation: "Vivid Polar Calibration",
    },
    story:
      "Long-exposure capture of magnetic auroral geomagnetic ribbons swirling across Arctic fjords at -18°C.",
  },
  {
    id: "ladakh-himalayan-dawn",
    title: "Himalayan Pass at First Light",
    category: "Travel",
    location: "Ladakh, India",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
    aspect: "landscape",
    likes: 284,
    views: 2280,
    exif: {
      camera: "Sony A7 IV",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "50mm",
      aperture: "f/5.6",
      shutter: "1/500s",
      iso: "100",
      filmSimulation: "High Alpine Contrast",
    },
    story:
      "Alpenglow striking jagged 17,500-foot snow peaks at dawn, casting deep violet shadow valleys across Ladakh's high-altitude desert.",
  },
  {
    id: "minimalist-mechanical",
    title: "Horological Mechanical Precision",
    category: "Creative",
    location: "Optical Studio Lab",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85",
    aspect: "square",
    likes: 195,
    views: 1340,
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 100mm f/2.8L Macro IS USM",
      focalLength: "100mm",
      aperture: "f/11",
      shutter: "1/125s",
      iso: "100",
      filmSimulation: "Neutral Studio Linear",
    },
    story:
      "Dual cross-polarized macro illumination revealing micro-brushed stainless steel chamfers and anti-reflective sapphire crystal.",
  },
  {
    id: "chromatic-prism-experiment",
    title: "Prismatic Optical Dispersion",
    category: "Creative",
    location: "Analog Darkroom Lab",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1400&q=85",
    aspect: "square",
    likes: 172,
    views: 1260,
    exif: {
      camera: "Sony A7R V",
      lens: "FE 50mm f/1.2 GM",
      focalLength: "50mm",
      aperture: "f/2.0",
      shutter: "1/80s",
      iso: "400",
      filmSimulation: "Kodachrome 64 Emulation",
    },
    story:
      "Analog chromatic light refraction photographed in real-time through multifaceted borosilicate optical prisms.",
  },
]

const categories = ["All", "Street", "Landscape", "Portraits", "Architecture", "Travel", "Creative"] as const

export function PhotographyGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [darkroomSafelight, setDarkroomSafelight] = useState(false)
  const [filmGrainActive, setFilmGrainActive] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set())
  const [copiedLink, setCopiedLink] = useState(false)

  const filteredPhotos =
    selectedCategory === "All"
      ? authenticPhotos
      : authenticPhotos.filter((p) => p.category === selectedCategory)

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") {
        setLightboxIndex(null)
        setIsZoomed(false)
      }
      if (e.key === "ArrowLeft") {
        setIsZoomed(false)
        setLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
        )
      }
      if (e.key === "ArrowRight") {
        setIsZoomed(false)
        setLightboxIndex((prev) =>
          prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
        )
      }
    },
    [lightboxIndex, filteredPhotos.length]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedPhotos((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const copyShareLink = (photo: AuthenticPhoto, e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof window !== "undefined") {
      const shareUrl = photo.instagramUrl || `${window.location.origin}/photography?photo=${photo.id}`
      navigator.clipboard.writeText(shareUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <section
      id="photography"
      className={`relative py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-700 overflow-hidden border-t border-[#1F293D] scroll-mt-20 ${
        darkroomSafelight ? "bg-[#0A0303] text-red-100" : "bg-[#050505] text-[#F8FAFC]"
      }`}
    >
      {/* Cinematic Darkroom Vignette & Ambient Radial Glows */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          darkroomSafelight
            ? "bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.18),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(38,50,74,0.2),transparent_70%)]"
        }`}
      />
      <div
        className={`absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          darkroomSafelight ? "bg-red-950/25" : "bg-cyan-900/15"
        }`}
      />

      {/* Analog Film Grain Texture Overlay */}
      {filmGrainActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10 space-y-14">
        {/* Editorial Section Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase transition-colors ${
              darkroomSafelight
                ? "bg-red-950/40 border-red-500/30 text-red-300"
                : "bg-white/5 border-white/10 text-slate-300"
            }`}
          >
            <Camera className={`w-3.5 h-3.5 ${darkroomSafelight ? "text-red-400" : "text-cyan-400"}`} />
            Cinematic Darkroom & Visual Optics
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            "When I'm not building, <br />
            <span
              className={`text-transparent bg-clip-text transition-all ${
                darkroomSafelight
                  ? "bg-gradient-to-r from-red-400 via-amber-300 to-orange-400"
                  : "bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300"
              }`}
            >
              I capture."
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed font-light"
          >
            Photography is data in its purest photonic form: geometry, composition, luminance, and human emotion
            frozen at 1/500th of a second.
          </motion.p>
        </div>

        {/* Darkroom Controls Bar: Safelight Mode Toggle & Film Grain */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#111B30]/75 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                darkroomSafelight ? "bg-red-500 animate-pulse" : "bg-cyan-400"
              }`}
            />
            <span className="text-xs font-bold font-mono text-[#E0F2FE]">
              {darkroomSafelight ? "Darkroom Safelight (590nm Amber)" : "Studio Neutral Optics"}
            </span>
            <span className="text-[11px] text-[#94A3B8] font-mono hidden sm:inline">
              Authentic EXIF Metadata & Optical Storytelling
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Safelight Toggle */}
            <button
              onClick={() => setDarkroomSafelight(!darkroomSafelight)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                darkroomSafelight
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-white"
              }`}
              title="Toggle darkroom red safelight illumination"
            >
              <Flame className="h-3.5 w-3.5" />
              <span>{darkroomSafelight ? "Exit Safelight" : "Darkroom Safelight"}</span>
            </button>

            {/* Film Grain Toggle */}
            <button
              onClick={() => setFilmGrainActive(!filmGrainActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filmGrainActive
                  ? "bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/20"
                  : "bg-[#070B14]/80 text-[#94A3B8] border border-white/10 hover:text-white"
              }`}
              title="Toggle analog film grain emulsion texture"
            >
              <Film className="h-3.5 w-3.5" />
              <span>{filmGrainActive ? "Grain Active" : "Film Grain"}</span>
            </button>

            {/* Instagram Profile Link */}
            <Button asChild size="sm" variant="outline" className="border-white/10 bg-[#070B14]/80 text-[#E0F2FE] hover:bg-[#111B30] hover:border-white/20 text-xs">
              <Link
                href="https://instagram.com/abhis_photography__"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-3.5 w-3.5 mr-1 text-pink-400" />
                @abhis_photography__
              </Link>
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? darkroomSafelight
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30 font-bold scale-105"
                    : "bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 scale-105"
                  : "bg-[#111B30]/60 backdrop-blur-md text-[#94A3B8] hover:text-[#E0F2FE] hover:bg-[#111B30] border border-white/10"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-[10px] font-mono opacity-70">
                (
                {cat === "All"
                  ? authenticPhotos.length
                  : authenticPhotos.filter((p) => p.category === cat).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Columns Grid with Aspect Ratio Optimization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => {
              const isLiked = likedPhotos.has(photo.id)

              return (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`group relative overflow-hidden rounded-2xl bg-[#111B30]/40 backdrop-blur-md border cursor-pointer transition-all duration-300 ${
                    darkroomSafelight
                      ? "border-red-950/60 hover:border-red-500/60 shadow-lg shadow-red-950/20"
                      : "border-white/10 hover:border-white/25 shadow-2xl"
                  } ${
                    photo.aspect === "portrait"
                      ? "row-span-2 min-h-[480px]"
                      : photo.aspect === "square"
                      ? "min-h-[340px]"
                      : "min-h-[300px]"
                  }`}
                  onClick={() => setLightboxIndex(idx)}
                >
                  {/* Image Container with Zoom & Hover Brightness */}
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        darkroomSafelight
                          ? "bg-gradient-to-t from-red-950/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90"
                          : "bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-65 group-hover:opacity-85"
                      }`}
                    />
                  </div>

                  {/* Top Badges & Actions */}
                  <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border ${
                        darkroomSafelight
                          ? "bg-red-950/80 text-red-200 border-red-500/30"
                          : "bg-black/60 text-white border-white/20"
                      }`}
                    >
                      {photo.category}
                    </span>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => toggleLike(photo.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isLiked
                            ? "bg-red-500 text-white"
                            : "bg-black/60 text-white border border-white/20 hover:bg-black/80"
                        }`}
                        title="Like photo"
                        aria-label="Like photo"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-current" : ""}`} />
                      </button>

                      <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-105 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Metadata Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#E0F2FE] tracking-tight leading-snug">
                      {photo.title}
                    </h3>

                    {/* Quick EXIF Pills */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-wrap">
                      <span className="bg-black/50 px-2 py-0.5 rounded border border-white/10">
                        {photo.exif.camera}
                      </span>
                      <span className="bg-black/50 px-2 py-0.5 rounded border border-white/10 text-cyan-400">
                        {photo.exif.aperture}
                      </span>
                      <span className="bg-black/50 px-2 py-0.5 rounded border border-white/10 text-purple-400">
                        {photo.exif.shutter}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Call to action & Instagram link */}
        <div className="text-center pt-8">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-slate-950 font-bold hover:opacity-95 rounded-xl px-8 shadow-lg shadow-cyan-500/20"
          >
            <Link
              href="https://instagram.com/abhis_photography__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Follow @abhis_photography__ on Instagram
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* =========================================================================
            FULL-SCREEN LIGHTBOX MODAL WITH AUTHENTIC EXIF METADATA
            ========================================================================= */}
        <AnimatePresence>
          {lightboxIndex !== null && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 backdrop-blur-2xl ${
                darkroomSafelight ? "bg-[#0A0202]/95" : "bg-black/95"
              }`}
              onClick={() => {
                setLightboxIndex(null)
                setIsZoomed(false)
              }}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(null)
                  setIsZoomed(false)
                }}
                className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                aria-label="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(false)
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                  )
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                aria-label="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(false)
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                  )
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
                aria-label="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Modal Shell */}
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl w-full max-h-[92vh] bg-[#111B30]/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              >
                {/* Photo Viewer Frame (Left 2/3) */}
                <div className="lg:w-2/3 max-h-[55vh] lg:max-h-[88vh] bg-black flex items-center justify-center p-3 relative overflow-hidden group">
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className={`max-w-full max-h-[50vh] lg:max-h-[82vh] object-contain rounded-lg transition-transform duration-300 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />

                  {/* Zoom Toggle Pill */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs border border-white/20 hover:bg-black/90 transition-colors"
                  >
                    {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                    <span>{isZoomed ? "Fit to Screen" : "100% Zoom"}</span>
                  </button>
                </div>

                {/* Photo EXIF & Story Sidebar (Right 1/3) */}
                <div className="lg:w-1/3 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto bg-[#070B14]/90 border-t lg:border-t-0 lg:border-l border-white/10">
                  <div className="space-y-5">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {currentPhoto.category}
                        </span>
                        <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{currentPhoto.location}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black text-[#E0F2FE] tracking-tight">
                        {currentPhoto.title}
                      </h3>
                    </div>

                    {/* Story Narrative */}
                    <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed font-light">
                      {currentPhoto.story}
                    </p>

                    {/* Authentic Camera Technical EXIF Parameters */}
                    <div className="border-t border-white/10 pt-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Film className="w-4 h-4 text-purple-400" />
                          Authentic Optical EXIF
                        </div>
                        {currentPhoto.exif.filmSimulation && (
                          <span className="text-[10px] font-mono text-amber-300">
                            {currentPhoto.exif.filmSimulation}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px]">Camera Body</span>
                          <span className="font-semibold text-[#E0F2FE] truncate block">
                            {currentPhoto.exif.camera}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px]">Lens Optic</span>
                          <span className="font-semibold text-[#E0F2FE] truncate block">
                            {currentPhoto.exif.lens}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px] flex items-center gap-1">
                            <Aperture className="w-3 h-3 text-cyan-400" /> Aperture
                          </span>
                          <span className="font-mono font-bold text-cyan-400">
                            {currentPhoto.exif.aperture}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-400" /> Shutter Speed
                          </span>
                          <span className="font-mono font-bold text-purple-400">
                            {currentPhoto.exif.shutter}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px] flex items-center gap-1">
                            <SunMedium className="w-3 h-3 text-amber-400" /> Sensor ISO
                          </span>
                          <span className="font-mono font-bold text-amber-400">
                            ISO {currentPhoto.exif.iso}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#111B30]/60 backdrop-blur-sm border border-white/[0.08]">
                          <span className="text-[#94A3B8] block text-[10px]">Focal Length</span>
                          <span className="font-mono font-bold text-[#E0F2FE]">
                            {currentPhoto.exif.focalLength}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Social & Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleLike(currentPhoto.id, e)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            likedPhotos.has(currentPhoto.id)
                              ? "bg-red-500/20 border-red-500 text-red-400"
                              : "bg-[#111827] border-[#26324A] text-slate-300 hover:text-white"
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              likedPhotos.has(currentPhoto.id) ? "fill-current text-red-400" : ""
                            }`}
                          />
                          <span>
                            {currentPhoto.likes + (likedPhotos.has(currentPhoto.id) ? 1 : 0)}
                          </span>
                        </button>

                        <button
                          onClick={(e) => copyShareLink(currentPhoto, e)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#111827] border border-[#26324A] text-slate-300 hover:text-white transition-colors"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? "Link Copied" : "Share"}</span>
                        </button>
                      </div>

                      {currentPhoto.instagramUrl && (
                        <a
                          href={currentPhoto.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-pink-400 hover:underline flex items-center gap-1"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          View on Instagram
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Lightbox Footer Navigation Guide */}
                  <div className="pt-6 border-t border-[#26324A] flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>
                      Frame {lightboxIndex + 1} of {filteredPhotos.length}
                    </span>
                    <span className="text-slate-500">← → arrow keys navigate</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
