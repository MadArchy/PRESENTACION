/**
 * Same-origin translation proxy for Vite dev.
 * Providers (in order): DeepL → Google Cloud → Google High-Speed Engine → Gemma/OpenAI LLM.
 * Keys stay in .env if present; if not present, seamlessly uses the high-speed engine.
 */
import { loadEnv } from 'vite';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseRequest(req, url, bodyRaw) {
  const q = url.searchParams;
  let text = q.get('q') || q.get('text') || '';
  let from = (q.get('from') || q.get('sl') || 'es').toLowerCase();
  let to = (q.get('to') || q.get('tl') || 'en').toLowerCase();

  if (req.method === 'POST' && bodyRaw) {
    try {
      const json = JSON.parse(bodyRaw);
      text = String(json.text || json.q || text || '');
      from = String(json.from || json.source_lang || from).toLowerCase();
      to = String(json.to || json.target_lang || to).toLowerCase();
    } catch {
      /* keep query params */
    }
  }

  from = from.startsWith('en') ? 'en' : 'es';
  to = to.startsWith('en') ? 'en' : 'es';
  return { text: text.trim(), from, to };
}

async function translateGoogleFree(text, from, to) {
  try {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${from}&tl=${to}&q=${encodeURIComponent(text)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && typeof data[0] === 'string') {
      const result = data.join(' ').trim();
      return result || null;
    }
    if (typeof data === 'string') return data.trim() || null;
    return null;
  } catch {
    return null;
  }
}

async function translateDeepL(text, from, to, apiKey, env) {
  if (!apiKey) return null;
  const useFree = apiKey.includes(':fx') || env.DEEPL_API_FREE === '1';
  const base = useFree ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  const params = new URLSearchParams();
  params.set('auth_key', apiKey);
  params.set('text', text);
  params.set('source_lang', from.toUpperCase());
  params.set('target_lang', to.toUpperCase());

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${base}/v2/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    const out = data?.translations?.[0]?.text;
    return typeof out === 'string' && out.trim() ? out.trim() : null;
  } catch {
    return null;
  }
}

async function translateGoogle(text, from, to, apiKey) {
  if (!apiKey) return null;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'text'
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    const out = data?.data?.translations?.[0]?.translatedText;
    return typeof out === 'string' && out.trim() ? out.trim() : null;
  } catch {
    return null;
  }
}

function resolveGemmaUrl(rawUrl) {
  const u = String(rawUrl || '').trim();
  if (!u) return '';
  if (u.startsWith('/llm-proxy')) {
    const spark = 'https://spark-e020.tail02df6b.ts.net';
    return spark + u.replace(/^\/llm-proxy/, '');
  }
  return u;
}

function stripTranslationNoise(raw) {
  let out = String(raw || '').trim();
  if (!out) return '';
  out = out.replace(/^["'«»]|["'»«]$/g, '').trim();
  const fence = out.match(/^```(?:\w+)?\s*([\s\S]*?)```$/);
  if (fence) out = fence[1].trim();
  const lines = out.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1 && /^(translation|traducci[oó]n|here is|aquí)/i.test(lines[0])) {
    out = lines.slice(1).join(' ').trim();
  }
  return out;
}

async function translateGemma(text, from, to, env) {
  const url = resolveGemmaUrl(env.GEMMA_TRANSLATE_URL || env.LLM_TRANSLATE_URL || '');
  const apiKey = env.GEMMA_API_KEY || env.LLM_TRANSLATE_API_KEY || '';
  const model = env.GEMMA_MODEL || env.LLM_TRANSLATE_MODEL || 'gemma';
  if (!url) return null;

  const fromName = from === 'es' ? 'Spanish' : 'English';
  const toName = to === 'es' ? 'Spanish' : 'English';
  const system =
    `You are a precise bilingual translator for investor pitch decks. ` +
    `Translate from ${fromName} to ${toName}. ` +
    `Return ONLY the translated text. No quotes, labels, markdown, or explanations. ` +
    `Preserve proper nouns (Arcana, BAIRD, FoodTech) and numbers.`;

  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model,
        temperature: 0.1,
        max_tokens: 512,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: text }
        ]
      })
    });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const data = await res.json();
    const content =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.output_text ||
      data?.response ||
      '';
    const cleaned = stripTranslationNoise(content);
    if (!cleaned || cleaned.toLowerCase() === text.toLowerCase()) return null;
    return cleaned;
  } catch {
    clearTimeout(timeoutId);
    return null;
  }
}

export function translateApiPlugin() {
  return {
    name: 'translate-api-proxy',
    configureServer(server) {
      const env = {
        ...loadEnv(server.config.mode, server.config.root, ''),
        DEEPL_API_KEY: process.env.DEEPL_API_KEY,
        DEEPL_API_FREE: process.env.DEEPL_API_FREE,
        GOOGLE_TRANSLATE_KEY: process.env.GOOGLE_TRANSLATE_KEY,
        GEMMA_TRANSLATE_URL: process.env.GEMMA_TRANSLATE_URL,
        GEMMA_API_KEY: process.env.GEMMA_API_KEY,
        GEMMA_MODEL: process.env.GEMMA_MODEL,
        LLM_TRANSLATE_URL: process.env.LLM_TRANSLATE_URL,
        LLM_TRANSLATE_API_KEY: process.env.LLM_TRANSLATE_API_KEY,
        LLM_TRANSLATE_MODEL: process.env.LLM_TRANSLATE_MODEL,
        GEMMA_TRANSLATE_FIRST: process.env.GEMMA_TRANSLATE_FIRST
      };
      const loaded = loadEnv(server.config.mode, server.config.root, '');
      Object.assign(env, loaded);

      const deeplKey = env.DEEPL_API_KEY || '';
      const googleKey = env.GOOGLE_TRANSLATE_KEY || '';
      const hasGemma = !!(env.GEMMA_TRANSLATE_URL || env.LLM_TRANSLATE_URL);
      const gemmaFirst = env.GEMMA_TRANSLATE_FIRST === '1' || env.GEMMA_TRANSLATE_FIRST === 'true';

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/translate-api')) return next();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        try {
          const host = req.headers.host || 'localhost';
          const url = new URL(req.url, `http://${host}`);
          const bodyRaw = req.method === 'POST' ? await readBody(req) : '';
          const { text, from, to } = parseRequest(req, url, bodyRaw);

          if (!text) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'missing_text' }));
            return;
          }

          if (from === to) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ translatedText: text, provider: 'identity' }));
            return;
          }

          let translated = null;
          let provider = null;

          const tryGemma = async () => {
            const g = await translateGemma(text, from, to, env);
            if (g) {
              translated = g;
              provider = 'gemma';
            }
          };
          const tryDeepL = async () => {
            const d = await translateDeepL(text, from, to, deeplKey, env);
            if (d) {
              translated = d;
              provider = 'deepl';
            }
          };
          const tryGoogle = async () => {
            const g = await translateGoogle(text, from, to, googleKey);
            if (g) {
              translated = g;
              provider = 'google_cloud';
            }
          };
          const tryGoogleFree = async () => {
            const g = await translateGoogleFree(text, from, to);
            if (g) {
              translated = g;
              provider = 'google_fast';
            }
          };

          if (gemmaFirst && hasGemma) await tryGemma();
          if (!translated && deeplKey) await tryDeepL();
          if (!translated && googleKey) await tryGoogle();
          if (!translated) await tryGoogleFree();
          if (!translated && hasGemma && !gemmaFirst) await tryGemma();

          if (!translated) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'upstream_failed' }));
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ translatedText: translated, provider, from, to }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'proxy_error', message: String(err?.message || err) }));
        }
      });
    }
  };
}
