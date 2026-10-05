<template>
  <section class="py-20 lg:py-28" :class="background" :aria-labelledby="headingId">
    <div class="wrap grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-10 lg:gap-16">
      <div>
        <p v-if="kicker" class="label text-accent mb-4">{{ kicker }}</p>
        <h2 :id="headingId" class="text-4xl sm:text-5xl mb-5">{{ heading }}</h2>
        <p v-if="subtitle" class="text-ink-soft m-0">{{ subtitle }}</p>
        <p v-if="ctaText" class="mt-6 mb-0">
          <router-link to="/contact" class="font-semibold text-ink">{{ ctaText }}</router-link>
        </p>
      </div>

      <div>
        <details
          v-for="(item, index) in items"
          :key="item.question"
          class="faq-item border-t border-border py-6 last:border-b"
          :open="index === 0"
        >
          <!-- The question is a real heading so it appears in the document
               outline, not just as a disclosure label. -->
          <summary class="cursor-pointer list-none flex justify-between gap-6">
            <h3 class="flex-1 min-w-0 text-lg sm:text-xl font-semibold m-0" style="font-stretch: 100%">{{ item.question }}</h3>
            <span class="faq-marker font-mono text-xl leading-none shrink-0 w-4 text-center" aria-hidden="true">+</span>
          </summary>
          <p class="mt-4 mb-0 text-ink-soft leading-relaxed max-w-2xl">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  items: { question: string; answer: string }[]
  heading: string
  headingId: string
  kicker?: string
  subtitle?: string
  ctaText?: string
  background?: string
}>(), {
  background: 'bg-white border-t border-border',
})
</script>

<style scoped>
summary::-webkit-details-marker {
  display: none;
}
.faq-item[open] .faq-marker {
  transform: rotate(45deg);
}
.faq-marker {
  transition: transform 0.15s ease;
}
</style>
