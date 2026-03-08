import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import robotsTxt from "astro-robots-txt";
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';

import sitemap from "@astrojs/sitemap";
const LIVE_URL = "https://sejime.github.io/"
const LOCAL_URL = "https://localhost:4000/"
// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [rehypeAccessibleEmojis],
  },
  site: LIVE_URL,
  integrations: [tailwind(), react(), robotsTxt(), sitemap()]
});