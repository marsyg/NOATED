"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, Search, Plus, Grid, List, MoreHorizontal, Share2, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const folderData = {
  id: 1,
  name: "Folder Name",
  scripts: [
    { id: 1, title: "Script 1", date: "2 days ago", type: "handwriting" },
    { id: 2, title: "Script 2", date: "1 week ago", type: "voice" },
    { id: 3, title: "Script 3", date: "3 days ago", type: "handwriting" },
    { id: 4, title: "Script 4", date: "2 weeks ago", type: "voice" },
  ],
}

export default function FolderPage({ params }: { params: { folderId: string } }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="container py-6 max-w-6xl">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/shelf")}
            className="h-10 w-10 rounded-md border-wood text-wood hover:bg-wood/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold font-playfair text-wood">{folderData.name}</h1>
            <p className="text-wood/70">
              Script {folderData.scripts.length} of {folderData.scripts.length}
            </p>
          </div>

          <Button variant="outline" className="ml-auto gap-2 border-wood text-wood hover:bg-wood/10">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              placeholder="Search script"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-wood focus-visible:ring-forest"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wood/50" />
          </div>

          <div className="flex gap-2">
            <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList className="bg-cream border border-wood">
                <TabsTrigger value="grid" className="px-3 data-[state=active]:bg-wood data-[state=active]:text-cream">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3 data-[state=active]:bg-wood data-[state=active]:text-cream">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button className="gap-2 bg-terra hover:bg-terra/80 text-cream">
              <Plus className="h-4 w-4" />
              New Script
            </Button>
          </div>
        </div>
      </header>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {folderData.scripts.map((script, index) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full drawer paper-texture border-wood hover:shadow-md transition-shadow">
                <CardHeader className="pb-2 border-b border-wood/20">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-playfair text-wood">{script.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-wood hover:bg-wood/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-cream border-wood">
                        <DropdownMenuItem asChild>
                          <Link href={`/shelf/${params.folderId}/${script.id}`}>Open</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-wood/70">{script.date}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-32 bg-cream/50 rounded-md flex items-center justify-center border border-wood/20">
                    <div className="text-wood/70 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Lorem ipsum dolor sit amet, consectetur...</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full border-wood text-wood hover:bg-wood/10" asChild>
                    <Link href={`/shelf/${params.folderId}/${script.id}`}>Open</Link>
                  </Button>
                </CardFooter>
                <div className="drawer-handle mx-auto mb-2"></div>
              </Card>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="h-full border-dashed border-wood bg-transparent hover:bg-wood/5 transition-colors">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Plus className="h-12 w-12 text-wood/50 mb-2" />
                <p className="text-wood/70 font-playfair">Create New Script</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-2">
          {folderData.scripts.map((script) => (
            <motion.div
              key={script.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
            >
              <Card className="hover:bg-cream/50 transition-colors border-wood">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-terra" />
                    <div>
                      <h3 className="font-medium font-playfair text-wood">{script.title}</h3>
                      <p className="text-sm text-wood/70">{script.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-wood hover:bg-wood/10">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-wood hover:bg-wood/10" asChild>
                      <Link href={`/shelf/${params.folderId}/${script.id}`}>Open</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

