export const useColorMode = () => {
  const isDark = useState<boolean>('color-mode-dark', () => false)

  function apply(dark: boolean) {
    isDark.value = dark
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      localStorage.setItem('globalearn_theme', dark ? 'dark' : 'light')
    }
  }

  function init() {
    if (!import.meta.client) return
    const stored = localStorage.getItem('globalearn_theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(stored ? stored === 'dark' : prefersDark)
  }

  function toggle() {
    apply(!isDark.value)
  }

  return { isDark, init, toggle }
}
