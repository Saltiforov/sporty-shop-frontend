<template>
  <footer class="pt-[21px] pr-3 pl-3">
    <div class="footer-container flex justify-between flex-wrap items-center max-w-[1170px] px-[15px] mx-auto">
      <div class="left-side flex w-full max-w-[661px] justify-between flex-wrap sm:flex-nowrap gap-2">
        <img src="@/assets/images/footer-logo.svg" alt="footer-logo.svg">
        <div class="links-list flex w-full max-w-[411px] justify-between flex-wrap sm:flex-nowrap gap-2">
          <div v-for="(list, index) in links" :key="index">
            <h2 class="mb-2 small-title">{{ list.title }}</h2>
            <LinksList :links="list.links" :parentClasses="['']"
                       :linkClass="['text-[var(--link-color)]', 'last:mr-0', 'mb-[6px]', 'link-text']"/>
          </div>
        </div>
      </div>
      <div class="right-side w-full max-w-[393px] justify-between flex-wrap sm:flex-nowrap gap-2  flex">
        <div class="contacts-wrapper">
          <div class="contacts ml-4 mb-3">
            <p class="small-title">Контакти</p>
            <NuxtLink class="text-[var(--link-color)] link-text" to="/news">qwerty@gmail.com</NuxtLink>
          </div>
          <div class="contacts-links w-[182px] flex justify-between items-center">
            <NuxtLink to="https://www.instagram.com/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-instagram.svg" alt="social-instagram.svg">
              <p class="link-text">Instagram</p>
            </NuxtLink>
            <NuxtLink to="https://web.telegram.org/a/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-telegram.svg" alt="social-telegram.svg">
              <p class="link-text">Telegram</p>
            </NuxtLink>
          </div>
        </div>
        <div class="our-social max-w-[102px] w-full">
          <div><p class="small-title mb-5">Наші соцмережі</p></div>
          <div class="flex justify-between">
            <NuxtLink to="https://www.instagram.com/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-instagram.svg" alt="social-instagram.svg">
            </NuxtLink>
            <NuxtLink to="https://web.telegram.org/a/" class="flex flex-col items-center text-center gap-1">
              <img src="@/assets/images/social-telegram.svg" alt="social-telegram.svg">
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">

const links = ref([
  {
    title: 'Про нас',
    links: [
      {label: 'Про нас', page: '/page1'},
      {label: 'Гарантії', page: '/page1'},
      {label: 'Умови використання', page: '/page1'},
    ]
  },
  {
    title: 'Для покупців',
    links: [
      {label: 'Способи оплати', page: '/page3'},
      {label: 'Доставка', page: '/page3'},
      {label: 'F.Q.A.', page: '/page3'},
    ]
  },
])

</script>

<style scoped>

</style>