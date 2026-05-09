import { NextRequest, NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/server';
import { sendLeadEmail } from '@/lib/email';

interface CollectedData {
  propertyType?: string;
  guestCount?: string;
  dates?: string;
  region?: string;
  budget?: string;
  name?: string;
  phone?: string;
}

export async function POST(request: NextRequest) {
  let collected: CollectedData = {};

  try {
    const body = await request.json();
    collected = body.collected || {};
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  // 1. Save to Supabase leads table
  try {
    await supabasePublic.from('leads').insert({
      name:          collected.name          || null,
      phone:         collected.phone         || null,
      property_type: collected.propertyType  || null,
      location:      collected.region        || null,
      dates:         collected.dates         || null,
      guest_count:   collected.guestCount    || null,
      budget:        collected.budget        || null,
      source:        'chatbot_form',
      status:        'new',
      flow_type:     'guided',
    });
  } catch (e) {
    console.error('Supabase notify error:', e);
  }

  // 2. Send email notification (non-blocking)
  sendLeadEmail({
    name:         collected.name,
    phone:        collected.phone,
    propertyType: collected.propertyType,
    location:     collected.region,
    dates:        collected.dates,
    guestCount:   collected.guestCount,
    budget:       collected.budget,
    source:       'chatbot_form',
  }).catch(e => console.error('Email error:', e));

  // 3. Forward to N8N (non-blocking)
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-chatbot' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'chatbot_form',
        lead: collected,
      }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
