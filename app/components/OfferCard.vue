<script setup lang="ts">
import type { Offer } from '~/composables/useOffers'

const props = defineProps<{
  offer: Offer
  compact?: boolean
}>()

const { t, tm, rt } = useI18n()

const highlights = computed(() => {
  const raw = tm(`offers.${props.offer.id}.highlights`) as unknown[]
  const list = raw.map((item) => rt(item as any))
  return props.compact ? list.slice(0, 3) : list
})

const iconPaths: Record<string, string> = {
  essentiel: 'M9 12l2 2 4-4M7.8 3h8.4L21 7.8v8.4L16.2 21H7.8L3 16.2V7.8z',
  pack360: 'star',
  premium: 'crown'
}
</script>

<template>
  <div class="group relative h-full">
    <div
      v-if="offer.featured"
      class="pointer-events-none absolute -inset-1 rounded-[20px] bg-gradient-to-br from-accent to-violet opacity-30 blur-lg"
      aria-hidden="true"
    />
    <div
      class="relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
      :class="offer.featured
        ? 'border-2 border-accent bg-white shadow-[0_16px_36px_rgba(245,130,10,0.16)] dark:bg-card-dark dark:shadow-[0_16px_36px_rgba(245,130,10,0.1)]'
        : 'border border-gray-100 bg-white hover:shadow-[0_16px_36px_rgba(27,45,91,0.12)] dark:border-stroke-dark dark:bg-card-dark dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.35)]'"
    >
      <div class="flex items-center justify-between">
        <div
          class="flex h-11 w-11 items-center justify-center rounded-xl"
          :class="offer.featured ? 'bg-gradient-to-br from-accent to-accent-light' : 'bg-gradient-to-br from-navy to-navy-light'"
        >
          <svg v-if="offer.id === 'pack360'" width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7L12 17.3 5.7 20.9l1.7-7-5.4-4.7 7.1-.6z" />
          </svg>
          <svg v-else-if="offer.id === 'premium'" width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M3 8l4 3 5-6 5 6 4-3-1.5 10h-15z" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 12l2 2 4-4M7.8 3h8.4L21 7.8v8.4L16.2 21H7.8L3 16.2V7.8z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span
          v-if="offer.featured"
          class="inline-flex items-center rounded-full bg-[#FDEEDD] px-3 py-1 text-xs font-medium text-[#9A4A05] dark:bg-accent/15 dark:text-accent-light"
        >
          {{ t('common.mostChosen') }}
        </span>
      </div>

      <h3 class="mt-4 font-display text-lg font-semibold text-navy dark:text-white">
        {{ t(`offers.${offer.id}.name`) }}
      </h3>

      <p class="mt-2">
        <span class="text-2xl font-semibold text-navy dark:text-white">{{ offer.price }}</span>
        <span v-if="offer.hasPriceDetail" class="ml-1 text-sm text-muted dark:text-muted-dark">
          {{ t(`offers.${offer.id}.priceDetail`) }}
        </span>
      </p>

      <ul class="mt-5 flex-1 space-y-2.5">
        <li
          v-for="item in highlights"
          :key="item"
          class="flex items-start gap-2 text-sm text-ink dark:text-white/85"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" class="mt-0.5 shrink-0" aria-hidden="true">
            <path d="M4 10.5l4 4 8-9" stroke="#F5820A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ item }}</span>
        </li>
      </ul>

      <NuxtLink
        to="/contact"
        class="mt-6 inline-flex items-center justify-center rounded-[10px] border border-navy px-5 py-3 text-sm font-medium text-navy transition-colors duration-200 hover:bg-[#EEF1F8] dark:border-white/30 dark:text-white dark:hover:bg-white/10"
      >
        {{ compact ? t('common.seeDetail') : t('common.chooseOffer') }}
      </NuxtLink>
    </div>
  </div>
</template>
