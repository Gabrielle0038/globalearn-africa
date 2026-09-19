<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Contact — GlobalEarn',
  description: 'Contactez GlobalEarn pour toute question sur nos offres d\'accompagnement vers les études en Europe.'
})

const subjectKeys = ['info', 'technical', 'partnership', 'other']

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  website: '' // honeypot
})

const attachmentFile = ref<File | null>(null)
const fileError = ref('')
const touched = reactive({ firstName: false, lastName: false, email: false, subject: false })
const isSubmitting = ref(false)
const serverError = ref('')
const loadedAt = ref(0)

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

onMounted(() => {
  loadedAt.value = Date.now()
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => ({
  firstName: !form.firstName.trim() ? t('contact.form.errors.required') : '',
  lastName: !form.lastName.trim() ? t('contact.form.errors.required') : '',
  email: !form.email.trim()
    ? t('contact.form.errors.required')
    : !emailRegex.test(form.email)
      ? t('contact.form.errors.email')
      : '',
  subject: !form.subject ? t('contact.form.errors.required') : ''
}))

const isFormValid = computed(() =>
  Object.values(errors.value).every((e) => !e) && !fileError.value
)

function handleFileChange(e: Event) {
  fileError.value = ''
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    attachmentFile.value = null
    return
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    fileError.value = t('contact.form.errors.fileType')
    attachmentFile.value = null
    input.value = ''
    return
  }
  if (file.size > MAX_FILE_SIZE) {
    fileError.value = t('contact.form.errors.fileSize')
    attachmentFile.value = null
    input.value = ''
    return
  }
  attachmentFile.value = file
}

async function handleSubmit() {
  serverError.value = ''
  touched.firstName = true
  touched.lastName = true
  touched.email = true
  touched.subject = true

  if (!isFormValid.value) return

  isSubmitting.value = true

  try {
    const payload = new FormData()
    payload.append('firstName', form.firstName.trim())
    payload.append('lastName', form.lastName.trim())
    payload.append('email', form.email.trim())
    payload.append('subject', form.subject)
    payload.append('message', form.message.trim())
    payload.append('website', form.website)
    payload.append('loadedAt', String(loadedAt.value))
    if (attachmentFile.value) {
      payload.append('attachment', attachmentFile.value)
    }

    await $fetch('/api/contact', { method: 'POST', body: payload })
    await navigateTo('/merci')
  } catch (err: any) {
    serverError.value = err?.data?.statusMessage || t('contact.form.errors.generic')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-cyan/10 blur-[110px] dark:bg-cyan/10" aria-hidden="true" />
      <div class="pointer-events-none absolute -top-10 right-1/5 h-72 w-72 rounded-full bg-accent/15 blur-[100px] dark:bg-accent/10" aria-hidden="true" />
      <div class="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 rounded-full bg-violet/10 blur-[100px] dark:bg-violet/10" aria-hidden="true" />

      <div class="relative mx-auto max-w-4xl px-5 pb-4 pt-16 text-center lg:px-8 lg:pt-24">
        <p class="inline-flex items-center gap-1.5 rounded-full bg-[#FDEEDD] px-4 py-1.5 text-sm font-medium text-[#9A4A05] dark:bg-accent/15 dark:text-accent-light">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" />
          {{ t('nav.contact') }}
        </p>
        <h1 class="mt-5 font-display text-3xl font-semibold text-navy dark:text-white lg:text-4xl">
          {{ t('contact.title') }}
        </h1>
        <p class="mt-4 text-lg text-muted dark:text-muted-dark">
          {{ t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <section class="pb-12 pt-4 lg:pb-16">
      <div class="mx-auto grid max-w-5xl gap-8 px-5 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <form novalidate class="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_16px_48px_rgba(27,45,91,0.08)] dark:border-stroke-dark dark:bg-card-dark dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)] lg:p-8" @submit.prevent="handleSubmit">
          <div
            v-if="serverError"
            class="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            role="alert"
          >
            {{ serverError }}
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="firstName" class="text-sm font-medium text-navy dark:text-white">{{ t('contact.form.firstName') }} *</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                class="mt-1.5 w-full rounded-[10px] border px-4 py-2.5 text-sm text-ink outline-none transition-colors dark:bg-bg-dark dark:text-white"
                :class="touched.firstName && errors.firstName ? 'border-red-400' : 'border-gray-200 focus:border-accent dark:border-stroke-dark dark:focus:border-accent'"
                @blur="touched.firstName = true"
              >
              <p v-if="touched.firstName && errors.firstName" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.firstName }}</p>
            </div>

            <div>
              <label for="lastName" class="text-sm font-medium text-navy dark:text-white">{{ t('contact.form.lastName') }} *</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                class="mt-1.5 w-full rounded-[10px] border px-4 py-2.5 text-sm text-ink outline-none transition-colors dark:bg-bg-dark dark:text-white"
                :class="touched.lastName && errors.lastName ? 'border-red-400' : 'border-gray-200 focus:border-accent dark:border-stroke-dark dark:focus:border-accent'"
                @blur="touched.lastName = true"
              >
              <p v-if="touched.lastName && errors.lastName" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="mt-5">
            <label for="email" class="text-sm font-medium text-navy dark:text-white">{{ t('contact.form.email') }} *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="mt-1.5 w-full rounded-[10px] border px-4 py-2.5 text-sm text-ink outline-none transition-colors dark:bg-bg-dark dark:text-white"
              :class="touched.email && errors.email ? 'border-red-400' : 'border-gray-200 focus:border-accent dark:border-stroke-dark dark:focus:border-accent'"
              @blur="touched.email = true"
            >
            <p v-if="touched.email && errors.email" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.email }}</p>
          </div>

          <div class="mt-5">
            <label for="subject" class="text-sm font-medium text-navy dark:text-white">{{ t('contact.form.subject') }} *</label>
            <select
              id="subject"
              v-model="form.subject"
              class="mt-1.5 w-full rounded-[10px] border bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors dark:bg-bg-dark dark:text-white"
              :class="touched.subject && errors.subject ? 'border-red-400' : 'border-gray-200 focus:border-accent dark:border-stroke-dark dark:focus:border-accent'"
              @blur="touched.subject = true"
            >
              <option value="" disabled>{{ t('contact.form.subjectPlaceholder') }}</option>
              <option v-for="key in subjectKeys" :key="key" :value="key">
                {{ t(`contact.form.subjectOptions.${key}`) }}
              </option>
            </select>
            <p v-if="touched.subject && errors.subject" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.subject }}</p>
          </div>

          <div class="mt-5">
            <label for="message" class="text-sm font-medium text-navy dark:text-white">
              {{ t('contact.form.message') }}
              <span class="font-normal text-muted dark:text-muted-dark">({{ t('contact.form.optional') }})</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="7"
              class="mt-1.5 w-full rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent dark:border-stroke-dark dark:bg-bg-dark dark:text-white dark:focus:border-accent"
            />
          </div>

          <div class="mt-5">
            <label for="attachment" class="text-sm font-medium text-navy dark:text-white">{{ t('contact.form.attachment') }}</label>
            <input
              id="attachment"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              class="mt-1.5 w-full rounded-[10px] border border-gray-200 px-4 py-2.5 text-sm text-ink outline-none file:mr-3 file:rounded-md file:border-0 file:bg-surface file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-navy dark:border-stroke-dark dark:bg-bg-dark dark:text-white dark:file:bg-white/10 dark:file:text-white"
              @change="handleFileChange"
            >
            <p class="mt-1 text-xs text-muted dark:text-muted-dark">{{ t('contact.form.attachmentHint') }}</p>
            <p v-if="fileError" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ fileError }}</p>
          </div>

          <!-- Honeypot anti-spam : champ caché, ne doit jamais être rempli par un humain -->
          <div class="absolute -left-[9999px]" aria-hidden="true">
            <label for="website">Site web</label>
            <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="mt-7 inline-flex w-full items-center justify-center rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(245,130,10,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0740A] hover:shadow-[0_10px_28px_rgba(245,130,10,0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
          >
            <svg v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" stroke-opacity="0.3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
            {{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}
          </button>
        </form>

        <div class="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_16px_48px_rgba(27,45,91,0.08)] dark:border-stroke-dark dark:bg-card-dark dark:shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
          <h2 class="font-display text-base font-semibold text-navy dark:text-white">{{ t('contact.sidebar.title') }}</h2>
          <dl class="mt-5 space-y-5 text-sm">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" stroke="white" stroke-width="1.8" />
                  <circle cx="12" cy="9.5" r="2.4" stroke="white" stroke-width="1.8" />
                </svg>
              </div>
              <div>
                <dt class="text-muted dark:text-muted-dark">{{ t('contact.sidebar.addressLabel') }}</dt>
                <dd class="mt-0.5 text-ink dark:text-white/85">{{ t('common.countries.doualaCameroon') }}</dd>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="white" stroke-width="1.8" />
                  <path d="M4 6.5l8 6 8-6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <dt class="text-muted dark:text-muted-dark">{{ t('contact.sidebar.emailLabel') }}</dt>
                <dd class="mt-0.5">
                  <a href="mailto:contact@globalearn-africa.com" class="text-ink hover:text-accent dark:text-white/85">
                    contact@globalearn-africa.com
                  </a>
                </dd>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-[#C4B5FD]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C10.5 19 5 13.5 5 6a2 2 0 0 1 1-3z" stroke="white" stroke-width="1.6" stroke-linejoin="round" />
                </svg>
              </div>
              <div>
                <dt class="text-muted dark:text-muted-dark">{{ t('contact.sidebar.phoneLabel') }}</dt>
                <dd class="mt-0.5">
                  <a href="tel:+237XXXXXXXXX" class="text-ink hover:text-accent dark:text-white/85">
                    +237 XXX XXX XXX
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </div>
</template>
