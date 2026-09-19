<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    description: string
    color?: 'orange' | 'navy' | 'violet' | 'cyan' | 'pink' | 'green'
  }>(),
  { color: 'orange' }
)

const gradients: Record<string, string> = {
  orange: 'from-accent to-accent-light shadow-[0_10px_24px_rgba(245,130,10,0.3)]',
  navy: 'from-navy to-navy-light shadow-[0_10px_24px_rgba(27,45,91,0.3)]',
  violet: 'from-violet to-[#C4B5FD] shadow-[0_10px_24px_rgba(139,92,246,0.3)]',
  cyan: 'from-cyan to-[#67E8F9] shadow-[0_10px_24px_rgba(34,211,238,0.3)]',
  pink: 'from-pink to-[#F9A8D4] shadow-[0_10px_24px_rgba(236,72,153,0.3)]',
  green: 'from-green to-[#6EE7B7] shadow-[0_10px_24px_rgba(16,185,129,0.3)]'
}

const gradientClass = computed(() => gradients[props.color])
</script>

<template>
  <div class="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_16px_36px_rgba(27,45,91,0.14)] dark:border-stroke-dark dark:bg-card-dark dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.4)]">
    <div
      class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110"
      :class="gradientClass"
    >
      <slot name="icon" />
    </div>
    <h3 class="mt-4 text-base font-semibold text-navy dark:text-white">{{ title }}</h3>
    <p class="mt-2 text-sm leading-relaxed text-muted dark:text-muted-dark">{{ description }}</p>
  </div>
</template>
