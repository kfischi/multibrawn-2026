'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'דף הבית' },
    { href: '/gallery', label: 'גלריה' },
    { href: '/tips', label: 'טיפים חשובים' },
    { href: '/about', label: 'אודות' },
  ];

  return (
    <header className={`${styles.mainHeader} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png"
            alt="MULTIBRAWN Logo"
            width={180}
            height={70}
            className={styles.logoImg}
          />
          <span className={styles.logoText}>MULTIBRAWN</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.navLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.navCta}>
            צור קשר
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="תפריט"
        >
          <i className={isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className={styles.mobileCtaButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              צור קשר
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
