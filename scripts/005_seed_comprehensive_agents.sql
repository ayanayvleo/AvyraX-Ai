-- Clear existing agents and seed comprehensive agent list
TRUNCATE public.agents CASCADE;

-- MARKETING AGENTS - Content Creation
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section, best_for, setup_process, typical_output) VALUES
  (
    'Blog Writer Agent',
    'Creates SEO-optimized blog posts and articles in your brand voice',
    'Content Creation',
    'starter',
    'subscription',
    'Included in: All Plans',
    ARRAY['2,000-5,000 word articles', 'SEO keyword integration', 'Research & fact-checking', 'Multiple drafts & revisions'],
    '✍️',
    true,
    'marketing',
    ARRAY['B2B companies needing thought leadership content', 'SaaS companies with product blogs', 'E-commerce brands creating buying guides', 'Agencies managing multiple client blogs'],
    ARRAY['Initial consultation to understand your brand', 'Provide sample content and brand guidelines', 'Agent generates test article for approval', 'Refine and deploy', 'Ongoing: Submit topics, receive drafts for review'],
    'Starter Plan: 4-8 blog posts/month, Growth Plan: 12-20 blog posts/month, Scale Plan: Unlimited blog posts'
  ),
  (
    'Social Media Agent',
    'Generates engaging social content for all major platforms',
    'Content Creation',
    'starter',
    'subscription',
    'Included in: All Plans',
    ARRAY['Instagram, Twitter, LinkedIn', 'Optimal posting times', 'Hashtag strategy', 'Multi-format content'],
    '📱',
    true,
    'marketing',
    ARRAY['Brands needing consistent social presence', 'Agencies managing multiple accounts', 'Startups building community'],
    NULL,
    NULL
  ),
  (
    'Email Copywriter Agent',
    'Crafts high-converting email campaigns and newsletters',
    'Email Marketing',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['Welcome sequences', 'Promotional emails', 'Subject line A/B testing', 'Personalization'],
    '📧',
    true,
    'marketing',
    NULL,
    NULL,
    NULL
  ),
  (
    'Video Script Agent',
    'Writes engaging video scripts for YouTube, TikTok, Reels',
    'Content Creation',
    'professional',
    'addon',
    'Add-on: +$497/mo',
    ARRAY['Hook-driven scripts', '30sec to 10min formats', 'Viral-optimized structure', 'Platform-specific'],
    '🎬',
    false,
    'marketing',
    NULL,
    NULL,
    NULL
  );

-- MARKETING AGENTS - Advertising & Campaign
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section) VALUES
  (
    'Ad Campaign Agent',
    'Generates ad copy variations for Facebook, Instagram, LinkedIn',
    'Advertising',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['20-100 ad variations', 'A/B testing ready', 'Multiple formats', 'Platform optimization'],
    '🎯',
    true,
    'marketing'
  ),
  (
    'Google Ads Agent',
    'Creates & optimizes Google Ads campaigns for maximum ROI',
    'Advertising',
    'enterprise',
    'addon',
    'Add-on: +$897/mo',
    ARRAY['Search, Display, Shopping ads', 'Keyword research', 'Bid optimization suggestions', 'Quality score improvement'],
    '💰',
    false,
    'marketing'
  ),
  (
    'Landing Page Agent',
    'Writes high-converting landing page copy and CTAs',
    'Advertising',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['Hero sections', 'Feature descriptions', 'Trust signals', 'CTA optimization'],
    '📣',
    false,
    'marketing'
  ),
  (
    'Creative Brief Agent',
    'Generates detailed briefs for designers and video editors',
    'Brand Management',
    'enterprise',
    'subscription',
    'Included in: Scale only',
    ARRAY['Campaign objectives', 'Visual direction', 'Asset specifications', 'Brand guidelines'],
    '🎨',
    false,
    'marketing'
  );

-- MARKETING AGENTS - Analytics & Research
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section) VALUES
  (
    'Analytics Reporter Agent',
    'Generates comprehensive marketing reports with actionable insights',
    'Analytics',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['Weekly/monthly reports', 'Cross-platform data', 'Trend identification', 'Performance metrics'],
    '📊',
    true,
    'marketing'
  ),
  (
    'Competitor Research Agent',
    'Monitors competitors and provides strategic intelligence',
    'Research',
    'enterprise',
    'addon',
    'Add-on: +$697/mo',
    ARRAY['Content analysis', 'Ad monitoring', 'Positioning insights', 'Market trends'],
    '🔍',
    false,
    'marketing'
  ),
  (
    'Audience Insights Agent',
    'Analyzes target audiences and creates detailed personas',
    'Research',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['Demographic research', 'Behavioral patterns', 'Platform preferences', 'Persona creation'],
    '🎯',
    false,
    'marketing'
  ),
  (
    'Performance Optimizer Agent',
    'Continuously monitors campaigns and suggests improvements',
    'Analytics',
    'enterprise',
    'subscription',
    'Included in: Scale only',
    ARRAY['A/B test analysis', 'Budget allocation advice', 'Real-time alerts', 'ROI optimization'],
    '📈',
    false,
    'marketing'
  );

-- MARKETING AGENTS - SEO & Technical
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section) VALUES
  (
    'SEO Optimizer Agent',
    'Optimizes content for search engines and improves rankings',
    'SEO',
    'professional',
    'addon',
    'Add-on: +$497/mo',
    ARRAY['Keyword research', 'Meta descriptions', 'Internal linking strategy', 'Technical SEO'],
    '🔎',
    false,
    'marketing'
  ),
  (
    'Content Strategist Agent',
    'Plans comprehensive content calendars and strategies',
    'Content Creation',
    'professional',
    'subscription',
    'Included in: Growth, Scale',
    ARRAY['Editorial calendar', 'Topic clustering', 'Gap analysis', 'Content pillars'],
    '🗂️',
    true,
    'marketing'
  );

-- TECHNICAL AGENTS - Architecture & Development
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section) VALUES
  (
    'Solution Architect Agent',
    'Designs scalable system architectures and tech stacks',
    'Architecture',
    'enterprise',
    'project',
    'Starting at: $4,997/project',
    ARRAY['Cloud architecture (AWS/Azure)', 'Database design', 'Microservices planning', 'Cost optimization'],
    '🏗️',
    true,
    'technical'
  ),
  (
    'Full-Stack Developer Agent',
    'Builds APIs, frontends, and backend systems',
    'Development',
    'enterprise',
    'project',
    'Starting at: $7,500/project',
    ARRAY['React, Next.js, Node.js', 'REST/GraphQL APIs', 'Database integration', 'Code review & optimization'],
    '👨‍💻',
    true,
    'technical'
  ),
  (
    'Technical Writer Agent',
    'Creates comprehensive technical documentation and API guides',
    'Documentation',
    'professional',
    'retainer',
    'Retainer: $2,000/mo',
    ARRAY['API documentation', 'User guides', 'Architecture diagrams', 'README files'],
    '📚',
    false,
    'technical'
  ),
  (
    'Security Auditor Agent',
    'Reviews code and architecture for security vulnerabilities',
    'Security',
    'enterprise',
    'project',
    'Starting at: $3,500/audit',
    ARRAY['OWASP compliance check', 'Penetration test planning', 'Security best practices', 'Compliance reviews (GDPR, etc)'],
    '🔒',
    false,
    'technical'
  ),
  (
    'Database Designer Agent',
    'Designs efficient database schemas and optimization strategies',
    'Database',
    'professional',
    'project',
    'Starting at: $2,500/project',
    ARRAY['SQL/NoSQL design', 'Performance optimization', 'Migration planning', 'Data modeling'],
    '🗄️',
    false,
    'technical'
  ),
  (
    'DevOps Engineer Agent',
    'Sets up CI/CD pipelines and infrastructure automation',
    'DevOps',
    'enterprise',
    'retainer',
    'Retainer: $3,500/mo',
    ARRAY['Docker/Kubernetes setup', 'GitHub Actions workflows', 'Infrastructure as Code', 'Monitoring & logging'],
    '🔧',
    false,
    'technical'
  );

-- COMING SOON AGENTS
INSERT INTO public.agents (name, description, category, price_tier, pricing_model, pricing_details, capabilities, icon_emoji, is_featured, section, votes) VALUES
  (
    'Podcast Producer Agent',
    'Produces and edits podcast episodes with show notes and transcripts',
    'Content Creation',
    'professional',
    'coming_soon',
    'Coming Q1 2026',
    ARRAY['Episode editing', 'Show notes generation', 'Transcription', 'Distribution'],
    '🎙️',
    false,
    'coming_soon',
    234
  ),
  (
    'E-commerce Specialist Agent',
    'Optimizes product listings and manages e-commerce campaigns',
    'E-commerce',
    'professional',
    'coming_soon',
    'Coming Q2 2026',
    ARRAY['Product descriptions', 'Category optimization', 'Pricing strategy', 'Inventory insights'],
    '🛍️',
    false,
    'coming_soon',
    189
  );
