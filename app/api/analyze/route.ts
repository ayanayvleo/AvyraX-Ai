import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import Anthropic from "@anthropic-ai/sdk"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

function analyzeComplexity(query: string): {
  score: number
  level: string
  factors: string[]
  selectedModel: string
} {
  const complexityFactors = []
  let score = 0

  // Check for architectural patterns
  const architecturalKeywords = [
    "microservices",
    "distributed",
    "architecture",
    "system design",
    "scalability",
    "load balancing",
    "kubernetes",
    "docker",
  ]
  if (architecturalKeywords.some((keyword) => query.toLowerCase().includes(keyword))) {
    score += 30
    complexityFactors.push("Architecture patterns")
  }

  // Check for advanced concepts
  const advancedKeywords = [
    "event-driven",
    "caching",
    "consistency",
    "performance",
    "optimization",
    "security",
    "database",
    "api design",
  ]
  if (advancedKeywords.some((keyword) => query.toLowerCase().includes(keyword))) {
    score += 25
    complexityFactors.push("Advanced concepts")
  }

  // Check for specific percentages/requirements
  if (query.match(/\d+(\.\d+)?%/) || query.includes("uptime") || query.includes("sla")) {
    score += 20
    complexityFactors.push("Specific requirements")
  }

  // Check query length and technical depth
  if (query.length > 100) {
    score += 15
    complexityFactors.push("Technical depth")
  }

  // Check for enterprise/complex terms
  const enterpriseKeywords = ["enterprise", "production", "scale", "fault tolerance", "disaster recovery"]
  if (enterpriseKeywords.some((keyword) => query.toLowerCase().includes(keyword))) {
    score += 10
    complexityFactors.push("Enterprise requirements")
  }

  // Determine routing based on score
  let level = "Low"
  let selectedModel = "gpt-3.5-turbo"

  if (score >= 70) {
    level = "Very High"
    selectedModel = "claude-3-5-sonnet-20241022"
  } else if (score >= 50) {
    level = "High"
    selectedModel = "gpt-4"
  } else if (score >= 30) {
    level = "Medium"
    selectedModel = "gpt-4"
  }

  return {
    score: Math.min(score, 100),
    level,
    factors: complexityFactors,
    selectedModel,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, uploadedCode } = await request.json()

    if (!query && !uploadedCode) {
      return NextResponse.json({ error: "Query or code is required" }, { status: 400 })
    }

    const analysisText = query || uploadedCode
    const complexity = analyzeComplexity(analysisText)

    let response
    const actualModel = complexity.selectedModel

    if (complexity.selectedModel === "claude-3-5-sonnet-20241022") {
      // Use Anthropic Claude for high complexity queries
      const claudeResponse = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are an expert software architect and developer. Provide detailed, practical advice for this complex technical question: ${analysisText}`,
          },
        ],
      })

      response = claudeResponse.content[0]?.type === "text" ? claudeResponse.content[0].text : "No response generated"
    } else {
      // Use OpenAI for lower complexity queries
      const openaiResponse = await openai.chat.completions.create({
        model: complexity.selectedModel,
        messages: [
          {
            role: "system",
            content:
              "You are a helpful coding assistant. Provide detailed, practical advice for software development questions.",
          },
          {
            role: "user",
            content: analysisText,
          },
        ],
        max_tokens: 1000,
      })

      response = openaiResponse.choices[0]?.message?.content
    }

    return NextResponse.json({
      complexity,
      response,
      model_used: actualModel,
      routing_explanation: `Selected ${actualModel} based on complexity score ${complexity.score}/100 (${complexity.level} complexity)`,
      factors: complexity.factors,
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: "Failed to analyze query", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "AvyraX AI Analysis API is running",
    version: "1.0.0",
    supported_models: ["gpt-3.5-turbo", "gpt-4", "claude-3-5-sonnet-20241022"],
    routing: "Intelligent complexity-based routing",
  })
}
