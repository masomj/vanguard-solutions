<template>
  <form @submit.prevent="onSubmit" aria-labelledby="contact-form-heading" novalidate class="relative space-y-1">
    <h2 id="contact-form-heading" class="text-2xl font-bold text-text-primary mb-2">{{ t('contactForm.heading') }}</h2>
    <p class="text-text-secondary mb-6 leading-relaxed">{{ t('contactForm.intro') }}</p>

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

      <FormField field-id="phone" :label="t('contactForm.phone')" :hint="t('contactForm.phoneHint')">
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
          <option value="small-business">{{ t('contactForm.optionSmallBusiness') }}</option>
          <option value="ecommerce">{{ t('contactForm.optionEcommerce') }}</option>
          <option value="booking">{{ t('contactForm.optionBooking') }}</option>
          <option value="bespoke">{{ t('contactForm.optionBespoke') }}</option>
          <option value="support">{{ t('contactForm.optionSupport') }}</option>
          <option value="other">{{ t('contactForm.optionOther') }}</option>
        </select>
      </template>
    </FormField>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      <FormField
        field-id="budget"
        :label="t('contactForm.budget')"
        :hint="t('contactForm.budgetHint')"
        required
        :error="errors.budget"
      >
        <template #default="{ id, ariaAttrs }">
          <select
            :id="id"
            v-model="form.budget"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary focus:border-primary transition-colors"
          >
            <option value="" disabled>{{ t('contactForm.budgetPlaceholder') }}</option>
            <option value="under-650">{{ t('contactForm.budgetUnder650') }}</option>
            <option value="650-1250">{{ t('contactForm.budget650to1250') }}</option>
            <option value="1250-3000">{{ t('contactForm.budget1250to3000') }}</option>
            <option value="over-3000">{{ t('contactForm.budgetOver3000') }}</option>
            <option value="unsure">{{ t('contactForm.budgetUnsure') }}</option>
          </select>
        </template>
      </FormField>

      <FormField field-id="timeline" :label="t('contactForm.timeline')" :hint="t('contactForm.timelineHint')">
        <template #default="{ id, ariaAttrs }">
          <select
            :id="id"
            v-model="form.timeline"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary focus:border-primary transition-colors"
          >
            <option value="">{{ t('contactForm.timelinePlaceholder') }}</option>
            <option value="asap">{{ t('contactForm.timelineAsap') }}</option>
            <option value="1-3-months">{{ t('contactForm.timeline1to3') }}</option>
            <option value="flexible">{{ t('contactForm.timelineFlexible') }}</option>
            <option value="exploring">{{ t('contactForm.timelineExploring') }}</option>
          </select>
        </template>
      </FormField>
    </div>

    <FormField
      field-id="message"
      :label="t('contactForm.message')"
      :hint="t('contactForm.messageHint')"
      required
      :error="errors.message"
    >
      <template #default="{ id, ariaAttrs }">
        <textarea
          :id="id"
          v-model="form.message"
          rows="5"
          v-bind="ariaAttrs"
          class="w-full px-4 py-2.5 border border-border-strong rounded-md bg-white text-text-primary placeholder:text-text-secondary focus:border-primary transition-colors resize-y"
        />
      </template>
    </FormField>

    <!-- Honeypot. Moved off-screen rather than display:none, which more bots
         detect and skip. aria-hidden and tabindex="-1" keep it away from
         screen reader and keyboard users, so only a bot can fill it. -->
    <div class="absolute w-px h-px overflow-hidden" style="left: -9999px" aria-hidden="true">
      <label for="website">Website</label>
      <input
        id="website"
        v-model="form.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <BaseButton type="submit" variant="accent" size="lg" :disabled="status === 'submitting'" class="w-full sm:w-auto shrink-0">
        {{ status === 'submitting' ? t('contactForm.sending') : t('contactForm.send') }}
      </BaseButton>
      <p class="text-sm text-text-secondary leading-relaxed m-0">{{ t('contactForm.replyPromise') }}</p>
    </div>

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
const FIELD_ORDER = ['name', 'email', 'projectType', 'budget', 'message'] as const

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
