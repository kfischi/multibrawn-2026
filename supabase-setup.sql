-- Run this in your Supabase SQL editor to set up the CRM tables

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT,
  name TEXT,
  phone TEXT,
  property_type TEXT,
  location TEXT,
  dates TEXT,
  guest_count TEXT,
  budget TEXT,
  kashrut TEXT,
  supervisor TEXT,
  flow_type TEXT DEFAULT 'regular',
  source TEXT DEFAULT 'chatbot',
  status TEXT DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','converted','lost')),
  notes TEXT,
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_sent_at TIMESTAMPTZ
);

-- EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event_type TEXT NOT NULL,
  session_id TEXT,
  page TEXT,
  metadata JSONB DEFAULT '{}'
);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "service_role_leads" ON leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_events" ON events FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow anon INSERT only (for website to save data)
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_events" ON events FOR INSERT TO anon WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);
