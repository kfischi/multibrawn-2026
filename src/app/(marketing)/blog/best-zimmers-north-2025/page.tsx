import type { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from './ZimmersNorth.module.css';

export const metadata: Metadata = {
  title: 'צימרים בצפון - 50+ צימרים מומלצים בגליל והגולן 2025 | MULTIBRAWN',
  description: 'מחפשים צימר בצפון? ✓ 50+ צימרים מובחרים בגליל והגולן ✓ עם בריכה וג\'קוזי ✓ אווירה רומנטית ✓ מחירים הוגנים ✓ 9+ שנות ניסיון ✓ ייעוץ אישי חינם',
  keywords: [
    'צימרים בצפון',
    'צימרים בגליל',
    'צימרים בגולן',
    'צימר רומנטי בצפון',
    'צימרים עם בריכה בצפון',
    'צימרים עם ג\'קוזי בצפון',
    'צימרים בגליל העליון',
    'צימרים בגליל המערבי',
    'אירוח בצפון',
    'סופ"ש בצפון',
  ],
  openGraph: {
    title: 'צימרים בצפון - המדריך המלא 2025 | MULTIBRAWN',
    description: 'מחפשים צימר בצפון? גלו את 50+ הצימרים המומלצים ביותר בגליל והגולן. בריכה, ג\'קוזי, אווירה רומנטית ומחירים הוגנים.',
    url: 'https://multibrawn.co.il/zimmers-north',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
        width: 1200,
        height: 630,
        alt: 'צימרים בצפון - MULTIBRAWN',
      },
    ],
    locale: 'he_IL',
    siteName: 'MULTIBRAWN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'צימרים בצפון - המדריך המלא 2025',
    description: 'גלו את 50+ הצימרים המומלצים ביותר בגליל והגולן',
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg'],
  },
  alternates: {
    canonical: 'https://multibrawn.co.il/zimmers-north',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ZimmersNorthPage() {
  const breadcrumbData = {
    items: [
      { name: 'בית', url: 'https://multibrawn.co.il' },
      { name: 'צימרים', url: 'https://multibrawn.co.il/gallery' },
      { name: 'צימרים בצפון', url: 'https://multibrawn.co.il/zimmers-north' },
    ],
  };

  const faqData = {
    questions: [
      {
        question: 'כמה עולה צימר בצפון ללילה?',
        answer: 'מחירי צימרים בצפון נעים בין 500-2,000 ₪ ללילה, תלוי בעונה, באזור הספציפי ובמתקנים. צימרים בסיסיים עולים 500-800 ₪, צימרים עם בריכה 800-1,200 ₪, וצימרים יוקרתיים עם ג\'קוזי ובריכה מחוממת 1,200-2,000 ₪ ללילה.',
      },
      {
        question: 'מה האזור הכי מומלץ לצימר בצפון?',
        answer: 'האזורים המומלצים ביותר הם: גליל העליון (רומנטי, נוף הרים, קרוב לאטרקציות), גולן (נופים פתוחים, שקט, יקבים), וגליל המערבי (קרוב לים, מסלולי טיול). כל אזור מציע אווירה שונה - תלוי מה אתם מחפשים.',
      },
      {
        question: 'האם יש צימרים שומרי שבת בצפון?',
        answer: 'כן! יש מגוון רחב של צימרים שומרי שבת בצפון, במיוחד באזורים כמו צפת, ראש פינה ומושבים דתיים בגליל. הצימרים כוללים פלטה שבת, מטבח כשר, ואפשרות למשגיח. אנחנו ב-MULTIBRAWN מתמחים באיתור צימרים שומרי שבת מתאימים.',
      },
      {
        question: 'מה כדאי לעשות בסביבת הצימר בצפון?',
        answer: 'יש המון אפשרויות: טיול לבניאס ותל דן, ביקור ביקבים בגולן, שייט בכנרת, טיול ברמת הגולן, ביקור בצפת העתיקה, ג\'יפים בשטח, אקסטרים (זיפליין, רפטינג), והמון מסעדות איכותיות.',
      },
      {
        question: 'מתי העונה הכי טובה לצימר בצפון?',
        answer: 'כל עונה יפה בצפון! אביב (מרץ-מאי) - פריחה ונופים ירוקים. קיץ (יוני-אוגוסט) - חם אבל נעים בערב. סתיו (ספטמבר-נובמבר) - מזג אוויר מושלם. חורף (דצמבר-פברואר) - שלג לפעמים, רומנטי במיוחד. המחירים הכי זולים הם בתקופות חול בחורף ובקיץ.',
      },
      {
        question: 'האם צריך להזמין צימר מראש?',
        answer: 'מומלץ מאוד! בסופי שבוע וחגים הצימרים הטובים מתפוסים 2-3 חודשים מראש. בימי חול אפשר למצוא גם ברגע האחרון, אבל הבחירה מצומצמת. כדי לקבל את הצימר הכי מתאים ובמחיר הטוב - תזמינו לפחות חודש מראש.',
      },
      {
        question: 'איך MULTIBRAWN עוזרת לי למצוא צימר?',
        answer: 'אנחנו עובדים עם 50+ צימרים מובחרים בצפון, כולם נבדקו אישית על ידינו. תספרו לנו מה אתם מחפשים (אזור, תקציב, תאריכים, דרישות מיוחדות) ואנחנו נציע לכם 3-5 אפשרויות מתאימות. השירות בחינם, אתם משלמים רק לבעל הצימר.',
      },
      {
        question: 'מה כלול במחיר הצימר?',
        answer: 'בדרך כלל כלול: לינה, מצעים ומגבות, ציוד מטבח בסיסי, חנייה. לפעמים כלול גם: ארוחת בוקר, כניסה לבריכה/ג\'קוזי, עצים למנגל. דברים שלא כלולים: אוכל (מלבד אם צוין אחרת), שתייה, פעילויות חיצוניות. חשוב לוודא מראש מה בדיוק כלול.',
      },
    ],
  };

  return (
    <>
      {/* Schema Markup */}
      <SchemaMarkup type="organization" />
      <SchemaMarkup type="localBusiness" />
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      <SchemaMarkup type="faq" data={faqData} />

      <div className={styles.page}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">בית</Link>
              <span>/</span>
              <Link href="/gallery">גלריה</Link>
              <span>/</span>
              <span>צימרים בצפון</span>
            </nav>

            <h1 className={styles.title}>
              צימרים בצפון - המדריך המלא לבחירת הצימר המושלם ב-2025
            </h1>

            <p className={styles.subtitle}>
              מחפשים צימר רומנטי, מרגיע ומושלם בצפון? גלו את <strong>50+ הצימרים הכי מומלצים</strong> בגליל, בגולן ובגליל המערבי. 
              עם בריכות מחוממות, ג'קוזי פרטי, נופים עוצרי נשימה ואווירה רומנטית - הכל במקום אחד!
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>צימרים מובחרים</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>9+</div>
                <div className={styles.statLabel}>שנות ניסיון</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>שביעות רצון</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className={styles.content}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>למה לבחור צימר בצפון?</h2>
            
            <div className={styles.intro}>
              <p>
                <strong>צפון הארץ הוא היעד המספר 1 לסופי שבוע רומנטיים וחופשות זוגיות בישראל.</strong> האזור מציע שילוב 
                מנצח של נופים עוצרי נשימה, אוויר צלול הרים, אטרקציות מגוונות, מסעדות איכותיות ו טון של אפשרויות בילוי - 
                הכל במרחק נסיעה סביר מהמרכז.
              </p>

              <p>
                בין אם אתם מחפשים <strong>צימר רומנטי לזוג</strong> עם ג'קוזי פרטי ובריכה מחוממת, <strong>צימר משפחתי</strong> 
                מרווח עם מתקנים לילדים, או <strong>צימר שקט ומבודד</strong> לנתק מהשגרה - הצפון מציע את הכל.
              </p>

              <p>
                ב-<strong>MULTIBRAWN</strong> אנחנו מתמחים באיתור הצימרים הכי טובים ואיכותיים בצפון כבר <strong>מעל 9 שנים</strong>. 
                כל צימר ברשימה שלנו עבר בדיקה אישית קפדנית, ואנחנו עובדים רק עם בעלי צימרים אמינים ואיכותיים.
              </p>
            </div>

            <h2 className={styles.sectionTitle}>איזה אזור לבחור? מפת הצפון</h2>

            <div className={styles.regions}>
              <div className={styles.regionCard}>
                <h3>🏔️ גליל עליון</h3>
                <p>
                  <strong>האזור הכי פופולרי!</strong> כולל את ראש פינה, מצפה הימים, צפת, עין זיתים ועוד. 
                  מאופיין בנופי הרים ירוקים, אווירה רומנטית, קרבה לאטרקציות (בניאס, תל דן, חרמון), 
                  ומגוון רחב של מסעדות איכותיות. מתאים לזוגות שרוצים שילוב של רומנטיקה ופעילויות.
                </p>
                <Link href="/zimmers-upper-galilee" className={styles.regionLink}>
                  צפה בצימרים בגליל העליון →
                </Link>
              </div>

              <div className={styles.regionCard}>
                <h3>🍇 רמת הגולן</h3>
                <p>
                  <strong>נופים פתוחים ושקט מוחלט.</strong> כולל את קצרין, אניעם, מבוא חמה, אפיק ועוד. 
                  מאופיין בנופים פתוחים, יקבים מצוינים, שקט אמיתי והרבה שטח. מתאים לזוגות שרוצים 
                  "לנתק" לגמרי, אוהבים יין, ומעדיפים אווירה של רוגע על פני המולה.
                </p>
                <Link href="/zimmers-golan" className={styles.regionLink}>
                  צפה בצימרים ברמת הגולן →
                </Link>
              </div>

              <div className={styles.regionCard}>
                <h3>🌊 גליל מערבי</h3>
                <p>
                  <strong>קרוב לים, שילוב מושלם!</strong> כולל את פקיעין, גורן, מעליא ועוד. 
                  מאופיין בקרבה לחוף הים (20-30 דקות), נופי הרים ירוקים, מזג אוויר נעים, 
                  ומסלולי טיול מדהימים. מתאים למי שרוצה שילוב של הרים + ים באותה חופשה.
                </p>
                <Link href="/zimmers-western-galilee" className={styles.regionLink}>
                  צפה בצימרים בגליל המערבי →
                </Link>
              </div>

              <div className={styles.regionCard}>
                <h3>🏞️ כנרת והסביבה</h3>
                <p>
                  <strong>ליד האגם הכי יפה בישראל!</strong> כולל את טבריה, מגדל, כפר כנא ועוד. 
                  מאופיין בקרבה לכנרת, אפשרות לפעילויות מים (שייט, קייק), מזג אוויר חם בקיץ, 
                  ומגוון אטרקציות. מתאים למשפחות ולזוגות שאוהבים פעילויות מים.
                </p>
                <Link href="/zimmers-kinneret" className={styles.regionLink}>
                  צפה בצימרים באזור הכנרת →
                </Link>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>סוגי הצימרים הפופולריים ביותר</h2>

            <div className={styles.types}>
              <div className={styles.typeCard}>
                <h3>💕 צימרים רומנטיים לזוגות</h3>
                <p>
                  צימר רומנטי זה בדרך כלל <strong>צימר קטן ואינטימי</strong> שמיועד לזוג אחד בלבד. 
                  הוא כולל: מיטה זוגית גדולה, ג'קוזי פרטי (פנימי או חיצוני), פינת ישיבה נעימה, 
                  חצר/מרפסת פרטית, ולעיתים גם בריכה קטנה או בריכת שכשוך.
                </p>
                <p>
                  <strong>המחיר:</strong> 700-1,500 ₪ ללילה תלוי בעונה ובמתקנים.
                </p>
                <p>
                  <strong>מתאים ל:</strong> חגיגות יום נישואין, סופי שבוע זוגיים, הצעות נישואין.
                </p>
                <Link href="/romantic-zimmers-north" className={styles.typeLink}>
                  ראה את כל הצימרים הרומנטיים →
                </Link>
              </div>

              <div className={styles.typeCard}>
                <h3>🏊 צימרים עם בריכה מחוממת</h3>
                <p>
                  צימר עם בריכה מחוממת זה <strong>שדרוג משמעותי</strong> שמאפשר לכם ליהנות מהבריכה 
                  גם בחורף! הבריכה מחוממת ל-28-30 מעלות, ולרוב היא מקורה או מוגנת מפני רוח.
                </p>
                <p>
                  <strong>המחיר:</strong> 1,000-2,000 ₪ ללילה (יקר יותר אבל שווה כל שקל!).
                </p>
                <p>
                  <strong>מתאים ל:</strong> מי שרוצה ליהנות מבריכה בכל עונה, מי שאוהב מים, משפחות עם ילדים.
                </p>
                <Link href="/zimmers-heated-pool-north" className={styles.typeLink}>
                  ראה צימרים עם בריכה מחוממת →
                </Link>
              </div>

              <div className={styles.typeCard}>
                <h3>👨‍👩‍👧‍👦 צימרים משפחתיים מרווחים</h3>
                <p>
                  צימר משפחתי הוא <strong>צימר גדול יותר</strong> (80-150 מ"ר) שמכיל 2-4 חדרי שינה, 
                  סלון מרווח, מטבח מאובזר, וחצר גדולה. לעיתים יש מתקנים לילדים (נדנדה, טרמפולינה).
                </p>
                <p>
                  <strong>המחיר:</strong> 1,200-2,500 ₪ ללילה (תלוי בגודל ובמספר חדרים).
                </p>
                <p>
                  <strong>מתאים ל:</strong> משפחות עם 2-4 ילדים, שתי משפחות ביחד, מפגשים משפחתיים.
                </p>
                <Link href="/family-zimmers-north" className={styles.typeLink}>
                  ראה צימרים משפחתיים →
                </Link>
              </div>

              <div className={styles.typeCard}>
                <h3>🕯️ צימרים שומרי שבת</h3>
                <p>
                  צימרים שומרי שבת הם צימרים ה<strong>מותאמים לציבור הדתי</strong>: מטבח כשר, 
                  פלטה שבת, נרות שבת, אפשרות למשגיח, קרבה לבית כנסת, וכמובן - שמירת קודש השבת.
                </p>
                <p>
                  <strong>המחיר:</strong> 800-1,800 ₪ ללילה (תלוי ברמת הכשרות והמתקנים).
                </p>
                <p>
                  <strong>מתאים ל:</strong> משפחות דתיות, שבתות חתן, מפגשים דתיים.
                </p>
                <Link href="/shabbat-observant-zimmers-north" className={styles.typeLink}>
                  ראה צימרים שומרי שבת →
                </Link>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>איך לבחור את הצימר המושלם? 7 טיפים</h2>

            <div className={styles.tips}>
              <div className={styles.tip}>
                <h3>1️⃣ החליטו על התקציב מראש</h3>
                <p>
                  מחירי צימרים בצפון נעים בין 500 ₪ (צימר בסיסי בימי חול) ל-2,500 ₪ (צימר יוקרתי בסופ"ש). 
                  קבעו תקציב מראש וחפשו רק בטווח המחירים שלכם - זה יחסוך לכם זמן ואכזבות.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>2️⃣ בדקו מה כלול במחיר</h3>
                <p>
                  לא כל צימר כולל אותם דברים. חשוב לבדוק: האם ארוחת בוקר כלולה? האם הבריכה/ג'קוזי חופשיים? 
                  האם יש תוספת עבור ילדים? האם עצים למנגל כלולים? דברים קטנים יכולים להוסיף מאות שקלים.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>3️⃣ בדקו ביקורות אמיתיות</h3>
                <p>
                  תמונות יכולות להטעות. חפשו ביקורות באתרים כמו Google, Facebook, ו-TripAdvisor. 
                  שימו לב במיוחד לביקורות שליליות - אם יש דפוס חוזר (למשל "בעל הצימר לא עונה לטלפון"), 
                  זה סימן אזהרה.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>4️⃣ התקשרו לבעל הצימר</h3>
                <p>
                  לפני הזמנה סופית, התקשרו לבעל הצימר. שאלו שאלות ספציפיות, בדקו איך הוא מגיב, 
                  האם הוא סבלני ומקצועי. אם הוא לא עונה לטלפון או מתחמק מתשובות - זה סימן רע.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>5️⃣ בדקו את מדיניות הביטולים</h3>
                <p>
                  תוכניות משתנות. ודאו שאתם מבינים את מדיניות הביטולים: מה קורה אם תבטלו שבוע לפני? 
                  האם יש החזר כספי? האם אפשר לשנות תאריכים? זה חשוב במיוחד אם אתם מזמינים מספר חודשים מראש.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>6️⃣ בדקו את המרחק מאטרקציות</h3>
                <p>
                  אם אתם מתכננים לבקר באטרקציות (בניאס, תל דן, חרמון), בדקו כמה זמן נסיעה מהצימר. 
                  לפעמים צימר ש"נראה קרוב" במפה הוא בעצם 40 דקות נסיעה בדרכים הרריות.
                </p>
              </div>

              <div className={styles.tip}>
                <h3>7️⃣ שאלו על אפשרויות ארוחות</h3>
                <p>
                  חלק מהצימרים מציעים ארוחת בוקר (לפעמים כלול, לפעמים בתוספת תשלום). 
                  שאלו גם האם יש מסעדות טובות בקרבת מקום, או שאתם צריכים להביא אוכל מהבית.
                </p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>שאלות נפוצות על צימרים בצפון</h2>

            <div className={styles.faq}>
              {faqData.questions.map((q, index) => (
                <details key={index} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{q.question}</summary>
                  <div className={styles.faqAnswer}>{q.answer}</div>
                </details>
              ))}
            </div>

            <h2 className={styles.sectionTitle}>למה לבחור ב-MULTIBRAWN?</h2>

            <div className={styles.why}>
              <div className={styles.whyCard}>
                <h3>✅ 9+ שנות ניסיון</h3>
                <p>
                  אנחנו ב-MULTIBRAWN עובדים בתחום האירוח מעל 9 שנים. ביקרנו באלפי צימרים, הכרנו מאות 
                  בעלי צימרים, וצברנו ניסיון עצום בהתאמה מדויקת בין לקוחות לצימרים.
                </p>
              </div>

              <div className={styles.whyCard}>
                <h3>🔍 בדיקה אישית של כל צימר</h3>
                <p>
                  כל צימר ברשימה שלנו עבר בדיקה קפדנית. אנחנו מגיעים פיזית, בודקים את המתקנים, 
                  הניקיון, האווירה, ומוודאים שהתמונות באתר תואמות את המציאות.
                </p>
              </div>

              <div className={styles.whyCard}>
                <h3>💬 שירות אישי וזמין</h3>
                <p>
                  ב-MULTIBRAWN תקבלו שירות אישי ומותאם. ספרו לנו מה אתם מחפשים (תקציב, אזור, תאריכים, 
                  דרישות מיוחדות) ואנחנו נציע לכם 3-5 צימרים מתאימים. אפשר לדבר איתנו בוואטסאפ, טלפון, או הבוט החכם.
                </p>
              </div>

              <div className={styles.whyCard}>
                <h3>🎁 ללא עמלה!</h3>
                <p>
                  השירות שלנו חינם לחלוטין! אתם לא משלמים לנו כלום - אתם משלמים רק לבעל הצימר. 
                  אנחנו מרוויחים עמלה קטנה מבעל הצימר, אבל זה לא משפיע על המחיר שלכם.
                </p>
              </div>

              <div className={styles.whyCard}>
                <h3>🤖 בוט חכם 24/7</h3>
                <p>
                  יש לנו בוט חכם (ערדית) שעובד 24 שעות ביממה! תוכלו לשאול אותו שאלות, לקבל המלצות, 
                  ולהתחיל את התהליך בכל שעה - גם בשבת, גם באמצע הלילה.
                </p>
              </div>

              <div className={styles.whyCard}>
                <h3>⭐ מחירים הוגנים</h3>
                <p>
                  אנחנו עובדים רק עם בעלי צימרים שמציעים מחירים הוגנים ושקופים. לא תמצאו פתאום 
                  "תוספות מפתיעות" בסוף - הכל שקוף ומוסבר מראש.
                </p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>מוכנים למצוא את הצימר המושלם?</h2>

            <div className={styles.cta}>
              <p className={styles.ctaText}>
                <strong>אל תבזבזו זמן על חיפושים!</strong> ספרו לנו מה אתם מחפשים ואנחנו נמצא לכם 
                את הצימר המושלם בצפון - בחינם, מהר ובלי התחייבות.
              </p>

              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.ctaButton}>
                  דברו עם ערדית - הבוט החכם →
                </Link>
                <a 
                  href="https://wa.me/972523983394?text=היי! אני מחפש צימר בצפון" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButtonWhatsapp}
                >
                  שלחו לנו הודעה בוואטסאפ →
                </a>
              </div>

              <p className={styles.ctaNote}>
                💡 התהליך לוקח 2-3 דקות, ותקבלו תשובה תוך 24 שעות!
              </p>
            </div>

            <h2 className={styles.sectionTitle}>מאמרים קשורים</h2>

            <div className={styles.related}>
              <Link href="/blog/best-zimmers-north-2025" className={styles.relatedCard}>
                <h3>10 הצימרים הכי מומלצים בצפון ב-2025</h3>
                <p>רשימה מעודכנת של הצימרים שזכו לכי הרבה ביקורות חיוביות השנה</p>
              </Link>

              <Link href="/blog/planning-romantic-weekend-north" className={styles.relatedCard}>
                <h3>איך לתכנן סוף שבוע רומנטי מושלם בצפון</h3>
                <p>מדריך שלב אחר שלב עם טיפים, המלצות מסעדות ואטרקציות</p>
              </Link>

              <Link href="/blog/winter-vs-summer-zimmers" className={styles.relatedCard}>
                <h3>צימר בחורף vs צימר בקיץ - מה עדיף?</h3>
                <p>השוואה מפורטת בין העונות, יתרונות וחסרונות של כל תקופה</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
