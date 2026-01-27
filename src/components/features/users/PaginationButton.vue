<script setup>
const props = defineProps({
  disabled: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  isDots: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])

function handleClick() {
  if (!props.disabled) {
    emit('click')
  }
}
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
  background: #eaeff9;
  border-color: #eaeff9;
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
