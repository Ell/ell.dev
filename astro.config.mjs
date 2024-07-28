import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import glsl from 'vite-plugin-glsl'

// https://astro.build/config
export default defineConfig({
  output: "server",
  devToolbar: {
    enabled: false
  },
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  integrations: [tailwind(), react()],
  vite: {
    plugins: [glsl()]
  }
});