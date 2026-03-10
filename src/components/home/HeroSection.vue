<template>
  <section class="relative bg-primary text-white py-20 sm:py-28 lg:py-36">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Delivering Excellence in
          <span class="text-accent-light">Tender Fulfillment</span>
        </h1>
        <p class="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
          Vanguard Digital Solutions partners with government and enterprise clients to deliver
          high-quality software solutions that meet rigorous tender requirements — on time and on budget.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <BaseButton variant="accent" size="lg" to="/contact">
            Request a Quote
          </BaseButton>
          <BaseButton variant="secondary" size="lg" to="/services">
            Our Services
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
