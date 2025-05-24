"use client"

import { createContext, useContext, useState, useEffect } from "react"

const themes = {
  default: {
    name: "Ocean Blue",
    primary: "from-blue-600 to-blue-800",
    secondary: "from-blue-50 to-blue-100",
    accent: "from-blue-100 to-blue-200",
    background: "from-slate-50 to-white",
    card: "from-white to-blue-50/30",
    eventModal: "from-blue-600 to-purple-700",
    colors: {
      primary: "rgb(37 99 235)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(241 245 249)",
      accent: "rgb(226 232 240)",
    },
  },
  sunset: {
    name: "Sunset Orange",
    primary: "from-orange-500 to-red-600",
    secondary: "from-orange-50 to-red-50",
    accent: "from-orange-100 to-red-100",
    background: "from-orange-50 to-yellow-50",
    card: "from-white to-orange-50/30",
    eventModal: "from-orange-500 to-pink-600",
    colors: {
      primary: "rgb(249 115 22)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(255 247 237)",
      accent: "rgb(254 215 170)",
    },
  },
  forest: {
    name: "Forest Green",
    primary: "from-green-600 to-emerald-700",
    secondary: "from-green-50 to-emerald-50",
    accent: "from-green-100 to-emerald-100",
    background: "from-green-50 to-teal-50",
    card: "from-white to-green-50/30",
    eventModal: "from-green-600 to-teal-700",
    colors: {
      primary: "rgb(22 163 74)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(240 253 244)",
      accent: "rgb(187 247 208)",
    },
  },
  purple: {
    name: "Royal Purple",
    primary: "from-purple-600 to-violet-700",
    secondary: "from-purple-50 to-violet-50",
    accent: "from-purple-100 to-violet-100",
    background: "from-purple-50 to-pink-50",
    card: "from-white to-purple-50/30",
    eventModal: "from-purple-600 to-indigo-700",
    colors: {
      primary: "rgb(147 51 234)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(250 245 255)",
      accent: "rgb(221 214 254)",
    },
  },
  dark: {
    name: "Dark Mode",
    primary: "from-gray-800 to-gray-900",
    secondary: "from-gray-100 to-gray-200",
    accent: "from-gray-200 to-gray-300",
    background: "from-gray-900 to-gray-800",
    card: "from-gray-800 to-gray-700",
    eventModal: "from-gray-700 to-gray-900",
    colors: {
      primary: "rgb(31 41 55)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(243 244 246)",
      accent: "rgb(209 213 219)",
    },
  },
}

const ThemeContext = createContext({
  theme: themes.default,
  themeName: "default",
  setTheme: () => {},
  themes,
})

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("default")

  useEffect(() => {
    const savedTheme = localStorage.getItem("calendar-theme")
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      localStorage.setItem("calendar-theme", themeName)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[currentTheme],
        themeName: currentTheme,
        setTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
