import { client, urlFor, fetchQuery } from '@/utils/sanity-client';

// Mock the sanity client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    fetch: jest.fn(),
  })),
}));

// Mock image url builder
jest.mock('@sanity/image-url', () => {
  return () => ({
    image: (source: any) => ({
      url: () => `https://cdn.sanity.io/${source}`,
    }),
  });
});

describe('Sanity Client Utils', () => {
  describe('urlFor', () => {
    it('generates an image url', () => {
      const result = urlFor('image-ref');
      expect(result.url()).toBe('https://cdn.sanity.io/image-ref');
    });
  });

  describe('fetchQuery', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('fetches data if not in cache', async () => {
      const mockData = { result: 'data' };
      (client.fetch as jest.Mock).mockResolvedValue(mockData);

      const data = await fetchQuery('*[_type == "post"]', {}, 60);
      
      expect(client.fetch).toHaveBeenCalledWith('*[_type == "post"]', {});
      expect(data).toEqual(mockData);
    });

    it('returns cached data if available and fresh', async () => {
      const mockData = { result: 'cached' };
      (client.fetch as jest.Mock).mockResolvedValue(mockData);

      // First call to seed cache
      await fetchQuery('query1', {}, 60);
      
      // Second call should not invoke fetch
      (client.fetch as jest.Mock).mockClear();
      const data = await fetchQuery('query1', {}, 60);

      expect(client.fetch).not.toHaveBeenCalled();
      expect(data).toEqual(mockData);
    });

    it('refetches if cache is stale', async () => {
      const mockData = { result: 'fresh' };
      (client.fetch as jest.Mock).mockResolvedValue(mockData);
      
      const now = Date.now();
      jest.spyOn(Date, 'now').mockReturnValue(now);
      
      // Seed cache
      await fetchQuery('query2', {}, 1); // 1 second TTL

      // Advance time beyond TTL
      jest.spyOn(Date, 'now').mockReturnValue(now + 2000);

      const data = await fetchQuery('query2', {}, 1);
      
      expect(client.fetch).toHaveBeenCalledTimes(2);
      expect(data).toEqual(mockData);
    });
    
    it('handles fetch errors gracefully in caching logic', async () => {
       const mockError = new Error('Fetch failed');
       (client.fetch as jest.Mock).mockRejectedValueOnce(mockError);
       
       await expect(fetchQuery('error-query')).rejects.toThrow('Fetch failed');
    });
  });
});