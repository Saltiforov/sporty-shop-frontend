<template>
  <header class="flex items-end pt-[13px] pr-[24px] pb-[8px] pl-[71px]">
    <div class="logo mr-[67px]">
      <NuxtLink to="/"><img src="../../assets/images/header-logo.svg" alt="header-logo"></NuxtLink>
    </div>
    <div class="pb-[24px] justify-between items-center flex w-full items-end">
      <LinksList
          :links="links"
          :parent-classes="['flex', 'flex-wrap', 'gap-x-[16px]', 'md:gap-x-[32px]']"
          :link-class="['mr-[32px]', 'text-[#F6F6F6]', 'sm:mr-[32px]', 'md:mr-[53px]', 'last:mr-0', 'font-semibold']"
      />

      <div class="search-field  max-w-[425px] w-full">
        <IconField >
          <InputText :pt="{
          root: {
            class: 'header-search-field'
          }
        }" placeholder="Пошук..." />
          <InputIcon class="pi pi-search" />
        </IconField>
      </div>

      <div class="action-panel max-w-[134px] w-full h-[36px] flex justify-between">
        <Button :pt="{
          root: {
            class: 'action-panel-icon'
          }
        }"  v-for="icon in actionIcons">
          <img :src="icon" alt="action-icon.svg">
        </Button>
      </div>
    </div>

  </header>
</template>

<script setup>
import IconFavorite from '~/assets/icons/favorite-icon-heart.svg'
import IconUser from '~/assets/icons/user-icon.svg'
import IconCart from '~/assets/icons/shopping-cart-icon.svg'

const actionIcons = [ IconFavorite, IconUser, IconCart ]

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
.action-panel-icon {
  background: transparent;
  border: none;
  padding: 0;
}
.action-panel-icon:hover {
  background: transparent;
  border: none;
  padding: 0;
}

.header-search-field {
  width: 100%;
  padding: 11px 0 11px 14px;
  border-radius: 12px;
}

</style>