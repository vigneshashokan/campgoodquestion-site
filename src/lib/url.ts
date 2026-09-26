// Prefixes a root-relative path with the deploy base, e.g. "/camp/" → "/campgoodquestion-site/camp/"
// on GitHub Pages. Locally and on Netlify the base is "/", so paths are unchanged.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path: string) => base + path;
