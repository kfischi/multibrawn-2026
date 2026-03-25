'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="הסכמה לעוגיות">
      <p className={styles.text}>
        אנחנו משתמשים בעוגיות לשיפור החוויה באתר.{' '}
        <a href="/privacy" className={styles.link}>מדיניות פרטיות</a>
      </p>
      <div className={styles.actions}>
        <button onClick={accept} className={styles.acceptBtn}>הבנתי, אשר</button>
        <button onClick={() => setVisible(false)} className={styles.closeBtn} aria-label="סגור">✕</button>
      </div>
    </div>
  );
}
