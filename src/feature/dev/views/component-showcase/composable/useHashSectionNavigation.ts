import { nextTick, onScopeDispose, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type ScrollBehavior = 'instant' | 'smooth'
type NavigateHandler = (id: string) => void

function sectionIdFromHash(hash: string) {
  const encodedId = hash.startsWith('#') ? hash.slice(1) : hash
  if (!encodedId) return ''

  try {
    return decodeURIComponent(encodedId)
  } catch {
    return encodedId
  }
}

export function useHashSectionNavigation(onNavigate: NavigateHandler) {
  const route = useRoute()
  const router = useRouter()
  let nextScrollBehavior: ScrollBehavior = 'instant'
  let scrollRequest = 0
  let animationFrame = 0

  function scrollToSection(id: string, behavior: ScrollBehavior) {
    const request = ++scrollRequest

    void nextTick().then(() => {
      if (typeof window === 'undefined') return

      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0
        if (request !== scrollRequest) return

        const target = document.getElementById(id)
        const scrollContainer = document.querySelector<HTMLElement>('main')
        if (!target || !scrollContainer) return

        const targetTop =
          target.getBoundingClientRect().top +
          scrollContainer.scrollTop -
          scrollContainer.getBoundingClientRect().top -
          (Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0)

        if (behavior === 'smooth') {
          scrollContainer.scrollTo({ top: Math.max(0, targetTop), behavior })
        } else {
          scrollContainer.scrollTop = Math.max(0, targetTop)
        }
      })
    })
  }

  watch(
    () => route.hash,
    (hash) => {
      const id = sectionIdFromHash(hash)
      if (!id) return

      onNavigate(id)
      const behavior = nextScrollBehavior
      nextScrollBehavior = 'instant'
      scrollToSection(id, behavior)
    },
    { immediate: true, flush: 'post' },
  )

  function navigateToSection(id: string, behavior: ScrollBehavior = 'smooth') {
    const hash = `#${encodeURIComponent(id)}`
    if (route.hash === hash) {
      onNavigate(id)
      scrollToSection(id, behavior)
      return
    }

    nextScrollBehavior = behavior
    void router.push({ path: route.path, query: route.query, hash }).catch(() => {
      nextScrollBehavior = 'instant'
    })
  }

  onScopeDispose(() => {
    scrollRequest += 1
    if (animationFrame) cancelAnimationFrame(animationFrame)
  })

  return navigateToSection
}
