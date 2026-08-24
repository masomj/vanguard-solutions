import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { useI18n } from 'vue-i18n'
import type { ContactFormData, FormErrors, FormStatus } from '../types'
import { trackEvent } from './useAnalytics'

const SERVICE_ID = 'service_cw3aocj'
const TEMPLATE_ID = 'template_wn5byer'

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
  website: '',
}

// Stable machine values go to analytics; the human label goes in the email, so
// the notification reads the same way the enquirer saw the form.
const PROJECT_TYPE_LABELS: Record<string, string> = {
  'small-business': 'contactForm.optionSmallBusiness',
  ecommerce: 'contactForm.optionEcommerce',
  booking: 'contactForm.optionBooking',
  bespoke: 'contactForm.optionBespoke',
  support: 'contactForm.optionSupport',
  other: 'contactForm.optionOther',
}

const BUDGET_LABELS: Record<string, string> = {
  'under-650': 'contactForm.budgetUnder650',
  '650-1250': 'contactForm.budget650to1250',
  '1250-3000': 'contactForm.budget1250to3000',
  'over-3000': 'contactForm.budgetOver3000',
  unsure: 'contactForm.budgetUnsure',
}

const TIMELINE_LABELS: Record<string, string> = {
  asap: 'contactForm.timelineAsap',
  '1-3-months': 'contactForm.timeline1to3',
  flexible: 'contactForm.timelineFlexible',
  exploring: 'contactForm.timelineExploring',
}

export function useContactForm() {
  const { t, locale } = useI18n()

  const form = reactive<ContactFormData>({ ...EMPTY_FORM })

  const errors = reactive<FormErrors>({})
  const status = ref<FormStatus>('idle')
  const statusMessage = ref('')

  function label(map: Record<string, string>, value: string): string {
    const key = map[value]
    return key ? t(key) : ''
  }

  function clearErrors() {
    errors.name = undefined
    errors.email = undefined
    errors.projectType = undefined
    errors.budget = undefined
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
    if (!form.budget) {
      errors.budget = t('contactForm.validationBudget')
    }
    if (!form.message || form.message.trim().length < 10) {
      errors.message = t('contactForm.validationMessage')
    }

    return !errors.name && !errors.email && !errors.projectType && !errors.budget && !errors.message
  }

  // Returns false when validation blocked the send, so the caller can move
  // focus to the error summary.
  async function submit(): Promise<boolean> {
    if (!validate()) {
      status.value = 'idle'
      statusMessage.value = ''
      return false
    }

    // Honeypot. The field is off-screen and hidden from assistive tech, so a
    // real person cannot fill it. Report success rather than an error: a bot
    // that is told it failed simply retries.
    if (form.website.trim()) {
      status.value = 'success'
      statusMessage.value = t('contactForm.statusSuccess')
      Object.assign(form, EMPTY_FORM)
      return true
    }

    status.value = 'submitting'

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        fullName: form.name,
        name: form.name,
        email: form.email,
        orgName: form.company,
        phoneNumber: form.phone,
        projectType: label(PROJECT_TYPE_LABELS, form.projectType),
        budget: label(BUDGET_LABELS, form.budget),
        timeline: form.timeline ? label(TIMELINE_LABELS, form.timeline) : '',
        message: form.message,
        localeName: locale.value === 'cy' ? 'Cymraeg' : 'English',
        time: new Date().toLocaleString(locale.value === 'cy' ? 'cy-GB' : 'en-GB', {
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      })
      status.value = 'success'
      statusMessage.value = t('contactForm.statusSuccess')
      trackEvent('generate_lead', {
        project_type: form.projectType,
        budget_band: form.budget,
        timeline: form.timeline || 'not_given',
        locale: locale.value,
      })
      Object.assign(form, EMPTY_FORM)
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
