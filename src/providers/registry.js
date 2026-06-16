/**
 * Provider Registry
 *
 * Untuk menambah provider baru:
 * 1. Import provider class dari file-nya
 * 2. Tambahkan instance ke PROVIDERS array
 * Selesai! UI akan otomatis menampilkan provider baru.
 */

import { DeepSeekProvider } from './deepseek.js';
import { GeminiProvider } from './gemini.js';

// ── Register all providers here ──
const PROVIDERS = [
  new DeepSeekProvider(),
  new GeminiProvider(),
  // Tambah provider baru di sini:
  // new OpenAIProvider(),
  // new ClaudeProvider(),
];

const providerMap = new Map(PROVIDERS.map((p) => [p.id, p]));

/**
 * Get a provider by its ID.
 * @param {string} id
 * @returns {import('./base.js').BaseProvider}
 */
export function getProvider(id) {
  return providerMap.get(id) || PROVIDERS[0];
}

/**
 * Get the list of all registered providers (for UI rendering).
 * @returns {Array<import('./base.js').BaseProvider>}
 */
export function getProviderList() {
  return PROVIDERS;
}

/**
 * Get the default provider.
 * @returns {import('./base.js').BaseProvider}
 */
export function getDefaultProvider() {
  return PROVIDERS[0];
}
