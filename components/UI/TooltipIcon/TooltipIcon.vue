<template>
  <div class="relative inline-block" @mouseenter="show = true" @mouseleave="show = false">
    <slot>
      <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path :fill="show ? '#8E8E93' : 'var(--color-primary-red)' " d="M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"/>
        <path d="M7 3.5V8.16667M7.02905 10.5V10.5583L6.97095 10.5584V10.5H7.02905Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </slot>

    <div v-if="show" class="custom-tooltip custom-tooltip--top-right">
      <p class="tooltip-text">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

defineProps({
  message: {
    type: String,
    default: '',
  }
})
</script>

<style scoped>
.custom-tooltip {
  position: absolute;
  z-index: 50;
  padding: 1px 6px;
  width: max-content;
  max-width: 1000px;
  color: white;
  font-size: 0.875rem;
  border-top-left-radius: var(--default-rounded);
  border-bottom-right-radius: var(--default-rounded);
  background-color: var(--color-primary-red);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  white-space: nowrap;
}

.custom-tooltip--top-right {
  bottom: 20%;
  left: 18px;
  margin-bottom: 0.5rem;
}

.tooltip-text {
  font-weight: 200;
  font-size: 12px;
}

@media (max-width: 600px) {
  .custom-tooltip {
    white-space: wrap;
    max-width: 200px;
  }
}

@media (max-width: 450px) {
  .custom-tooltip {
    max-width: 100px;
  }
}

</style>
