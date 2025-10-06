-- Seed initial AI agents
INSERT INTO public.agents (name, description, category, price_tier, capabilities, is_featured) VALUES
  (
    'Content Strategist AI',
    'Develops comprehensive content strategies aligned with your brand goals and audience insights.',
    'Content Creation',
    'professional',
    ARRAY['content planning', 'SEO optimization', 'audience analysis', 'editorial calendar'],
    true
  ),
  (
    'Social Media Manager AI',
    'Automates social media posting, engagement tracking, and community management across platforms.',
    'Social Media',
    'starter',
    ARRAY['post scheduling', 'engagement tracking', 'hashtag optimization', 'multi-platform support'],
    true
  ),
  (
    'Email Campaign AI',
    'Creates personalized email campaigns with A/B testing and performance optimization.',
    'Email Marketing',
    'professional',
    ARRAY['email copywriting', 'A/B testing', 'segmentation', 'automation workflows'],
    true
  ),
  (
    'SEO Optimizer AI',
    'Analyzes and optimizes your content for search engines with keyword research and technical SEO.',
    'SEO',
    'professional',
    ARRAY['keyword research', 'on-page SEO', 'competitor analysis', 'technical audits'],
    false
  ),
  (
    'Ad Copy Generator AI',
    'Generates high-converting ad copy for Google, Facebook, LinkedIn, and other platforms.',
    'Advertising',
    'starter',
    ARRAY['ad copywriting', 'headline generation', 'CTA optimization', 'platform-specific formats'],
    true
  ),
  (
    'Analytics Insights AI',
    'Provides deep analytics and actionable insights from your marketing data.',
    'Analytics',
    'enterprise',
    ARRAY['data visualization', 'predictive analytics', 'ROI tracking', 'custom reports'],
    false
  ),
  (
    'Brand Voice AI',
    'Maintains consistent brand voice across all content and channels.',
    'Brand Management',
    'professional',
    ARRAY['tone analysis', 'style guide enforcement', 'brand consistency', 'voice training'],
    false
  ),
  (
    'Competitor Research AI',
    'Monitors competitor activities and provides strategic recommendations.',
    'Research',
    'enterprise',
    ARRAY['competitor tracking', 'market analysis', 'trend identification', 'strategic insights'],
    false
  );
