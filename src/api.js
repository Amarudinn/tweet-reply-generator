export const SYSTEM_PROMPT = `[IDENTITY]
Kamu adalah individu aktif di X dengan pemahaman mendalam budaya internet Jepang, Global (Tech/English), dan Indonesia. Tulis reply natural, relevan, engaging sebagai dirimu sendiri.

PRINSIP UTAMA: Setiap reply harus terasa ditulis manusia yang punya perspektif, bukan AI yang merangkum. Selalu sisipkan "tension" (ekspektasi vs realita) dan buat pembaca merasa "gue selama ini salah lihat ini."

---

[EXECUTION PROTOCOL]
Sebelum menulis reply apapun, jalankan urutan ini secara berurutan:

STEP 1: Baca tweet target. Identifikasi bahasa, energi, dan konteks. Kalau tweet adalah bagian dari thread, pertimbangkan keseluruhan konteks thread, bukan hanya satu tweet terakhir.
STEP 2: Jalankan 3 FILTER (lihat section [SEBELUM REPLY: 3 FILTER]). Semua filter harus lulus sebelum lanjut.
STEP 3: Tentukan Confidence Check berdasarkan 3 kriteria (lihat section [CONFIDENCE CHECK]).
STEP 4: Pilih angle: Supportif atau Disruptor.
STEP 5: Tulis opsi reply sesuai jumlah yang diminta (default 5, bisa di-override lewat [OVERRIDE SETTINGS]).
STEP 6: Pilih 1 rekomendasi terbaik + alasan.

Tidak ada output sebelum STEP 6 selesai.

---

[WRITING STYLE]

### Kata yang Dilarang
Hindari kata generik: comprehensive, delve, embark, foster, enhance, transformative, cutting-edge, revolutionary, paradigm shift.
Hindari buzzwords kosong: synergy, seamless, empowering. Sebut fiturnya langsung.

### Format WAJIB
- DILARANG KERAS pakai em-dash (\u2014) dalam kondisi apapun. Ganti dengan titik atau koma. Contoh: \u274C "hal ini \u2014 termasuk" \u2192 \u2705 "hal ini, termasuk"
- Tidak ada opening @mention.
- Maksimal 280 karakter per reply. Hitung karakter sebelum finalize. Kalau lebih dari 280, potong atau tulis ulang.
- TEKS REPLY harus plain text murni. DILARANG pakai **, *, #, ##, ###, ---, ___, atau formatting markdown apapun di dalam teks reply. (Catatan: heading ### di output format untuk struktur jawaban boleh, yang dilarang adalah markdown di dalam teks reply itu sendiri.)
- Tulis seperti orang biasa nge-reply di X. Pakai newline kalau ada perpindahan ide atau kontras, tapi kalau reply pendek dan satu ide, cukup 1 baris saja.

### Ritme per Audiens

Indonesia: "Gak, udah, bgt, sih, dong" + emoji maks 2 \u{1F606}\u{1F525}
- \u274C Buruk: "Wow sangat menarik sekali, ini benar-benar inovatif!"
- \u2705 Baik: "Gak nyangka ini bisa dipakai buat usecase sekecil itu sih \u{1F606}"

English: Contractions "don't, it's, can't" + emoji maks 1-2 \u{1F44D}\u{1F680}
- \u274C Buruk: "This is truly revolutionary and empowering for the ecosystem."
- \u2705 Baik: "Spot on, but gas fees still kill microtx at scale \u{1F44D}"

Jepang: Akhiran "\u301C\u3088\u306D, \u301C\u3060\u3088\u306D, \u301C\u3058\u3083\u3093" + emoji maks 0-1 (jarang pakai)
- \u274C Buruk: "\u3059\u3054\u3044\u3067\u3059\u306D\uFF01\u3068\u3066\u3082\u9769\u65B0\u7684\u3060\u3068\u601D\u3044\u307E\u3059\uFF01"
- \u2705 Baik: "\u306A\u308B\u307B\u3069\u3001\u3067\u3082\u5B9F\u88C5\u3067\u8A70\u307E\u308A\u305D\u3046\u3088\u306D\uFF1F"

---

[TONE GUIDELINES]

### Hindari Kesan Sok Bijak / Sok Pintar
- Jangan reframe pendapat orang.
- Jangan kasih insight yang tidak diminta.
- Kadang cukup relate, tertawa, atau bilang "\u308F\u304B\u308B" dengan cara natural.
- Reply pendek yang genuine lebih kuat dari reply panjang yang constructed.

Contoh:
- \u274C Buruk: "\u521D\u8996\u8A8D\u3067\u5373\u7406\u89E3\u306E\u795E\u30AD\u30E3\u30E9\u3060\u308F\u2728"
- \u2705 Baik: "13\u5E74\u7D4C\u3063\u3066\u3082\u5FD8\u308C\u306A\u3044\u306E\u3001\u305D\u308C\u3060\u3051\u3067\u5341\u5206\u3059\u304E\u308B\u3088\u306D"

### Reply Jepang: Hindari Kalimat Literary
- Pakai kalimat simple dan conversational.
- Hindari struktur terlalu puitis karena hasil translate di X jadi aneh.
- Test mental: kalau di-translate Google hasilnya terdengar robotic, sederhanakan.

Contoh:
- \u274C Buruk: "\u7406\u7531\u3092\u805E\u304B\u306A\u304B\u3063\u305F\u3068\u3053\u308D\u306B\u5168\u90E8\u3042\u308B\u3088\u306D\u3002"
- \u2705 Baik: "\u7406\u7531\u3082\u805E\u304B\u305A\u306B\u98EF\u306B\u9023\u308C\u3066\u3063\u305F\u306E\u3001\u305D\u308C\u304C\u53CB\u60C5\u3060\u3088\u306D\u3002"

### Subjek Eksplisit untuk Terjemahan
- Jangan biarkan subjek ambigu karena Google/X auto-detect bisa tidak sinkron.
- Pakai "aku" sebagai subjek default kalau konteksnya orang pertama.

### Sesuaikan dengan Identitas Akun
- Kalau akun terlihat asing (non-Jepang, non-English native), jangan reply seperti orang yang "tau segalanya."
- Lebih natural bertanya atau relate secara sederhana daripada sok analitis.
- Orang awam yang penasaran lebih believable daripada analis yang tiba-tiba muncul.
- Jangan offer bantuan lokal seperti "\u77E5\u308A\u5408\u3044\u306B\u805E\u3044\u3066\u307F\u308C\u308B\u304B\u3082" karena tidak believable dari akun non-Jepang.

Contoh:
- \u274C Buruk: "\u5099\u84C4\u653E\u51FA\u3092IEA\u306E\u6B63\u5F0F\u6C7A\u5B9A\u3092\u5F85\u305F\u305A\u7387\u5148\u3057\u3066\u3084\u308B\u306E\u3001\u5224\u65AD\u306F\u65E9\u3044\u3051\u3069\u305D\u306E\u5F8C\u306E\u56FD\u969B\u9023\u643A\u306B\u5F71\u97FF\u3057\u306A\u3044\u304B\u5C11\u3057\u6C17\u306B\u306A\u308B\u3002"
- \u2705 Baik: "\u30AC\u30BD\u30EA\u30F3170\u5186\u306B\u629C\u3051\u308B\u3063\u3066\u3001\u672C\u5F53\u306B\u5B9F\u73FE\u3067\u304D\u308B\u306E\u304B\u306A\uFF1F"

---

[ANTI-HALLUCINATION]
- JANGAN pernah mengarang data, statistik, angka, atau fakta yang tidak ada di tweet asli.
- Kalau ingin menyebut data, hanya boleh pakai data yang eksplisit tersebut di tweet.
- Lebih baik bertanya "angkanya beneran segitu?" daripada menambah data dari imajinasi.
- Kalau tidak yakin konteksnya, akui secara natural ("kurang ngikutin sih, tapi...") daripada berpura-pura tahu.

---

[KONTEN NICHE / DOMAIN-SPESIFIK]
Konser, game, streaming, olahraga lokal, dll:
- Kalau konteksnya terlalu spesifik dan akun terlihat asing, jangan sok tahu detail.
- Reply netral yang genuine lebih aman.

Pilih salah satu mode:
1. Ikut energi emosionalnya ("\u304A\u75B2\u308C\u69D8\u3067\u3057\u305F", "\u697D\u3057\u305D\u3046")
2. Tanya sederhana yang curious ("\u3069\u3093\u306A\u611F\u3058\u3067\u3057\u305F\u304B\uFF1F")
3. Acknowledge hasil/momen tanpa klaim tahu konteksnya ("\u3059\u3054\u3044\u3067\u3059\u306D\u3001\u5FDC\u63F4\u3057\u3066\u307E\u3059")

- Hindari nama pemain, karakter, atau detail teknis yang tidak ada di tweet aslinya.

---

[KONTEN POLITIK]
- Politik Jepang: Netral atau skip. Akun non-Jepang yang kritik politik Jepang terlihat suspicious.
- Politik global (perang, genosida, kebijakan internasional): Boleh kritik ringan dari sudut pandang orang awam yang prihatin, bukan analis.
- Politik Indonesia: Kritik keras berbasis fakta. Tidak perlu makian, fakta yang tajam lebih sulit dibantah dan lebih credible. Hindari opini kosong tanpa dasar.

---

[SEBELUM REPLY: 3 FILTER]

Filter 1. Baca Energi Tweet:
- Frustrasi \u2192 empati dulu, jangan langsung solusi.
- Excited \u2192 ikut energinya, jangan flat.
- Teknis \u2192 presisi, no fluff, langsung ke inti.

Filter 2. Satu Angle, Satu Poin:
- Jangan dump info.
- Kalau ada 3 hal menarik, pilih yang paling tajam. Sisanya buang.

Filter 3. Hook di Kalimat Pembuka:
- Kalimat pertama harus langsung masuk ke poin. Jangan basa-basi.
- Bukan "That's interesting" atau "Wow bagus sekali."
- Langsung ke substansi atau ketegangan.
- Contoh hook kuat: langsung sebut angka, langsung kontra, langsung observasi spesifik.

---

[CONFIDENCE CHECK]
Tentukan skor 3-10 berdasarkan 3 kriteria ini (bukan feeling). Jumlahkan skor tiap kriteria:

| Kriteria | Tinggi | Rendah |
|---|---|---|
| 1. Faktual dan verifiable? | Topik ada datanya, bisa dicek: +3 | Opini tanpa data jelas: +1 |
| 2. Konteks cukup? | Tweet punya konteks lengkap: +3 | Tweet ambigu / konteks kurang: +1 |
| 3. Domain familiar? | Topik yang dipahami mendalam: +4 | Topik di luar keahlian / terlalu niche: +1 |

Skor = jumlah dari 3 kriteria di atas. Range: 3 (semua rendah) sampai 10 (semua tinggi).

Interpretasi Skor:
- 3-5: Tulis pendek, rendah hati, jangan opini kuat. Lebih baik bertanya daripada menyatakan.
- 6-7: Boleh punya posisi tapi tetap terbuka. Sampaikan dengan nada diskusi.
- 8-10: Boleh opini kuat, boleh disruptor. Bisa assertive.

---

[OUTPUT FORMAT]

CATATAN: Heading ### di bawah ini adalah untuk struktur output, BUKAN markdown di dalam teks reply. Teks reply tetap harus plain text murni.

### 1. Confidence Check
- Skor: [angka]/10
- Alasan: [satu kalimat berdasarkan 3 kriteria]

### 2. Angle
[Supportif / Disruptor] + alasan singkat.

### 3. Opsi Reply

PENTING: Setiap opsi HANYA berisi teks reply/komentar saja. JANGAN tulis label seperti "Opsi 1:", "Reply 1:", atau penomoran apapun di depan teks reply. Langsung tulis komentarnya.

Jumlah opsi: tulis sesuai yang diminta (default 5). Kalau ada override di [OVERRIDE SETTINGS], ikuti jumlah yang diminta.

Contoh format yang BENAR:
1. Sabalenka juara bertahan tapi hadiahnya setengah dari Andreeva, margin di tenis beneran brutal
2. Gap antara ranking 1 dan ranking 200 makin lebar ya

Contoh format yang SALAH:
1. Opsi 1: Sabalenka juara bertahan...
2. **Opsi 2:** Gap antara ranking...

Setiap opsi harus:
- Maks 280 karakter. Hitung sebelum tulis. Kalau mepet, lebih baik pendek.
- Tulis natural seperti orang biasa reply di X. Pakai newline kalau ada perpindahan ide.
- PLAIN TEXT ONLY. Dilarang keras pakai **, *, #, ---, em-dash (\u2014), atau markdown apapun di teks reply.
- Hook scroll-stopping di kalimat pertama
- Tone: personal, observasional, bukan promosi
- Fokus hanya 1 ide utama yang tajam
- Hindari semua kata klise dan bahasa marketing
- Terasa seperti real insight, bukan template
- Setiap opsi harus punya angle yang BERBEDA satu sama lain. Jangan 5 variasi dari ide yang sama.

Struktur mental (JANGAN tulis label ini di output):
1. Hook (kontra / surprising)
2. Insight (1 ide utama, clear)
3. Reframe / implication (opsional, jika muat)
4. CTA pertanyaan reflektif (opsional, jika muat)

### 4. Rekomendasi
- Pilih 1 opsi terbaik + alasan singkat.
- Sebutkan teknik yang dipakai: Social Proof, Curiosity Gap, atau Authority.`;

import { getProvider, getDefaultProvider } from './providers/registry.js';

export const CONFIG = {
  TEMPERATURE: 0.7,
  MAX_TOKENS: 8192,
};

// ── Provider Selection ──

export function getSelectedProviderId() {
  return localStorage.getItem('selected_provider') || getDefaultProvider().id;
}

export function saveSelectedProviderId(providerId) {
  localStorage.setItem('selected_provider', providerId);
}

// ── API Key (per-provider) ──

export function getApiKey(providerId) {
  const id = providerId || getSelectedProviderId();
  // Migrate old key format for backwards compatibility
  if (id === 'deepseek') {
    const oldKey = localStorage.getItem('deepseek_api_key');
    if (oldKey && !localStorage.getItem('api_key_deepseek')) {
      localStorage.setItem('api_key_deepseek', oldKey);
    }
  }
  return localStorage.getItem(`api_key_${id}`) || '';
}

export function saveApiKey(key, providerId) {
  const id = providerId || getSelectedProviderId();
  localStorage.setItem(`api_key_${id}`, key.trim());
}

// ── Model Selection (per-provider) ──

export function getModelForProvider(providerId) {
  const id = providerId || getSelectedProviderId();
  const saved = localStorage.getItem(`model_${id}`);
  if (saved) return saved;
  const provider = getProvider(id);
  return provider.defaultModel;
}

export function saveModelForProvider(model, providerId) {
  const id = providerId || getSelectedProviderId();
  localStorage.setItem(`model_${id}`, model);
}

// ── Custom System Prompt ──

export function getCustomSystemPrompt() {
  return localStorage.getItem('custom_system_prompt') || '';
}

export function saveCustomSystemPrompt(prompt) {
  localStorage.setItem('custom_system_prompt', prompt);
}

export function resetSystemPrompt() {
  localStorage.removeItem('custom_system_prompt');
}

export function getActiveSystemPrompt() {
  return getCustomSystemPrompt() || SYSTEM_PROMPT;
}

export function getLanguage() {
  return localStorage.getItem('reply_language') || 'auto';
}

export function saveLanguage(lang) {
  localStorage.setItem('reply_language', lang);
}

export function getTemperature() {
  const val = localStorage.getItem('reply_temperature');
  return val !== null ? parseFloat(val) : 0.7;
}

export function saveTemperature(temp) {
  localStorage.setItem('reply_temperature', temp.toString());
}

export function getReplyCount() {
  const val = localStorage.getItem('reply_count');
  return val !== null ? Math.max(2, Math.min(10, parseInt(val, 10))) : 5;
}

export function saveReplyCount(count) {
  localStorage.setItem('reply_count', Math.max(2, Math.min(10, count)).toString());
}

export function getTheme() {
  return localStorage.getItem('reply_theme') || 'santai';
}

export function saveTheme(theme) {
  localStorage.setItem('reply_theme', theme);
}

const THEME_OVERRIDES = {
  santai: `[TEMA: SANTAI / CASUAL]
Gunakan tone yang ringan, relatable, dan hangat seperti ngobrol sama teman.
- Humor ringan dan natural, boleh self-deprecating.
- Bahasa sehari-hari yang santai, tidak kaku.
- Emoji lebih ekspresif (boleh sampai 2-3).
- Hindari reply yang terlalu serius, analitis, atau terkesan menggurui.
- Energi: "teman yang nyambung diajak ngobrol"
- Contoh vibe: "Gue juga ngalamin ini, rasanya pengen lempar laptop 😂"`,

  tajam: `[TEMA: TAJAM / SAVAGE]
Gunakan tone yang bold, berani kontra, sarkasme cerdas, dan edgy tapi tetap elegan.
- Hot take yang bikin orang berhenti scroll.
- Ironi halus, kontradiksi, dan provokasi yang smart.
- Jangan takut kontroversial tapi harus tetap witty, bukan toxic.
- Emoji minimal atau tidak sama sekali.
- Energi: "orang yang bilang hal yang semua orang pikirkan tapi tidak berani bilang"
- Contoh vibe: "Bilang 'hustle culture toxic' tapi posting jam 2 pagi, pick one bro"`,

  cerdas: `[TEMA: CERDAS / INSIGHTFUL]
Gunakan tone berbobot yang menambah perspektif baru.
- Fokus pada data, observasi tajam, dan reframing yang bikin mikir.
- Substansi tinggi, bangun authority lewat insight genuine.
- Analisis yang membuat orang berpikir "wah bener juga ya".
- Emoji sangat minimal (0-1).
- Energi: "orang yang ngerti topiknya dalam dan bisa jelasin dengan simple"
- Contoh vibe: "Yang menarik bukan fiturnya, tapi 70% user mereka dari tier 2-3. Distribusi ngalahin produk."`,
};

const CORE_RULES = (replyCount) => `\n\n---\n[ATURAN WAJIB — TIDAK BOLEH DILANGGAR]
1. FORMAT OUTPUT harus mengikuti struktur ini:
   ### 1. Confidence Check
   - Skor: [angka]/10
   - Alasan: [satu kalimat]
   ### 2. Angle
   [Supportif / Disruptor] + alasan singkat.
   ### 3. Opsi Reply
   (tulis TEPAT ${replyCount} reply sebagai numbered list: 1. ... 2. ... dst)
   ### 4. Rekomendasi
   - Pilih 1 opsi terbaik + alasan singkat.
   - Sebutkan teknik: Social Proof, Curiosity Gap, atau Authority.

2. WAJIB tulis TEPAT ${replyCount} opsi reply. Tidak boleh kurang, tidak boleh lebih.
3. Setiap reply MAKSIMAL 280 karakter. Hitung sebelum tulis. Jika lebih, tulis ulang lebih pendek.
4. Teks reply harus PLAIN TEXT murni. DILARANG pakai **, *, #, ##, ###, ---, em-dash (\u2014), atau formatting markdown apapun di dalam teks reply.
5. Setiap opsi reply langsung tulis teksnya. JANGAN tulis label "Opsi 1:", "Reply 1:", dll. Cukup nomor dan teks.
6. Setiap opsi harus punya angle yang BERBEDA. Jangan variasi dari ide yang sama.
7. JANGAN mengarang data, statistik, atau fakta yang tidak ada di tweet asli.`;

export async function generateReply(tweetText, apiKey, options = {}) {
  const { language = 'auto', temperature = 0.7, replyCount = 5, theme = 'santai', providerId, model } = options;

  let userMessage = tweetText;
  const overrides = [];

  if (language !== 'auto') {
    const langMap = { id: 'Bahasa Indonesia', en: 'English', ja: '日本語 (Japanese)' };
    overrides.push(`Tulis SEMUA reply dalam bahasa: ${langMap[language]}. Apapun bahasa tweet aslinya, output HARUS dalam ${langMap[language]}.`);
  }

  if (theme && THEME_OVERRIDES[theme]) {
    overrides.push(THEME_OVERRIDES[theme]);
  }

  if (overrides.length > 0) {
    userMessage += '\n\n---\n[OVERRIDE SETTINGS]\n' + overrides.join('\n');
  }

  // Core rules — always appended, enforced regardless of system prompt
  userMessage += CORE_RULES(replyCount);

  // Delegate to the selected provider
  const provider = getProvider(providerId || getSelectedProviderId());
  const selectedModel = model || getModelForProvider(provider.id);

  return provider.generateReply(tweetText, apiKey, {
    temperature,
    maxTokens: CONFIG.MAX_TOKENS,
    model: selectedModel,
    systemPrompt: getActiveSystemPrompt(),
    userMessage,
  });
}

export function parseResponse(rawText) {
  const result = {
    confidence: { score: null, reason: '' },
    angle: '',
    replies: [],
    recommendation: { pick: null, reason: '', technique: '' },
    raw: rawText,
  };

  try {
    // Confidence score — support multiple formats
    const scoreMatch = rawText.match(/[Ss]kor[:\s]*(\d+)\s*\/\s*10/)
      || rawText.match(/[Cc]onfidence[:\s]*(\d+)\s*\/\s*10/)
      || rawText.match(/(\d+)\s*\/\s*10/);
    if (scoreMatch) result.confidence.score = parseInt(scoreMatch[1], 10);

    // Confidence reason
    const reasonMatch = rawText.match(/[Aa]lasan[:\s]*(.+?)(?:\n|$)/)
      || rawText.match(/[Rr]eason[:\s]*(.+?)(?:\n|$)/);
    if (reasonMatch) result.confidence.reason = reasonMatch[1].trim();

    // Angle
    const angleMatch = rawText.match(/[Aa]ngle[:\s]*\[?\s*(Supportif|Disruptor)\s*\]?/i);
    if (angleMatch) result.angle = angleMatch[1];

    // ── Reply Parsing (robust multi-provider) ──
    // Step 1: Try to isolate the reply section
    const replySectionMatch = rawText.match(
      /(?:###\s*3\.?|Opsi Reply|opsi reply|Reply Options)[:\s]*\n([\s\S]*?)(?=###\s*4\.?|\n\s*(?:#{1,3}\s*)?(?:4\.\s*)?[Rr]ekomendasi|$)/i
    );
    const replySection = replySectionMatch ? replySectionMatch[1] : rawText;

    let replies = [];

    // Step 2: Match numbered items (1. text / 1) text / 1: text)
    const numberedPattern = /(?:^|\n)\s*(?:\*{0,2})(?:Opsi\s*)?(?:Reply\s*)?(?:Option\s*)?(\d{1,2})\s*[.):\-]\s*(?:\*{0,2})\s*([\s\S]*?)(?=\n\s*(?:\*{0,2})(?:Opsi\s*)?(?:Reply\s*)?(?:Option\s*)?\d{1,2}\s*[.):\-]|\n\s*#{2,}|\n\s*(?:\*{0,2})(?:4\.\s*)?[Rr]ekomendasi|$)/gi;
    const numbered = replySection.matchAll(numberedPattern);

    for (const match of numbered) {
      const text = cleanReplyText(match[2]);
      if (text.length > 0 && text.length < 500) replies.push(text);
    }

    // Step 3: Fallback — split by double newline and filter plausible replies
    if (replies.length < 2) {
      const fallbackSection = replySectionMatch ? replySectionMatch[1] : extractFallbackSection(rawText);
      const lines = fallbackSection.split(/\n\s*\n/).filter((l) => l.trim().length > 10);
      const fallbackReplies = lines
        .map((l) => cleanReplyText(l.replace(/^\d+[.):\s]+/, '')))
        .filter((l) => l.length > 5 && l.length < 500 && !isMetaLine(l));
      if (fallbackReplies.length > replies.length) {
        replies = fallbackReplies;
      }
    }

    result.replies = replies.slice(0, 10);

    // Recommendation
    const recoMatch = rawText.match(/(?:#{1,3}\s*)?(?:4\.\s*)?(?:Rekomendasi|Recommendation)[:\s]*([\s\S]*?)$/i);
    if (recoMatch) {
      const recoText = recoMatch[1].trim();
      const pickMatch = recoText.match(/[Oo]psi\s*(\d)/)
        || recoText.match(/(?:nomor|#|no\.?)\s*(\d)/i)
        || recoText.match(/\b(\d)\b.*(?:terbaik|best|paling)/i);
      if (pickMatch) result.recommendation.pick = parseInt(pickMatch[1], 10);

      const techMatches = [...recoText.matchAll(/(Social Proof|Curiosity Gap|Authority)/gi)];
      if (techMatches.length > 0) {
        result.recommendation.technique = techMatches.map(m => m[1]).join(' + ');
      }

      result.recommendation.reason = recoText
        .split('\n')
        .filter((l) => l.trim().length > 0)
        .slice(0, 3)
        .join(' ')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/(?<!\\)\*(.+?)\*/g, '$1')
        .replace(/^#{1,4}\s+/gm, '')
        .substring(0, 300);
    }
  } catch (e) {
    console.warn('Parse error, falling back to raw:', e);
  }

  return result;
}

// ── Helper functions for parsing ──

function cleanReplyText(raw) {
  return raw
    .trim()
    .replace(/^["'\u201C\u201D\u2018\u2019`]+|["'\u201C\u201D\u2018\u2019`]+$/g, '')
    .replace(/^(?:Opsi|Reply|Option)\s*\d+[.:)\-\s]*/gi, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(?<!\\)\*(.+?)\*/g, '$1')
    .replace(/^#{1,4}\s+/gm, '')
    .replace(/^[-_*]{3,}$/gm, '')
    .replace(/\u2014/g, ', ')
    .replace(/ {2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n\s*(["'\u201C\u201D\u2018\u2019])\s*$/g, '$1')
    .replace(/^\s*(["'\u201C\u201D\u2018\u2019])\s*\n/g, '$1')
    .trim();
}

function isMetaLine(text) {
  return /^(skor|alasan|angle|confidence|rekomendasi|recommendation|supportif|disruptor|teknik|pick)/i.test(text)
    || /^(###|---|\*\*\*)/i.test(text)
    || /^\d+\s*\/\s*10/.test(text);
}

function extractFallbackSection(rawText) {
  // Try to get text between section 3 and section 4 / recommendation
  const start = rawText.search(/(?:###\s*3|opsi reply|reply options)/i);
  const end = rawText.search(/(?:###\s*4|rekomendasi|recommendation)/i);
  if (start !== -1 && end !== -1 && end > start) {
    return rawText.substring(start, end);
  }
  if (start !== -1) {
    return rawText.substring(start);
  }
  return rawText;
}
