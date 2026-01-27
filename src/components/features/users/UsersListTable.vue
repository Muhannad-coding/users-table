<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  rows: { type: Array, default: () => [] },
  currentPage: { type: Number, required: false },
  pageSize: { type: Number, required: false },
})
</script>

<template>
  <table>
    <thead class="table-head">
      <tr>
        <th id="id" class="table-head-element">ID</th>
        <th class="table-head-element">Name</th>
        <th class="table-head-element">Registration Date</th>
        <th class="table-head-element">Address</th>
        <th class="table-head-element">Phone</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-row" v-for="(user, index) in rows" :key="user.id">
        <td class="ids">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.date }}</td>
        <td>{{ user.address }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
#id {
  min-width: 15px;
  text-align: center;
}
@media screen and (min-width: 600px) {
  #id {
    min-width: 30px;
  }
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
  font-size: 0.725rem;
}
@media screen and (min-width: 600px) {
  .table-head-element {
    font-size: 1rem;
  }
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
  padding: 8px;
  font-size: 0.725rem;
}
@media (min-width: 600px) {
  .table-head-element,
  .table-row td {
    padding: 12px;
    font-size: 0.875rem;
  }
}
</style>
