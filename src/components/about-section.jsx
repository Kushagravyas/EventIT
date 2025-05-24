import { FeatureCard, InfoCard } from "@/components/ui/card"
import { Calendar, Users, Zap, Shield, Target, Award, Lightbulb } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Calendar,
      title: "Intuitive Calendar",
      description:
        "Easy-to-use calendar interface with month navigation and comprehensive event management that adapts to your workflow.",
    },
    {
      icon: Users,
      title: "Event Management",
      description:
        "Create, view, edit, and organize events with detailed information, color coding, and smart categorization.",
    },
    {
      icon: Zap,
      title: "Responsive Design",
      description:
        "Fully responsive design that works seamlessly across all devices and screen sizes with optimized performance.",
    },
    {
      icon: Shield,
      title: "Modern Technology",
      description:
        "Built with React, modern web technologies, and best practices for optimal performance and security.",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Our Vision",
      description:
        "To revolutionize how people manage their time and organize their lives through intuitive, beautiful calendar experiences.",
    },
    {
      icon: Award,
      title: "Quality First",
      description:
        "We prioritize user experience and code quality, ensuring every feature is polished and performs flawlessly.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Constantly evolving with cutting-edge features and design patterns that set new standards in calendar applications.",
    },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          About CalendarApp
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A modern, user-friendly calendar application designed to help you manage your events and schedule efficiently
          with beautiful design and powerful features.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="transform hover:scale-105 transition-all duration-300"
          />
        ))}
      </div>

      {/* Mission Statement */}
      <InfoCard title="Our Mission" variant="info" className="max-w-4xl mx-auto">
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            We believe that effective time management is crucial for productivity and success. Our calendar application
            is designed with simplicity and functionality in mind, providing users with all the tools they need to
            organize their schedule without unnecessary complexity.
          </p>
          <p>
            Built using modern web technologies including React, Vite, and Tailwind CSS, our application offers a
            smooth, responsive experience across all devices. Whether you're planning your day, week, or month,
            CalendarApp makes it easy to stay organized and on top of your commitments.
          </p>
          <p>
            Our commitment to user experience drives every feature we develop. From intuitive event creation to
            comprehensive calendar views, we ensure that managing your schedule is both efficient and enjoyable.
          </p>
        </div>
      </InfoCard>

      {/* Values Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          What Drives Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <FeatureCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              className="h-full"
            />
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <InfoCard title="Technology Stack" variant="success" className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { name: "React", desc: "UI Framework" },
            { name: "Vite", desc: "Build Tool" },
            { name: "Tailwind", desc: "Styling" },
            { name: "Day.js", desc: "Date Library" },
          ].map((tech, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100"
            >
              <div className="font-semibold text-green-800">{tech.name}</div>
              <div className="text-sm text-green-600">{tech.desc}</div>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  )
}
