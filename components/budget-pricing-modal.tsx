"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface BudgetPricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const budgetRanges = [
  { id: "under-5k", label: "Under $5,000", letter: "A" },
  { id: "5k-15k", label: "$5,000 - $15,000", letter: "B" },
  { id: "15k-30k", label: "$15,000 - $30,000", letter: "C" },
  { id: "30k-50k", label: "$30,000 - $50,000", letter: "D" },
  { id: "50k-100k", label: "$50,000 - $100,000", letter: "E" },
  { id: "100k-plus", label: "$100,000+", letter: "F" },
  { id: "not-sure", label: "Not sure yet", letter: "G" },
]

export function BudgetPricingModal({ open, onOpenChange }: BudgetPricingModalProps) {
  const [showFeeModal, setShowFeeModal] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<string>("")

  const handleBudgetSelect = (budgetId: string) => {
    setSelectedBudget(budgetId)
    setShowFeeModal(true)
  }

  const handleFeeAccept = () => {
    setShowFeeModal(false)
    setShowCalendly(true)
  }

  const handleClose = () => {
    setShowFeeModal(false)
    setShowCalendly(false)
    setSelectedBudget("")
    onOpenChange(false)
  }

  return (
    <>
      {/* Budget Selection Modal */}
      <Dialog open={open && !showFeeModal && !showCalendly} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-800 p-0 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />

          <div className="p-8">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">What's your budget range?</h2>
                <p className="text-slate-400">Select your investment level to get started</p>
              </div>

              <div className="space-y-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => handleBudgetSelect(budget.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-700 hover:border-cyan-500 bg-slate-800/50 hover:bg-cyan-500/10 transition-all group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-slate-600 group-hover:border-cyan-500 text-sm font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {budget.letter}
                    </div>
                    <span className="text-white font-medium">{budget.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Consultation Fee Modal */}
      <Dialog open={showFeeModal} onOpenChange={() => setShowFeeModal(false)}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 p-0 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />

          <div className="p-8">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6 text-center animate-fade-in-up">
              <div className="mx-auto w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Consultation Fee</h2>
                <p className="text-slate-400">
                  There is a <span className="text-cyan-400 font-semibold">$25 consultation fee</span> to schedule a
                  call with our team. This ensures we can provide you with dedicated time and attention.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowFeeModal(false)}
                  variant="outline"
                  className="flex-1 border-slate-700 text-white py-6 bg-transparent hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFeeAccept}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-6"
                >
                  Accept & Continue
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Calendly Modal */}
      <Dialog open={showCalendly} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl bg-slate-900 border-slate-800 p-0 overflow-hidden h-[80vh]">
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-purple-600" />

          <div className="relative h-full">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="h-full p-8">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">Schedule Your Consultation</h2>
                <p className="text-slate-400">Choose a time that works best for you</p>
              </div>

              {/* Calendly Embed */}
              <div className="h-[calc(100%-80px)] bg-white rounded-lg overflow-hidden">
                <iframe
                  src="https://calendly.com/ayvarxai/consultation"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule Consultation"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
