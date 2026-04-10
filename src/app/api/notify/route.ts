import { NextRequest, NextResponse } from 'next/server';

interface CollectedData {
  propertyType?: string;
  guestCount?: string;
  dates?: string;
  region?: string;
  budget?: string;
  name?: string;
  phone?: string;
}

// ── Send to Ardit via WAHA ──────────────────────
async function sendToWaha(text: string): Promise<void> {
  const wahaUrl    = process.env.WAHA_API_URL;
  const arditPhone = process.env.ARDIT_WHATSAPP_NUMBER;
  if (!wahaUrl || !arditPhone) return;

  await fetch(`${wahaUrl}/api/sendText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chatId: `${arditPhone}@c.us`,
      text,
      session: 'default',
    }),
    signal: AbortSignal.timeout(6000),
  });
}

// ── Forward to N8N ────────────────────────────────
async function sendToN8N(payload: object): Promise<void> {
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nUrl) return;

  await fetch(n8nUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-chatbot' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  });
}

// ── Build message ────────────────────────────────
function buildMessage(data: CollectedData): string {
  const lines: string[] = ['📩 *ליד חדש מהצ\'אטבוט!*', ''];

  if (data.name)         lines.push(`👤 *שם:* ${data.name}`);
  if (data.phone)        lines.push(`📱 *טלפון:* ${data.phone}`);
  if (data.propertyType) lines.push(`🏠 *מה מחפשים:* ${data.propertyType}`);
  if (data.guestCount)   lines.push(`👥 *כמה אנשים:* ${data.guestCount}`);
  if (data.dates)        lines.push(`📅 *מתי:* ${data.dates}`);
  if (data.region)       lines.push(`📍 *אזור:* ${data.region}`);
  if (data.budget)       lines.push(`💰 *תקציב:* ${data.budget}`);

  lines.push('', '─────────────────');
  lines.push(`🕐 *זמן:* ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}`);
  lines.push('📲 *מקור:* צ\'אטבוט האתר');

  return lines.join('\n');
}

// ── POST handler ──────────────────────────────────
export async function POST(request: NextRequest) {
  let collected: CollectedData = {};
  let summary = '';

  try {
    const body = await request.json();
    collected = body.collected || {};
    summary   = body.summary   || '';
  } catch {
    return NextResponse.json({ error: 'bad request' }, { status: 400 });
  }

  const message = buildMessage(collected);

  // Fire both notifications — non-blocking (don't fail the response)
  const promises: Promise<void>[] = [];

  // 1. WAHA → WhatsApp to Ardit
  promises.push(
    sendToWaha(message).catch((e) => {
      console.error('WAHA notify failed:', e);
    })
  );

  // 2. N8N → CRM/email automation
  promises.push(
    sendToN8N({
      timestamp: new Date().toISOString(),
      source: 'chatbot_form',
      lead: collected,
      message,
      siteUrl: 'https://multibrawn.co.il',
    }).catch((e) => {
      console.error('N8N notify failed:', e);
    })
  );

  // Wait briefly (up to 3s) then return regardless
  await Promise.race([
    Promise.all(promises),
    new Promise((r) => setTimeout(r, 3000)),
  ]);

  return NextResponse.json({ ok: true });
}
