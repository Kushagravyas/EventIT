import { cn } from "@/lib/utils"

function Card({ className, variant = "default", pattern = false, glow = false, ...props }) {
  const variants = {
    default: "bg-gradient-to-br from-white via-white to-gray-50/50",
    glass: "bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl",
    elevated: "bg-gradient-to-br from-white via-gray-50/30 to-gray-100/50 shadow-xl",
    gradient: "bg-gradient-to-br from-blue-50/80 via-white to-purple-50/60",
    warm: "bg-gradient-to-br from-orange-50/60 via-white to-red-50/40",
    cool: "bg-gradient-to-br from-blue-50/60 via-white to-cyan-50/40",
    nature: "bg-gradient-to-br from-green-50/60 via-white to-emerald-50/40",
    luxury: "bg-gradient-to-br from-purple-50/60 via-white to-pink-50/40",
  }

  const patternOverlay = pattern ? (
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
          </pattern>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  ) : null

  const glowEffect = glow ? (
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
  ) : null

  return (
    <div className="relative group">
      {glowEffect}
      <div
        data-slot="card"
        className={cn(
          "relative overflow-hidden text-card-foreground flex flex-col gap-6 rounded-xl border border-white/60 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-white/80",
          variants[variant],
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:pointer-events-none",
          "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/[0.02] after:via-transparent after:to-white/[0.05] after:pointer-events-none",
          className,
        )}
        {...props}
      >
        {patternOverlay}
        <div className="relative z-10 flex flex-col gap-6 p-6">{props.children}</div>
      </div>
    </div>
  )
}

function CardHeader({ className, variant = "default", ...props }) {
  const variants = {
    default: "",
    accent: "bg-gradient-to-r from-blue-50/50 to-purple-50/50 -mx-6 -mt-6 mb-2 px-6 pt-6 pb-4",
    highlight:
      "bg-gradient-to-r from-orange-50/50 to-red-50/50 -mx-6 -mt-6 mb-2 px-6 pt-6 pb-4 border-b border-orange-100/50",
    subtle:
      "bg-gradient-to-r from-gray-50/30 to-gray-100/20 -mx-6 -mt-6 mb-2 px-6 pt-6 pb-4 border-b border-gray-200/30",
  }

  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=card-action]:grid-cols-[1fr_auto] rounded-t-xl",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, gradient = false, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold",
        gradient && "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("relative z-10", className)} {...props} />
}

function CardFooter({ className, variant = "default", ...props }) {
  const variants = {
    default: "",
    accent:
      "bg-gradient-to-r from-blue-50/30 to-purple-50/30 -mx-6 -mb-6 mt-2 px-6 pt-4 pb-6 border-t border-blue-100/30",
    subtle:
      "bg-gradient-to-r from-gray-50/20 to-gray-100/10 -mx-6 -mb-6 mt-2 px-6 pt-4 pb-6 border-t border-gray-200/20",
  }

  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center rounded-b-xl", variants[variant], className)}
      {...props}
    />
  )
}

// Enhanced Card Variants for specific use cases
function FeatureCard({ icon: Icon, title, description, className, ...props }) {
  return (
    <Card variant="glass" pattern glow className={cn("group", className)} {...props}>
      <CardHeader variant="accent">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <CardTitle gradient className="text-xl">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function StatCard({ label, value, trend, className, ...props }) {
  return (
    <Card variant="elevated" className={cn("group hover:shadow-2xl", className)} {...props}>
      <CardContent className="text-center space-y-2">
        <CardDescription className="font-medium text-xs uppercase tracking-wider">{label}</CardDescription>
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {value}
        </div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium",
              trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-gray-600",
            )}
          >
            {trend > 0 ? "↗" : trend < 0 ? "↘" : "→"} {Math.abs(trend)}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function InfoCard({ title, children, variant = "default", className, ...props }) {
  const variants = {
    default: "cool",
    success: "nature",
    warning: "warm",
    error: "luxury",
    info: "gradient",
  }

  return (
    <Card variant={variants[variant]} pattern className={cn("", className)} {...props}>
      <CardHeader variant="subtle">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  FeatureCard,
  StatCard,
  InfoCard,
}
