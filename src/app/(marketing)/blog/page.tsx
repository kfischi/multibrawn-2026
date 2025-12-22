import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'בלוג MULTIBRAWN - מדריכים וטיפים לנופש מושלם',
  description: 'כל מה שצריך לדעת על צימרים ונופש בישראל',
  keywords: ['בלוג צימרים', 'מדריכי נופש', 'טיפים', 'וילות יוקרה'],
  openGraph: {
    title: 'בלוג MULTIBRAWN',
    description: 'מדריכים וטיפים לנופש מושלם בישראל',
    url: 'https://multibrawn.co.il/blog',
    type: 'website',
  },
};

// 👇 כאן נמצא החיבור בין התיקיות לרשימה בדף
const blogPosts = [
  // --- המאמרים הישנים (צימרים) ---
  {
    slug: 'heated-pool-guide',
    title: 'המדריך המלא לבריכות מחוממות',
    excerpt: 'מחוממת או פושרת? המדריך המלא לבדיקת בריכה בחורף',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252877/תמונה_bqjuyx.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '6 דקות',
  },
  {
    slug: 'modesty-check-religious',
    title: 'מבחן הצניעות',
    excerpt: 'כתוב פרטיות מלאה אבל השכן רואה הכל',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253110/תמונה_ha3oeo.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'jacuzzi-hygiene-check',
    title: 'הג׳קוזי המלוכלך',
    excerpt: 'נכנסתם לג׳קוזי ויש קצף צהוב? המדריך המלא',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'adults-only-quiet-guide',
    title: 'שקט בבקשה',
    excerpt: 'איך למצוא צימר שקט באמת',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'breakfast-value-guide',
    title: 'ארוחת הבוקר',
    excerpt: 'חביתה ב-150 שקל? מתי שווה',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'photos-vs-reality-guide',
    title: 'תמונות מול מציאות',
    excerpt: 'איך להבין שהצימר קטן במציאות',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253283/תמונה_ga3cj2.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '5 דקות',
  },
  {
    slug: 'real-fireplace-guide',
    title: 'קמין אמיתי',
    excerpt: 'קמין אמיתי או דקורטיבי?',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253408/תמונה_fwjqkl.png',
    category: 'מדריכים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'last-minute-deals-guide',
    title: 'הדקה ה-90',
    excerpt: 'מתי באמת כדאי לחכות',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  {
    slug: 'massage-to-room-guide',
    title: 'מסאז׳ עד החדר',
    excerpt: 'כל מה שצריך לדעת',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253468/מיטת_עיסוי_nvydzb.png',
    category: 'טיפים',
    date: '2024-12-20',
    readTime: '4 דקות',
  },
  
  // --- 👇 המאמרים החדשים (וילות יוקרה) שהוספנו עכשיו ---
  {
    slug: 'villa-fridge-logistics', // חייב להיות זהה לשם התיקייה!
    title: 'המקרר שלא מספיק',
    excerpt: 'הבאתם בשרים לגדוד אבל המקרר קטן? המדריך ללוגיסטיקה',
    // שמתי כאן את הלוגו באופן זמני עד שתחליף לתמונה אמיתית
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png',
    category: 'לוגיסטיקה',
    date: '2025-01-01',
    readTime: '5 דקות',
  },
  {
    slug: 'beds-to-baths-ratio',
    title: 'מלכודת ה-30 איש',
    excerpt: '30 מיטות אבל רק 3 מקלחות? איך להימנע מהתור בבוקר',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png',
    category: 'מדריכים',
    date: '2025-01-01',
    readTime: '6 דקות',
  },
  {
    slug: 'pool-safety-toddlers',
    title: 'בטיחות בבריכה לפעוטות',
    excerpt: 'הוילה חלומית, אבל הבריכה היא סכנה. המדריך להורים',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png',
    category: 'בטיחות',
    date: '2025-01-01',
    readTime: '5 דקות',
  },
  {
    slug: 'hidden-villa-costs',
    title: 'עלויות נסתרות בוילה',
    excerpt: 'סגרתם ב-4,000 שילמתם 5,500? כל התוספות שלא סיפרו לכם',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png',
    category: 'טיפים',
    date: '2025-01-01',
    readTime: '4 דקות',
  },
  {
    slug: 'luxury-villa-wear-and-tear',
    title: 'האמת בפרצוף (בלאי)',
    excerpt: 'בתמונות הכל חדש, במציאות הספה קרועה. איך בודקים?',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png',
    category: 'טיפים',
    date: '2025-01-01',
    readTime: '5 דקות',
  },
];

const categories = ['הכל', 'מדריכים', 'טיפים', 'בטיחות', 'לוגיסטיקה'];

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup type="organization" />
      
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>בלוג MULTIBRAWN</h1>
            <p>מדריכים, טיפים וכל מה שצריך לדעת על נופש בישראל</p>
          </div>
        </section>

        <section className={styles.categories}>
          {categories.map((cat) => (
            <button key={cat} className={styles.categoryButton}>
              {cat}
            </button>
          ))}
        </section>

        <section className={styles.posts}>
          <div className={styles.grid}>
            {blogPosts.map((post) => (
              // כאן נוצר הקישור: /blog/ + שם-התיקייה
              <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <span className={styles.category}>{post.category}</span>
                </div>
                <div className={styles.cardContent}>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}>
                    <span>{post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
