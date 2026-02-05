'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { tzimerSigal } from '@/data/sample-affiliate-property';
import { AffiliateProperty } from '@/types/affiliate-property';

const sampleProperties: AffiliateProperty[] = [tzimerSigal];

export default function AffiliateGalleryPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '40px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px', color: '#00E0FF', textAlign: 'center' }}>
          גלריית נכסים יוקרתיים
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
          {sampleProperties.map(property => (
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
        textDecoration: 'none',
        color: 'inherit'
      }}
    >
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
          <span>{property.location.city}</span>
        </div>
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '15px' }}>
          {property.shortDescription.slice(0, 100)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span style={{ color: '#f1f5f9' }}>{property.rating}</span>
          </div>
          <div>
            <span style={{ color: '#00E0FF', fontSize: '1.3rem', fontWeight: '700' }}>₪{property.pricing.fromPrice}</span>
            <span style={{ color: '#64748b' }}> /לילה</span>
          </div>
        </div>
      </div>
    </a>
  );
}
