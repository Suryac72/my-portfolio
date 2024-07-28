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