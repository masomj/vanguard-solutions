<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="open"
        class="fixed inset-0 bg-black/40 z-50 lg:hidden"
        aria-hidden="true"
        @click="$emit('close')"
      />
    </Transition>

    <Transition name="slide">
      <nav
        v-if="open"
        id="mobile-menu"
        class="fixed top-0 right-0 bottom-0 w-80 max-w-[88vw] bg-paper border-l border-ink z-50 lg:hidden flex flex-col"
        :aria-label="t('nav.mobileNavigation')"
        @keydown.escape="$emit('close')"
      >
        <div class="flex items-center justify-between p-4 border-b border-border shrink-0">
          <span class="label text-text-secondary">{{ t('nav.menu') }}</span>
          <button
            ref="closeButtonRef"
            class="inline-flex items-center justify-center w-11 h-11 border border-ink text-ink bg-transparent cursor-pointer"
            :aria-label="t('nav.closeNavigationMenu')"
            @click="$emit('close')"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!--
          Groups render as labelled sections rather than collapsible accordions.
          The whole tree is eleven links; hiding them behind more taps would add
          interaction cost and a second keyboard trap for no gain.
        -->
        <div class="flex-1 overflow-y-auto p-4">
          <ul class="flex flex-col gap-1 list-none m-0 p-0">
            <template v-for="entry in navEntries" :key="entry.id">
              <li v-if="entry.kind === 'link'">
                <router-link
                  :to="entry.to"
                  class="block px-1 py-3 text-ink no-underline font-semibold text-lg border-b border-border"
                  active-class="text-accent"
                  @click="$emit('close')"
                >
                  {{ entry.label }}
                </router-link>
              </li>

              <li v-else class="mt-3 first:mt-0">
                <h2
                  :id="`mobile-group-${entry.id}`"
                  class="label px-1 pt-4 pb-1 text-text-secondary font-normal"
                >
                  {{ entry.label }}
                </h2>
                <ul class="flex flex-col gap-1 list-none m-0 p-0" :aria-labelledby="`mobile-group-${entry.id}`">
                  <li v-for="item in entry.items" :key="item.to">
                    <router-link
                      :to="item.to"
                      class="block px-1 py-2.5 text-ink no-underline border-b border-border"
                      active-class="text-accent font-semibold"
                      @click="$emit('close')"
                    >
                      {{ item.label }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </div>

        <div class="p-4 border-t border-border shrink-0">
          <router-link
            :to="'/contact'"
            class="flex items-center justify-center w-full min-h-12 px-5 bg-signal hover:bg-signal-dark text-ink no-underline font-semibold transition-colors"
            @click="$emit('close')"
          >
            {{ t('nav.getQuote') }}
          </router-link>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NavEntry } from '../../types'

defineProps<{
  open: boolean
  navEntries: NavEntry[]
}>()

defineEmits<{
  close: []
}>()

const { t } = useI18n()
const closeButtonRef = ref<HTMLButtonElement | null>(null)

watch(() => closeButtonRef.value, async (btn) => {
  if (btn) {
    await nextTick()
    btn.focus()
  }
})
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .overlay-enter-active,
  .overlay-leave-active,
  .slide-enter-active,
  .slide-leave-active {
    transition: none;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: none;
  }
}
</style>
