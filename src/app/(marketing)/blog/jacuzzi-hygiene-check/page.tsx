import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "הג׳קוזי המלוכלך - מדריך היגיינה | בלוג MULTIBRAWN",
  description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. המדריך המלא להיגיינה",
  keywords: ["צימרים", "נופש", "טיפים", "ג׳קוזי", "היגיינה"],
  openGraph: {
    title: "הג׳קוזי המלוכלך - מדריך היגיינה",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? המדריך המלא",
    url: "https://multibrawn.co.il/blog/jacuzzi-hygiene-check",
    type: "article",
    images: [{
      url: "https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png",
      width: 1200,
      height: 630,
    }],
  },
};

export default function Article() {
  const breadcrumbData = {
    items: [
      { name: "בית", url: "https://multibrawn.co.il" },
      { name: "בלוג", url: "https://multibrawn.co.il/blog" },
      { name: "הג׳קוזי המלוכלך", url: "https://multibrawn.co.il/blog/jacuzzi-hygiene-check" },
    ],
  };

  const articleData = {
    title: "הג׳קוזי המלוכלך - מדריך היגיינה",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png",
    datePublished: "2024-12-20",
    dateModified: "2024-12-20",
  };

  return (
    <>
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      <SchemaMarkup type="article" data={articleData} />

      <article className={styles.article}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <Link href="/">בית</Link>
            <span>/</span>
            <Link href="/blog">בלוג</Link>
            <span>/</span>
            <span>הג׳קוזי המלוכלך</span>
          </nav>

          <header className={styles.header}>
            <div className={styles.category}>טיפים</div>
            <h1 className={styles.title}>נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד</h1>
            <div className={styles.meta}>
              <span className={styles.date}>20 בדצמבר 2024</span>
              <span className={styles.readTime}>⏱️ 5 דקות קריאה</span>
            </div>
          </header>

          <div className={styles.featuredImage}>
            <Image
              src="https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png"
              alt="ג׳קוזי נקי"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.content}>
            <p>
              זה הרגע שחיכיתם לו. הגעתם לצימר, הדלקתם נרות, מזגתם יין. הג׳קוזי הענק בפינת החדר כבר מלא במים חמים ומזמינים.
            </p>

            <p>
              אתם נכנסים פנימה, לוחצים על כפתור הבועות, ופתאום... על פני המים מתחיל לצוף קצף עכור, צהבהב-אפור, עם ריח לא נעים.
            </p>

            <h2>מה זה הקצף הזה?</h2>

            <p>
              זו שכבת לכלוך שמורכבת משומן גוף, שארי סבון, וחיידקים שהצטברו בצינורות. זה לא מסוכן בהכרח, אבל זה מגעיל.
            </p>

            <h2>איך לבדוק ג׳קוזי לפני ההזמנה?</h2>

            <ul>
              <li>שאלו: מתי המים הוחלפו לאחרונה?</li>
              <li>בקשו תמונה של הג׳קוזי כשהוא דולק</li>
              <li>וודאו שיש מערכת סינון</li>
              <li>בדקו ביקורות על ניקיון</li>
            </ul>

            <h2>מה עושים אם זה קרה?</h2>

            <p>
              התקשרו למארח מיד. צלמו תמונה. בקשו החלפת מים או החזר כספי חלקי.
            </p>

            <h2>איך Multibrawn עוזרת?</h2>

            <p>
              אנחנו בודקים כל צימר לפני ההמלצה. אנחנו יודעים איפה מחליפים מים לפני כל אורח ואיפה מתקמצנים.
            </p>
          </div>

          <div className={styles.cta}>
            <h2>רוצים צימר נקי מובטח?</h2>
            <p>דברו עם המומחים שלנו וקבלו המלצות אישיות!</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButton}>
                דברו עם ערדית
              </Link>
              <a
                href="https://wa.me/972523983394?text=היי! קראתי את המאמר"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonWhatsapp}
              >
                שלחו וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
