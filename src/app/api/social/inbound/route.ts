import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

// ── Facebook webhook verification (GET) ──────────────────────────────────────
export async function GET(req: NextRequest) {
  const mode      = req.nextUrl.searchParams.get('hub.mode');
  const challenge = req.nextUrl.searchParams.get('hub.challenge');
  const token     = req.nextUrl.searchParams.get('hub.verify_token');

  if (mode === 'subscribe' && token === (process.env.FB_VERIFY_TOKEN || '')) {
    return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ── Inbound webhook from social platforms (POST) ─────────────────────────────
export async function POST(req: NextRequest) {
  let raw: any = {};
  try { raw = await req.json(); } catch { /* ignore malformed bodies */ }

  // Detect platform — prefer explicit query param, fall back to payload shape
  const platform = detectPlatform(req, raw);
  const event_type = detectEventType(raw, platform);

  // Insert immediately — platforms require fast 200 response
  supabaseAdmin.from('inbound_events').insert({
    event_type,
    platform,
    raw_payload: raw,
    processed_status: 'new',
  }).then(({ error }) => {
    if (error) console.error('[inbound_events insert]', error.message);
  });

  return NextResponse.json({ ok: true });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function detectPlatform(req: NextRequest, raw: any): string {
  // 1. Explicit query param: /api/social/inbound?platform=facebook
  const qp = req.nextUrl.searchParams.get('platform');
  if (qp) return qp;

  // 2. Facebook / Instagram — payload contains 'object' field
  if (raw?.object === 'instagram') return 'instagram';
  if (raw?.object === 'page')      return 'facebook';

  // 3. YouTube — payload contains 'subscription'
  if (raw?.subscription || raw?.feed) return 'youtube';

  // 4. TikTok — payload contains 'event' at top level
  if (raw?.event && raw?.data?.video_id) return 'tiktok';

  // 5. User-Agent header as last resort
  const ua = req.headers.get('user-agent') || '';
  if (ua.includes('facebookexternalhi')) return 'facebook';
  if (ua.includes('Googlebot'))          return 'youtube';

  return 'unknown';
}

function detectEventType(raw: any, platform: string): string {
  if (platform === 'facebook' || platform === 'instagram') {
    const entry = raw?.entry?.[0];
    if (entry?.changes?.[0]?.field === 'leadgen') return 'lead';
    if (entry?.changes?.[0]?.field === 'comments') return 'comment';
    if (entry?.messaging) return 'dm';
    return 'webhook';
  }
  if (platform === 'youtube') return raw?.feed ? 'new_video' : 'webhook';
  if (platform === 'tiktok')  return raw?.event || 'webhook';
  return 'webhook';
}
