-- Create function to increment agent votes
CREATE OR REPLACE FUNCTION increment_agent_votes(agent_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.agents
  SET votes = COALESCE(votes, 0) + 1
  WHERE id = agent_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
