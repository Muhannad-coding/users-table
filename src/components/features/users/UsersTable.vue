<script setup>
import usersData from '@/data/records.json'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import FilterInput from '@/components/features/users/FilterInput.vue'
import PageSizeSelector from '@/components/features/users/PageSizeSelector.vue'
import PaginationButton from '@/components/features/users/PaginationButton.vue'
import UsersListTable from '@/components/features/users/UsersListTable.vue'

import { visiblePagesFun } from '@/utils/visiblePagesFun'
import { initFormQuery } from '@/utils/initFormQuery'
import { buildQueryFromState } from '@/utils/buildQueryFromState'

import { usePagination } from './composables/usePagination'
import { useSorting } from './composables/useSorting'
import { useFilters } from './composables/useFilters'

//Data
const users = ref(
  usersData.map((u) => ({
    ...u,
    registrationTimestamp: new Date(u.date).getTime(),
  })),
)

// from query
const route = useRoute()
const router = useRouter()

// Filtering
const { filters, filtered } = useFilters(users)

// Sorting
const { sort, sorted, toggleSort } = useSorting(filtered)

// Pagination
const { currentPage, pageSize, totalPages, paginated, goToPage } = usePagination(sorted, {
  page: 1,
  pageSize: 10,
})

const visiblePages = computed(() => {
  return visiblePagesFun(totalPages.value, currentPage.value)
})

initFormQuery({ query: route.query, filters, sort, currentPage, pageSize })

watch(
  [filters, sort, currentPage, pageSize],
  () => {
    const query = buildQueryFromState({
      filters,
      sort,
      currentPage,
      pageSize,
    })

    router.replace({ query })
  },
  { deep: true },
)
</script>

<template>
  <div class="header"><h1>User List</h1></div>
  <div class="filters">
    <FilterInput v-model="filters.name" placeholder="Muha, John..." label="By name" />
    <FilterInput
      v-model="filters.address"
      placeholder="Eastern Parkway, Dakota... "
      label="By address"
    />
    <FilterInput v-model="filters.phone" placeholder="+1 (949) 443-30..." label="By phone" />
  </div>

  <PageSizeSelector v-model="pageSize" />

  <UsersListTable :rows="paginated" :sort="sort" :toggleSort="toggleSort" />

  <div class="pagination">
    <PaginationButton :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
      Prev
    </PaginationButton>

    <PaginationButton
      v-for="page in visiblePages"
      :key="page"
      :active="page === currentPage"
      :isDots="page === '...'"
      @click="goToPage(page)"
    >
      {{ page }}
    </PaginationButton>

    <PaginationButton :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
      Next
    </PaginationButton>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  margin: 1rem 0;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}
</style>
