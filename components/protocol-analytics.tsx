"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ProtocolAnalytics() {
  const analyticsData = {
    performanceMetrics: {
      avgLatency: 45,
      throughput: 1250,
      errorRate: 0.02,
      uptime: 99.97,
    },
    dialectSupport: [
      { name: "GPT-4", compatibility: 98, translations: 15420 },
      { name: "Claude-3", compatibility: 96, translations: 12350 },
      { name: "Gemini Pro", compatibility: 94, translations: 8930 },
      { name: "LLaMA-2", compatibility: 89, translations: 6780 },
      { name: "PaLM-2", compatibility: 87, translations: 5240 },
    ],
    compressionStats: {
      avgRatio: 73.2,
      bestRatio: 89.1,
      semanticLoss: 2.1,
    },
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.avgLatency}ms</div>
            <p className="text-xs text-muted-foreground">Real-time processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.throughput.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Messages/hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.errorRate}%</div>
            <p className="text-xs text-muted-foreground">Industry leading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.performanceMetrics.uptime}%</div>
            <p className="text-xs text-muted-foreground">Enterprise grade</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Dialect Compatibility</CardTitle>
          <CardDescription>Translation accuracy and volume across different AI systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analyticsData.dialectSupport.map((dialect, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{dialect.name}</span>
                  <Badge variant="secondary">{dialect.translations.toLocaleString()} translations</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{dialect.compatibility}%</span>
              </div>
              <Progress value={dialect.compatibility} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compression Performance</CardTitle>
            <CardDescription>Intelligent compression with semantic preservation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Average Compression</span>
                <span className="text-sm">{analyticsData.compressionStats.avgRatio}%</span>
              </div>
              <Progress value={analyticsData.compressionStats.avgRatio} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Best Compression</span>
                <span className="text-sm">{analyticsData.compressionStats.bestRatio}%</span>
              </div>
              <Progress value={analyticsData.compressionStats.bestRatio} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Semantic Loss</span>
                <span className="text-sm text-green-600">{analyticsData.compressionStats.semanticLoss}%</span>
              </div>
              <Progress value={100 - analyticsData.compressionStats.semanticLoss} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Protocol Features</CardTitle>
            <CardDescription>Advanced capabilities of the communication protocol</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Real-time Translation</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Semantic Preservation</span>
              <Badge variant="default">98.1% Accuracy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Multi-modal Support</span>
              <Badge variant="secondary">Coming Soon</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Edge Optimization</span>
              <Badge variant="default">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Federated Learning</span>
              <Badge variant="default">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
