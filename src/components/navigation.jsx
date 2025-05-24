"use client"

import { useState } from "react"
import { Calendar, Info, Mail, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { ThemeSwitcher } from "./theme-switcher"
import { useTheme } from "./theme-provider"

const navigationItems = [
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "about", label: "About", icon: Info },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Navigation({ activeSection = "calendar", onSectionChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  const handleSectionClick = (sectionId) => {
    onSectionChange?.(sectionId)
    setIsOpen(false)
  }

  return (
    <nav
      className={`border-b border-white/20 bg-gradient-to-r ${theme.card} backdrop-blur-md supports-[backdrop-filter]:bg-opacity-80 sticky top-0 z-50 shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary}`}>
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              CalendarApp
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionClick(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                      : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
            <div className="ml-4">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={`w-64 bg-gradient-to-br ${theme.card} border-white/20`}>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSectionClick(item.id)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          activeSection === item.id
                            ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                            : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
