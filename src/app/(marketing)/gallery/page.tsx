'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

// Types
interface Property {
  id: string;
  name: string;
  description: string;
  property_type: string;
  capacity: number | { min?: number; max?: number };
  location: {
    city: string;
    area: string;
    region?: string;
  };
  images: string[] | { main: string; gallery: string[] };
  price_range?: string;
  rating?: number;
  features?: string[];
  affiliate: {
    affiliateUrl: string;
    provider: string;
  };
}

// Helper: Convert images to array format
function getImagesArray(images: Property['images']): string[] {
  if (Array.isArray(images)) {
    return images.filter(Boolean);
  }
  if (images && typeof images === 'object') {
    const main = images.main || '';
    const gallery = images.gallery || [];
    return [main, ...gallery].filter(Boolean);
  }
  return [];
}

// Helper: Get capacity string
function getCapacityString(capacity: Property['capacity']): string {
  if (typeof capacity === 'number') {
    return `עד ${capacity} אורחים`;
  }
  if (capacity && typeof capacity === 'object') {
    if (capacity.max) return `עד ${capacity.max} אורחים`;
    if (capacity.min) return `מ-${capacity.min} אורחים`;
  }
  return 'קיבולת לא צוינה';
}

// Property Card Component
function PropertyCard({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = getImagesArray(property.images);
  const hasMultipleImages = images.length > 1;

  // Auto-rotate images on hover
  useEffect(() => {
    if (!isHovered || !hasMultipleImages) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isHovered, images.length, hasMultipleImages]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentImageIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const mainImage = images[currentImageIndex] || '/images/placeholder.jpg';
  const location = typeof property.location === 'string' 
    ? property.location 
    : property.location?.city || property.location?.area || 'ישראל';

  return (
    <div 
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className={styles.imageContainer}>
        <Image
          src={mainImage}
          alt={property.name}
          fill
          className={styles.cardImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
        
        {/* Gradient Overlay */}
        <div className={styles.imageGradient} />

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className={styles.imageCounter}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>{images.length}</span>
          </div>
        )}

        {/* Rating Badge */}
        {property.rating && (
          <div className={styles.ratingBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>{property.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Type Badge */}
        <div className={styles.typeBadge}>
          {property.property_type}
        </div>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{property.name}</h3>
          <div className={styles.cardLocation}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <p className={styles.cardDescription}>{property.description}</p>

        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>{getCapacityString(property.capacity)}</span>
          </div>
          {property.price_range && (
            <div className={styles.metaPrice}>
              {property.price_range}
            </div>
          )}
        </div>

        {/* Features Pills */}
        {property.features && property.features.length > 0 && (
          <div className={styles.features}>
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className={styles.featurePill}>
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className={styles.featurePill} style={{ background: 'rgba(160, 107, 255, 0.15)', color: '#A06BFF' }}>
                +{property.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <a
          href={property.affiliate.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
          onClick={(e) => e.stopPropagation()}
        >
          <span>צפה בנכס</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Hover Effect Shine */}
      <div className={styles.cardShine} />
    </div>
  );
}

// Main Gallery Component
export default function AffiliateGallery() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch properties
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const response = await fetch('/api/properties/affiliate');
        
        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }
        
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...properties];

    // Area filter
    if (selectedArea !== 'all') {
      filtered = filtered.filter(p => {
        const area = typeof p.location === 'string' ? p.location : p.location?.area;
        return area === selectedArea;
      });
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.property_type === selectedType);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        (typeof p.location === 'string' ? p.location : p.location?.city || '').toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  }, [selectedArea, selectedType, searchQuery, properties]);

  // Get unique areas and types
  const areas = ['all', ...new Set(properties.map(p => 
    typeof p.location === 'string' ? p.location : p.location?.area
  ).filter(Boolean))];
  
  const types = ['all', ...new Set(properties.map(p => p.property_type).filter(Boolean))];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <div className={styles.loaderRing}></div>
          <div className={styles.loaderRing}></div>
          <div className={styles.loaderRing}></div>
        </div>
        <p className={styles.loadingText}>טוען נכסים מדהימים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h2>שגיאה בטעינת הנכסים</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleGradient}>גלריית נכסים</span>
            <span className={styles.heroTitleWhite}>מובחרים</span>
          </h1>
          <p className={styles.heroSubtitle}>
            מבחר אקסקלוסיבי של {properties.length} צימרים, וילות ומתחמים יוקרתיים
          </p>
        </div>
        
        {/* Animated Background */}
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient1}></div>
          <div className={styles.heroGradient2}></div>
          <div className={styles.heroGradient3}></div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          {/* Search */}
          <div className={styles.searchBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="חפש נכס..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className={styles.filterSelect}
          >
            {areas.map(area => (
              <option key={area} value={area}>
                {area === 'all' ? 'כל האזורים' : area}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={styles.filterSelect}
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'כל הסוגים' : type}
              </option>
            ))}
          </select>

          {/* Results Count */}
          <div className={styles.resultsCount}>
            <span>{filteredProperties.length}</span> נכסים
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && !loading && (
        <div className={styles.emptyState}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <h3 className={styles.emptyTitle}>לא נמצאו נכסים</h3>
          <p className={styles.emptyText}>נסה לשנות את הפילטרים או החיפוש</p>
          <button
            onClick={() => {
              setSelectedArea('all');
              setSelectedType('all');
              setSearchQuery('');
            }}
            className={styles.resetButton}
          >
            אפס פילטרים
          </button>
        </div>
      )}
    </div>
  );
}
