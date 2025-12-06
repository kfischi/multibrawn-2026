'use client';

import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png"
              alt="MULTIBRAWN Logo"
              width={180}
              height={70}
            />
            <span className={styles.logoText}>MULTIBRAWN</span>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.socialSection}>
          <SocialLinks />
        </div>

        {/* Footer Links */}
        <div className={styles.linksSection}>
          <Link href="/privacy" className={styles.footerLink}>
            מדיניות פרטיות
          </Link>
          <Link href="/accessibility-statement" className={styles.footerLink}>
            הצהרת נגישות
          </Link>
        </div>

        {/* CTA Button */}
        <Link href="/contact" className={styles.ctaButton}>
          הזמן עכשיו
        </Link>

        {/* Multi-Site Credit */}
        <div className={styles.creditSection}>
          <p className={styles.creditText}>
            אתר זה נבנה ע&quot;י <strong>Multi-Site</strong> - אתרים שבונים עסקים
          </p>
          <p className={styles.creditSubtext}>
            מבית <strong>Multibrawn</strong>
          </p>
        </div>

        {/* Copyright */}
        <p className={styles.copyright}>
          © 2025 MULTIBRAWN. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
