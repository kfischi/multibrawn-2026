'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function PropertyPage() {
  const params = useParams();
  const id = params?.id;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      if (!id) return;

      // משיכת הנתונים מהמסד לפי ה-ID
      const { data, error } = await supabase
        .from('affiliate_properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
      } else {
        setProperty(data);
      }
      setLoading(false);
    }

    fetchProperty();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">טוען פרטי נכס... ⏳</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center text-xl text-red-500 font-bold">הנכס לא נמצא או הוסר. ❌</div>;

  // הכנת נתונים לתצוגה בצורה בטוחה
  const features = property.features || ['wifi', 'pool', 'parking'];
  const description = property.description || 'אין תיאור זמין לנכס זה.';
  const location = property.location?.city || property.location || 'מיקום לא צוין';
  const price = property.price ? `₪${property.price}` : 'צור קשר';
  
  // חילוץ תמונה ראשית (תומך בכל הפורמטים)
  let mainImage = 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg';
  if (property.images) {
      if (typeof property.images === 'object' && property.images.main) {
          mainImage = property.images.main;
      } else if (Array.isArray(property.images) && property.images.length > 0) {
          mainImage = property.images[0];
      } else if (typeof property.images === 'string') {
          mainImage = property.images;
      }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      
      {/* תמונה ראשית (Hero) */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-gray-200">
        <img 
          src={mainImage} 
          alt={property.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-10 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 shadow-sm">{property.name}</h1>
            <div className="flex items-center gap-2 text-xl opacity-90 font-medium">
              📍 {location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* עמודה ימנית: פרטים ותיאור */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">אודות המקום</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
              {description}
            </p>
            
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">מה במתחם?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {features.map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
                    <span>✨</span>
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* עמודה שמאלית: כרטיס הזמנה צף */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-24 border border-blue-50">
            <div className="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
              <div>
                <span className="text-gray-500 text-sm">מחיר ללילה החל מ-</span>
                <div className="text-3xl font-bold text-blue-600">
                   {price}
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 font-bold border border-yellow-100 shadow-sm">
                ⭐ {property.rating || 5}
              </div>
            </div>

            {/* הכפתור הקריטי - קישור שותף */}
            {property.affiliate_url ? (
              <a 
                href={property.affiliate_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-black hover:bg-gray-800 text-white text-center font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg mb-4 transform hover:-translate-y-1"
              >
                בדיקת זמינות והזמנה ↗
                <span className="block text-xs font-normal opacity-70 mt-1">(מעבר לאתר הספק)</span>
              </a>
            ) : (
              <button disabled className="block w-full bg-gray-100 text-gray-400 font-bold py-4 rounded-xl cursor-not-allowed mb-4 border border-gray-200">
                הזמנה לא זמינה כעת
              </button>
            )}

            <div className="text-center mt-4">
                <Link href="/gallery" className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                    ← חזרה לגלריה
                </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
