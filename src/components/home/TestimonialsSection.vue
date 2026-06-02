<template>
  <section class="py-16 lg:py-20 bg-surface" aria-labelledby="testimonials-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading subtitle="What our clients say about working with Vanguard Digital Solutions.">
        Client Feedback
      </SectionHeading>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <blockquote v-for="item in testimonials" :key="item.name"
          class="rounded-2xl border border-border bg-white p-6 flex flex-col gap-4">
          <div class="flex gap-1 text-amber-400" aria-label="5 star rating">
            <span v-for="n in 5" :key="n" aria-hidden="true">★</span>
          </div>
          <p class="text-text-light text-sm leading-relaxed flex-1">&ldquo;{{ item.quote }}&rdquo;</p>
          <footer class="mt-2">
            <p class="font-semibold text-text text-sm">{{ item.name }}</p>
            <p class="text-text-light text-xs">{{ item.business }}</p>
          </footer>
        </blockquote>
      </div>

      <p class="mt-8 text-center text-text-light text-sm">
        More reviews coming soon. We&rsquo;re just getting started &mdash; <a href="/contact" class="text-primary underline underline-offset-2">become one of our first clients</a>.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '../shared/SectionHeading.vue'

// Placeholder — replace with real testimonials as they come in
const testimonials = [
  {
    quote: 'Vanguard built our booking site from scratch. It looks great, loads fast, and clients love using it.',
    name: 'Sarah T.',
    business: 'Beauty Salon, Bridgend',
  },
  {
    quote: 'Straightforward to deal with. No jargon, fair pricing, and they delivered exactly what we asked for.',
    name: 'James R.',
    business: 'Local Tradesperson, Cardiff',
  },
  {
    quote: 'Our new eCommerce site has made a real difference to our online sales. Highly recommend.',
    name: 'Emma L.',
    business: 'Small Retailer, Swansea',
  },
]
</script>
