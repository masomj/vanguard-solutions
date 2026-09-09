<template>
  <div :class="paired ? 'mb-5 sm:mb-0 sm:contents' : 'mb-5'">
    <label :for="fieldId" class="block text-sm font-medium text-text-primary mb-1.5" :class="{ 'sm:row-start-1': paired }">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true"> *</span>
    </label>
    <!-- Guidance sits under the label, never in the placeholder: placeholder
         text disappears on focus and is skipped by some screen readers. -->
    <p v-if="hint" :id="hintId" class="text-sm text-text-secondary mb-1.5 leading-relaxed" :class="{ 'sm:row-start-2': paired }">
      {{ hint }}
    </p>
    <!-- Own grid row so paired fields' inputs align even when one field's
         hint is a different height (or absent) from the field beside it. -->
    <div :class="{ 'sm:row-start-3': paired }">
      <slot :id="fieldId" :aria-attrs="ariaAttrs" />
    </div>
    <!-- No role="alert" here: the error summary above the form carries the
         announcement. Four competing live regions announced unpredictably. -->
    <p
      v-if="error"
      :id="errorId"
      class="mt-1.5 text-sm text-error"
      :class="{ 'sm:row-start-4': paired }"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fieldId: string
  label: string
  hint?: string
  required?: boolean
  error?: string
  // When true, this field sits in a two-column row with a sibling FormField.
  // The root becomes `contents` so label/hint/input/error each land in their
  // own explicit grid row on the parent grid, keeping inputs aligned across
  // columns regardless of hint length differences between the two fields.
  paired?: boolean
}>()

const errorId = computed(() => `${props.fieldId}-error`)
const hintId = computed(() => `${props.fieldId}-hint`)

// Hint and error are both announced, in reading order, when both are present.
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint) ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})

const ariaAttrs = computed(() => ({
  'aria-required': props.required || undefined,
  'aria-invalid': props.error ? true : undefined,
  'aria-describedby': describedBy.value,
}))
</script>
