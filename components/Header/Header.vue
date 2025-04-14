<template>
  <header class="flex items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]">
    <div class="logo mr-[67px]">
      <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
    </div>
    <div class="pb-[24px]">
      <LinksList
          :links="links"
          :parent-classes="['flex', 'flex-wrap', 'gap-x-[16px]', 'md:gap-x-[32px]']"
          :link-class="['mr-[32px]', 'text-[#F6F6F6]', 'sm:mr-[32px]', 'md:mr-[53px]', 'last:mr-0', 'font-semibold']"
      />
    </div>


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