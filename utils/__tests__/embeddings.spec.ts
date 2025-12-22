import { getEmbeddings } from '@/utils/embeddings';
import { PineconeEmbeddings } from "@langchain/pinecone";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

// Mock the dependencies
jest.mock("@langchain/pinecone");
jest.mock("@langchain/community/embeddings/huggingface_transformers");

describe('getEmbeddings', () => {
  // Store original environment
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('returns PineconeEmbeddings in production', () => {
    // FIX: Set NODE_ENV specifically for this test
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'production',
      writable: true
    });
    process.env.PINECONE_API_KEY = 'test-key';
    
    getEmbeddings();
    
    expect(PineconeEmbeddings).toHaveBeenCalledWith({
      apiKey: 'test-key',
      model: "multilingual-e5-large",
    });
  });

  it('returns HuggingFaceTransformersEmbeddings in non-production', () => {
    // FIX: Set NODE_ENV to development
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true
    });
    
    getEmbeddings();
    
    expect(HuggingFaceTransformersEmbeddings).toHaveBeenCalledWith({
      model: "Xenova/bge-large-en-v1.5",
    });
  });
});