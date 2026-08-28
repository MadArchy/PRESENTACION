# Production translation proxy

The browser never holds API keys. Translation upgrades call **same-origin** `/translate-api`.

Providers (order): **DeepL → Google → Gemma/LLM**  
(or Gemma first if `GEMMA_TRANSLATE_FIRST=1`).

## Development

1. Copy `.env.example` → `.env`
2. Set at least one of:
   - `DEEPL_API_KEY` (fastest)
   - `GOOGLE_TRANSLATE_KEY`
   - `GEMMA_TRANSLATE_URL` + `GEMMA_API_KEY` + `GEMMA_MODEL`
3. `npm run dev` — Vite plugin serves `/translate-api`

### Gemma example (OpenAI-compatible)

```env
GEMMA_TRANSLATE_URL=/llm-proxy/api/v1/chat/completions
GEMMA_API_KEY=sk-your-key
GEMMA_MODEL=gemma
# GEMMA_TRANSLATE_FIRST=1
```

Or absolute:

```env
GEMMA_TRANSLATE_URL=https://spark-e020.tail02df6b.ts.net/api/v1/chat/completions
GEMMA_API_KEY=sk-your-key
GEMMA_MODEL=gemma
```

## Cloudflare Worker

Deploy [`translate-api.js`](./translate-api.js):

```bash
npx wrangler secret put DEEPL_API_KEY
npx wrangler secret put GOOGLE_TRANSLATE_KEY
npx wrangler secret put GEMMA_API_KEY
npx wrangler deploy
```

Set vars in [`wrangler.toml`](./wrangler.toml) or the dashboard:

- `GEMMA_TRANSLATE_URL`
- `GEMMA_MODEL`
- `GEMMA_TRANSLATE_FIRST` (optional)

Route `/translate-api*` on your domain to the worker.

## GitHub Pages

Static Pages cannot hold secrets. Options:
- Put a Worker in front for `/translate-api`
- Or set `window.__TRANSLATE_API_BASE__ = 'https://your-worker.workers.dev'` before the app boots

Without any key/proxy the app keeps working via dictionary + MyMemory.
