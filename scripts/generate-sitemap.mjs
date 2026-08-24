// Generates public-facing sitemap.xml from what was ACTUALLY prerendered.
//
// Walking the build output rather than a hand-kept list means a new page can
// never be silently missing from the sitemap: if vite-ssg rendered it, it is
// in here. Adding a route requires no change to this file.

import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ORIGIN = 'https://vanguarddigitalsolutions.co.uk'
const LOCALE_PREFIXES = { en: '', cy: '/cy' }

/** Priority and change frequency per locale-agnostic path. Anything unlisted
 *  falls back to DEFAULT_RANK, so a new page still gets a sane entry. */
const RANKS = {
  '/': { priority: '1.0', changefreq: 'monthly' },
  '/services': { priority: '0.9', changefreq: 'monthly' },
  '/small-business': { priority: '0.9', changefreq: 'monthly' },
  '/pricing': { priority: '0.9', changefreq: 'monthly' },
  '/technology': { priority: '0.8', changefreq: 'monthly' },
  '/process': { priority: '0.8', changefreq: 'monthly' },
  '/contact': { priority: '0.7', changefreq: 'yearly' },
  '/about': { priority: '0.6', changefreq: 'yearly' },
  '/cookie-policy': { priority: '0.2', changefreq: 'yearly' },
}
const DEFAULT_RANK = { priority: '0.5', changefreq: 'monthly' }

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

function stripLocale(path) {
  for (const prefix of Object.values(LOCALE_PREFIXES)) {
    if (!prefix) continue
    if (path === prefix) return '/'
    if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length) || '/'
  }
  return path
}

function localise(basePath, locale) {
  const prefix = LOCALE_PREFIXES[locale]
  if (!prefix) return basePath
  return basePath === '/' ? prefix : `${prefix}${basePath}`
}

export function generateSitemap(outDir = 'dist') {
  const dist = resolve(outDir)
  const rendered = new Set(findRoutes(dist))

  // Assets directories contain no index.html, so anything left is a real page.
  const basePaths = [...new Set([...rendered].map(stripLocale))].sort((a, b) =>
    a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)
  )

  const urls = basePaths.flatMap((basePath) => {
    const rank = RANKS[basePath] ?? DEFAULT_RANK

    const alternates = Object.keys(LOCALE_PREFIXES)
      .filter((locale) => rendered.has(localise(basePath, locale)))
      .map((locale) => ({ locale, path: localise(basePath, locale) }))

    const links = [
      ...alternates.map(
        ({ locale, path }) =>
          `    <xhtml:link rel="alternate" hreflang="${locale === 'en' ? 'en-GB' : locale}" href="${ORIGIN}${path}"/>`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${localise(basePath, 'en')}"/>`,
    ]

    return alternates.map(
      ({ path }) => `  <url>
    <loc>${ORIGIN}${path === '/' ? '/' : path}</loc>
${links.join('\n')}
    <changefreq>${rank.changefreq}</changefreq>
    <priority>${rank.priority}</priority>
  </url>`
    )
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

  writeFileSync(join(dist, 'sitemap.xml'), xml, 'utf8')
  return { pages: basePaths.length, urls: urls.length }
}
