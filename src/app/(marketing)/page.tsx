import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: { absolute: 'MULTIBRAWN | צימרים, וילות ומתחמי אירועים בישראל' },
  description: 'מחפשים צימר רומנטי, וילה למשפחה גדולה או מתחם שבת חתן? ב-MULTIBRAWN מספרים מה צריך ומקבלים התאמה אישית מערדית. היכרות מהשטח · שאלון קצר · שירות אישי בוואטסאפ.',
  keywords: ['צימרים בישראל', 'וילות להשכרה', 'מתחמי אירועים', 'שבת חתן', 'בריכה מחוממת', 'צימר רומנטי', 'וילה גליל', 'צימר עם ג׳קוזי', 'נופש בישראל', 'מלון בוטיק', 'דירת נופש', 'multibrawn'],
  alternates: { canonical: 'https://multibrawn.co.il' },
  openGraph: {
    title: 'MULTIBRAWN | מתחמים, וילות ומלונות בוטיק — בהתאמה אישית',
    description: 'וילות, צימרים, מתחמי שבת חתן ואירועים בישראל. מספרים מה אתם צריכים, וערדית חוזרת אליכם עם התאמה אישית.',
    url: 'https://multibrawn.co.il',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'website',
    images: [{
      url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      width: 1200, height: 630,
      alt: 'MULTIBRAWN — וילות וצימרים יוקרתיים בישראל',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MULTIBRAWN | נסגרים בהתאמה אישית. לא בקטלוג',
    description: 'צימרים, וילות ושבת חתן. ערדית מוצאת לכם את המקום הנכון',
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg'],
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VideoObject',
      name: 'MULTIBRAWN — מתחמים, וילות ומלונות בוטיק בהתאמה אישית',
      description: 'סרטון פתיחה של MULTIBRAWN: וילות, צימרים ומתחמי אירועים בישראל, בהתאמה אישית',
      thumbnailUrl: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      contentUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4',
      uploadDate: '2024-12-01T00:00:00+02:00',
      publisher: { '@type': 'Organization', name: 'MULTIBRAWN' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'מה זה MULTIBRAWN?',
          acceptedAnswer: { '@type': 'Answer', text: 'MULTIBRAWN היא חברת תיווך נכסי נופש ואירועים בישראל. אנחנו מוצאים עבורכם וילות, צימרים, דירות נופש, מלונות בוטיק ומתחמי אירועים שמתאימים בדיוק לצרכים שלכם — עם שירות אישי ומקצועי.' },
        },
        {
          '@type': 'Question',
          name: 'איך מחפשים צימר דרך MULTIBRAWN?',
          acceptedAnswer: { '@type': 'Answer', text: 'פשוט מאוד — פותחים שיחה עם ערדית, העוזרת החכמה שלנו בצ׳אטבוט. היא תשאל אתכם כמה שאלות, ותמצא לכם את האפשרויות המתאימות ביותר. אחר כך מעבירים את הפרטים לוואטסאפ ואנחנו חוזרים אליכם מהר.' },
        },
        {
          '@type': 'Question',
          name: 'באילו אזורים בישראל אתם פועלים?',
          acceptedAnswer: { '@type': 'Answer', text: 'אנחנו פועלים בכל ישראל — הצפון (גליל, גולן, כנרת), המרכז (תל אביב, הרצליה), הדרום (מדבר יהודה, אילת), וירושלים והסביבה.' },
        },
        {
          '@type': 'Question',
          name: 'האם יש שירות לציבור הדתי?',
          acceptedAnswer: { '@type': 'Answer', text: 'כן! אנחנו מתמחים בשירות לציבור הדתי וחרדי — כולל בדיקת כשרות, צניעות, מרחק מבית כנסת, ומניין. שבתות חתן דתיות הן אחד התחומים המרכזיים שלנו.' },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
