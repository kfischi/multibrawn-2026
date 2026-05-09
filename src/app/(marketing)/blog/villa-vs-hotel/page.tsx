import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'וילה פרטית או מלון? מה שווה יותר לכסף שלכם | MULTIBRAWN',
  description: 'השוואה אמיתית בין וילה פרטית למלון: מחירים, פרטיות, שירות, ומה מתאים לכם.',
  keywords: ['וילה פרטית', 'וילה או מלון', 'נופש בווילה', 'השוואת נופש', 'מלון בוטיק'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/villa-vs-hotel' },
  openGraph: {
    title: 'וילה פרטית או מלון? מה שווה יותר | MULTIBRAWN',
    description: 'השוואה אמיתית — מחירים, פרטיות, שירות.',
    url: 'https://multibrawn.co.il/blog/villa-vs-hotel',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>וילה או מלון</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>🏡 וילה פרטית או מלון? מה שווה יותר לכסף שלכם</h1>
          <div className={styles.meta}><span>5 בינואר 2025</span><span>⏱️ 6 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>השאלה הזו חוזרת אלינו בכל שיחה. התשובה? תלוי בכם. אבל יש כמה פרמטרים שיעזרו לכם להחליט.</p>

          <h2>💰 מחיר: מי זול יותר?</h2>
          <p>לזוג בן לילה אחת — מלון בוטיק לרוב זול יותר. לקבוצה של 6+ אנשים ל-3 לילות? וילה זולה משמעותית. כשמחלקים את עלות הוילה למספר האנשים, לרוב יוצא פחות ממחיר חדר מלון לאדם.</p>

          <h2>🔒 פרטיות: ניצחון ברור לוילה</h2>
          <p>במלון — שכנים דרך הקיר, מסדרון משותף, בריכה שיתופית. בוילה פרטית — הכל שלכם. הבריכה, הגינה, הסלון. אין אורחים אחרים. זה הבדל עצום, במיוחד לשבתות חתן, ימי הולדת ואירועים משפחתיים.</p>

          <h2>🍽️ נוחות לארוחות: וילה מנצחת</h2>
          <p>בוילה עם מטבח מאובזר, כל ארוחת בוקר חוסכת ₪80-150 לאדם. עבור משפחה של 6 לשלושה ימים — זה ₪1,500-2,700 חיסכון. הלחם הבוקרי ב-Airbnb הפריז'אי לא נשכח.</p>

          <h2>🛎️ שירות: מלון מנצח</h2>
          <p>קונסיירז, חדר אוכל, ספא, חדרייה — כל אלה קיימים במלון ולא תמיד בוילה. אם שירות אישי חשוב לכם — בחרו מלון בוטיק עם ביקורות טובות על השירות.</p>

          <h2>👨‍👩‍👧‍👦 עם ילדים: וילה מנצחת</h2>
          <p>גינה מאובזרת, בריכה פרטית שהילדים יכולים לקפוץ אליה בלי להסתנן בין זרים, ומטבח לחימום אוכל — הוילה הרבה יותר נוחה לנופש עם ילדים.</p>

          <h2>📊 סיכום: מתי לבחור מה?</h2>
          <p><strong>בחרו וילה כשאתם</strong>: קבוצה/משפחה גדולה, רוצים פרטיות מוחלטת, נוסעים עם ילדים, מתכננים שבת חתן/ימי הולדת.</p>
          <p><strong>בחרו מלון כשאתם</strong>: זוג לסוף שבוע קצר, רוצים שירות מלא, לא רוצים לדאוג לניקיון, נמצאים בעיר גדולה.</p>
        </div>
        <div className={styles.cta}>
          <h2>עדיין לא בטוחים?</h2>
          <p>ספרו לנו על הנסיעה שלכם — ונמצא מה מתאים בדיוק לכם</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394?text=שלום! אני מחליט בין וילה למלון, אפשר לקבל עזרה?" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
