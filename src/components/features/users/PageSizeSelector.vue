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
  padding: 0.25rem;
  font-size: 1rem;
}
.page-size label {
  font-weight: bold;
}
</style>
