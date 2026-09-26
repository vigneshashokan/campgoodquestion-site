## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Static Astro site, hosted on Netlify, content edited by non-technical editors via Pages CMS.
- All copy lives in `src/content/*.yml` (one file per page + `settings.yml`). The schema in `src/content.config.ts` and the editor fields in `.pages.yml` must stay in sync.
- Design source: Claude Design project "Good Question Website" (`Good Question Website.dc.html`). Colors/fonts are tokens in `src/styles/global.css`.
- Hosted on GitHub Pages for now (subfolder `/campgoodquestion-site/`): always build internal links and asset paths with `url()` from `src/lib/url.ts`, never a bare `/path`.
- Contact form: Netlify Forms when built on Netlify (`process.env.NETLIFY`), otherwise hands off to the visitor's email app via mailto. Works without JS; JS adds validation.
- Client JS is small vanilla `<script>`s: the camp slideshow, `src/scripts/tabs.ts`, the history card flip, and the contact form.
- Checks: `npm run check`, `npm test`, `npm run build`.
- Keep it simple: no UI framework or CSS framework unless there's a concrete need.
