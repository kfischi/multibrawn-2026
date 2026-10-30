import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';
import ArticleJsonLd from '@/components/ArticleJsonLd';

export const metadata: Metadata = {
  title: "למה קוראים לנו מולטי? הסיפור של MULTIBRAWN וערדית בראון",
  description: "מולטי בראון, MULTIBRAWN, ערדית בראון — למה דווקא \"מולטי\"? הסיפור מאחורי השם: שבתות חתן, וילות וצימרים, קהילת וילות וצימרים, ואיך הכול מתחבר לשירות אחד.",
  keywords: ["מולטי בראון", "MULTIBRAWN", "ערדית בראון", "מולטיבראון", "קהילת וילות וצימרים", "שבתות חתן", "וילות וצימרים", "מולטי"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/why-multi' },
  openGraph: {
    title: "למה קוראים לנו מולטי? הסיפור של MULTIBRAWN וערדית בראון",
    description: "הסיפור מאחורי השם מולטי: שבתות חתן, וילות וצימרים, קהילה — ואיך הכול מתחבר לשירות אחד.",
    url: 'https://multibrawn.co.il/blog/why-multi',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg', width: 1200, height: 630, alt: "למה קוראים לנו מולטי? MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "למה קוראים לנו מולטי? הסיפור של MULTIBRAWN",
    description: "הסיפור מאחורי השם מולטי — ערדית בראון, שבתות חתן, וילות וצימרים וקהילה.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg'],
  },
};

export default function Article() {
  return (
    <>
    <ArticleJsonLd
      url="https://multibrawn.co.il/blog/why-multi"
      title="למה קוראים לנו מולטי? הסיפור של MULTIBRAWN וערדית בראון"
      description="מולטי בראון, MULTIBRAWN, ערדית בראון — למה דווקא מולטי? הסיפור מאחורי השם: שבתות חתן, וילות וצימרים, קהילת וילות וצימרים, ואיך הכול מתחבר לשירות אחד."
      datePublished="2025-05-01"
      keywords={["מולטי בראון", "MULTIBRAWN", "ערדית בראון", "מולטיבראון"]}
    />
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>למה קוראים לנו מולטי?</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>הסיפור שלנו</div>
          <h1 className={styles.title}>למה קוראים לנו מולטי?</h1>
          <div className={styles.meta}>
            <span>28 באוקטובר 2026</span>
            <span>⏱️ 4 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>שואלים אותי את זה הרבה: מולטי בראון? MULTIBRAWN? מה זה ה&quot;מולטי&quot; הזה? אז הנה הסיפור — כי השם הזה הוא לא סתם שם. הוא בדיוק מה שאני עושה.</p>

          <h2>מולטי = הרבה. כי משפחה אחת צריכה הרבה דברים בבת אחת</h2>
          <p>כשמשפחה מתכננת שבת חתן, היא לא צריכה רק &quot;מקום&quot;. היא צריכה מתחם עם מספיק מיטות, בית כנסת במרחק הליכה, כשרות שמתאימה לקהל שלה, פתרון לינה למי שלא נכנס, ומישהו שמכיר את בעל המקום ויודע מה באמת קורה שם בשבת. זה הרבה דברים — מולטי. ואני, ערדית בראון, בניתי את העסק בדיוק סביב זה: כתובת אחת שמחזיקה את כל ה&quot;הרבה&quot; הזה בשבילכם.</p>

          <h2>יש כל מיני סוגים של מולטי</h2>
          <p>• <strong>מולטי מקומות</strong> — וילות, צימרים, מתחמי אירוח ומלונות בוטיק בכל הארץ, שאני מכירה מהשטח ולא מקטלוג.<br/>
          • <strong>מולטי אירועים</strong> — שבתות חתן, שבע ברכות, נופש משפחתי, אירוח קבוצות.<br/>
          • <strong>מולטי קהלים</strong> — חרדים, דתיים, מסורתיים ומעורב. כל קהל והצרכים שלו: כשרות, מניין, אווירה. אצלי לא מנחשים — שואלים.<br/>
          • <strong>מולטי קהילה</strong> — קהילת הווילות והצימרים שבניתי מחברת בין בעלי מתחמים איכותיים לבין אורחים מתאימים ואחראים. זה לא לוח מודעות — זו קהילה עם אמון.</p>

          <h2>ומי זאת בראון?</h2>
          <p>זו אני — ערדית בראון. יותר מעשר שנים בחיבורים בין אנשים ללוקיישנים, אחרי שנים בהפקות ובאירועים. את הסיפור המלא תמצאו <Link href="/about">בעמוד שלי</Link>, אבל השורה התחתונה פשוטה: אני לא אתר ולא לוח — אני בן אדם שעונה לכם, שואלת את השאלות הנכונות, ולוקחת אחריות על ההתאמה.</p>

          <h2>איך עובדים איתי?</h2>
          <p>מתחילים בשאלון קצר: כמה אורחים, איזה קהל, איזו כשרות, תאריך ותקציב. בלי השאלון אני לא ממליצה — כי התאמה אמיתית מתחילה בהקשבה, לא ברשימת קישורים. ולמי שמתכנן שבת חתן בניתי גם שני מדריכים: <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">מדריך חינמי</a> שכל משפחה יכולה להתחיל איתו, והמהדורה המלאה בתשלום — עם רשימות, חלוקת אחריות וכלי חישוב — באותו עמוד.</p>

          <p>רוצים להבין יותר לעומק? התחילו כאן: <Link href="/blog/shabbat-hatan-cost-guide">כמה עולה שבת חתן</Link> · <Link href="/blog/shabbat-hatan-jerusalem">שבת חתן בירושלים והסביבה</Link> · <Link href="/shabbat-hatan">עמוד שבת חתן</Link>.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים את ה&quot;מולטי&quot; הזה בשבילכם?</h2>
          <p>ספרו לי מה אתם מתכננים — ונתחיל מהשאלון</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
            <Link href="/about" className={styles.ctaButton}>הסיפור של ערדית</Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
