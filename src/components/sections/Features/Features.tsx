import Link from 'next/link';
import styles from './Features.module.css';

export default function Features() {
  const features = [
    {
      icon: '🏡',
      title: 'צימרים רומנטיים',
      description: 'צימרים אינטימיים ומפנקים זוגות. ג\'קוזי פרטי, נוף מדהים וכל מה שצריך לסופ"ש מושלם.',
      link: '/gallery?category=zimmers',
      gradient: 'linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)',
    },
    {
      icon: '🏛️',
      title: 'וילות משפחתיות',
      description: 'וילות מרווחות ומאובזרות למשפחות. בריכה פרטית, גינה גדולה ושפע מקום לילדים.',
      link: '/gallery?category=villas',
      gradient: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)',
    },
    {
      icon: '🏨',
      title: 'מלונות בוטיק',
      description: 'מלונות עם אופי ייחודי ושירות אישי. חוויית אירוח יוקרתית עם תשומת לב לפרטים.',
      link: '/gallery?category=hotels',
      gradient: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)',
    },
    {
      icon: '💍',
      title: 'מתחמי אירועים',
      description: 'מתחמים מושלמים לחתונות, אירועים ואירוח. תכנון מקצועי וביצוע ללא דופי.',
      link: '/gallery?category=events',
      gradient: 'linear-gradient(135deg, #FFA8A8 0%, #FCFF00 100%)',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>מה אנחנו מציעים</h2>
          <p className={styles.description}>
            מגוון רחב של אפשרויות לכל סוג חופשה - מסופ"ש רומנטי ועד אירוע משפחתי גדול
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.link}
              className={styles.featureCard}
              style={{ '--gradient': feature.gradient } as any}
            >
              <div className={styles.cardIcon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
