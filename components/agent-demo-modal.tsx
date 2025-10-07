"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Bot, Code, Database, Cloud, MessageSquare, BarChart, Loader2, CheckCircle2, ArrowRight } from "lucide-react"

interface AgentDemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type AgentType = "infrastructure" | "api" | "etl" | "content" | "analytics" | "support" | null
type DemoStep = "select-agent" | "select-platform" | "select-task" | "show-result"

interface Agent {
  id: string
  name: string
  icon: typeof Bot
  color: string
  platforms: { id: string; name: string; icon: string }[]
  tasks: { id: string; title: string; description: string }[]
}

const agents: Record<string, Agent> = {
  infrastructure: {
    id: "infrastructure",
    name: "Infrastructure Agent",
    icon: Cloud,
    color: "cyan",
    platforms: [
      { id: "aws", name: "AWS", icon: "☁️" },
      { id: "azure", name: "Azure", icon: "🔷" },
      { id: "gcp", name: "Google Cloud", icon: "🌐" },
      { id: "kubernetes", name: "Kubernetes", icon: "⚓" },
    ],
    tasks: [
      {
        id: "deploy-vpc",
        title: "Deploy VPC Infrastructure",
        description: "Create a production-ready VPC with public/private subnets, NAT gateways, and security groups",
      },
      {
        id: "setup-cluster",
        title: "Setup Kubernetes Cluster",
        description: "Deploy a managed Kubernetes cluster with auto-scaling and monitoring",
      },
      {
        id: "configure-cdn",
        title: "Configure CDN & Load Balancer",
        description: "Set up global CDN with SSL certificates and intelligent load balancing",
      },
    ],
  },
  api: {
    id: "api",
    name: "API Development Agent",
    icon: Code,
    color: "purple",
    platforms: [
      { id: "rest", name: "REST API", icon: "🔌" },
      { id: "graphql", name: "GraphQL", icon: "📊" },
      { id: "grpc", name: "gRPC", icon: "⚡" },
      { id: "websocket", name: "WebSocket", icon: "🔄" },
    ],
    tasks: [
      {
        id: "build-auth",
        title: "Build Authentication API",
        description: "Create secure JWT-based authentication with OAuth2 support",
      },
      {
        id: "create-crud",
        title: "Generate CRUD Endpoints",
        description: "Build complete CRUD API with validation, pagination, and filtering",
      },
      {
        id: "implement-realtime",
        title: "Implement Real-time API",
        description: "Set up WebSocket connections for live data streaming",
      },
    ],
  },
  etl: {
    id: "etl",
    name: "ETL Pipeline Agent",
    icon: Database,
    color: "cyan",
    platforms: [
      { id: "airflow", name: "Apache Airflow", icon: "🌊" },
      { id: "spark", name: "Apache Spark", icon: "⚡" },
      { id: "databricks", name: "Databricks", icon: "🧱" },
      { id: "snowflake", name: "Snowflake", icon: "❄️" },
    ],
    tasks: [
      {
        id: "build-pipeline",
        title: "Build Data Pipeline",
        description: "Create automated ETL pipeline with data validation and error handling",
      },
      {
        id: "migrate-data",
        title: "Migrate Database",
        description: "Safely migrate data between databases with zero downtime",
      },
      {
        id: "setup-warehouse",
        title: "Setup Data Warehouse",
        description: "Configure data warehouse with optimized schemas and partitioning",
      },
    ],
  },
  content: {
    id: "content",
    name: "Content Creation Agent",
    icon: MessageSquare,
    color: "purple",
    platforms: [
      { id: "blog", name: "Blog Posts", icon: "📝" },
      { id: "social", name: "Social Media", icon: "📱" },
      { id: "email", name: "Email Campaigns", icon: "📧" },
      { id: "ads", name: "Ad Copy", icon: "📢" },
    ],
    tasks: [
      {
        id: "write-blog",
        title: "Write SEO Blog Post",
        description: "Create 2000-word SEO-optimized blog post with research and citations",
      },
      {
        id: "create-campaign",
        title: "Create Social Campaign",
        description: "Generate 30-day social media content calendar with posts and hashtags",
      },
      {
        id: "design-email",
        title: "Design Email Sequence",
        description: "Build 5-email nurture sequence with personalization and CTAs",
      },
    ],
  },
  analytics: {
    id: "analytics",
    name: "Analytics Agent",
    icon: BarChart,
    color: "cyan",
    platforms: [
      { id: "ga", name: "Google Analytics", icon: "📊" },
      { id: "mixpanel", name: "Mixpanel", icon: "📈" },
      { id: "tableau", name: "Tableau", icon: "📉" },
      { id: "powerbi", name: "Power BI", icon: "💼" },
    ],
    tasks: [
      {
        id: "build-dashboard",
        title: "Build Analytics Dashboard",
        description: "Create real-time dashboard with KPIs, trends, and custom visualizations",
      },
      {
        id: "analyze-funnel",
        title: "Analyze Conversion Funnel",
        description: "Deep-dive analysis of user journey with drop-off points and recommendations",
      },
      {
        id: "predict-churn",
        title: "Predict Customer Churn",
        description: "Build ML model to identify at-risk customers and retention strategies",
      },
    ],
  },
  support: {
    id: "support",
    name: "Customer Support Agent",
    icon: Bot,
    color: "purple",
    platforms: [
      { id: "zendesk", name: "Zendesk", icon: "🎫" },
      { id: "intercom", name: "Intercom", icon: "💬" },
      { id: "slack", name: "Slack", icon: "💼" },
      { id: "discord", name: "Discord", icon: "🎮" },
    ],
    tasks: [
      {
        id: "setup-chatbot",
        title: "Setup AI Chatbot",
        description: "Deploy intelligent chatbot with natural language understanding and escalation",
      },
      {
        id: "automate-tickets",
        title: "Automate Ticket Routing",
        description: "Implement smart ticket categorization and priority assignment",
      },
      {
        id: "create-kb",
        title: "Create Knowledge Base",
        description: "Build searchable knowledge base with AI-powered article suggestions",
      },
    ],
  },
}

const mockResults: Record<string, string> = {
  "deploy-vpc": `✅ VPC Infrastructure Deployed Successfully!

📦 Resources Created:
• VPC: vpc-0a1b2c3d4e5f (10.0.0.0/16)
• Public Subnets: 3 across availability zones
• Private Subnets: 3 across availability zones
• NAT Gateways: 3 (high availability)
• Internet Gateway: igw-0a1b2c3d
• Route Tables: 6 (configured)
• Security Groups: 5 (web, app, db, bastion, alb)

🔒 Security Features:
• Network ACLs configured
• Flow logs enabled
• VPC endpoints for S3 and DynamoDB
• Private DNS enabled

⏱️ Deployment Time: 4 minutes 32 seconds
💰 Estimated Monthly Cost: $145.50`,

  "setup-cluster": `✅ Kubernetes Cluster Ready!

🎯 Cluster Details:
• Cluster Name: production-k8s-cluster
• Version: 1.28.3
• Nodes: 3 (t3.large)
• Auto-scaling: Enabled (1-10 nodes)
• Region: us-east-1

📊 Installed Components:
• Ingress Controller (NGINX)
• Cert Manager (Let's Encrypt)
• Prometheus & Grafana
• EFK Stack (Logging)
• Cluster Autoscaler

🔐 Security:
• RBAC enabled
• Network policies configured
• Pod security policies active
• Secrets encrypted at rest

⏱️ Setup Time: 8 minutes 15 seconds
💰 Estimated Monthly Cost: $285.00`,

  "configure-cdn": `✅ CDN & Load Balancer Configured!

🌐 CDN Configuration:
• Distribution ID: E1A2B3C4D5E6F7
• Edge Locations: 225+ worldwide
• SSL Certificate: *.yourdomain.com
• HTTP/2 & HTTP/3 enabled
• Brotli compression active

⚖️ Load Balancer:
• Type: Application Load Balancer
• Health checks: Configured
• Target groups: 2 (blue/green)
• Sticky sessions: Enabled
• WAF: Integrated

📈 Performance:
• Cache hit ratio: 85%+
• Global latency: <50ms
• DDoS protection: Active

⏱️ Configuration Time: 3 minutes 45 seconds
💰 Estimated Monthly Cost: $95.00`,

  "build-auth": `✅ Authentication API Built!

🔐 API Endpoints Created:
• POST /auth/register - User registration
• POST /auth/login - JWT authentication
• POST /auth/refresh - Token refresh
• POST /auth/logout - Session termination
• GET /auth/me - Current user profile
• POST /auth/forgot-password - Password reset
• POST /auth/verify-email - Email verification

🛡️ Security Features:
• JWT with RS256 signing
• Refresh token rotation
• Rate limiting (100 req/min)
• Password hashing (bcrypt)
• Email verification required
• OAuth2 providers: Google, GitHub

📚 Documentation:
• OpenAPI/Swagger spec generated
• Postman collection created
• Integration tests: 45 passing

⏱️ Development Time: 12 minutes
💰 Infrastructure Cost: $0.05/1000 requests`,

  "create-crud": `✅ CRUD API Generated!

📋 Endpoints Created:
• GET /api/resources - List with pagination
• GET /api/resources/:id - Get single resource
• POST /api/resources - Create new resource
• PUT /api/resources/:id - Update resource
• PATCH /api/resources/:id - Partial update
• DELETE /api/resources/:id - Delete resource

✨ Features Included:
• Input validation (Zod schemas)
• Pagination (limit, offset, cursor)
• Filtering & search
• Sorting (multi-field)
• Field selection
• Rate limiting
• Request logging
• Error handling

📊 Database:
• Schema migrations created
• Indexes optimized
• Soft deletes enabled

⏱️ Generation Time: 6 minutes 30 seconds`,

  "implement-realtime": `✅ Real-time API Implemented!

🔄 WebSocket Server:
• Protocol: WSS (secure)
• Port: 443
• Max connections: 10,000
• Heartbeat: 30s interval

📡 Features:
• Room-based messaging
• Private channels
• Presence tracking
• Message history
• Reconnection handling
• Binary data support

🎯 Event Types:
• user.joined
• user.left
• message.new
• message.updated
• message.deleted
• typing.start
• typing.stop

📈 Performance:
• Latency: <10ms
• Throughput: 50k msg/sec
• Auto-scaling enabled

⏱️ Implementation Time: 15 minutes`,

  "build-pipeline": `✅ ETL Pipeline Built!

🌊 Pipeline Configuration:
• Orchestrator: Apache Airflow
• Schedule: Daily at 2 AM UTC
• Retry policy: 3 attempts
• SLA: 4 hours
• Monitoring: Enabled

📊 Pipeline Stages:
1. Extract: Pull from 5 data sources
2. Transform: Clean, validate, enrich
3. Load: Write to data warehouse
4. Validate: Data quality checks
5. Notify: Slack alerts on completion

🔍 Data Quality:
• Schema validation
• Null checks
• Duplicate detection
• Referential integrity
• Custom business rules

📈 Performance:
• Processing: 10M rows/hour
• Parallelization: 8 workers
• Incremental loads enabled

⏱️ Build Time: 18 minutes
💰 Daily Run Cost: $2.50`,

  "migrate-data": `✅ Database Migration Complete!

📦 Migration Summary:
• Source: PostgreSQL 12
• Target: PostgreSQL 15
• Records migrated: 15.2M
• Tables: 47
• Indexes: 156
• Constraints: 89

✅ Migration Steps:
1. Schema analysis ✓
2. Pre-migration validation ✓
3. Data extraction ✓
4. Data transformation ✓
5. Data loading ✓
6. Index rebuilding ✓
7. Constraint validation ✓
8. Post-migration testing ✓

🔒 Safety Measures:
• Full backup created
• Rollback plan ready
• Zero downtime achieved
• Data integrity verified

📊 Performance:
• Migration speed: 850k rows/min
• Downtime: 0 seconds
• Data loss: 0 records

⏱️ Total Time: 22 minutes`,

  "setup-warehouse": `✅ Data Warehouse Configured!

🏢 Warehouse Details:
• Platform: Snowflake
• Size: X-Large (16 nodes)
• Storage: 5 TB provisioned
• Auto-suspend: 5 minutes
• Auto-resume: Enabled

📊 Schema Design:
• Star schema implemented
• Fact tables: 8
• Dimension tables: 15
• Materialized views: 12
• Partitioning: Date-based

⚡ Optimizations:
• Clustering keys defined
• Micro-partitions optimized
• Query result caching
• Automatic statistics

🔐 Security:
• Row-level security
• Column masking
• Audit logging
• Encryption at rest

⏱️ Setup Time: 25 minutes
💰 Estimated Monthly Cost: $1,250`,

  "write-blog": `✅ SEO Blog Post Created!

📝 Article Details:
• Title: "10 AI Strategies to 10x Your Business Growth in 2025"
• Word count: 2,247 words
• Reading time: 9 minutes
• SEO score: 94/100

🎯 SEO Optimization:
• Primary keyword: "AI business growth"
• Secondary keywords: 8 integrated
• Meta description: Optimized
• Header structure: H1-H4
• Internal links: 6
• External links: 12 (authoritative)
• Alt text: All images
• Schema markup: Article

📊 Content Quality:
• Readability: Grade 8 (optimal)
• Unique content: 100%
• Plagiarism check: Passed
• Fact-checking: 15 sources cited

🖼️ Media:
• Featured image: Generated
• Infographics: 3 created
• Screenshots: 5 included

⏱️ Creation Time: 8 minutes`,

  "create-campaign": `✅ Social Media Campaign Created!

📅 30-Day Content Calendar:
• Total posts: 90 (3/day)
• Platforms: LinkedIn, Twitter, Instagram
• Themes: 6 content pillars
• Hashtags: 150+ researched

📱 Content Breakdown:
• Educational: 40%
• Promotional: 20%
• Engaging: 25%
• User-generated: 15%

✨ Assets Created:
• Graphics: 45 designed
• Videos: 12 scripts
• Carousels: 8 multi-slide
• Stories: 30 templates

📊 Strategy:
• Best posting times identified
• Competitor analysis included
• Engagement tactics defined
• A/B testing plan ready

🎯 Expected Results:
• Reach: 50k-100k
• Engagement rate: 4-6%
• Follower growth: 15-20%

⏱️ Creation Time: 14 minutes`,

  "design-email": `✅ Email Sequence Designed!

📧 5-Email Nurture Sequence:
1. Welcome & Introduction (Day 0)
2. Problem Awareness (Day 2)
3. Solution Education (Day 5)
4. Social Proof & Case Studies (Day 8)
5. Special Offer & CTA (Day 12)

✨ Features:
• Personalization: 12 merge tags
• Dynamic content blocks
• Mobile-responsive design
• A/B test variants: 2 per email
• Unsubscribe flow

🎨 Design:
• Brand colors applied
• Custom templates
• Hero images: 5 created
• CTA buttons optimized

📊 Optimization:
• Subject lines: 3 variants each
• Preview text optimized
• Send time optimization
• Spam score: 0.5/10 (excellent)

🎯 Expected Performance:
• Open rate: 35-45%
• Click rate: 8-12%
• Conversion rate: 3-5%

⏱️ Design Time: 11 minutes`,

  "build-dashboard": `✅ Analytics Dashboard Built!

📊 Dashboard Components:
• KPI Cards: 8 metrics
• Line charts: 4 trends
• Bar charts: 3 comparisons
• Pie charts: 2 distributions
• Heatmap: User activity
• Funnel: Conversion flow
• Table: Top performers

🎯 Key Metrics:
• Revenue (real-time)
• Active users (live)
• Conversion rate
• Average order value
• Customer lifetime value
• Churn rate
• NPS score
• Traffic sources

⚡ Features:
• Auto-refresh: 30 seconds
• Date range picker
• Filters: 12 dimensions
• Export: PDF, CSV, Excel
• Scheduled reports
• Alerts: 5 configured

📱 Responsive:
• Desktop optimized
• Tablet friendly
• Mobile accessible

⏱️ Build Time: 16 minutes`,

  "analyze-funnel": `✅ Conversion Funnel Analysis Complete!

📊 Funnel Overview:
• Total visitors: 125,450
• Stage 1 (Landing): 100%
• Stage 2 (Sign up): 42% (-58%)
• Stage 3 (Onboarding): 31% (-11%)
• Stage 4 (First action): 18% (-13%)
• Stage 5 (Conversion): 12% (-6%)

🔍 Key Findings:
1. Major drop-off at sign-up (58%)
   → Form too long (12 fields)
   → No social login options
   
2. Onboarding friction (11% drop)
   → Tutorial too complex
   → No skip option
   
3. First action barrier (13% drop)
   → Unclear next steps
   → Missing guidance

💡 Recommendations:
• Reduce sign-up to 4 fields (+15% est.)
• Add Google/LinkedIn OAuth (+8% est.)
• Simplify onboarding flow (+5% est.)
• Add progress indicators (+3% est.)
• Implement tooltips (+4% est.)

📈 Projected Impact:
• Current conversion: 12%
• Optimized conversion: 19.2%
• Revenue increase: +60%

⏱️ Analysis Time: 9 minutes`,

  "predict-churn": `✅ Churn Prediction Model Built!

🤖 Model Details:
• Algorithm: XGBoost
• Training data: 50k customers
• Features: 45 variables
• Accuracy: 89.3%
• Precision: 87.1%
• Recall: 91.2%
• F1 Score: 89.1%

📊 Top Churn Indicators:
1. Login frequency (importance: 0.23)
2. Feature usage decline (0.19)
3. Support tickets (0.16)
4. Payment failures (0.14)
5. Session duration (0.11)

🎯 Risk Segments:
• High risk: 847 customers (8.5%)
• Medium risk: 1,523 customers (15.3%)
• Low risk: 7,630 customers (76.2%)

💡 Retention Strategies:
• High risk: Personal outreach + 20% discount
• Medium risk: Feature education emails
• Low risk: Engagement campaigns

📈 Expected Results:
• Churn reduction: 35-45%
• Revenue saved: $285k/year
• ROI: 12.5x

⏱️ Model Training: 19 minutes`,

  "setup-chatbot": `✅ AI Chatbot Deployed!

🤖 Chatbot Configuration:
• Platform: Custom NLP engine
• Languages: English, Spanish, French
• Channels: Web, Mobile, Slack
• Availability: 24/7
• Response time: <2 seconds

🧠 AI Capabilities:
• Intent recognition: 95% accuracy
• Entity extraction: 42 types
• Sentiment analysis: Real-time
• Context retention: 10 turns
• Fallback to human: Smart routing

💬 Conversation Flows:
• Product inquiries: 15 flows
• Technical support: 22 flows
• Billing questions: 8 flows
• Account management: 12 flows
• General FAQ: 50+ topics

📊 Knowledge Base:
• Articles: 250 indexed
• FAQs: 180 answered
• Auto-learning: Enabled
• Confidence threshold: 85%

🎯 Expected Performance:
• Resolution rate: 70-80%
• Customer satisfaction: 4.5/5
• Cost savings: $45k/year

⏱️ Setup Time: 13 minutes`,

  "automate-tickets": `✅ Ticket Automation Configured!

🎫 Automation Rules:
• Auto-categorization: 15 categories
• Priority assignment: 4 levels
• Smart routing: 8 teams
• SLA tracking: Enabled
• Auto-responses: 12 templates

🤖 AI Features:
• Category prediction: 92% accuracy
• Priority detection: 88% accuracy
• Sentiment analysis: Real-time
• Duplicate detection: Automatic
• Similar ticket suggestions

📊 Routing Logic:
• Technical issues → Engineering
• Billing questions → Finance
• Feature requests → Product
• Bug reports → QA
• General inquiries → Support

⚡ Performance Improvements:
• First response time: -65%
• Resolution time: -40%
• Agent productivity: +55%
• Customer satisfaction: +28%

📈 Metrics:
• Tickets/day: 450 processed
• Auto-resolved: 35%
• Correctly routed: 94%

⏱️ Configuration Time: 10 minutes`,

  "create-kb": `✅ Knowledge Base Created!

📚 Content Structure:
• Categories: 12 main topics
• Articles: 185 published
• FAQs: 220 questions
• Tutorials: 45 step-by-step
• Videos: 28 embedded

🔍 Search Features:
• Full-text search
• Fuzzy matching
• Synonym support
• Auto-complete
• Related articles
• Popular searches

🤖 AI Enhancements:
• Article suggestions: Context-aware
• Smart search: Intent-based
• Auto-tagging: ML-powered
• Content gaps: Identified
• Usage analytics: Real-time

📊 Organization:
• Hierarchical structure
• Cross-linking: 450+ links
• Version control: Enabled
• Multi-language: 3 languages
• Access control: Role-based

🎯 User Experience:
• Mobile-responsive
• Dark mode support
• Feedback system
• Bookmark feature
• Print-friendly

⏱️ Creation Time: 21 minutes`,
}

export function AgentDemoModal({ open, onOpenChange }: AgentDemoModalProps) {
  const [step, setStep] = useState<DemoStep>("select-agent")
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string>("")

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId as AgentType)
    setStep("select-platform")
  }

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId)
    setStep("select-task")
  }

  const handleTaskSelect = async (taskId: string) => {
    setSelectedTask(taskId)
    setIsProcessing(true)
    setStep("show-result")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setResult(mockResults[taskId] || "Task completed successfully!")
    setIsProcessing(false)
  }

  const handleReset = () => {
    setStep("select-agent")
    setSelectedAgent(null)
    setSelectedPlatform(null)
    setSelectedTask(null)
    setIsProcessing(false)
    setResult("")
  }

  const handleClose = () => {
    handleReset()
    onOpenChange(false)
  }

  const currentAgent = selectedAgent ? agents[selectedAgent] : null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 border-cyan-500/20 p-0">
        <div className="relative">
          {/* Gradient border effect */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-800">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {step === "select-agent" && "Select an AI Agent"}
                {step === "select-platform" && `${currentAgent?.name} - Choose Platform`}
                {step === "select-task" && `${currentAgent?.name} - Select Task`}
                {step === "show-result" && `${currentAgent?.name} - Result`}
              </h2>
              <p className="text-slate-400 text-sm">
                {step === "select-agent" && "Choose an agent to see a live demo"}
                {step === "select-platform" && "Select the platform or technology"}
                {step === "select-task" && "Pick a task for the agent to complete"}
                {step === "show-result" && "Agent execution complete"}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Select Agent */}
            {step === "select-agent" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(agents).map((agent) => (
                  <Card
                    key={agent.id}
                    className={`border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-${agent.color}-500/30 transition-all hover:scale-105 cursor-pointer group`}
                    onClick={() => handleAgentSelect(agent.id)}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${agent.color}-500/10 mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <agent.icon className={`h-6 w-6 text-${agent.color}-400`} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
                      <p className="text-sm text-slate-400">Click to see demo →</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 2: Select Platform */}
            {step === "select-platform" && currentAgent && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {currentAgent.platforms.map((platform) => (
                    <Button
                      key={platform.id}
                      onClick={() => handlePlatformSelect(platform.id)}
                      className="h-24 flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 transition-all"
                    >
                      <span className="text-3xl">{platform.icon}</span>
                      <span className="text-sm font-medium text-white">{platform.name}</span>
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-slate-700 text-slate-400 bg-transparent"
                >
                  ← Back to Agents
                </Button>
              </div>
            )}

            {/* Step 3: Select Task */}
            {step === "select-task" && currentAgent && (
              <div>
                <div className="space-y-4 mb-6">
                  {currentAgent.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="border-slate-800/50 bg-slate-900/50 backdrop-blur hover:border-cyan-500/30 transition-all cursor-pointer group"
                      onClick={() => handleTaskSelect(task.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {task.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">{task.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-cyan-400 transition-colors ml-4 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setStep("select-platform")}
                  className="border-slate-700 text-slate-400"
                >
                  ← Back to Platforms
                </Button>
              </div>
            )}

            {/* Step 4: Show Result */}
            {step === "show-result" && (
              <div>
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mb-6" />
                    <h3 className="text-xl font-semibold text-white mb-2">Agent Working...</h3>
                    <p className="text-slate-400">Processing your request</p>
                  </div>
                ) : (
                  <div>
                    <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-transparent backdrop-blur mb-6">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 flex-shrink-0">
                            <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-2">Task Completed Successfully!</h3>
                            <p className="text-slate-400 text-sm">
                              The agent has finished processing your request. Here are the results:
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-800">
                          <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                            {result}
                          </pre>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleReset}
                        className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold"
                      >
                        Try Another Demo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleClose}
                        className="border-slate-700 text-slate-400 bg-transparent"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
