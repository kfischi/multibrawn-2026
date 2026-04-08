'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';

const articles = [
  // 4 סרטונים ראשונים
  {
    slug: 'shabbat-hatan-rosh-shaket',
    title: '✡️ שבת חתן בראש שקט',
    excerpt: 'כל מה שצריך לדעת על ארגון שבת חתן מושלם',
    category: 'וידאו',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
    videoUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684490/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_gamaqi.mp4',
    date: '23 בדצמבר 2024',
    readTime: '1:15',
  },
  {
    slug: 'eilat-warning',
    title: '🌴 נוסעים לאילת? תיזהרו',
    excerpt: 'טיפים חשובים לפני שנוסעים לאילת',
    category: 'וידאו',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/%D7%90%D7%99%D7%9C%D7%AA_rtmczk.png',
    videoUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684426/%D7%90%D7%99%D7%9C%D7%AA_ba7jjj.mp4',
    date: '23 בדצמבר 2024',
    readTime: '0:45',
  },
  {
    slug: 'cheap-zimmer-warning',
    title: '💰 מחפשים זול?',
    excerpt: 'למה לפעמים זול יוצא יקר',
    category: 'וידאו',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/%D7%96%D7%95%D7%9C_t7cops.png',
    videoUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763718107/%D7%96%D7%95%D7%9C_lcwakc.mp4',
    date: '23 בדצמבר 2024',
    readTime: '1:30',
  },
  {
    slug: 'villa-dangers',
    title: '⚠️ ממה להיזהר בוילה',
    excerpt: 'נקודות חשובות לבדוק כשמגיעים',
    category: 'וידאו',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
    videoUrl: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684101/Video3_omgivy.mp4',
    date: '23 בדצמבר 2024',
    readTime: '1:00',
  },
  // מאמרים
  {
    slug: 'heated-pool-guide',
    title: 'המדריך המלא לבריכות מחוממות',
    excerpt: 'מחוממת או פושרת? כל מה שצריך לדעת',
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
  {
    slug: 'hidden-villa-costs',
    title: 'עלויות נסתרות',
    excerpt: 'כל העלויות שלא סיפרו לכם',
    category: 'טיפים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
  {
    slug: 'luxury-villa-wear-and-tear',
    title: 'בלאי בווילות יוקרה',
    excerpt: 'איך לזהות בלאי ולשמור על האיכות',
    category: 'מדריכים',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png',
    date: '20 בדצמבר 2024',
    readTime: '5 דקות',
  },
];

export default function BlogPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>הבלוג שלנו</h1>
          <p className={styles.description}>
            טיפים, סרטונים, מדריכים והמלצות לבחירת הצימר המושלם
          </p>
        </header>

        <div className={styles.grid}>
          {articles.map((article) => {
            const isVideo = article.category === 'וידאו';
            const isPlaying = playingVideo === article.slug;
            
            if (isVideo && article.videoUrl) {
              return (
                <div key={article.slug} className={styles.card}>
                  <div className={`${styles.cardImage} ${styles.videoCard}`}>
                    {!isPlaying ? (
                      <>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div 
                          className={styles.playButton}
                          onClick={() => setPlayingVideo(article.slug)}
                        >
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <video
                        src={article.videoUrl}
                        controls
                        autoPlay
                        className={styles.verticalVideo}
                      />
                    )}
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
                </div>
              );
            }

            return (
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
