import { defineField, defineType } from 'sanity';

export const property = defineType({
  name: 'property',
  title: 'נכסים',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'שם הנכס',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'type',
      title: 'סוג נכס',
      type: 'string',
      options: {
        list: [
          { title: 'צימר', value: 'zimmer' },
          { title: 'וילה', value: 'villa' },
          { title: 'מתחם אירועים', value: 'events' },
          { title: 'שבת חתן', value: 'shabbat_hatan' },
          { title: 'בינלאומי', value: 'international' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'מיקום / אזור',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'תיאור',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'כתובת תמונה חיצונית',
      type: 'url',
    }),
    defineField({
      name: 'images',
      title: 'גלריית תמונות',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'pricePerNight',
      title: 'מחיר ללילה (₪)',
      type: 'number',
    }),
    defineField({
      name: 'guests',
      title: 'מקסימום אורחים',
      type: 'number',
    }),
    defineField({
      name: 'features',
      title: 'מאפיינים',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'בריכה', 'ג\'קוזי', 'כשר', 'מרחק מהים', 'חצר פרטית',
          'WiFi', 'מיזוג', 'חניה', 'מעלית', 'נגיש לנכים',
        ],
      },
    }),
    defineField({
      name: 'whatsappText',
      title: 'טקסט WhatsApp',
      type: 'string',
      description: 'הטקסט שיישלח ב-WhatsApp כשלוחצים "צור קשר"',
    }),
    defineField({
      name: 'active',
      title: 'פעיל באתר',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'location', media: 'mainImage' },
  },
});
