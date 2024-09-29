import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://CafeKiller.github.io',
  redirects: {
    '/blog': '/blogs'
  },
  integrations: [react()]
});