import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Basic complexity analysis function
function analyzeComplexity(query: string): {
  score: number
  level: string
  factors: string[]
  selectedModel: string
} {
  const complexityFactors = []
  let score = 0

  // Check for architectural patterns
  const architecturalKeywords = ['microservices', 'distributed', 'architecture', 'system design', 'scalability', 'load balancing']
  if (architecturalKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
    score += 30
    complexityFactors.push('Architecture patterns')
  }

  // Check for advanced concepts
  const advancedKeywords = ['event-driven', 'caching', 'consistency', 'performance', 'optimization', 'security']
  if (advancedKeywords.some(keyword => query.toLowerCase().includes(keyword))) {
    score += 25
    complexityFactors.push('Advanced concepts')
  }

  // Check for specific percentages/requirements
  if (query.match(/\d+(\.\d+)?%/) || query.includes('uptime')) {
    score += 20
    complexityFactors.push('Specific requirements')
  }

  // Check query length and technical depth
  if (query.length > 100) {
    score += 15
    complexityFactors.push('Technical depth')
  }

  // Determine routing based on score
  let level = 'Low'
  let selectedModel = 'gpt-3.5-turbo'

  if (score >= 70) {
    level = 'Very High'
    selectedModel = 'claude-3-opus' // We'll handle this differently
  } else if (score >= 50) {
    level = 'High'
    selectedModel = 'gpt-4'
  } else if (score >= 30) {
    level = 'Medium'
    selectedModel = 'gpt-4'
  }

  return {
    score: Math.min(score, 100),
    level,
    factors: complexityFactors,
    selectedModel
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query, uploadedCode } = await request.json()

    if (!query && !uploadedCode) {
      return NextResponse.json(
        { error: 'Query or code is required' },
        { status: 400 }
      )
    }

    const analysisText = query || uploadedCode
    const complexity = analyzeComplexity(analysisText)

    // For now, we'll use OpenAI for all requests
    // Later we can add Anthropic integration for high complexity
    const response = await openai.chat.completions.create({
      model: complexity.selectedModel === 'claude-3-opus' ? 'gpt-4' : complexity.selectedModel,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful coding assistant. Provide detailed, practical advice for software development questions.'
        },
        {
          role: 'user',
          content: analysisText
        }
      ],
      max_tokens: 1000,
    })

    return NextResponse.json({
      complexity,
      response: response.choices[0]?.message?.content,
      model_used: complexity.selectedModel,
      routing_explanation: `Selected ${complexity.selectedModel} based on complexity score ${complexity.score}/100`
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze query' },
      { status: 500 }
    )
  }
}
