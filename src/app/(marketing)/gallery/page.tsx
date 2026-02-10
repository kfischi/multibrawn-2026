'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import PropertyCard from '@/components/gallery/PropertyCard';
import properties from '@/data/properties.json';
import styles from './Gallery.module.css';

export default function GalleryPage() {
  const [affiliateProps, setAffiliateProps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAffiliate() {
      try {
        console.log('Gallery connecting to Supabase...');

        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active')
          .order('rating', { ascending: false });

        if (error) {
          console.error('Supabase Error:', error);
          setDebugError('שגיאה בחיבור למסד הנתונים: ' + error.message);
          return;
        }

        if (data) {
          console.log('Loaded properties raw data:', data); // תסתכל בקונסול מה מגיע!

          const transformed = data.map((prop: any, index: number) => {
            // --- הגנה מפני קריסות (Defensive Coding) ---
            // מוודאים ששום שדה לא יפיל את האתר
            const safeImages = prop.images || {};
            const mainImage = safeImages.main || 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg';
            const galleryImages = Array.isArray(safeImages.gallery) ? safeImages.gallery : [];

            return {
              id: prop.id || `temp-id-${index}`, // מונע בעיות של מפתחות חסרים
              name: prop.name || 'נכס ללא שם',
              type: prop.property_type || 'צימר',
              location: prop.location?.city || 'צפון',
              guests: `עד ${prop.capacity || 4} אורחים`,
              features: Array.isArray(prop.features) ? prop.features : [],
              images: [mainImage, ...galleryImages],
              videos: [],
              description: prop.description || '',
            };
          });
          
          setAffiliateProps(transformed);
        }
      } catch (err: any) {
        console.error('CRITICAL CRASH in Gallery:', err);
        setDebugError('קריסה בעיבוד הנתונים: ' + (err.message || JSON.stringify(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliate();
  }, []);

  // נתונים מקבצי ה-JSON
  const regularProps = properties.properties || [];
  
  // איחוד הנתונים - עם בדיקה שזה באמת מערך
  const allProperties = [...regularProps, ...(Array.isArray(affiliateProps) ? affiliateProps : [])];

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          
          {/* --- איזור דיבוג: יופיע רק אם יש שגיאה --- */}
          {debugError && (
            <div style={{ backgroundColor: 'red', color: 'white', padding: '20px', direction: 'ltr', textAlign: 'left', margin: '20px' }}>
              <h3>⚠️ Error Debugging:</h3>
              <p>{debugError}</p>
            </div>
          )}
          {/* ------------------------------------------ */}

          <p className={styles.heroSubtitle}>
            {allProperties.length} נכסים מדהימים מחכים לכם
          </p>
          {!loading && affiliateProps.length > 0 && (
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.9 }}>
              {regularProps.length} נכסים שלנו + {affiliateProps.length} נכסים משותפים
            </p>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p>טוען נכסים...</p>
          </div>
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
