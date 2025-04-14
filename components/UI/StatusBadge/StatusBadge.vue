<template>
  <div :style="{ backgroundColor: backgroundColor, color: color }" class="status-badge text-center rounded-tl-[8px] rounded-br-[8px] rounded-bl-[8px]  max-w-[82px] w-full">
    <p class="fw-600 text-[24px] leading-[var(--line-height-base)]">{{ label }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: false,
    default: 'new'
  },
  backgroundColor: {
    type: String,
    required: false,
    default: '#B3261E'
  },
   color: {
    type: String,
    required: false,
    default: '#ffffff'
  },

})
</script>


<style scoped>

</style>