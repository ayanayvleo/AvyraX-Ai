"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Code,
  Smartphone,
  Globe,
  Megaphone,
  Search,
  PenTool,
  Bot,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { ServiceInquiryModal } from "@/components/service-inquiry-modal"
import { useState } from "react"

export default function HomePage() {
  const [serviceModalOpen, setServiceModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="fixed inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="fixed inset-0 hexagon-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <Navigation />

      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-600/5" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float neon-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float-delayed neon-glow-purple" />

        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line-effect pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-8 animate-fade-in-up glow-border backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-sm text-cyan-400 font-medium tracking-wide">FULL-SERVICE MARKETING AGENCY</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-balance animate-fade-in-up block">Transform Your Company with </span>
              <span className="holographic-text animate-fade-in-up animation-delay-200 block text-6xl md:text-8xl font-black tracking-tight">
                AyvarXAi
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              From AI agents to full-stack development and marketing strategy—we're your all-in-one growth partner.
              Scale faster, build smarter, market better.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                onClick={() => setServiceModalOpen(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold text-lg px-8 h-12 hover:scale-105 transition-transform"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setServiceModalOpen(true)}
                className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-12 bg-transparent hover:scale-105 transition-transform"
              >
                Explore Services
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
              <div className="hover:scale-110 transition-transform group">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:neon-glow transition-all">
                  50+
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">AI Agents</div>
              </div>
              <div className="hover:scale-110 transition-transform group">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:neon-glow-purple transition-all">
                  100+
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Projects Delivered</div>
              </div>
              <div className="hover:scale-110 transition-transform group">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2 group-hover:neon-glow transition-all">
                  10x
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">ROI Average</div>
              </div>
              <div className="hover:scale-110 transition-transform group">
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:neon-glow-purple transition-all">
                  24/7
                </div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 lg:px-8 bg-slate-900/50 relative data-stream">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Everything Your Business Needs to <span className="holographic-text">Dominate</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Three powerful service pillars working together to accelerate your growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent backdrop-blur hover:border-cyan-500/40 transition-all group glow-border">
              <CardContent className="p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/20 mb-6 group-hover:scale-110 transition-transform group-hover:neon-glow">
                  <Bot className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">AI Agents</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Deploy specialized AI agents to automate content creation, social media, analytics, SEO, and more.
                  Scale your marketing without scaling your team.
                </p>
                <Link href="/agents">
                  <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 p-0 h-auto">
                    Explore Agents <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-transparent backdrop-blur hover:border-purple-500/40 transition-all group glow-border">
              <CardContent className="p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-purple-500/20 mb-6 group-hover:scale-110 transition-transform group-hover:neon-glow-purple">
                  <Megaphone className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Marketing Services</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Full-service marketing from strategy to execution. SEO, content marketing, paid ads, social media
                  management, and brand development.
                </p>
                <Link href="/services/marketing">
                  <Button
                    variant="ghost"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0 h-auto"
                  >
                    View Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent backdrop-blur hover:border-cyan-500/40 transition-all group glow-border">
              <CardContent className="p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-500/20 mb-6 group-hover:scale-110 transition-transform group-hover:neon-glow">
                  <Code className="h-8 w-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Software Development</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Custom web apps, mobile applications, and enterprise software. From MVP to scale, we build products
                  that users love.
                </p>
                <Link href="/services/development">
                  <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 p-0 h-auto">
                    Start Building <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Capabilities That <span className="gradient-text-cyan-purple">Drive Results</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Comprehensive solutions across AI, marketing, and development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Zap className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Automation</h3>
                <p className="text-slate-400 leading-relaxed">
                  Automate repetitive tasks with intelligent AI agents that learn and adapt to your workflow.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Web Development</h3>
                <p className="text-slate-400 leading-relaxed">
                  Modern, responsive websites and web applications built with cutting-edge technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <Smartphone className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Mobile Apps</h3>
                <p className="text-slate-400 leading-relaxed">
                  Native and cross-platform mobile applications that deliver exceptional user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <Search className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">SEO & Growth</h3>
                <p className="text-slate-400 leading-relaxed">
                  Data-driven SEO strategies that increase organic traffic and drive sustainable growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 mb-4">
                  <PenTool className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Content Strategy</h3>
                <p className="text-slate-400 leading-relaxed">
                  Compelling content that resonates with your audience and drives conversions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-purple-500/30 transition-all hover:scale-105">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Analytics & Insights</h3>
                <p className="text-slate-400 leading-relaxed">
                  Deep analytics and actionable insights to optimize performance and maximize ROI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Simple Process, <span className="gradient-text-cyan-purple">Powerful Results</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From consultation to deployment, we make transformation effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 mx-auto mb-6 border-2 border-cyan-500/40">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Consultation</h3>
              <p className="text-slate-400 leading-relaxed">
                We learn about your business, goals, and challenges to create a custom strategy.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 mx-auto mb-6 border-2 border-purple-500/40">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Build & Deploy</h3>
              <p className="text-slate-400 leading-relaxed">
                Our team builds your solution with precision, keeping you updated every step of the way.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 mx-auto mb-6 border-2 border-cyan-500/40">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Scale & Optimize</h3>
              <p className="text-slate-400 leading-relaxed">
                We monitor, optimize, and scale your solution to ensure continuous growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-purple-600/10 backdrop-blur overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 animate-pulse-slow" />
            <CardContent className="p-12 text-center relative z-10">
              <Rocket className="h-16 w-16 text-cyan-400 mx-auto mb-6 animate-bounce-slow" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Company?</h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Join innovative companies already using AyvarXAi to scale faster and smarter
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => setServiceModalOpen(true)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold text-lg px-8 h-12 hover:scale-105 transition-transform"
                >
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setServiceModalOpen(true)}
                  className="border-slate-700 text-white hover:bg-slate-800 text-lg px-8 h-12 bg-transparent hover:scale-105 transition-transform"
                >
                  Explore AI Agents
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />

      <ServiceInquiryModal open={serviceModalOpen} onOpenChange={setServiceModalOpen} />
    </div>
  )
}
