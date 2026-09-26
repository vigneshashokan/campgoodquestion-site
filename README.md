# campgoodquestion-site

Website for Camp Good Question (Burning Man theme camp). Static [Astro](https://docs.astro.build) site, hosted on Netlify, content edited through [Pages CMS](https://pagescms.org).

## Develop

Requires Node 22.12+ (`nvm use` picks it up from `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the build
```

## Where things live

| Path | What |
|---|---|
| `src/content/pages/*.md` | Page content (edited by non-technical folks via Pages CMS) |
| `src/content.config.ts` | Content schema: what fields a page has |
| `.pages.yml` | Pages CMS editor config: keep in sync with the schema |
| `src/layouts/Base.astro` | Shared `<head>`, header/nav, footer |
| `src/pages/` | Routes. `[slug].astro` turns each content file into `/<name>/` |
| `src/pages/contact.astro` | Contact form (Netlify Forms) |
| `public/` | Static files served as-is. `public/images/` holds CMS uploads |

## One-time setup

1. **GitHub**: push this repo.
2. **Netlify**: *Add new site → Import from Git* → pick the repo. Build settings come from `netlify.toml`.
3. **Forms**: in Netlify, *Forms → Enable form detection*, then redeploy. Add an email notification under *Forms → Form notifications*.
4. **Pages CMS**: sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub, open the repo, and invite editors by email under *Collaborators*.

For how editors use it, see [EDITING.md](EDITING.md).
