<script setup lang="ts">
const { navLinks } = useNavigation()
const { originCountryKeys, destinationCountryKeys } = useCountries()
const { t } = useI18n()
const year = new Date().getFullYear()

const allDestinationKeys = destinationCountryKeys
</script>

<template>
  <footer class="bg-navy text-white dark:bg-surface-dark">
    <div class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <NuxtLink to="/" class="flex items-center gap-2" aria-label="GlobalEarn — retour à l'accueil">
            <img
              src="/logo-globalearn.jpg"
              alt="GlobalEarn"
              class="h-10 w-10 rounded-full object-cover"
              width="40"
              height="40"
            >
            <span class="font-display text-base font-semibold">
              Global<span class="text-accent-light">Earn</span>
            </span>
          </NuxtLink>
          <p class="mt-4 text-sm text-white/70">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <p class="font-display text-sm font-semibold text-white/90">{{ t('footer.navTitle') }}</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-white/70 transition-colors hover:text-white">
                {{ t(link.labelKey) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-display text-sm font-semibold text-white/90">{{ t('footer.contactTitle') }}</p>
          <ul class="mt-4 space-y-3 text-sm text-white/70">
            <li>{{ t('common.countries.doualaCameroon') }}</li>
            <li>
              <a href="mailto:contact@globalearn-africa.com" class="transition-colors hover:text-white">
                contact@globalearn-africa.com
              </a>
            </li>
            <li>
              <a href="tel:+237XXXXXXXXX" class="transition-colors hover:text-white">
                +237 XXX XXX XXX
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="font-display text-sm font-semibold text-white/90">{{ t('footer.destinationsTitle') }}</p>
          <p class="mt-4 text-sm text-white/70">
            <template v-for="(key, index) in allDestinationKeys" :key="key">
              {{ t(`common.countries.${key}`) }}<span v-if="index < allDestinationKeys.length - 1"> · </span>
            </template>
          </p>
        </div>
      </div>

      <div class="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
        © {{ year }} GlobalEarn. {{ t('footer.rights') }}
      </div>
    </div>
  </footer>
</template>
