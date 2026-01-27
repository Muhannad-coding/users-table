<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Filter...',
  },
  debounceTime: {
    type: Number,
    default: 500,
  },
  label: {
    type: String,
    default: 'Filter',
  },
  id: {
    type: String,
    default: 'filter-input',
  },
})

const emit = defineEmits(['update:modelValue'])

let timeout = null

function onInput(event) {
  clearTimeout(timeout)
  const value = event.target.value
  timeout = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.debounceTime)
}
</script>

<template>
  <div class="filter-input">
    <label :for="id">{{ label }}</label>
    <input :id="id" type="text" :placeholder="placeholder" :value="modelValue" @input="onInput" />
  </div>
</template>

<style scoped>
.filter-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.filter-input label {
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}
.filter-input input {
  padding: 0.7rem;
  font-size: 0.725rem;
  border: none;
  border-radius: 25px;
  background-color: #f0f0f0;
}
.filter-input input::placeholder {
  color: #999;
}
</style>
