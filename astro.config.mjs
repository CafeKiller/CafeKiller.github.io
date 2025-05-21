import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    port: 4321
  },
  site: 'https://CafeKiller.github.io',
  redirects: {
    '/posts': '/tags/posts',
    '/articles': '/tags/articles',
    '/notes': '/notes/1',
    '/blogs/2025': '/blogs/#2025',
    '/blogs/2024': '/blogs/#2024',
    '/blogs/2023': '/blogs/#2023',
    '/blogs/2022': '/blogs/#2022'
  },
  integrations: [react(), tailwind()],
  devToolbar: {
    enabled: false
  }
});