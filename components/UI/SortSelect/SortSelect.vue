<template>
  <div class="flex items-center">
    <Select
        :pt="{
        root: {
          style: 'background-color: transparent; border: none;'
        },
        label: {
          style: 'color: var(--color-primary-dark); margin-right: 0.5rem; padding: 0; line-height: 22px; font-weight: 500; font-size: 15px;',
          class: 'select-label'
        },
        dropdown: {
          style: 'width: 0.75rem; color: var(--color-gray-dark-charcoal);'
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
.select-root {
  background: transparent;
  border: none;
}
.select-label {
  color: var(--color-primary-dark);
  margin-right: 2px;
  padding: 0px;
  line-height: 22px;
  font-weight: 500;
  font-size: 16px;
}
.select-dropdown {
  width: 12px;
  color: var(--color-gray-dark-charcoal);
}
</style>