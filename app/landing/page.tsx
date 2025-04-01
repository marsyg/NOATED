"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { PenTool, Mic, BookOpen, FolderOpen, Share2, ArrowRight, BookMarked, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "Handwriting to Text",
      description: "Convert your handwritten notes to digital text with our powerful recognition technology",
      icon: PenTool,
      color: "bg-forest text-cream",
    },
    {
      title: "Voice to Text",
      description: "Record your thoughts and convert speech to perfectly formatted notes",
      icon: Mic,
      color: "bg-terra text-cream",
    },
    {
      title: "Organize with Folders",
      description: "Keep your notes organized in beautiful wooden folders and shelves",
      icon: FolderOpen,
      color: "bg-wood text-cream",
    },
    {
      title: "Share with Community",
      description: "Share your notes publicly and discover notes from others",
      icon: BookOpen,
      color: "bg-cream text-wood border border-wood",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      text: "Bean Notes transformed how I take notes in class. The handwriting recognition is incredible!",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Professor",
      text: "The voice-to-text feature helps me capture my research ideas whenever inspiration strikes.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "Designer",
      text: "I love the beautiful wooden theme. It makes note-taking feel warm and inviting.",
      avatar: "ER",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 to-cream/30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
              className="flex items-center justify-center w-16 h-16 rounded-md bg-cream shadow-lg"
            >
              <BookMarked className="w-10 h-10 text-wood" />
            </motion.div>
          </div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold font-playfair text-wood mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-terra">Noated</span>: Your <span className="text-forest">GOATED</span> Note App
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-wood/80 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Transform your handwriting and voice into beautifully organized digital notes with our furniture-themed
            note-taking experience
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button asChild size="lg" className="text-lg bg-terra hover:bg-terra/80 text-cream">
              <Link href="/">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-wood text-wood hover:bg-wood/10">
              <Link href="#features">
                Learn More <ChevronDown className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <ChevronDown className="h-8 w-8 text-wood animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-playfair text-wood mb-4">Crafted with Care</h2>
            <p className="text-xl text-wood/70 max-w-2xl mx-auto">
              Bean Notes combines beautiful design with powerful features to create the perfect note-taking experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`rounded-lg p-6 cursor-pointer transition-all ${
                    activeFeature === index ? feature.color : "bg-cream/50 text-wood border border-wood/20"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ y: -5 }}
                  animate={{
                    scale: activeFeature === index ? 1.05 : 1,
                    boxShadow:
                      activeFeature === index ? "0 10px 25px -5px rgba(0, 0, 0, 0.1)" : "0 0 0 rgba(0, 0, 0, 0)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${activeFeature === index ? "bg-cream/20" : "bg-wood/10"}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-playfair mb-2">{feature.title}</h3>
                      <p className={activeFeature === index ? "text-cream/80" : "text-wood/70"}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl border-8 border-wood">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 paper-texture"
                >
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4 border-b border-wood/20 pb-4">
                      <h3 className="text-xl font-bold font-playfair text-wood">
                        {features[activeFeature].title} Demo
                      </h3>
                      {(() => {
                        const FeatureIcon = features[activeFeature].icon
                        return <FeatureIcon className="h-6 w-6 text-terra" />
                      })()}
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      {activeFeature === 0 && (
                        <div className="text-center">
                          <img
                            src="/placeholder.svg?height=300&width=400"
                            alt="Handwriting to text demo"
                            className="mx-auto mb-4 rounded-md border border-wood/20"
                          />
                          <p className="text-wood/70 italic">"Convert your handwritten notes with a single click"</p>
                        </div>
                      )}

                      {activeFeature === 1 && (
                        <div className="text-center">
                          <div className="waveform mb-4 h-40 flex items-center justify-center">
                            {Array.from({ length: 30 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="waveform-bar mx-1"
                                animate={{
                                  height: [10, Math.random() * 60 + 10, 10],
                                }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 1.5,
                                  delay: i * 0.05,
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-wood/70 italic">
                            "Speak naturally and watch your words transform into text"
                          </p>
                        </div>
                      )}

                      {activeFeature === 2 && (
                        <div className="grid grid-cols-2 gap-4">
                          {["Work", "Personal", "Projects", "Ideas"].map((folder, i) => (
                            <motion.div
                              key={folder}
                              className="folder-item"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                              whileHover={{ y: -5 }}
                            >
                              <div className="bg-terra text-cream rounded-lg p-4 folder-tab">
                                <h4 className="font-playfair">{folder}</h4>
                                <div className="flex justify-center mt-2">
                                  <FolderOpen className="h-10 w-10 text-cream/70" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {activeFeature === 3 && (
                        <div className="space-y-4 w-full">
                          <div className="flex items-center gap-3 bg-cream/50 p-3 rounded-lg border border-wood/20">
                            <BookOpen className="h-5 w-5 text-forest" />
                            <div>
                              <h4 className="font-medium text-wood">Physics Notes</h4>
                              <div className="flex items-center text-sm text-wood/70">
                                <Share2 className="h-3 w-3 mr-1" />
                                <span>Shared with 24 people</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 bg-cream/50 p-3 rounded-lg border border-wood/20">
                            <BookOpen className="h-5 w-5 text-terra" />
                            <div>
                              <h4 className="font-medium text-wood">Recipe Collection</h4>
                              <div className="flex items-center text-sm text-wood/70">
                                <Share2 className="h-3 w-3 mr-1" />
                                <span>Public • 56 likes</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 bg-cream/50 p-3 rounded-lg border border-wood/20">
                            <BookOpen className="h-5 w-5 text-wood" />
                            <div>
                              <h4 className="font-medium text-wood">Travel Journal</h4>
                              <div className="flex items-center text-sm text-wood/70">
                                <Share2 className="h-3 w-3 mr-1" />
                                <span>Public • 89 likes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-wood text-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-playfair mb-4">Why Choose Bean Notes?</h2>
            <p className="text-xl text-cream/70 max-w-2xl mx-auto">
              Our furniture-themed note app offers unique benefits that make note-taking a pleasure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Beautiful Design",
                description: "Enjoy a warm, furniture-themed interface that makes note-taking feel like home",
                icon: "🪑",
              },
              {
                title: "Powerful Conversion",
                description: "Transform handwriting and voice into perfectly formatted digital notes",
                icon: "✨",
              },
              {
                title: "Seamless Organization",
                description: "Keep everything organized with our intuitive folder system",
                icon: "📚",
              },
              {
                title: "Cross-Device Sync",
                description: "Access your notes from anywhere, on any device",
                icon: "🔄",
              },
              {
                title: "Community Sharing",
                description: "Share your knowledge and discover notes from others",
                icon: "🌍",
              },
              {
                title: "Privacy First",
                description: "Your notes are private by default, share only what you want",
                icon: "🔒",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-wood/40 p-6 rounded-lg border border-cream/20"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold font-playfair mb-2">{benefit.title}</h3>
                <p className="text-cream/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-playfair text-wood mb-4">What Our Users Say</h2>
            <p className="text-xl text-wood/70 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their note-taking experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cream paper-texture p-6 rounded-lg border border-wood shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-terra text-cream flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold font-playfair text-wood">{testimonial.name}</h3>
                    <p className="text-wood/70">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-wood/80 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-terra text-cream">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-playfair mb-6">Ready to Transform Your Notes?</h2>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto mb-10">
              Join Bean Notes today and experience the GOATED way to take, organize, and share your notes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg bg-cream text-terra hover:bg-cream/90">
                <Link href="/">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg border-cream text-cream hover:bg-terra/80">
                <Link href="/public-notes">Browse Public Notes</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-wood text-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-cream mr-3">
                <BookMarked className="w-6 h-6 text-wood" />
              </div>
              <span className="text-xl font-bold font-playfair">Bean Notes</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/" className="text-cream/80 hover:text-cream">
                Home
              </Link>
              <Link href="#features" className="text-cream/80 hover:text-cream">
                Features
              </Link>
              <Link href="/public-notes" className="text-cream/80 hover:text-cream">
                Public Notes
              </Link>
              <Link href="/account" className="text-cream/80 hover:text-cream">
                Account
              </Link>
            </div>
          </div>

          <div className="border-t border-cream/20 mt-8 pt-8 text-center text-cream/60">
            <p>© {new Date().getFullYear()} Bean Notes. All rights reserved.</p>
            <p className="mt-2">The GOATED note-taking experience.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

