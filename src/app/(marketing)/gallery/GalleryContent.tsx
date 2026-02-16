'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';

const supabase = createClient(
  'https://ulfwxmjerugxayuyliug.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g'
);

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
}

export default function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const categories = [
    { id: 'all', name: 'הכל' },
    { id: 'villa', name: 'וילות' },
    { id: 'zimmer', name: 'צימרים' },
    { id: 'apartment', name: 'דירות' },
    { id: 'hotel', name: 'בוטיק' },
    { id: 'event', name: 'אירועים' },
  ];

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .eq('status', 'active');

        if (error) throw error;

        const sorted = (data || []).sort((a: any, b: any) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });

        const transformed: Property[] = sorted.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: mapPropertyType(item.property_type),
          location: `${item.location?.city || item.location?.area || 'ישראל'}`,
          price: item.price_range || 'לפי פנייה',
          capacity: item.capacity || 2,
          rating: item.rating || 0,
          featured: item.featured || false,
          images: [item.images?.main, ...(item.images?.gallery || [])].filter(Boolean),
        }));

        setProperties(transformed);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  function mapPropertyType(type: string): string {
    const map: Record<string, string> = {
      'צימר': 'zimmer',
      'וילה': 'villa',
      'דירת נופש': 'apartment',
      'דירה': 'apartment',
      'מלון בוטיק': 'hotel',
      'בוטיק': 'hotel',
      'מתחם אירועים': 'event',
      'מתחם': 'event',
    };
    for (const [key, value] of Object.entries(map)) {
      if (type?.includes(key)) return value;
    }
    return 'zimmer';
  }

  const filteredProperties = selectedCategory === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900" dir="rtl">
      {/* Hero Video - Compact */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            className="w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/decirk3zb/video/upload/v1771101549/Gallery_zlvjwx.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-slate-900"></div>
        </div>

        {!videoLoaded && <div className="absolute inset-0 bg-slate-900 animate-pulse"></div>}

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-xs font-medium">{properties.length} נכסים יוקרתיים</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              חוויות נופש <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">בלתי נשכחות</span>
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">במיקומים הכי מבוקשים בישראל</p>
            <button 
              onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              גלה את הנכסים ↓
            </button>
          </div>
        </div>
      </section>

      {/* Categories - Compact */}
      <section id="properties" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {cat.name}
                {selectedCategory === cat.id && (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">{filteredProperties.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid - Compact Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProperties.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-white mb-2">לא נמצאו נכסים</h3>
              <p className="text-white/60">נסו קטגוריה אחרת</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProperties.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`} className="group">
                  <article className="relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20">
                    {/* Image - Compact */}
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={property.images[0] || '/placeholder.jpg'}
                        alt={property.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {property.featured && (
                        <div className="absolute top-2 right-2 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                          ⭐ מומלץ
                        </div>
                      )}

                      {property.rating > 0 && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {property.rating}
                        </div>
                      )}
                    </div>

                    {/* Content - Compact */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
                        {property.name}
                      </h3>
                      
                      <div className="flex items-center gap-1 text-white/60 mb-3 text-xs">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="truncate">{property.location}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>עד {property.capacity}</span>
                        </div>
                        
                        <div className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent truncate">
                          {property.price}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA - Compact */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">מוכנים לחוויה בלתי נשכחת?</h2>
          <p className="text-lg text-white/90 mb-8">צוות המומחים שלנו כאן כדי לעזור</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/972523983394"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link href="/contact" className="px-8 py-3 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all">
              טופס יצירת קשר
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
