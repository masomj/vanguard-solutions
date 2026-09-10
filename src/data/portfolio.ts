import type { PortfolioItem } from '../types'

/**
 * Case studies. Copy (title, client, status, summary, description, features)
 * lives in `portfolioItems.<slug>.*` in en.json/cy.json -- this file only
 * holds the structural facts that aren't translated: the slug used in the
 * URL and the i18n namespace, the tech list (tool/framework names, not
 * copy), the external link, and the hero image path (null until a real
 * screenshot exists -- never a fabricated one).
 */
export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'intercopy',
    tech: [
      '.NET 10',
      'ASP.NET Core',
      'EF Core',
      'PostgreSQL',
      'Nuxt 4',
      'Vue 3',
      'TypeScript',
      'Keycloak (OIDC)',
      'Figma Plugin API',
      'Docker',
      'GitHub Actions',
    ],
    externalLink: 'https://intercopy.co.uk',
    heroImage: null,
  },
]
