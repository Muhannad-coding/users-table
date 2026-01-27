import { ref, computed } from 'vue'
import { sortUsers } from '@/utils/sortUsers'

export function useSorting(itemsRef, initial = { key: null, direction: 'asc' }) {
  const sort = ref(initial)

  const sorted = computed(() => {
    return sortUsers(itemsRef.value || [], sort.value)
  })

  function toggleSort(key) {
    if (sort.value.key === key) {
      sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
    } else {
      sort.value.key = key
      sort.value.direction = 'asc'
    }
  }

  return {
    sort,
    sorted,
    toggleSort,
  }
}
