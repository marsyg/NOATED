"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Share2, Languages, Save, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ScriptPage({
  params,
}: {
  params: { folderId: string; scriptId: string }
}) {
  const router = useRouter()
  const [scriptText, setScriptText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  )
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="container py-6 max-w-4xl">
      <header className="mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="h-12 w-12 rounded-md border-wood text-wood hover:bg-wood/10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-playfair text-wood">Script 4</h1>
            <p className="text-wood/70">Folder Name</p>
          </div>
        </div>
      </header>

      <div className="notebook-page rounded-lg p-6 border border-wood/20 relative mb-4">
        <div className="notebook-holes">
          <div className="notebook-hole"></div>
          <div className="notebook-hole"></div>
          <div className="notebook-hole"></div>
          <div className="notebook-hole"></div>
          <div className="notebook-hole"></div>
        </div>

        <div className="flex justify-between items-center mb-4 pl-6">
          <h2 className="text-xl font-semibold font-playfair text-wood">Script 4</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
            className="text-wood hover:bg-wood/10"
          >
            {isEditing ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
          </Button>
        </div>

        <Textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          className="min-h-[400px] bg-cream/50 border-wood/20 focus-visible:ring-forest pl-6"
          disabled={!isEditing}
        />

        {isEditing && (
          <div className="flex justify-end mt-4 pl-6">
            <Button className="gap-2 bg-wood hover:bg-wood/80 text-cream">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2 border-wood text-wood hover:bg-wood/10">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-wood text-wood hover:bg-wood/10">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-wood text-wood hover:bg-wood/10">
            <Languages className="h-4 w-4" />
            Change language
          </Button>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2 border-wood text-wood hover:bg-wood/10">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-wood text-wood hover:bg-wood/10">
            <Save className="h-4 w-4" />
            Save to computer
          </Button>
          <Button variant="destructive" className="w-full justify-start gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Script Forever
          </Button>
        </div>
      </div>
    </div>
  )
}

