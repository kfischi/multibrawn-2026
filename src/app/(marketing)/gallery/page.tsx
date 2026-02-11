'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '@/components/gallery/PropertyCard';
import styles from './Gallery.module.css';

// Type matching your Supabase structure
interface Property {
  id: string;
  name: string;
  description?: string;
  location?: string;
  price?: string | number;
  images?: any;
  rating?: number;
  property_type?: string;
  features?: string[];
  affiliate_url?: string;
}

export default function Gallery() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch properties from Supabase
  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
          throw new Error('Supabase configuration missing');
        }

        const response = await fetch(
          `${supabaseUrl}/rest/v1/affiliate_properties?select=*&status=eq.active&order=created_at.desc`,
          {
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch properties');
        }

        const data = await response.json();
        console.log(`✅ Loaded ${data.length} properties`);
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

    // Area filter (location field)
    if (selectedArea !== 'all') {
      filtered = filtered.filter(p => p.location === selectedArea);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.property_type === selectedType);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.location?.toLowerCase().includes(query)
      );
    }

    setFilteredProperties(filtered);
  }, [selectedArea, selectedType, searchQuery, properties]);

  // Get unique areas and types
  const areas = ['all', ...new Set(properties.map(p => p.location).filter(Boolean))];
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

      {/* Properties Grid - Using YOUR PropertyCard */}
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
