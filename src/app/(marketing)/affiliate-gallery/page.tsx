/**
 * Affiliate Gallery Page
 */

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

    if (selectedArea !== 'הכל') {
      filtered = filtered.filter(p => p.location.area === selectedArea);
    }

    if (selectedType !== 'הכל') {
      filtered = filtered.filter(p => p.type === selectedType);
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.pricing.fromPrice - b.pricing.fromPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricing.fromPrice - a.pricing.fromPrice);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return filtered;
  }, [searchQuery, selectedArea, selectedType, sortBy]);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #00E0FF 0%, #A06BFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
            גלריית הנכסים היוקרתיים
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '30px' }}>
            מעל 50 נכסים מובחרים במיקומים הכי מבוקשים
          </p>

          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <Search style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={20} />
            <input
              type="text"
              placeholder="חפשו לפי שם או מיקום..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '15px 50px 15px 15px', borderRadius: '12px', border: '2px solid rgba(160, 107, 255, 0.3)', background: 'rgba(30, 41, 59, 0.8)', color: '#f1f5f9', fontSize: '1rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00E0FF' }}>
              <TrendingUp size={24} />
              <span>50+ נכסים</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFD700' }}>
              <Star size={24} />
              <span>דירוג 4.8</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A06BFF' }}>
              <Users size={24} />
              <span>1000+ לקוחות</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap', background: 'rgba(30, 41, 59, 0.6)', padding: '20px', borderRadius: '16px' }}>
          <select value={selectedArea} onChange={e => setSelectedArea(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '12px', borderRadius: '10px', border: '2px solid rgba(160, 107, 255, 0.3)', background: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9' }}>
            <option value="הכל">כל האזורים</option>
            <option value="צפון">צפון</option>
            <option value="מרכז">מרכז</option>
            <option value="דרום">דרום</option>
            <option value="ירושלים">ירושלים</option>
          </select>

          <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '12px', borderRadius: '10px', border: '2px solid rgba(160, 107, 255, 0.3)', background: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9' }}>
            <option value="הכל">כל הסוגים</option>
            <option value="צימר">צימר</option>
            <option value="וילה">וילה</option>
            <option value="דירת נופש">דירת נופש</option>
            <option value="מלון בוטיק">מלון בוטיק</option>
            <option value="מתחם אירועים">מתחם אירועים</option>
          </select>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: 1, minWidth: '150px', padding: '12px', borderRadius: '10px', border: '2px solid rgba(160, 107, 255, 0.3)', background: 'rgba(15, 23, 42, 0.8)', color: '#f1f5f9' }}>
            <option value="featured">מומלצים</option>
            <option value="price-low">מחיר: נמוך לגבוה</option>
            <option value="price-high">מחיר: גבוה לנמוך</option>
            <option value="rating">דירוג</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px', color: '#94a3b8' }}>
          נמצאו <strong style={{ color: '#00E0FF' }}>{filteredProperties.length}</strong> נכסים
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>לא נמצאו נכסים מתאימים</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedArea('הכל');
                setSelectedType('הכל');
              }}
              style={{ padding: '12px 30px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #00E0FF 0%, #A06BFF 100%)', color: 'white', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
            >
              אפס חיפוש
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: AffiliateProperty }) {
  return (
    
      href={property.affiliate.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '20px', overflow: 'hidden', transition: 'all 0.3s ease', border: '2px solid transparent', textDecoration: 'none' }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = '#00E0FF';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 224, 255, 0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'transparent';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {property.featured && (
        <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: 'white', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 1 }}>
          <Star size={16} fill="white" />
          מומלץ
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
          {property.amenities.featured.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              style={{ background: 'rgba(160, 107, 255, 0.2)', color: '#A06BFF', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}
            >
              {amenity}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{property.rating}</span>
            {property.reviewsCount && (
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({property.reviewsCount})</span>
            )}
          </div>

          <div style={{ textAlign: 'left' }}>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>מ-</span>
            <span style={{ color: '#00E0FF', fontSize: '1.3rem', fontWeight: '700' }}>₪{property.pricing.fromPrice}</span>
            <span style={{ color: '#64748b', fontSize: '0.85rem' }}>/לילה</span>
          </div>
        </div>
      </div>
    </a>
  );
}
