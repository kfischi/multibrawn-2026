'use client';

import { useState } from 'react';
import { getTips, getTipCategories } from '@/lib/data';
import TipCard from '@/components/tips/TipCard';
import styles from './Tips.module.css';

export default function TipsPage() {
  const allTips = getTips();
  const categories = getTipCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTips = selectedCategory === 'all'
    ? allTips
    : allTips.filter(tip => tip.category === selectedCategory);

  const featuredTips = filteredTips.filter(tip => tip.featured);
  const regularTips = filteredTips.filter(tip => !tip.featured);

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradient}>טיפים חשובים</span>
            <br />
            לחופשה מושלמת
          </h1>
          <p className={styles.heroDescription}>
            כל מה שצריך לדעת לפני ההזמנה - מדריכים מקצועיים, טיפים וחוויות מהשטח
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className={styles.filters}>
        <div className={styles.container}>
          <div className={styles.categoryButtons}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tips */}
      {featuredTips.length > 0 && (
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleIcon}>⭐</span>
              מומלצים במיוחד
            </h2>
            <div className={styles.featuredGrid}>
              {featuredTips.map((tip) => (
                <TipCard
                  key={tip.id}
                  {...tip}
                  featured
                  size="large"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tips Grid */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {selectedCategory === 'all' ? 'כל הטיפים' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className={styles.tipsGrid}>
            {regularTips.map((tip) => (
              <TipCard
                key={tip.id}
                {...tip}
                size="medium"
              />
            ))}
          </div>

          {regularTips.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎬</div>
              <p className={styles.emptyText}>
                אין טיפים בקטגוריה זו כרגע
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className={styles.emptyButton}
              >
                חזרה לכל הטיפים
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              יש לכם שאלה? בואו נדבר!
            </h2>
            <p className={styles.ctaDescription}>
              ערדית והצוות שלנו כאן כדי לעזור לכם למצוא את המקום המושלם
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
                href="/contact"
                className={styles.contactButton}
              >
                טופס יצירת קשר
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
