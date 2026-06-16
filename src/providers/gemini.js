import { BaseProvider } from './base.js';

export class GeminiProvider extends BaseProvider {
  get id() {
    return 'gemini';
  }

  get name() {
    return 'Google Gemini';
  }

  get icon() {
    return '✨';
  }

  get apiKeyPlaceholder() {
    return 'AIza...';
  }

  get helpUrl() {
    return 'https://aistudio.google.com/apikey';
  }

  get helpUrlLabel() {
    return 'aistudio.google.com';
  }

  get helpSteps() {
    return [
      { text: 'Buka ', link: { url: 'https://aistudio.google.com/apikey', label: 'aistudio.google.com/apikey' } },
      'Login dengan akun Google kamu',
      { text: 'Klik ', bold: 'Create API Key' },
      'Pilih project atau buat project baru',
      'Copy API key yang muncul, paste di atas',
    ];
  }

  get models() {
    return [
      { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
      { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
      { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
      { value: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash Lite' },
    ];
  }

  get defaultModel() {
    return 'gemini-2.5-flash';
  }

  async generateReply(tweetText, apiKey, options = {}) {
    const {
      temperature = 0.7,
      maxTokens = 2048,
      model = 'gemini-2.5-flash',
      systemPrompt = '',
      userMessage = tweetText,
    } = options;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const msg = errorData.error?.message || 'Something went wrong.';

      if (response.status === 400) {
        throw new Error(`Request error: ${msg}`);
      } else if (response.status === 403) {
        throw new Error('API key tidak valid atau tidak punya akses. Cek key Gemini kamu di settings.');
      } else if (response.status === 429) {
        throw new Error('Rate limited. Tunggu sebentar lalu coba lagi.');
      } else {
        throw new Error(`API Error (${response.status}): ${msg}`);
      }
    }

    const data = await response.json();

    // Gemini response structure
    const candidate = data.candidates?.[0];
    if (!candidate) {
      // Check for prompt feedback (blocked)
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Request diblokir oleh Gemini: ${data.promptFeedback.blockReason}`);
      }
      throw new Error('API mengembalikan response kosong. Coba tweet yang berbeda.');
    }

    // Check finish reason
    if (candidate.finishReason === 'SAFETY') {
      throw new Error('Response diblokir oleh safety filter Gemini. Coba tweet yang berbeda atau ubah wording.');
    }

    const rawContent = candidate.content?.parts?.map((p) => p.text).join('') || '';

    if (!rawContent) {
      throw new Error('API mengembalikan response kosong. Coba tweet yang berbeda.');
    }

    return rawContent;
  }
}
