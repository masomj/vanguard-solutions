// Generates public-facing sitemap.xml from what was ACTUALLY prerendered.
//
// Walking the build output rather than a hand-kept list means a new page can
// never be silently missing from the sitemap: if vite-ssg rendered it, it is
// in here. Adding a route requires no change to this file.

import { mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ORIGIN = 'https://vanguarddigitalsolutions.co.uk'

/** Priority and change frequency per path. Anything unlisted
 *  falls back to DEFAULT_RANK, so a new page still gets a sane entry. */
const RANKS = {
  '/': { priority: '1.0', changefreq: 'monthly' },
  '/services': { priority: '0.9', changefreq: 'monthly' },
  '/small-business': { priority: '0.9', changefreq: 'monthly' },
  '/pricing': { priority: '0.9', changefreq: 'monthly' },
  '/services/ecommerce': { priority: '0.9', changefreq: 'monthly' },
  '/services/booking-systems': { priority: '0.9', changefreq: 'monthly' },
  '/services/business-website': { priority: '0.9', changefreq: 'monthly' },
  '/services/bespoke-software': { priority: '0.8', changefreq: 'monthly' },
  '/portfolio': { priority: '0.8', changefreq: 'monthly' },
  '/technology': { priority: '0.8', changefreq: 'monthly' },
  '/process': { priority: '0.8', changefreq: 'monthly' },
  '/contact': { priority: '0.7', changefreq: 'yearly' },
  '/about': { priority: '0.6', changefreq: 'yearly' },
  '/cookie-policy': { priority: '0.2', changefreq: 'yearly' },
}
const DEFAULT_RANK = { priority: '0.5', changefreq: 'monthly' }

// Paths rendered with `noindex` (see router meta) should not be offered to
// crawlers via the sitemap either. Keep this in sync with the router --
// add an entry here in the same change that adds a route's `noindex: true`,
// and remove it again when that flag comes off.
const EXCLUDED_FROM_SITEMAP = new Set([])

function findRoutes(dir, base = '') {
  const routes = []

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)

    if (statSync(full).isDirectory()) {
      routes.push(...findRoutes(full, `${base}/${entry}`))
    } else if (entry === 'index.html') {
      routes.push(base || '/')
    }
  }

  return routes
}

/**
 * The Welsh tree (/cy/...) was removed in the 2026 redesign. GitHub Pages
 * cannot send server redirects, so write a small page at every old /cy path
 * that points crawlers (canonical) and visitors (meta refresh) at the English
 * page. Without these, every indexed Welsh URL would become a 404.
 */
function writeLegacyWelshRedirects(dist, paths) {
  let count = 0
  for (const path of paths) {
    const legacy = path === '/' ? '/cy' : `/cy${path}`
    const target = `${ORIGIN}${path}`
    const dir = join(dist, legacy)
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      join(dir, 'index.html'),
      `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>Moved</title>` +
        `<link rel="canonical" href="${target}"><meta name="robots" content="noindex, follow">` +
        `<meta http-equiv="refresh" content="0; url=${target}"></head>` +
        `<body><p>This page has moved to <a href="${target}">${target}</a>.</p></body></html>\n`,
      'utf8'
    )
    count += 1
  }
  return count
}

export function generateSitemap(outDir = 'dist') {
  const dist = resolve(outDir)

  // Assets directories contain no index.html, so anything left is a real page.
  const paths = findRoutes(dist)
    .filter((path) => !EXCLUDED_FROM_SITEMAP.has(path))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

  const urls = paths.map((path) => {
    const rank = RANKS[path] ?? DEFAULT_RANK
    return `  <url>
    <loc>${ORIGIN}${path}</loc>
    <changefreq>${rank.changefreq}</changefreq>
    <priority>${rank.priority}</priority>
  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

  writeFileSync(join(dist, 'sitemap.xml'), xml, 'utf8')
  const redirects = writeLegacyWelshRedirects(dist, paths)
  return { pages: paths.length, urls: urls.length, redirects }
}
