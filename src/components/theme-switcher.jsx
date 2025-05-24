"use client"

import { Palette } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, themeName, setTheme, themes } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Palette className="h-4 w-4 text-muted-foreground" />
      <Select value={themeName} onValueChange={setTheme}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(themes).map(([key, themeData]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${themeData.primary}`} />
                <span>{themeData.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
