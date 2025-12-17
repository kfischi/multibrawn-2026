import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import styles from './ShabbatHatan.module.css';

// ✅ SEO Metadata מושלם
export const metadata: Metadata = {
  title: 'שבת חתן הכל כלול: לוקיישנים מובחרים בראש שקט | Multibrawn',
  description: 'מחפשים מקום לשבת חתן? ב-Multibrawn תמצאו וילות ומלונות שנבדקו אישית, כשרות מהודרת וליווי צמוד. שירות VIP מהרגע הראשון עד הקידוש האחרון. היכנסו לפרטים >>',
  keywords: [
    'שבת חתן',
    'מקום לשבת חתן',
    'וילה לשבת חתן',
    'צימר לשבת חתן',
    'מתחם לשבת חתן',
    'שבת חתן בצפון',
    'שבת חתן במרכז',
    'שבת חתן בדרום',
    'ארגון שבת חתן',
    'לוקיישן לשבת חתן',
    'כשרות לשבת חתן',
    'שבת חתן הכל כלול',
    'מקומות לשבת חתן',
    'שבת חתן משפחתי',
    'שבת חתן יוקרתי',
  ],
  authors: [{ name: 'Multibrawn' }],
  creator: 'Multibrawn',
  publisher: 'Multibrawn',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://multibrawn.co.il/shabbat-hatan',
  },
  openGraph: {
    title: 'שבת חתן הכל כלול: הלוקיישנים הכי שווים בראש שקט',
    description: 'מארגנים שבת חתן? אל תתפשרו! וילות ומלונות מובחרים, כשרות מהודרת, וליווי צמוד. קבלו את השירות הכי טוב בשוק ⭐',
    url: 'https://multibrawn.co.il/shabbat-hatan',
    siteName: 'Multibrawn',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
        width: 1200,
        height: 630,
        alt: 'שבת חתן מושלם - Multibrawn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'שבת חתן הכל כלול | Multibrawn',
    description: 'מקומות מעולים לשבת חתן עם כשרות מהודרת ושירות VIP',
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png'],
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

export default function ShabbatHatanPage() {
  return (
    <>
      {/* ✅ Schema.org Structured Data - מתקדם */}
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Multibrawn',
            url: 'https://multibrawn.co.il',
            logo: 'https://multibrawn.co.il/logo.png',
            description: 'צימרים, וילות ומתחמי אירועים מובחרים',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'IL',
              addressLocality: 'ישראל',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+972-52-398-3394',
              contactType: 'customer service',
              availableLanguage: ['Hebrew', 'English'],
            },
            sameAs: [
              'https://facebook.com/multibrawn',
              'https://instagram.com/multibrawn',
              'https://tiktok.com/@multibrawn',
              'https://youtube.com/@multibrawn',
            ],
          }),
        }}
      />

      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'עמוד הבית',
                item: 'https://multibrawn.co.il',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'שבת חתן',
                item: 'https://multibrawn.co.il/shabbat-hatan',
              },
            ],
          }),
        }}
      />

      <Script
        id="schema-video"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: 'שבת חתן בראש שקט - הטיפ של ערדית מולטיבראון',
            description: 'כולם עסוקים בחתונה אבל מה עם שבת חתן? תנו לנו לעזור לכם כדי שתוכלו להתמקד במה שחשוב. ערדית מסבירה איך חוסכים זמן וכאב ראש.',
            thumbnailUrl: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
            uploadDate: '2025-01-11T08:00:00+02:00',
            duration: 'PT39S',
            contentUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684490/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_gamaqi.mp4',
            embedUrl: 'https://multibrawn.co.il/shabbat-hatan#video',
            publisher: {
              '@type': 'Organization',
              name: 'Multibrawn',
              logo: {
                '@type': 'ImageObject',
                url: 'https://multibrawn.co.il/logo.png',
              },
            },
          }),
        }}
      />

      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'כמה זמן לפני כדאי להזמין מקום לשבת חתן?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'מומלץ להזמין מקום לשבת חתן לפחות 3-6 חודשים מראש, במיוחד אם מדובר בעונת שיא (אביב-קיץ) או בסופי שבוע פופולריים. ככל שתזמינו מוקדם יותר, כך תהיה לכם בחירה רחבה יותר של מקומות איכותיים.',
                },
              },
              {
                '@type': 'Question',
                name: 'מה הכשרות של המקומות ב-Multibrawn?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'כל המקומות שלנו פועלים בהשגחת כשרות מהודרת (רבנות מהדרין או בד"צ בהתאם לנכס). אנו מספקים תעודת כשרות בתוקף לפני סגירת ההזמנה, ויכולים לתאם משגיח צמוד שיחזיק במפתחות המטבח ויבטיח שמירת שבת מלאה.',
                },
              },
              {
                '@type': 'Question',
                name: 'האם יש פתרון לינה לכל המשפחה?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'כן! אנו מתמחים במתחמים גדולים שמאפשרים לינה למספר רב של אורחים. לפני סגירת העסקה, נציג בפניכם מפרט מלא של החדרים - כמה מיטות יש בכל חדר, איפה יש עריסות, ומה האופציות למזרנים נוספים. כך תוכלו לתכנן את שיבוץ האורחים בראש שקט.',
                },
              },
              {
                '@type': 'Question',
                name: 'מה כולל שירות ההכל כלול?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'שירות הכל כלול ב-Multibrawn כולל: בחירת המקום המתאים לכם, תיאום עם בעלי הנכס, הסדרת כשרות ומשגיח (במידת הצורך), סיוע בתכנון תפריט, ליווי צמוד לפני ובמהלך האירוע, ומענה 24/7 לכל שאלה או בעיה. אתם פשוט צריכים להגיע ולהנות!',
                },
              },
              {
                '@type': 'Question',
                name: 'איך הבוט של Multibrawn עוזר לי?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'הבוט החכם שלנו זמין 24/7 ושואל אתכם שאלות ממוקדות על תאריכים, מספר אורחים, תקציב והעדפות אישיות. בהתבסס על התשובות, הוא ממליץ על המקומות המתאימים ביותר ומעביר את הפרטים שלכם לערדית, שתיצור איתכם קשר עם הצעות מותאמות אישית.',
                },
              },
              {
                '@type': 'Question',
                name: 'האם אפשר לבטל או לשנות הזמנה?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'תנאי הביטול והשינוי משתנים בהתאם למקום הספציפי ולתאריך ההזמנה. בדרך כלל, ביטול מוקדם (60-90 יום לפני האירוע) מאפשר החזר מלא או חלקי. אנו ממליצים לרכוש ביטוח אירועים שמכסה מקרים בלתי צפויים. נשמח להסביר לכם את התנאים המדויקים בעת ההזמנה.',
                },
              },
            ],
          }),
        }}
      />

      <div className={styles.page}>
        {/* ✅ Breadcrumb Navigation */}
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <ol>
            <li>
              <Link href="/">עמוד הבית</Link>
            </li>
            <li aria-current="page">שבת חתן</li>
          </ol>
        </nav>

        {/* ✅ Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              שבת חתן הכל כלול: הלוקיישנים הכי שווים בראש שקט ואפס דאגות
            </h1>
            <p className={styles.heroSubtitle}>
              מהעלייה לתורה ועד הקידוש המשותף – סוף שבוע שזוכרים לכל החיים, בלי אף כאב ראש אחד
            </p>
            <div className={styles.heroCta}>
              <Link href="/contact" className={styles.btnPrimary}>
                מצאו לנו מקום מושלם 🎯
              </Link>
              <Link href="/gallery" className={styles.btnSecondary}>
                צפו בגלריה המלאה →
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png"
              alt="שבת חתן מושלם במתחם יוקרתי - Multibrawn"
              width={800}
              height={600}
              priority
              className={styles.heroImg}
            />
          </div>
        </section>

        {/* ✅ המסר העיקרי */}
        <section className={styles.intro}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>למה שבת חתן זה לא עוד "פריט" ברשימת המשימות</h2>
            
            <div className={styles.introContent}>
              <p className={styles.leadParagraph}>
                <strong>ארגון שבת חתן הוא רגע שיא משפחתי.</strong> מהעלייה המרגשת לתורה וה"מי שברך", דרך מטר הסוכריות 
                ועד הקידוש המשותף – זהו סוף שבוע שזוכרים לכל החיים. אבל כדי שאתם תוכלו להתרכז בשמחה, מישהו צריך לדאוג 
                שהלוגיסטיקה תתקתק. <span className={styles.highlight}>בדיוק בשביל זה אנחנו כאן.</span>
              </p>

              <p>
                אנחנו יודעים שהראש שלכם עמוס באלף סידורים, ושבת החתן היא עוד "תיק" כבד. אתם לא חייבים לסחוב אותו לבד. 
                המערכת שלנו ב-<strong>Multibrawn</strong> מורידה מכם את כל הלוגיסטיקה – מבחירת המקום המושלם ועד הפרטים 
                הקטנים ביותר – כדי שתוכלו להגיע לחופה רגועים באמת.
              </p>

              <p>
                🎯 <strong>המטרה שלנו פשוטה:</strong> שתוכלו לזכור את שבת החתן בתור זמן איכות עם המשפחה והחברים, 
                לא בתור מרתון לוגיסטי. בואו נעזור לכם להגיע לשם.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ Video Section */}
        <section id="video" className={styles.videoSection}>
          <div className={styles.container}>
            <div className={styles.videoHeader}>
              <h2 className={styles.sectionTitle}>
                🎞️ מרגישים שהזמן בורח לכם לפני החתונה?
              </h2>
              <p className={styles.videoSubtitle}>
                בסרטון קצר ולעניין, ערדית מסבירה איך השיטה שלנו מורידה מכם את כל הלוגיסטיקה – 
                מהמקום ועד הפרטים הקטנים – כדי שתוכלו להגיע לחופה רגועים באמת.
              </p>
            </div>

            <div className={styles.videoContainer}>
              <video
                controls
                poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png"
                className={styles.video}
                preload="metadata"
              >
                <source
                  src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684490/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_gamaqi.mp4"
                  type="video/mp4"
                />
                הדפדפן שלך לא תומך בתגית video.
              </video>
            </div>

            <div className={styles.videoCta}>
              <Link href="/tips" className={styles.btnLink}>
                רוצים עוד טיפים? צפו בכל הסרטונים שלנו →
              </Link>
            </div>
          </div>
        </section>

        {/* ✅ כשרות ושקט נפשי */}
        <section className={styles.kashrut}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>כשרות ושקט נפשי: אין פשרות בנושא הזה</h2>
            
            <p className={styles.sectionIntro}>
              אנחנו יודעים ש<strong>בשבת חתן, האוכל הוא הלב של האירוע, והכשרות היא הבסיס להכל.</strong> כדי שתוכלו 
              להתרכז בשמחה ובמשפחה, דאגנו למעטפת הלכתית הדוקה שלא משאירה מקום לספקות:
            </p>

            <div className={styles.kashrut Grid}>
              <div className={styles.kashrut Card}>
                <div className={styles.cardIcon}>📜</div>
                <h3>תעודת כשרות שקופה</h3>
                <p>
                  כל הלוקיישנים והקייטרינג שלנו פועלים בהשגחת <strong>רבנות מהדרין / בד"ץ</strong> (בהתאם לנכס הנבחר). 
                  צילום תעודה בתוקף יישלח אליכם לווטסאפ עוד לפני סגירת העסקה – בלי הפתעות ברגע האחרון.
                </p>
              </div>

              <div className={styles.kashrut Card}>
                <div className={styles.cardIcon}>👨‍🍳</div>
                <h3>פתרונות משגיח צמוד</h3>
                <p>
                  כדי להבטיח את שמירת השבת כהלכתה, אנו נתאם עבורכם (מול המתחם) אפשרות להלנת <strong>משגיח שיחזיק במפתחות המטבח</strong> 
                  וידאג לציוד החימום, כך שתוכלו להיות רגועים לחלוטין.
                </p>
              </div>

              <div className={styles.kashrut Card}>
                <div className={styles.cardIcon}>✅</div>
                <h3>בקרת איכות על האוכל</h3>
                <p>
                  היכרותנו העמוקה עם השוק מאפשרת לנו להמליץ לכם רק על מקומות שמגישים <strong>תוצרת איכותית</strong> 
                  (בשרים חלק / ירקות נקיים) ולהרחיק אתכם ממקומות שרק "נראים טוב בתמונות" אך מאכזבים בצלחת.
                </p>
              </div>
            </div>

            <div className={styles.kashrut Footer}>
              <p>
                💡 <strong>טיפ חשוב:</strong> אל תהססו לשאול אותנו כל שאלה על כשרות, רמת השגחה, או דרישות מיוחדות. 
                אנחנו כאן כדי לוודא שהכל יהיה מדויק בדיוק כפי שאתם צריכים.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ סידורי לינה */}
        <section className={styles.accommodation}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>סידורי לינה: שקיפות מלאה, אפס הפתעות</h2>
            
            <p className={styles.sectionIntro}>
              אנחנו יודעים ששיבוץ החדרים הוא <strong>ה"כאב ראש" הכי גדול</strong> של המארגנים. אצלנו ב-Multibrawn 
              לא מהמרים על הנוחות של האורחים. אמנם אנחנו לא קובעים מי ישן איפה, אבל אנחנו דואגים לצייד אתכם במידע 
              הכי מדויק שיש כדי שתוכלו לתכנן את זה בקלות:
            </p>

            <div className={styles.accommodationGrid}>
              <div className={styles.accommodationCard}>
                <div className={styles.cardNumber}>1</div>
                <h3>שקיפות מלאה במפרט החדרים</h3>
                <p>
                  לפני סגירת העסקה, נציג בפניכם את תמונת המצב המלאה כפי שהתקבלה מבעלי המתחם – 
                  כמה מיטות יש בכל חדר, איפה יש עריסות לתינוקות, ומהן האופציות למזרנים נוספים.
                </p>
              </div>

              <div className={styles.accommodationCard}>
                <div className={styles.cardNumber}>2</div>
                <h3>בלי הפתעות במקום</h3>
                <p>
                  המטרה שלנו היא למנוע מצב שבו מגיעים למקום ומגלים שחסרה מיטה או שהסידור שונה ממה שציפיתם. 
                  אנחנו מוודאים שהנתונים שיש בידכם תואמים את המציאות בשטח.
                </p>
              </div>

              <div className={styles.accommodationCard}>
                <div className={styles.cardNumber}>3</div>
                <h3>סיוע בתכנון השיבוץ</h3>
                <p>
                  על סמך הניסיון שלנו, נוכל לייעץ לכם איך לחלק את החדרים בצורה הכי נוחה – 
                  למשל, משפחות עם ילדים קטנים ליד חדר האוכל, זוגות צעירים בקצה השני, וכו'.
                </p>
              </div>
            </div>

            <div className={styles.calloutBox}>
              <h4>💬 שאלה נפוצה: "איך אני יודע שיהיה מספיק מקום לכולם?"</h4>
              <p>
                זו בדיוק הסיבה שאנחנו מציגים לכם מפרט מפורט לפני ההזמנה. נעבור איתכם על כמות האורחים שלכם, 
                נשאל על הרכב המשפחות (כמה זוגות, כמה ילדים, כמה בודדים), ונמליץ על מתחם שמתאים בדיוק לצרכים שלכם. 
                אם אתם מתלבטים בין שני מקומות – נעזור לכם לבחור את הנכון.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ למה Multibrawn */}
        <section className={styles.whyUs}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>למה Multibrawn? כי שבת חתן זה לא הזמן לנסות מזל</h2>
            
            <p className={styles.sectionIntro}>
              אתם יכולים לגלוש באינטרנט, לשאול חברים, או לנסות למצוא מקום לבד. אבל בסוף, אתם רוצים מישהו שמכיר 
              את השטח, שיודע מה עובד ומה לא, ושיעשה בשבילכם את כל העבודה הקשה. <strong>זה בדיוק מה שאנחנו עושים:</strong>
            </p>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🎯</div>
                <h3>בחירה מותאמת אישית</h3>
                <p>
                  לא שולחים לכם קטלוג ענק. אנחנו שואלים את השאלות הנכונות (מיקום, תקציב, אווירה) וממליצים רק 
                  על 2-3 מקומות שבאמת מתאימים לכם. כך אתם חוסכים זמן ומגיעים להחלטה מהר יותר.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⭐</div>
                <h3>מוניטין שנבנה ב-9+ שנים</h3>
                <p>
                  אנחנו עובדים עם אותם בעלי מקומות כבר שנים. הם מכירים אותנו, אנחנו מכירים אותם, והאמון ההדדי 
                  הזה מתורגם לשירות מעולה עבורכם. אתם לא "עוד לקוח" – אתם חלק מהמשפחה של Multibrawn.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💬</div>
                <h3>מענה 24/7 דרך הבוט החכם</h3>
                <p>
                  יש שאלה באמצע הלילה? הבוט שלנו לא ישן. הוא ישאל אתכם מה אתם מחפשים, ירשום את הכל, ויעביר 
                  את הפרטים לערדית שתיצור איתכם קשר עם הצעות מדויקות. אתם לא צריכים לחכות למענה אנושי כדי להתחיל.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🤝</div>
                <h3>ליווי צמוד עד הסוף</h3>
                <p>
                  מהרגע שסגרתם איתנו ועד שהקידוש האחרון הסתיים, אנחנו כאן. יש בעיה? מתקשרים אלינו. רוצים לשנות 
                  משהו? אנחנו מתאמים. צריכים המלצה על קייטרינג? יש לנו. אתם לא לבד בתהליך הזה.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏆</div>
                <h3>מקומות שעברו "בקרת איכות"</h3>
                <p>
                  אנחנו לא מציעים כל מקום שמוכן לקבל אותכם. אנחנו מכירים כל נכס אישית, יודעים מה היתרונות 
                  והחסרונות שלו, ומתאימים אתכם למקום שבאמת יענה על הציפיות שלכם – לא למקום שפשוט פנוי.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h3>שקיפות מחירים מלאה</h3>
                <p>
                  אין עמלות נסתרות, אין הפתעות בחשבון. אנחנו מציגים לכם את המחיר הסופי מראש, כולל כל 
                  התוספות (אם יש), כך שתוכלו לקבל החלטה מושכלת ללא לחץ.
                </p>
              </div>
            </div>

            <div className={styles.testimonialHighlight}>
              <blockquote>
                <p>
                  "הזמנו דרך Multibrawn שבת חתן בוילה בצפון. ערדית סידרה לנו הכל – מהמשגיח ועד הקייטרינג. 
                  הגענו לשם רגועים והכל היה מדויק כמו שהבטיחו. ממליץ בחום!"
                </p>
                <cite>– דוד מ., תל אביב</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ✅ איך זה עובד */}
        <section className={styles.howItWorks}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>איך זה עובד? 4 שלבים פשוטים מהבוט ועד הקידוש</h2>

            <div className={styles.stepsGrid}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>שיחה עם הבוט החכם</h3>
                <p>
                  פותחים צ'אט עם הבוט שלנו (זמין 24/7) ועונים על כמה שאלות קצרות: תאריכים, מספר אורחים, 
                  מיקום מועדף, תקציב משוער. הבוט רושם הכל ומעביר לערדית.
                </p>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>ערדית יוצרת קשר עם הצעות</h3>
                <p>
                  תוך 24 שעות (לרוב הרבה יותר מהר), ערדית מתקשרת אליכם עם 2-3 אופציות מותאמות. 
                  היא תסביר על כל מקום, תענה על שאלות, ותעזור לכם להחליט.
                </p>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>סגירת העסקה והכנות</h3>
                <p>
                  אחרי שבחרתם, אנחנו סוגרים את המקום עבורכם, שולחים תעודת כשרות, מסדרים משגיח (אם צריך), 
                  ומתאמים את כל הפרטים הקטנים – קייטרינג, מזרנים נוספים, הכל.
                </p>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <h3>אתם מגיעים ונהנים!</h3>
                <p>
                  ביום שבת, אתם פשוט מגיעים למקום, הכל מוכן ומחכה לכם. אנחנו זמינים בטלפון לכל שאלה 
                  או בעיה (אם בכלל תהיה). אתם מתרכזים בשמחה, אנחנו דואגים לשאר.
                </p>
              </div>
            </div>

            <div className={styles.processFooter}>
              <Link href="/contact" className={styles.btnPrimary}>
                מתחילים עכשיו – שיחה עם הבוט 🚀
              </Link>
              <p className={styles.processNote}>
                * ללא התחייבות. הבוט שואל שאלות, ערדית מציעה פתרונות. אתם מחליטים אם זה מתאים לכם.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ FAQ - שאלות ותשובות */}
        <section className={styles.faq}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>שאלות נפוצות על ארגון שבת חתן</h2>
            <p className={styles.faqIntro}>
              כל השאלות שאתם (ואחרים) שואלים אותנו לפני שבת החתן. אם לא מצאתם תשובה, 
              <Link href="/contact"> צרו איתנו קשר</Link> ונענה תוך דקות.
            </p>

            <div className={styles.faqGrid}>
              <details className={styles.faqItem}>
                <summary>
                  <h3>כמה זמן לפני כדאי להזמין מקום לשבת חתן?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    <strong>מומלץ להזמין לפחות 3-6 חודשים מראש,</strong> במיוחד אם מדובר בעונת שיא (אביב-קיץ) 
                    או בסופי שבוע פופולריים. ככל שתזמינו מוקדם יותר, כך תהיה לכם בחירה רחבה יותר של מקומות איכותיים.
                  </p>
                  <p>
                    אם הזמן לוחץ (חודש-חודשיים לפני) – גם זה לא אבוד! יש לנו קשרים טובים עם בעלי מקומות 
                    ולפעמים מצליחים למצוא פתרונות גם ברגע האחרון. שווה לנסות!
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>מה הכשרות של המקומות ב-Multibrawn?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    <strong>כל המקומות שלנו פועלים בהשגחת כשרות מהודרת</strong> – רבנות מהדרין או בד"ץ 
                    (בהתאם לנכס הנבחר). אנו מספקים תעודת כשרות בתוקף לפני סגירת ההזמנה, ויכולים לתאם 
                    משגיח צמוד שיחזיק במפתחות המטבח ויבטיח שמירת שבת מלאה.
                  </p>
                  <p>
                    אם יש לכם דרישות מיוחדות (למשל, בד"ץ עדה מסוימת או רמת כשרות גבוהה במיוחד) – 
                    ספרו לנו ונמצא לכם מקום מתאים.
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>האם יש פתרון לינה לכל המשפחה?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    <strong>כן!</strong> אנו מתמחים במתחמים גדולים שמאפשרים לינה למספר רב של אורחים. 
                    לפני סגירת העסקה, נציג בפניכם מפרט מלא של החדרים:
                  </p>
                  <ul>
                    <li>כמה מיטות יש בכל חדר</li>
                    <li>איפה יש עריסות לתינוקות</li>
                    <li>מה האופציות למזרנים נוספים</li>
                    <li>איזה חדרים מתאימים למשפחות עם ילדים</li>
                  </ul>
                  <p>
                    כך תוכלו לתכנן את שיבוץ האורחים בראש שקט, ללא הפתעות בלתי נעימות.
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>מה כולל שירות ההכל כלול?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>שירות הכל כלול ב-Multibrawn כולל:</p>
                  <ul>
                    <li>✅ בחירת המקום המתאים ביותר לצרכים שלכם</li>
                    <li>✅ תיאום מלא עם בעלי הנכס</li>
                    <li>✅ הסדרת כשרות ותעודות</li>
                    <li>✅ סידור משגיח צמוד (במידת הצורך)</li>
                    <li>✅ סיוע בתכנון תפריט (המלצות על קייטרינג)</li>
                    <li>✅ ליווי צמוד לפני ובמהלך האירוע</li>
                    <li>✅ מענה 24/7 לכל שאלה או בעיה</li>
                  </ul>
                  <p>
                    <strong>אתם פשוט צריכים להגיע ולהנות!</strong> כל השאר – זה עלינו.
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>איך הבוט של Multibrawn עוזר לי?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    הבוט החכם שלנו זמין 24/7 ושואל אתכם שאלות ממוקדות:
                  </p>
                  <ul>
                    <li>תאריכי שבת החתן (מתי מגיעים, מתי עוזבים)</li>
                    <li>מספר אורחים משוער</li>
                    <li>תקציב (טווח מחירים)</li>
                    <li>העדפות אישיות (מיקום, סוג מקום, תכונות מיוחדות)</li>
                  </ul>
                  <p>
                    בהתבסס על התשובות שלכם, הבוט ממליץ על המקומות המתאימים ביותר ומעביר את הפרטים 
                    שלכם לערדית. היא תיצור איתכם קשר תוך 24 שעות עם הצעות מדויקות ומותאמות אישית.
                  </p>
                  <p>
                    <strong>הכי טוב?</strong> אתם יכולים לדבר עם הבוט בשעה 2 בלילה, וגם אז הוא יעבוד 
                    בשבילכם. בבוקר, ערדית כבר תהיה עם כל המידע.
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>האם אפשר לבטל או לשנות הזמנה?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    תנאי הביטול והשינוי משתנים בהתאם למקום הספציפי ולתאריך ההזמנה. בדרך כלל:
                  </p>
                  <ul>
                    <li><strong>ביטול מוקדם (60-90 יום לפני):</strong> החזר מלא או חלקי</li>
                    <li><strong>ביטול קרוב לאירוע (14-30 יום):</strong> עלול לכלול דמי ביטול</li>
                    <li><strong>שינוי תאריכים:</strong> לרוב אפשרי בתיאום עם בעלי המקום</li>
                  </ul>
                  <p>
                    אנו ממליצים בחום לרכוש <strong>ביטוח אירועים</strong> שמכסה מקרים בלתי צפויים 
                    (מחלה, חירום משפחתי, וכו'). נשמח להסביר לכם את התנאים המדויקים בעת ההזמנה.
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>מה ההבדל בין שבת חתן לבין חתונה רגילה?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>
                    שבת חתן היא אירוע שונה בתכלית מחתונה:
                  </p>
                  <ul>
                    <li><strong>זמן:</strong> סוף שבוע מלא (לא רק ערב אחד)</li>
                    <li><strong>אווירה:</strong> יותר אינטימית ומשפחתית</li>
                    <li><strong>לוגיסטיקה:</strong> צריך לדאוג גם ללינה, לא רק לאולם</li>
                    <li><strong>כשרות:</strong> שמירת שבת מלאה (משגיח, חימום אוכל, וכו')</li>
                    <li><strong>קייטרינג:</strong> 3 סעודות + חטיפים (לא רק ארוחה אחת)</li>
                  </ul>
                  <p>
                    בגלל כל ההבדלים האלה, חשוב לעבוד עם מישהו שמבין את הייחודיות של שבת חתן – 
                    ולא רק מארגן אירועים כללי. <strong>זו בדיוק המומחיות של Multibrawn.</strong>
                  </p>
                </div>
              </details>

              <details className={styles.faqItem}>
                <summary>
                  <h3>איזה מקומות הכי פופולריים לשבת חתן?</h3>
                </summary>
                <div className={styles.faqAnswer}>
                  <p>התשובה תלויה בסגנון שלכם ובתקציב, אבל הנה כמה אופציות פופולריות:</p>
                  <ul>
                    <li><strong>וילות פרטיות:</strong> מושלמות למשפחות שרוצות פרטיות מלאה</li>
                    <li><strong>מלונות בוטיק:</strong> שירות מלא, לא צריך לדאוג לכלום</li>
                    <li><strong>מתחמי נופש:</strong> גדולים, עם הרבה שטח פתוח לילדים</li>
                    <li><strong>צימרים משפחתיים:</strong> אופציה אינטימית יותר לקבוצות קטנות</li>
                  </ul>
                  <p>
                    כל סוג מקום מתאים לסוג אחר של משפחה. בשיחה עם הבוט או עם ערדית, נזהה מה 
                    הכי מתאים לכם ונמליץ בהתאם.
                  </p>
                </div>
              </details>
            </div>

            <div className={styles.faqFooter}>
              <p>עוד שאלות? <Link href="/contact">שאלו אותנו ישירות בצ'אט →</Link></p>
            </div>
          </div>
        </section>

        {/* ✅ Related Properties */}
        <section className={styles.relatedProperties}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>מקומות מומלצים במיוחד לשבת חתן</h2>
            <p className={styles.sectionIntro}>
              אלה הנכסים שקיבלו את הציונים הכי גבוהים ממשפחות ששמחו איתנו בשבת החתן שלהם:
            </p>

            <div className={styles.propertiesGrid}>
              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
                    alt="וילה מפוארת לשבת חתן"
                    width={400}
                    height={300}
                  />
                </div>
                <h3>וילות מפוארות בצפון</h3>
                <p>מושלמות למשפחות גדולות | כשרות מהודרת | נוף מדהים</p>
                <Link href="/gallery?category=villa" className={styles.propertyLink}>
                  צפו בכל הוילות →
                </Link>
              </div>

              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/30_aybozm.jpg"
                    alt="מלון בוטיק לשבת חתן"
                    width={400}
                    height={300}
                  />
                </div>
                <h3>מלונות בוטיק במרכז</h3>
                <p>שירות מלא | קרוב לכולם | אווירה יוקרתית</p>
                <Link href="/gallery?category=hotel" className={styles.propertyLink}>
                  צפו במלונות →
                </Link>
              </div>

              <div className={styles.propertyCard}>
                <div className={styles.propertyImage}>
                  <Image
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/19_o7yxpa.jpg"
                    alt="מתחם אירועים לשבת חתן"
                    width={400}
                    height={300}
                  />
                </div>
                <h3>מתחמי אירועים בדרום</h3>
                <p>מרווחים | אוכל מעולה | חוויה בלתי נשכחת</p>
                <Link href="/gallery?category=event" className={styles.propertyLink}>
                  צפו במתחמים →
                </Link>
              </div>
            </div>

            <div className={styles.propertiesCta}>
              <Link href="/gallery" className={styles.btnSecondary}>
                ראו את כל 29 המקומות שלנו →
              </Link>
            </div>
          </div>
        </section>

        {/* ✅ Final CTA */}
        <section className={styles.finalCta}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>מוכנים להתחיל? הבוט מחכה לכם 24/7</h2>
              <p>
                ארגון שבת חתן לא חייב להיות כאב ראש. תרגישו חופשי לשוחח עם הבוט שלנו בכל שעה. 
                הוא ירשום בדיוק מה אתם מחפשים, וערדית תיכנס לתמונה עם הפתרונות והלוקיישנים 
                הכי שווים שנבחרו בפינצטה עבורכם.
              </p>

              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.btnPrimaryLarge}>
                  מתחילים עכשיו – שיחה עם הבוט 🚀
                </Link>
                <Link href="https://wa.me/972523983394?text=היי, אני מעוניין בארגון שבת חתן" className={styles.btnWhatsapp}>
                  <span>שלחו לנו הודעה בוואטסאפ</span>
                </Link>
              </div>

              <p className={styles.ctaNote}>
                * ללא התחייבות. הבוט שואל שאלות, ערדית מציעה פתרונות. אתם מחליטים אם זה מתאים לכם.
              </p>
            </div>

            <div className={styles.ctaStats}>
              <div className={styles.ctaStat}>
                <div className={styles.statNumber}>500+</div>
                <div className={styles.statLabel}>שבתות חתן מוצלחות</div>
              </div>
              <div className={styles.ctaStat}>
                <div className={styles.statNumber}>9+</div>
                <div className={styles.statLabel}>שנות ניסיון</div>
              </div>
              <div className={styles.ctaStat}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>שביעות רצון</div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Related Links */}
        <section className={styles.relatedLinks}>
          <div className={styles.container}>
            <h3>מאמרים נוספים שיעזרו לכם:</h3>
            <ul>
              <li><Link href="/tips">טיפים לארגון אירועים מושלמים</Link></li>
              <li><Link href="/gallery">הגלריה המלאה של הנכסים שלנו</Link></li>
              <li><Link href="/about">למי ערדית וצוות Multibrawn</Link></li>
              <li><Link href="/contact">צרו איתנו קשר לשאלות נוספות</Link></li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
