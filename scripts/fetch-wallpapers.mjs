// Pulls a random, SFW, theme-matched wallpaper pool from wallhaven.cc into wallpapers.json.
// wallhaven's API sends no CORS headers, so the browser can't query it directly; the site
// instead picks a random entry from this pool on every load / theme change and hotlinks the image.
//
// Run locally:  node scripts/fetch-wallpapers.mjs      (Node 18+)
// Runs daily in CI via .github/workflows/wallpapers.yml so the pool keeps changing.
import { writeFile } from 'node:fs/promises';

// wallhaven only accepts colours from its own palette (see the colour picker on wallhaven.cc/search)
const THEMES = {
  matrix: [{ colors: '336600' }, { colors: '669900' }],
  amber: [{ colors: 'ff9900' }, { colors: 'cc6633' }],
  vampire: [{ colors: '663399' }, { colors: '993399' }],
  arctic: [{ colors: '0066cc' }, { colors: '66cccc' }],
  retro: [{ colors: '666600' }, { colors: '996633' }],
  cyberpunk: [{ colors: 'ea4c88' }, { q: 'cyberpunk' }],
};
const MAX_BYTES = 8_000_000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(params) {
  const qs = new URLSearchParams({
    sorting: 'random', purity: '100', categories: '110', atleast: '1920x1080', ratios: 'landscape', ...params,
  });
  const res = await fetch(`https://wallhaven.cc/api/v1/search?${qs}`, { headers: { 'User-Agent': 'portfolio-wallpaper-sync' } });
  if (!res.ok) throw new Error(`wallhaven ${res.status} for ${qs}`);
  return (await res.json()).data;
}

const out = {};
for (const [theme, queries] of Object.entries(THEMES)) {
  const pool = new Map();
  for (const q of queries) {
    for (const w of await search(q)) {
      if (w.purity !== 'sfw' || w.file_size > MAX_BYTES) continue;
      pool.set(w.id, { id: w.id, full: w.path, thumb: w.thumbs.large, page: w.short_url, res: w.resolution });
    }
    await sleep(1500); // stay well under the 45 req/min limit
  }
  out[theme] = [...pool.values()];
  console.log(`${theme.padEnd(10)} ${out[theme].length} wallpapers`);
}

await writeFile(new URL('../wallpapers.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
