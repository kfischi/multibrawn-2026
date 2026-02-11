'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import PropertyCard from '@/components/gallery/PropertyCard';
import styles from './Gallery.module.css';

// --- הגדרות סופבייס (Hardcoded) ---

// 1. הכתובת האמיתית של הפרויקט שלך (לפי הלוגים שעבדו קודם)
const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';

// 🔴 2. המקום למפתח הסודי שלך 🔴
// תמחק את הטקסט למטה ותדביק את ה-anon_key הארוך שלך (מתחיל ב-ey...)
const supabaseKey = 'הדבק_כאן_את_המפתח_הארוך_שלך_מתוך_env_local'; 

// יצירת החיבור
const supabase = createClient(supabaseUrl, supabaseKey);

// --- טיפוסים ---
interface Property {
  id: string;
  name: string;
  location: string;
  price: string | number;
  images: any;
  rating: number;
  property_type?: string;
  features?: string[];
  description?: string;
  affiliate_url?: string;
}

export default function GalleryPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // פילטרים
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        console.log('Connecting to Supabase:', supabaseUrl);
        
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase Error:', error);
          throw error;
        }

        console.log('Properties loaded:', data?.length);
        setProperties(data || []);
      } catch (err: any) {
        console.error('Fetch Error:', err);
        setError(err.message || 'שגיאה בחיבור למסד הנתונים');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // --- לוגיקת סינון ---
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (property.location && property.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegion = selectedRegion === 'all' || (property.location && property.location.includes(selectedRegion));
    const matchesType = selectedType === 'all' || (property.property_type && property.property_type === selectedType);

    return matchesSearch && matchesRegion && matchesType;
  });

  const regions = Array.from(new Set(properties.map(p => p.location).filter(Boolean)));
  const types = Array.from(new Set(properties.map(p => p.property_type).filter(Boolean)));

  return (
    <div className={styles.galleryPage} dir="rtl">
      
      {/* Hero Section */}
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הנכסים המובחרים שלנו</h1>
          <p className={styles.heroSubtitle}>
            אוסף אקסקלוסיבי של {properties.length} נכסי יוקרה, וילות וצימרים
          </p>
        </div>
      </section>

      {/* אזור תוכן */}
      <section className={styles.gallerySection}>
        
        {/* סרגל כלים ופילטרים */}
        <div className="container mx-auto px-4 mb-8 -mt-8 relative z-20">
          <div className="bg-[#1f1f1f] p-4 rounded-xl shadow-2xl border border-[#333] flex flex-wrap gap-4 items-center justify-between">
            
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="🔍 חיפוש חופשי..."
                className="w-full bg-[#333] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              className="bg-[#333] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">📍 כל האזורים</option>
              {regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <select 
              className="bg-[#333] text-white px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">🏡 כל הסוגים</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <div className="text-gray-400 text-sm font-medium px-2">
              {filteredProperties.length} תוצאות
            </div>
          </div>
        </div>

        {/* טעינה */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* שגיאה */}
        {error && (
          <div className="text-center p-10 bg-red-900/20 rounded-xl border border-red-800 mx-auto max-w-2xl">
            <h3 className="text-xl text-red-500 font-bold mb-2">אופס, משהו השתבש</h3>
            <p className="text-red-300">לא הצלחנו לטעון את הנכסים.</p>
            <p className="text-sm text-gray-400 mt-2 ltr">{error}</p>
            <p className="text-xs text-yellow-500 mt-4">טיפ: בדוק שהדבקת את ה-Key הנכון בקובץ הקוד.</p>
          </div>
        )}

        {/* גריד תוצאות */}
        {!loading && !error && (
          <div className={styles.propertiesGrid}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* אין תוצאות */}
        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <h3 className="text-2xl font-bold mb-2">לא נמצאו נכסים</h3>
            <p>נסה לשנות את סינוני החיפוש</p>
          </div>
        )}

      </section>
    </div>
  );
}
