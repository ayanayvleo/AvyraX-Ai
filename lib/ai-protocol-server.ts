"use server"

// Server-side API integration for secure API key handling
export async function translateWithOpenAI(message: string, sourceDialect: string, targetDialect: string) {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    console.log("[v0] No OpenAI key found on server, using simulation")
    return {
      success: false,
      result: simulateTranslation(message, sourceDialect, targetDialect),
      usingRealAPI: false,
    }
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI-to-AI communication protocol translator. Translate the following message from ${sourceDialect} dialect to ${targetDialect} dialect while preserving semantic meaning and technical accuracy.`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] ✅ Real OpenAI translation completed")
    return {
      success: true,
      result: data.choices[0].message.content,
      usingRealAPI: true,
    }
  } catch (error) {
    console.log("[v0] ❌ OpenAI API failed, falling back to simulation:", error)
    return {
      success: false,
      result: simulateTranslation(message, sourceDialect, targetDialect),
      usingRealAPI: false,
    }
  }
}

function simulateTranslation(message: string, sourceDialect: string, targetDialect: string): string {
  const dialectStyles = {
    "gpt-4": "Optimized for GPT-4 architecture with enhanced reasoning capabilities",
    "gpt-3.5-turbo": "Adapted for GPT-3.5-turbo with efficient processing and cost-effective performance",
    "claude-3": "Adapted for Claude-3 with constitutional AI principles",
    "gemini-pro": "Configured for Gemini Pro multimodal processing",
    "llama-3": "Formatted for Llama-3 open-source architecture",
  }

  const baseTranslation =
    dialectStyles[targetDialect as keyof typeof dialectStyles] || "Universal AI communication format"
  return `${baseTranslation}. Original concept: "${message.substring(0, 100)}${message.length > 100 ? "..." : ""}"`
}
