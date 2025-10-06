"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ServiceInquiryModal } from "./service-inquiry-modal"
import { BudgetPricingModal } from "./budget-pricing-modal"
import Image from "next/image"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [budgetModalOpen, setBudgetModalOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="AvyvarXAi" width={400} height={100} className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <button
                onClick={() => setServiceModalOpen(true)}
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Services
              </button>
              <Link href="/#how-it-works" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
                How It Works
              </Link>
              <button
                onClick={() => setBudgetModalOpen(true)}
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                Pricing
              </button>
              <Link href="/consultation" className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
                Book Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800/50">
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setServiceModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Services
                </button>
                <Link
                  href="/#how-it-works"
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <button
                  onClick={() => {
                    setBudgetModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors text-left"
                >
                  Pricing
                </button>
                <Link
                  href="/consultation"
                  className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Service Inquiry Modal */}
      <ServiceInquiryModal open={serviceModalOpen} onOpenChange={setServiceModalOpen} />

      <BudgetPricingModal open={budgetModalOpen} onOpenChange={setBudgetModalOpen} />
    </>
  )
}
