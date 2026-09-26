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
- Page content: `src/content/pages/*.md`. The schema in `src/content.config.ts` and the editor fields in `.pages.yml` must stay in sync.
- Contact form uses Netlify Forms (`data-netlify` attribute), so there's no backend and no client JS.
- Keep it simple: no UI framework or CSS framework unless there's a concrete need.
