import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';
function auth(req: NextRequest) {
  return req.headers.get('x-admin-secret') === ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('content_queue')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ queue: data ?? [] });
}
