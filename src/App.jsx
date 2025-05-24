import { CalendarView } from "./components/calendar-view"
import { ToastProvider } from "./components/hooks/use-toast"
import { ThemeProvider } from "./components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <CalendarView />
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}
