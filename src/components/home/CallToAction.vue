<template>
  <section class="py-16 lg:py-24 bg-primary" aria-labelledby="cta-heading">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 id="cta-heading" class="text-3xl sm:text-4xl font-bold text-white mb-4">
        Ready to Win Your Next Tender?
      </h2>
      <p class="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
        Let's discuss how Vanguard Digital Solutions can help you prepare winning bids
        and deliver outstanding software solutions.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton variant="accent" size="lg" to="/contact">
          Get in Touch
        </BaseButton>
        <BaseButton size="lg" to="/services" class="bg-white/10 hover:bg-white/20 text-white border-white/30">
          Explore Services
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../shared/BaseButton.vue'
</script>
