import { BaseProvider } from './base.js';

export class DeepSeekProvider extends BaseProvider {
  get id() {
    return 'deepseek';
  }

  get name() {
    return 'DeepSeek';
  }

  get icon() {
    return '🤖';
  }

  get apiKeyPlaceholder() {
    return 'sk-...';
  }

  get helpUrl() {
    return 'https://platform.deepseek.com';
  }

  get helpUrlLabel() {
    return 'platform.deepseek.com';
  }

  get helpSteps() {
    return [
      { text: 'Buka ', link: { url: 'https://platform.deepseek.com', label: 'platform.deepseek.com' } },
      'Daftar atau login ke akun DeepSeek',
      { text: 'Buka menu ', bold: 'API Keys' },
      { text: 'Klik ', bold: 'Create New Key', suffix: ', copy key-nya' },
      'Paste key di atas, lalu klik Save',
    ];
  }

  get models() {
    return [{ value: 'deepseek-chat', label: 'DeepSeek Chat (Latest)' }];
  }

  get defaultModel() {
    return 'deepseek-chat';
  }

  async generateReply(tweetText, apiKey, options = {}) {
    const {
      temperature = 0.7,
      maxTokens = 2048,
      model = 'deepseek-chat',
      systemPrompt = '',
      userMessage = tweetText,
    } = options;

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature,
        max_tokens: maxTokens,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.error?.message || 'Something went wrong.';

      if (response.status === 401) {
        throw new Error('Invalid API key. Cek kembali key DeepSeek kamu di settings.');
      } else if (response.status === 429) {
        throw new Error('Rate limited. Tunggu sebentar lalu coba lagi.');
      } else if (response.status === 402) {
        throw new Error('Saldo akun DeepSeek kamu tidak cukup.');
      } else {
        throw new Error(`API Error (${response.status}): ${msg}`);
      }
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    if (!rawContent) {
      throw new Error('API mengembalikan response kosong. Coba tweet yang berbeda.');
    }

    return rawContent;
  }
}
