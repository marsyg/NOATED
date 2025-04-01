"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Settings, Bell, Shield, Download, Trash2, Save, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function AccountPage() {
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container py-6 max-w-4xl">
      <header className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-playfair text-wood mb-4"
        >
          Account Settings
        </motion.h1>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/3">
          <Card className="sticky top-6 cabinet text-cream">
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4 border-2 border-cream/20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="bg-terra text-cream">JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-playfair">{name}</CardTitle>
                <CardDescription className="text-cream/70">{email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm text-cream/70">2.4GB / 10GB</span>
                </div>
                <Progress value={24} className="h-2 bg-cream/20" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2 border-cream/20 text-cream hover:bg-wood/80">
                <Download className="h-4 w-4" />
                Download All Notes
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:w-2/3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4 grid grid-cols-4 md:w-fit bg-cream border border-wood">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream">
                <User className="h-4 w-4" />
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2 data-[state=active]:bg-wood data-[state=active]:text-cream">
                <Shield className="h-4 w-4" />
                <span className="hidden md:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card className="paper-texture border-wood">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-playfair text-wood">Profile Information</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-wood hover:bg-wood/10"
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-wood">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className="border-wood/50 focus-visible:ring-forest"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-wood">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className="border-wood/50 focus-visible:ring-forest"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-wood">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value="••••••••"
                      disabled={!isEditing}
                      className="border-wood/50 focus-visible:ring-forest"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-wood hover:bg-wood/80 text-cream" disabled={!isEditing}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive font-playfair">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-wood/70 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <Card className="paper-texture border-wood">
                <CardHeader>
                  <CardTitle className="font-playfair text-wood">Note Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Auto-save notes</Label>
                      <p className="text-sm text-wood/70">Automatically save notes while typing</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Default view</Label>
                      <p className="text-sm text-wood/70">Choose default view for folders</p>
                    </div>
                    <Tabs defaultValue="grid">
                      <TabsList className="bg-cream border border-wood">
                        <TabsTrigger
                          value="grid"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          Grid
                        </TabsTrigger>
                        <TabsTrigger
                          value="list"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          List
                        </TabsTrigger>
                        <TabsTrigger
                          value="shelf"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          Shelf
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Theme</Label>
                      <p className="text-sm text-wood/70">Choose your preferred theme</p>
                    </div>
                    <Tabs defaultValue="light">
                      <TabsList className="bg-cream border border-wood">
                        <TabsTrigger
                          value="light"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          Light
                        </TabsTrigger>
                        <TabsTrigger
                          value="dark"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          Dark
                        </TabsTrigger>
                        <TabsTrigger
                          value="system"
                          className="data-[state=active]:bg-wood data-[state=active]:text-cream"
                        >
                          System
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card className="paper-texture border-wood">
                <CardHeader>
                  <CardTitle className="font-playfair text-wood">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Email notifications</Label>
                      <p className="text-sm text-wood/70">Receive email notifications</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Comment notifications</Label>
                      <p className="text-sm text-wood/70">Notify when someone comments on your notes</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Marketing emails</Label>
                      <p className="text-sm text-wood/70">Receive marketing and promotional emails</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <Card className="paper-texture border-wood">
                <CardHeader>
                  <CardTitle className="font-playfair text-wood">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Public profile</Label>
                      <p className="text-sm text-wood/70">Make your profile visible to others</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Public notes by default</Label>
                      <p className="text-sm text-wood/70">Make new notes public by default</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator className="bg-wood/20" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-wood">Data collection</Label>
                      <p className="text-sm text-wood/70">Allow anonymous usage data collection</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

