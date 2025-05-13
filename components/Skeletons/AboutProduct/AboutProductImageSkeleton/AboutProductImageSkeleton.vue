<template>
  <div class="w-full max-w-[678px]">
    <div class="w-full h-[678px] bg-gray-200 rounded-lg shadow-md animate-pulse mb-[32px]" />

    <div class="flex gap-[40px] justify-center">
      <div
          v-for="i in 3"
          :key="i"
          class="w-[100px] h-[100px] bg-gray-300 rounded-[4px] shadow-md animate-pulse"
      />
    </div>
  </div>
</template>