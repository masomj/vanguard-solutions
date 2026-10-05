<template>
  <section class="py-20 lg:py-28 border-t border-border" aria-labelledby="standards-heading">
    <div class="wrap">
      <div class="flex flex-wrap justify-between items-end gap-6 mb-10">
        <div class="max-w-3xl">
          <p class="label text-accent mb-4">{{ t('home.standards.kicker') }}</p>
          <h2 id="standards-heading" class="text-5xl sm:text-6xl mb-5">{{ t('home.standards.heading') }}</h2>
          <p class="text-ink-soft m-0">{{ t('home.standards.body') }}</p>
        </div>
        <router-link to="/about" class="font-semibold text-ink">{{ t('home.standards.link') }}</router-link>
      </div>

      <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        <li v-for="item in items" :key="item.title" class="py-8 border-t border-border">
          <h3 class="text-xl mt-0 mb-2">{{ item.title }}</h3>
          <p class="text-[0.9375rem] text-ink-soft m-0">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const items = computed(() => tm('home.standards.items') as { title: string; description: string }[])
</script>
