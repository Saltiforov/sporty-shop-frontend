<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 base-container">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
@media(max-width: 450px) {
  main {
    padding: 0 15px;
  }
}

@media(max-width: 400px) {
  main {
    padding: 0 10px;
  }
}


</style>

