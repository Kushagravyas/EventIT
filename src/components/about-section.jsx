import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Zap, Shield } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Calendar,
      title: "Intuitive Calendar",
      description: "Easy-to-use calendar interface with month navigation and comprehensive event management.",
    },
    {
      icon: Users,
      title: "Event Management",
      description: "Create, view, edit, and organize events with detailed information and color coding.",
    },
    {
      icon: Zap,
      title: "Responsive Design",
      description: "Fully responsive design that works seamlessly across all devices and screen sizes.",
    },
    {
      icon: Shield,
      title: "Modern Technology",
      description: "Built with React, modern web technologies, and best practices for optimal performance.",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About CalendarApp</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern, user-friendly calendar application designed to help you manage your events and schedule efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We believe that effective time management is crucial for productivity and success. Our calendar application
            is designed with simplicity and functionality in mind, providing users with all the tools they need to
            organize their schedule without unnecessary complexity.
          </p>
          <p className="text-muted-foreground">
            Built using modern web technologies including React, Vite, and Tailwind CSS, our application offers a
            smooth, responsive experience across all devices. Whether you're planning your day, week, or month,
            CalendarApp makes it easy to stay organized and on top of your commitments.
          </p>
          <p className="text-muted-foreground">
            Our commitment to user experience drives every feature we develop. From intuitive event creation to
            comprehensive calendar views, we ensure that managing your schedule is both efficient and enjoyable.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
