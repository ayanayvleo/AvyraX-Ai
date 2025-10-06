import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Eye, MousePointer } from "lucide-react"

interface AnalyticsData {
  id: string
  user_id: string
  agent_id: string | null
  content_id: string | null
  metric_type: string
  metric_value: number
  date: string
  metadata: Record<string, unknown>
  created_at: string
}

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get analytics data for the last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: analyticsData } = await supabase
    .from("analytics")
    .select("*")
    .eq("user_id", user!.id)
    .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
    .order("date", { ascending: false })

  const typedAnalytics = analyticsData as AnalyticsData[] | null

  // Calculate metrics
  const engagementData = typedAnalytics?.filter((a) => a.metric_type === "engagement") || []
  const reachData = typedAnalytics?.filter((a) => a.metric_type === "reach") || []
  const conversionData = typedAnalytics?.filter((a) => a.metric_type === "conversion") || []
  const revenueData = typedAnalytics?.filter((a) => a.metric_type === "revenue") || []

  const totalEngagement = engagementData.reduce((sum, a) => sum + Number(a.metric_value), 0)
  const totalReach = reachData.reduce((sum, a) => sum + Number(a.metric_value), 0)
  const totalConversions = conversionData.reduce((sum, a) => sum + Number(a.metric_value), 0)
  const totalRevenue = revenueData.reduce((sum, a) => sum + Number(a.metric_value), 0)

  // Calculate trends (compare last 15 days vs previous 15 days)
  const fifteenDaysAgo = new Date()
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)

  const recentEngagement = engagementData
    .filter((a) => new Date(a.date) >= fifteenDaysAgo)
    .reduce((sum, a) => sum + Number(a.metric_value), 0)
  const previousEngagement = engagementData
    .filter((a) => new Date(a.date) < fifteenDaysAgo)
    .reduce((sum, a) => sum + Number(a.metric_value), 0)

  const engagementTrend =
    previousEngagement > 0 ? ((recentEngagement - previousEngagement) / previousEngagement) * 100 : 0

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-400">Track your marketing performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Engagement</CardTitle>
              <MousePointer className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalEngagement.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                {engagementTrend >= 0 ? (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-green-400">+{engagementTrend.toFixed(1)}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <span className="text-sm text-red-400">{engagementTrend.toFixed(1)}%</span>
                  </>
                )}
                <span className="text-sm text-slate-400 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Reach</CardTitle>
              <Eye className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalReach.toLocaleString()}</div>
              <p className="text-sm text-slate-400 mt-1">People reached</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Conversions</CardTitle>
              <Users className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalConversions.toLocaleString()}</div>
              <p className="text-sm text-slate-400 mt-1">Total conversions</p>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</div>
              <p className="text-sm text-slate-400 mt-1">Generated revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white">Performance Overview</CardTitle>
            <CardDescription className="text-slate-400">Last 30 days of marketing performance</CardDescription>
          </CardHeader>
          <CardContent>
            {!typedAnalytics || typedAnalytics.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 mb-4">
                  <TrendingUp className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No analytics data yet</h3>
                <p className="text-slate-400 text-center max-w-md">
                  Start using your AI agents to generate content and track performance metrics
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Engagement by Type */}
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-4">Engagement by Metric Type</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Engagement</span>
                        <span className="text-sm font-medium text-white">{totalEngagement.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                          style={{
                            width: `${Math.min((totalEngagement / Math.max(totalEngagement, totalReach, totalConversions)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Reach</span>
                        <span className="text-sm font-medium text-white">{totalReach.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                          style={{
                            width: `${Math.min((totalReach / Math.max(totalEngagement, totalReach, totalConversions)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Conversions</span>
                        <span className="text-sm font-medium text-white">{totalConversions.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          style={{
                            width: `${Math.min((totalConversions / Math.max(totalEngagement, totalReach, totalConversions)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-white">Top Performing Content</CardTitle>
              <CardDescription className="text-slate-400">Your best performing pieces this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">Content performance tracking coming soon...</p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-transparent backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-white">AI Recommendations</CardTitle>
              <CardDescription className="text-slate-400">Insights to improve your marketing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">AI-powered recommendations coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
