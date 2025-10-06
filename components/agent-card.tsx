"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, ThumbsUp, ExternalLink, Sparkles } from "lucide-react"
import type { Agent } from "@/lib/types"
import Link from "next/link"

interface AgentCardProps {
  agent: Agent
  onAddAgent?: (agentId: string) => void
  isAdded?: boolean
  onVote?: (agentId: string) => void
}

const pricingColors = {
  subscription: "bg-green-500/10 text-green-400 border-green-500/20",
  addon: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  project: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  retainer: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  coming_soon: "bg-slate-500/10 text-slate-400 border-slate-500/20",
}

export function AgentCard({ agent, onAddAgent, isAdded, onVote }: AgentCardProps) {
  const isComingSoon = agent.pricing_model === "coming_soon"
  const isProjectBased = agent.pricing_model === "project" || agent.pricing_model === "retainer"

  return (
    <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all group hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all text-2xl">
            {agent.icon_emoji || "✨"}
          </div>
          <Badge variant="outline" className={pricingColors[agent.pricing_model]}>
            {agent.pricing_details}
          </Badge>
        </div>
        <CardTitle className="text-xl text-white">{agent.name}</CardTitle>
        <CardDescription className="text-slate-400">{agent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-300 mb-2">
              {isProjectBased ? "Key Features:" : "Capabilities:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {agent.capabilities.slice(0, 3).map((capability) => (
                <Badge key={capability} variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                  {capability}
                </Badge>
              ))}
              {agent.capabilities.length > 3 && (
                <Badge variant="secondary" className="bg-slate-800 text-slate-300 border-slate-700">
                  +{agent.capabilities.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Link href={`/agents/${agent.id}`}>
                View Details
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {isComingSoon ? (
              <Button
                onClick={() => onVote?.(agent.id)}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                <ThumbsUp className="h-4 w-4" />
                {agent.votes && agent.votes > 0 ? agent.votes : ""}
              </Button>
            ) : onAddAgent ? (
              <Button
                onClick={() => onAddAgent(agent.id)}
                disabled={isAdded}
                className={
                  isAdded
                    ? "flex-1 bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "flex-1 bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
                }
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Selected
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Select Agent
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
