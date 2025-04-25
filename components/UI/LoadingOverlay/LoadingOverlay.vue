<template>
  <transition name="fade">
    <div v-if="visible" class="overlay progress-spinner">
      <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
      />
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})
</script>




<style scoped>
.progress-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
