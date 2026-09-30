# campgoodquestion-site

Website for Good Question (Burning Man theme camp), live at https://goodquestion.camp. Static [Astro](https://docs.astro.build) site, hosted on GitHub Pages, content edited through [Pages CMS](https://pagescms.org).

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

Outside Netlify (locally and on GitHub Pages) the contact form hands off to the visitor's email app instead of submitting.

## Where things live

| Path | What |
|---|---|
| `src/content/*.yml` | All site text, one file per page plus `settings.yml` (edited via Pages CMS) |
| `src/content.config.ts` | Content schema: what fields each file has. A bad edit fails the build instead of breaking the site |
| `.pages.yml` | Pages CMS editor config: keep in sync with the schema |
| `src/layouts/Base.astro` | Shared `<head>`, header/nav |
| `src/pages/` | One route per page: home, camp, about, our-code, join, contact (+ thanks, 404) |
| `src/components/BrcMap.astro`, `src/lib/brc.ts` | Black Rock City map; pins are computed from a year's address (e.g. 4:15 & E) |
| `src/scripts/tabs.ts` | Tiny tab switcher used by the dues and FAQ sections |
| `public/` | Static files served as-is. `public/images/` holds CMS uploads |

## Hosting

**Now: GitHub Pages** at https://goodquestion.camp (custom domain set in the repo's *Settings → Pages*; DNS at Porkbun).
`.github/workflows/deploy.yml` tests, builds, and publishes on every push to `main`, including Pages CMS saves.
If a save fails the tests or build, nothing is published and the live site keeps its last good version; the failed run shows in the *Actions* tab.
The workflow reads the base path from Pages (`/` today), but links and images still go through `url()` in `src/lib/url.ts` so a subfolder base keeps working.
There's no form backend on GitHub Pages, so the contact form opens the visitor's email app, addressed to the camp email.

**Later: Netlify.** Follow the setup below. No code changes are needed: builds on Netlify serve the site at `/`,
and the contact form switches to Netlify Forms automatically (`NETLIFY` is set during Netlify builds).
Then disable the GitHub Pages workflow.

## Pages CMS setup

Sign in at [app.pagescms.org](https://app.pagescms.org) with GitHub, install the Pages CMS GitHub App on this repo only, open it on `main`, and invite editors by email under *Collaborators* (they don't need a GitHub account).

## One-time setup (Netlify)

1. **Netlify**: *Add new site → Import from Git* → pick the repo. Build settings come from `netlify.toml`.
2. **Forms**: in Netlify, *Forms → Enable form detection*, then redeploy. Add an email notification under *Forms → Form notifications*.
3. **Domain**: add goodquestion.camp in Netlify and point the Porkbun DNS at it.

For how editors use it, see [EDITING.md](EDITING.md).
