'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import styles from './Gallery.module.css';

interface Property {
  id: string;
  name: string;
  type: string;
  location: string;
  price: string;
  capacity: number;
  rating: number;
  featured: boolean;
  images: string[];
  description: string;
  affiliateUrl: string;
}

interface AffiliateProperty {
  id: string;
  name: string;
  property_type: string;
  location: { city: string; area: string };
  capacity?: number;
  price_range?: string;
  rating?: number;
  featured?: boolean;
  images: { main: string; gallery: string[] };
  description?: string;
  affiliate: { affiliateUrl: string };
}

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'כל הנכסים', slug: 'all' },
    { id: 'villa', name: 'וילות', slug: 'villa' },
    { id: 'zimmer', name: 'צימרים', slug: 'zimmer' },
    { id: 'apartment', name: 'דירות נופש', slug: 'apartment' },
    { id: 'hotel', name: 'מלונות בוטיק', slug: 'hotel' },
    { id: 'event', name: 'מתחמי אירועים', slug: 'event' },
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
          location: `${item.location.city || item.location.area || 'ישראל'}`,
          price: item.price_range || 'לפי פנייה',
          capacity: item.capacity || 2,
          rating: item.rating || 0,
          featured: item.featured || false,
          images: [item.images.main, ...(item.images.gallery || [])].filter(Boolean),
          description: item.description || item.name,
          affiliateUrl: item.affiliate.affiliateUrl || '#',
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

  function getFilteredProperties() {
    if (selectedCategory === 'all') return properties;
    return properties.filter(p => p.type === selectedCategory);
  }

  const filteredProperties = getFilteredProperties();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>שגיאה בטעינת הנכסים</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>נסה שוב</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>אוסף נכסים יוקרתיים</h1>
          <p className={styles.heroSubtitle}>
            {properties.length} נכסים נבחרים במיקומים המובילים בארץ
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`${styles.filterBtn} ${
                  selectedCategory === cat.id ? styles.filterBtnActive : ''
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className={styles.resultsCount}>
            {filteredProperties.length} נכסים
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          {filteredProperties.length === 0 ? (
            <div className={styles.emptyState}>
              <p>לא נמצאו נכסים בקטגוריה זו</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredProperties.map((property) => (
                <article key={property.id} className={styles.card}>
                  <a href={property.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <div className={styles.imageWrapper}>
                      <img
                        src={property.images[0] || '/placeholder.jpg'}
                        alt={property.name}
                        className={styles.image}
                      />
                      {property.featured && (
                        <div className={styles.badge}>מומלץ</div>
                      )}
                      <div className={styles.overlay}>
                        <span className={styles.viewBtn}>צפה בנכס →</span>
                      </div>
                    </div>
                    
                    <div className={styles.content}>
                      <div className={styles.header}>
                        <h3 className={styles.title}>{property.name}</h3>
                        {property.rating > 0 && (
                          <div className={styles.rating}>
                            <span className={styles.star}>★</span>
                            <span className={styles.ratingValue}>{property.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className={styles.location}>{property.location}</p>
                      
                      <div className={styles.footer}>
                        <span className={styles.capacity}>עד {property.capacity} אורחים</span>
                        <span className={styles.price}>{property.price}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>צריכים עזרה למצוא את הנכס המושלם?</h2>
          <p className={styles.ctaText}>הצוות שלנו זמין לייעוץ אישי</p>
          <a href="/contact" className={styles.ctaBtn}>צור קשר</a>
        </div>
      </section>
    </div>
  );
}
