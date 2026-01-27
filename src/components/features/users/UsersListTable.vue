<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  rows: { type: Array, default: () => [] },
  sort: { type: Object, default: () => ({ key: null, direction: 'asc' }) },
  toggleSort: { type: Function, required: true },
})

const idx = ref(0)
</script>

<template>
  <table>
    <thead class="table-head">
      <tr>
        <th class="id table-head-element">ID</th>
        <th class="table-head-element">
          <button @click="toggleSort('name')">
            Name
            <span v-if="sort.key === 'name'">{{ sort.direction === 'asc' ? '▲' : '▼' }}</span>
          </button>
        </th>
        <th class="table-head-element">
          <button @click="toggleSort('date')">
            Registration Date
            <span v-if="sort.key === 'date'">{{ sort.direction === 'asc' ? '▲' : '▼' }}</span>
          </button>
        </th>
        <th class="table-head-element">Address</th>
        <th class="table-head-element">Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row" v-for="user in rows" :key="user.id">
        <td class="ids">{{ idx }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.id {
  min-width: 30px;
}
.ids {
  text-align: center;
}
.table-head {
  background-color: #f2f2f2;
  border-radius: 8px;
}
.table-head-element {
  text-align: left;
  padding: 12px;
}
.table-head-element button {
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
}
.table-row {
  border-bottom: 1px solid #e6e6e6;
  padding: 8px;
}
.table-row td {
  padding: 12px;
  font-size: 0.725rem;
}
@media (min-width: 600px) {
  .table-head-element,
  .table-row td {
    padding: 8px;
    font-size: 0.875rem;
  }
}
</style>
