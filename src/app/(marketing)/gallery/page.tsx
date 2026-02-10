'use client';

import { useEffect, useState } from 'react';
// 👇 התיקון: מייבאים את הקליינט המרכזי במקום ליצור חדש
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
        // לוג בדיקה שיופיע בקונסול כדי שנדע שזה עובד
        console.log('Gallery connecting to Supabase...'); 

        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active')
          .order('rating', { ascending: false });

        if (error) {
          console.error('Supabase Error in Gallery:', error);
        }

        if (data) {
          console.log('Loaded properties:', data.length);
          const transformed = data.map((prop: any) => ({
            id: prop.id,
            name: prop.name,
            type: prop.property_type || 'צימר',
            location: prop.location?.city || 'צפון',
            guests: `עד ${prop.capacity || 4} אורחים`,
            features: Array.isArray(prop.features) ? prop.features : [],
            images: prop.images?.main 
              ? [prop.images.main, ...(Array.isArray(prop.images?.gallery) ? prop.images.gallery : [])]
              : ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg'],
            videos: [],
            description: prop.description || '',
          }));
          setAffiliateProps(transformed);
        }
      } catch (err) {
        console.error('Failed to load affiliate properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliate();
  }, []);

  const regularProps = properties.properties;
  const allProperties = [...regularProps, ...affiliateProps];

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
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
            {allProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
