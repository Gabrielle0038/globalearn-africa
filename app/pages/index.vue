<script setup lang="ts">
const { offers } = useOffers()
const { originCountryKeys, destinationCountryKeys } = useCountries()
const { t } = useI18n()

useSeoMeta({
  title: 'GlobalEarn — Votre avenir commence ici',
  description: 'GlobalEarn accompagne les étudiants africains vers l\'Europe avec un compte bloqué multi-pays, le Mobile Money, un logement assisté par IA et un accompagnement carrière complet.',
  ogTitle: 'GlobalEarn — Votre avenir commence ici',
  ogDescription: 'Compte bloqué multi-pays, Mobile Money natif, logement IA et accompagnement carrière pour les étudiants africains partant en Europe.'
})

const features = [
  { key: 'mobileMoney', color: 'orange' },
  { key: 'multiCountry', color: 'navy' },
  { key: 'presence', color: 'violet' },
  { key: 'allInOne', color: 'cyan' },
  { key: 'verification', color: 'pink' },
  { key: 'followUp', color: 'green' }
] as const

const marqueeCountries = [...destinationCountryKeys, ...originCountryKeys, ...destinationCountryKeys, ...originCountryKeys]
</script>

<template>
  <div>
    <HeroSection />

    <!-- Marquee de pays -->
    <div class="overflow-hidden border-y border-gray-100 bg-white py-4 dark:border-stroke-dark dark:bg-bg-dark">
      <div class="flex w-max gap-8 animate-[marquee_28s_linear_infinite]">
        <span
          v-for="(key, i) in marqueeCountries"
          :key="`${key}-${i}`"
          class="flex items-center gap-2 text-sm font-medium text-muted dark:text-muted-dark"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-accent" />
          {{ t(`common.countries.${key}`) }}
        </span>
      </div>
    </div>

    <section class="bg-surface py-16 dark:bg-surface-dark lg:py-24">
      <div class="mx-auto max-w-6xl px-5 lg:px-8">
        <div v-reveal class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
            {{ t('home.whyTitle') }}
          </h2>
          <p class="mt-3 text-muted dark:text-muted-dark">
            {{ t('home.whySubtitle') }}
          </p>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(feature, i) in features" :key="feature.key" v-reveal :style="{ transitionDelay: `${i * 60}ms` }">
            <FeatureCard
              :title="t(`home.features.${feature.key}.title`)"
              :description="t(`home.features.${feature.key}.description`)"
              :color="feature.color"
            >
              <template #icon>
                <svg v-if="feature.key === 'mobileMoney'" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="white" stroke-width="1.8" />
                  <path d="M3 9.5h18" stroke="white" stroke-width="1.8" />
                  <circle cx="7" cy="14.5" r="1.4" fill="white" />
                </svg>
                <svg v-else-if="feature.key === 'multiCountry'" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.8" />
                  <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="white" stroke-width="1.8" />
                </svg>
                <svg v-else-if="feature.key === 'presence'" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z" stroke="white" stroke-width="1.8" />
                  <circle cx="12" cy="9.5" r="2.4" stroke="white" stroke-width="1.8" />
                </svg>
                <svg v-else-if="feature.key === 'allInOne'" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="8" height="8" rx="1.8" stroke="white" stroke-width="1.8" />
                  <rect x="13" y="3" width="8" height="8" rx="1.8" stroke="white" stroke-width="1.8" />
                  <rect x="3" y="13" width="8" height="8" rx="1.8" stroke="white" stroke-width="1.8" />
                  <rect x="13" y="13" width="8" height="8" rx="1.8" stroke="white" stroke-width="1.8" />
                </svg>
                <svg v-else-if="feature.key === 'verification'" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z" stroke="white" stroke-width="1.8" />
                  <path d="M9 12l2 2 4-4" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 19l6-6 4 4 6-8" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="20" cy="9" r="1.6" fill="white" />
                </svg>
              </template>
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-6xl px-5 lg:px-8">
        <div v-reveal class="mx-auto max-w-2xl text-center">
          <h2 class="font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
            {{ t('home.offersTitle') }}
          </h2>
          <p class="mt-3 text-muted dark:text-muted-dark">
            {{ t('home.offersSubtitle') }}
          </p>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-3">
          <div v-for="(offer, i) in offers" :key="offer.id" v-reveal :style="{ transitionDelay: `${i * 80}ms` }">
            <OfferCard :offer="offer" compact />
          </div>
        </div>

        <p class="mt-8 text-center">
          <NuxtLink to="/services" class="text-sm font-medium text-navy underline decoration-gray-300 underline-offset-4 hover:text-accent dark:text-white dark:decoration-white/30">
            {{ t('home.offersLink') }}
          </NuxtLink>
        </p>
      </div>
    </section>

    <section class="bg-surface py-16 dark:bg-surface-dark lg:py-24">
      <div class="mx-auto max-w-6xl px-5 lg:px-8">
        <div v-reveal class="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 class="font-display text-lg font-semibold text-navy dark:text-white">{{ t('home.originTitle') }}</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="key in originCountryKeys"
                :key="key"
                class="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-ink dark:border-stroke-dark dark:bg-card-dark dark:text-white/85"
              >
                {{ t(`common.countries.${key}`) }}
              </span>
            </div>
          </div>
          <div>
            <h3 class="font-display text-lg font-semibold text-navy dark:text-white">{{ t('home.destinationTitle') }}</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="key in destinationCountryKeys"
                :key="key"
                class="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-ink dark:border-stroke-dark dark:bg-card-dark dark:text-white/85"
              >
                {{ t(`common.countries.${key}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CTASection :title="t('home.ctaFinal')" />
  </div>
</template>
