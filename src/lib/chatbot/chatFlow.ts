// MULTIBRAWN Chatbot Flow - TypeScript Version
// Based on Skyline pattern but adapted for vacation rentals

import { ChatStep } from '@/types/chatbot';

export const chatFlow: Record<string, ChatStep> = {
  start: {
    id: 'propertyType',
    type: 'options',
    message: 'היי! 👋 אני העוזרת הדיגיטלית של מולטיבראון.\n\nבואו נמצא לכם את המקום המושלם לחופשה!\n\nאיזה סוג מקום אתם מחפשים?',
    options: [
      { text: '🏡 צימר רומנטי', value: 'zimmer', next: 'guestCount' },
      { text: '🏛️ וילה משפחתית', value: 'villa', next: 'guestCount' },
      { text: '🏨 מלון בוטיק', value: 'hotel', next: 'guestCount' },
      { text: '💍 מתחם לאירוע', value: 'event', next: 'eventType' },
    ],
    field: 'propertyType',
    validation: {
      required: true,
    },
  },

  guestCount: {
    id: 'guestCount',
    type: 'options',
    message: (context) => {
      const propertyType = context.data.propertyType;
      const typeNames: Record<string, string> = {
        zimmer: 'בצימר',
        villa: 'בוילה',
        hotel: 'במלון',
      };
      return `כמה אנשים תהיו ${typeNames[propertyType] || 'במקום'}?`;
    },
    options: [
      { text: '💑 זוג (2)', value: '2', next: 'dates' },
      { text: '👨‍👩‍👧 3-5 אנשים', value: '3-5', next: 'dates' },
      { text: '👨‍👩‍👧‍👦 6-10 אנשים', value: '6-10', next: 'dates' },
      { text: '👥 10+ אנשים', value: '10+', next: 'dates' },
      { text: '🤔 עדיין לא יודעים', value: 'unknown', next: 'dates' },
    ],
    field: 'guestCount',
  },

  eventType: {
    id: 'eventType',
    type: 'options',
    message: 'איזה סוג אירוע?',
    options: [
      { text: '💍 חתונה', value: 'wedding', next: 'guestCount' },
      { text: '🎂 יום הולדת', value: 'birthday', next: 'guestCount' },
      { text: '🎉 בר/בת מצווה', value: 'bnei-mitzvah', next: 'guestCount' },
      { text: '🏢 אירוע חברה', value: 'corporate', next: 'guestCount' },
      { text: '📋 אחר', value: 'other', next: 'guestCount' },
    ],
    field: 'eventType',
  },

  dates: {
    id: 'dates',
    type: 'options',
    message: 'מתי בערך תרצו להגיע?',
    options: [
      { text: '📅 יש תאריכים מדויקים', value: 'exact', next: 'budget' },
      { text: '🗓️ בחודש הקרוב', value: 'next-month', next: 'budget' },
      { text: '🌅 בחודשיים הקרובים', value: '2-months', next: 'budget' },
      { text: '🌴 גמישים בתאריכים', value: 'flexible', next: 'budget' },
    ],
    field: 'dateFlexibility',
  },

  budget: {
    id: 'budget',
    type: 'options',
    message: (context) => {
      const isEvent = context.data.propertyType === 'event';
      return isEvent
        ? 'מה התקציב המשוער לאירוע?'
        : 'מה התקציב המשוער ללילה?';
    },
    options: (context) => {
      const isEvent = context.data.propertyType === 'event';
      
      if (isEvent) {
        return [
          { text: 'עד 50,000 ₪', value: '0-50k', next: 'features' },
          { text: '50,000-100,000 ₪', value: '50k-100k', next: 'features' },
          { text: '100,000-200,000 ₪', value: '100k-200k', next: 'features' },
          { text: 'מעל 200,000 ₪', value: '200k+', next: 'features' },
          { text: 'נדבר על זה בהמשך 💬', value: 'later', next: 'features' },
        ];
      }
      
      return [
        { text: 'עד 1,000 ₪', value: '0-1000', next: 'features' },
        { text: '1,000-2,000 ₪', value: '1000-2000', next: 'features' },
        { text: '2,000-3,500 ₪', value: '2000-3500', next: 'features' },
        { text: '3,500+ ₪ (יוקרה)', value: '3500+', next: 'features' },
        { text: 'נדבר על זה בהמשך 💬', value: 'later', next: 'features' },
      ];
    },
    field: 'budget',
  },

  features: {
    id: 'features',
    type: 'multi-select',
    message: 'מה חשוב לכם שיהיה במקום?\n(בחרו כמה שרוצים ולחצו "שלח")',
    options: [
      { text: '🏊‍♂️ בריכה פרטית', value: 'pool' },
      { text: '🛁 ג\'קוזי', value: 'jacuzzi' },
      { text: '🌳 גינה', value: 'garden' },
      { text: '🏔️ נוף מדהים', value: 'view' },
      { text: '🍽️ מטבח מאובזר', value: 'kitchen' },
      { text: '🔥 קמין', value: 'fireplace' },
      { text: '♿ נגישות', value: 'accessibility' },
      { text: '🐕 ידידותי לחיות', value: 'pets' },
      { text: '✡️ כשרות', value: 'kosher' },
    ],
    field: 'features',
    next: 'name',
    minSelections: 0,
    maxSelections: 9,
  },

  name: {
    id: 'name',
    type: 'text',
    message: 'מעולה! מה השם שלכם? 😊',
    placeholder: 'שם מלא',
    field: 'name',
    next: 'contactMethod',
    validation: {
      required: true,
      minLength: 2,
      errorMessage: 'נא להזין שם מלא',
    },
  },

  contactMethod: {
    id: 'contactMethod',
    type: 'options',
    message: (context) => {
      const name = context.data.name || '';
      return `תודה ${name}! 🙏\n\nערדית תחזור אליכם בהקדם.\nאיך נוח לכם?`;
    },
    options: [
      { text: '📞 שיחת טלפון', value: 'phone', next: 'phone' },
      { text: '💬 וואטסאפ', value: 'whatsapp', next: 'phone' },
    ],
    field: 'contactMethod',
  },

  phone: {
    id: 'phone',
    type: 'phone',
    message: 'מה מספר הטלפון שלכם?',
    placeholder: '050-1234567',
    field: 'phone',
    next: 'summary',
    validation: {
      required: true,
      pattern: /^05\d{1}-?\d{7}$/,
      errorMessage: 'נא להזין מספר טלפון תקין',
    },
  },

  summary: {
    id: 'summary',
    type: 'summary',
    message: (context) => {
      const { propertyType, guestCount, budget, name } = context.data;
      
      const typeNames: Record<string, string> = {
        zimmer: 'צימר',
        villa: 'וילה',
        hotel: 'מלון',
        event: 'מתחם אירוע',
      };
      
      return `תודה ${name}! 🎉\n\nקיבלנו את הפרטים שלכם:\n\n📍 סוג: ${typeNames[propertyType]}\n👥 מספר אנשים: ${guestCount}\n💰 תקציב: ${budget}\n\nערדית תחזור אליכם בהקדם! ⏱️`;
    },
    next: 'whatsappCTA',
  },

  whatsappCTA: {
    id: 'whatsappCTA',
    type: 'action',
    message: '🎉 תודה רבה!\n\nקיבלנו את כל הפרטים שלכם.\n\n💬 **כדי שנחזור אליכם מהר**, לחצו על הכפתור הירוק ושלחו את הפרטים לוואטסאפ של MULTIBRAWN:',
    action: (context) => {
      const { name, propertyType, guestCount, budget, dateFlexibility, features = [] } = context.data;
      
      const typeNames: Record<string, string> = {
        zimmer: 'צימר',
        villa: 'וילה',
        hotel: 'מלון',
        event: 'מתחם אירוע',
      };
      
      const featuresList = features.length > 0 
        ? `\nתכונות: ${features.join(', ')}`
        : '';
      
      const message = encodeURIComponent(
        `היי מולטיבראון! אני ${name} 👋

סוג נכס: ${typeNames[propertyType]}
מספר אנשים: ${guestCount}
תאריכים: ${dateFlexibility}
תקציב: ${budget}${featuresList}

אשמח לקבל הצעות מתאימות! 😊`
      );
      
      return {
        type: 'whatsapp',
        url: `https://wa.me/972523983394?text=${message}`,
        buttonText: '💬 שלח לערדית בוואטסאפ',
        buttonStyle: {
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          color: 'white',
          padding: '1.2rem 2.5rem',
          fontSize: '1.2rem',
          fontWeight: '700',
          borderRadius: '50px',
          border: 'none',
          boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)',
          animation: 'pulse 2s infinite',
          cursor: 'pointer',
          width: '100%',
          marginTop: '1rem',
        },
      };
    },
  },
};

// Translations for display
export const translations: Record<string, Record<string, string>> = {
  propertyType: {
    zimmer: 'צימר רומנטי',
    villa: 'וילה משפחתית',
    hotel: 'מלון בוטיק',
    event: 'מתחם אירוע',
  },
  guestCount: {
    '2': 'זוג (2)',
    '3-5': '3-5 אנשים',
    '6-10': '6-10 אנשים',
    '10+': '10+ אנשים',
    'unknown': 'לא יודעים',
  },
  eventType: {
    wedding: 'חתונה',
    birthday: 'יום הולדת',
    'bnei-mitzvah': 'בר/בת מצווה',
    corporate: 'אירוע חברה',
    other: 'אחר',
  },
  dateFlexibility: {
    exact: 'תאריכים מדויקים',
    'next-month': 'בחודש הקרוב',
    '2-months': 'בחודשיים הקרובים',
    flexible: 'גמישים',
  },
  budget: {
    '0-1000': 'עד 1,000 ₪',
    '1000-2000': '1,000-2,000 ₪',
    '2000-3500': '2,000-3,500 ₪',
    '3500+': 'מעל 3,500 ₪',
    '0-50k': 'עד 50,000 ₪',
    '50k-100k': '50,000-100,000 ₪',
    '100k-200k': '100,000-200,000 ₪',
    '200k+': 'מעל 200,000 ₪',
    later: 'נדבר בהמשך',
  },
  features: {
    pool: 'בריכה פרטית',
    jacuzzi: 'ג\'קוזי',
    garden: 'גינה',
    view: 'נוף מדהים',
    kitchen: 'מטבח מאובזר',
    fireplace: 'קמין',
    accessibility: 'נגישות',
    pets: 'ידידותי לחיות',
    kosher: 'כשרות',
  },
  contactMethod: {
    phone: 'שיחת טלפון',
    whatsapp: 'וואטסאפ',
  },
};
