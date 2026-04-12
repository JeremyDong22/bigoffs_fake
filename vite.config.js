/* vite.config.js - v1.0 - Disable SPA fallback so /pages/<id>/ serves actual files */
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
});
