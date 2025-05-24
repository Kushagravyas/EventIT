"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Calendar, Clock, FileText, Trash2 } from "lucide-react"

export function EventDetailsDialog({ event, open, onOpenChange, onDelete }) {
  if (!event) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDuration = (duration) => {
    if (duration === 0) return "All day"
    if (duration < 60) return `${duration} minutes`
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`
    return `${hours}h ${minutes}m`
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${event.color}`} />
            <span>{event.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{formatDate(event.date)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{formatTime(event.time)}</p>
              <p className="text-sm text-muted-foreground">Duration: {formatDuration(event.duration)}</p>
            </div>
          </div>

          {event.description && (
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium mb-1">Description</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete} className="mr-auto">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
