// Central environment configuration
import { DATABASE_CONFIG } from "./database"
import { SUPABASE_CONFIG } from "./supabase"
import { AI_SERVICES_CONFIG } from "./ai-services"

export const ENV = {
  DATABASE: DATABASE_CONFIG,
  SUPABASE: SUPABASE_CONFIG,
  AI_SERVICES: AI_SERVICES_CONFIG,
} as const

// Type-safe environment validation
export function validateEnv() {
  const requiredVars = ["POSTGRES_URL", "SUPABASE_URL", "OPENAI_API_KEY", "AI_PROTOCOL_API_KEY"]

  const missing = requiredVars.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}

export * from "./database"
export * from "./supabase"
export * from "./ai-services"
