import { ref, computed, watch } from 'vue'

export function usePagination(itemsRef, initial = { page: 1, pageSize: 10 }) {
  const currentPage = ref(initial.page)
  const pageSize = ref(initial.pageSize)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(((itemsRef.value && itemsRef.value.length) || 0) / pageSize.value)),
  )

  const paginated = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return (itemsRef.value || []).slice(start, start + pageSize.value)
  })

  function goToPage(page) {
    if (page === '...') return
    const n = Number(page)
    if (!Number.isNaN(n) && n >= 1 && n <= totalPages.value) {
      currentPage.value = n
    }
  }

  function setPageSize(size) {
    pageSize.value = size
    currentPage.value = 1
  }

  watch(pageSize, () => {
    currentPage.value = 1
  })

  watch(
    () => (itemsRef.value || []).length,
    () => {
      currentPage.value = 1
    },
  )

  return {
    currentPage,
    pageSize,
    totalPages,
    paginated,
    goToPage,
    setPageSize,
  }
}
