"use client"

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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Photo {
  id: number
  title: string
  category: string
  image: string
  likes: number
  views: number
  date: string
  description: string
  fullDescription: string
  camera: string
  lens: string
  settings: string
  location: string
  featured?: boolean
  instagramUrl?: string
}

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const featuredPhotos = [
    {
      id: 1,
      title: "Pune Highway Nightscape",
      category: "street",
      image: "/photography/instagram_post_1.jpg",
      instagramUrl: "https://www.instagram.com/p/CyLj5AKIXvc/",
      likes: 105,
      views: 1200,
      date: "2023-10-09",
      description: "Love it to love of travel... Night infrastructure and light curves along Pimpri-Chinchwad.",
      fullDescription:
        "Long exposure night architecture capturing the lit flyover curves and transit flow in Pune, Maharashtra. Captured and featured on @abhis_photography__.",
      camera: "Fujifilm / Sony Pro",
      lens: "35mm f/1.8",
      settings: "f/2.8, 1/30s, ISO 800",
      location: "Pimpri-Chinchwad, Pune, India",
      featured: true,
    },
    {
      id: 2,
      title: "Mountain Sunrise",
      category: "landscape",
      image: "https://imagizer.imageshack.com/img923/9662/8PH9P2.jpg",
      likes: 189,
      views: 890,
      date: "2024-01-10",
      description: "Early morning hike rewarded with this breathtaking sunrise over the mountains.",
      fullDescription:
        "After a 4 AM start and a challenging 2-hour hike, I was rewarded with this spectacular sunrise. The layers of mountains created a beautiful depth, while the morning mist added an ethereal quality to the scene. The key was using a graduated neutral density filter to balance the bright sky with the darker foreground.",
      camera: "Sony A7R IV",
      lens: "24-70mm f/2.8",
      settings: "f/8, 1/60s, ISO 100",
      location: "Rocky Mountain National Park",
      featured: true,
    },
    {
      id: 3,
      title: "City Life",
      category: "street",
      image: "https://imagizer.imageshack.com/img923/4127/aC89py.jpg",
    
      likes: 156,
      views: 670,
      date: "2024-01-08",
      description: "Candid moment captured in the bustling streets of the city.",
      fullDescription:
        "Street photography is all about timing and patience. I spent hours observing this intersection, waiting for the perfect moment when the light, shadows, and human elements aligned. This shot captures the energy and rhythm of urban life, with each person telling their own story within the frame.",
      camera: "Fujifilm X-T4",
      lens: "35mm f/1.4",
      settings: "f/2, 1/125s, ISO 800",
      location: "Times Square, New York",
      featured: true,
    },
    {
      id: 4,
      title: "Flower Macro",
      category: "nature",
      image: "https://imagizer.imageshack.com/img922/6842/kSdJs2.jpg",
      likes: 203,
      views: 1100,
      date: "2024-01-05",
      description: "Intricate details of nature captured through macro photography.",
      fullDescription:
        "Macro photography reveals a hidden world of incredible detail and beauty. This flower was photographed in my garden during the early morning when the dew drops were still fresh. The shallow depth of field isolates the subject beautifully, while the soft morning light brings out the delicate textures and colors.",
      camera: "Canon EOS R5",
      lens: "100mm Macro f/2.8",
      settings: "f/5.6, 1/250s, ISO 200",
      location: "Home Garden",
      featured: true,
    },
    {
      id: 5,
      title: "Urban Architecture",
      category: "street",
      image: "https://imagizer.imageshack.com/img924/7249/jgho7M.jpg",
      likes: 178,
      views: 820,
      date: "2024-01-03",
      description: "Modern architecture meets traditional design in this urban composition.",
      fullDescription:
        "This architectural shot showcases the beautiful contrast between old and new in the city. The geometric patterns and leading lines draw the eye through the frame, while the interplay of light and shadow adds depth and dimension. Shot during blue hour for the perfect balance of ambient and artificial light.",
      camera: "Sony A7R IV",
      lens: "16-35mm f/2.8",
      settings: "f/11, 1/30s, ISO 100",
      location: "Downtown Architecture District",
      featured: true,
    },
  ]

  const photos = [
    
    {
      id: 6,
      title: "Forest Path",
      category: "nature",
      image: "/placeholder.svg",
      likes: 234,
      views: 1350,
      date: "2023-12-28",
      description: "Peaceful forest trail leading into the unknown depths of nature.",
      fullDescription: "A serene forest path captured during autumn, showcasing nature's tranquil beauty.",
      camera: "Canon EOS R5",
      lens: "24-105mm f/4",
      settings: "f/8, 1/60s, ISO 400",
      location: "Redwood National Park",
    },
    {
      id: 7,
      title: "Evening Portrait",
      category: "portrait",
      image: "/placeholder.svg",
      likes: 267,
      views: 1450,
      date: "2023-12-25",
      description: "Moody evening portrait with dramatic lighting and shadows.",
      fullDescription: "An atmospheric evening portrait showcasing dramatic lighting techniques.",
      camera: "Sony A7R IV",
      lens: "85mm f/1.4",
      settings: "f/1.8, 1/160s, ISO 640",
      location: "Urban Studio",
    },
    {
      id: 8,
      title: "Ocean Waves",
      category: "landscape",
      image: "/placeholder.svg",
      likes: 198,
      views: 950,
      date: "2023-12-20",
      description: "Long exposure capture of ocean waves creating silky smooth water.",
      fullDescription: "A long exposure seascape capturing the motion and power of ocean waves.",
      camera: "Fujifilm X-T4",
      lens: "10-24mm f/4",
      settings: "f/16, 30s, ISO 100",
      location: "Pacific Coast",
    },
  ]

  const allGalleryPhotos = [...featuredPhotos, ...photos]
  const categories = [
    { id: "all", name: "All Photos", count: allGalleryPhotos.length },
    { id: "portrait", name: "Portrait", count: allGalleryPhotos.filter((p) => p.category === "portrait").length },
    { id: "landscape", name: "Landscape", count: allGalleryPhotos.filter((p) => p.category === "landscape").length },
    { id: "street", name: "Street", count: allGalleryPhotos.filter((p) => p.category === "street").length },
    { id: "nature", name: "Nature", count: allGalleryPhotos.filter((p) => p.category === "nature").length },
  ]

  const filteredPhotos =
    selectedCategory === "all" ? allGalleryPhotos : allGalleryPhotos.filter((photo) => photo.category === selectedCategory)

  const stats = [
    { label: "Instagram Posts", value: "176+", icon: Camera },
    { label: "Followers", value: "916+", icon: Instagram },
    { label: "Total Likes", value: "5K+", icon: Heart },
    { label: "Years Experience", value: "3+", icon: Calendar },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredPhotos.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPhotos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo)
    document.body.style.overflow = "hidden"
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
    setShowShareMenu(false)
    setCopySuccess(false)
    document.body.style.overflow = "unset"
  }

  const toggleLike = (photoId: number) => {
    setLikedPhotos((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(photoId)) {
        newLiked.delete(photoId)
      } else {
        newLiked.add(photoId)
      }
      return newLiked
    })
  }

  const getCurrentPhoto = () => featuredPhotos[currentSlide]

  // Share functionality
  const generateShareableLink = (photo: Photo) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const shareUrl = `${baseUrl}/photography?photo=${photo.id}`
    return shareUrl
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (fallbackErr) {
        console.error("Fallback copy failed: ", fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  const shareToSocial = (platform: string, photo: Photo) => {
    const shareUrl = generateShareableLink(photo)
    const text = `Check out this amazing photo: "${photo.title}" by Abhishek Bubane`

    let url = ""
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
        break
      case "whatsapp":
        url = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`
        break
      default:
        return
    }

    window.open(url, "_blank", "width=600,height=400")
  }

  // Add this function to extract Instagram post ID from URL
  const getInstagramPostId = (url: string) => {
    const match = url.match(/\/p\/([^/?]+)/)
    return match ? match[1] : null
  }

  const handleShare = (photo: Photo) => {
    const shareUrl = photo.instagramUrl || generateShareableLink(photo)

    if (navigator.share) {
      navigator
        .share({
          title: photo.title,
          text: `Check out this amazing photo: "${photo.title}" by Abhishek Bubane`,
          url: shareUrl,
        })
        .catch((err) => {
          console.log("Error sharing:", err)
          setShowShareMenu(true)
        })
    } else {
      setShowShareMenu(true)
    }
  }

  // Download functionality
  const downloadImage = async (photo: Photo) => {
    setIsDownloading(true)
    setDownloadProgress(0)

    try {
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // In a real app, you would fetch the actual image
      // For demo purposes, we'll use the placeholder
      const response = await fetch(photo.image || "/placeholder.svg")
      const blob = await response.blob()

      clearInterval(progressInterval)
      setDownloadProgress(100)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${photo.title.replace(/\s+/g, "_").toLowerCase()}_by_abhishek_bubane.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Reset after a short delay
      setTimeout(() => {
        setIsDownloading(false)
        setDownloadProgress(0)
      }, 1000)
    } catch (error) {
      console.error("Download failed:", error)
      setIsDownloading(false)
      setDownloadProgress(0)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-7xl overflow-x-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">Photography</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Capturing moments, emotions, and the beauty of the world through my lens. From portraits to landscapes, each
            photograph tells a unique story.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="group">
              <Link href="https://instagram.com/abhis_photography__" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                Follow on Instagram
                <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Book a Session</Link>
            </Button>
          </div>
        </motion.div>

        {/* Featured Photos Slider - Image Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              Featured Photography
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="h-8 w-8"
              >
                {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={prevSlide} className="h-8 w-8 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} className="h-8 w-8 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative overflow-hidden rounded-2xl bg-muted/20 backdrop-blur-sm border">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => openPhotoModal(getCurrentPhoto())}
                >
                  <Image
                    src={featuredPhotos[currentSlide].image || "/placeholder.svg"}
                    alt={featuredPhotos[currentSlide].title}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Floating stats */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {featuredPhotos[currentSlide].likes}
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {featuredPhotos[currentSlide].views}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                transition={{ duration: 4, ease: "linear", repeat: isAutoPlaying ? Number.POSITIVE_INFINITY : 0 }}
                key={currentSlide}
              />
            </div>
          </div>
        </motion.div>

        {/* Current Photo Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="secondary" className="capitalize">
              {getCurrentPhoto().category}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(getCurrentPhoto().date).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold">{getCurrentPhoto().title}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{getCurrentPhoto().description}</p>
          <Button variant="outline" onClick={() => openPhotoModal(getCurrentPhoto())} className="mt-4">
            View Details
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-hidden"
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => openPhotoModal(photo)}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.image || "/placeholder.svg"}
                    alt={photo.title}
                    width={400}
                    height={300}
                    unoptimized
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center space-y-2">
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {photo.views}
                        </div>
                      </div>
                      <Button size="sm" variant="secondary">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-black/50 text-white border-none">
                      {photo.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{photo.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{photo.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16 p-8 rounded-lg bg-muted/50"
        >
          <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Let's Create Something Beautiful</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether it's a portrait session, event coverage, or creative collaboration, I'm always excited to work on
            new photography projects. Let's capture your story!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Book a Session</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="https://instagram.com/abhis_photography__" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4" />
                View More on Instagram
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={closePhotoModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-background rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closePhotoModal}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                {/* Image */}
                <div className="relative h-[40vh] md:h-[80vh] overflow-hidden">
                  <Image
                    src={selectedPhoto.image || "/placeholder.svg"}
                    alt={selectedPhoto.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  {selectedPhoto.instagramUrl && (
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-3">View on Instagram</h4>
                      <div className="aspect-square w-full max-w-md mx-auto">
                        <iframe
                          src={`https://www.instagram.com/p/${getInstagramPostId(selectedPhoto.instagramUrl)}/embed/`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency={true}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 lg:p-8 overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {selectedPhoto.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(selectedPhoto.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">{selectedPhoto.title}</h2>
                      {selectedPhoto.location && (
                        <p className="text-sm text-muted-foreground">📍 {selectedPhoto.location}</p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedPhoto.fullDescription || selectedPhoto.description}
                    </p>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(selectedPhoto.id)}
                          className={`flex items-center gap-2 ${
                            likedPhotos.has(selectedPhoto.id) ? "text-red-500" : ""
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${likedPhotos.has(selectedPhoto.id) ? "fill-current" : ""}`} />
                          {selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          {selectedPhoto.views}
                        </div>
                      </div>
                      <div className="flex gap-2 relative">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(selectedPhoto)}
                          className="relative"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadImage(selectedPhoto)}
                          disabled={isDownloading}
                          className="relative overflow-hidden"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {isDownloading ? `${downloadProgress}%` : "Download"}
                          {isDownloading && (
                            <div
                              className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300"
                              style={{ width: `${downloadProgress}%` }}
                            />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Share Menu */}
                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-muted/50 rounded-lg space-y-4"
                        >
                          <h4 className="font-semibold">Share this photo</h4>

                          {/* Copy Link */}
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={generateShareableLink(selectedPhoto)}
                              readOnly
                              className="flex-1 px-3 py-2 text-sm bg-background border rounded-md"
                            />
                            <Button
                              size="sm"
                              onClick={() => copyToClipboard(generateShareableLink(selectedPhoto))}
                              className="flex items-center gap-2"
                            >
                              {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              {copySuccess ? "Copied!" : "Copy"}
                            </Button>
                          </div>

                          {/* Social Share Buttons */}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => shareToSocial("facebook", selectedPhoto)}
                              className="flex items-center gap-2"
                            >
                              <Facebook className="h-4 w-4" />
                              Facebook
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => shareToSocial("twitter", selectedPhoto)}
                              className="flex items-center gap-2"
                            >
                              <Twitter className="h-4 w-4" />
                              Twitter
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => shareToSocial("whatsapp", selectedPhoto)}
                              className="flex items-center gap-2"
                            >
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </Button>
                          </div>

                          <Button size="sm" variant="ghost" onClick={() => setShowShareMenu(false)} className="w-full">
                            Close
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Technical Details */}
                    <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold">Technical Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Camera:</span>
                          <p className="text-muted-foreground">{selectedPhoto.camera}</p>
                        </div>
                        <div>
                          <span className="font-medium">Lens:</span>
                          <p className="text-muted-foreground">{selectedPhoto.lens}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Settings:</span>
                          <p className="text-muted-foreground">{selectedPhoto.settings}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button asChild className="flex-1">
                        <Link
                          href="https://instagram.com/abhis_photography__"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="mr-2 h-4 w-4" />
                          View on Instagram
                        </Link>
                      </Button>
                      <Button variant="outline" asChild className="flex-1 bg-transparent">
                        <Link href="/contact">Book Session</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
