-- ─────────────────────────────────────────────────────────────────────────────
-- MULTIBRAWN CHECK — טבלאות לשירות התאמת מקומות לאירועים
-- להריץ פעם אחת ב-Supabase SQL editor, אחרי supabase-setup.sql.
--
-- אין כאן הרשאות anon בכלל: כל הגישה לטבלאות האלה עוברת דרך ה-API של האתר
-- עם SUPABASE_SERVICE_ROLE_KEY, כי הן מכילות שם וטלפון של לקוחות.
-- ─────────────────────────────────────────────────────────────────────────────

-- מקומות
CREATE TABLE IF NOT EXISTS check_venues (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  name              TEXT NOT NULL,
  venue_type        TEXT,
  city              TEXT,
  region            TEXT CHECK (region IN ('north','sharon','center','jerusalem','south')),
  capacity_min      INT,
  capacity_max      INT,
  capacity_text     TEXT,
  -- kashrut: קוד מתוך הרשימה ב-src/lib/check/constants.ts. NULL = לא ידוע.
  kashrut           TEXT,
  kashrut_raw       TEXT,                    -- הטקסט כפי שהופיע במקור, לפני אימות
  kashrut_verified  BOOLEAN NOT NULL DEFAULT FALSE,
  contact_name      TEXT,
  contact_phone     TEXT,
  virtual_tour_url  TEXT,
  source_url        TEXT UNIQUE,
  categories        TEXT,
  agreement_signed  BOOLEAN NOT NULL DEFAULT FALSE,
  active            BOOLEAN NOT NULL DEFAULT FALSE,
  notes             TEXT
);

-- בקשות של לקוחות (השאלון)
CREATE TABLE IF NOT EXISTS check_requests (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  requester_type   TEXT NOT NULL DEFAULT 'private' CHECK (requester_type IN ('private','producer')),
  business_name    TEXT,
  event_type       TEXT NOT NULL,
  event_date       DATE,
  date_text        TEXT,
  date_flexible    BOOLEAN NOT NULL DEFAULT FALSE,
  guest_count      INT NOT NULL,
  region           TEXT NOT NULL,           -- קוד אזור, או 'any'
  budget_amount    INT,
  budget_unit      TEXT CHECK (budget_unit IN ('per_guest','total')),
  kashrut          TEXT NOT NULL DEFAULT 'any',
  must_haves       TEXT[] NOT NULL DEFAULT '{}',
  notes            TEXT,
  name             TEXT NOT NULL,
  phone            TEXT NOT NULL,
  summary          TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','approved','rejected','sent','meeting','closed','lost')),
  fee_paid         BOOLEAN NOT NULL DEFAULT FALSE,
  admin_notes      TEXT
);

-- פנייה = בקשה אחת מול מקום אחד. ה-token הוא הקישור האישי של המקום.
CREATE TABLE IF NOT EXISTS check_request_venues (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  request_id               UUID NOT NULL REFERENCES check_requests(id) ON DELETE CASCADE,
  venue_id                 UUID NOT NULL REFERENCES check_venues(id) ON DELETE CASCADE,
  token                    TEXT NOT NULL UNIQUE,
  response                 TEXT NOT NULL DEFAULT 'pending'
                           CHECK (response IN ('pending','available','unavailable')),
  price_text               TEXT,
  venue_note               TEXT,
  responded_at             TIMESTAMPTZ,
  customer_details_shared  BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (request_id, venue_id)
);

ALTER TABLE check_venues         ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_requests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE check_request_venues ENABLE ROW LEVEL SECURITY;

-- DROP לפני CREATE, כדי שאפשר יהיה להריץ את הקובץ שוב בלי שגיאה.
DROP POLICY IF EXISTS "service_role_check_venues"         ON check_venues;
DROP POLICY IF EXISTS "service_role_check_requests"       ON check_requests;
DROP POLICY IF EXISTS "service_role_check_request_venues" ON check_request_venues;

CREATE POLICY "service_role_check_venues"         ON check_venues         FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_check_requests"       ON check_requests       FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "service_role_check_request_venues" ON check_request_venues FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_check_venues_region_active ON check_venues(region, active);
CREATE INDEX IF NOT EXISTS idx_check_requests_created_at  ON check_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_check_requests_status      ON check_requests(status);
CREATE INDEX IF NOT EXISTS idx_check_rv_request           ON check_request_venues(request_id);
