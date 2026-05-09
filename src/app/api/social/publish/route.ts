import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';
function auth(req: NextRequest) {
  return req.headers.get('x-admin-secret') === ADMIN_SECRET;
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { media_url, caption, target_platforms } = body;

  if (!media_url || !Array.isArray(target_platforms) || target_platforms.length === 0) {
    return NextResponse.json({ error: 'media_url and target_platforms (non-empty array) required' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('content_queue')
    .insert({ media_url, caption: caption || '', target_platforms, status: 'pending' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fire-and-forget to n8n outbound workflow (mirrors /api/leads pattern)
  const webhookUrl = process.env.N8N_OUTBOUND_WEBHOOK_URL;
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-social' },
      body: JSON.stringify({ jobId: data.id, media_url, caption, target_platforms }),
      signal: AbortSignal.timeout(8000),
    }).catch(e => console.error('[n8n social outbound]', e));
  }

  return NextResponse.json({ success: true, jobId: data.id });
}
