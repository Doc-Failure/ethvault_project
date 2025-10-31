"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: number
  title: string
  content: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchNotes = async () => {
    const res = await fetch("/api/notes", { credentials: "include" })
    const data = await res.json()
    if (data.success) setNotes(data.notes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return

    if (editingId) {
      await fetch(`/api/notes/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      })
      setEditingId(null)
    } else {
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      })
    }

    setTitle("")
    setContent("")
    fetchNotes()
  }

  const deleteNote = async (id: number) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE", credentials: "include" })
    fetchNotes()
  }

  const editNote = (note: Note) => {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <div className="flex gap-2">
          <Button type="submit">{editingId ? "Update" : "Create"}</Button>
          {editingId && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingId(null)
                setTitle("")
                setContent("")
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="border p-4 rounded">
              <h3 className="font-bold">{note.title}</h3>
              <p className="text-gray-700 mt-2">{note.content}</p>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={() => editNote(note)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteNote(note.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
