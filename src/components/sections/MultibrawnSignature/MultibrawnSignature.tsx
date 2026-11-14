import Image from 'next/image';
import Link from 'next/link';
import styles from './MultibrawnSignature.module.css';

/**
 * חתימת MULTIBRAWN — בלוק קצר שמסביר מי זו ערדית ומה זה מולטיבראון.
 * מיועד להצטרף בהדרגה לתחתית כל דף נחיתה באתר (וביהמשך — גם כחתימה לתוכן/סרטונים).
 * טיוטה ראשונה לאישור ערדית לפני שהוא יורד לדפים נוספים.
 */
export default function MultibrawnSignature() {
  return (
    <section className={styles.signature}>
      <Image
        src="/logo-multibrawn-clear.png"
        alt="MULTIBRAWN"
        width={110}
        height={34}
        className={styles.logo}
      />
      <span className={styles.eyebrow}>מאחורי כל דף ב-MULTIBRAWN</span>
      <h2 className={styles.heading}>שלום, אני ערדית בראון.</h2>
      <p className={styles.line}>לא קטלוג. התאמה אישית — וילות, צימרים, שבתות חתן ואירועים.</p>
      <p className={styles.line}>עשר שנים של חיבורים בין אנשים למקום הנכון.</p>
      <Link href="/about" className={styles.cta}>
        להכיר את הסיפור המלא ←
      </Link>
    </section>
  );
}
