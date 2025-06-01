<template>
  <div class="flex items-center">
    <Select
        :pt="{
        root: {
          style: 'background-color: transparent; border: none;'
        },
        label: {
          style: labelStyles,
          class: 'select-label'
        },
        dropdown: {
          style: 'width: 0.75rem; color: var(--color-gray-dark-charcoal);'
        }
      }"
        v-model="selectedOption"
        optionLabel="name"
        :options="sortOptions"
    ></Select>
  </div>
</template>


<script setup>
import Select from "primevue/select";
import {ref} from "vue";
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher";

const {t} = useI18n()

const getWidth = useWindowWidthWatcher()

const selectedOption = ref({name: computed(() => t('sort_popular')), code: 'popular'});

const windowWidth = computed(() => getWidth())

const sortOptions = ref([
  {code: 'popular', name: computed(() => t('sort_popular'))},
  {code: 'price_asc', name: computed(() => t('sort_price_asc'))},
  {code: 'price_desc', name: computed(() => t('sort_price_desc'))},
  {code: 'newest', name: computed(() => t('sort_newest'))},
  {code: 'rating', name: computed(() => t('sort_rating'))}
])

const labelStyles = computed(() => {
  return {
    color: 'var(--color-primary-dark)',
    marginRight: '0.5rem',
    padding: '0',
    lineHeight: '22px',
    fontWeight: 500,
    fontSize: windowWidth.value < 500 ? '10px' : '15px',
  }
})

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
  font-size: 15px;
}
.select-dropdown {
  width: 12px;
  color: var(--color-gray-dark-charcoal);
}

@media (max-width: 510px) {

  .select-label {
    font-size: 10px !important;
  }
}
</style>