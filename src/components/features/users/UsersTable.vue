<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Data
import usersData from '@/data/records.json'

// Components
import FilterInput from '@/components/features/users/FilterInput.vue'
import PageSizeSelector from '@/components/features/users/PageSizeSelector.vue'
import PaginationButton from '@/components/features/users/PaginationButton.vue'
import UsersListTable from '@/components/features/users/UsersListTable.vue'
import SortDropdown from '@/components/features/users/SortDropDown.vue'

// Utils
import { visiblePagesFun } from '@/utils/visiblePagesFun'
import { initFormQuery } from '@/utils/initFormQuery'
import { buildQueryFromState } from '@/utils/buildQueryFromState'

// Composables
import { usePagination } from './composables/usePagination'
import { useSorting } from './composables/useSorting'
import { useFilters } from './composables/useFilters'

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
const { sort, sorted } = useSorting(filtered)

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
  <div class="header"><h1>Users List</h1></div>
  <div class="controls-container">
    <div class="filters">
      <FilterInput v-model="filters.name" placeholder="Muha, John..." label="By name" />
      <FilterInput
        v-model="filters.address"
        placeholder="Eastern Parkway, Dakota... "
        label="By address"
      />
      <FilterInput v-model="filters.phone" placeholder="+1 (949) 443-30..." label="By phone" />
    </div>

    <div class="controls">
      <PageSizeSelector v-model="pageSize" />
      <SortDropdown v-model="sort" />
    </div>
  </div>

  <UsersListTable :rows="paginated" :sort="sort" :currentPage="currentPage" :pageSize="pageSize" />

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
  margin: 2rem 0;
  border-bottom: 2px solid #eee;
}
.controls-container {
  padding: 1rem;
}

@media screen and (min-width: 600px) {
  .controls-container {
    padding: 0;
  }
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}

.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 2rem 1rem;
  flex-wrap: wrap;
}
</style>
