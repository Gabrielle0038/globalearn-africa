<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: 'Message envoyé — GlobalEarn',
  robots: 'noindex'
})
</script>

<template>
  <section class="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center lg:px-8 lg:py-32">
    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDEEDD] dark:bg-accent/15">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12.5l5.5 5.5L20 7" stroke="#F5820A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <h1 class="mt-6 font-display text-2xl font-semibold text-navy dark:text-white lg:text-3xl">
      {{ t('merci.title') }}
    </h1>
    <p class="mt-3 text-muted dark:text-muted-dark">
      {{ t('merci.subtitle') }}
    </p>

    <NuxtLink
      to="/"
      class="mt-8 inline-block rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0740A] hover:shadow-[0_6px_16px_rgba(245,130,10,0.35)]"
    >
      {{ t('merci.backHome') }}
    </NuxtLink>
  </section>
</template>
