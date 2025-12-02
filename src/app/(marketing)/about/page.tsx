import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import styles from './About.module.css';

export const metadata = {
  title: 'אודות | MULTIBRAWN - הסיפור של ערדית',
  description: 'הכירו את ערדית והסיפור מאחורי מולטיבראון - 9+ שנות ניסיון במציאת המקום המושלם לכל חופשה',
};

export default function AboutPage() {
  const values = [
    {
      icon: '💎',
      title: 'שירות אישי',
      description: 'כל לקוח מקבל יחס אישי ומענה מהיר לכל שאלה',
    },
    {
      icon: '🎯',
      title: 'מקצועיות',
      description: '9+ שנות ניסיון במציאת המקום המושלם לכל סוג חופשה',
    },
    {
      icon: '🤝',
      title: 'אמינות',
      description: 'עבודה שקופה, ישרה ומקצועית מול כל הלקוחות',
    },
    {
      icon: '⚡',
      title: 'זמינות',
      description: 'זמינים עבורכם 24/7 לכל שאלה או בעיה',
    },
  ];

  const stats = [
    { number: '9+', label: 'שנות ניסיון' },
    { number: '500+', label: 'לקוחות מרוצים' },
    { number: '200+', label: 'נכסים במאגר' },
    { number: '100%', label: 'שביעות רצון' },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroImage}>
            <img
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
              alt="ערדית - מייסדת מולטיבראון"
              className={styles.profileImage}
            />
            <div className={styles.imageBorder}></div>
          </div>
          <div className={styles.heroText}>
            <h1 className={styles.title}>
              היי, אני <span className={styles.gradient}>ערדית</span>
            </h1>
            <p className={styles.subtitle}>מייסדת MULTIBRAWN</p>
            <p className={styles.description}>
              מזה 9+ שנים אני עוזרת לאנשים למצוא את המקום המושלם לחופשה.
              בין אם זה צימר רומנטי לסופ"ש, וילה משפחתית לחופשה, או מתחם מושלם לאירוע -
              אני כאן כדי להפוך את החלום שלכם למציאות.
            </p>
            <div className={styles.socialContainer}>
              <p className={styles.followText}>עקבו אחרי ב:</p>
              <SocialLinks variant="default" size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הסיפור שלי</h2>
          <div className={styles.storyContent}>
            <p>
              התחלתי את הדרך שלי בתחום האירוח לפני יותר מ-9 שנים, מתוך אהבה אמיתית 
              למקומות מיוחדים וחוויות בלתי נשכחות. בהתחלה עבדתי כסוכנת נסיעות, 
              אבל הבנתי שאני רוצה להתמקד במשהו שונה - במציאת המקומות המושלמים 
              לחופשות בישראל.
            </p>
            <p>
              במהלך השנים, בניתי רשת של קשרים עם בעלי נכסים ברחבי הארץ, 
              למדתי להכיר כל צימר ווילה לעומק, ולהבין בדיוק מה כל לקוח צריך. 
              הסוד שלי? להקשיב באמת, להבין את הצרכים, ולהתאים את המקום המדויק 
              לכל אדם ומשפחה.
            </p>
            <p>
              היום, מולטיבראון היא לא רק עסק - זו משפחה של מאות לקוחות מרוצים 
              שחוזרים אליי שוב ושוב. כל המלצה, כל חיוך, כל "תודה" - זה מה שגורם לי 
              להמשיך לעשות את מה שאני אוהבת.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הערכים שלנו</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className={styles.video}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הכירו אותי במלוא הדר</h2>
          <div className={styles.videoContainer}>
            <video
              controls
              className={styles.videoPlayer}
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
            >
              <source src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763328612/V2_cj6div.mp4" type="video/mp4" />
              הדפדפן שלך לא תומך בווידאו
            </video>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              בואו נמצא לכם את המקום המושלם
            </h2>
            <p className={styles.ctaDescription}>
              אני כאן כדי לעזור לכם לתכנן את החופשה המושלמת
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/972523983394"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                שלחו הודעה בוואטסאפ
              </a>
              <a
                href="tel:+972523983394"
                className={styles.phoneButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                התקשרו: 052-398-3394
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
