<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    // { key: 'name' | 'date' | null, direction: 'asc' | 'desc' }
  },
})

const emit = defineEmits(['update:modelValue'])

const options = [
  { label: 'Newest first', value: { key: 'date', direction: 'desc' } },
  { label: 'Date (Oldest first)', value: { key: 'date', direction: 'asc' } },
  { label: 'Name (A → Z)', value: { key: 'name', direction: 'asc' } },
  { label: 'Name (Z → A)', value: { key: 'name', direction: 'desc' } },
]

const selectedValue = computed({
  get() {
    const match = options.find(
      (o) =>
        o.value.key === props.modelValue.key && o.value.direction === props.modelValue.direction,
    )
    return match?.label || options[0].label
  },
  set(label) {
    const option = options.find((o) => o.label === label)
    if (option) {
      emit('update:modelValue', option.value)
    }
  },
})
</script>

<template>
  <div class="sort-dropdown">
    <label class="sort-label" for="sort-select">Sort by</label>
    <select id="sort-select" v-model="selectedValue">
      <option v-for="o in options" :key="o.label" :value="o.label">
        {{ o.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-label {
  font-size: 0.875rem;
  color: #555;
}

select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
</style>
