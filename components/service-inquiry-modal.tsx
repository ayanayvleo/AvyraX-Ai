"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ServiceInquiryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const services = [
  { id: "ai-agents", label: "AI Agents", letter: "A" },
  { id: "marketing", label: "Marketing Services", letter: "B" },
  { id: "web-dev", label: "Web Development", letter: "C" },
  { id: "mobile-dev", label: "Mobile App Development", letter: "D" },
  { id: "custom-software", label: "Custom Software", letter: "E" },
  { id: "consulting", label: "Strategy Consulting", letter: "F" },
  { id: "other", label: "Other", letter: "G" },
]

const goals = [
  { id: "increase-revenue", label: "Increase Revenue", letter: "A" },
  { id: "automate", label: "Automate Processes", letter: "B" },
  { id: "scale", label: "Scale Operations", letter: "C" },
  { id: "new-product", label: "Launch New Product", letter: "D" },
  { id: "improve-marketing", label: "Improve Marketing", letter: "E" },
  { id: "other", label: "Other", letter: "F" },
]

const timelines = [
  { id: "asap", label: "As soon as possible", letter: "A" },
  { id: "1-month", label: "Within 1 month", letter: "B" },
  { id: "1-3-months", label: "1-3 months", letter: "C" },
  { id: "3-6-months", label: "3-6 months", letter: "D" },
  { id: "flexible", label: "Flexible timeline", letter: "E" },
]

const budgets = [
  { id: "under-10k", label: "Under $10,000", letter: "A" },
  { id: "10k-25k", label: "$10,000 - $25,000", letter: "B" },
  { id: "25k-50k", label: "$25,000 - $50,000", letter: "C" },
  { id: "50k-100k", label: "$50,000 - $100,000", letter: "D" },
  { id: "100k-plus", label: "$100,000+", letter: "E" },
  { id: "not-sure", label: "Not sure yet", letter: "F" },
]

export function ServiceInquiryModal({ open, onOpenChange }: ServiceInquiryModalProps) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedGoal, setSelectedGoal] = useState<string>("")
  const [selectedTimeline, setSelectedTimeline] = useState<string>("")
  const [selectedBudget, setSelectedBudget] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: "",
  })

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    console.log("[v0] Service inquiry submitted:", {
      services: selectedServices,
      goal: selectedGoal,
      timeline: selectedTimeline,
      budget: selectedBudget,
      ...formData,
    })
    // Reset form
    setStep(1)
    setSelectedServices([])
    setSelectedGoal("")
    setSelectedTimeline("")
    setSelectedBudget("")
    setFormData({ name: "", email: "", company: "", details: "" })
    onOpenChange(false)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedServices.length > 0
      case 2:
        return selectedGoal !== ""
      case 3:
        return selectedTimeline !== ""
      case 4:
        return selectedBudget !== ""
      case 5:
        return formData.name && formData.email
      default:
        return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 p-0 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Step 1: Services */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What services are you interested in?</h2>
                <p className="text-slate-400">Select all that apply to your needs</p>
              </div>

              <div className="space-y-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      selectedServices.includes(service.id)
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold ${
                        selectedServices.includes(service.id)
                          ? "border-cyan-500 text-cyan-400"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {service.letter}
                    </div>
                    <span className="text-white font-medium">{service.label}</span>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's your primary goal?</h2>
                <p className="text-slate-400">This helps us understand your objectives</p>
              </div>

              <div className="space-y-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      selectedGoal === goal.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold ${
                        selectedGoal === goal.id ? "border-cyan-500 text-cyan-400" : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {goal.letter}
                    </div>
                    <span className="text-white font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-slate-700 text-white py-6 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 disabled:opacity-50"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's your timeline?</h2>
                <p className="text-slate-400">When do you need this completed?</p>
              </div>

              <div className="space-y-3">
                {timelines.map((timeline) => (
                  <button
                    key={timeline.id}
                    onClick={() => setSelectedTimeline(timeline.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      selectedTimeline === timeline.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold ${
                        selectedTimeline === timeline.id
                          ? "border-cyan-500 text-cyan-400"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {timeline.letter}
                    </div>
                    <span className="text-white font-medium">{timeline.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-slate-700 text-white py-6 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 disabled:opacity-50"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's your budget range?</h2>
                <p className="text-slate-400">This helps us recommend the right solutions</p>
              </div>

              <div className="space-y-3">
                {budgets.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                      selectedBudget === budget.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-slate-700 hover:border-slate-600 bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold ${
                        selectedBudget === budget.id
                          ? "border-cyan-500 text-cyan-400"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {budget.letter}
                    </div>
                    <span className="text-white font-medium">{budget.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-slate-700 text-white py-6 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 disabled:opacity-50"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Contact Info */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Let's get in touch</h2>
                <p className="text-slate-400">We'll reach out to discuss your project</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Additional Details</label>
                  <Textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Tell us more about your project..."
                    rows={4}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 border-slate-700 text-white py-6 bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 disabled:opacity-50"
                >
                  Submit Inquiry
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
