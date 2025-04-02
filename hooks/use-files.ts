"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export type File = {
  id: string
  name: string
  publicId: string
  userId: string
  folderId: string | null
  mimeType: string
  size: number
  isTrashed: boolean
  trashedAt: Date | null
  createdAt: Date
}

export type Folder = {
  id: string
  name: string
  userId: string
  rootFolderId: string | null
  parentId: string | null
  createdAt: Date
  isTrashed: boolean
  trashedAt: Date | null
}

export function useFiles() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null)

  // Fetch folder contents
  const getFolderContents = useCallback(
    async (folderId: string) => {
      setLoading(true)
      try {
        const response = await fetch(`/api/folders/${folderId}`)
        const result = await response.json()

        if (result.success) {
          setFiles(result.data.files)
          setFolders(result.data.subFolders)
          setCurrentFolder(result.data.folder)
        } else {
          toast({
            title: "Error",
            description: result.error || "Failed to load folder contents",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Failed to fetch folder contents:", error)
        toast({
          title: "Error",
          description: "Failed to load folder contents",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  // Create a new folder
  const createFolder = async (name: string, userId: string, parentId: string | null) => {
    setLoading(true)
    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, userId, parentId }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Folder created successfully",
        })
        await getFolderContents(parentId || result.data.parentId) // Refresh folder contents
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create folder",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to create folder:", error)
      toast({
        title: "Error",
        description: "Failed to create folder",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Upload a file
  const uploadFile = async (file: File, userId: string, folderId: string) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("userId", userId)
      formData.append("folderId", folderId)
      formData.append("name", file.name)
      formData.append("mimeType", file.type)
      formData.append("size", file.size.toString())

      // In a real app, you would generate a publicId or get it from a storage service
      const publicId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      formData.append("publicId", publicId)

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
        await getFolderContents(folderId) // Refresh folder contents
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to upload file",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to upload file:", error)
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Move file to trash
  const moveFileToTrash = async (fileId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrashed: true }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "File moved to trash",
        })
        if (currentFolder) {
          await getFolderContents(currentFolder.id) // Refresh folder contents
        }
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to move file to trash",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to move file to trash:", error)
      toast({
        title: "Error",
        description: "Failed to move file to trash",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Restore file from trash
  const restoreFile = async (fileId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrashed: false }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "File restored from trash",
        })
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to restore file",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to restore file:", error)
      toast({
        title: "Error",
        description: "Failed to restore file",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete file permanently
  const deleteFile = async (fileId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "File deleted permanently",
        })
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete file",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to delete file:", error)
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Move folder to trash
  const moveFolderToTrash = async (folderId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrashed: true }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Folder moved to trash",
        })
        if (currentFolder) {
          await getFolderContents(currentFolder.id) // Refresh folder contents
        }
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to move folder to trash",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to move folder to trash:", error)
      toast({
        title: "Error",
        description: "Failed to move folder to trash",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Restore folder from trash
  const restoreFolder = async (folderId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrashed: false }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Folder restored from trash",
        })
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to restore folder",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to restore folder:", error)
      toast({
        title: "Error",
        description: "Failed to restore folder",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Delete folder permanently
  const deleteFolder = async (folderId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Folder deleted permanently",
        })
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete folder",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to delete folder:", error)
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  // Get trashed items
  const getTrashedItems = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/trash/${userId}`)
      const result = await response.json()

      if (result.success) {
        return {
          files: result.data.files as File[],
          folders: result.data.folders as Folder[],
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load trashed items",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      console.error("Failed to load trashed items:", error)
      toast({
        title: "Error",
        description: "Failed to load trashed items",
        variant: "destructive",
      })
      return null
    } finally {
      setLoading(false)
    }
  }

  // Empty trash
  const emptyTrash = async (userId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/trash/${userId}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Trash emptied successfully",
        })
        return true
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to empty trash",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      console.error("Failed to empty trash:", error)
      toast({
        title: "Error",
        description: "Failed to empty trash",
        variant: "destructive",
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    files,
    folders,
    currentFolder,
    getFolderContents,
    createFolder,
    uploadFile,
    moveFileToTrash,
    restoreFile,
    deleteFile,
    moveFolderToTrash,
    restoreFolder,
    deleteFolder,
    getTrashedItems,
    emptyTrash,
  }
}

