<template>
  <form @submit.prevent="onSubmit" aria-labelledby="contact-form-heading" novalidate class="space-y-1">
    <h2 id="contact-form-heading" class="text-2xl font-bold text-text-primary mb-6">{{ t('contactForm.heading') }}</h2>

    <div
      v-if="errorList.length"
      ref="errorSummary"
      tabindex="-1"
      role="alert"
      class="mb-6 p-4 border-2 border-error rounded-md bg-error/5"
    >
      <h3 class="text-lg font-bold text-error mb-1">{{ t('contactForm.errorSummaryHeading') }}</h3>
      <p class="text-sm text-text-primary mb-2">{{ t('contactForm.errorSummaryIntro') }}</p>
      <ul class="list-disc pl-5 m-0 space-y-1">
        <li v-for="item in errorList" :key="item.id" class="text-sm">
          <a :href="`#${item.id}`" class="text-error underline" @click="focusField(item.id, $event)">
            {{ item.message }}
          </a>
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      <FormField field-id="name" :label="t('contactForm.name')" required :error="errors.name">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.name"
            type="text"
            autocomplete="name"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors"
            :placeholder="t('contactForm.placeholderName')"
          />
        </template>
      </FormField>

      <FormField field-id="email" :label="t('contactForm.email')" required :error="errors.email">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.email"
            type="email"
            autocomplete="email"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors"
            :placeholder="t('contactForm.placeholderEmail')"
          />
        </template>
      </FormField>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      <FormField field-id="company" :label="t('contactForm.company')">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.company"
            type="text"
            autocomplete="organization"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors"
            :placeholder="t('contactForm.placeholderCompany')"
          />
        </template>
      </FormField>

      <FormField field-id="phone" :label="t('contactForm.phone')">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors"
            :placeholder="t('contactForm.placeholderPhone')"
          />
        </template>
      </FormField>
    </div>

    <FormField field-id="projectType" :label="t('contactForm.projectType')" required :error="errors.projectType">
      <template #default="{ id, ariaAttrs }">
        <select
          :id="id"
          v-model="form.projectType"
          v-bind="ariaAttrs"
          class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary focus:border-primary transition-colors"
        >
          <option value="" disabled>{{ t('contactForm.projectTypePlaceholder') }}</option>
          <option value="tender">{{ t('contactForm.optionTender') }}</option>
          <option value="development">{{ t('contactForm.optionDevelopment') }}</option>
          <option value="other">{{ t('contactForm.optionOther') }}</option>
        </select>
      </template>
    </FormField>

    <FormField field-id="message" :label="t('contactForm.message')" required :error="errors.message">
      <template #default="{ id, ariaAttrs }">
        <textarea
          :id="id"
          v-model="form.message"
          rows="5"
          v-bind="ariaAttrs"
          class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors resize-y"
          :placeholder="t('contactForm.placeholderMessage')"
        />
      </template>
    </FormField>

    <BaseButton type="submit" variant="accent" size="lg" :disabled="status === 'submitting'" class="w-full sm:w-auto">
      {{ status === 'submitting' ? t('contactForm.sending') : t('contactForm.send') }}
    </BaseButton>

    <div role="status" aria-live="polite" class="mt-4">
      <p v-if="status === 'success'" class="p-4 bg-success/10 text-success rounded-md font-medium">
        {{ statusMessage }}
      </p>
      <p v-if="status === 'error'" class="p-4 bg-error/10 text-error rounded-md font-medium">
        {{ statusMessage }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FormField from './FormField.vue'
import BaseButton from '../shared/BaseButton.vue'
import { useContactForm } from '../../composables/useContactForm'

const { t } = useI18n()
const { form, errors, status, statusMessage, submit } = useContactForm()

const errorSummary = ref<HTMLDivElement | null>(null)

// Visual field order, so the summary reads in the same order as the form.
const FIELD_ORDER = ['name', 'email', 'projectType', 'message'] as const

const errorList = computed(() =>
  FIELD_ORDER
    .filter((field) => errors[field])
    .map((field) => ({ id: field, message: errors[field] as string }))
)

async function onSubmit() {
  const sent = await submit()
  if (sent) return

  await nextTick()
  errorSummary.value?.focus()
}

// focus() rather than the default anchor jump, so the field itself takes focus
// and the browser honours scroll-padding-top under the sticky header.
function focusField(id: string, event: Event) {
  event.preventDefault()
  document.getElementById(id)?.focus()
}
</script>
