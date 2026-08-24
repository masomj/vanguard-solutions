<template>
  <div
    ref="root"
    class="relative"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
    @focusout="onFocusOut"
  >
    <button
      :id="`${id}-button`"
      ref="buttonRef"
      type="button"
      class="flex items-center gap-1 px-3 py-2 rounded-md transition-colors font-medium text-sm cursor-pointer border-0 bg-transparent"
      :class="active || open
        ? 'text-primary bg-surface'
        : 'text-text-secondary hover:text-primary hover:bg-surface'"
      :aria-expanded="open"
      :aria-controls="`${id}-menu`"
      @click="toggle"
      @keydown.down.prevent="openAndFocusFirst"
      @keydown.escape="close(true)"
    >
      {{ label }}
      <svg
        class="w-3.5 h-3.5 transition-transform duration-150 shrink-0"
        :class="open ? 'rotate-180' : ''"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!--
      v-show, not v-if. The site is statically prerendered, so a v-if menu would
      keep the service sub-page links out of the served HTML entirely and they
      would only exist after hydration. display:none still removes them from the
      tab order and the accessibility tree when closed, but crawlers and AI
      answer engines see the anchors on first request.
    -->
    <Transition name="dropdown">
      <ul
        v-show="open"
        :id="`${id}-menu`"
        ref="menuRef"
        class="absolute left-0 top-full mt-1 min-w-60 bg-white border border-border rounded-lg shadow-lg py-2 list-none m-0 z-50"
        :aria-labelledby="`${id}-button`"
        @keydown.escape="close(true)"
      >
        <li v-for="item in items" :key="item.to">
          <router-link
            :to="item.to"
            class="block px-4 py-2.5 text-sm text-text-primary hover:text-primary hover:bg-surface transition-colors no-underline whitespace-nowrap"
            active-class="text-primary bg-surface font-semibold"
            @click="close(false)"
          >
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  id: string
  label: string
  items: { to: string; label: string }[]
  active?: boolean
  /** Close signal from the parent, e.g. on route change. */
  closeKey?: string
}>()

const root = ref<HTMLDivElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const menuRef = ref<HTMLUListElement | null>(null)
const open = ref(false)

// Hover-to-open is a nicety for mouse users, not the mechanism. Touch devices
// report `hover: none` and would otherwise fire a phantom mouseenter on tap,
// opening and immediately toggling the menu shut again.
function hasFinePointer(): boolean {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function toggle() {
  open.value ? close(true) : (open.value = true)
}

function close(returnFocus: boolean) {
  if (!open.value) return
  open.value = false
  // Only pull focus back for keyboard dismissal. Doing it after a link click
  // would yank focus off the page the user just navigated to.
  if (returnFocus) buttonRef.value?.focus()
}

async function openAndFocusFirst() {
  open.value = true
  await nextTick()
  menuRef.value?.querySelector<HTMLAnchorElement>('a')?.focus()
}

function onPointerEnter() {
  if (hasFinePointer()) open.value = true
}

function onPointerLeave() {
  if (hasFinePointer()) open.value = false
}

// Tabbing out of the group closes it. relatedTarget is the element receiving
// focus; null means focus left the document entirely, which we leave alone.
function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && !root.value?.contains(next)) open.value = false
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false
}

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) document.addEventListener('pointerdown', onDocumentPointerDown)
  else document.removeEventListener('pointerdown', onDocumentPointerDown)
})

watch(() => props.closeKey, () => {
  open.value = false
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('pointerdown', onDocumentPointerDown)
  }
})
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: none;
  }
  .dropdown-enter-from,
  .dropdown-leave-to {
    transform: none;
  }
}
</style>
