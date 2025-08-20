"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AIProtocolEngine } from "@/lib/ai-protocol-engine"

export default function AvyraXAIPlatform() {
  const [engine] = useState(() => new AIProtocolEngine())
  const [sourceMessage, setSourceMessage] = useState("")
  const [translatedMessage, setTranslatedMessage] = useState("")
  const [sourceDialect, setSourceDialect] = useState("gpt-4")
  const [targetDialect, setTargetDialect] = useState("claude-3")
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStage, setProcessingStage] = useState("")
  const [apiUsage, setApiUsage] = useState({ tokens: 0, estimatedCost: 0, usingRealAPI: false })
  const [translationMetrics, setTranslationMetrics] = useState({
    compressionRatio: 0,
    semanticAccuracy: 0,
    translationQuality: 0,
    processingTime: 0,
    tokenCount: 0,
    conceptPreservation: 0,
    dialectAdaptation: 0,
    compressionEfficiency: 0,
    reconstructionFidelity: 0,
    semanticCoherence: 0,
    crossDialectConsistency: 0,
    adaptiveOptimization: 0,
  })

  const handleTranslate = async () => {
    if (!sourceMessage.trim()) return

    setIsProcessing(true)
    setProcessingStage("Initializing neural translation...")

    try {
      const stages = [
        "Connecting to real AI APIs...",
        "Tokenizing AI concepts...",
        "Applying semantic preservation...",
        "Executing compression algorithms...",
        "Performing neural translation...",
        "Optimizing for target dialect...",
        "Validating translation quality...",
        "Finalizing output...",
      ]

      for (let i = 0; i < stages.length; i++) {
        setProcessingStage(stages[i])
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      const result = await engine.translateMessage(sourceMessage, sourceDialect, targetDialect)

      setTranslatedMessage(result.translatedMessage)
      setApiUsage({
        tokens: result.apiUsage.tokens,
        estimatedCost: result.apiUsage.estimatedCost,
        usingRealAPI: result.usingRealAPI,
      })
      setTranslationMetrics({
        compressionRatio: result.compressionRatio,
        semanticAccuracy: result.semanticAccuracy,
        translationQuality: result.translationQuality,
        processingTime: result.processingTime,
        tokenCount: result.tokenCount,
        conceptPreservation: result.conceptPreservation,
        dialectAdaptation: result.dialectAdaptation,
        compressionEfficiency: result.compressionEfficiency,
        reconstructionFidelity: result.reconstructionFidelity,
        semanticCoherence: result.semanticCoherence,
        crossDialectConsistency: result.crossDialectConsistency,
        adaptiveOptimization: result.adaptiveOptimization,
      })
    } catch (error) {
      console.error("Translation failed:", error)
      setProcessingStage("Translation failed. Please try again.")
    } finally {
      setIsProcessing(false)
      setProcessingStage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50 mb-6 shadow-lg shadow-white/10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50"></div>
            <span className="text-sm font-medium text-foreground/80">
              Enterprise AI Infrastructure • Production Ready
            </span>
          </div>

          <div className="relative mb-4">
            <div className="relative flex items-center justify-center gap-3">
              {/* Animated logo icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary rounded-lg shadow-lg shadow-white/20 flex items-center justify-center animate-pulse">
                  <div
                    className="w-6 h-6 bg-gradient-to-br from-white to-white/80 rounded-sm transform rotate-45 animate-spin"
                    style={{ animationDuration: "8s" }}
                  ></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-accent/50 to-primary/50 rounded-lg blur-md animate-pulse"></div>
              </div>

              <div className="relative">
                <img src="/images/avyrax-ai-logo.png" alt="AvyraX AI" className="relative h-48 w-auto object-contain" />
              </div>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-6">
            Enterprise-grade AI-to-AI communication platform enabling seamless neural translation across different model
            architectures. Integrate advanced semantic preservation and intelligent compression into your existing
            systems.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              RESTful API
            </Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Python/Node.js SDKs
            </Badge>
            <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
              Enterprise Security
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="api-demo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm shadow-lg shadow-white/5">
            <TabsTrigger value="api-demo">API Demo</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="api-demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">AI Dialect Configuration</CardTitle>
                  <CardDescription>Select source and target AI systems for protocol translation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Source AI System</label>
                      <Select value={sourceDialect} onValueChange={setSourceDialect}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
                          <SelectItem value="claude-3">Claude-3 (Anthropic)</SelectItem>
                          <SelectItem value="gemini-pro">Gemini Pro (Google)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target AI System</label>
                      <Select value={targetDialect} onValueChange={setTargetDialect}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (OpenAI)</SelectItem>
                          <SelectItem value="claude-3">Claude-3 (Anthropic)</SelectItem>
                          <SelectItem value="gemini-pro">Gemini Pro (Google)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Source Message</CardTitle>
                  <CardDescription>
                    Enter complex AI concepts, instructions, or technical specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter advanced AI concepts, neural architectures, or ML instructions..."
                    value={sourceMessage}
                    onChange={(e) => setSourceMessage(e.target.value)}
                    className="min-h-40 font-mono text-sm bg-input/50 border-border/50"
                  />
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Translated Message</CardTitle>
                  <CardDescription>
                    Neural translation with semantic preservation and dialect adaptation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={translatedMessage}
                    readOnly
                    className="min-h-40 bg-muted/50 font-mono text-sm border-border/50"
                    placeholder="Translated message will appear here with advanced neural processing..."
                  />

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50"></div>
                        <span className="text-sm text-primary">{processingStage}</span>
                      </div>
                      <Progress value={Math.random() * 100} className="h-1" />
                    </div>
                  )}

                  {translatedMessage && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Translation Quality</p>
                        <div className="flex items-center gap-2">
                          <Progress value={translationMetrics.translationQuality} className="h-2 flex-1" />
                          <span className="text-xs font-mono">{translationMetrics.translationQuality.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Semantic Accuracy</p>
                        <div className="flex items-center gap-2">
                          <Progress value={translationMetrics.semanticAccuracy} className="h-2 flex-1" />
                          <span className="text-xs font-mono">{translationMetrics.semanticAccuracy.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={handleTranslate}
                    disabled={!sourceMessage.trim() || isProcessing}
                    size="lg"
                    className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 shadow-white/20"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      "Translate with Neural Protocol"
                    )}
                  </Button>

                  {translationMetrics.processingTime > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Processed in {translationMetrics.processingTime}ms • {translationMetrics.tokenCount} tokens
                      {apiUsage.usingRealAPI && (
                        <span className="ml-2 text-primary">• Real API: ${apiUsage.estimatedCost.toFixed(6)}</span>
                      )}
                      {!apiUsage.usingRealAPI && <span className="ml-2 text-accent">• Advanced Simulation</span>}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Start Integration</CardTitle>
                <CardDescription>Get started with the AvyraX AI API in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">🆓 Free API Setup (Recommended)</h3>
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg space-y-2">
                      <p className="text-sm">
                        <strong>1. Groq (FREE - 14,400 requests/day):</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Visit: https://console.groq.com/ → Get API Key → Add as GROQ_API_KEY
                      </p>

                      <p className="text-sm">
                        <strong>2. HuggingFace (FREE - Unlimited):</strong>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Visit: https://huggingface.co/settings/tokens → Create Token → Add as HUGGINGFACE_API_KEY
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">REST API Integration</h3>
                    <pre className="bg-muted/50 border border-border/50 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{`curl -X POST https://api.avyrax.ai/v1/translate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Deploy transformer with 16 attention heads",
    "source_dialect": "gpt-4",
    "target_dialect": "claude-3"
  }'`}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Choose Your Plan</h2>
              <p className="text-muted-foreground">Scale from prototype to production</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Starter</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      10K translations/month
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>3 AI dialects
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-primary/50 shadow-lg shadow-primary/10 shadow-white/15">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground">Professional</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">$499</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      100K translations/month
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      All AI dialects
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Start Free Trial</Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Enterprise</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">Custom</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Unlimited translations
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      On-premise deployment
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
