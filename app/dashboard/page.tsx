import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, FileText, TrendingUp, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for demo
  const profile = { full_name: "Demo User" }
  const agentsCount = 3
  const contentCount = 12
  const totalEngagement = 4250

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name || "there"}!
          </h1>
          <p className="text-slate-400">Here's what's happening with your AI agents today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{agentsCount}</div>
              <p className="text-xs text-slate-400 mt-1">AI agents working for you</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Content Created</CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{contentCount}</div>
              <p className="text-xs text-slate-400 mt-1">Pieces of content generated</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalEngagement.toLocaleString()}</div>
              <p className="text-xs text-slate-400 mt-1">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Time Saved</CardTitle>
              <Zap className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{agentsCount * 8}h</div>
              <p className="text-xs text-slate-400 mt-1">Estimated this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-white">Add More Agents</CardTitle>
              <CardDescription className="text-slate-400">
                Explore our marketplace and add specialized AI agents to your workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/agents">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
                  Browse Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-transparent backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl text-white">Create Content</CardTitle>
              <CardDescription className="text-slate-400">
                Use your AI agents to generate high-quality marketing content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/content">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
                  Go to Content Library
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white">Getting Started</CardTitle>
            <CardDescription className="text-slate-400">
              Follow these steps to start automating your marketing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Add Your First Agent</h4>
                <p className="text-sm text-slate-400">
                  Browse the marketplace and add an AI agent that fits your needs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Configure Your Agent</h4>
                <p className="text-sm text-slate-400">Set up your agent's settings and preferences</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-white font-medium mb-1">Start Creating</h4>
                <p className="text-sm text-slate-400">Let your AI agents automate your marketing tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
