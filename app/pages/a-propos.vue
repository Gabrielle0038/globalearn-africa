<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'À propos — GlobalEarn',
  description: 'GlobalEarn accompagne les étudiants africains vers l\'Europe avec une plateforme 360° : compte bloqué multi-pays, Mobile Money natif, logement IA et présence physique en Afrique.'
})

const valueKeys = ['excellence', 'transparency', 'achievement', 'humanSupport']
const diffKeys = ['mobileMoney', 'multiCountry', 'presence', 'verification']
const presenceKeys = ['doualaCameroon', 'france', 'belgium', 'germany', 'denmark', 'greece', 'estonia']
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-cyan/10 blur-[100px] dark:bg-cyan/10" aria-hidden="true" />
      <div class="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-accent/15 blur-[100px] dark:bg-accent/10" aria-hidden="true" />
      <div class="relative mx-auto max-w-4xl px-5 pb-4 pt-16 text-center lg:px-8 lg:pt-24">
        <h1 class="font-display text-3xl font-semibold text-navy dark:text-white lg:text-4xl">
          {{ t('about.title') }}
        </h1>
        <p class="mt-4 text-lg text-muted dark:text-muted-dark">
          {{ t('about.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-14 lg:py-20">
      <div class="mx-auto grid max-w-5xl gap-6 px-5 sm:grid-cols-2 lg:px-8">
        <div v-reveal class="rounded-2xl border border-gray-100 bg-white p-7 dark:border-stroke-dark dark:bg-card-dark">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-light">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 19l6-6 4 4 6-8" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="20" cy="9" r="1.6" fill="white" />
            </svg>
          </div>
          <h2 class="mt-4 font-display text-lg font-semibold text-navy dark:text-white">{{ t('about.missionTitle') }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
            {{ t('about.missionText') }}
          </p>
        </div>

        <div v-reveal class="rounded-2xl border border-gray-100 bg-white p-7 dark:border-stroke-dark dark:bg-card-dark">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-[#C4B5FD]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8" />
              <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="white" stroke-width="1.8" />
            </svg>
          </div>
          <h2 class="mt-4 font-display text-lg font-semibold text-navy dark:text-white">{{ t('about.visionTitle') }}</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">
            {{ t('about.visionText') }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-surface py-16 dark:bg-surface-dark lg:py-24">
      <div class="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 v-reveal class="text-center font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
          {{ t('about.valuesTitle') }}
        </h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div
            v-for="(key, i) in valueKeys"
            :key="key"
            v-reveal
            :style="{ transitionDelay: `${i * 70}ms` }"
            class="rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 dark:bg-card-dark"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br"
              :class="{
                excellence: 'from-cyan to-[#67E8F9]',
                transparency: 'from-green to-[#6EE7B7]',
                achievement: 'from-accent to-accent-light',
                humanSupport: 'from-pink to-[#F9A8D4]'
              }[key]"
            >
              <svg v-if="key === 'excellence'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.7 20.9l1.7-7-5.4-4.7 7.1-.6z" stroke="white" stroke-width="1.5" stroke-linejoin="round" />
              </svg>
              <svg v-else-if="key === 'transparency'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z" stroke="white" stroke-width="1.6" stroke-linejoin="round" />
                <circle cx="12" cy="12" r="2.6" stroke="white" stroke-width="1.6" />
              </svg>
              <svg v-else-if="key === 'achievement'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3L2 8l10 5 8-4v6M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" stroke="white" stroke-width="1.6" stroke-linejoin="round" />
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 20.5s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3.5c0 5.4-7.5 10-7.5 10z" stroke="white" stroke-width="1.6" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="mt-3 text-base font-semibold text-navy dark:text-white">{{ t(`about.values.${key}.title`) }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">{{ t(`about.values.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden py-16 lg:py-24">
      <div class="pointer-events-none absolute top-1/2 left-0 h-72 w-72 -translate-y-1/2 rounded-full bg-violet/10 blur-[100px] dark:bg-violet/10" aria-hidden="true" />
      <div class="relative mx-auto max-w-5xl px-5 lg:px-8">
        <h2 v-reveal class="text-center font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
          {{ t('about.diffTitle') }}
        </h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div
            v-for="(key, i) in diffKeys"
            :key="key"
            v-reveal
            :style="{ transitionDelay: `${i * 70}ms` }"
            class="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(27,45,91,0.12)] dark:border-stroke-dark dark:bg-card-dark dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]"
          >
            <div
              class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br"
              :class="{
                mobileMoney: 'from-accent to-accent-light',
                multiCountry: 'from-navy to-navy-light',
                presence: 'from-violet to-[#C4B5FD]',
                verification: 'from-pink to-[#F9A8D4]'
              }[key]"
            >
              <svg v-if="key === 'mobileMoney'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke="white" stroke-width="1.8" />
                <path d="M3 9.5h18" stroke="white" stroke-width="1.8" />
                <circle cx="7" cy="14.5" r="1.4" fill="white" />
              </svg>
              <svg v-else-if="key === 'multiCountry'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8" />
                <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="white" stroke-width="1.8" />
              </svg>
              <svg v-else-if="key === 'presence'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" stroke="white" stroke-width="1.8" />
                <circle cx="12" cy="9.5" r="2.4" stroke="white" stroke-width="1.8" />
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" stroke="white" stroke-width="1.8" />
                <path d="M9 12l2 2 4-4" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 class="mt-3 text-base font-semibold text-navy dark:text-white">{{ t(`about.differentiators.${key}.title`) }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">{{ t(`about.differentiators.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-surface py-16 dark:bg-surface-dark lg:py-24">
      <div class="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan/10 blur-[100px] dark:bg-cyan/10" aria-hidden="true" />
      <div v-reveal class="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light shadow-[0_12px_28px_rgba(27,45,91,0.3)]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.6" />
            <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="white" stroke-width="1.6" />
          </svg>
        </div>
        <h2 class="mt-5 font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
          {{ t('about.presenceTitle') }}
        </h2>
        <p class="mt-4 text-muted dark:text-muted-dark">
          {{ t('about.presenceText') }}
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <span
            v-for="key in presenceKeys"
            :key="key"
            class="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-ink transition-colors hover:border-accent dark:border-stroke-dark dark:bg-card-dark dark:text-white/85"
          >
            {{ t(`common.countries.${key}`) }}
          </span>
        </div>
      </div>
    </section>

    <CTASection :title="t('about.ctaFinal')" />
  </div>
</template>
