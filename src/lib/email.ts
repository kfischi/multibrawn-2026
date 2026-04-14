import { Resend } from 'resend';

// Lazy initialization — only create client when actually sending
let _resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const ADMIN_EMAIL = process.env.RESEND_TO_EMAIL || 'ardit@multibrawn.co.il';
const FROM_EMAIL  = process.env.RESEND_FROM_EMAIL || 'info@multibrawn.co.il';

interface LeadEmailData {
  name?:         string | null;
  phone?:        string | null;
  propertyType?: string | null;
  location?:     string | null;
  dates?:        string | null;
  guestCount?:   string | number | null;
  budget?:       string | null;
  source?:       string | null;
  leadId?:       string | null;
}

const TYPE_LABELS: Record<string, string> = {
  zimmer:        'צימר',
  villa:         'וילה',
  events:        'מתחם אירועים',
  shabbat_hatan: 'שבת חתן',
  international: 'בינלאומי',
};

const SOURCE_LABELS: Record<string, string> = {
  chatbot:      'צ\'אטבוט',
  chatbot_form: 'טופס צ\'אטבוט',
  form:         'טופס ישיר',
  whatsapp:     'WhatsApp',
};

function buildHtml(lead: LeadEmailData): string {
  const type   = TYPE_LABELS[lead.propertyType || ''] || lead.propertyType || '—';
  const source = SOURCE_LABELS[lead.source || '']     || lead.source       || '—';
  const waLink = lead.phone
    ? `https://wa.me/972${lead.phone.replace(/^0/, '')}?text=${encodeURIComponent(`שלום ${lead.name || ''}, מ-MULTIBRAWN`)}`
    : null;

  const row = (label: string, value: string | number | null | undefined) =>
    value ? `<tr><td style="padding:8px 12px;color:#7a6a9a;font-size:0.85rem;white-space:nowrap">${label}</td><td style="padding:8px 12px;color:#1a1030;font-weight:600">${value}</td></tr>` : '';

  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f0f7;font-family:'Segoe UI',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f0f7;padding:32px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#a06bff,#ff5ea1);padding:28px 32px;text-align:center">
            <div style="color:#fff;font-size:1.1rem;font-weight:300;letter-spacing:0.15em;margin-bottom:4px">MULTIBRAWN</div>
            <div style="color:#fff;font-size:1.6rem;font-weight:800">ליד חדש הגיע! 🎉</div>
            <div style="color:rgba(255,255,255,0.8);font-size:0.85rem;margin-top:6px">מקור: ${source}</div>
          </td>
        </tr>

        <!-- Lead Details -->
        <tr>
          <td style="padding:28px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${row('👤 שם',         lead.name)}
              ${row('📱 טלפון',      lead.phone)}
              ${row('🏠 סוג נכס',    type)}
              ${row('📍 אזור',       lead.location)}
              ${row('📅 תאריכים',    lead.dates)}
              ${row('👥 אורחים',     lead.guestCount)}
              ${row('💰 תקציב',      lead.budget)}
              ${lead.leadId ? row('🔑 מזהה ליד', lead.leadId) : ''}
            </table>

            ${waLink ? `
            <div style="margin-top:24px;text-align:center">
              <a href="${waLink}"
                 style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:1rem;padding:14px 32px;border-radius:100px;box-shadow:0 4px 14px rgba(37,211,102,0.35)">
                💬 פנה ב-WhatsApp
              </a>
            </div>` : ''}

            <div style="margin-top:20px;text-align:center">
              <a href="https://multibrawn.co.il/admin"
                 style="display:inline-block;background:#a06bff;color:#fff;text-decoration:none;font-weight:600;font-size:0.875rem;padding:10px 24px;border-radius:100px">
                ← ממשק ניהול
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f7fc;padding:16px 32px;text-align:center;border-top:1px solid #ede9f7">
            <p style="margin:0;color:#b0a8c8;font-size:0.78rem">MULTIBRAWN • מייל אוטומטי • ${new Date().toLocaleString('he-IL')}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendLeadEmail(lead: LeadEmailData): Promise<void> {
  const resend = getResend();
  if (!resend) return; // silently skip if not configured

  const name   = lead.name   || 'לא ידוע';
  const phone  = lead.phone  || '';
  const type   = TYPE_LABELS[lead.propertyType || ''] || lead.propertyType || '';

  const subject = `🔔 ליד חדש${name !== 'לא ידוע' ? ` — ${name}` : ''}${phone ? ` | ${phone}` : ''}${type ? ` | ${type}` : ''}`;

  try {
    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      ADMIN_EMAIL,
      subject,
      html:    buildHtml(lead),
    });
  } catch (err) {
    console.error('[Resend] Failed to send lead email:', err);
  }
}
