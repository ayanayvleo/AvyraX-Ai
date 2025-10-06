import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Calendar, Edit, Trash2, ExternalLink } from "lucide-react"

interface Content {
  id: string
  user_id: string
  agent_id: string | null
  title: string
  content_type: string
  content_text: string
  platform: string | null
  status: string
  scheduled_for: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

const contentTypeColors: Record<string, string> = {
  blog: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  social: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  email: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  ad: "bg-green-500/10 text-green-400 border-green-500/20",
}

const statusColors: Record<string, string> = {
  draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  published: "bg-green-500/10 text-green-400 border-green-500/20",
  scheduled: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
}

export default async function ContentLibraryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user's content
  const { data: content } = await supabase
    .from("content")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })

  const typedContent = content as Content[] | null

  // Get stats
  const draftCount = typedContent?.filter((c) => c.status === "draft").length || 0
  const publishedCount = typedContent?.filter((c) => c.status === "published").length || 0
  const scheduledCount = typedContent?.filter((c) => c.status === "scheduled").length || 0

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Content Library</h1>
            <p className="text-slate-400">Manage all your AI-generated marketing content</p>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Create Content
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Drafts</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{draftCount}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Published</CardTitle>
              <ExternalLink className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{publishedCount}</div>
            </CardContent>
          </Card>

          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{scheduledCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Content List */}
        {!typedContent || typedContent.length === 0 ? (
          <Card className="border-slate-800/50 bg-slate-900/50 backdrop-blur">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No content yet</h3>
              <p className="text-slate-400 mb-6 text-center max-w-md">
                Start creating content with your AI agents to see it here
              </p>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Content
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {typedContent.map((item) => (
              <Card
                key={item.id}
                className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className={contentTypeColors[item.content_type] || contentTypeColors.blog}
                        >
                          {item.content_type}
                        </Badge>
                        <Badge variant="outline" className={statusColors[item.status] || statusColors.draft}>
                          {item.status}
                        </Badge>
                        {item.platform && (
                          <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                            {item.platform}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-white mb-1">{item.title}</CardTitle>
                      <CardDescription className="text-slate-400 line-clamp-2">{item.content_text}</CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                    {item.scheduled_for && (
                      <div className="flex items-center gap-1">
                        <span>Scheduled for:</span>
                        <span className="text-cyan-400">{new Date(item.scheduled_for).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
