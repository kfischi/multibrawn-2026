import Script from 'next/script';

interface SchemaProps {
  type: 'organization' | 'breadcrumb' | 'faq' | 'product' | 'event' | 'article' | 'localBusiness';
  data?: any;
}

export default function SchemaMarkup({ type, data }: SchemaProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'MULTIBRAWN',
          alternateName: 'מולטיבראון',
          url: 'https://multibrawn.co.il',
          logo: 'https://multibrawn.co.il/logo-multibrawn.png',
          description: 'MULTIBRAWN - צימרים, וילות ומתחמי אירועים מובחרים בכל הארץ. 9+ שנות ניסיון במציאת המקום המושלם לחופשה ולאירועים מיוחדים',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+972-52-398-3394',
            contactType: 'customer service',
            areaServed: 'IL',
            availableLanguage: ['he', 'en'],
            contactOption: 'TollFree',
          },
          sameAs: [
            'https://www.facebook.com/multibrawn',
            'https://www.instagram.com/multibrawn',
            'https://www.youtube.com/@multibrawn',
            'https://www.tiktok.com/@multibrawn',
            'https://wa.me/972523983394',
          ],
          foundingDate: '2015',
          numberOfEmployees: {
            '@type': 'QuantitativeValue',
            value: '5-10',
          },
          slogan: 'המקום המושלם לחופשה - בראש שקט',
        };

      case 'localBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'MULTIBRAWN - מולטיבראון',
          image: 'https://multibrawn.co.il/logo-multibrawn.png',
          '@id': 'https://multibrawn.co.il',
          url: 'https://multibrawn.co.il',
          telephone: '+972523983394',
          priceRange: '₪₪-₪₪₪₪',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IL',
            addressRegion: 'Israel',
            addressLocality: 'Tel Aviv',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 32.0853,
            longitude: 34.7818,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
              opens: '09:00',
              closes: '18:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: 'Friday',
              opens: '09:00',
              closes: '14:00',
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '500',
            bestRating: '5',
            worstRating: '1',
          },
          paymentAccepted: 'Cash, Credit Card, Bank Transfer',
          currenciesAccepted: 'ILS',
          areaServed: ['IL'],
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: 31.5,
              longitude: 34.8,
            },
            geoRadius: '200000',
          },
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })) || [],
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.questions?.map((q: any) => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer,
            },
          })) || [],
        };

      case 'product':
        return {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: data?.name || '',
          image: data?.images || [],
          description: data?.description || '',
          brand: {
            '@type': 'Brand',
            name: 'MULTIBRAWN',
          },
          offers: {
            '@type': 'Offer',
            url: data?.url || '',
            priceCurrency: 'ILS',
            price: data?.price || '',
            priceValidUntil: '2025-12-31',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: 'MULTIBRAWN',
            },
          },
          aggregateRating: data?.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating.value,
            reviewCount: data.rating.count,
            bestRating: '5',
            worstRating: '1',
          } : undefined,
        };

      case 'event':
        return {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: data?.name || '',
          description: data?.description || '',
          image: data?.image || '',
          startDate: data?.startDate || '',
          endDate: data?.endDate || '',
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: data?.locationName || '',
            address: {
              '@type': 'PostalAddress',
              addressLocality: data?.city || '',
              addressCountry: 'IL',
            },
          },
          organizer: {
            '@type': 'Organization',
            name: 'MULTIBRAWN',
            url: 'https://multibrawn.co.il',
          },
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title || '',
          description: data?.description || '',
          image: data?.image || '',
          author: {
            '@type': 'Organization',
            name: 'MULTIBRAWN',
          },
          publisher: {
            '@type': 'Organization',
            name: 'MULTIBRAWN',
            logo: {
              '@type': 'ImageObject',
              url: 'https://multibrawn.co.il/logo-multibrawn.png',
            },
          },
          datePublished: data?.datePublished || '',
          dateModified: data?.dateModified || '',
        };

      default:
        return null;
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

// Helper component for multiple schemas
export function SchemaMarkupMultiple({ schemas }: { schemas: SchemaProps[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaMarkup key={`schema-${index}`} {...schema} />
      ))}
    </>
  );
}
