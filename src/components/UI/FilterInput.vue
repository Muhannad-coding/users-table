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
.filter-input input {
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
