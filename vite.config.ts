import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './',
  base: './',
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
      }
    }
  }
});
