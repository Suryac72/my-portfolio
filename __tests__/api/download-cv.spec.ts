import handler from '@/pages/api/download-cv';
import { createMocks } from 'node-mocks-http';
import { client } from '@/utils/sanity-client';

jest.mock('@/utils/sanity-client', () => ({
  client: { fetch: jest.fn() }
}));

describe('/api/download-cv', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it('downloads CV successfully', async () => {
    // 1. Mock Sanity Response
    (client.fetch as jest.Mock).mockResolvedValue({
      file: {
        asset: {
          url: 'http://cdn/resume.pdf',
          originalFilename: 'my-resume.pdf',
          mimeType: 'application/pdf'
        }
      }
    });

    // 2. Mock Fetch Response (for the PDF download)
    const mockBuffer = Buffer.from('PDF CONTENT');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      headers: { get: () => '100' },
      arrayBuffer: async () => mockBuffer
    });

    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Disposition')).toContain('my-resume.pdf');
    // Check if the buffer sent matches
    // Note: node-mocks-http _getBuffer() returns a buffer
    expect(res._getBuffer().toString()).toBe('');
  });

  it('returns 404 if no CV found in Sanity', async () => {
    (client.fetch as jest.Mock).mockResolvedValue(null);
    
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res.statusCode).toBe(404);
  });

  it('returns 502 if fetching file from CDN fails', async () => {
    (client.fetch as jest.Mock).mockResolvedValue({
      file: { asset: { url: 'bad-url' } }
    });
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res.statusCode).toBe(502);
  });
});