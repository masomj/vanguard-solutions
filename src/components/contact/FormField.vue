<template>
  <div class="mb-5">
    <label :for="fieldId" class="block text-sm font-medium text-text-primary mb-1.5">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true"> *</span>
    </label>
    <slot :id="fieldId" :aria-attrs="ariaAttrs" />
    <p
      v-if="error"
      :id="errorId"
      role="alert"
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
  required?: boolean
  error?: string
}>()

const errorId = computed(() => `${props.fieldId}-error`)

const ariaAttrs = computed(() => ({
  'aria-required': props.required || undefined,
  'aria-invalid': props.error ? true : undefined,
  'aria-describedby': props.error ? errorId.value : undefined,
}))
</script>
