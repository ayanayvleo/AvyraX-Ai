"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, Video } from "lucide-react"
import { BudgetPricingModal } from "@/components/budget-pricing-modal"

export default function ConsultationPage() {
  const [budgetModalOpen, setBudgetModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Book a <span className="gradient-text-cyan-purple">Free Consultation</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Schedule a personalized demo with our team to see how AvyraXAi can transform your marketing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Consultation Form */}
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Schedule Your Demo</CardTitle>
                <CardDescription className="text-slate-400">
                  Fill out the form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-slate-300">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-slate-300">
                      Work Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company" className="text-slate-300">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your Company"
                      className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="teamSize" className="text-slate-300">
                      Team Size
                    </Label>
                    <Input
                      id="teamSize"
                      type="text"
                      placeholder="1-10, 11-50, 51-200, etc."
                      className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message" className="text-slate-300">
                      Tell us about your needs
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="What are your marketing challenges?"
                      rows={4}
                      className="border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => setBudgetModalOpen(true)}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
                  >
                    Request Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <div className="space-y-6">
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl text-white">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 flex-shrink-0">
                      <Calendar className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Flexible Scheduling</h4>
                      <p className="text-sm text-slate-400">
                        Choose a time that works best for you. We'll send a calendar invite with all the details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 flex-shrink-0">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">30-Minute Session</h4>
                      <p className="text-sm text-slate-400">
                        A focused demo tailored to your specific marketing needs and challenges.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 flex-shrink-0">
                      <Video className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Live Demo</h4>
                      <p className="text-sm text-slate-400">
                        See AvyraXAi in action with real examples and use cases relevant to your business.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Questions?</h3>
                  <p className="text-sm text-slate-300 mb-4">
                    Our team is here to help. Reach out anytime at{" "}
                    <a href="mailto:hello@avyraxai.com" className="text-cyan-400 hover:text-cyan-300">
                      hello@avyraxai.com
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BudgetPricingModal open={budgetModalOpen} onOpenChange={setBudgetModalOpen} />
    </div>
  )
}
