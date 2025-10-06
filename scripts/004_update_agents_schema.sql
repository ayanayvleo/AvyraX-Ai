-- Add new columns to agents table for enhanced pricing and details
ALTER TABLE public.agents
ADD COLUMN IF NOT EXISTS pricing_model TEXT DEFAULT 'subscription',
ADD COLUMN IF NOT EXISTS pricing_details TEXT,
ADD COLUMN IF NOT EXISTS icon_emoji TEXT,
ADD COLUMN IF NOT EXISTS section TEXT DEFAULT 'marketing',
ADD COLUMN IF NOT EXISTS best_for TEXT[],
ADD COLUMN IF NOT EXISTS setup_process TEXT[],
ADD COLUMN IF NOT EXISTS typical_output TEXT,
ADD COLUMN IF NOT EXISTS success_stories JSONB,
ADD COLUMN IF NOT EXISTS votes INTEGER DEFAULT 0;

-- Add check constraint for pricing_model
ALTER TABLE public.agents
ADD CONSTRAINT agents_pricing_model_check 
CHECK (pricing_model IN ('subscription', 'project', 'retainer', 'addon', 'coming_soon'));

-- Add check constraint for section
ALTER TABLE public.agents
ADD CONSTRAINT agents_section_check 
CHECK (section IN ('marketing', 'technical', 'coming_soon'));
