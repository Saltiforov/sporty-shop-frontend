<template>
  <header class="bg-white flex items-end p-4">
    <div class="logo mr-[67px]">
      <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
    </div>

    <LinksList
        :links="links"
        :parent-classes="['flex', 'flex-wrap', 'gap-x-[16px]', 'md:gap-x-[32px]']"
        :link-class="['mr-[32px]', 'sm:mr-[32px]', 'md:mr-[53px]', 'last:mr-0', 'font-semibold']"
    />

  </header>
</template>

<script setup>

const links = ref([
  {
    label: "КАТАЛОГ",
    icon: "pi pi-filter",
    page: "catalog",
  },
  {
    label: "АКЦІЇ", icon: "pi pi-shopping-cart", page: "promotions",
  },
  {
    label: "НОВИНКИ", icon: "pi pi-user", page: "new",
  },
  {
    label: "ДОСТАВКА ТА ОПЛАТА", icon: "pi pi-user", page: "shipping-and-payment",
  },
  {
    label: "ПРО НАС", icon: "pi pi-user", page: "about-us",
  },
])
</script>

<style scoped>

</style>