'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import PropertyCard from '@/components/gallery/PropertyCard';

// הגדרות חיבור ל-Supabase (הפרטים שלך כבר בפנים)
const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Property {
  id: string;
  name: string;
  location: string;
  price: string | number;
  images: any;
  rating: number;
  property_type?: string;
}

export default function AffiliateGallery() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      const { data, error } = await supabase
        .from('affiliate_properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProperties(data);
      }
      setLoading(false);
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4" dir="rtl">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
