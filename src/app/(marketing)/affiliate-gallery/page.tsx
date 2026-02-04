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
