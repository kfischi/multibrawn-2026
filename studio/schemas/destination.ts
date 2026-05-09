import { defineField, defineType } from 'sanity';

export const destination = defineType({
  name: 'destination',
  title: 'יעדים בינלאומיים',
  type: 'document',
  fields: [
    defineField({
      name: 'country',
      title: 'מדינה',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'country', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'דגל (אמוג\'י)',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'כותרת ראשית',
      type: 'string',
    }),
    defineField({
      name: 'subHeadline',
      title: 'כותרת משנה',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'תמונת Hero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'כתובת תמונה חיצונית',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'תיאור (פסקאות)',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'highlights',
      title: 'נקודות בולטות',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bestFor',
      title: 'מתאים ל...',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'priceRange',
      title: 'טווח מחירים',
      type: 'string',
    }),
    defineField({
      name: 'active',
      title: 'מוצג באתר',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'country', subtitle: 'headline', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
