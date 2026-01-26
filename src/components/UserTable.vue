<script setup>
import usersData from '@/data/records.json'
import { ref, computed } from 'vue'
import FilterInput from '@/components/UI/FilterInput.vue'

const users = ref(usersData)

const filters = ref({
  name: '',
  address: '',
  phone: '',
})

const sort = ref({
  key: null,
  order: 'asc',
})

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.value.name.toLowerCase()) &&
      user.address.toLowerCase().includes(filters.value.address.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.value.phone.toLowerCase())
    )
  })
})

const sortedUsers = computed(() => {
  const data = [...filteredUsers.value]

  if (!sort.value.key) return data

  return data.sort((a, b) => {
    let result = 0

    if (sort.value.key === 'date') {
      result = new Date(a.registrationDate) - new Date(b.registrationDate)
    }

    if (sort.value.key === 'name') {
      result = a.name.localeCompare(b.name)

      // multi-column: if names are equal, sort by date
      if (result === 0) {
        result = new Date(a.registrationDate) - new Date(b.registrationDate)
      }
    }

    return sort.value.direction === 'asc' ? result : -result
  })
})

function toggleSort(key) {
  if (sort.value.key === key) {
    sort.value.direction = sort.value.direction === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.key = key
    sort.value.direction = 'asc'
  }
}
</script>

<template>
  <div class="filters">
    <FilterInput v-model="filters.name" placeholder="Filter by Name" />
    <FilterInput v-model="filters.address" placeholder="Filter by Address" />
    <FilterInput v-model="filters.phone" placeholder="Filter by Phone" />
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
      <tr v-for="user in sortedUsers" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
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
</style>
