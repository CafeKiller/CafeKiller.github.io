import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://CafeKiller.github.io',
  base: 'MyBlog',
  redirects: {
    '/blog': '/MyBlog/blogs'
  },
  integrations: [react()]
});