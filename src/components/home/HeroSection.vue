<template>
  <section class="relative bg-primary text-white py-20 sm:py-28 lg:py-36">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 mb-6">
          <span aria-hidden="true">&#9679;</span>
          Based in Bridgend &mdash; Serving South Wales &amp; Beyond
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Web Design &amp; Digital Solutions for
          <span class="text-accent-light">South Wales Businesses</span>
        </h1>
        <p class="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
          From affordable small business websites to bespoke digital platforms — Vanguard Digital Solutions
          builds fast, modern, and results-driven sites for businesses across Bridgend, Cardiff, Swansea, and South Wales.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <BaseButton variant="accent" size="lg" to="/contact">
            Get a Free Quote
          </BaseButton>
          <BaseButton variant="secondary" size="lg" to="/services">
            See Our Services
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="absolute inset-0 bg-gradient-to-br from-primary-dark/50 to-transparent pointer-events-none" aria-hidden="true"></div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../shared/BaseButton.vue'
</script>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}
section > div:first-child {
  position: relative;
  z-index: 1;
}
</style>
