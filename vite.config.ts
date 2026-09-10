import { defineConfig } from 'vite'
// @ts-expect-error -- plain .mjs build helper, no types needed
import { generateSitemap } from './scripts/generate-sitemap.mjs'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type { ViteSSGOptions } from 'vite-ssg'
import { portfolioItems } from './src/data/portfolio'
import { localePrefixes, supportedLocales } from './src/i18n/locales'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    strictPort: false,
  },
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    includedRoutes(paths: string[]) {
      // Both locale trees are mostly static routes, so they arrive here
      // already enumerated (/, /about, ... and /cy, /cy/about, ...). Routes
      // with a param (the catch-all 404) have no concrete path to render,
      // so exclude any path still carrying a ':' segment.
      const staticPaths = paths.filter(path => !path.includes(':'))

      // /portfolio/:slug is param-driven rather than one route per project
      // (see CONTRIBUTING.md), so vite-ssg never sees it as a concrete path
      // on its own. Expand it here from the actual data, in both locales --
      // add a portfolio item and it is prerendered automatically.
      const portfolioDetailPaths = supportedLocales.flatMap((locale) =>
        portfolioItems.map((item) => `${localePrefixes[locale]}/portfolio/${item.slug}`)
      )

      return [...staticPaths, ...portfolioDetailPaths]
    },
    // Sitemap is generated from the rendered output, not a hand-kept list, so
    // a new route can never be silently missing from it.
    onFinished() {
      const { pages, urls } = generateSitemap('dist')
      console.log(`[sitemap] ${urls} URLs across ${pages} pages -> dist/sitemap.xml`)
    },
  } satisfies ViteSSGOptions,
})
