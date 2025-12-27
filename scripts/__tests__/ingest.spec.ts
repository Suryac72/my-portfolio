import fs from 'fs';

// Mock dependencies
jest.mock('dotenv', () => ({ config: jest.fn() }));

// 1. Single, correct mock for @sanity/client
jest.mock('@sanity/client', () => ({
  createClient: jest.fn(() => ({
    // Return mock data so the script doesn't throw "No data found"
    fetch: jest.fn().mockResolvedValue({ 
      bio: 'test bio', 
      resumeUrl: 'http://resume.pdf' 
    }),
  })),
}));

jest.mock('fs', () => ({
  createWriteStream: jest.fn(),
  unlinkSync: jest.fn(),
}));

jest.mock('stream/promises', () => ({ pipeline: jest.fn() }));

jest.mock('@langchain/community/document_loaders/fs/pdf', () => ({
  PDFLoader: jest.fn(() => ({
    load: jest.fn().mockResolvedValue([{ pageContent: 'PDF Content', metadata: {} }]),
  })),
}));

jest.mock('@langchain/textsplitters', () => ({
  RecursiveCharacterTextSplitter: jest.fn(() => ({
    splitDocuments: jest.fn().mockResolvedValue([]),
  })),
}));

jest.mock('@pinecone-database/pinecone', () => ({
  Pinecone: jest.fn(() => ({
    Index: jest.fn(),
  })),
}));

jest.mock('@langchain/pinecone', () => ({
  PineconeStore: {
    fromDocuments: jest.fn(),
  },
}));

jest.mock('@/utils/embeddings', () => ({
  getEmbeddings: jest.fn(),
}));

describe('Ingest Script', () => {
  it('executes without error', async () => {
    // 2. Mock Global Fetch with a real ReadableStream
    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('PDF CONTENT'));
        controller.close();
      }
    });

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      body: mockStream,
    });

    // 3. Run execution and checks inside isolateModules
    jest.isolateModules(() => {
        // Require the script to trigger execution
        require('@/scripts/ingest');
        
        // Require the mock *inside* the isolation to get the same instance used by the script
        const { createClient } = require('@sanity/client');
        
        // Now this expectation will pass
        expect(createClient).toHaveBeenCalled();
    });
  });
});