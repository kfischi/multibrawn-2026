import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY || '';
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID || '2', 10);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'כתובת אימייל לא תקינה' }, { status: 400 });
    }

    if (!BREVO_API_KEY) {
      console.warn('[Brevo] BREVO_API_KEY not set');
      return NextResponse.json({ success: true }); // silent fail in dev
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        ...(name ? { attributes: { FIRSTNAME: name } } : {}),
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // 204 = created, 400 with "Contact already exist" = already subscribed (still ok)
    if (res.status === 204 || res.status === 201) {
      return NextResponse.json({ success: true });
    }

    const data = await res.json();
    if (data.message?.includes('Contact already exist')) {
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    console.error('[Brevo] Error:', data);
    return NextResponse.json({ error: 'שגיאה בהרשמה' }, { status: 500 });
  } catch (err) {
    console.error('[Brevo] Exception:', err);
    return NextResponse.json({ error: 'שגיאת שרת' }, { status: 500 });
  }
}
