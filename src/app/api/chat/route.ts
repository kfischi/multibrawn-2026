import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.8,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 700,
  },
});

const SYSTEM_PROMPT = `אתה ערדית, סוכנת AI חכמה של MULTIBRAWN — חברת נכסים יוקרתיים בישראל.

🎯 המשימה שלך:
להבין את הלקוח, לאסוף מידע, ולהפנות אותו לפתרון הנכון. **לא לאפשר שיחת מת** — תמיד תן כפתורי המשך.

🏡 הנכסים:
- צימרים רומנטיים (ג'קוזי, בריכה, נוף)
- וילות משפחתיות (עד 20 איש, בריכה פרטית)
- דירות נופש (מרכזיות)
- מלוני בוטיק (ספא, VIP)
- מתחמי אירועים (חתונות, בר/בת מצווה, שבת חתן)

📍 אזורים: צפון (גליל/גולן/כנרת), מרכז, דרום (מדבר/אילת), ירושלים

💡 כללי תגובה:
1. עד 3 משפטים קצרים, שפה חמה
2. שאל שאלה אחת בכל פעם
3. מלא extractedData בכל מה שמוזכר בשיחה
4. **תמיד** כלול 3-5 כפתורי actions — לעולם לא פחות מ-3!
5. כשיש לפחות: סוג נכס + תאריך + מספר אנשים → הצע לשלוח לוואטסאפ
6. שבת חתן → הפנה לדף /shabbat-hatan
7. אירוע גדול → הפנה לדף /events-gallery
8. שאלה על תמונות → הפנה ל-/gallery

🔀 לוגיקת כפתורים:
- quick_reply: תשובה מהירה שהלקוח שולח
- whatsapp: לשלוח סיכום לנציג (רק כשיש מספיק פרטים)
- page: ניווט לדף רלוונטי
- phone: התקשרות ישירה
- **חשוב**: תמיד כלול לפחות 2-3 quick_reply כפתורים שמקדמים את השיחה

⚠️ ענה רק ב-JSON תקני, ללא טקסט נוסף:
{
  "message": "הטקסט שלך בעברית",
  "intent": "greeting|booking|event|shabbat_hatan|info|ready|complaint",
  "actions": [
    {"type": "quick_reply", "label": "תשובה 1", "value": "הטקסט שיישלח"},
    {"type": "quick_reply", "label": "תשובה 2", "value": "הטקסט שיישלח"},
    {"type": "whatsapp", "label": "שלח לוואטסאפ 📱", "summary": "סיכום השיחה לנציג"},
    {"type": "page", "label": "ראה גלריה 📸", "url": "/gallery"},
    {"type": "phone", "label": "התקשר 📞"}
  ],
  "extractedData": {
    "name": null,
    "phone": null,
    "propertyType": null,
    "location": null,
    "dates": null,
    "guestCount": null,
    "budget": null,
    "specialRequests": null
  }
}

דוגמה לתגובה בשלב ראשוני:
{
  "message": "שלום! 👋 אני ערדית. מה מעניין אותך?",
  "intent": "greeting",
  "actions": [
    {"type": "quick_reply", "label": "צימר רומנטי 💕", "value": "אני מחפש צימר רומנטי לזוג"},
    {"type": "quick_reply", "label": "וילה למשפחה 🏡", "value": "אני מחפש וילה גדולה למשפחה"},
    {"type": "quick_reply", "label": "אירוע / שבת חתן 🎊", "value": "אני מתכנן אירוע"},
    {"type": "page", "label": "ראה גלריה 📸", "url": "/gallery"},
    {"type": "phone", "label": "דבר עם נציג 📞"}
  ],
  "extractedData": {}
}`;

interface Action {
  type: 'quick_reply' | 'whatsapp' | 'page' | 'phone';
  label: string;
  value?: string;
  summary?: string;
  url?: string;
}

interface GeminiResponse {
  message: string;
  intent: string;
  actions: Action[];
  extractedData: Record<string, string | null>;
}

function parseGeminiResponse(text: string): GeminiResponse {
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parsed = JSON.parse(clean);
  const actions: Action[] = Array.isArray(parsed.actions) ? parsed.actions : [];

  // Guarantee at least 3 actions — add defaults if needed
  const hasQuickReplies = actions.filter((a) => a.type === 'quick_reply').length;
  if (hasQuickReplies < 2) {
    if (!actions.find((a) => a.type === 'phone')) {
      actions.push({ type: 'phone', label: 'דבר עם נציג 📞' });
    }
    if (!actions.find((a) => a.type === 'whatsapp')) {
      actions.push({ type: 'whatsapp', label: 'שלח לוואטסאפ 📱', summary: 'שלום! פניתי דרך האתר' });
    }
    if (actions.length < 3) {
      actions.push({ type: 'page', label: 'ראה גלריה 📸', url: '/gallery' });
    }
  }

  return {
    message: parsed.message || text,
    intent: parsed.intent || 'info',
    actions,
    extractedData: parsed.extractedData || {},
  };
}

function fallbackResponse(msgCount: number): GeminiResponse {
  if (msgCount < 2) {
    return {
      message: 'שלום! 👋 אני ערדית. איך אוכל לעזור לך היום?',
      intent: 'greeting',
      actions: [
        { type: 'quick_reply', label: 'צימר רומנטי 💕', value: 'אני מחפש צימר רומנטי לזוג' },
        { type: 'quick_reply', label: 'וילה משפחתית 🏡', value: 'אני מחפש וילה גדולה למשפחה' },
        { type: 'quick_reply', label: 'אירוע / שבת חתן 🎊', value: 'אני מתכנן אירוע' },
        { type: 'page', label: 'ראה גלריה 📸', url: '/gallery' },
        { type: 'phone', label: 'דבר עם נציג 📞' },
      ],
      extractedData: {},
    };
  }
  return {
    message: 'אשמח לעזור! אפשר לפנות אלינו בוואטסאפ ונמצא לך את המקום המושלם 😊',
    intent: 'ready',
    actions: [
      { type: 'whatsapp', label: 'שלח לוואטסאפ 📱', summary: 'שלום! פניתי דרך האתר ואשמח לעזרה' },
      { type: 'phone', label: 'התקשר עכשיו 📞' },
      { type: 'quick_reply', label: 'חזור לתחילה 🔄', value: 'בוא נתחיל מחדש' },
    ],
    extractedData: {},
  };
}

// ============================================
// WAHA — Send summary to Ardit's WhatsApp
// ============================================
async function sendToWahaArdit(summary: string, extractedData: Record<string, string | null>) {
  const wahaUrl = process.env.WAHA_API_URL;
  const arditNumber = process.env.ARDIT_WHATSAPP_NUMBER;

  if (!wahaUrl || !arditNumber) return;

  const lines = ['📩 *ליד חדש מהאתר!*', ''];
  if (extractedData.name) lines.push(`👤 *שם:* ${extractedData.name}`);
  if (extractedData.phone) lines.push(`📱 *טלפון:* ${extractedData.phone}`);
  if (extractedData.propertyType) lines.push(`🏠 *סוג:* ${extractedData.propertyType}`);
  if (extractedData.location) lines.push(`📍 *אזור:* ${extractedData.location}`);
  if (extractedData.dates) lines.push(`📅 *תאריכים:* ${extractedData.dates}`);
  if (extractedData.guestCount) lines.push(`👥 *אורחים:* ${extractedData.guestCount}`);
  if (extractedData.budget) lines.push(`💰 *תקציב:* ${extractedData.budget}`);
  if (extractedData.specialRequests) lines.push(`✨ *בקשות:* ${extractedData.specialRequests}`);
  lines.push('');
  lines.push(`📝 *סיכום שיחה:* ${summary}`);

  try {
    await fetch(`${wahaUrl}/api/sendText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${arditNumber}@c.us`,
        text: lines.join('\n'),
        session: 'default',
      }),
      signal: AbortSignal.timeout(6000),
    });
  } catch {
    // Non-blocking
  }
}

// ============================================
// N8N — Forward lead
// ============================================
async function forwardLeadToN8N(
  leadData: Record<string, unknown>,
  history: Array<{ role: string; content: string }>
) {
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (!n8nUrl) return;
  try {
    await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-chatbot' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: 'chatbot',
        lead: leadData,
        conversationHistory: history,
        siteUrl: 'https://multibrawn.co.il',
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // Non-blocking
  }
}

// ============================================
// POST handler
// ============================================
export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'הודעה חסרה' }, { status: 400 });
    }

    const history = conversationHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        {
          role: 'model',
          parts: [
            {
              text: JSON.stringify({
                message: 'הבנתי! אני ערדית, סוכנת AI של MULTIBRAWN. אני מוכנה לעזור!',
                intent: 'greeting',
                actions: [],
                extractedData: {},
              }),
            },
          ],
        },
        ...history,
      ],
    });

    const result = await chat.sendMessage(message);
    const rawText = result.response.text();

    let parsed: GeminiResponse;
    try {
      parsed = parseGeminiResponse(rawText);
    } catch {
      parsed = fallbackResponse(conversationHistory.length);
    }

    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: parsed.message },
    ];

    // Detect readiness
    const isReady = parsed.intent === 'ready' || updatedHistory.length >= 12;
    const hasEnoughData = !!(
      parsed.extractedData?.propertyType &&
      (parsed.extractedData?.dates || parsed.extractedData?.guestCount)
    );

    // When ready OR enough data collected — fire automations
    if (isReady || hasEnoughData) {
      const leadData = { ...parsed.extractedData, source: 'chatbot_ai', intent: parsed.intent };

      // Forward to N8N (manages CRM/email flows)
      forwardLeadToN8N(leadData, updatedHistory);

      // Send to Ardit's WhatsApp via WAHA
      const whatsappAction = parsed.actions.find((a) => a.type === 'whatsapp');
      const summary = whatsappAction?.summary || parsed.message;
      sendToWahaArdit(summary, parsed.extractedData);
    }

    return NextResponse.json({
      response: parsed.message,
      intent: parsed.intent,
      actions: parsed.actions,
      extractedData: parsed.extractedData,
      history: updatedHistory,
      isReady,
    });
  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const fb = fallbackResponse(0);
    return NextResponse.json({
      response: fb.message,
      intent: fb.intent,
      actions: fb.actions,
      extractedData: {},
      history: [],
      isReady: false,
    });
  }
}
