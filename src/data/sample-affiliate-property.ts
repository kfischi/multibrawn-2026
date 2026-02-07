/**
 * Sample Data - Tzimer Sigal
 */
import { AffiliateProperty } from '@/types/affiliate-property';

export const tzimerSigal: AffiliateProperty = {
  id: 'tzimer-sigal-galil',
  name: 'צימר סיגל',
  originalName: 'צימר סיגל',
  displayName: 'וילת הגליל - חוויה רומנטית במרומי הגליל',
  slug: 'vilat-hagalil-romantic-getaway',
  
  location: {
    city: 'רמות נפתלי',
    area: 'צפון',
    region: 'גליל עליון',
    address: 'רמות נפתלי, גליל עליון',
  },
  
  propertyType: 'צימר',
  type: 'צימר',
  capacity: { min: 2, max: 4, bedrooms: 1, bathrooms: 1 },
  
  images: {
    main: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/tzimer-sigal/main.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/tzimer-sigal/bedroom.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/tzimer-sigal/jacuzzi.jpg',
    ],
  },
  
  shortDescription: 'צימר רומנטי במרומי הגליל עם ג\'קוזי פרטי ונוף עוצר נשימה',
  fullDescription: 'ברוכים הבאים לוילת הגליל! צימר יוקרתי עם ג\'קוזי, נוף מדהים וחוויה בלתי נשכחת.',
  highlights: [
    'ג\'קוזי פרטי מול הנוף',
    'מיטה זוגית king size',
    'מרפסת עם פינת ישיבה',
  ],
  
  amenities: {
    featured: ['ג\'קוזי פרטי', 'נוף פנורמי', 'WiFi', 'חניה'],
    all: ['ג\'קוזי', 'מטבחון', 'מזגן', 'WiFi', 'טלוויזיה', 'חניה'],
  },
  
  pricing: {
    range: '₪800-1,200',
    fromPrice: 800,
    currency: 'ILS',
  },
  
  affiliate: {
    provider: 'tzimer360',
    originalUrl: 'https://www.tzimer360.co.il/Location/C4645',
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4645?t=affiliate26',
    trackingCode: 'affiliate26',
  },
  
  areaInfo: {
    activities: {
      hiking: ['נחל עיון', 'הר מירון'],
      sites: ['מצודת נמרוד', 'בניאס'],
      nature: ['שמורת חולה', 'כנרת'],
    },
    accessibility: {
      distance: '2.5 שעות מתל אביב',
      parking: true,
      publicTransport: false,
    },
  },
  
  seo: {
    title: 'וילת הגליל - צימר רומנטי | MULTIBRAWN',
    description: 'צימר בוטיק יוקרתי עם ג\'קוזי ונוף במרומי הגליל',
    keywords: ['צימר בגליל', 'צימר רומנטי', 'ג\'קוזי'],
    ogImage: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/tzimer-sigal/og.jpg',
  },
  
  featured: true,
  premium: true,
  rating: 4.9,
  reviewsCount: 127,
  status: 'active',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
};
