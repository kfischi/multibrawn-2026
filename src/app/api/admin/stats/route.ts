import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'multibrawn-admin-2025';

export async function GET(request: NextRequest) {
  // Simple auth check
  const authHeader = request.headers.get('x-admin-secret');
  const urlKey = request.nextUrl.searchParams.get('key');
  if (authHeader !== ADMIN_SECRET && urlKey !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // Fetch all stats in parallel
  const [
    totalLeads,
    todayLeads,
    weekLeads,
    monthLeads,
    newLeads,
    convertedLeads,
    whatsappSent,
    recentLeads,
    todayEvents,
    chatbotOpens,
    whatsappClicks,
    recentEvents,
  ] = await Promise.all([
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', weekStart),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', monthStart),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'converted'),
    supabaseAdmin.from('leads').select('id', { count: 'exact', head: true }).eq('whatsapp_sent', true),
    supabaseAdmin.from('leads').select('*').order('created_at', { ascending: false }).limit(20),
    supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).gte('created_at', todayStart),
    supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('event_type', 'chatbot_open').gte('created_at', monthStart),
    supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('event_type', 'whatsapp_click').gte('created_at', monthStart),
    supabaseAdmin.from('events').select('*').order('created_at', { ascending: false }).limit(50),
  ]);

  return NextResponse.json({
    stats: {
      totalLeads: totalLeads.count ?? 0,
      todayLeads: todayLeads.count ?? 0,
      weekLeads: weekLeads.count ?? 0,
      monthLeads: monthLeads.count ?? 0,
      newLeads: newLeads.count ?? 0,
      convertedLeads: convertedLeads.count ?? 0,
      whatsappSent: whatsappSent.count ?? 0,
      todayEvents: todayEvents.count ?? 0,
      chatbotOpens: chatbotOpens.count ?? 0,
      whatsappClicks: whatsappClicks.count ?? 0,
    },
    recentLeads: recentLeads.data ?? [],
    recentEvents: recentEvents.data ?? [],
  });
}
