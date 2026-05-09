import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'multibrawn',
  title: 'MULTIBRAWN — ניהול תוכן',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('ניהול תוכן')
          .items([
            S.listItem()
              .title('כתבות בלוג')
              .id('blogPost')
              .child(S.documentTypeList('blogPost').title('כתבות')),
            S.listItem()
              .title('נכסים')
              .id('property')
              .child(S.documentTypeList('property').title('נכסים')),
            S.listItem()
              .title('יעדים בינלאומיים')
              .id('destination')
              .child(S.documentTypeList('destination').title('יעדים')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  i18n: {
    defaultLocale: 'he',
  },
});
