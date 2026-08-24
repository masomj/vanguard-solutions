import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { useI18n } from 'vue-i18n'
import type { ContactFormData, FormErrors, FormStatus } from '../types'
import { trackEvent } from './useAnalytics'

const SERVICE_ID = 'service_cw3aocj'
const TEMPLATE_ID = 'template_wn5byer'

export function useContactForm() {
  const { t, locale } = useI18n()

  const form = reactive<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const errors = reactive<FormErrors>({})
  const status = ref<FormStatus>('idle')
  const statusMessage = ref('')

  function clearErrors() {
    errors.name = undefined
    errors.email = undefined
    errors.projectType = undefined
    errors.message = undefined
  }

  function validate(): boolean {
    clearErrors()

    if (!form.name || form.name.trim().length < 2) {
      errors.name = t('contactForm.validationName')
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('contactForm.validationEmail')
    }
    if (!form.projectType) {
      errors.projectType = t('contactForm.validationProjectType')
    }
    if (!form.message || form.message.trim().length < 10) {
      errors.message = t('contactForm.validationMessage')
    }

    return !errors.name && !errors.email && !errors.projectType && !errors.message
  }

  // Returns false when validation blocked the send, so the caller can move
  // focus to the error summary.
  async function submit(): Promise<boolean> {
    if (!validate()) {
      status.value = 'idle'
      statusMessage.value = ''
      return false
    }

    status.value = 'submitting'

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        fullName: form.name,
        name: form.name,
        email: form.email,
        orgName: form.company,
        phoneNumber: form.phone,
        projectType: form.projectType,
        message: form.message,
        time: new Date().toLocaleString(locale.value === 'cy' ? 'cy-GB' : 'en-GB', {
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      })
      status.value = 'success'
      statusMessage.value = t('contactForm.statusSuccess')
      trackEvent('generate_lead', { project_type: form.projectType, locale: locale.value })
      Object.assign(form, { name: '', email: '', company: '', phone: '', projectType: '', message: '' })
    } catch {
      status.value = 'error'
      statusMessage.value = t('contactForm.statusError')
      trackEvent('form_error')
    }

    return true
  }

  function resetStatus() {
    status.value = 'idle'
    statusMessage.value = ''
  }

  return { form, errors, status, statusMessage, submit, resetStatus }
}
