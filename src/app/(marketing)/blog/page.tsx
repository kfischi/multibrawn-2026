import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'בלוג - טיפים ומדריכים לצימרים | MULTIBRAWN',
  description: 'מאמרים, טיפים ומדריכים לבחירת הצימר המושלם - כל מה שצריך לדעת לפני ההזמנה',
  keywords: ['בלוג צימרים', 'טיפים לצימרים', 'מדריכי נופש', 'צפון'],
};

const articles = [
  {
    slug: 'heated-pool-guide',
    title: 'המדריך המלא לבריכות מחוממות',
    excerpt: 'מחוממת או פושרת? כל מה שצריך לדעת לפני ההזמנה',
    category: 'מדריכים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252877/תמונה_bqjuyx.png',
    date: '20 בדצמבר 2024',
    readTime: '7 דקות',
  },
  {
    slug: 'modesty-check-religious',
    title: 'מבחן הצניעות',
    excerpt: 'כתוב פרטיות מלאה אבל השכן רואה הכל',
    category: 'מדריכים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png',
    date: '20 בדצמבר 2024',
    readTime: '6 דקות',
  },
  {
    slug: 'jacuzzi-hygiene-check',
    title: 'הג׳קוזי המלוכלך',
    excerpt: 'נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
  {
    slug: 'adults-only-quiet-guide',
    title: 'שקט בבקשה',
    excerpt: 'איך למצוא צימר שקט באמת',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
  {
    slug: 'breakfast-value-guide',
    title: 'ארוחת הבוקר',
    excerpt: 'חביתה ב-150 שקל? מתי שווה להזמין',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
  {
    slug: 'photos-vs-reality-guide',
    title: 'תמונות מול מציאות',
    excerpt: 'איך להבין שהצימר קטן במציאות',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253283/תמונה_ga3cj2.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
  {
    slug: 'real-fireplace-guide',
    title: 'קמין אמיתי',
    excerpt: 'קמין אמיתי או דקורטיבי? איך לדעת',
    category: 'מדריכים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253408/תמונה_fwjqkl.png',
    date: '20 בדצמבר 2024',
    readTime: '4 דקות',
  },
  {
    slug: 'last-minute-deals-guide',
    title: 'הדקה ה-90',
    excerpt: 'מתי באמת כדאי לחכות',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png',
    date: '20 בדצמבר 2024',
    readTime: '4 דקות',
  },
  {
    slug: 'massage-to-room-guide',
    title: 'מסאז׳ לחדר',
    excerpt: 'כל מה שצריך לדעת על מסאז׳',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253468/מיטת_עיסוי_nvydzb.png',
    date: '20 בדצמבר 2024',
    readTime: '4 דקות',
  },
];

export default function BlogPage() {
  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>הבלוג שלנו</h1>
          <p className={styles.description}>
            טיפים, מדריכים והמלצות לבחירת הצימר המושלם
          </p>
        </header>

        <div className={styles.grid}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.category}>{article.category}</span>
                <h2 className={styles.cardTitle}>{article.title}</h2>
                <p className={styles.excerpt}>{article.excerpt}</p>
                <div className={styles.meta}>
                  <span>{article.date}</span>
                  <span>⏱️ {article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
