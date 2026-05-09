import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeader = request.headers.get('x-admin-secret');
  if (authHeader !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { status, notes } = await request.json();
  const { error } = await supabaseAdmin.from('leads').update({ status, notes }).eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
