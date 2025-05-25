<template>
  <div>
    <Header @handle-mobile-sidebar="handleMobileMenu" :is-open="isOpenMenu"/>
    <MobileSidebar :is-open="isOpenMenu" @close="isOpenMenu = false"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtRouteAnnouncer />
    <ShoppingCart
        :is-open="cartStore.isOpen"
        :cart-items="cartStore.getCartProducts"
        @close="cartStore.close"
        @continue-shopping="handleContinueShopping"
    />
    <ResponsiveFooter @handle-mobile-sidebar="handleMobileMenu" :is-open="isOpenMenu"/>
    <Footer />
    <Toast position="bottom-right" group="br" />

  </div>
</template>


<script setup>

import {getStaticPagesInfo} from "~/services/api/static-info.js";

const staticPagesStore = useStaticPages()

const cartStore = useCartStore();

const { $eventBus } = useNuxtApp()

const isOpenMenu = ref(false)

const handleContinueShopping = () => {
  cartStore.close()
  navigateTo('/')
}

const fetchStaticPages = async () => {
  const response = await getStaticPagesInfo()
  staticPagesStore.setPages(response)
}

const handleMobileMenu = () => {
  isOpenMenu.value = !isOpenMenu.value
}

const checkWindowSize = () => {
  if (window.innerWidth > 900 && isOpenMenu.value) {
    isOpenMenu.value = false
  }
}

onMounted(async () => {
  $eventBus.on('user-authenticated', () => {
    isOpenMenu.value = false
  })
  await fetchStaticPages()

  window.addEventListener('resize', checkWindowSize)
})

onBeforeUnmount( () => {
  window.removeEventListener('resize', checkWindowSize)
  $eventBus.off('user-authenticated')
})
</script>