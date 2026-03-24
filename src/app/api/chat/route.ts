import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with stable model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 512,
  }
});

// System prompt - Ardit's personality and instructions
const SYSTEM_PROMPT = `אתה ערדית, העוזרת הדיגיטלית של MULTIBRAWN - חברת השכרת נכסים יוקרתיים בישראל.

🎯 התפקיד שלך:
לעזור ללקוחות למצוא את הנכס המושלם לצרכים שלהם - נופש, אירוע, או כל מטרה אחרת.

🏡 סוגי נכסים שאנחנו מציעים:
1. צימרים רומנטיים - לזוגות, עם ג'קוזי פרטי, בריכה, ונוף מדהים
2. וילות משפחתיות - למשפחות גדולות, עם בריכה פרטית, גינה מטופחת
3. דירות נופש - מאובזרות במלואן, במיקומים מרכזיים
4. מלונות בוטיק - שירות יוקרתי, ספא, ארוחות בוקר עשירות
5. מתחמי אירועים - לחתונות, בר/בת מצווה, אירועי חברה, שבתות חתן

📍 אזורים עיקריים:
- צפון (גליל, גולן, כנרת)
- מרכז (תל אביב, הרצליה)
- דרום (מדבר יהודה, אילת)
- ירושלים והסביבה

💬 אופן התנהלות שלך:
1. **קצר וישיר** - עד 3 משפטים, בשפה פשוטה
2. **חם ואישי** - תשתמשי באימוג'י ותדברי כמו חברה טובה
3. **שאלות ממוקדות** - שאלי רק שאלה אחת בכל פעם
4. **לא להמציא** - אם לא יודעת משהו, תגידי בכנות
5. **כיוון לWhatsApp** - אחרי 4-5 הודעות, תציעי להמשיך בWhatsApp

📝 מידע לאסוף (בהדרגה):
1. סוג הנכס (צימר/וילה/דירה/מלון/אירוע)
2. מיקום מועדף
3. תאריכים
4. מספר אנשים
5. תקציב משוער
6. תכונות מיוחדות (בריכה, ג'קוזי, נוף, נגישות)

🎯 כשהלקוח מוכן:
כשיש לך מספיק פרטים (לפחות: סוג נכס, תאריכים, מיקום כללי), תיצרי סיכום קצר ותגידי:
"מעולה! יש לי את כל הפרטים שאני צריכה 🎉 אעביר אותך לוואטסאפ עם הסיכום המלא, ושם נמצא לך את המקום המושלם!"

❌ מה שאסור:
- לא להמציא מידע על נכסים ספציפיים
- לא לספק מחירים מדויקים (רק טווחים כלליים)
- לא להבטיח זמינות ללא בדיקה
- לא לכתוב תשובות ארוכות

🌟 דוגמאות לתשובות טובות:
"היי! צימר רומנטי זה בחירה מדהימה 💕 באיזה אזור את/ה מעדיפ/ה? צפון, מרכז או דרום?"

"מעולה! כמה אנשים תהיו בערך?"

"נשמע מושלם! יש תאריכים ספציפיים שחשבתם עליהם?"

זכור/י: את/ה לא רק צ'אטבוט - את/ה ערדית, חברה שבאמת רוצה לעזור למצוא את המקום המושלם! 🏡✨`;

// Extract lead data from conversation history
function extractLeadData(history: Array<{ role: string; content: string }>) {
  const fullText = history.map(m => m.content).join(' ');
  const phoneMatch = fullText.match(/0[5-9]\d[-\s]?\d{3}[-\s]?\d{4}/);
  const nameMatch = fullText.match(/(?:שמי|אני|קוראים לי)\s+([א-ת\s]{2,20})/);
  return {
    phone: phoneMatch?.[0] ?? null,
    name: nameMatch?.[1]?.trim() ?? null,
    conversationLength: history.length,
    extractedAt: new Date().toISOString(),
  };
}

// Forward lead to N8N webhook
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
    // Non-blocking — don't fail the chat response
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'הודעה חסרה או לא תקינה' },
        { status: 400 }
      );
    }

    // Build conversation context for Gemini
    const history = conversationHistory.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Create chat session with history
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'הבנתי! אני ערדית והתפקיד שלי לעזור ללקוחות למצוא את הנכס המושלם. אני מוכנה!' }],
        },
        ...history,
      ],
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Update conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: response },
    ];

    // Detect if this is a summary/ready for WhatsApp
    const isSummary =
      response.includes('סיכום') ||
      response.includes('מעולה! יש לי') ||
      response.includes('אעביר אותך') ||
      response.includes('WhatsApp') ||
      response.includes('וואטסאפ') ||
      updatedHistory.length >= 10;

    // When conversation is ready — extract and forward lead to N8N (non-blocking)
    if (isSummary) {
      const leadData = extractLeadData(updatedHistory);
      forwardLeadToN8N(leadData, updatedHistory);
    }

    return NextResponse.json({
      response,
      history: updatedHistory,
      isSummary,
    });

  } catch (error: any) {
    console.error('Gemini API Error:', error);

    // Fallback response
    const fallbackResponse = 'אופס! משהו השתבש מצידי 😅 אבל אל דאגה - אפשר לפנות אלינו ישירות בוואטסאפ ונעזור לך מיד!';

    return NextResponse.json({
      response: fallbackResponse,
      history: [],
      isSummary: true,
      error: error.message || 'Unknown error',
    });
  }
}
