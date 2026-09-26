# campgoodquestion-site

Website for Camp Good Question (Burning Man theme camp). Static [Astro](https://docs.astro.build) site, hosted on Netlify, content edited through [Pages CMS](https://pagescms.org).

## Develop

Requires Node 22.12+ (`nvm use` picks it up from `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the build
npm run check     # type-check .astro/.ts files
npm test          # unit tests (map geometry)
```

The contact form only submits on Netlify. Locally it shows its "something went wrong" message, which is expected.

## Where things live

| Path | What |
|---|---|
| `src/content/*.yml` | All site text, one file per page plus `settings.yml` (edited via Pages CMS) |
| `src/content.config.ts` | Content schema: what fields each file has. A bad edit fails the build instead of breaking the site |
| `.pages.yml` | Pages CMS editor config: keep in sync with the schema |
| `src/layouts/Base.astro` | Shared `<head>`, header/nav |
| `src/pages/` | One route per page: home, camp, history, about, join, contact (+ thanks, 404) |
| `src/components/BrcMap.astro`, `src/lib/brc.ts` | Black Rock City map; pins are computed from a year's address (e.g. 4:15 & E) |
| `src/scripts/tabs.ts` | Tiny tab switcher used by the dues and FAQ sections |
| `public/` | Static files served as-is. `public/images/` holds CMS uploads |

## Hosting

**Now (proof of concept): GitHub Pages** at https://vigneshashokan.github.io/campgoodquestion-site/.
`.github/workflows/deploy.yml` builds and publishes on every push to `main`, including Pages CMS saves.
The site lives under a subfolder there, so links and images go through `url()` in `src/lib/url.ts`.
There's no form backend on GitHub Pages, so the contact form opens the visitor's email app, addressed to the camp email.

**Later: Netlify.** Follow the setup below. No code changes are needed: builds on Netlify serve the site at `/`,
and the contact form switches to Netlify Forms automatically (`NETLIFY` is set during Netlify builds).
Then disable the GitHub Pages workflow.

## One-time setup (Netlify)

1. **GitHub**: push this repo.
2. **Netlify**: *Add new site → Import from Git* → pick the repo. Build settings come from `netlify.toml`.
3. **Forms**: in Netlify, *Forms → Enable form detection*, then redeploy. Add an email notification under *Forms → Form notifications*.
4. **Pages CMS**: sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub, open the repo, and invite editors by email under *Collaborators*.

For how editors use it, see [EDITING.md](EDITING.md).
