import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jorcidesign.github.io',
  base: process.env.BASE_URL || (process.env.CF_PAGES === '1' ? '/' : '/ds3-astro-catalog'),
  output: 'static',
  srcDir: 'src',
});
