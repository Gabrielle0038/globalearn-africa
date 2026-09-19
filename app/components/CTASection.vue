<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    buttonLabel?: string
    to?: string
  }>(),
  {
    buttonLabel: undefined,
    to: '/contact'
  }
)

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-navy dark:bg-surface-dark">
    <div class="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" aria-hidden="true" />
    <div class="relative mx-auto max-w-6xl px-5 py-16 text-center lg:px-8">
      <h2 class="font-display text-2xl font-semibold text-white lg:text-3xl">
        {{ title }}
      </h2>
      <NuxtLink
        :to="to"
        class="mt-7 inline-block rounded-[10px] bg-accent px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0740A] hover:shadow-[0_6px_16px_rgba(245,130,10,0.35)]"
      >
        {{ buttonLabel || t('home.ctaPrimary') }}
      </NuxtLink>
    </div>
  </section>
</template>
