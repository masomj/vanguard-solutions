import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import type { ContactFormData, FormErrors, FormStatus } from '../types'

const SERVICE_ID = 'service_cw3aocj'
const TEMPLATE_ID = 'template_wn5byer'

export function useContactForm() {
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
      errors.name = 'Please enter your full name (at least 2 characters).'
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!form.projectType) {
      errors.projectType = 'Please select a project type.'
    }
    if (!form.message || form.message.trim().length < 10) {
      errors.message = 'Please enter a message (at least 10 characters).'
    }

    return !errors.name && !errors.email && !errors.projectType && !errors.message
  }

  async function submit() {
    if (!validate()) return

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
        time: new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' }),
      })
      status.value = 'success'
      statusMessage.value = 'Thank you! Your message has been sent. We will be in touch shortly.'
      Object.assign(form, { name: '', email: '', company: '', phone: '', projectType: '', message: '' })
    } catch {
      status.value = 'error'
      statusMessage.value = 'Something went wrong. Please try again or email us directly at enquiries@vanguarddigitalsolutions.co.uk.'
    }
  }

  function resetStatus() {
    status.value = 'idle'
    statusMessage.value = ''
  }

  return { form, errors, status, statusMessage, submit, resetStatus }
}
