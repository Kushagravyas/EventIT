"use client"

import { createContext, useContext, useState } from "react"
import { useTheme } from "../theme-provider"

const ToastContext = createContext({})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const { theme } = useTheme()

  const toast = ({ title, description }) => {
    const id = Date.now()
    const newToast = { id, title, description }

    setToasts((currentToasts) => [...currentToasts, newToast])

    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-gradient-to-r ${theme.card} backdrop-blur-md rounded-lg shadow-2xl p-4 max-w-sm border border-white/20 animate-slide-up transform transition-all duration-300`}
          >
            <h4 className="font-semibold text-foreground">{toast.title}</h4>
            {toast.description && <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
