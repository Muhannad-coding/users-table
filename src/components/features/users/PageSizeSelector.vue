<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  options: {
    type: Array,
    default: () => [5, 10, 20, 50],
  },
  id: {
    type: String,
    default: 'pageSize',
  },
})

const emit = defineEmits(['update:modelValue'])

function changePageSize(event) {
  emit('update:modelValue', Number(event.target.value))
}
</script>

<template>
  <div class="page-size">
    <label :for="id">Rows per page:</label>
    <select :id="id" :value="modelValue" @change="changePageSize($event)">
      <option v-for="size in options" :key="size" :value="size">{{ size }}</option>
    </select>
  </div>
</template>

<style scoped>
.page-size {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.page-size select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
.page-size label {
  font-size: 0.875rem;
  color: #555;
}
</style>
