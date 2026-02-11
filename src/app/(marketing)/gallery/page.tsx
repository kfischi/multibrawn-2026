'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import PropertyCard from '@/components/gallery/PropertyCard';
import styles from './Gallery.module.css';

// --- הגדרות סופבייס עם ניקוי אגרסיבי ---

const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';

// המפתח שלך (הדבקתי אותו כאן שוב נקי)
const rawKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g';

// ניקוי: מוחק כל תו שאינו אנגלית/מספרים/סימנים סטנדרטיים ומוריד רווחים
const supabaseKey = rawKey.replace(/[^\x20-\x7E]/g, '').trim();

// יצירת החיבור
const supabase = createClient(supabaseUrl, supabaseKey);

// --- שאר הקוד (ללא שינוי) ---
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        console.log('Connecting to Supabase...');
        
        // נסיון שליפה
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase Error Detailed:', JSON.stringify(error, null, 2));
          throw error;
        }

        console.log('Properties loaded:', data?.length);
        setProperties(data || []);
      } catch (err: any) {
        // טיפול בשגיאת התווים הנסתרים
        if (err.message && err.message.includes('ISO-8859-1')) {
           console.error('Encoding Error:', err);
           setError('שגיאת קידוד במפתח (Key Encoding Error)');
        } else {
           console.error('Fetch Error:', err);
           setError(err.message || 'שגיאה בחיבור למסד הנתונים');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

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
      
      <section className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הנכסים המובחרים שלנו</h1>
          <p className={styles.heroSubtitle}>
            אוסף אקסקלוסיבי של {properties.length} נכסי יוקרה, וילות וצימרים
          </p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        
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

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center p-10 bg-red-900/20 rounded-xl border border-red-800 mx-auto max-w-2xl">
            <h3 className="text-xl text-red-500 font-bold mb-2">אופס, משהו השתבש</h3>
            <p className="text-red-300">לא הצלחנו לטעון את הנכסים.</p>
            <p className="text-sm text-gray-400 mt-2 ltr">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className={styles.propertiesGrid}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

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
