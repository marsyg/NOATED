"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Mic, PenTool, Settings, BookOpen, FolderOpen, Plus, BookMarked } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shelf", href: "/shelf", icon: FolderOpen },
  { name: "Voice to typed", href: "/voice-to-typed", icon: Mic },
  { name: "Handwriting to typed", href: "/handwriting-to-typed", icon: PenTool },
  { name: "Public Notes", href: "/public-notes", icon: BookOpen },
  { name: "Account", href: "/account", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [showNewButton, setShowNewButton] = useState(false)

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="wood-panel border-r-0">
      <SidebarHeader className="flex flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-cream">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10 }}
            className="flex items-center justify-center w-10 h-10 rounded-md bg-cream"
          >
            <BookMarked className="w-6 h-6 text-wood" />
          </motion.div>
          <span className="font-playfair">Bean Notes</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
                className="text-cream hover:bg-wood/50"
              >
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setShowNewButton(true)}
            onMouseLeave={() => setShowNewButton(false)}
            className="relative"
          >
            <Button
              variant="outline"
              className="w-full justify-start gap-2 bg-terra text-cream border-cream/20 hover:bg-terra/80"
            >
              <Plus className="w-5 h-5" />
              <span>New Note</span>
            </Button>

            {showNewButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 mt-2 space-y-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start pl-8 text-sm bg-cream/10 text-cream border-cream/20 hover:bg-cream/20"
                  asChild
                >
                  <Link href="/handwriting-to-typed">Handwriting</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start pl-8 text-sm bg-cream/10 text-cream border-cream/20 hover:bg-cream/20"
                  asChild
                >
                  <Link href="/voice-to-typed">Voice</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-cream/20">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 text-cream hover:bg-wood/50">
              <Avatar className="w-6 h-6 border border-cream/20">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-terra text-cream">UN</AvatarFallback>
              </Avatar>
              <span>User Name</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-cream border-wood">
            <DropdownMenuItem asChild>
              <Link href="/account">Account Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <SidebarTrigger className="absolute top-4 right-4 md:hidden text-cream" />
    </Sidebar>
  )
}

