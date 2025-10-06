import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { mockAgents } from "@/lib/mock-agents"

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: agent, error } = await supabase.from("agents").select("*").eq("id", params.id).single()

  let agentData = agent

  if (error || !agent) {
    // Fallback to mock data if database is not configured
    agentData = mockAgents.find((a) => a.id === params.id)
    if (!agentData) {
      notFound()
    }
  }

  const isProjectBased = agentData.pricing_model === "project" || agentData.pricing_model === "retainer"

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Button asChild variant="ghost" className="mb-6 text-slate-400 hover:text-white">
            <Link href="/agents">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-4xl">
                {agentData.icon || "✨"}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{agentData.name}</h1>
                <p className="text-lg text-slate-400">{agentData.description}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
                <Sparkles className="mr-2 h-4 w-4" />
                Select This Agent
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              >
                <Link href="/consultation">Request Customization</Link>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* What It Does */}
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">📋 What It Does</h2>
                <p className="text-slate-300 mb-4">
                  The {agentData.name} is designed to streamline your workflow by automating complex tasks and providing
                  intelligent insights. This agent integrates seamlessly with your existing tools and processes.
                </p>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">⚡ Key Features</h2>
                <div className="grid gap-3">
                  {agentData.capabilities.map((capability: string) => (
                    <div key={capability} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best For */}
            {agentData.best_for && agentData.best_for.length > 0 && (
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">💡 Best For</h2>
                  <ul className="space-y-2">
                    {agentData.best_for.map((item: string) => (
                      <li key={item} className="text-slate-300 flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Typical Output */}
            {agentData.typical_output && (
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">📊 Typical Output</h2>
                  <p className="text-slate-300">{agentData.typical_output}</p>
                </CardContent>
              </Card>
            )}

            {/* Setup Process */}
            {agentData.setup_process && agentData.setup_process.length > 0 && (
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">🎯 Setup Process</h2>
                  <ol className="space-y-3">
                    {agentData.setup_process.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 flex-shrink-0">
                          {index + 1}
                        </Badge>
                        <span className="text-slate-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {/* Pricing */}
            <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">💰 Pricing</h2>
                <p className="text-slate-300 text-lg">
                  {agentData.pricing_details || "Contact us for pricing details"}
                </p>
                {agentData.pricing_model === "addon" && (
                  <p className="text-slate-400 text-sm mt-2">Can be added to any existing plan</p>
                )}
              </CardContent>
            </Card>

            {/* Success Stories */}
            {agentData.success_stories && agentData.success_stories.length > 0 && (
              <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-white mb-4">📈 Success Stories</h2>
                  <div className="space-y-4">
                    {agentData.success_stories.map((story: { quote: string; author: string }, index: number) => (
                      <div key={index} className="border-l-2 border-cyan-500 pl-4">
                        <p className="text-slate-300 italic mb-2">&ldquo;{story.quote}&rdquo;</p>
                        <p className="text-slate-400 text-sm">- {story.author}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center space-y-3">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
              <Sparkles className="mr-2 h-4 w-4" />
              Select This Agent
            </Button>
            <p className="text-slate-400 text-sm">
              Need customization?{" "}
              <Link href="/consultation" className="text-cyan-400 hover:text-cyan-300 underline">
                Talk to our team
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
