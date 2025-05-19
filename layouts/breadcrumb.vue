<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 base-container">
      <div class="breadcrumb">
        <LayoutBreadcrumb/>
      </div>

      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import LayoutBreadcrumb from "~/components/UI/LayoutBreadcrumb/LayoutBreadcrumb.vue";
</script>

<style scoped>
@media(max-width: 450px) {
  main {
    padding: 0 5px;
  }
}
</style>

