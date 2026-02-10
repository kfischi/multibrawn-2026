'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import PropertyCard from '@/components/gallery/PropertyCard';
import properties from '@/data/properties.json';
import styles from './Gallery.module.css';

export default function GalleryPage() {
  const [affiliateProps, setAffiliateProps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAffiliate() {
      try {
        console.log('Fetching data...');
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active'); // מביא רק פעילים

        if (data) {
          console.log(`Success! Found ${data.length} items.`);
          
          const safeData = data.map((prop: any, index: number) => {
            // --- תיקון אגרסיבי לתמונות ---
            let finalImages = ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg'];
            
            try {
              // בודק אם יש תמונות ומוודא שזה לא נשבר
              if (prop.images && typeof prop.images === 'object') {
                const main = prop.images.main;
                const gallery = Array.isArray(prop.images.gallery) ? prop.images.gallery : [];
                
                if (main) {
                  finalImages = [main, ...gallery];
                }
              }
            } catch (e) {
              console.warn(`Fixing broken images for item ${index}`);
            }

            return {
              id: prop.id || `fallback-id-${index}`,
              name: prop.name || 'נכס ללא שם',
              type: prop.property_type || 'אירוח',
              location: prop.location?.city || 'מיקום כללי',
              guests: `עד ${prop.capacity || 4} אורחים`,
              features: Array.isArray(prop.features) ? prop.features : [],
              images: finalImages, // עכשיו זה בטוח מערך עם לפחות תמונה אחת
              videos: [],
              description: prop.description || '',
              rating: prop.rating || 5
            };
          });

          setAffiliateProps(safeData);
        }
      } catch (err) {
        console.error('Error fetching:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliate();
  }, []);

  // משלב את הנכסים הרגילים עם החדשים
  const regularProps = properties.properties || [];
  const allProperties = [...regularProps, ...affiliateProps];

  return (
    <div className={styles.galleryPage}>
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>
            {allProperties.length} נכסים מדהימים מחכים לכם
          </p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>טוען נכסים...</div>
        ) : (
          <div className={styles.propertiesGrid}>
            {allProperties.map((property: any, i: number) => (
              <PropertyCard key={property.id || i} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
