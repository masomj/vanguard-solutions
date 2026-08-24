<template>
  <div class="mb-5">
    <label :for="fieldId" class="block text-sm font-medium text-text-primary mb-1.5">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true"> *</span>
    </label>
    <!-- Guidance sits under the label, never in the placeholder: placeholder
         text disappears on focus and is skipped by some screen readers. -->
    <p v-if="hint" :id="hintId" class="text-sm text-text-secondary mb-1.5 leading-relaxed">
      {{ hint }}
    </p>
    <slot :id="fieldId" :aria-attrs="ariaAttrs" />
    <!-- No role="alert" here: the error summary above the form carries the
         announcement. Four competing live regions announced unpredictably. -->
    <p
      v-if="error"
      :id="errorId"
      class="mt-1.5 text-sm text-error"
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
