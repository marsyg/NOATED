"use client"

import { useState } from "react"
import { Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateScriptModalProps {
  folderName?: string
  onCreateScript?: (data: any) => void
}

export function CreateScriptModal({ folderName = "folder name", onCreateScript }: CreateScriptModalProps) {
  const [open, setOpen] = useState(false)
  const [scriptName, setScriptName] = useState("")

  const handleCreate = (type: string) => {
    if (onCreateScript) {
      onCreateScript({
        name: scriptName || "New script",
        type,
      })
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-terra hover:bg-terra/80 text-cream">
          <FileText className="h-4 w-4" />
          <span>New script</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-cream border-wood">
        <DialogHeader>
          <DialogTitle className="font-playfair text-wood">New script for folder "{folderName}"</DialogTitle>
          <DialogDescription className="text-wood/70">
            Create a new script by uploading a file or recording.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="bg-cream/50 rounded-lg p-6 flex items-center justify-center border border-wood/20">
            <Button
              variant="outline"
              className="w-full h-full py-12 flex flex-col gap-4 border-wood text-wood hover:bg-wood/10"
            >
              <Upload className="h-8 w-8" />
              <span className="text-lg font-medium font-playfair">Add from computer</span>
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center font-playfair text-wood">Create a script</h3>

            <Tabs defaultValue="voice" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 bg-cream border border-wood">
                <TabsTrigger value="voice" className="data-[state=active]:bg-wood data-[state=active]:text-cream">
                  Voice to text
                </TabsTrigger>
                <TabsTrigger value="handwriting" className="data-[state=active]:bg-wood data-[state=active]:text-cream">
                  Handwriting to text
                </TabsTrigger>
              </TabsList>

              <TabsContent value="voice" className="space-y-4">
                <div className="bg-cream/50 rounded-lg p-4 border border-wood/20">
                  <h4 className="text-center mb-4 font-playfair text-wood">Record voice</h4>
                  <Button
                    className="w-full py-6 bg-terra hover:bg-terra/80 text-cream"
                    onClick={() => handleCreate("voice")}
                  >
                    Start
                  </Button>
                </div>

                <div className="bg-cream/50 rounded-lg p-4 border border-wood/20">
                  <h4 className="text-center mb-2 font-playfair text-wood">Or attach recording</h4>
                  <p className="text-center text-sm text-wood/70 mb-2">Select from files/ drag and drop</p>
                  <Input type="file" className="hidden" id="voice-file" />
                  <Label
                    htmlFor="voice-file"
                    className="flex items-center justify-center p-2 border-2 border-dashed border-wood/50 rounded-md cursor-pointer hover:bg-wood/5 text-wood"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Select file
                  </Label>
                </div>
              </TabsContent>

              <TabsContent value="handwriting" className="space-y-4">
                <div className="bg-cream/50 rounded-lg p-4 border border-wood/20 flex flex-col items-center">
                  <div className="mb-4 w-24 h-32 bg-white rounded-md border border-wood/20 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=100&width=80"
                      alt="Handwritten note"
                      className="max-h-full object-contain"
                    />
                  </div>
                  <Button
                    className="w-full bg-terra hover:bg-terra/80 text-cream"
                    onClick={() => handleCreate("handwriting")}
                  >
                    Take a picture/ add script
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

