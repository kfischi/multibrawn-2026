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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'כל הנכסים' },
    { id: 'villa', name: 'וילות' },
    { id: 'zimmer', name: 'צימרים' },
    { id: 'apartment', name: 'דירות נופש' },
    { id: 'hotel', name: 'מלונות בוטיק' },
    { id: 'event', name: 'מתחמי אירועים' },
  ];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);

        const { data, error: fetchError } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active');

        if (fetchError) throw fetchError;

        const sortedData = (data || []).sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
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
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  function mapPropertyType(type: string): string {
    const map: Record<string, string> = {
      'צימר': 'zimmer', 'וילה': 'villa', 'דירת נופש': 'apartment',
      'דירה': 'apartment', 'מלון בוטיק': 'hotel', 'בוטיק': 'hotel',
      'מתחם אירועים': 'event', 'מתחם': 'event',
    };
    for (const [key, value] of Object.entries(map)) {
      if (type.includes(key)) return value;
    }
    return 'zimmer';
  }

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedCategory);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerTop}>
            <span className={styles.subtitle}>אוסף נבחר</span>
            <span className={styles.count}>{properties.length}</span>
          </div>
          <h1 className={styles.mainTitle}>נכסים יוקרתיים</h1>
          <div className={styles.divider} />
        </div>
      </header>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`${styles.navBtn} ${selectedCategory === cat.id ? styles.navBtnActive : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      <main className={styles.main}>
        {filteredProperties.length === 0 ? (
          <div className={styles.empty}>לא נמצאו נכסים</div>
        ) : (
          <div className={styles.masonry}>
            {filteredProperties.map((property, index) => (
              <article 
                key={property.id} 
                className={styles.item}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCard(property.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <a href={property.affiliateUrl} target="_blank" rel="noopener noreferrer">
                  <div className={styles.imageBox}>
                    <img
                      src={property.images[0] || '/placeholder.jpg'}
                      alt={property.name}
                      className={styles.img}
                    />
                    {property.featured && (
                      <div className={styles.featured}>Featured</div>
                    )}
                    <div className={`${styles.hoverOverlay} ${hoveredCard === property.id ? styles.hoverOverlayActive : ''}`}>
                      <span className={styles.exploreBtn}>View Property</span>
                    </div>
                  </div>
                  
                  <div className={styles.details}>
                    <div className={styles.topRow}>
                      <h3 className={styles.propertyTitle}>{property.name}</h3>
                      {property.rating > 0 && (
                        <div className={styles.ratingBox}>
                          <span className={styles.ratingNum}>{property.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className={styles.loc}>{property.location}</p>
                    
                    <div className={styles.bottomRow}>
                      <span className={styles.guests}>{property.capacity} Guests</span>
                      <span className={styles.priceTag}>{property.price}</span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.cta}>
        <div className={styles.ctaBox}>
          <p className={styles.ctaSubtitle}>שירות אישי</p>
          <h2 className={styles.ctaTitle}>צריכים עזרה למצוא את הנכס המושלם?</h2>
          <a href="/contact" className={styles.ctaLink}>צור קשר</a>
        </div>
      </footer>
    </div>
  );
}
