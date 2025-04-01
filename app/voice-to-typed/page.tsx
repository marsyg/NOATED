"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Download, Share2, Languages, FileImage, Save, Mic, Play, Pause, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function VoiceToTypedPage() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [extractedText, setExtractedText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  )

  // Generate random heights for waveform visualization
  const waveformBars = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 10)

  const startRecording = () => {
    setIsRecording(true)
    // In a real app, this would start the recording process

    // Simulate recording completion after 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      setRecordingComplete(true)
    }, 3000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container py-6 max-w-6xl">
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
          <h1 className="text-2xl font-bold font-playfair text-wood">Voice to typed</h1>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/3 space-y-4">
          <div className="cabinet text-cream">
            <h2 className="text-xl font-semibold font-playfair mb-4">Your recording:</h2>

            <div className="bg-cream rounded-md border-2 border-cream/20 p-4 mb-4">
              <div className="waveform mb-4">
                {waveformBars.map((height, index) => (
                  <motion.div
                    key={index}
                    className="waveform-bar"
                    style={{ height: `${height}px` }}
                    animate={
                      isRecording || isPlaying
                        ? {
                            height: [height, Math.random() * 40 + 5, height],
                            transition: {
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 0.5,
                              ease: "easeInOut",
                            },
                          }
                        : {}
                    }
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {recordingComplete && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={togglePlayback}
                      className="border-terra text-terra hover:bg-terra/10"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Progress value={33} className="h-2 w-full my-auto bg-cream/20" />
                  </>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!recordingComplete ? (
                <motion.div key="record" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    className={`w-full gap-2 ${isRecording ? "bg-destructive" : "bg-terra"} text-cream`}
                    onClick={startRecording}
                    disabled={isRecording}
                  >
                    <Mic className={`h-4 w-4 ${isRecording ? "animate-pulse-recording" : ""}`} />
                    {isRecording ? "Recording..." : "Record again"}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="recorded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-cream/20 text-cream hover:bg-wood/80"
                    onClick={() => {
                      setRecordingComplete(false)
                      setIsPlaying(false)
                    }}
                  >
                    <Mic className="h-4 w-4" />
                    Record again
                  </Button>

                  <div className="text-center text-sm text-cream/70">Or attach recording</div>

                  <Button variant="outline" className="w-full gap-2 border-cream/20 text-cream hover:bg-wood/80">
                    <Upload className="h-4 w-4" />
                    Select from files/ drag and drop
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:w-2/3 space-y-4">
          <div className="notebook-page rounded-lg p-4 border border-wood/20 relative">
            <div className="notebook-holes">
              <div className="notebook-hole"></div>
              <div className="notebook-hole"></div>
              <div className="notebook-hole"></div>
              <div className="notebook-hole"></div>
              <div className="notebook-hole"></div>
            </div>

            <div className="mb-4 pl-6">
              <h2 className="text-xl font-semibold font-playfair text-wood">Typed script:</h2>
              <p className="text-wood/70">You can edit by typing or re-record a voice memo to be listened to again!</p>
            </div>

            <Textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="min-h-[400px] bg-cream/50 border-wood/20 focus-visible:ring-forest pl-6"
            />

            <div className="flex flex-wrap gap-2 mt-4 pl-6">
              <Button className="gap-2 bg-wood hover:bg-wood/80 text-cream">
                <Save className="h-4 w-4" />
                Save to computer
              </Button>
              <Button variant="outline" className="gap-2 border-wood text-wood hover:bg-wood/10">
                <FileImage className="h-4 w-4" />
                Add to folder!
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2 border-wood text-wood hover:bg-wood/10">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" className="gap-2 border-wood text-wood hover:bg-wood/10">
              <Share2 className="h-4 w-4" />
              Share Publicly
            </Button>
            <Button variant="outline" className="gap-2 border-wood text-wood hover:bg-wood/10">
              <Languages className="h-4 w-4" />
              Change language
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

