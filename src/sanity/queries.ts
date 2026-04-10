import { client } from './client';

// ── Blog Posts ──────────────────────────────────────────────

export async function getAllBlogPosts() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      coverImageUrl,
      "coverImage": coverImage.asset->url,
      publishedAt
    }
  `);
}

export async function getBlogPostBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return client.fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      coverImageUrl,
      "coverImage": coverImage.asset->url,
      publishedAt,
      body
    }
  `, { slug });
}

// ── Properties ──────────────────────────────────────────────

export async function getAllProperties() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  return client.fetch(`
    *[_type == "property" && active == true] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      type,
      location,
      description,
      mainImageUrl,
      "mainImage": mainImage.asset->url,
      pricePerNight,
      guests,
      features,
      whatsappText
    }
  `);
}

// ── Destinations ────────────────────────────────────────────

export async function getAllDestinations() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return [];
  return client.fetch(`
    *[_type == "destination" && active == true] | order(country asc) {
      _id,
      country,
      "slug": slug.current,
      flag,
      headline,
      subHeadline,
      heroImageUrl,
      "heroImage": heroImage.asset->url,
      description,
      highlights,
      bestFor,
      priceRange
    }
  `);
}

export async function getDestinationBySlug(slug: string) {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return null;
  return client.fetch(`
    *[_type == "destination" && slug.current == $slug][0] {
      _id,
      country,
      "slug": slug.current,
      flag,
      headline,
      subHeadline,
      heroImageUrl,
      "heroImage": heroImage.asset->url,
      description,
      highlights,
      bestFor,
      priceRange
    }
  `, { slug });
}
