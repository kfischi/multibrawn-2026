import { NextRequest, NextResponse } from 'next/server';

// POST /api/leads
// Called by the chatbot when a lead is ready to be sent to N8N
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadData, conversationHistory, source = 'chatbot' } = body;

    if (!leadData) {
      return NextResponse.json({ error: 'Missing leadData' }, { status: 400 });
    }

    const payload = {
      timestamp: new Date().toISOString(),
      source,
      lead: leadData,
      conversationHistory: conversationHistory || [],
      siteUrl: 'https://multibrawn.co.il',
    };

    // Forward to N8N webhook if configured
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      const n8nResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Source': 'multibrawn-website',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });

      if (!n8nResponse.ok) {
        console.error('N8N webhook failed:', n8nResponse.status, await n8nResponse.text());
      }
    } else {
      // Log lead to console when N8N is not configured
      console.log('[LEAD]', JSON.stringify(payload, null, 2));
    }

    return NextResponse.json({ success: true, message: 'Lead received' });
  } catch (error: any) {
    console.error('Lead API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
