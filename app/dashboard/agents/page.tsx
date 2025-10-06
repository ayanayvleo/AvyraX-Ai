import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Settings, Pause, Trash2, Plus } from "lucide-react"
import Link from "next/link"

export default function MyAgentsPage() {
  // Mock user agents data
  const userAgents = [
    {
      id: "1",
      status: "active" as const,
      agents: {
        name: "Blog Writer Pro",
        description: "Creates SEO-optimized blog posts and articles",
        capabilities: ["SEO Writing", "Content Research", "Keyword Optimization", "Meta Descriptions"],
      },
    },
    {
      id: "2",
      status: "active" as const,
      agents: {
        name: "Social Media Manager",
        description: "Generates engaging social media content across platforms",
        capabilities: ["Post Creation", "Hashtag Strategy", "Engagement Analysis", "Content Calendar"],
      },
    },
    {
      id: "3",
      status: "paused" as const,
      agents: {
        name: "Email Copywriter",
        description: "Crafts compelling email campaigns and newsletters",
        capabilities: ["Subject Lines", "Email Sequences", "A/B Testing", "Personalization"],
      },
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Agents</h1>
            <p className="text-slate-400">Manage your AI agents and their configurations</p>
          </div>
          <Link href="/agents">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
              <Plus className="mr-2 h-4 w-4" />
              Add Agent
            </Button>
          </Link>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAgents.map((userAgent) => {
            const agent = userAgent.agents
            return (
              <Card
                key={userAgent.id}
                className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20">
                      <Sparkles className="h-6 w-6 text-cyan-400" />
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        userAgent.status === "active"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }
                    >
                      {userAgent.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{agent.name}</CardTitle>
                  <CardDescription className="text-slate-400">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-slate-300 mb-2">Capabilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.slice(0, 2).map((capability) => (
                          <Badge
                            key={capability}
                            variant="secondary"
                            className="bg-slate-800 text-slate-300 border-slate-700"
                          >
                            {capability}
                          </Badge>
                        ))}
                        {agent.capabilities.length > 2 && (
                          <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                            +{agent.capabilities.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
