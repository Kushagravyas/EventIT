"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useTheme } from "./theme-provider"
import { Calendar, Clock, Palette, FileText } from "lucide-react"

const colorOptions = [
  { value: "bg-blue-500", label: "Ocean Blue", preview: "bg-blue-500" },
  { value: "bg-red-500", label: "Coral Red", preview: "bg-red-500" },
  { value: "bg-green-500", label: "Forest Green", preview: "bg-green-500" },
  { value: "bg-purple-500", label: "Royal Purple", preview: "bg-purple-500" },
  { value: "bg-orange-500", label: "Sunset Orange", preview: "bg-orange-500" },
  { value: "bg-pink-500", label: "Rose Pink", preview: "bg-pink-500" },
  { value: "bg-indigo-500", label: "Deep Indigo", preview: "bg-indigo-500" },
  { value: "bg-teal-500", label: "Teal", preview: "bg-teal-500" },
]

export function EventDialog({ open, onOpenChange, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
    description: "",
    color: "bg-blue-500",
  })
  const [errors, setErrors] = useState({})
  const { theme } = useTheme()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    }

    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    if (formData.duration < 0) {
      newErrors.duration = "Duration must be positive"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onAddEvent(formData)
      setFormData({
        title: "",
        date: "",
        time: "",
        duration: 60,
        description: "",
        color: "bg-blue-500",
      })
      setErrors({})
      onOpenChange(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[500px] bg-gradient-to-br ${theme.eventModal} text-white border-0 shadow-2xl`}
      >
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center justify-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span>Create New Event</span>
          </DialogTitle>
          <DialogDescription className="text-white/80 text-base">
            Add a new event to your calendar with all the details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-semibold flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Event Title</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter event title"
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 ${errors.title ? "border-red-400" : ""}`}
            />
            {errors.title && <p className="text-red-200 text-sm">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white font-semibold flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={`bg-white/10 border-white/20 text-white focus:bg-white/20 transition-all duration-300 ${errors.date ? "border-red-400" : ""}`}
              />
              {errors.date && <p className="text-red-200 text-sm">{errors.date}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white font-semibold flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Time</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                className={`bg-white/10 border-white/20 text-white focus:bg-white/20 transition-all duration-300 ${errors.time ? "border-red-400" : ""}`}
              />
              {errors.time && <p className="text-red-200 text-sm">{errors.time}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-white font-semibold">
              Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value) || 0)}
              placeholder="60"
              min="0"
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 ${errors.duration ? "border-red-400" : ""}`}
            />
            {errors.duration && <p className="text-red-200 text-sm">{errors.duration}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color" className="text-white font-semibold flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Event Color</span>
            </Label>
            <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white focus:bg-white/20">
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full ${option.preview} shadow-md`} />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter event description (optional)"
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 transition-all duration-300 resize-none"
            />
          </div>

          <DialogFooter className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-gray-900 hover:bg-white/90 font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Create Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
