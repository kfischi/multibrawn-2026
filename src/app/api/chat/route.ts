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

const SYSTEM_PROMPT = `אתה ערדית, סוכן AI חכם של MULTIBRAWN — חברת השכרת נכסים יוקרתיים בישראל.

🎯 המשימה שלך:
להבין את הלקוח, לאסוף מידע חיוני, ולהפנות אותו לפתרון הנכון ביותר.

🏡 הנכסים שלנו:
- צימרים רומנטיים (לזוגות, ג'קוזי פרטי, בריכה, נוף)
- וילות משפחתיות (עד 20 אנשים, בריכה פרטית, גינה)
- דירות נופש (מרכזיות, מאובזרות)
- מלוני בוטיק (ספא, ארוחות, שירות VIP)
- מתחמי אירועים (חתונות, בר מצווה, שבת חתן, אירועי חברה)

📍 אזורים: צפון (גליל, גולן, כנרת), מרכז, דרום (מדבר, אילת), ירושלים

💡 כללי תגובה:
1. עד 3 משפטים קצרים, שפה חמה ואישית
2. שאל שאלה אחת בכל פעם
3. אסוף: סוג נכס, מיקום, תאריכים, כמה אנשים, תקציב, דרישות מיוחדות
4. לאחר 3-4 הודעות — הצע להמשיך בוואטסאפ
5. אם מדובר בשבת חתן — הצע לעבור לדף המיוחד
6. אם מדובר באירוע גדול — הפנה לדף אירועים
7. תמיד תהיה חיובי, אמפתי, ואנרגטי

🔀 ניתוב חכם:
- צימר/וילה/דירה → שלח לוואטסאפ עם סיכום
- שבת חתן → הפנה לדף /shabbat-hatan
- אירוע גדול (חתונה/בר מצווה) → הפנה לדף /events
- שאלה על מחירים → תן טווח כללי + הפנה לוואטסאפ
- שאלה על גלריה/תמונות → הפנה לדף /gallery
- בלגן/תלונה → הצע שיחה טלפונית

⚠️ חשוב מאוד: ענה רק ב-JSON תקני, ללא טקסט נוסף:
{
  "message": "הטקסט שלך בעברית כאן",
  "intent": "greeting|booking|event|shabbat_hatan|info|ready|complaint",
  "actions": [
    {"type": "quick_reply", "label": "טקסט כפתור", "value": "הטקסט שיישלח"},
    {"type": "whatsapp", "label": "שלח לוואטסאפ 📱", "summary": "סיכום קצר לוואטסאפ"},
    {"type": "page", "label": "ראה גלריה 📸", "url": "/gallery"},
    {"type": "phone", "label": "התקשר עכשיו 📞"}
  ],
  "extractedData": {
    "name": null,
    "phone": null,
    "propertyType": null,
    "location": null,
    "dates": null,
    "guestCount": null,
    "budget": null
  }
}

כללי actions:
- תמיד כלול 2-4 כפתורים רלוונטיים
- quick_reply = לקוח לוחץ ושולח תשובה מהירה
- whatsapp = כשיש מספיק פרטים לשלוח סיכום
- page = ניווט לדף רלוונטי
- phone = להתקשרות ישירה
- מלא extractedData בכל מה שכבר ידוע מהשיחה`;

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
  // Clean markdown fences if present
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  const parsed = JSON.parse(clean);
  return {
    message: parsed.message || text,
    intent: parsed.intent || 'info',
    actions: Array.isArray(parsed.actions) ? parsed.actions : [],
    extractedData: parsed.extractedData || {},
  };
}

function fallbackResponse(msgCount: number): GeminiResponse {
  if (msgCount < 2) {
    return {
      message: 'שלום! 👋 אני ערדית. איך אוכל לעזור לך היום?',
      intent: 'greeting',
      actions: [
        { type: 'quick_reply', label: 'צימר רומנטי 💕', value: 'אני מחפש צימר רומנטי' },
        { type: 'quick_reply', label: 'וילה משפחתית 🏡', value: 'אני מחפש וילה משפחתית' },
        { type: 'quick_reply', label: 'אירוע מיוחד 🎊', value: 'אני מתכנן אירוע' },
        { type: 'quick_reply', label: 'שבת חתן 🕍', value: 'אני מחפש מקום לשבת חתן' },
      ],
      extractedData: {},
    };
  }
  return {
    message: 'אשמח לעזור! אפשר לפנות אלינו ישירות בוואטסאפ ונמצא לך את הפתרון המושלם 😊',
    intent: 'ready',
    actions: [
      { type: 'whatsapp', label: 'שלח לוואטסאפ 📱', summary: 'שלום! פניתי דרך הצ\u05D0ט ואשמח לעזרה' },
      { type: 'phone', label: 'התקשר עכשיו 📞' },
    ],
    extractedData: {},
  };
}

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
                message: 'הבנתי! אני ערדית, סוכן AI חכם של MULTIBRAWN. אני מוכנה לעזור!',
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

    const isReady = parsed.intent === 'ready' || updatedHistory.length >= 12;

    // Forward to N8N if ready or has enough data
    if (isReady || (parsed.extractedData?.phone && parsed.extractedData?.name)) {
      forwardLeadToN8N(
        { ...parsed.extractedData, source: 'chatbot_ai', intent: parsed.intent },
        updatedHistory
      );
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
