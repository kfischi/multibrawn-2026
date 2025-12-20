import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: '10 הצימרים הכי מומלצים בצפון ב-2025 | בלוג MULTIBRAWN',
  description: 'רשימה מעודכנת ומקיפה של הצימרים הכי טובים בצפון - עם ביקורות אמיתיות, מחירים ומה שחשוב לדעת לפני ההזמנה.',
  keywords: [
    'צימרים בצפון',
    'צימר מומלץ',
    'צימרים עם בריכה',
    'צימר רומנטי',
    'גליל עליון',
    'רמת הגולן',
    'צימרים 2025',
  ],
  openGraph: {
    title: '10 הצימרים הכי מומלצים בצפון ב-2025',
    description: 'רשימה מעודכנת של הצימרים הכי טובים בצפון',
    url: 'https://multibrawn.co.il/blog/best-zimmers-north-2025',
    type: 'article',
    images: [{
      url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
      width: 1200,
      height: 630,
    }],
  },
};

export default function BestZimmersNorth2025() {
  const breadcrumbData = {
    items: [
      { name: 'בית', url: 'https://multibrawn.co.il' },
      { name: 'בלוג', url: 'https://multibrawn.co.il/blog' },
      { name: '10 הצימרים הכי מומלצים בצפון', url: 'https://multibrawn.co.il/blog/best-zimmers-north-2025' },
    ],
  };

  const articleData = {
    title: '10 הצימרים הכי מומלצים בצפון ב-2025',
    description: 'רשימה מעודכנת ומקיפה של הצימרים הכי טובים בצפון',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    datePublished: '2024-12-15',
    dateModified: '2024-12-19',
  };

  return (
    <>
      <SchemaMarkup type="breadcrumb" data={breadcrumbData} />
      <SchemaMarkup type="article" data={articleData} />

      <article className={styles.article}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">בית</Link>
            <span>/</span>
            <Link href="/blog">בלוג</Link>
            <span>/</span>
            <span>10 הצימרים הכי מומלצים בצפון</span>
          </nav>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.category}>המלצות</div>
            <h1 className={styles.title}>10 הצימרים הכי מומלצים בצפון ב-2025</h1>
            <div className={styles.meta}>
              <span className={styles.date}>15 בדצמבר 2024</span>
              <span className={styles.readTime}>⏱️ 8 דקות קריאה</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className={styles.featuredImage}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg"
              alt="צימרים מומלצים בצפון"
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Content */}
          <div className={styles.content}>
            {/* 
            ====================================
            📝 הדבק כאן את התוכן מGemini
            ====================================
            
            1. פתח Gemini
            2. העתק את Prompt #1 מ-BLOG-CONTENT-PROMPTS.md
            3. הדבק את התשובה כאן (במקום ההודעה הזו)
            4. שמור
            
            ====================================
            */}
            
            <p>
              <strong>👇 כאן תדביק את התוכן שקיבלת מ-Gemini 👇</strong>
            </p>
            
            <p>
              מדריך זה יכיל 2,000-2,500 מילים על הצימרים הכי מומלצים בצפון.
              פשוט תעתיק את ה-Prompt מהקובץ BLOG-CONTENT-PROMPTS.md ותדביק את התוכן כאן.
            </p>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <h2>מוכנים למצוא את הצימר המושלם?</h2>
            <p>דברו עם המומחים שלנו וקבלו המלצות אישיות - בחינם!</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaButton}>
                דברו עם ערדית - הבוט החכם
              </Link>
              <a
                href="https://wa.me/972523983394?text=היי! קראתי את המאמר על צימרים בצפון"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaButtonWhatsapp}
              >
                שלחו וואטסאפ עכשיו
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
