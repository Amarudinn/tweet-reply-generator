/**
 * BaseProvider — kontrak dasar untuk semua AI provider.
 *
 * Untuk menambah provider baru:
 * 1. Buat file baru di src/providers/
 * 2. Export class yang extends BaseProvider
 * 3. Implement semua method yang di-throw di sini
 * 4. Register di registry.js
 */
export class BaseProvider {
  /** @returns {string} Unique identifier, e.g. 'deepseek' */
  get id() {
    throw new Error('Provider must implement get id()');
  }

  /** @returns {string} Display name, e.g. 'DeepSeek' */
  get name() {
    throw new Error('Provider must implement get name()');
  }

  /** @returns {string} Emoji/icon for UI */
  get icon() {
    throw new Error('Provider must implement get icon()');
  }

  /** @returns {string} Placeholder text for API key input */
  get apiKeyPlaceholder() {
    return 'Paste your API key...';
  }

  /** @returns {string} URL to get API key */
  get helpUrl() {
    throw new Error('Provider must implement get helpUrl()');
  }

  /** @returns {string} Display label for helpUrl link */
  get helpUrlLabel() {
    return this.helpUrl;
  }

  /**
   * Steps to obtain API key.
   * @returns {Array<string|{text: string, bold?: string, link?: {url: string, label: string}}>}
   */
  get helpSteps() {
    return [];
  }

  /**
   * Available models for this provider.
   * If only 1 model, the model selector won't be shown.
   * @returns {Array<{value: string, label: string}>}
   */
  get models() {
    return [];
  }

  /** @returns {string} Default model value */
  get defaultModel() {
    return this.models[0]?.value || '';
  }

  /**
   * Generate reply using this provider's API.
   * @param {string} tweetText — the tweet to reply to
   * @param {string} apiKey — user's API key for this provider
   * @param {object} options — { language, temperature, replyCount, theme, model, systemPrompt }
   * @returns {Promise<string>} raw AI response text
   */
  async generateReply(tweetText, apiKey, options = {}) {
    throw new Error('Provider must implement generateReply()');
  }
}
