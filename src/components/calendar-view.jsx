"use client"

import { useState } from "react"
import { Navigation } from "./navigation"
import { CalendarComponent } from "./calendar-components"
import { AboutSection } from "./about-section"
import { ContactSection } from "./contact-section"
import { Footer } from "./footer"
import { useTheme } from "./theme-provider"

export function CalendarView() {
  const [activeSection, setActiveSection] = useState("calendar")
  const { theme } = useTheme()

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <CalendarComponent />
      case "about":
        return <AboutSection />
      case "contact":
        return <ContactSection />
      default:
        return <CalendarComponent />
    }
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br ${theme.background}`}>
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 container mx-auto px-4 py-8">{renderContent()}</main>
      <Footer />
    </div>
  )
}
