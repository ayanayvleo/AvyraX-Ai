"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const [quickQuery, setQuickQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock user data
  const userData = {
    name: "Alex Chen",
    plan: "Pro",
    usageThisMonth: 247,
    quotaLimit: 1000,
    analysesCompleted: 89,
    timesSaved: "12.4 hours",
  }

  // Mock analysis history
  const analysisHistory = [
    {
      id: 1,
      query: "How to implement OAuth 2.0 with JWT refresh tokens in Node.js?",
      model: "GPT-4",
      complexity: "High",
      complexityScore: 78,
      timestamp: "2 hours ago",
      confidence: 94,
      toolsFound: 8,
      saved: true,
      tags: ["authentication", "security", "nodejs"],
    },
    {
      id: 2,
      query: "React performance optimization for large datasets with virtualization",
      model: "GPT-4",
      complexity: "Medium",
      complexityScore: 65,
      timestamp: "1 day ago",
      confidence: 91,
      toolsFound: 12,
      saved: false,
      tags: ["react", "performance", "frontend"],
    },
    {
      id: 3,
      query: "Microservices architecture with event-driven communication patterns",
      model: "Claude-3 Opus",
      complexity: "Very High",
      complexityScore: 92,
      timestamp: "2 days ago",
      confidence: 96,
      toolsFound: 15,
      saved: true,
      tags: ["microservices", "architecture", "distributed"],
    },
    {
      id: 4,
      query: "Database indexing strategies for PostgreSQL query optimization",
      model: "Claude-3 Opus",
      complexity: "High",
      complexityScore: 81,
      timestamp: "3 days ago",
      confidence: 93,
      toolsFound: 9,
      saved: false,
      tags: ["database", "postgresql", "optimization"],
    },
    {
      id: 5,
      query: "Docker containerization best practices for production deployment",
      model: "GPT-4",
      complexity: "Medium",
      complexityScore: 58,
      timestamp: "5 days ago",
      confidence: 89,
      toolsFound: 11,
      saved: true,
      tags: ["docker", "deployment", "devops"],
    },
  ]

  // Mock performance insights
  const performanceData = {
    mostUsedModel: "GPT-4",
    averageComplexity: 74.8,
    successRate: 94.2,
    modelDistribution: {
      "GPT-4": 45,
      "Claude-3 Opus": 35,
      "GPT-3.5 Turbo": 20,
    },
  }

  const filteredHistory = analysisHistory.filter((item) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "saved" && item.saved) ||
      (selectedFilter === "high" && (item.complexity === "High" || item.complexity === "Very High")) ||
      (selectedFilter === "recent" && item.timestamp.includes("hour"))

    const matchesSearch =
      searchTerm === "" ||
      item.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  const handleQuickAnalysis = () => {
    // Simulate navigation to analysis with pre-filled query
    console.log("Starting quick analysis:", quickQuery)
  }

  const handleExportHistory = () => {
    const exportData = {
      user: userData.name,
      exportDate: new Date().toISOString(),
      analyses: filteredHistory,
      summary: {
        totalAnalyses: analysisHistory.length,
        averageComplexity: performanceData.averageComplexity,
        mostUsedModel: performanceData.mostUsedModel,
      },
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `avyrax-history-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-lg shadow-lg shadow-white/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-white to-white/80 rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-xl font-bold text-foreground">AvyraX AI</span>
            </Link>
            <div className="h-6 w-px bg-border mx-2"></div>
            <span className="text-muted-foreground">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm font-medium">{userData.plan} Plan</span>
            </div>
            <Button variant="outline" size="sm">
              Account Settings
            </Button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userData.name}</h1>
          <p className="text-muted-foreground">Track your development insights and AI routing performance</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">{userData.usageThisMonth}</p>
                  <p className="text-xs text-muted-foreground">of {userData.quotaLimit} analyses</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-sm"></div>
                </div>
              </div>
              <Progress value={(userData.usageThisMonth / userData.quotaLimit) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Analyses Completed</p>
                  <p className="text-2xl font-bold text-foreground">{userData.analysesCompleted}</p>
                  <p className="text-xs text-green-600">+12 this week</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                  <p className="text-2xl font-bold text-foreground">{userData.timesSaved}</p>
                  <p className="text-xs text-muted-foreground">vs manual research</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-accent rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-foreground">{performanceData.successRate}%</p>
                  <p className="text-xs text-muted-foreground">routing accuracy</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Analysis */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Analysis</CardTitle>
            <CardDescription>Start a new analysis without leaving your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Textarea
                placeholder="Ask any technical question or describe your development challenge..."
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                className="flex-1 bg-input/50 border-border/50"
                rows={3}
              />
              <Button
                onClick={handleQuickAnalysis}
                disabled={!quickQuery.trim()}
                className="px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm shadow-lg shadow-white/5">
            <TabsTrigger value="history">Analysis History</TabsTrigger>
            <TabsTrigger value="insights">Performance Insights</TabsTrigger>
            <TabsTrigger value="saved">Saved Queries</TabsTrigger>
            <TabsTrigger value="files">Code Files</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === "recent" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("recent")}
                >
                  Recent
                </Button>
                <Button
                  variant={selectedFilter === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("high")}
                >
                  High Complexity
                </Button>
                <Button
                  variant={selectedFilter === "saved" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("saved")}
                >
                  Saved
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Search analyses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 bg-input/50 border-border/50"
                />
                <Button variant="outline" size="sm" onClick={handleExportHistory}>
                  📥 Export
                </Button>
              </div>
            </div>

            {/* Analysis History List */}
            <div className="space-y-4">
              {filteredHistory.map((analysis) => (
                <Card
                  key={analysis.id}
                  className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-2 line-clamp-2">{analysis.query}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {analysis.tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {analysis.saved && <div className="w-2 h-2 bg-accent rounded-full" title="Saved"></div>}
                        <Button variant="ghost" size="sm">
                          ⋯
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Model</p>
                        <p className="font-mono text-foreground">{analysis.model}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Complexity</p>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-foreground">{analysis.complexity}</span>
                          <span className="text-xs text-muted-foreground">({analysis.complexityScore})</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-mono text-foreground">{analysis.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tools Found</p>
                        <p className="font-mono text-foreground">{analysis.toolsFound}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="text-foreground">{analysis.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Analysis
                        </Button>
                        <Button variant="ghost" size="sm">
                          Re-run
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          📋 Copy
                        </Button>
                        <Button variant="ghost" size="sm">
                          📥 Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Model Usage Distribution</CardTitle>
                  <CardDescription>Which AI models are being selected for your queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(performanceData.modelDistribution).map(([model, percentage]) => (
                      <div key={model} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-mono">{model}</span>
                          <span className="text-muted-foreground">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
                <CardHeader>
                  <CardTitle className="text-foreground">Routing Performance</CardTitle>
                  <CardDescription>How well the intelligent routing is working for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Complexity Score</span>
                        <span className="font-mono">{performanceData.averageComplexity}/100</span>
                      </div>
                      <Progress value={performanceData.averageComplexity} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Routing Accuracy</span>
                        <span className="font-mono">{performanceData.successRate}%</span>
                      </div>
                      <Progress value={performanceData.successRate} className="h-2" />
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm text-muted-foreground mb-2">Most Used Model</p>
                      <p className="font-mono text-lg text-foreground">{performanceData.mostUsedModel}</p>
                      <p className="text-xs text-muted-foreground">Optimal for your query patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Development Patterns</CardTitle>
                <CardDescription>Insights into your development challenges and focus areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Top Categories</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Architecture</span>
                        <span className="text-muted-foreground">32%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Performance</span>
                        <span className="text-muted-foreground">28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Security</span>
                        <span className="text-muted-foreground">24%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Technologies</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>React/Frontend</span>
                        <span className="text-muted-foreground">35%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Node.js/Backend</span>
                        <span className="text-muted-foreground">30%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Database</span>
                        <span className="text-muted-foreground">25%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Complexity Trends</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Very High</span>
                        <span className="text-muted-foreground">18%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>High</span>
                        <span className="text-muted-foreground">42%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medium</span>
                        <span className="text-muted-foreground">40%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="space-y-4">
              {analysisHistory
                .filter((item) => item.saved)
                .map((analysis) => (
                  <Card
                    key={analysis.id}
                    className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-2">{analysis.query}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {analysis.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="w-2 h-2 bg-accent rounded-full" title="Saved"></div>
                          <Button variant="ghost" size="sm">
                            ⋯
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm">
                          <span>
                            <span className="text-muted-foreground">Model:</span> {analysis.model}
                          </span>
                          <span>
                            <span className="text-muted-foreground">Complexity:</span> {analysis.complexity}
                          </span>
                          <span>
                            <span className="text-muted-foreground">Time:</span> {analysis.timestamp}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg shadow-white/10">
              <CardHeader>
                <CardTitle className="text-foreground">Code Upload Management</CardTitle>
                <CardDescription>Previously uploaded files and their analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-muted rounded-sm"></div>
                  </div>
                  <p className="text-muted-foreground mb-4">No code files uploaded yet</p>
                  <Button variant="outline">📁 Upload Code File</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
