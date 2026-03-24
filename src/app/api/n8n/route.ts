import { NextRequest, NextResponse } from 'next/server';

// Shared secret for N8N → site webhooks (set in env: N8N_WEBHOOK_SECRET)
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET;

// POST /api/n8n
// N8N calls this endpoint to trigger actions on the site
// Actions supported:
//   - ping: health check
//   - notify: future use (push notifications etc.)
export async function POST(request: NextRequest) {
  try {
    // Validate secret header
    if (WEBHOOK_SECRET) {
      const authHeader = request.headers.get('x-webhook-secret');
      if (authHeader !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'ping':
        return NextResponse.json({
          ok: true,
          timestamp: new Date().toISOString(),
          site: 'multibrawn.co.il',
        });

      case 'notify':
        // Placeholder for future push notifications / real-time updates
        console.log('[N8N notify]', data);
        return NextResponse.json({ ok: true, action: 'notify', received: data });

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('N8N webhook error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /api/n8n — health check for N8N
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'MULTIBRAWN N8N Integration',
    timestamp: new Date().toISOString(),
    endpoints: {
      incoming: 'POST /api/n8n (from N8N → site)',
      outgoing: 'POST /api/leads (chatbot → N8N)',
    },
  });
}
