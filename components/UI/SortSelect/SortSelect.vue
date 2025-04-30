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

const {t} = useI18n()

const selectedOption = ref({name: computed(() => t('sort_popular')), code: 'popular'});

const sortOptions = ref([
  {code: 'popular', name: computed(() => t('sort_popular'))},
  {code: 'price_asc', name: computed(() => t('sort_price_asc'))},
  {code: 'price_desc', name: computed(() => t('sort_price_desc'))},
  {code: 'newest', name: computed(() => t('sort_newest'))},
  {code: 'rating', name: computed(() => t('sort_rating'))}
])
</script>


<style scoped>

</style>