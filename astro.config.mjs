import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    server: {
        host: true,
        port: 4321
    },
    site: 'https://CafeKiller.github.io',
    integrations: [
        react()
    ],
    devToolbar: {
        enabled: false
    }
});