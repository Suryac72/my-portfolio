import handler from '@/pages/api/chat';
import { createMocks } from 'node-mocks-http';
 

// 1. Mock the Pinecone SDK to prevent "browser context" warnings/errors
jest.mock('@pinecone-database/pinecone', () => ({
  Pinecone: jest.fn().mockImplementation(() => ({
    Index: jest.fn().mockReturnValue({}), 
  })),
}));

// Mock chains
jest.mock('@langchain/pinecone');
jest.mock('@langchain/groq');
jest.mock('@langchain/core/runnables', () => ({
  RunnableSequence: {
    from: jest.fn(() => ({
      invoke: jest.fn().mockResolvedValue('AI Response'),
    })),
  },
}));

describe('/api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(405);
  });

  it('returns 400 if message is missing', async () => {
    const { req, res } = createMocks({ method: 'POST', body: {} });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(400);
  });

  it('returns 200 and response on success', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello' },
    });

    // Mock VectorStore implementation
    const { PineconeStore } = require('@langchain/pinecone');
    PineconeStore.fromExistingIndex.mockResolvedValue({
      similaritySearch: jest.fn().mockResolvedValue([
        { pageContent: 'Context', metadata: { source: 'bio' } }
      ]),
    });

    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({
      text: 'AI Response',
      sources: ['bio'],
    });
  });
});