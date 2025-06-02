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
        @change="applySort"
    ></Select>
  </div>
</template>

<script setup>
import Select from "primevue/select";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useWindowWidthWatcher } from "~/composables/useWindowWidthWatcher";
import { useRoute, useRouter } from "vue-router"; // Добавляем для работы с маршрутами

const { t } = useI18n();
const getWidth = useWindowWidthWatcher();
const route = useRoute();
const router = useRouter();

const selectedOption = ref({ name: t("sort_popular"), code: "popular" });
const windowWidth = computed(() => getWidth());

const sortOptions = computed(() => [
  { code: "popular", name: t("sort_popular") },
  { code: "price_asc", name: t("sort_price_asc") },
  { code: "price_desc", name: t("sort_price_desc") },
  { code: "newest", name: t("sort_newest") },
  { code: "rating", name: t("sort_rating") }
]);

const labelStyles = computed(() => ({
  color: "var(--color-primary-dark)",
  marginRight: "0.5rem",
  padding: "0",
  lineHeight: "22px",
  fontWeight: 500,
  fontSize: windowWidth.value < 500 ? "10px" : "15px"
}));

const syncWithRoute = () => {
  const sortFromRoute = route.query.sort;
  if (sortFromRoute) {
    const option = sortOptions.value.find(opt => opt.code === sortFromRoute);
    if (option) {
      selectedOption.value = option;
    }
  }
};

const applySort = () => {
  const updatedQuery = {
    ...route.query,
    sort: selectedOption.value.code
  };
  router.push({ query: updatedQuery });
};

onMounted(syncWithRoute);
watch(() => route.query.sort, syncWithRoute);
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