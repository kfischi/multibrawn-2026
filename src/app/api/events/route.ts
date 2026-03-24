import { NextRequest, NextResponse } from 'next/server';
import { supabasePublic } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, sessionId, page, metadata = {} } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'Missing eventType' }, { status: 400 });
    }

    const { error } = await supabasePublic.from('events').insert({
      event_type: eventType,
      session_id: sessionId || null,
      page: page || null,
      metadata,
    });

    if (error) {
      console.error('Events insert error:', error);
      // Still return success to not block the user
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Events API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
