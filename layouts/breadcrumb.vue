<template>
  <div class="min-h-screen flex flex-col">
    <Header/>

    <main class="flex-1 w-full max-w-[1690px] mx-auto p-[0px_15px]">
      <div class="breadcrumb pt-[42px] pb-[35px]">
        <Breadcrumb class="pt-[42px]" :home="home" :model="items">
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

const home = ref({ icon: 'pi pi-home' });
const items = [
  { label: 'Головна', to: '/' },
  { label: 'Каталог', to: '/catalog' },
  { label: 'Спортивне харчування', to: '/catalog/sport-nutrition' },
  { label: 'Бустери', to: '/catalog/sport-nutrition/boosters' }
]

</script>

