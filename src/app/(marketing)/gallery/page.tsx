'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Gallery.module.css';
import PropertyCard from '@/components/gallery/PropertyCard';
import { supabase } from '@/lib/supabase/client';

// ============================================
// 🎯 TYPES
// ============================================

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  guests: string;
  features: string[];
  images: string[];
  videos?: string[];
  description: string;
}

interface AffiliateProperty {
  id: string;
  name: string;
  property_type: string;
  location: {
    city: string;
    area: string;
  };
  capacity?: number;
  features?: string[];
  images: {
    main: string;
    gallery: string[];
  };
  description?: string;
  affiliate: {
    affiliateUrl: string;
  };
}

// ============================================
// 🎨 GALLERY PAGE COMPONENT
// ============================================

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================
  // 📋 CATEGORIES
  // ============================================

  const categories = [
    { 
      id: 'all', 
      name: 'הכל', 
      icon: '🏠',
      description: 'כל הנכסים שלנו'
    },
    { 
      id: 'villa', 
      name: 'וילות', 
      icon: '🏛️',
      description: 'וילות מרווחות ומפנקות עם בריכות פרטיות'
    },
    { 
      id: 'zimmer', 
      name: 'צימרים', 
      icon: '🏡',
      description: 'צימרים אינטימיים וחלומיים לזוגות'
    },
    { 
      id: 'apartment', 
      name: 'דירות', 
      icon: '🏙️',
      description: 'דירות נופש מאובזרות במיקומים מרכזיים'
    },
    { 
      id: 'hotel', 
      name: 'מלונות', 
      icon: '🏨',
      description: 'מלונות בוטיק ויוקרתיים עם שירות אישי'
    },
    { 
      id: 'event', 
      name: 'אירועים', 
      icon: '💍',
      description: 'מתחמים ייחודיים לשבתות חתן ואירועים'
    },
  ];

  // ============================================
  // 📥 FETCH PROPERTIES FROM SUPABASE
  // ============================================

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active')
          .order('featured', { ascending: false })
          .order('rating', { ascending: false, nullsFirst: false });

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        // Transform Supabase data to match Gallery format
        const transformedProperties: Property[] = (data || []).map((item: AffiliateProperty) => ({
          id: item.id,
          name: item.name,
          type: mapPropertyType(item.property_type),
          location: item.location.city || item.location.area || 'ישראל',
          guests: item.capacity ? `עד ${item.capacity} אורחים` : 'מתאים לכולם',
          features: item.features || [],
          images: [
            item.images.main,
            ...(item.images.gallery || [])
          ].filter(Boolean),
          videos: [], // No videos from Supabase
          description: item.description || item.name,
        }));

        setProperties(transformedProperties);
      } catch (err: any) {
        console.error('Error fetching properties:', err);
        setError(err.message || 'שגיאה בטעינת הנכסים');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // ============================================
  // 🔧 HELPER FUNCTIONS
  // ============================================

  function mapPropertyType(supabaseType: string): string {
    const typeMap: Record<string, string> = {
      'צימר': 'zimmer',
      'וילה': 'villa',
      'דירת נופש': 'apartment',
      'דירה': 'apartment',
      'מלון בוטיק': 'hotel',
      'בוטיק': 'hotel',
      'מתחם אירועים': 'event',
      'מתחם': 'event',
      'אולם אירועים': 'event',
    };

    // Check if the type matches any key
    for (const [key, value] of Object.entries(typeMap)) {
      if (supabaseType.includes(key)) {
        return value;
      }
    }

    return 'zimmer'; // default
  }

  function getFilteredItems() {
    if (selectedCategory === 'all') {
      return properties.map(p => ({
        ...p,
        category: p.type,
      }));
    }

    return properties
      .filter(p => p.type === selectedCategory)
      .map(p => ({
        ...p,
        category: p.type,
      }));
  }

  function groupByCategory() {
    const filtered = getFilteredItems();
    const grouped: Record<string, Property[]> = {};

    filtered.forEach(item => {
      const cat = item.category || 'zimmer';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  }

  // ============================================
  // 🎨 LOADING STATE
  // ============================================

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>טוען את הגלריה...</p>
      </div>
    );
  }

  // ============================================
  // ❌ ERROR STATE
  // ============================================

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>אופס! משהו השתבש</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button 
          className={styles.errorRetryBtn}
          onClick={() => window.location.reload()}
        >
          נסה שוב
        </button>
      </div>
    );
  }

  // ============================================
  // 📭 EMPTY STATE
  // ============================================

  if (properties.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>📭</div>
        <h2 className={styles.emptyTitle}>אין נכסים להצגה</h2>
        <p className={styles.emptyMessage}>נכסים חדשים בדרך! חזרו בקרוב</p>
      </div>
    );
  }

  // ============================================
  // 🎨 MAIN RENDER
  // ============================================

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>
            מצימרים רומנטיים ועד וילות יוקרה - {properties.length} נכסים מדהימים
          </p>
        </div>
      </section>

      {/* Category Filter Buttons */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterButton} ${
              selectedCategory === cat.id ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.id === 'villa' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            {cat.id === 'zimmer' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
            {cat.id === 'apartment' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
            )}
            {cat.id === 'hotel' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {cat.id === 'event' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            )}
            {cat.id === 'all' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
            )}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={styles.gallerySection}>
        {groupByCategory().map(({ category, items }) => {
          const categoryData = categories.find(c => c.id === category);
          return (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                  {categoryData?.icon}
                </div>
                <h2 className={styles.categoryTitle}>
                  {categoryData?.name}
                </h2>
              </div>
              {categoryData?.description && (
                <p className={styles.categoryDescription}>
                  {categoryData.description}
                </p>
              )}
              <div className={styles.galleryRow}>
                {items.map((item) => (
                  <PropertyCard key={item.id} property={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>לא מצאתם את מה שחיפשתם?</h2>
          <p className={styles.ctaText}>דברו איתנו ונמצא לכם את המקום המושלם</p>
          <a href="/contact" className={styles.ctaButton}>
            צור קשר עכשיו →
          </a>
        </div>
      </section>
    </div>
  );
}
