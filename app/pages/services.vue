<script setup lang="ts">
const { offers, comparisonCheckRows } = useOffers()
const { t } = useI18n()

useSeoMeta({
  title: 'Nos offres — GlobalEarn',
  description: 'Comparez les trois niveaux d\'accompagnement GlobalEarn : Essentiel, Pack 360° et Premium, du compte bloqué simple à l\'accompagnement complet.'
})
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute -top-20 left-1/4 h-80 w-80 rounded-full bg-accent/15 blur-[100px] dark:bg-accent/10" aria-hidden="true" />
      <div class="pointer-events-none absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-violet/10 blur-[100px] dark:bg-violet/15" aria-hidden="true" />
      <div class="relative mx-auto max-w-4xl px-5 pb-4 pt-16 text-center lg:px-8 lg:pt-24">
        <h1 class="font-display text-3xl font-semibold text-navy dark:text-white lg:text-4xl">
          {{ t('services.title') }}
        </h1>
        <p class="mt-4 text-lg text-muted dark:text-muted-dark">
          {{ t('services.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-12 lg:py-16">
      <div class="mx-auto max-w-6xl px-5 lg:px-8">
        <div class="grid gap-6 lg:grid-cols-3">
          <div v-for="(offer, i) in offers" :key="offer.id" v-reveal :style="{ transitionDelay: `${i * 80}ms` }">
            <OfferCard :offer="offer" />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-surface py-16 dark:bg-surface-dark lg:py-24">
      <div class="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 v-reveal class="text-center font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
          {{ t('services.compareTitle') }}
        </h2>

        <div v-reveal class="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-stroke-dark dark:bg-card-dark">
          <table class="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-stroke-dark">
                <th class="px-5 py-4 text-left font-medium text-muted dark:text-muted-dark">{{ t('services.table.feature') }}</th>
                <th class="px-5 py-4 text-center font-semibold text-navy dark:text-white">{{ t('offers.essentiel.name') }}</th>
                <th class="px-5 py-4 text-center font-semibold text-navy dark:text-white">{{ t('offers.pack360.name') }}</th>
                <th class="px-5 py-4 text-center font-semibold text-navy dark:text-white">{{ t('offers.premium.name') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="dark:bg-transparent">
                <td class="px-5 py-4 text-ink dark:text-white/85">{{ t('services.table.rows.account.feature') }}</td>
                <td class="px-5 py-4 text-center text-ink dark:text-white/85">{{ t('services.table.rows.account.essentiel') }}</td>
                <td class="px-5 py-4 text-center text-ink dark:text-white/85">{{ t('services.table.rows.account.pack360') }}</td>
                <td class="px-5 py-4 text-center text-ink dark:text-white/85">{{ t('services.table.rows.account.premium') }}</td>
              </tr>
              <tr
                v-for="(row, index) in comparisonCheckRows"
                :key="row.key"
                :class="index % 2 === 0 ? 'bg-surface dark:bg-white/[0.03]' : ''"
              >
                <td class="px-5 py-4 text-ink dark:text-white/85">{{ t(`services.table.rows.${row.key}.feature`) }}</td>
                <td class="px-5 py-4 text-center">
                  <svg v-if="row.essentiel" width="18" height="18" viewBox="0 0 20 20" fill="none" class="mx-auto" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" stroke="#F5820A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span v-else class="text-gray-300 dark:text-white/20">—</span>
                </td>
                <td class="px-5 py-4 text-center">
                  <svg v-if="row.pack360" width="18" height="18" viewBox="0 0 20 20" fill="none" class="mx-auto" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" stroke="#F5820A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span v-else class="text-gray-300 dark:text-white/20">—</span>
                </td>
                <td class="px-5 py-4 text-center">
                  <svg v-if="row.premium" width="18" height="18" viewBox="0 0 20 20" fill="none" class="mx-auto" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" stroke="#F5820A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span v-else class="text-gray-300 dark:text-white/20">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <CTASection :title="t('services.ctaFinal')" :button-label="t('services.ctaButton')" />
  </div>
</template>
