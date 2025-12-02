'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProperties } from '@/lib/data';
import PropertyCard from '@/components/gallery/PropertyCard';
import styles from './Gallery.module.css';

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  const allProperties = getProperties();
  
  // Filter by category
  let filteredProperties = selectedCategory === 'all'
    ? allProperties
    : allProperties.filter(prop => prop.type === selectedCategory);

  // Filter by search term
  if (searchTerm) {
    filteredProperties = filteredProperties.filter(prop =>
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const categories = [
    { id: 'all', name: 'הכל', icon: '🏠' },
    { id: 'zimmer', name: 'צימרים', icon: '🏡' },
    { id: 'villa', name: 'וילות', icon: '🏛️' },
    { id: 'hotel', name: 'מלונות', icon: '🏨' },
    { id: 'event', name: 'אירועים', icon: '💍' },
  ];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.gradient}>גלריה</span>
            <br />
            הנכסים שלנו
          </h1>
          <p className={styles.heroDescription}>
            מגוון רחב של צימרים, וילות, מלונות בוטיק ומתחמי אירועים
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filters}>
        <div className={styles.container}>
          {/* Search Bar */}
          <div className={styles.searchBar}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="חיפוש לפי שם, מיקום או תיאור..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={styles.clearButton}
                aria-label="נקה חיפוש"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.active : ''
                }`}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallery}>
        <div className={styles.container}>
          {/* Results Count */}
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>
              {filteredProperties.length} נכסים
            </h2>
            {searchTerm && (
              <p className={styles.searchInfo}>
                תוצאות חיפוש עבור: <strong>{searchTerm}</strong>
              </p>
            )}
          </div>

          {/* Grid */}
          {filteredProperties.length > 0 ? (
            <div className={styles.grid}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3 className={styles.emptyTitle}>לא נמצאו תוצאות</h3>
              <p className={styles.emptyText}>
                נסה לשנות את הפילטרים או את מילות החיפוש
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className={styles.resetButton}
              >
                אפס חיפוש
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              לא מצאתם מה שחיפשתם?
            </h2>
            <p className={styles.ctaDescription}>
              ערדית והצוות שלנו יעזרו לכם למצוא את המקום המושלם
            </p>
            <div className={styles.ctaButtons}>
              <a
                href="https://wa.me/972523983394"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                שלחו הודעה
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
