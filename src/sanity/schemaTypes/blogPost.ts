import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'כתבות בלוג',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'כותרת',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (כתובת URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'תקציר קצר',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'מדריכים', value: 'מדריכים' },
          { title: 'טיפים', value: 'טיפים' },
          { title: 'יעדים', value: 'יעדים' },
          { title: 'אירועים', value: 'אירועים' },
          { title: 'חו"ל', value: 'חו"ל' },
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'תמונת שער',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'כתובת תמונה חיצונית (Cloudinary/Unsplash)',
      type: 'url',
      description: 'אם לא העלית תמונה, ניתן להדביק כתובת URL',
    }),
    defineField({
      name: 'publishedAt',
      title: 'תאריך פרסום',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'תוכן המאמר',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'רגיל', value: 'normal' },
            { title: 'כותרת 1', value: 'h1' },
            { title: 'כותרת 2', value: 'h2' },
            { title: 'כותרת 3', value: 'h3' },
            { title: 'ציטוט', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});
