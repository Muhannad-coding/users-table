<script setup>
import usersData from '@/data/records.json'
import { ref, computed, watch } from 'vue'
import FilterInput from '@/components/UI/FilterInput.vue'
import { filterUsers } from '@/utils/filterUsers'
import { sortUsers } from '@/utils/sortUsers'
import PageSizeSelector from '@/components/UI/PageSizeSelector.vue'
import { visiblePagesFun } from '@/utils/visiblePagesFun'
import PaginationButton from './UI/PaginationButton.vue'

const users = ref(
  usersData.map((u) => ({
    ...u,
    registrationTimestamp: new Date(u.date).getTime(),
  })),
)

const filters = ref({
  name: '',
  address: '',
  phone: '',
})

const sort = ref({
  key: null,
  direction: 'asc',
})

const pagination = ref({
  currentPage: 1,
  pageSize: 10,
})

// Filtering
const filteredUsers = computed(() => {
  return filterUsers(users.value, filters.value)
})

// Sorting
const sortedUsers = computed(() => {
  return sortUsers(filteredUsers.value, sort.value)
})

function toggleSort(key) {
  if (sort.value.key === key) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.key = key
    sort.value.direction = 'asc'
  }
}

// Pagination
const paginatedUsers = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return sortedUsers.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedUsers.value.length / pagination.value.pageSize)
})

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    pagination.value.currentPage = page
  }
}

watch(
  () => pagination.value.pageSize,
  () => {
    pagination.value.currentPage = 1
  },
)

const visiblePages = computed(() => {
  return visiblePagesFun(totalPages.value, pagination.value.currentPage)
})
</script>

<template>
  <div class="filters">
    <FilterInput v-model="filters.name" placeholder="Filter by Name" />
    <FilterInput v-model="filters.address" placeholder="Filter by Address" />
    <FilterInput v-model="filters.phone" placeholder="Filter by Phone" />
  </div>
  <div class="page-size">
    <label for="page-size">Rows per page:</label>
    <PageSizeSelector v-model="pagination.pageSize" />
  </div>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>
          <button @click="toggleSort('name')">
            Name
            <span v-if="sort.key === 'name'">
              {{ sort.direction === 'asc' ? '▲' : '▼' }}
            </span>
          </button>
        </th>
        <th>
          <button @click="toggleSort('date')">
            Date of Registration
            <span v-if="sort.key === 'date'">
              {{ sort.direction === 'asc' ? '▲' : '▼' }}
            </span>
          </button>
        </th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in paginatedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
  <div class="pagination">
    <!-- Prev -->
    <PaginationButton
      :disabled="pagination.currentPage === 1"
      @click="goToPage(pagination.currentPage - 1)"
    >
      Prev
    </PaginationButton>

    <!-- Page numbers -->
    <PaginationButton
      v-for="page in visiblePages"
      :key="page"
      :active="page === pagination.currentPage"
      :isDots="page === '...'"
      @click="goToPage(page)"
    >
      {{ page }}
    </PaginationButton>

    <!-- Next -->
    <PaginationButton
      :disabled="pagination.currentPage === totalPages"
      @click="goToPage(pagination.currentPage + 1)"
    >
      Next
    </PaginationButton>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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
