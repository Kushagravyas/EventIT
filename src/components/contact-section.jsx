"use client"

import { useState } from "react"
import { InfoCard, Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react"
import { useToast } from "./hooks/use-toast"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Kushagravyas1122@gmail.com",
      description: "Send us an email anytime",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8890752011",
      description: "Call us during business hours",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Manhattan, Prideworld City, Lohgaon Pune",
      description: "Visit our office",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Have questions or feedback? We'd love to hear from you. Get in touch with our team and we'll respond as soon
          as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-8">
          <Card variant="glass" glow className="group">
            <CardHeader variant="accent">
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Send className="h-6 w-6" />
                <span>Get in Touch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-semibold">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-white to-gray-50/50 border-gray-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-white to-gray-50/50 border-gray-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-semibold">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="What's this about?"
                    required
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-white to-gray-50/50 border-gray-200 focus:border-blue-400 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-semibold">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us more..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-white to-gray-50/50 border-gray-200 focus:border-blue-400 transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-3 text-lg"
                  disabled={isSubmitting}
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card variant="elevated" className="group">
            <CardHeader variant="highlight">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="flex items-start space-x-4 group/item">
                    <div
                      className={`p-3 bg-gradient-to-r ${info.color} rounded-xl shadow-lg group-hover/item:shadow-xl transition-all duration-300 group-hover/item:scale-110`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{info.title}</h3>
                      <p className="text-sm font-mono bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent font-medium">
                        {info.value}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <InfoCard title="Business Hours" variant="info" className="group">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Operating Hours</span>
              </div>
              <div className="space-y-3">
                {[
                  { days: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                  { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
                  { days: "Sunday", hours: "Closed" },
                ].map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50/50 to-purple-50/30 rounded-lg border border-blue-100/50"
                  >
                    <span className="font-medium text-gray-700">{schedule.days}</span>
                    <span className="text-gray-600 font-mono text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  )
}
