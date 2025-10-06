"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Checkout from "@/components/checkout"

export default function PricingPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 mb-8">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Choose the <span className="gradient-text-cyan-purple">perfect plan</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Start free, scale as you grow. All plans include a 14-day free trial.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className={`border-slate-800/50 bg-slate-900/50 backdrop-blur relative ${
                  product.popular ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10" : ""
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0 px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl text-white mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-slate-400 mb-6">{product.description}</CardDescription>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-white">${product.priceInCents / 100}</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => setSelectedProduct(product.id)}
                    className={
                      product.popular
                        ? "w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
                        : "w-full border-slate-700 text-white hover:bg-slate-800 bg-transparent"
                    }
                    variant={product.popular ? "default" : "outline"}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Can I change plans later?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                    billing cycle.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg text-white">What payment methods do you accept?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    We accept all major credit cards, debit cards, and digital payment methods through Stripe.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Is there a free trial?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Yes! All plans come with a 14-day free trial. No credit card required to start.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Can I cancel anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Absolutely. You can cancel your subscription at any time with no cancellation fees.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Checkout Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl border-slate-800/50 bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Your Subscription</DialogTitle>
          </DialogHeader>
          {selectedProduct && <Checkout productId={selectedProduct} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
