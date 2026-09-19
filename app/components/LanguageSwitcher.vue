<script setup lang="ts">
const { locale, setLocale } = useI18n()

function toggleLocale() {
  setLocale(locale.value === 'fr' ? 'en' : 'fr')
}
</script>

<template>
  <button
    type="button"
    class="flex h-9 items-center gap-1.5 rounded-full border border-gray-200 px-3 text-xs font-semibold text-navy transition-colors duration-200 hover:bg-surface dark:border-white/15 dark:text-white dark:hover:bg-white/10"
    :aria-label="locale === 'fr' ? 'Switch to English' : 'Passer en français'"
    @click="toggleLocale"
  >
    <span :class="locale === 'fr' ? 'text-accent' : 'text-muted dark:text-white/40'">FR</span>
    <span class="text-gray-300 dark:text-white/20">/</span>
    <span :class="locale === 'en' ? 'text-accent' : 'text-muted dark:text-white/40'">EN</span>
  </button>
</template>
