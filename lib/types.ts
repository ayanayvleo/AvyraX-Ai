export interface Agent {
  id: string
  name: string
  description: string
  category: string
  price_tier: "free" | "starter" | "professional" | "enterprise"
  pricing_model: "subscription" | "project" | "retainer" | "addon" | "coming_soon"
  pricing_details: string | null // e.g., "$4,997/project", "+$497/mo", "Retainer: $2,000/mo"
  capabilities: string[]
  icon_url: string | null
  icon_emoji: string | null
  is_featured: boolean
  section: "marketing" | "technical" | "coming_soon"
  best_for: string[] | null
  setup_process: string[] | null
  typical_output: string | null
  success_stories: { quote: string; author: string }[] | null
  votes: number | null
  created_at: string
  updated_at: string
}

export interface UserAgent {
  id: string
  user_id: string
  agent_id: string
  status: "active" | "paused" | "archived"
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}
