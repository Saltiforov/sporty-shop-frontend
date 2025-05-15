<template>
  <Breadcrumb class="breadcrumb" :home="home" :model="items">
    <template #item="{ item }">
      <a class="cursor-pointer" :href="item.url">
        <p>{{ item.label }}</p>
      </a>
    </template>
    <template #separator> / </template>
  </Breadcrumb>
</template>

<script setup>
const { t } = useI18n();

const home = ref({ icon: 'pi pi-home' });
const items = [
  { label: computed(() => t('navigation_home')), to: '/' },
  { label: computed(() => t('navigation_catalog')), to: '/catalog' },
  { label: computed(() => t('navigation_sport_nutrition')), to: '/catalog/sport-nutrition' },
  { label: computed(() => t('navigation_boosters')), to: '/catalog/sport-nutrition/boosters' }
]
</script>



<style scoped>
.breadcrumb {
  padding: 35px 10px;
}
</style>