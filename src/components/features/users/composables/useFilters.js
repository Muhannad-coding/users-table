import { ref, computed } from 'vue'
import { filterUsers } from '@/utils/filterUsers'

export function useFilters(itemsRef, initial = { name: '', address: '', phone: '' }) {
  const filters = ref(initial)

  const filtered = computed(() => {
    return filterUsers(itemsRef.value || [], filters.value)
  })

  return {
    filters,
    filtered,
  }
}
