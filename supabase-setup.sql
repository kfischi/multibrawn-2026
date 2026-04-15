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

-- ─────────────────────────────────────────────────────────────────────────────
-- SOCIAL MEDIA TABLES
-- Run these in Supabase SQL editor after the tables above
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS social_credentials (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  platform      TEXT NOT NULL CHECK (platform IN ('facebook','instagram','youtube','tiktok')),
  account_label TEXT,
  access_token  TEXT,
  refresh_token TEXT,
  token_expiry  TIMESTAMPTZ,
  page_id       TEXT,
  extra         JSONB DEFAULT '{}',
  user_id       TEXT
);

CREATE TABLE IF NOT EXISTS content_queue (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  media_url        TEXT NOT NULL,
  caption          TEXT,
  target_platforms TEXT[] NOT NULL,
  status           TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','processing','published','partial','failed')),
  published_urls   JSONB DEFAULT '{}',
  error_log        JSONB DEFAULT '{}',
  n8n_execution_id TEXT,
  user_id          TEXT
);

CREATE TABLE IF NOT EXISTS inbound_events (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  event_type       TEXT NOT NULL,
  platform         TEXT NOT NULL,
  raw_payload      JSONB DEFAULT '{}',
  processed_status TEXT NOT NULL DEFAULT 'new'
                   CHECK (processed_status IN ('new','processed','ignored')),
  user_id          TEXT
);

ALTER TABLE social_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue      ENABLE ROW LEVEL SECURITY;
ALTER TABLE inbound_events     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_social_credentials" ON social_credentials FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_content_queue"      ON content_queue      FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_inbound_events"     ON inbound_events     FOR ALL TO service_role USING (true) WITH CHECK (true);

-- anon can SELECT inbound_events so the browser Realtime channel can receive broadcasts
CREATE POLICY "anon_read_inbound_events" ON inbound_events FOR SELECT TO anon USING (true);

-- Enable Realtime for inbound_events
ALTER PUBLICATION supabase_realtime ADD TABLE inbound_events;

CREATE INDEX IF NOT EXISTS idx_content_queue_status      ON content_queue(status);
CREATE INDEX IF NOT EXISTS idx_content_queue_created_at  ON content_queue(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inbound_events_created_at ON inbound_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inbound_events_platform   ON inbound_events(platform);
CREATE INDEX IF NOT EXISTS idx_inbound_events_processed  ON inbound_events(processed_status);
