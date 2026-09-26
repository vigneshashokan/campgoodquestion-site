// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// SITE and BASE_PATH are set by the GitHub Pages workflow; locally and on Netlify the site lives at "/".
export default defineConfig({
	site: process.env.SITE,
	base: process.env.BASE_PATH,
});
