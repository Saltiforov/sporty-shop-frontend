<template>
  <div class="w-full p-7 rounded-[var(--default-rounded)] min-h-[575px] bg-white shadow animate-pulse space-y-6">

    <div class="space-y-4 border-b pb-5">
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-gray-200 rounded" />
        <div class="flex-1 h-5 bg-gray-200 rounded" />
      </div>
      <div
          v-for="i in 4"
          :key="'checkbox-' + i"
          class="flex items-center gap-3 pl-9"
      >
        <div class="w-5 h-5 bg-gray-300 rounded" />
        <div class="flex-1 h-4 bg-gray-200 rounded" />
      </div>
    </div>

    <div
        v-for="i in 3"
        :key="'dropdown-' + i"
        class="border-b pb-5 space-y-3"
    >
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-gray-200 rounded" />
        <div class="flex-1 h-5 bg-gray-200 rounded" />
        <div class="w-5 h-5 bg-gray-300 rounded ml-auto" />
      </div>
    </div>

    <div class="space-y-1 pt-1">
      <div class="h-5 w-1/3 bg-gray-200 rounded" />
      <div class="flex items-center gap-3">
        <div class="h-5 w-14 bg-gray-200 rounded" />
        <div class="flex-1 h-2 bg-gray-300 rounded" />
        <div class="h-5 w-14 bg-gray-200 rounded" />
      </div>
      <div class="w-20 h-7 bg-gray-200 rounded ml-auto" />
    </div>
  </div>
</template>
