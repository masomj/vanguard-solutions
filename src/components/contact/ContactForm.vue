<template>
  <form @submit.prevent="submit" aria-labelledby="contact-form-heading" novalidate class="space-y-1">
    <h2 id="contact-form-heading" class="text-2xl font-bold text-text-primary mb-6">Send Us a Message</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      <FormField field-id="name" label="Full Name" required :error="errors.name">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.name"
            type="text"
            autocomplete="name"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="John Doe"
          />
        </template>
      </FormField>

      <FormField field-id="email" label="Email Address" required :error="errors.email">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.email"
            type="email"
            autocomplete="email"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="john@example.com"
          />
        </template>
      </FormField>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
      <FormField field-id="company" label="Company / Organisation">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.company"
            type="text"
            autocomplete="organization"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Your company"
          />
        </template>
      </FormField>

      <FormField field-id="phone" label="Phone Number">
        <template #default="{ id, ariaAttrs }">
          <input
            :id="id"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            v-bind="ariaAttrs"
            class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="+27 12 345 6789"
          />
        </template>
      </FormField>
    </div>

    <FormField field-id="projectType" label="Project Type" required :error="errors.projectType">
      <template #default="{ id, ariaAttrs }">
        <select
          :id="id"
          v-model="form.projectType"
          v-bind="ariaAttrs"
          class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="" disabled>Select a project type</option>
          <option value="tender">Tender Response</option>
          <option value="development">Custom Software Development</option>
          <option value="consulting">Consulting</option>
          <option value="integration">Systems Integration</option>
          <option value="other">Other</option>
        </select>
      </template>
    </FormField>

    <FormField field-id="message" label="Message" required :error="errors.message">
      <template #default="{ id, ariaAttrs }">
        <textarea
          :id="id"
          v-model="form.message"
          rows="5"
          v-bind="ariaAttrs"
          class="w-full px-4 py-2.5 border border-border rounded-md bg-white text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-vertical"
          placeholder="Tell us about your project..."
        />
      </template>
    </FormField>

    <BaseButton type="submit" variant="accent" size="lg" :disabled="status === 'submitting'" class="w-full sm:w-auto">
      {{ status === 'submitting' ? 'Sending...' : 'Send Message' }}
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
import FormField from './FormField.vue'
import BaseButton from '../shared/BaseButton.vue'
import { useContactForm } from '../../composables/useContactForm'

const { form, errors, status, statusMessage, submit } = useContactForm()
</script>
