"use client"

import { useState, useRef } from "react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { EventDialog } from "./event-dialog"
import { EventDetailsDialog } from "./event-details-dialog"
import { useTheme } from "./theme-provider"

export function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: dayjs().format("YYYY-MM-DD"),
      time: "10:00",
      duration: 60,
      description: "Weekly team sync meeting",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Project Review",
      date: dayjs().add(2, "day").format("YYYY-MM-DD"),
      time: "14:00",
      duration: 90,
      description: "Quarterly project review with stakeholders",
      color: "bg-green-500",
    },
  ])
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationDirection, setAnimationDirection] = useState("next")

  const calendarRef = useRef(null)
  const { theme } = useTheme()

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
    return events.filter((event) => dayjs(event.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD"))
  }

  const handleAddEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div
        className={`p-6 rounded-2xl bg-gradient-to-r ${theme.card} backdrop-blur-sm border border-white/20 shadow-xl`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={previousMonth}
              disabled={isAnimating}
              className={`p-3 hover:bg-gradient-to-r ${theme.accent} rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="text-center min-w-[200px]">
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                {currentDate.format("MMMM")}
              </h2>
              <p className="text-lg text-muted-foreground font-medium">{currentDate.format("YYYY")}</p>
            </div>
            <button
              onClick={nextMonth}
              disabled={isAnimating}
              className={`p-3 hover:bg-gradient-to-r ${theme.accent} rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <Button
            onClick={() => setIsEventDialogOpen(true)}
            className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        ref={calendarRef}
        className={`calendar-container ${isAnimating ? `animating-${animationDirection}` : ""} bg-gradient-to-br ${theme.card} rounded-2xl border border-white/20 shadow-2xl overflow-hidden backdrop-blur-sm`}
      >
        {/* Day Headers */}
        <div className={`grid grid-cols-7 border-b bg-gradient-to-r ${theme.secondary} backdrop-blur-sm`}>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <div key={day} className="p-4 text-center font-bold text-sm">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-grid grid grid-cols-7">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="h-32 border-r border-b border-white/10 bg-gradient-to-br from-gray-50/50 to-gray-100/30"
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
                className={`calendar-day h-32 border-r border-b border-white/10 p-2 transition-all duration-300 hover:bg-gradient-to-br ${theme.accent} cursor-pointer group ${
                  isToday ? `bg-gradient-to-br ${theme.primary} text-white shadow-lg` : ""
                } ${isWeekend ? "bg-gradient-to-br from-gray-50/30 to-gray-100/20" : ""}`}
              >
                <div
                  className={`text-right text-sm font-bold mb-2 transition-all duration-300 ${
                    isToday ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="space-y-1 overflow-hidden">
                  {dateEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`text-xs p-1.5 rounded-md cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md ${event.color} text-white truncate transform`}
                      title={`${event.title} - ${event.time}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dateEvents.length > 3 && (
                    <div className="text-xs text-muted-foreground font-medium">+{dateEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Events", value: events.length, gradient: theme.primary },
          {
            label: "This Month",
            value: events.filter((event) => dayjs(event.date).format("YYYY-MM") === currentDate.format("YYYY-MM"))
              .length,
            gradient: theme.primary,
          },
          {
            label: "Today",
            value: events.filter((event) => dayjs(event.date).format("YYYY-MM-DD") === today.format("YYYY-MM-DD"))
              .length,
            gradient: theme.primary,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${theme.card} rounded-xl border border-white/20 p-6 shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}
          >
            <h3 className="font-semibold text-sm text-muted-foreground mb-2">{stat.label}</h3>
            <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Dialogs */}
      <EventDialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen} onAddEvent={handleAddEvent} />

      <EventDetailsDialog
        event={selectedEvent}
        open={isEventDetailsOpen}
        onOpenChange={setIsEventDetailsOpen}
        onDelete={handleDeleteEvent}
      />
    </div>
  )
}
