"use client"

import { useState, useRef, useEffect } from "react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight, Plus, Filter, CalendarIcon } from "lucide-react"
import { Button } from "./ui/button"
import { EventDialog } from "./event-dialog"
import { EventDetailsDialog } from "./event-details-dialog"
import { useTheme } from "./theme-provider"
import { StatCard, Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import eventsData from "../data/events.json"

export function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState("next")

  const calendarRef = useRef(null)
  const { theme } = useTheme()

  // Load static events from JSON on component mount
  useEffect(() => {
  const loadedEvents = eventsData.events.map((event) => ({
    ...event,
    date: dayjs(event.date).format("YYYY-MM-DD")
  }))
  setEvents(loadedEvents)
}, []) 

  // Filter events based on selected category and priority
  useEffect(() => {
    let filtered = events

    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((event) => event.priority === selectedPriority)
    }

    setFilteredEvents(filtered)
  }, [events, selectedCategory, selectedPriority])

  const daysInMonth = Array.from({ length: currentDate.daysInMonth() })
  const startDay = currentDate.startOf("month").day()
  const today = dayjs()

  const animateTransition = (direction) => {
    setIsAnimating(true)
    setAnimationDirection(direction)

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const previousMonth = () => {
    animateTransition("prev")
    setTimeout(() => {
      setCurrentDate(currentDate.subtract(1, "month"))
    }, 300)
  }

  const nextMonth = () => {
    animateTransition("next")
    setTimeout(() => {
      setCurrentDate(currentDate.add(1, "month"))
    }, 300)
  }

  const getEventsForDate = (date) => {
    return filteredEvents.filter((event) => dayjs(event.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD"))
  }

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      category: eventData.category || "personal",
      priority: eventData.priority || "medium",
      location: eventData.location || "",
      attendees: eventData.attendees || [],
    }
    setEvents((prev) => [...prev, newEvent])
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
    setIsEventDetailsOpen(false)
  }

  const monthlyEvents = filteredEvents.filter(
    (event) => dayjs(event.date).format("YYYY-MM") === currentDate.format("YYYY-MM"),
  )
  const todayEvents = filteredEvents.filter(
    (event) => dayjs(event.date).format("YYYY-MM-DD") === today.format("YYYY-MM-DD"),
  )
  const highPriorityEvents = filteredEvents.filter((event) => event.priority === "high")

  const getCategoryStats = () => {
    const stats = {}
    eventsData.categories.forEach((category) => {
      stats[category.id] = filteredEvents.filter((event) => event.category === category.id).length
    })
    return stats
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Card with Filters */}
      <Card variant="glass" glow className="group">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <button
                onClick={previousMonth}
                disabled={isAnimating}
                className={`p-4 hover:bg-gradient-to-r ${theme.accent} rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-xl`}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div className="text-center min-w-[250px]">
                <h2
                  className={`text-5xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-2`}
                >
                  {currentDate.format("MMMM")}
                </h2>
                <p className="text-xl text-muted-foreground font-medium">{currentDate.format("YYYY")}</p>
              </div>
              <button
                onClick={nextMonth}
                disabled={isAnimating}
                className={`p-4 hover:bg-gradient-to-r ${theme.accent} rounded-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 shadow-lg hover:shadow-xl`}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Filters */}
              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {eventsData.categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    {eventsData.priorities.map((priority) => (
                      <SelectItem key={priority.id} value={priority.id}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                          <span>{priority.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => setIsEventDialogOpen(true)}
                className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3 text-lg`}
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Events"
          value={filteredEvents.length}
          trend={filteredEvents.length > 0 ? 12 : 0}
          className="transform hover:scale-105 transition-all duration-300"
        />
        <StatCard
          label="This Month"
          value={monthlyEvents.length}
          trend={monthlyEvents.length > 0 ? 8 : 0}
          className="transform hover:scale-105 transition-all duration-300"
        />
        <StatCard
          label="Today"
          value={todayEvents.length}
          trend={todayEvents.length > 0 ? 5 : 0}
          className="transform hover:scale-105 transition-all duration-300"
        />
        <StatCard
          label="High Priority"
          value={highPriorityEvents.length}
          trend={highPriorityEvents.length > 0 ? 15 : 0}
          className="transform hover:scale-105 transition-all duration-300"
        />
      </div>

      

      {/* Calendar Grid Card */}
      <Card
        variant="elevated"
        className={`calendar-container ${isAnimating ? `animating-${animationDirection}` : ""} overflow-hidden group`}
      >
        {/* Day Headers */}
        <CardHeader variant="accent" className="p-0">
          <div className="grid grid-cols-7">
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
              <div
                key={day}
                className="p-6 text-center font-bold text-sm bg-gradient-to-br from-blue-50/80 to-purple-50/60"
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="calendar-grid grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="h-36 border-r border-b border-gray-100 bg-gradient-to-br from-gray-50/30 to-gray-100/20"
              />
            ))}

            {/* Days of the month */}
            {daysInMonth.map((_, index) => {
              const date = currentDate.date(index + 1)
              const isToday = date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
              const dateEvents = getEventsForDate(date)
              const isWeekend = date.day() === 0 || date.day() === 6

              return (
                <div
                  key={index}
                  className={`calendar-day h-36 border-r border-b border-gray-100 p-3 transition-all duration-300 cursor-pointer group/day relative overflow-hidden ${
                    isToday
                      ? `bg-gradient-to-br ${theme.primary} text-white shadow-xl`
                      : isWeekend
                        ? "bg-gradient-to-br from-gray-50/50 to-gray-100/30 hover:from-gray-100/60 hover:to-gray-200/40"
                        : "bg-gradient-to-br from-white to-gray-50/30 hover:from-blue-50/40 hover:to-purple-50/30"
                  }`}
                >
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="currentColor" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                    </svg>
                  </div>

                  <div
                    className={`text-right text-sm font-bold mb-2 transition-all duration-300 relative z-10 ${
                      isToday ? "text-white" : "text-muted-foreground group-hover/day:text-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="space-y-1 overflow-hidden relative z-10">
                    {dateEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`text-xs p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${event.color} text-white truncate transform backdrop-blur-sm relative group/event`}
                        title={`${event.title} - ${event.time} (${event.category})`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate flex-1">{event.title}</span>
                          {event.priority === "high" && (
                            <div className="w-2 h-2 bg-red-400 rounded-full ml-1 animate-pulse" />
                          )}
                        </div>
                        <div className="text-xs opacity-75">{event.time}</div>
                      </div>
                    ))}
                    {dateEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground font-medium bg-white/80 rounded px-2 py-1">
                        +{dateEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Category Overview */}
      <Card variant="elevated" className="group">
        <CardHeader variant="accent">
          <CardTitle className="text-2xl flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6" />
            <span>Event Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {eventsData.categories.map((category) => {
              const count = getCategoryStats()[category.id] || 0
              return (
                <div
                  key={category.id}
                  className="text-center p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-lg border border-gray-200/50 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-full ${category.color} mx-auto mb-2`} />
                  <div className="font-semibold text-sm text-gray-900">{category.name}</div>
                  <div className="text-2xl font-bold text-gray-700">{count}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EventDialog
        open={isEventDialogOpen}
        onOpenChange={setIsEventDialogOpen}
        onAddEvent={handleAddEvent}
        categories={eventsData.categories}
        priorities={eventsData.priorities}
      />

      <EventDetailsDialog
        event={selectedEvent}
        open={isEventDetailsOpen}
        onOpenChange={setIsEventDetailsOpen}
        onDelete={handleDeleteEvent}
        categories={eventsData.categories}
        priorities={eventsData.priorities}
      />
    </div>
  )
}
