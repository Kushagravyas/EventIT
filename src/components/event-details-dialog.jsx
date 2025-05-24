"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Calendar, Clock, FileText, Trash2, MapPin, Users, Tag, AlertCircle } from "lucide-react"

export function EventDetailsDialog({ event, open, onOpenChange, onDelete, categories = [], priorities = [] }) {
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

  const getCategoryInfo = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId) || { name: categoryId, color: "bg-gray-500" }
  }

  const getPriorityInfo = (priorityId) => {
    return priorities.find((pri) => pri.id === priorityId) || { name: priorityId, color: "bg-gray-500" }
  }

  const categoryInfo = getCategoryInfo(event.category)
  const priorityInfo = getPriorityInfo(event.priority)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-white via-gray-50/50 to-white border shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <div className={`w-5 h-5 rounded-full ${event.color} shadow-md`} />
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {event.title}
            </span>
          </DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge variant="secondary" className={`${categoryInfo.color} text-white`}>
              <Tag className="h-3 w-3 mr-1" />
              {categoryInfo.name}
            </Badge>
            <Badge variant="secondary" className={`${priorityInfo.color} text-white`}>
              <AlertCircle className="h-3 w-3 mr-1" />
              {priorityInfo.name}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/50">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Date</p>
                <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg border border-purple-200/50">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Time</p>
                <p className="text-sm text-gray-600">{formatTime(event.time)}</p>
                <p className="text-xs text-gray-500">Duration: {formatDuration(event.duration)}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg border border-green-200/50">
              <div className="p-2 bg-green-500 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
            </div>
          )}

          {/* Attendees */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg border border-orange-200/50">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2">Attendees ({event.attendees.length})</p>
                <div className="flex flex-wrap gap-2">
                  {event.attendees.map((attendee, index) => (
                    <Badge key={index} variant="outline" className="bg-white/50">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200/50">
              <div className="p-2 bg-gray-500 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between pt-6 border-t">
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="mr-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Event
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
