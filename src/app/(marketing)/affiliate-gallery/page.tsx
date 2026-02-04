# מחק את הקובץ הישן
rm src/app/\(marketing\)/affiliate-gallery/page.tsx

# צור קובץ חדש עם התוכן המתוקן
cat > src/app/\(marketing\)/affiliate-gallery/page.tsx << 'ENDOFFILE'
/**
 * Affiliate Gallery Page
 */

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, MapPin, Star, TrendingUp, Users } from 'lucide-react';
import { tzimerSigal } from '@/data/sample-affiliate-property';
import { AffiliateProperty } from '@/types/affiliate-property';

const sampleProperties: AffiliateProperty[] = [tzimerSigal];

export default function AffiliateGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('הכל');
  const [selectedType, setSelectedType] = useState<string>('הכל');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filteredProperties = useMemo(() => {
    let filtered = [...sampleProperties];
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedArea !== 'הכל') filtered = filtered.filter(p => p.location.area === selectedArea);
    if (selectedType !== 'הכל') filtered = filtered.filter(p => p.type === selectedType);
    return filtered;
  }, [searchQuery, selectedArea, selectedType, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', color: '#00E0FF' }}>
            גלריית הנכסים היוקרתיים
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: AffiliateProperty }) {
  return (
    
      href={property.affiliate.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
      {property.featured && (
        <div style={{ position: 'absolute', top: '15px', right: '15px', background: '#FFD700', color: 'white', padding: '8px 16px', borderRadius: '8px', zIndex: 1 }}>
          ⭐ מומלץ
        </div>
      )}

      <div style={{ position: 'relative', width: '100%', height: '250px' }}>
        <Image
          src={property.images.main}
          alt={property.displayName}
          fill
          sizes="350px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#00E0FF', marginBottom: '10px' }}>
          {property.displayName}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginBottom: '12px' }}>
          <MapPin size={16} />
          <span>{property.location.city}, {property.location.area}</span>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '15px' }}>
          {property.shortDescription.slice(0, 100)}...
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{property.rating}</span>
          </div>

          <div>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>מ-</span>
            <span style={{ color: '#00E0FF', fontSize: '1.3rem', fontWeight: '700' }}>₪{property.pricing.fromPrice}</span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/לילה</span>
          </div>
        </div>
      </div>
    </a>
  );
}
ENDOFFILE

echo "✅ הקובץ נוצר מחדש!"
