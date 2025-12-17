import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'tub1piag', 
  dataset: 'production', 
  apiVersion: '2024-07-27',
  useCdn: true, 
});

const builder = imageUrlBuilder(client);

export function urlFor(source : any) {
  return builder.image(source);
}

// Simple in-memory cache for server-side fetches (works during Node process lifetime)
const _cache = new Map<string, { ts: number; data: any }>();

/**
 * Fetch a GROQ query from Sanity with a short in-memory cache TTL.
 * Use this for server-side fetches (getStaticProps/getServerSideProps).
 */
export async function fetchQuery(query: string, params?: Record<string, any>, ttlSeconds = 60) {
  const key = query + JSON.stringify(params || {});
  const now = Date.now();

  const cached = _cache.get(key);
  if (cached && now - cached.ts < ttlSeconds * 1000) {
    return cached.data;
  }

  const data = await client.fetch(query, params);
  try {
    _cache.set(key, { ts: now, data });
  } catch (e) {
    // ignore cache errors
  }
  return data;
}