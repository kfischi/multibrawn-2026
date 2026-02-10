'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import PropertyCard from '@/components/gallery/PropertyCard';
import properties from '@/data/properties.json';
import styles from './Gallery.module.css';

// תמונה למקרה חירום (אם אין שום תמונה אחרת)
const FALLBACK_IMAGE = 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg';

export default function GalleryPage() {
  const [affiliateProps, setAffiliateProps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAffiliate() {
      try {
        console.log('Fetching from Supabase...');
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active');

        if (data) {
          console.log(`Raw data found: ${data.length}`);
          
          const validItems = data.map((prop: any, index: number) => {
            try {
              // --- תיקון תמונות אגרסיבי ---
              let safeImages: string[] = [];

              // בדיקה: האם יש בכלל שדה images?
              if (prop.images && typeof prop.images === 'object') {
                // האם יש תמונה ראשית?
                if (prop.images.main && typeof prop.images.main === 'string') {
                  safeImages.push(prop.images.main);
                }
                // האם יש גלריה?
                if (Array.isArray(prop.images.gallery)) {
                  // מסנן רק מחרוזות תקינות מתוך הגלריה
                  const validGallery = prop.images.gallery.filter((img: any) => typeof img === 'string');
                  safeImages = [...safeImages, ...validGallery];
                }
              }

              // אם אחרי כל הבדיקות אין תמונות -> שים תמונת ברירת מחדל
              if (safeImages.length === 0) {
                safeImages = [FALLBACK_IMAGE];
              }

              // --- בניית האובייקט הסופי ---
              return {
                id: prop.id || `temp-id-${index}`,
                name: prop.name || 'נכס ללא שם',
                type: prop.property_type || 'אירוח',
                location: prop.location?.city || 'מיקום כללי',
                guests: `עד ${prop.capacity || 4} אורחים`,
                features: Array.isArray(prop.features) ? prop.features : [],
                images: safeImages, // מובטח שזה מערך עם לפחות איבר אחד
                videos: [],
                description: prop.description || '',
                rating: Number(prop.rating) || 5,
                price: prop.price || 0
              };

            } catch (err) {
              console.error('Error parsing item:', index, err);
              return null; // מסמן נכס פגום
            }
          }).filter(item => item !== null); // מסנן החוצה את הפגומים

          setAffiliateProps(validItems);
        }
      } catch (err) {
        console.error('Critical error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliate();
  }, []);

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
