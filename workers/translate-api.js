/**
 * Cloudflare Worker — production same-origin translation API.
 *
 * Secrets:
 *   wrangler secret put DEEPL_API_KEY
 *   wrangler secret put GOOGLE_TRANSLATE_KEY
 *   wrangler secret put GEMMA_API_KEY
 * Vars (wrangler.toml [vars] or dashboard):
 *   GEMMA_TRANSLATE_URL = https://your-host/v1/chat/completions
 *   GEMMA_MODEL = gemma
 *   GEMMA_TRANSLATE_FIRST = 1   # optional: try Gemma before DeepL
 *
 * Request: GET|POST /translate-api?q=...&from=es&to=en
 * Response: { translatedText, provider }
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    if (!url.pathname.startsWith('/translate-api')) {
      return new Response(JSON.stringify({ error: 'not_found' }), {
        status: 404,
        headers: { ...corsHeaders(), 'Content-Type': 'application/json' }
      });
    }

    try {
      let text = url.searchParams.get('q') || url.searchParams.get('text') || '';
      let from = (url.searchParams.get('from') || 'es').toLowerCase();
      let to = (url.searchParams.get('to') || 'en').toLowerCase();

      if (request.method === 'POST') {
        const body = await request.json().catch(() => ({}));
        text = String(body.text || body.q || text || '');
        from = String(body.from || from).toLowerCase();
        to = String(body.to || to).toLowerCase();
      }

      text = text.trim();
      from = from.startsWith('en') ? 'en' : 'es';
      to = to.startsWith('en') ? 'en' : 'es';

      if (!text) {
        return json({ error: 'missing_text' }, 400);
      }
      if (from === to) {
        return json({ translatedText: text, provider: 'identity' });
      }

      const deeplKey = env.DEEPL_API_KEY || '';
      const googleKey = env.GOOGLE_TRANSLATE_KEY || '';
      const hasGemma = !!(env.GEMMA_TRANSLATE_URL || env.LLM_TRANSLATE_URL);
      const gemmaFirst = env.GEMMA_TRANSLATE_FIRST === '1' || env.GEMMA_TRANSLATE_FIRST === 'true';

      if (!deeplKey && !googleKey && !hasGemma) {
        return json({ error: 'no_api_key' }, 503);
      }

      let translated = null;
      let provider = null;

      if (gemmaFirst && hasGemma) {
        translated = await translateGemma(text, from, to, env);
        if (translated) provider = 'gemma';
      }
      if (!translated && deeplKey) {
        translated = await translateDeepL(text, from, to, deeplKey, env);
        if (translated) provider = 'deepl';
      }
      if (!translated && googleKey) {
        translated = await translateGoogle(text, from, to, googleKey);
        if (translated) provider = 'google';
      }
      if (!translated && hasGemma && !gemmaFirst) {
        translated = await translateGemma(text, from, to, env);
        if (translated) provider = 'gemma';
      }

      if (!translated) {
        return json({ error: 'upstream_failed' }, 502);
      }

      return json({ translatedText: translated, provider });
    } catch (err) {
      return json({ error: 'worker_error', message: String(err?.message || err) }, 500);
    }
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' }
  });
}

async function translateDeepL(text, from, to, apiKey, env) {
  const useFree = apiKey.includes(':fx') || env.DEEPL_API_FREE === '1';
  const base = useFree ? 'https://api-free.deepl.com' : 'https://api.deepl.com';
  const params = new URLSearchParams();
  params.set('auth_key', apiKey);
  params.set('text', text);
  params.set('source_lang', from.toUpperCase());
  params.set('target_lang', to.toUpperCase());

  const res = await fetch(`${base}/v2/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });
  if (!res.ok) return null;
  const data = await res.json();
  const out = data?.translations?.[0]?.text;
  return typeof out === 'string' && out.trim() ? out.trim() : null;
}

async function translateGoogle(text, from, to, apiKey) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: text, source: from, target: to, format: 'text' })
  });
  if (!res.ok) return null;
  const data = await res.json();
  const out = data?.data?.translations?.[0]?.translatedText;
  return typeof out === 'string' && out.trim() ? out.trim() : null;
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
  const url = String(env.GEMMA_TRANSLATE_URL || env.LLM_TRANSLATE_URL || '').trim();
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

  const res = await fetch(url, {
    method: 'POST',
    headers,
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
  if (!res.ok) return null;
  const data = await res.json();
  const content =
    data?.choices?.[0]?.message?.content
    || data?.choices?.[0]?.text
    || data?.output_text
    || data?.response
    || '';
  const cleaned = stripTranslationNoise(content);
  if (!cleaned || cleaned.toLowerCase() === text.toLowerCase()) return null;
  return cleaned;
}
