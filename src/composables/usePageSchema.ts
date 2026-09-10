import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { SITE_ORIGIN } from '../seo/siteSchema'
import type { PortfolioItem } from '../types'

/**
 * Adds page-level JSON-LD on top of the site-wide graph emitted by
 * `useSeoMeta`. Call once per page, from `<script setup>`.
 *
 * Only add schema that matches content actually visible on the page --
 * markup with no on-page equivalent is a structured-data violation.
 */
export function usePageSchema(schema: MaybeRefOrGetter<object | object[]>): void {
  useHead({
    script: computed(() => {
      const value = toValue(schema)
      const blocks = Array.isArray(value) ? value : [value]

      return blocks.map((block, index) => ({
        key: `page-schema-${index}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(block),
      }))
    }),
  })
}

/** Builds a FAQPage block from question/answer pairs already rendered on the page. */
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

/**
 * Builds a CollectionPage block for the portfolio index. `items` is empty
 * until real case studies exist, in which case `mainEntity` is simply
 * omitted -- an empty ItemList would claim entries the page doesn't show.
 * Item titles live in i18n, not on `PortfolioItem`, so only the URL (not a
 * name) is available here -- fine, `ListItem.url` alone is valid schema.
 */
export function collectionPageSchema(name: string, description: string, items: PortfolioItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${SITE_ORIGIN}/portfolio`,
    ...(items.length
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_ORIGIN}/portfolio/${item.slug}`,
            })),
          },
        }
      : {}),
  }
}

/**
 * Builds a CreativeWork block for one portfolio case study. Copy (title,
 * description) is resolved by the caller via i18n and passed in, since
 * `PortfolioItem` itself only carries structural fields.
 */
export function creativeWorkSchema(params: {
  slug: string
  title: string
  description: string
  image: string | null
  tech: string[]
  externalLink: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: params.title,
    description: params.description,
    url: `${SITE_ORIGIN}/portfolio/${params.slug}`,
    ...(params.image ? { image: `${SITE_ORIGIN}${params.image}` } : {}),
    keywords: params.tech.join(', '),
    sameAs: params.externalLink,
  }
}

/** Builds a BreadcrumbList block from an already-resolved Home > ... > page trail. */
export function breadcrumbListSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_ORIGIN}${crumb.path}`,
    })),
  }
}
