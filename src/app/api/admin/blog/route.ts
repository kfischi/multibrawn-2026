import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';

function auth(req: NextRequest) {
  const key = req.headers.get('x-admin-secret') || req.nextUrl.searchParams.get('key');
  return key === ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const slug = body.slug || body.title?.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-א-ת]/g, '')
    .substring(0, 80);
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert({ ...body, slug, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data });
}
