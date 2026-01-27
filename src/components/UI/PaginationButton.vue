<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    active: Boolean,
    isDots: Boolean,
  },
})

const emit = defineEmits(['click'])
function handleClick() {
  if (!props.disabled) {
    emit('click')
  }
}

console.log(props.disabled)
</script>

<template>
  <button
    class="pagination-btn"
    :class="{
      active: active,
      dots: isDots,
    }"
    :disabled="disabled || isDots"
    @click="handleClick"
    :aria-current="active ? 'page' : null"
  >
    <slot />
  </button>
</template>

<style scoped>
.pagination-btn {
  padding: 0.4rem 0.7rem;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination-btn:hover:not(.active):not(.dots) {
  background: #f0f0f0;
}

.pagination-btn.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
  font-weight: bold;
}

.pagination-btn.dots {
  cursor: default;
  border: none;
  background: transparent;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
