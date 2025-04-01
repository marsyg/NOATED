"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, FolderOpen, Mic, PenTool, Clock, Star, Search, Plus, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const recentNotes = [
  { id: 1, title: "Meeting Notes", date: "2 hours ago", type: "handwriting" },
  { id: 2, title: "Project Ideas", date: "Yesterday", type: "voice" },
  { id: 3, title: "Shopping List", date: "3 days ago", type: "handwriting" },
]

const folders = [
  { id: 1, name: "Work", count: 12 },
  { id: 2, name: "Personal", count: 8 },
  { id: 3, name: "Projects", count: 5 },
]

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    // Check if user has seen the landing page before
    const hasSeenLanding = localStorage.getItem("hasSeenLanding")

    if (!hasSeenLanding) {
      // If not, redirect to landing page
      router.push("/landing")
      // Set flag in localStorage
      localStorage.setItem("hasSeenLanding", "true")
    } else {
      setShowLanding(false)
    }
  }, [router])

  if (showLanding) {
    return null // Don't render anything while checking/redirecting
  }

  return (
    <div className="container py-6 max-w-6xl">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold font-playfair text-wood"
          >
            Welcome to Bean Notes
          </motion.h1>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="border-wood text-wood hover:bg-wood/10">
              <Search className="h-4 w-4" />
            </Button>
            <Button className="gap-2 bg-terra hover:bg-terra/80 text-cream">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Input
            placeholder="Search notes and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md border-wood focus-visible:ring-forest"
          />
        </motion.div>
      </header>

      <Tabs defaultValue="recent" className="mb-8">
        <TabsList className="mb-4 bg-cream border border-wood">
          <TabsTrigger value="recent" className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="favorites" className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream">
            <Star className="h-4 w-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="folders" className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream">
            <FolderOpen className="h-4 w-4" />
            Folders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full drawer paper-texture border-wood hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2 border-b border-wood/20">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-playfair text-wood">{note.title}</CardTitle>
                      {note.type === "handwriting" ? (
                        <PenTool className="h-4 w-4 text-forest" />
                      ) : (
                        <Mic className="h-4 w-4 text-terra" />
                      )}
                    </div>
                    <CardDescription className="text-wood/70">{note.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-24 bg-cream/50 rounded-md flex items-center justify-center border border-wood/20">
                      <FileText className="h-8 w-8 text-wood/50" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-wood text-wood hover:bg-wood/10"
                      asChild
                    >
                      <Link href={`/notes/${note.id}`}>Open</Link>
                    </Button>
                  </CardFooter>
                  <div className="drawer-handle mx-auto mb-2"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="flex flex-col items-center justify-center h-40 bg-cream/50 rounded-lg border border-wood/20">
            <Star className="h-10 w-10 text-terra mb-2" />
            <p className="text-wood/70">No favorites yet</p>
          </div>
        </TabsContent>

        <TabsContent value="folders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="folder-item"
              >
                <Link href={`/shelf/${folder.id}`}>
                  <Card className="h-full bg-terra text-cream hover:bg-terra/90 transition-colors folder-tab">
                    <CardHeader>
                      <CardTitle className="font-playfair">{folder.name}</CardTitle>
                      <CardDescription className="text-cream/70">{folder.count} notes</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <FolderOpen className="h-16 w-16 text-cream/70" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="folder-item"
            >
              <Card className="h-full border-dashed border-wood bg-transparent hover:bg-wood/5 transition-colors">
                <CardContent className="flex flex-col items-center justify-center h-full py-8">
                  <Plus className="h-12 w-12 text-wood/50 mb-2" />
                  <p className="text-wood/70 font-playfair">Create New Folder</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair text-wood">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/handwriting-to-typed">
              <Card className="h-full bg-cream border-wood hover:bg-cream/80 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <PenTool className="h-12 w-12 mb-4 text-forest" />
                  <h3 className="text-lg font-medium font-playfair text-wood">Handwriting to Text</h3>
                  <p className="text-sm text-center text-wood/70 mt-2">
                    Convert your handwritten notes to digital text
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/voice-to-typed">
              <Card className="h-full bg-cream border-wood hover:bg-cream/80 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <Mic className="h-12 w-12 mb-4 text-terra" />
                  <h3 className="text-lg font-medium font-playfair text-wood">Voice to Text</h3>
                  <p className="text-sm text-center text-wood/70 mt-2">Record and convert speech to digital notes</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href="/public-notes">
              <Card className="h-full bg-cream border-wood hover:bg-cream/80 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <BookOpen className="h-12 w-12 mb-4 text-wood" />
                  <h3 className="text-lg font-medium font-playfair text-wood">Public Notes</h3>
                  <p className="text-sm text-center text-wood/70 mt-2">Browse and share notes with the community</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

