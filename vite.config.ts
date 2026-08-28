import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { translateApiPlugin } from './vite-plugins/translate-api-plugin.mjs';

export default defineConfig(({ mode }) => {
  // Ensure .env keys are visible to the translate plugin / process
  loadEnv(mode, process.cwd(), '');

  return {
    root: './',
    base: './',
    plugins: [translateApiPlugin()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      target: 'es2022',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 8765,
      open: false,
      proxy: {
        // Avoid browser CORS when Ask IA calls the Tailscale Spark LLM.
        '/llm-proxy': {
          target: 'https://spark-e020.tail02df6b.ts.net',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/llm-proxy/, '')
        },
        // Live speech translation (Google gtx) — browser cannot call this directly due to CORS.
        '/translate-gtx': {
          target: 'https://translate.googleapis.com',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/translate-gtx/, '/translate_a/single')
        },
        // MyMemory fallback via same-origin proxy
        '/translate-mymemory': {
          target: 'https://api.mymemory.translated.net',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/translate-mymemory/, '')
        }
      }
    }
  };
});
