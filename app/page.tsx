"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AvyraXAIPlatform() {
  const [codeQuestion, setCodeQuestion] = useState(
    "How should I architect a microservices system with event-driven communication, implement distributed caching, and ensure data consistency across services while maintaining 99.9% uptime?",
  )
  const [analysis, setAnalysis] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [complexity, setComplexity] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState("")
  const [queryHistory, setQueryHistory] = useState([
    {
      query: "How to implement OAuth 2.0 with JWT refresh tokens?",
      model: "GPT-4",
      complexity: "High",
      timestamp: "2 hours ago",
    },
    {
      query: "React performance optimization for large datasets",
      model: "GPT-4",
      complexity: "Medium",
      timestamp: "1 day ago",
    },
    {
      query: "Database indexing strategies for PostgreSQL",
      model: "Claude-3 Opus",
      complexity: "Very High",
      timestamp: "2 days ago",
    },
  ])
  const [showHistory, setShowHistory] = useState(false)
  const [showModelComparison, setShowModelComparison] = useState(false)
  const [routingExplanation, setRoutingExplanation] = useState("")
  const [analysisMetrics, setAnalysisMetrics] = useState({
    complexityScore: 0,
    confidenceLevel: 0,
    modelAccuracy: 0,
    processingTime: 0,
    toolsDiscovered: 0,
    perspectiveCount: 0,
  })

  const handleAnalyze = async () => {
    if (!codeQuestion.trim()) return

    setIsAnalyzing(true)
    setAnalysisStage("Analyzing code complexity...")

    const stages = [
      "Parsing code structure and identifying patterns...",
      "Analyzing complexity factors and technical depth...",
      "Routing to optimal AI model based on requirements...",
      "Gathering multi-perspective insights from selected model...",
      "Discovering relevant tools and frameworks...",
      "Synthesizing comprehensive analysis with roadmap...",
      "Complete - Ready for review and export",
    ]

    for (let i = 0; i < stages.length; i++) {
      setAnalysisStage(stages[i])
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    const complexityIndicators = [
      codeQuestion.includes("microservices") || codeQuestion.includes("distributed"),
      codeQuestion.includes("architecture") || codeQuestion.includes("system"),
      codeQuestion.includes("scalability") || codeQuestion.includes("performance"),
      codeQuestion.includes("security") || codeQuestion.includes("authentication"),
      codeQuestion.length > 150,
      (codeQuestion.match(/\b(database|cache|queue|api|deployment)\b/gi) || []).length > 2,
    ]

    const complexityScore = complexityIndicators.filter(Boolean).length
    const complexityLevel =
      complexityScore >= 4 ? "Very High" : complexityScore >= 2 ? "High" : complexityScore >= 1 ? "Medium" : "Low"

    const routedModel =
      complexityLevel === "Very High"
        ? "Claude-3 Opus"
        : complexityLevel === "High"
          ? "GPT-4"
          : complexityLevel === "Medium"
            ? "GPT-4"
            : "GPT-3.5 Turbo"

    setSelectedModel(routedModel)
    setComplexity(complexityLevel)

    setRoutingExplanation(
      complexityLevel === "Very High"
        ? "Selected Claude-3 Opus due to distributed systems complexity, architectural patterns, and scalability requirements. This model excels at multi-faceted technical analysis."
        : complexityLevel === "High"
          ? "Routed to GPT-4 for comprehensive system design analysis. Optimal for complex architectural decisions and performance considerations."
          : "GPT-3.5 Turbo selected for efficient handling of standard development questions with quick, accurate responses.",
    )

    setQueryHistory((prev) => [
      {
        query: codeQuestion.slice(0, 80) + "...",
        model: routedModel,
        complexity: complexityLevel,
        timestamp: "Just now",
      },
      ...prev.slice(0, 4),
    ])

    const mockAnalysis = `**${routedModel} Analysis (${complexityLevel} Complexity)**

**🎯 Routing Decision Explanation:**
${routingExplanation}

**Architecture Recommendation:**
${
  codeQuestion.includes("microservices")
    ? "Implement event-driven microservices using Apache Kafka for message streaming, Redis for distributed caching, and implement the Saga pattern for distributed transactions. Use API Gateway (Kong/Envoy) for service mesh communication."
    : codeQuestion.includes("React") || codeQuestion.includes("frontend")
      ? "Use Next.js 15 with React Server Components, implement incremental static regeneration, and leverage Vercel's edge functions for optimal performance. Consider Zustand for state management."
      : codeQuestion.includes("database")
        ? "Implement CQRS pattern with read replicas, use connection pooling (PgBouncer), and implement database sharding for horizontal scaling. Consider PostgreSQL with TimescaleDB for time-series data."
        : "Leverage modern development patterns with TypeScript, implement clean architecture principles, and use dependency injection for testable code."
}

**🔧 Tool Discovery & Stack:**
• **Infrastructure:** ${codeQuestion.includes("microservices") ? "Kubernetes, Docker, Terraform, Istio Service Mesh" : "Docker, Vercel, Railway, Fly.io"}
• **Monitoring:** ${codeQuestion.includes("distributed") ? "Jaeger, Prometheus, Grafana, OpenTelemetry" : "Sentry, DataDog, New Relic, LogRocket"}
• **Testing:** ${codeQuestion.includes("system") ? "Testcontainers, K6, Chaos Engineering, Pact" : "Jest, Playwright, Cypress, Testing Library"}
• **CI/CD:** ${codeQuestion.includes("deployment") ? "GitHub Actions, ArgoCD, Helm, Flux" : "Vercel, GitHub Actions, Docker, Netlify"}
• **Database:** ${codeQuestion.includes("scalability") ? "PostgreSQL, Redis, Elasticsearch, ClickHouse" : "PostgreSQL, Prisma, Supabase, PlanetScale"}

**📊 Multi-Perspective Analysis:**

**🏗️ Architecture Perspective:**
${
  complexityLevel === "Very High"
    ? "Design for failure with circuit breakers, implement bulkhead pattern, use eventual consistency where appropriate. Consider CQRS for read/write separation and implement distributed tracing for observability."
    : "Focus on modular design, clear separation of concerns, and maintainable code structure. Implement proper error boundaries and comprehensive logging."
}

**⚡ Performance Perspective:**
${
  codeQuestion.includes("scalability")
    ? "Implement horizontal pod autoscaling, use CDN for static assets, implement database read replicas, and consider edge computing for global distribution. Monitor key metrics: latency, throughput, error rates."
    : "Optimize bundle size, implement code splitting, use lazy loading, and leverage browser caching strategies. Focus on Core Web Vitals and user experience metrics."
}

**🔒 Security Perspective:**
${
  complexityLevel === "High" || complexityLevel === "Very High"
    ? "Implement OAuth 2.0/OIDC with proper token rotation, use JWT securely, implement rate limiting, input validation, and security headers. Consider zero-trust architecture and regular security audits."
    : "Implement proper authentication, input sanitization, HTTPS everywhere, and secure session management. Regular dependency updates and vulnerability scanning."
}

**📈 Monitoring & Observability:**
• **Metrics:** Custom business metrics, SLI/SLO tracking, performance monitoring
• **Logging:** Structured logging with correlation IDs, centralized log aggregation
• **Tracing:** Distributed tracing for request flow visibility across services
• **Alerting:** Intelligent alerting with proper escalation and runbook automation

**🚀 Implementation Roadmap:**
1. **Phase 1 (Weeks 1-2):** Core service architecture and basic communication patterns
2. **Phase 2 (Weeks 3-4):** Implement caching layer and database optimization strategies
3. **Phase 3 (Weeks 5-6):** Add comprehensive monitoring, logging, and observability
4. **Phase 4 (Weeks 7-8):** Performance optimization and horizontal scaling preparation
5. **Phase 5 (Weeks 9-10):** Security hardening, compliance measures, and load testing

**⚠️ Risk Mitigation:**
• **Deployment:** Feature flags for safe rollouts, blue-green deployment strategy
• **Data:** Comprehensive backup strategy, disaster recovery planning
• **Performance:** Load testing before scaling, capacity planning and monitoring
• **Security:** Regular penetration testing, dependency vulnerability scanning

**🔄 Alternative Approaches:**
• **Monolith First:** Consider starting with modular monolith before microservices
• **Serverless:** Evaluate serverless architecture for specific use cases
• **Event Sourcing:** Consider for audit trails and complex business logic

**📋 Next Steps:**
1. Set up development environment with Docker and local orchestration
2. Implement core business logic with comprehensive test coverage
3. Set up CI/CD pipeline with automated testing and deployment
4. Establish monitoring and alerting before production deployment
5. Plan for gradual rollout with feature flags and monitoring`

    setAnalysis(mockAnalysis)

    setAnalysisMetrics({
      complexityScore:
        complexityLevel === "Very High" ? 92 : complexityLevel === "High" ? 78 : complexityLevel === "Medium" ? 58 : 32,
      confidenceLevel: Math.random() * 8 + 92,
      modelAccuracy: Math.random() * 5 + 95,
      processingTime: Math.floor(Math.random() * 800 + 1200),
      toolsDiscovered: complexityLevel === "Very High" ? 15 : complexityLevel === "High" ? 12 : 8,
      perspectiveCount: complexityLevel === "Very High" ? 6 : 4,
    })

    setIsAnalyzing(false)
    setAnalysisStage("")
  }

  const handleExport = () => {
    const exportData = {
      query: codeQuestion,
      model: selectedModel,
      complexity: complexity,
      analysis: analysis,
      metrics: analysisMetrics,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `avyrax-analysis-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg shadow-lg shadow-white/20 flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-br from-white to-white/80 rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-foreground">AvyraX AI</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link href="/get-started">
              <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full border border-border/50 mb-6 shadow-lg shadow-white/10">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50"></div>
            <span className="text-sm font-medium text-foreground/80">
              Multi-Model Developer Platform • Intelligent Routing • Beta Access
            </span>
          </div>

          <div className="relative mb-4">
            <div className="relative flex items-center justify-center gap-3">
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
            Multi-Model Developer Platform that intelligently routes coding questions to the optimal AI model based on
            complexity and context. Get comprehensive analysis, tool discovery, and multi-perspective insights for your
            development challenges.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Free Beta Access</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full border border-blue-500/20">
              <span className="text-sm font-medium">Pro: $29/month</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full border border-purple-500/20">
              <span className="text-sm font-medium">Enterprise: Custom</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="analysis-demo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm shadow-lg shadow-white/5">
            <TabsTrigger value="analysis-demo">Analysis Demo</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis-demo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Coding Question</CardTitle>
                  <CardDescription>Ask any technical question or describe your development challenge</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="e.g., How should I architect a real-time chat application with React and Node.js? What tools should I use for testing and deployment?"
                    value={codeQuestion}
                    onChange={(e) => setCodeQuestion(e.target.value)}
                    className="min-h-40 font-mono text-sm bg-input/50 border-border/50"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCodeQuestion(
                          "How do I implement real-time collaboration features like Google Docs with conflict resolution and operational transforms?",
                        )
                      }
                      className="text-xs"
                    >
                      Real-time Collaboration
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCodeQuestion(
                          "What's the best way to handle authentication and authorization in a multi-tenant SaaS application?",
                        )
                      }
                      className="text-xs"
                    >
                      Multi-tenant Auth
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCodeQuestion(
                          "How should I optimize database queries for a high-traffic e-commerce platform?",
                        )
                      }
                      className="text-xs"
                    >
                      Database Optimization
                    </Button>
                    <div className="relative group">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const input = document.createElement("input")
                          input.type = "file"
                          input.accept = ".js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.swift,.kt"
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              if (file.size > 50000) {
                                alert("File too large. Please keep files under 50KB for optimal analysis.")
                                return
                              }
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                const content = event.target?.result as string
                                setCodeQuestion(
                                  `Please analyze this ${file.name} file and provide optimization suggestions:\n\n\`\`\`${file.name.split(".").pop()}\n${content.slice(0, 2000)}${content.length > 2000 ? "\n... (truncated for analysis)" : ""}\n\`\`\``,
                                )
                              }
                              reader.readAsText(file)
                            }
                          }
                          input.click()
                        }}
                        className="text-xs bg-accent/10 hover:bg-accent/20 text-accent border-accent/30"
                      >
                        📁 Upload Code
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Supports: JS, TS, Python, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin
                        <br />
                        Max size: 50KB
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Intelligent Routing</CardTitle>
                  <CardDescription>
                    Analyzes complexity factors: architecture patterns, scalability requirements, security needs, and
                    technical depth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Selected Model</label>
                        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                          <span className="text-sm font-mono">{selectedModel || "Claude-3 Opus"}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Complexity Level</label>
                        <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                          <span className="text-sm font-mono">{complexity || "Very High"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Complexity Score</span>
                        <span className="font-mono">{analysisMetrics.complexityScore || 92}/100</span>
                      </div>
                      <Progress value={analysisMetrics.complexityScore || 92} className="h-2" />
                    </div>

                    {routingExplanation && (
                      <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                        <p className="text-sm text-accent-foreground">{routingExplanation}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowModelComparison(!showModelComparison)}
                        className="text-xs"
                      >
                        Compare Models
                      </Button>
                      {analysis && (
                        <Button variant="outline" size="sm" onClick={handleExport} className="text-xs bg-transparent">
                          📥 Export
                        </Button>
                      )}
                    </div>

                    {showModelComparison && (
                      <div className="space-y-2 p-3 bg-muted/20 rounded-lg border border-border/30">
                        <p className="text-sm font-medium">Alternative Model Options:</p>
                        <div className="grid grid-cols-1 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span>GPT-4:</span>
                            <span className="text-muted-foreground">Architecture focus, 95% confidence</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Claude-3 Opus:</span>
                            <span className="text-primary">Selected - Best for distributed systems</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GPT-3.5:</span>
                            <span className="text-muted-foreground">Too simple for this complexity</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Multi-Perspective Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive insights with tool recommendations and alternative approaches
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={
                      analysis ||
                      `**Ready for Analysis**

Upload your code or ask a technical question to see:

🏗️ **Architecture Analysis**
• Design pattern recommendations
• Scalability considerations  
• Performance optimization strategies

🔧 **Tool Discovery**
• Framework and library suggestions
• Testing and deployment tools
• Monitoring and observability solutions

🚀 **Implementation Roadmap**
• Step-by-step development phases
• Risk mitigation strategies
• Best practices and security considerations

**Example Results Preview:**
For microservices questions → Claude-3 Opus provides distributed systems expertise
For React/frontend → GPT-4 offers component architecture and performance insights
For database optimization → Specialized analysis with query optimization and scaling strategies

*Try the complex microservices example above to see the full multi-perspective analysis in action.*`
                    }
                    readOnly
                    className="min-h-60 bg-muted/50 font-mono text-sm border-border/50"
                  />

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-sm shadow-primary/50"></div>
                        <span className="text-sm text-primary">{analysisStage}</span>
                      </div>
                      <Progress value={Math.random() * 100} className="h-1" />
                    </div>
                  )}

                  {analysis && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Confidence Level</p>
                        <div className="flex items-center gap-2">
                          <Progress value={analysisMetrics.confidenceLevel} className="h-2 flex-1" />
                          <span className="text-xs font-mono">{analysisMetrics.confidenceLevel.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Tools Discovered</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-primary">{analysisMetrics.toolsDiscovered}</span>
                          <span className="text-xs text-muted-foreground">tools</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Perspectives</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-accent">{analysisMetrics.perspectiveCount}</span>
                          <span className="text-xs text-muted-foreground">views</span>
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
                    onClick={handleAnalyze}
                    disabled={!codeQuestion.trim() || isAnalyzing}
                    size="lg"
                    className="px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 shadow-white/20"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      "Get Multi-Model Analysis"
                    )}
                  </Button>

                  <div className="flex gap-2">
                    <Link href="/get-started">
                      <Button variant="outline" size="lg">
                        Join Beta Waitlist
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button variant="ghost" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </div>

                  {(analysisMetrics.processingTime > 0 || !analysis) && (
                    <div className="text-sm text-muted-foreground">
                      {analysis ? (
                        <>
                          Analyzed in {analysisMetrics.processingTime}ms • {analysisMetrics.toolsDiscovered} tools
                          discovered
                          <span className="ml-2 text-accent">• Live Demo</span>
                        </>
                      ) : (
                        <>
                          Try the complex example above • <span className="text-primary">Routing Logic:</span>{" "}
                          Microservices + Distributed + Scalability = Claude-3 Opus
                        </>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">GPT-4</CardTitle>
                  <CardDescription>Complex architecture & system design</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best for:</span>
                      <span className="text-primary">High complexity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Specialties:</span>
                      <span className="text-muted-foreground">Architecture, APIs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Claude-3 Opus</CardTitle>
                  <CardDescription>Advanced algorithms & optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best for:</span>
                      <span className="text-primary">Very high complexity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Specialties:</span>
                      <span className="text-muted-foreground">Algorithms, ML</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">GPT-3.5 Turbo</CardTitle>
                  <CardDescription>Quick solutions & debugging</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best for:</span>
                      <span className="text-primary">Low-medium complexity</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Specialties:</span>
                      <span className="text-muted-foreground">Debugging, syntax</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Free Beta
                  </CardTitle>
                  <CardDescription>Perfect for individual developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-4">
                    $0<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      10 analyses per day
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      GPT-3.5 & GPT-4 access
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Basic tool discovery
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Community support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10 ring-2 ring-primary/20">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Pro
                  </CardTitle>
                  <CardDescription>For professional developers & teams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-4">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Unlimited analyses
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      All AI models (Claude-3, GPT-4)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Advanced tool discovery
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Code upload (up to 1MB)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      Priority support
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Enterprise
                  </CardTitle>
                  <CardDescription>Custom solutions for organizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-4">
                    Custom<span className="text-sm font-normal text-muted-foreground"> pricing</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      Unlimited everything
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      Custom model training
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      API access & integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      Dedicated support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      SLA guarantees
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">{/* Additional features can be added here */}</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
