import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { blogPost } from './schemas/blogPost';
import { property } from './schemas/property';
import { destination } from './schemas/destination';

export default defineConfig({
  name: 'multibrawn',
  title: 'MULTIBRAWN — ניהול תוכן',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('ניהול תוכן')
          .items([
            S.listItem()
              .title('📝 כתבות בלוג')
              .id('blogPost')
              .child(S.documentTypeList('blogPost').title('כתבות')),
            S.listItem()
              .title('🏠 נכסים')
              .id('property')
              .child(S.documentTypeList('property').title('נכסים')),
            S.listItem()
              .title('🌍 יעדים בינלאומיים')
              .id('destination')
              .child(S.documentTypeList('destination').title('יעדים')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [blogPost, property, destination],
  },
});
