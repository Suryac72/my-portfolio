// jest.setup.ts
import '@testing-library/jest-dom';

// 1. Mock IntersectionObserver
class IntersectionObserverMock {
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
}

window.IntersectionObserver = IntersectionObserverMock as any;
global.IntersectionObserver = IntersectionObserverMock as any;

// 2. Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 3. Mock global fetch
global.fetch = jest.fn() as unknown as typeof fetch;

// 4. Mock process.env
process.env = {
  ...process.env,
  GROQ_API_KEY: "groq_test_key",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "test-project-id", 
  NEXT_PUBLIC_SANITY_DATASET: "test-dataset",
  PINECONE_API_KEY: "pinecone_test_key",
  PINECONE_INDEX: "test_index",
  GROQ_MODEL_NAME: "llama-3.1-8b-instant",
  HUGGINEFACEHUB_API_KEY: "hf_test_key",
};