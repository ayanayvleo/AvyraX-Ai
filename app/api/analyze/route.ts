import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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

    // Debug log to check the API keys
    console.log('OpenAI API Key length:', process.env.OPENAI_API_KEY?.length)
    console.log('Anthropic API Key length:', process.env.ANTHROPIC_API_KEY?.length)

    try {
      let response
      let actualModelUsed = complexity.selectedModel

      // Use Anthropic for high complexity queries (Claude models)
      if (complexity.selectedModel === 'claude-3-opus' || complexity.score >= 70) {
        actualModelUsed = 'claude-3-5-sonnet-20241022'
        
        const anthropicResponse = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are a helpful coding assistant. Provide detailed, practical advice for software development questions.\n\nQuery: ${analysisText}`
            }
          ],
        })

        response = {
          choices: [{
            message: {
              content: anthropicResponse.content[0].type === 'text' ? anthropicResponse.content[0].text : 'Unable to process response'
            }
          }]
        }
      } else {
        // Use OpenAI for lower complexity queries
        response = await openai.chat.completions.create({
          model: complexity.selectedModel,
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
      }

      return NextResponse.json({
        complexity,
        response: response.choices[0]?.message?.content,
        model_used: actualModelUsed,
        routing_explanation: `Selected ${actualModelUsed} based on complexity score ${complexity.score}/100`
      })

    } catch (apiError: any) {
      console.error('AI API error details:', {
        message: apiError.message,
        code: apiError.code,
        type: apiError.type,
        status: apiError.status
      })
      
      // Fallback response when AI APIs fail
      const mockResponse = `
**Analysis Complete (Demo Mode)**

Your query about "${analysisText.substring(0, 100)}..." has been analyzed.

**Complexity Assessment:**
- Complexity Level: ${complexity.level}
- Complexity Score: ${complexity.score}/100
- Identified Factors: ${complexity.factors.join(', ') || 'Basic query'}

**Recommended Approach:**
For ${complexity.level.toLowerCase()} complexity queries like this, I recommend:

1. **Architecture Planning**: Start with a clear system design
2. **Implementation Strategy**: Break down into smaller, manageable components  
3. **Best Practices**: Follow industry standards for scalability and maintainability
4. **Testing**: Implement comprehensive testing at each layer

*Note: This is a demo response. AI API error: ${apiError.code || 'Unknown error'}*
      `

      return NextResponse.json({
        complexity,
        response: mockResponse.trim(),
        model_used: `${complexity.selectedModel} (Demo Mode)`,
        routing_explanation: `Selected ${complexity.selectedModel} based on complexity score ${complexity.score}/100. Note: Using demo mode due to API error.`
      })
    }

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze query' },
      { status: 500 }
    )
  }
}
