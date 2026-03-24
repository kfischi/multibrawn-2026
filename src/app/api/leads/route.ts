import { NextRequest, NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadData, source = 'chatbot' } = body;

    if (!leadData) {
      return NextResponse.json({ error: 'Missing leadData' }, { status: 400 });
    }

    // Save to Supabase
    const { data: savedLead, error } = await supabasePublic
      .from('leads')
      .insert({
        session_id: leadData.sessionId || null,
        name: leadData.name || null,
        phone: leadData.phone || null,
        property_type: leadData.propertyType || null,
        location: leadData.location || null,
        dates: leadData.dates || leadData.specificDate || null,
        guest_count: leadData.guestCount || leadData.eventGuests || leadData.shabbatHatanGuests || null,
        budget: leadData.budget || null,
        kashrut: leadData.kashrut || null,
        supervisor: leadData.supervisor || null,
        flow_type: leadData.flowType || 'regular',
        source,
        status: 'new',
        whatsapp_sent: leadData.whatsappSent || false,
        whatsapp_sent_at: leadData.whatsappSent ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase lead insert error:', error);
    }

    // Forward to N8N webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-website' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          source,
          lead: leadData,
          leadId: savedLead?.id,
        }),
        signal: AbortSignal.timeout(8000),
      }).catch(e => console.error('N8N forward error:', e));
    }

    return NextResponse.json({ success: true, leadId: savedLead?.id });
  } catch (error: any) {
    console.error('Leads API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
