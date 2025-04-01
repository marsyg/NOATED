"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { FolderOpen, Search, Plus, Grid, List, LayoutGrid, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const folders = [
  { id: 1, name: "Work", count: 12 },
  { id: 2, name: "Personal", count: 8 },
  { id: 3, name: "Projects", count: 5 },
  { id: 4, name: "School", count: 15 },
  { id: 5, name: "Ideas", count: 3 },
  { id: 6, name: "Recipes", count: 7 },
]

export default function ShelfPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "shelf">("shelf")

  return (
    <div className="container py-6 max-w-6xl">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold font-playfair text-wood"
          >
            Folder Shelf
          </motion.h1>

          <div className="flex items-center gap-2">
            <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList className="bg-cream border border-wood">
                <TabsTrigger value="grid" className="px-3 data-[state=active]:bg-wood data-[state=active]:text-cream">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3 data-[state=active]:bg-wood data-[state=active]:text-cream">
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="shelf" className="px-3 data-[state=active]:bg-wood data-[state=active]:text-cream">
                  <LayoutGrid className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button className="gap-2 bg-terra hover:bg-terra/80 text-cream">
              <Plus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Input
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md border-wood focus-visible:ring-forest"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wood/50" />
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {viewMode === "shelf" && (
          <motion.div
            key="shelf"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-8"
          >
            <div className="shelf p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-playfair">{folder.name}</CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-cream hover:bg-terra/80">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-cream border-wood">
                                <DropdownMenuItem className="gap-2">
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardDescription className="text-cream/70">{folder.count} notes</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-4">
                          <FolderOpen className="h-16 w-16 text-cream/70" />
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="folder-item"
                >
                  <Card className="h-full border-dashed border-cream/50 bg-transparent hover:bg-cream/10 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center h-full py-8">
                      <Plus className="h-12 w-12 text-cream/70 mb-2" />
                      <p className="text-cream/70 font-playfair">Create New Folder</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === "grid" && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {folders.map((folder) => (
                <Card key={folder.id} className="h-full border-wood bg-cream">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-playfair text-wood">{folder.name}</CardTitle>
                    <CardDescription className="text-wood/70">{folder.count} notes</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <FolderOpen className="h-12 w-12 text-terra" />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-wood text-wood hover:bg-wood/10"
                      asChild
                    >
                      <Link href={`/shelf/${folder.id}`}>Open</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {viewMode === "list" && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="space-y-2">
              {folders.map((folder) => (
                <Card key={folder.id} className="hover:bg-cream/50 transition-colors border-wood">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-5 w-5 text-terra" />
                      <div>
                        <h3 className="font-medium font-playfair text-wood">{folder.name}</h3>
                        <p className="text-sm text-wood/70">{folder.count} notes</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-wood hover:bg-wood/10" asChild>
                      <Link href={`/shelf/${folder.id}`}>Open</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

