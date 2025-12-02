import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { leadData } = await request.json();

    console.log('📨 Received lead:', leadData);

    // Validate data
    if (!leadData || !leadData.name || !leadData.phone) {
      return NextResponse.json(
        { success: false, error: 'חסרים פרטים חובה' },
        { status: 400 }
      );
    }

    // Send to N8N webhook (if configured)
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...leadData,
            source: 'chatbot',
            timestamp: new Date().toISOString(),
            website: 'multibrawn.co.il',
          }),
        });
        console.log('✅ Sent to N8N');
      } catch (error) {
        console.error('❌ N8N webhook error:', error);
        // Don't fail the whole request if N8N fails
      }
    }

    // Generate WhatsApp message
    const whatsappMessage = encodeURIComponent(
      `היי מולטיבראון! אני ${leadData.name}

סוג נכס: ${leadData.propertyType || 'לא צוין'}
מספר אנשים: ${leadData.guestCount || 'לא צוין'}
תקציב: ${leadData.budget || 'לא צוין'}
תכונות: ${leadData.features?.join(', ') || 'לא צוין'}

טלפון: ${leadData.phone}

מתאים לשוחח? 😊`
    );

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972523983394';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      whatsappUrl,
      message: 'הפרטים נשלחו בהצלחה',
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאה בשליחת הפרטים' },
      { status: 500 }
    );
  }
}

// AI Chat endpoint (optional - for future use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const message = searchParams.get('message');

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      );
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `אתה עוזרת דיגיטלית של MULTIBRAWN - חברה מובילה בתחום השכרת נופש בישראל.
    
שם החברה: MULTIBRAWN
בעלים: ערדית
טלפון: 052-398-3394
אתר: multibrawn.co.il

מומחיות:
- צימרים רומנטיים
- וילות משפחתיות
- מלונות בוטיק
- מתחמי אירועים

תפקידך:
1. לענות על שאלות על MULTIBRAWN והשירותים
2. לעזור למצוא את המקום המושלם ללקוח
3. לספק מידע על מחירים, זמינות, ותכונות
4. להיות ידידותית, מקצועית ועוזרת

חשוב:
- תמיד תענה בעברית
- תהיה קצרה ולעניין
- אם לא יודעת משהו - תגידי בכנות
- תציעי ליצור קשר בטלפון או וואטסאפ

השאלה של הלקוח: ${message}`;

    const result = await model.generateContent(systemPrompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      message: text,
    });

  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאה בתקשורת עם AI' },
      { status: 500 }
    );
  }
}
