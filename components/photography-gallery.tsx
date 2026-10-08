"use client"

import React, { useState, useEffect } from "react"
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
  Film
} from "lucide-react"

interface PhotoItem {
  id: string
  title: string
  category: "Portraits" | "Street" | "Landscape" | "Architecture" | "Product" | "Travel" | "Creative"
  location: string
  url: string
  aspect: "portrait" | "landscape" | "square"
  exif: {
    camera: string
    lens: string
    focalLength: string
    aperture: string
    shutter: string
    iso: string
  }
  story: string
}

const photoData: PhotoItem[] = [
  {
    id: "photo-1",
    title: "Echoes in Neon Rain",
    category: "Street",
    location: "Shinjuku, Tokyo",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 35mm f/1.4 GM",
      focalLength: "35mm",
      aperture: "f/1.8",
      shutter: "1/160s",
      iso: "800"
    },
    story: "Reflections caught immediately after a twilight downpour, dissecting urban light through wet pavement textures."
  },
  {
    id: "photo-2",
    title: "Architectural Geometry in Brutalism",
    category: "Architecture",
    location: "Berlin, Germany",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    exif: {
      camera: "Fujifilm GFX 100S",
      lens: "GF 23mm f/4 R LM WR",
      focalLength: "23mm",
      aperture: "f/8.0",
      shutter: "1/250s",
      iso: "100"
    },
    story: "Studying pure rectilinear contrast, shadow gradation, and concrete materiality under harsh midday sun."
  },
  {
    id: "photo-3",
    title: "Serenade in Solitude",
    category: "Portraits",
    location: "Mumbai, India",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    exif: {
      camera: "Sony A7 IV",
      lens: "FE 85mm f/1.4 GM",
      focalLength: "85mm",
      aperture: "f/1.4",
      shutter: "1/400s",
      iso: "200"
    },
    story: "Natural window light portrait exploring subtle emotional micro-expressions and high-key skin tonality."
  },
  {
    id: "photo-4",
    title: "Glacial Aurora Horizon",
    category: "Landscape",
    location: "Tromsø, Norway",
    url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    exif: {
      camera: "Nikon Z8",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      focalLength: "14mm",
      aperture: "f/2.8",
      shutter: "4.0s",
      iso: "1600"
    },
    story: "Capturing magnetic polar auroras dancing across frozen fjords at -18°C. Raw atmospheric poetry."
  },
  {
    id: "photo-5",
    title: "Minimalist Mechanical Craft",
    category: "Product",
    location: "Studio Environment",
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    aspect: "square",
    exif: {
      camera: "Canon EOS R5",
      lens: "RF 100mm f/2.8L Macro",
      focalLength: "100mm",
      aperture: "f/11",
      shutter: "1/125s",
      iso: "100"
    },
    story: "Precision dual-diffused rim lighting illuminating micro-brushed stainless steel bevels and sapphire crystal."
  },
  {
    id: "photo-6",
    title: "The Himalayan Pass at Dawn",
    category: "Travel",
    location: "Ladakh, India",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    aspect: "landscape",
    exif: {
      camera: "Sony A7 IV",
      lens: "FE 24-70mm f/2.8 GM II",
      focalLength: "50mm",
      aperture: "f/5.6",
      shutter: "1/500s",
      iso: "100"
    },
    story: "First light striking jagged snow peaks at 17,500 feet, casting violet shadow valleys."
  },
  {
    id: "photo-7",
    title: "Chromatic Prism Experiment",
    category: "Creative",
    location: "Darkroom Lab",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=85",
    aspect: "square",
    exif: {
      camera: "Sony A7R V",
      lens: "FE 50mm f/1.2 GM",
      focalLength: "50mm",
      aperture: "f/2.0",
      shutter: "1/80s",
      iso: "400"
    },
    story: "Analog optical dispersion captured in real-time through multifaceted crystal refraction lenses."
  },
  {
    id: "photo-8",
    title: "Night Market Motion Blur",
    category: "Street",
    location: "Taipei, Taiwan",
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
    aspect: "portrait",
    exif: {
      camera: "Fujifilm X100V",
      lens: "23mm f/2 Fixed",
      focalLength: "23mm",
      aperture: "f/4.0",
      shutter: "1/15s (Panning)",
      iso: "640"
    },
    story: "Intentional kinetic panning conveying the velocity and culinary warmth of night hawkers."
  }
]

const categories = ["All", "Portraits", "Street", "Landscape", "Architecture", "Product", "Travel", "Creative"] as const

export function PhotographyGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredPhotos = selectedCategory === "All" 
    ? photoData 
    : photoData.filter(p => p.category === selectedCategory)

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, filteredPhotos.length])

  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  return (
    <section 
      id="photography" 
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white transition-colors duration-700 overflow-hidden border-t border-[#1F293D]"
    >
      {/* Cinematic Vignette Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(38,50,74,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Editorial Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            Visual Storytelling & Optics
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white"
          >
            "When I'm not building, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300">
              I capture."
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-slate-400 text-base sm:text-lg leading-relaxed font-light"
          >
            Photography is data in its purest photonic form: geometry, composition, luminance, and human emotion frozen at 1/500th of a second.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-white text-black shadow-lg shadow-white/20 font-bold scale-105"
                  : "bg-[#111827] text-slate-400 hover:text-white hover:bg-[#151D32] border border-[#26324A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`group relative overflow-hidden rounded-2xl bg-[#0B1020] border border-[#26324A]/70 cursor-pointer ${
                  photo.aspect === "portrait" ? "row-span-2 min-h-[460px]" : "min-h-[290px]"
                }`}
                onClick={() => setLightboxIndex(idx)}
              >
                {/* Image element with zoom */}
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {photo.category}
                  </span>
                </div>

                {/* Top Right Action Button */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{photo.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>{photo.exif.camera}</span>
                    <span>•</span>
                    <span>{photo.exif.lens}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 lg:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex(null)
                }}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setLightboxIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Card Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl w-full max-h-[90vh] bg-[#0A0E17] border border-[#26324A] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              >
                {/* Photo Viewer Frame */}
                <div className="lg:w-2/3 max-h-[60vh] lg:max-h-[85vh] bg-black flex items-center justify-center p-2 relative">
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="max-w-full max-h-[58vh] lg:max-h-[80vh] object-contain rounded-lg"
                  />
                </div>

                {/* Photo EXIF & Story Sidebar */}
                <div className="lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {currentPhoto.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{currentPhoto.location}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tight mt-2 mb-4">
                      {currentPhoto.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                      {currentPhoto.story}
                    </p>

                    {/* Camera Technical EXIF Parameters */}
                    <div className="border-t border-[#26324A] pt-6 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        <Film className="w-4 h-4 text-purple-400" />
                        Optical & EXIF Metadata
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px]">Camera Body</span>
                          <span className="font-semibold text-white">{currentPhoto.exif.camera}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px]">Lens Optic</span>
                          <span className="font-semibold text-white truncate block">{currentPhoto.exif.lens}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px] flex items-center gap-1">
                            <Aperture className="w-3 h-3 text-cyan-400" /> Aperture
                          </span>
                          <span className="font-mono font-semibold text-cyan-400">{currentPhoto.exif.aperture}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-400" /> Shutter Speed
                          </span>
                          <span className="font-mono font-semibold text-purple-400">{currentPhoto.exif.shutter}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px] flex items-center gap-1">
                            <SunMedium className="w-3 h-3 text-amber-400" /> Sensor ISO
                          </span>
                          <span className="font-mono font-semibold text-amber-400">ISO {currentPhoto.exif.iso}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#151D32] border border-[#26324A]">
                          <span className="text-slate-400 block text-[10px]">Focal Length</span>
                          <span className="font-mono font-semibold text-white">{currentPhoto.exif.focalLength}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#26324A] flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Frame {lightboxIndex + 1} of {filteredPhotos.length}</span>
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
