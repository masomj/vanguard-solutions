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
        class="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden flex flex-col"
        :aria-label="t('nav.mobileNavigation')"
        @keydown.escape="$emit('close')"
      >
        <div class="flex items-center justify-between p-4 border-b border-border shrink-0">
          <span class="font-bold text-primary text-lg">{{ t('nav.menu') }}</span>
          <button
            ref="closeButtonRef"
            class="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface transition-colors"
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
                  class="block px-4 py-3 rounded-md text-text-primary hover:text-primary hover:bg-surface transition-colors no-underline font-medium"
                  active-class="text-primary bg-surface"
                  @click="$emit('close')"
                >
                  {{ entry.label }}
                </router-link>
              </li>

              <li v-else class="mt-3 first:mt-0">
                <h2
                  :id="`mobile-group-${entry.id}`"
                  class="px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-text-secondary"
                >
                  {{ entry.label }}
                </h2>
                <ul class="flex flex-col gap-1 list-none m-0 p-0" :aria-labelledby="`mobile-group-${entry.id}`">
                  <li v-for="item in entry.items" :key="item.to">
                    <router-link
                      :to="item.to"
                      class="block px-4 py-2.5 rounded-md text-text-primary hover:text-primary hover:bg-surface transition-colors no-underline"
                      active-class="text-primary bg-surface font-semibold"
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
            :to="localePath('/contact')"
            class="block w-full text-center px-5 py-3 bg-accent hover:bg-accent-light text-white rounded-md no-underline font-semibold transition-colors mb-3"
            @click="$emit('close')"
          >
            {{ t('nav.getQuote') }}
          </router-link>

          <router-link
            :to="alternatePath"
            :hreflang="otherLocale"
            class="block w-full text-center px-5 py-3 border border-border text-text-secondary hover:text-primary hover:bg-surface rounded-md font-semibold transition-colors no-underline"
            :aria-label="t('language.switchLabel')"
            @click="onSwitchLocale"
          >
            <span :lang="otherLocale">{{ localeToggleLabel }}</span>
          </router-link>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '../../composables/useLocale'
import type { NavEntry } from '../../types'

defineProps<{
  open: boolean
  navEntries: NavEntry[]
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const { locale, otherLocale, alternatePath, localePath, rememberChoice } = useLocale()

const closeButtonRef = ref<HTMLButtonElement | null>(null)

// See SiteHeader: the label is always in the language being switched *to*.
const localeToggleLabel = computed(() => (locale.value === 'en'
  ? t('language.switchToWelsh')
  : t('language.switchToEnglish')))

function onSwitchLocale() {
  rememberChoice()
  emit('close')
}

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
