import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "מבחן הצניעות — כתוב פרטיות מלאה אבל השכן רואה הכל | MULTIBRAWN",
  description: "צימר לציבור הדתי — איך לבדוק פרטיות אמיתית, צניעות, כשרות ומרחק מבית כנסת. הטיפים שיחסכו לכם אכזבות בחופשה.",
  keywords: ["צימר לדתיים", "צימר כשר", "פרטיות מלאה", "צניעות בצימר", "נופש דתי", "שבת חתן כשר"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/modesty-check-religious' },
  openGraph: {
    title: "מבחן הצניעות — כתוב פרטיות מלאה אבל השכן רואה הכל | MULTIBRAWN",
    description: "צימר לציבור הדתי — איך לבדוק פרטיות אמיתית, צניעות, כשרות ומרחק מבית כנסת. הטיפים שיחסכו לכם אכזבות בחופשה.",
    url: 'https://multibrawn.co.il/blog/modesty-check-religious',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png', width: 1200, height: 630, alt: "מבחן הצניעות — כתוב פרטיות מלאה אבל השכן רואה הכל | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "מבחן הצניעות — כתוב פרטיות מלאה אבל השכן רואה הכל | MULTIBRAWN",
    description: "צימר לציבור הדתי — איך לבדוק פרטיות אמיתית, צניעות, כשרות ומרחק מבית כנסת. הטיפים שיחסכו לכם אכזבות בחופשה.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png'],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>מבחן הצניעות</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>מבחן הצניעות</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 6 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png" alt="מבחן הצניעות" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>מאמר 2: מבחן הצניעות (לציבור הדתי/חרדי)</p>
          <p>🫣 כתוב "פרטיות מלאה", אבל השכן מלמעלה רואה הכל. כך תבדקו באמת.</p>
          <p>עבור זוג דתי או חרדי שיוצא לחופשה, המילה "פרטיות" היא לא מותרות – היא הלכה. אין דבר יותר מתסכל מלשלם אלפי שקלים על "סוויטה יוקרתית עם בריכה פרטית לציבור הדתי", להגיע למקום עם בגד ים צנוע, ואז להרים את הראש ולגלות שכל העולם ואשתו יכולים לראות אתכם.</p>
          <p>הסיפור הזה חוזר על עצמו שוב ושוב: אתם נכנסים למים, ופתאום קולטים שמרפסת הוילה השכנה (שנמצאת במפלס קרקע גבוה יותר) צופה ישירות לתוך הבריכה שלכם. באותו רגע, הבריכה הופכת ל"מוצג מוזיאוני". אי אפשר להשתמש בה. החופשה הפכה לשהייה בחדר סגור, עם תחושת החמצה ענקית וכסף שהלך לפח.</p>
          <p>ב-Multibrawn, אנחנו מבינים שצניעות היא קו אדום. לכן כתבנו את המדריך המלא לבדיקת פרטיות אמיתית בצימרים.</p>
          <p>ההבדל בין "מוצנע" ל"צנוע"</p>
          <p>בעלי צימרים חילונים רבים רוצים למשוך את הקהל הדתי, ולכן כותבים "מתאים לדתיים". מבחינתם, אם יש גדר במבוק סביב החצר – זה פרטי. הם לא תמיד מבינים את המושג ההלכתי של "היזק ראייה". גדר במבוק יכולה להיות דלילה (עם רווחים שרואים דרכם), והיא בוודאי לא עוזרת אם יש בניין רב קומות במרחק 50 מטר שמשקיף עליכם מלמעלה.</p>
          <p>כדי שבריכה תהיה באמת צנועה וכשרה לשחייה, היא צריכה לעבור מבחן מחמיר של "קווי ראייה".</p>
          <p>שלושת המבחנים שאתם חייבים לעשות</p>
          <p>1. מבחן הלוויין (Google Maps) לפני שאתם סוגרים, בקשו את הכתובת המדויקת ופתחו את המפה במצב "לוויין". הסתכלו על הבריכה שלכם מלמעלה. האם יש בתים צמודים? האם הגגות שלהם נראים קרובים מידי? אם אתם רואים בניין קומות או וילה גדולה בצמוד לחצר – זו נורת אזהרה אדומה.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים צימר מושלם?</h2>
          <p>דברו איתנו!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}

