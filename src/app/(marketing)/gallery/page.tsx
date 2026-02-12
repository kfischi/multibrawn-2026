'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/gallery/PropertyCard';
import { supabase } from '@/lib/supabase/client';
import styles from './Gallery.module.css';

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
  location: { city: string; area: string };
  capacity?: number;
  features?: string[];
  images: { main: string; gallery: string[] };
  description?: string;
  affiliate: { affiliateUrl: string };
  featured?: boolean;
  rating?: number;
}

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'הכל', icon: '🏠', description: 'כל הנכסים שלנו' },
    { id: 'villa', name: 'וילות', icon: '🏛️', description: 'וילות מרווחות ומפנקות' },
    { id: 'zimmer', name: 'צימרים', icon: '🏡', description: 'צימרים אינטימיים לזוגות' },
    { id: 'apartment', name: 'דירות', icon: '🏙️', description: 'דירות נופש מאובזרות' },
    { id: 'hotel', name: 'מלונות', icon: '🏨', description: 'מלונות בוטיק יוקרתיים' },
    { id: 'event', name: 'אירועים', icon: '💍', description: 'מתחמים לשבתות חתן' },
  ];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active');

        if (fetchError) throw fetchError;

        // Sort manually in JavaScript
        const sortedData = (data || []).sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        });

        const transformedProperties: Property[] = sortedData.map((item: AffiliateProperty) => ({
          id: item.id,
          name: item.name,
          type: mapPropertyType(item.property_type),
          location: item.location.city || item.location.area || 'ישראל',
          guests: item.capacity ? `עד ${item.capacity} אורחים` : 'מתאים לכולם',
          features: item.features || [],
          images: [item.images.main, ...(item.images.gallery || [])].filter(Boolean),
          videos: [],
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
    };
    for (const [key, value] of Object.entries(typeMap)) {
      if (supabaseType.includes(key)) return value;
    }
    return 'zimmer';
  }

  function getFilteredItems() {
    if (selectedCategory === 'all') return properties;
    return properties.filter(p => p.type === selectedCategory);
  }

  function groupByCategory() {
    const filtered = getFilteredItems();
    const grouped: Record<string, Property[]> = {};
    filtered.forEach(item => {
      const cat = item.type || 'zimmer';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });
    return Object.entries(grouped).map(([category, items]) => ({ category, items }));
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p className={styles.loadingText}>טוען את הגלריה...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>אופס! משהו השתבש</h2>
        <p className={styles.errorMessage}>{error}</p>
        <button className={styles.errorRetryBtn} onClick={() => window.location.reload()}>
          נסה שוב
        </button>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>📭</div>
        <h2 className={styles.emptyTitle}>אין נכסים להצגה</h2>
        <p className={styles.emptyMessage}>נכסים חדשים בדרך! חזרו בקרוב</p>
      </div>
    );
  }

  return (
    <div className={styles.galleryPage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>
            מצימרים רומנטיים ועד וילות יוקרה - {properties.length} נכסים מדהימים
          </p>
        </div>
      </section>

      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterButton} ${selectedCategory === cat.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className={styles.gallerySection}>
        {groupByCategory().map(({ category, items }) => {
          const categoryData = categories.find(c => c.id === category);
          return (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>{categoryData?.icon}</div>
                <h2 className={styles.categoryTitle}>{categoryData?.name}</h2>
              </div>
              {categoryData?.description && (
                <p className={styles.categoryDescription}>{categoryData.description}</p>
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

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>לא מצאתם את מה שחיפשתם?</h2>
          <p className={styles.ctaText}>דברו איתנו ונמצא לכם את המקום המושלם</p>
          <a href="/contact" className={styles.ctaButton}>צור קשר עכשיו →</a>
        </div>
      </section>
    </div>
  );
}
