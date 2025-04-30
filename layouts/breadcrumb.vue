<template>
  <div class="min-h-screen flex flex-col">
    <Header/>

    <main class="flex-1 w-full max-w-[1690px] mx-auto p-[0px_15px]">
      <div class="breadcrumb">
        <Breadcrumb class="pt-[36px]" :home="home" :model="items">
          <template #item="{ item }">
            <a class="cursor-pointer" :href="item.url">
              <p>{{ item.label }}</p>
            </a>
          </template>
          <template #separator> / </template>
        </Breadcrumb>
      </div>

      <NuxtPage />
    </main>

    <Footer/>
  </div>
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

