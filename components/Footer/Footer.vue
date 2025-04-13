<template>
  <footer class="bg-[#3D3D3D] p-4 flex justify-around items-center h-[300px]">

    <div class="left-side flex">
      <div v-for="(list, index) in links" :key="index" class="links-list">
        <h2 class="text-[#A3A3A7] mb-[10px] fw-200 text-[13px]">{{ list.title }}</h2>
        <LinksList :links="list.links" :parentClasses="['mr-[83px]']"
                   :linkClass="['text-[#FFFFFF]', 'last:mr-0', 'mb-[6px]', 'text-[15px]', 'fw-400']"/>
      </div>
    </div>
    <div class="right-side">
      <div class="subs-to-news text-[#A3A3A7]">
        <NuxtLink to="/news">Підписка на новини</NuxtLink>
      </div>
    </div>


  </footer>
</template>

<script setup lang="ts">

const links = ref([
  {
    title: 'Про компанію',
    links: [
      {label: 'Про нас', page: '/page1'},
      {label: 'Умови використання', page: '/page1'},
      {label: 'Політика конфіденційності', page: '/page1'},
      {label: 'Контакти', page: '/page1'},
    ]
  },
  {
    title: 'Покупцям',
    links: [
      {label: 'Доставка та оплата', page: '/page3'},
      {label: 'Повернення товару', page: '/page3'},
      {label: 'Акції ', page: '/page3'},
    ]
  },
  {
    title: 'Допомога',
    links: [
      {label: 'Часті запитання (FAQ)', page: '/page5'},
      {label: 'Як зробити замовлення?', page: '/page5'},
      {label: 'Гарантія', page: '/page5'},
      {label: "Зв'язатися з нами", page: '/page5'},
    ]
  }
])

</script>

<style scoped>
</style>