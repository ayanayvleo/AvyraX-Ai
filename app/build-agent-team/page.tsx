"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Zap, Users, Target, Sparkles, CheckCircle2, TrendingUp } from "lucide-react"
import { useState } from "react"
import { ServiceInquiryModal } from "@/components/service-inquiry-modal"
import { AgentDemoModal } from "@/components/agent-demo-modal"

export default function BuildAgentTeamPage() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="fixed inset-0 hexagon-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-600/5" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float neon-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float-delayed neon-glow-purple" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 animate-fade-in-up glow-border backdrop-blur-sm">
              <Bot className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400 font-medium tracking-wide">AI AGENT WORKFORCE</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-balance animate-fade-in-up block">Build Your </span>
              <span className="holographic-text animate-fade-in-up animation-delay-200 block text-6xl md:text-8xl font-black tracking-tight">
                AI Agent Team
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Scale your company with specialized AI agents that work 24/7. From marketing to operations, we build
              custom AI teams tailored to your business needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                onClick={() => setServiceModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold text-lg px-8 h-12 hover:scale-105 transition-transform"
              >
                Start Building Your Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => setDemoModalOpen(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold text-lg px-8 h-12 hover:scale-105 transition-transform"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Try Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setServiceModalOpen(true)}
                className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-12 bg-transparent hover:scale-105 transition-transform"
              >
                View Agent Capabilities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI Agents Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900/50 relative">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Why Build an <span className="holographic-text">AI Agent Team</span>?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Transform your operations with intelligent agents that never sleep, never quit, and continuously improve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur hover:border-cyan-500/40 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">10x Faster</h3>
                <p className="text-slate-300 leading-relaxed">
                  AI agents complete tasks in minutes that would take humans hours or days
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur hover:border-purple-500/40 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">80% Cost Savings</h3>
                <p className="text-slate-300 leading-relaxed">
                  Reduce operational costs while increasing output and quality
                </p>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur hover:border-cyan-500/40 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">24/7 Availability</h3>
                <p className="text-slate-300 leading-relaxed">
                  Your AI team works around the clock without breaks or downtime
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur hover:border-purple-500/40 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zero Errors</h3>
                <p className="text-slate-300 leading-relaxed">
                  Consistent, accurate results every time with continuous learning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Agent Types Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Specialized <span className="gradient-text-cyan-purple">AI Agents</span> for Every Role
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We build custom AI agents tailored to your specific business needs and workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Bot className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Content Creation Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Generates blog posts, social media content, email campaigns, and marketing copy at scale
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>SEO-optimized content</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Brand voice consistency</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Multi-platform publishing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Social Media Manager Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Manages your social presence, schedules posts, engages with followers, and analyzes performance
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Automated posting schedule</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Engagement monitoring</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Performance analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Bot className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">SEO Optimization Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Continuously optimizes your website for search engines, monitors rankings, and identifies
                  opportunities
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Keyword research & tracking</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Technical SEO audits</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Competitor analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Customer Support Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Handles customer inquiries, provides instant support, and escalates complex issues to your team
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>24/7 instant responses</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Multi-language support</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Smart escalation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Bot className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Data Analytics Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Analyzes business data, generates insights, creates reports, and identifies growth opportunities
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Automated reporting</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Predictive analytics</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>Real-time dashboards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Bot className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Sales Outreach Agent</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Identifies leads, personalizes outreach, follows up automatically, and schedules meetings
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Lead qualification</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Personalized messaging</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>Automated follow-ups</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How We Build Your <span className="gradient-text-cyan-purple">AI Agent Team</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A proven process to deploy your custom AI workforce in weeks, not months
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 mx-auto mb-6 border-2 border-cyan-500/40">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Discovery</h3>
              <p className="text-slate-400 leading-relaxed">
                We analyze your workflows, identify automation opportunities, and design your ideal AI team structure
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 mx-auto mb-6 border-2 border-purple-500/40">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Development</h3>
              <p className="text-slate-400 leading-relaxed">
                Our team builds and trains custom AI agents tailored to your specific business needs and brand voice
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 mx-auto mb-6 border-2 border-cyan-500/40">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Integration</h3>
              <p className="text-slate-400 leading-relaxed">
                We seamlessly integrate your AI agents with existing tools, platforms, and workflows
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 mx-auto mb-6 border-2 border-purple-500/40">
                <span className="text-2xl font-bold text-purple-400">4</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimization</h3>
              <p className="text-slate-400 leading-relaxed">
                Continuous monitoring, learning, and improvement to maximize performance and ROI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-purple-600/10 backdrop-blur overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 animate-pulse-slow" />
            <CardContent className="p-12 text-center relative z-10">
              <Sparkles className="h-16 w-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to Build Your AI Agent Team?</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Join forward-thinking companies already scaling with AI. Book a free consultation to discover how AI
                agents can transform your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setServiceModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold text-lg px-8 h-12 hover:scale-105 transition-transform"
                >
                  Start Building Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setServiceModalOpen(true)}
                  className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-12 bg-transparent hover:scale-105 transition-transform"
                >
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      <ServiceInquiryModal open={serviceModalOpen} onOpenChange={setServiceModalOpen} />
      <AgentDemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    </div>
  )
}
