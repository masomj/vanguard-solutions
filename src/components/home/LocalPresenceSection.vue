<template>
  <section class="py-16 lg:py-24 bg-white" aria-labelledby="local-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 id="local-heading" class="text-3xl sm:text-4xl font-bold text-text mb-4">
          Website Designers in Bridgend &amp; South Wales
        </h2>
        <p class="text-text-light text-lg leading-relaxed">
          Vanguard Digital Solutions is a web design and development company based in <strong>Bridgend, South Wales</strong>.
          We work with businesses across <strong>Cardiff, Swansea, Newport, Neath, Port Talbot</strong>, and the surrounding areas
          to build websites that get found on Google and turn visitors into customers.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div v-for="area in areas" :key="area" class="rounded-xl border border-border bg-surface py-4 px-3">
          <p class="text-sm font-semibold text-text">{{ area }}</p>
        </div>
      </div>

      <div class="mt-12 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center max-w-2xl mx-auto">
        <p class="text-text font-semibold text-lg mb-2">Looking for a web designer near you?</p>
        <p class="text-text-light text-sm mb-6">
          Whether you're in Bridgend town centre or rural Valleys, we'll travel to meet you, or work remotely — whichever suits best.
        </p>
        <BaseButton to="/contact" variant="primary">
          Talk to Us Today
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '../shared/BaseButton.vue'

const areas = [
  'Bridgend', 'Cardiff', 'Swansea', 'Newport',
  'Neath', 'Port Talbot', 'Merthyr Tydfil', 'Rhondda',
  'Pontypridd', 'Barry', 'Vale of Glamorgan', 'Caerphilly',
]
</script>
