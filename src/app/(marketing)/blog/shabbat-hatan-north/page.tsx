import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';
import ArticleJsonLd from '@/components/ArticleJsonLd';

export const metadata: Metadata = {
  title: "שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים | MULTIBRAWN",
  description: "שבת חתן בצפון: למה מתחם פרטי בגליל או בגולן מנצח מלון במרכז, מה בעל המתחם לא אומר בטלפון, החשבון של כניסת השבת בחורף — ואיך בוחרים אזור לפי הקבוצה שלכם.",
  keywords: ["שבת חתן בצפון", "מתחם לשבת חתן בצפון", "שבת חתן בגליל", "שבת חתן ברמת הגולן", "מתחם אירוח לקבוצות בצפון", "שבת חתן", "ארגון שבת חתן"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/shabbat-hatan-north' },
  openGraph: {
    title: "שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים | MULTIBRAWN",
    description: "למה מתחם פרטי בצפון מנצח מלון במרכז, מה בעל המתחם לא אומר בטלפון, והחשבון של כניסת השבת בחורף.",
    url: 'https://multibrawn.co.il/blog/shabbat-hatan-north',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png', width: 1200, height: 630, alt: "שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים | MULTIBRAWN",
    description: "למה מתחם פרטי בצפון מנצח מלון במרכז, מה בעל המתחם לא אומר בטלפון, והחשבון של כניסת השבת בחורף.",
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png'],
  },
};

export default function Article() {
  return (
    <>
    <ArticleJsonLd
      url="https://multibrawn.co.il/blog/shabbat-hatan-north"
      title="שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים"
      description="שבת חתן בצפון: למה מתחם פרטי בגליל או בגולן מנצח מלון במרכז, מה בעל המתחם לא אומר בטלפון, החשבון של כניסת השבת בחורף."
      datePublished="2026-10-30"
      image="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png"
      keywords={["שבת חתן בצפון", "שבת חתן בגליל", "שבת חתן ברמת הגולן", "מתחם לשבת חתן בצפון"]}
    />
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>שבת חתן בצפון</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>שבת חתן</div>
          <h1 className={styles.title}>שבת חתן בצפון — החלום, ומה שחייבים לבדוק לפני שסוגרים</h1>
          <div className={styles.meta}>
            <span>30 באוקטובר 2026</span>
            <span>⏱️ 6 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>כשמשפחה אומרת לי &quot;אנחנו רוצים צפון&quot;, אני שואלת קודם כל שאלה אחת שמפתיעה אותם: מי האורח הכי מבוגר שלכם? כי התשובה עליה קובעת אם הצפון הוא החלום — או הסיבוך.</p>
          <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer" className={styles.guideBox}>
            📘 יש לי שני מדריכים לשבת חתן: <em>מדריך חינמי</em> לכל משפחה, ולצידו <em>המהדורה המלאה בתשלום</em> — רשימות, חלוקת אחריות וכלי חישוב. לחצו לקבלת המדריך ←
          </a>

          <h2>למה בכלל צפון?</h2>
          <p>כי בצפון אפשר לקבל מה שכמעט בלתי אפשרי במרכז: מתחם שלם רק שלכם. בלי שכנים מעבר לקיר, בלי הערות על שירה בליל שבת, עם דשא שהילדים רצים בו וחדר אוכל במרחק הליכה מהחדרים. ולרוב — במחיר נוח יותר ממלון במרכז.</p>

          <h2>מה שבעל המתחם בצפון לא אומר בטלפון</h2>
          <p>כדי לנהל משא ומתן נכון, צריך להבין גם את הצד שלו: סוף השבוע הוא כל הפרנסה שלו. לכן יש מינימום לילות, המחיר של שבת קיץ שונה משבת חורף, והוא מעדיף קבוצה אחת שלוקחת את כל המתחם מאשר שתי משפחות שמתחלקות. מי שמבין את זה — מדבר איתו בשפה אחרת, ומקבל תנאים אחרים.</p>

          <h2>החשבון שכולם שוכחים: שעת כניסת השבת</h2>
          <p>בחורף השבת נכנסת בצפון לפני 16:30. משפחה מירושלים או מהמרכז חייבת לצאת מוקדם ביום שישי — ועם אורחים מבוגרים והסעות, זה הסעיף שקובע אם מגיעים רגועים או בלחץ. זו בדיוק הסיבה לשאלה על האורח המבוגר: בשבילו חשוב גם שחדר האוכל, מקום התפילה והלינה יהיו באותו מתחם, בלי עליות ובלי הליכה ארוכה בשבת.</p>

          <h2>אזור אזור והאופי שלו</h2>
          <p>• <strong>הגליל העליון</strong> — מתחמים גדולים במושבים, ירוק, מתאים לקבוצות גדולות.<br/>
          • <strong>רמת הגולן</strong> — מרחבים ואוויר צלול, נעים גם בשבתות קיץ.<br/>
          • <strong>סובב כנרת</strong> — קרוב ונוח להגעה, אבל חם מאוד בקיץ — מיזוג הוא לא המלצה, הוא תנאי.</p>
          <p>אין &quot;הצפון&quot; אחד. יש התאמה של אזור לקבוצה שלכם — לגיל האורחים, לעונה ולמרחק הנסיעה.</p>

          <h2>אוכל וכשרות בצפון</h2>
          <p>שתי דרכים: קייטרינג מקומי מהצפון, או שינוע מהמרכז. לכל אחת יתרון — ושתיהן דורשות לסגור מראש את רמת הכשרות (רבנות, מהדרין, בד&quot;ץ) לפי הקהל שלכם: חרדי, דתי או מעורב. מתחם ושירות שמושלמים לקהל אחד יכולים לא להתאים בכלל לקהל אחר — וזה דבר שמבררים לפני הסגירה, לא אחריה.</p>

          <h2>ואם חשבתם על מלון בצפון</h2>
          <p>הכללים שכתבתי עליהם <Link href="/blog/shabbat-hatan-cost-guide">במאמר התקציב</Link> תקפים גם כאן: רוב המלונות מעדיפים קבוצות של 15 עד 25 חדרים, יש להם אולם אחד או שניים שנתפסים חודשים מראש — ו&quot;יש אולם&quot; בטלפון זה לא &quot;האולם שלכם סגור בחוזה&quot;. רק בכתב.</p>

          <h2>אז איך בוחרים נכון?</h2>
          <p>בדיוק בגלל כל ההבדלים האלה אני מתחילה כל התאמה בשאלון קצר: כמה אורחים, איזה קהל, איזו כשרות, תאריך ותקציב. בלי התשובות האלה אי אפשר להתאים מתחם בצפון באמת — רק לנחש. ואם אתם רוצים להגיע מוכנים, התחילו מ<a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המדריך החינמי לשבת חתן</a>, ולצידו <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המהדורה המלאה בתשלום</a> — עם הרשימות, חלוקת האחריות וכלי החישוב.</p>
          <p>מוזמנים לקרוא עוד על <Link href="/shabbat-hatan">שבת חתן עם MULTIBRAWN</Link>, על <Link href="/blog/shabbat-hatan-jerusalem">שבת חתן בירושלים והסביבה</Link> או על <Link href="/blog/villa-30-guests">וילות לקבוצות של 30 ומעלה</Link>.</p>
        </div>

        <div className={styles.cta}>
          <h2>חולמים על שבת חתן בצפון?</h2>
          <p>נתאים לכם מתחם לפי הקבוצה, הכשרות והתקציב</p>
          <div className={styles.ctaButtons}>
            <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>למדריך המלא</a>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
