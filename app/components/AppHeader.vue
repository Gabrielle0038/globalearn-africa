<script setup lang="ts">
const { navLinks } = useNavigation()
const { t } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 8
}

function closeMenu() {
  isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const route = useRoute()
watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow duration-200 dark:bg-bg-dark/90"
    :class="isScrolled ? 'shadow-[0_2px_16px_rgba(27,45,91,0.08)] dark:shadow-[0_2px_16px_rgba(0,0,0,0.4)]' : ''"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="GlobalEarn — retour à l'accueil">
        <img
          src="/logo-globalearn.jpg"
          alt="GlobalEarn"
          class="h-11 w-11 rounded-full object-cover"
          width="44"
          height="44"
        >
        <span class="font-display text-lg font-semibold text-navy dark:text-white">
          Global<span class="text-accent">Earn</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-[15px] font-medium text-ink transition-colors hover:text-accent dark:text-white/90"
          active-class="text-accent"
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <LanguageSwitcher />
        <DarkModeToggle />
        <NuxtLink
          to="/contact"
          class="inline-block rounded-[10px] bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E0740A] hover:shadow-[0_6px_16px_rgba(245,130,10,0.35)]"
        >
          {{ t('nav.cta') }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <LanguageSwitcher />
        <DarkModeToggle />
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-[10px] text-navy dark:text-white"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Ouvrir le menu de navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <svg v-if="!isMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        id="mobile-menu"
        class="flex flex-col gap-1 border-t border-gray-100 bg-white px-5 py-4 dark:border-stroke-dark dark:bg-bg-dark lg:hidden"
        aria-label="Navigation mobile"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-[10px] px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface dark:text-white/90 dark:hover:bg-white/5"
          active-class="text-accent bg-surface dark:bg-white/5"
        >
          {{ t(link.labelKey) }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="mt-2 rounded-[10px] bg-accent px-6 py-3 text-center text-sm font-medium text-white"
        >
          {{ t('nav.cta') }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>
