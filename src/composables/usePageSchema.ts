import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'

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
