<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/25 blur-[110px] dark:bg-accent/10" aria-hidden="true" />
    <div class="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-violet/15 blur-[120px] dark:bg-violet/15" aria-hidden="true" />
    <div class="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-[100px] dark:bg-cyan/10" aria-hidden="true" />

    <div class="relative mx-auto max-w-6xl px-5 pb-16 pt-14 lg:px-8 lg:pb-28 lg:pt-20">
      <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p class="inline-flex items-center gap-1.5 rounded-full bg-[#FDEEDD] px-4 py-1.5 text-sm font-medium text-[#9A4A05] dark:bg-accent/15 dark:text-accent-light">
            <span class="h-1.5 w-1.5 rounded-full bg-accent" />
            {{ t('home.badge') }}
          </p>

          <h1 class="mt-6 font-display text-4xl font-semibold leading-[1.1] text-navy dark:text-white lg:text-6xl">
            {{ t('home.title').split(' ').slice(0, -2).join(' ') }}
            <span class="bg-gradient-to-r from-navy via-accent to-navy bg-[length:200%_auto] bg-clip-text text-transparent dark:from-white dark:via-accent-light dark:to-white">
              {{ t('home.title').split(' ').slice(-2).join(' ') }}
            </span>
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted dark:text-muted-dark">
            {{ t('home.subtitle') }}
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/contact"
              class="inline-block rounded-[10px] bg-accent px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_rgba(245,130,10,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0740A] hover:shadow-[0_10px_28px_rgba(245,130,10,0.4)]"
            >
              {{ t('home.ctaPrimary') }}
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="inline-flex items-center rounded-[10px] border border-navy px-7 py-3.5 text-[15px] font-medium text-navy transition-colors duration-200 hover:bg-[#EEF1F8] dark:border-white/30 dark:text-white dark:hover:bg-white/10"
            >
              {{ t('home.ctaSecondary') }}
            </NuxtLink>
          </div>
        </div>

        <div class="relative mx-auto flex h-[380px] w-full max-w-md items-center justify-center lg:h-[420px]">
          <div
            class="absolute inset-4 rounded-full opacity-70"
            style="background: conic-gradient(from 0deg, #1B2D5B, #F5820A, #8B5CF6, #1B2D5B); animation: spin-slow 16s linear infinite; -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px)); mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));"
            aria-hidden="true"
          />
          <div class="absolute inset-12 rounded-full border border-dashed border-navy/15 dark:border-white/10" aria-hidden="true" />

          <div class="relative z-10 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-light shadow-[0_25px_60px_rgba(27,45,91,0.4)] lg:h-40 lg:w-40">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="white" stroke-width="1.6" />
              <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" stroke="white" stroke-width="1.6" />
            </svg>
            <span class="sr-only">{{ t('home.illustrationTitle') }}</span>
          </div>

          <div class="absolute left-0 top-4 flex animate-[float_5s_ease-in-out_infinite] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-lg dark:bg-card-dark dark:text-white">
            🎓 {{ t('home.chips.visa') }}
          </div>
          <div class="absolute right-0 top-14 flex animate-[float_6s_ease-in-out_infinite] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-lg dark:bg-card-dark dark:text-white" style="animation-delay:.6s">
            💳 {{ t('home.chips.mobileMoney') }}
          </div>
          <div class="absolute bottom-12 left-2 flex animate-[float_5.5s_ease-in-out_infinite] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-lg dark:bg-card-dark dark:text-white" style="animation-delay:1.1s">
            🏠 {{ t('home.chips.housing') }}
          </div>
          <div class="absolute bottom-2 right-4 flex animate-[float_6.5s_ease-in-out_infinite] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-lg dark:bg-card-dark dark:text-white" style="animation-delay:.3s">
            🛡️ {{ t('home.chips.insurance') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
