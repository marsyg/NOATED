"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, FileText, ThumbsUp, MessageSquare, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data
const publicNotes = [
  {
    id: 1,
    title: "Physics Lecture Notes",
    author: "John Doe",
    date: "2 days ago",
    likes: 24,
    comments: 5,
    tags: ["Physics", "Science", "Education"],
  },
  {
    id: 2,
    title: "Recipe Collection",
    author: "Jane Smith",
    date: "1 week ago",
    likes: 56,
    comments: 12,
    tags: ["Cooking", "Food", "Recipes"],
  },
  {
    id: 3,
    title: "Programming Tips",
    author: "Alex Johnson",
    date: "3 days ago",
    likes: 18,
    comments: 7,
    tags: ["Programming", "Coding", "Tech"],
  },
  {
    id: 4,
    title: "Travel Journal - Paris",
    author: "Emily Brown",
    date: "2 weeks ago",
    likes: 89,
    comments: 23,
    tags: ["Travel", "Paris", "Journal"],
  },
]

export default function PublicNotesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-6 max-w-6xl">
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-playfair text-wood mb-4"
        >
          Public Notes
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Input
              placeholder="Search public notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 border-wood focus-visible:ring-forest"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-wood/50" />
          </div>

          <Button variant="outline" className="gap-2 border-wood text-wood hover:bg-wood/10">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </motion.div>
      </header>

      <Tabs defaultValue="popular" className="mb-8">
        <TabsList className="mb-4 bg-cream border border-wood">
          <TabsTrigger value="popular" className="data-[state=active]:bg-wood data-[state=active]:text-cream">
            Popular
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-wood data-[state=active]:text-cream">
            Recent
          </TabsTrigger>
          <TabsTrigger value="following" className="data-[state=active]:bg-wood data-[state=active]:text-cream">
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full drawer paper-texture border-wood hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 border-b border-wood/20">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-playfair text-wood">{note.title}</CardTitle>
                      <FileText className="h-5 w-5 text-forest" />
                    </div>
                    <CardDescription className="flex items-center gap-2 text-wood/70">
                      <Avatar className="h-5 w-5 border border-wood/20">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="bg-terra text-cream">{note.author[0]}</AvatarFallback>
                      </Avatar>
                      {note.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-terra/20 text-terra border-terra/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="h-24 bg-cream/50 rounded-md flex items-center justify-center border border-wood/20">
                      <FileText className="h-8 w-8 text-wood/50" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-4 text-sm text-wood/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {note.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="gap-1 text-wood hover:bg-wood/10">
                        <ThumbsUp className="h-4 w-4" />
                        {note.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-wood hover:bg-wood/10">
                        <MessageSquare className="h-4 w-4" />
                        {note.comments}
                      </Button>
                    </div>
                  </CardFooter>
                  <div className="drawer-handle mx-auto mb-2"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="flex flex-col items-center justify-center h-40 bg-cream/50 rounded-lg border border-wood/20">
            <FileText className="h-10 w-10 text-terra mb-2" />
            <p className="text-wood/70">Recent notes will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="following">
          <div className="flex flex-col items-center justify-center h-40 bg-cream/50 rounded-lg border border-wood/20">
            <User className="h-10 w-10 text-forest mb-2" />
            <p className="text-wood/70">Follow users to see their notes here</p>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-playfair text-wood">Featured Note</h2>
        </div>

        <Card className="cabinet text-cream">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-playfair">Advanced Mathematics Study Guide</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1 text-cream/70">
                  <Avatar className="h-5 w-5 border border-cream/20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-terra text-cream">P</AvatarFallback>
                  </Avatar>
                  Professor Williams
                </CardDescription>
              </div>
              <Badge className="bg-forest text-cream border-0">Featured</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 mb-4">
              <Badge variant="secondary" className="bg-cream/20 text-cream border-cream/30">
                Mathematics
              </Badge>
              <Badge variant="secondary" className="bg-cream/20 text-cream border-cream/30">
                Education
              </Badge>
              <Badge variant="secondary" className="bg-cream/20 text-cream border-cream/30">
                Study Guide
              </Badge>
            </div>
            <p className="mb-4 text-cream/80">
              A comprehensive study guide covering advanced mathematics topics including calculus, linear algebra, and
              differential equations.
            </p>
            <div className="h-40 bg-cream/10 rounded-md flex items-center justify-center border border-cream/20">
              <FileText className="h-12 w-12 text-cream/50" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4 text-sm text-cream/70">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />1 day ago
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-1 text-cream hover:bg-wood/80">
                <ThumbsUp className="h-4 w-4" />
                142
              </Button>
              <Button variant="ghost" size="sm" className="gap-1 text-cream hover:bg-wood/80">
                <MessageSquare className="h-4 w-4" />
                37
              </Button>
              <Button className="bg-terra hover:bg-terra/80 text-cream">View Note</Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}

