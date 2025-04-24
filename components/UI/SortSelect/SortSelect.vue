<template>
  <div class="flex items-center">
    <Select :pt="{
      root: {
        class: 'bg-transparent border-0 '
      },
      label: {
        class: 'text-[var(--color-primary-dark)] mr-2 p-0 leading-[22px] fw-500 text-[16px]'
      },
      dropdown: {
        class: 'w-3 text-[var(--color-gray-dark-charcoal)]'
      },
    }"
            v-model="selectedOption"
            optionLabel="name"
            :options="sortOptions"
    ></Select>
  </div>

</template>

<script setup lang="ts">
import Select from "primevue/select";
import {ref} from "vue";

const selectedOption = ref({ name: 'За популярністю', code: 'popular' });
const sortOptions = ref([
  { name: 'За популярністю', code: 'popular' },
  { name: 'Від дешевих до дорогих', code: 'price_asc' },
  { name: 'Від дорогих до дешевих', code: 'price_desc' },
  { name: 'За новинками', code: 'newest' },
  { name: 'За рейтингом', code: 'rating' }
]);
</script>


<style scoped>

</style>