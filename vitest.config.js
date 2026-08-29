import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // happy-dom 替代 jsdom：jsdom 依赖的 html-encoding-sniffer
    // 与新版 @exodus/bytes（ESM-only）存在 require 兼容问题
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/__test__/**/*.{test,spec}.{js,jsx}'],
  },
});
