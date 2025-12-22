// 1. Groq SDK Shim - Must run before environment is fully active
require('groq-sdk/shims/node');

// 2. TextEncoder/TextDecoder Polyfill
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextEncoder, TextDecoder });

// 3. ReadableStream Polyfill
const { ReadableStream } = require('stream/web');
Object.assign(global, { ReadableStream });

// 4. Ensure Fetch API globals are available
if (typeof global.Request === 'undefined') {
  // Manually attach if the shim didn't fully propagate to global
  const { Request, Response, Headers, fetch } = require('groq-sdk/shims/node');
  Object.assign(global, { Request, Response, Headers, fetch });
}