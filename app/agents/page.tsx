"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AgentCard } from "@/components/agent-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Sparkles, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Agent } from "@/lib/types"
import { useRouter } from "next/navigation"
import { mockAgents } from "@/lib/mock-agents"
import Link from "next/link"

const categories = [
  "All",
  "Content Creation",
  "Social Media",
  "Email Marketing",
  "SEO",
  "Advertising",
  "Analytics",
  "Brand Management",
  "Research",
  "Architecture",
  "Development",
  "DevOps",
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [userAgentIds, setUserAgentIds] = useState<Set<string>>(new Set())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      const { data: agentsData, error: agentsError } = await supabase
        .from("agents")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("name")

      if (agentsError) {
        console.log("[v0] Database not configured yet, using mock data")
        setAgents(mockAgents)
        setFilteredAgents(mockAgents)
      } else if (agentsData && agentsData.length > 0) {
        setAgents(agentsData)
        setFilteredAgents(agentsData)
      } else {
        console.log("[v0] Database is empty, using mock data")
        setAgents(mockAgents)
        setFilteredAgents(mockAgents)
      }

      if (user) {
        const { data: userAgentsData, error: userAgentsError } = await supabase
          .from("user_agents")
          .select("agent_id")
          .eq("user_id", user.id)

        if (!userAgentsError && userAgentsData) {
          setUserAgentIds(new Set(userAgentsData.map((ua) => ua.agent_id)))
        }
      }

      setIsLoading(false)
    }

    loadData()
  }, [supabase])

  useEffect(() => {
    let filtered = agents

    if (selectedCategory !== "All") {
      filtered = filtered.filter((agent) => agent.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.capabilities.some((cap) => cap.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    setFilteredAgents(filtered)
  }, [selectedCategory, searchQuery, agents])

  const handleAddAgent = async (agentId: string) => {
    if (!isAuthenticated) {
      router.push("/auth/sign-up")
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from("user_agents").insert({
      user_id: user.id,
      agent_id: agentId,
      status: "active",
    })

    if (error) {
      console.error("[v0] Error adding agent:", error)
    } else {
      setUserAgentIds((prev) => new Set(prev).add(agentId))
    }
  }

  const handleVote = async (agentId: string) => {
    const { error } = await supabase.rpc("increment_agent_votes", { agent_id: agentId })

    if (error) {
      console.log("[v0] Voting not available yet (database not configured)")
    } else {
      setAgents((prev) =>
        prev.map((agent) => (agent.id === agentId ? { ...agent, votes: (agent.votes || 0) + 1 } : agent)),
      )
    }
  }

  const marketingAgents = agents.filter((a) => a.section === "marketing")
  const technicalAgents = agents.filter((a) => a.section === "technical")
  const comingSoonAgents = agents.filter((a) => a.section === "coming_soon")

  const getFilteredBySection = (sectionAgents: Agent[]) => {
    let filtered = sectionAgents

    if (selectedCategory !== "All") {
      filtered = filtered.filter((agent) => agent.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.capabilities.some((cap) => cap.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return filtered
  }

  const filteredMarketing = getFilteredBySection(marketingAgents)
  const filteredTechnical = getFilteredBySection(technicalAgents)
  const filteredComingSoon = getFilteredBySection(comingSoonAgents)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <main className="pt-24 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 relative">
            {/* Animated background gradient */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Badge with fade-in animation */}
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <Badge
                variant="outline"
                className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-4 py-1.5 text-sm font-medium"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 inline" />
                AI-Powered Marketing Platform
              </Badge>
            </div>

            {/* Main heading with staggered animation */}
            <h1
              className={`text-5xl md:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-balance">Transform your marketing with </span>
              <span className="gradient-text-cyan-purple inline-block animate-gradient">AI agents</span>
            </h1>

            {/* Subtitle with animation */}
            <p
              className={`text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Deploy specialized AI agents to automate content creation, social media management, analytics, and more.
              Scale your marketing efforts without scaling your team.
            </p>

            {/* CTA buttons with animation */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="/auth/sign-up">
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-8 py-6 text-lg group transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("agents-section")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg transition-all hover:scale-105 bg-transparent"
              >
                Explore Agents
              </Button>
            </div>

            {/* Stats bar with animation */}
            <div
              className={`mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div>
                <div className="text-3xl font-bold gradient-text-cyan-purple">24+</div>
                <div className="text-sm text-slate-400 mt-1">AI Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10x</div>
                <div className="text-sm text-slate-400 mt-1">Faster Output</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400 mt-1">Always Active</div>
              </div>
            </div>
          </div>

          <div id="agents-section" className="scroll-mt-24">
            {/* Search and Filter */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search agents by name, description, or capabilities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 h-12"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="h-5 w-5 text-slate-400 flex-shrink-0" />
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold flex-shrink-0"
                        : "border-slate-700 text-slate-300 hover:bg-slate-800 flex-shrink-0 bg-transparent"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-400">Loading agents...</p>
            </div>
          ) : (
            <>
              {filteredMarketing.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-3xl font-bold text-white">Marketing Agents</h2>
                    <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                      {filteredMarketing.length} Available
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMarketing.map((agent) => (
                      <AgentCard
                        key={agent.id}
                        agent={agent}
                        onAddAgent={handleAddAgent}
                        isAdded={userAgentIds.has(agent.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredTechnical.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="h-6 w-6 text-amber-400" />
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                        NEW
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Technical & Development Agents</h2>
                    <p className="text-slate-400">Build and scale your product with AI-powered technical expertise</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTechnical.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} />
                    ))}
                  </div>
                </div>
              )}

              {filteredComingSoon.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-white">🔮 In Development</h2>
                    </div>
                    <p className="text-slate-400">Vote for the agents you want to see next!</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredComingSoon.map((agent) => (
                      <AgentCard key={agent.id} agent={agent} onVote={handleVote} />
                    ))}
                  </div>
                </div>
              )}

              {filteredMarketing.length === 0 && filteredTechnical.length === 0 && filteredComingSoon.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No agents found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
