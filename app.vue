<template>
  <div>
    <Header
        :is-open="isOpenMenu"
        @handle-mobile-sidebar="handleMobileMenu"
    />
    <MobileSidebar
        :is-open="isOpenMenu"
        :content="mobileSidebarContent"
        @close="isOpenMenu = false"
    />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    <NuxtRouteAnnouncer/>
    <ShoppingCart
        :is-open="cartStore.isOpen"
        :cart-items="cartStore.getCartProducts"
        @close="cartStore.close"
        @continue-shopping="handleContinueShopping"
    />
    <Footer
        :is-mobile-sidebar-open="isOpenMenu"
        @handle-mobile-sidebar="handleMobileMenu"
    />
    <Toast
        position="bottom-right"
        group="br"
    />
  </div>
</template>


<script setup>

import {getStaticPagesInfo} from "~/services/api/static-info.js";
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher.js";
import {computed} from "vue";

const getWidth = useWindowWidthWatcher()

const staticPagesStore = useStaticPages()

const cartStore = useCartStore();

const {$eventBus} = useNuxtApp()

const auth = useAuthStore()

const mobileSidebarContent = ref('menu')

const isOpenMenu = ref(false)

const isMobileToast = computed(() => getWidth() < 500)

const handleContinueShopping = () => {
  cartStore.close()
  navigateTo('/')
}

const fetchStaticPages = async () => {
  const response = await getStaticPagesInfo()
  staticPagesStore.setPages(response)
}

const setMobileSidebarContent = (content) => {
  mobileSidebarContent.value = content
}

const handleMobileMenu = () => {
  setMobileSidebarContent('menu')
  isOpenMenu.value = !isOpenMenu.value
}

const checkWindowSize = () => {
  if (window.innerWidth > 900 && isOpenMenu.value) {
    isOpenMenu.value = false
  }
}

onMounted(async () => {

  // auth.restoreAuthFromLocalStorage()

  $eventBus.on('user-authenticated', () => {
    isOpenMenu.value = false
  })
  $eventBus.on('static-info-mounted', () => {
    isOpenMenu.value = false
  })
  $eventBus.on('handle-mobile-filters', () => {
    setMobileSidebarContent('filters')
    isOpenMenu.value = true
  })

  await fetchStaticPages()
  window.addEventListener('resize', checkWindowSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWindowSize)
  $eventBus.off('user-authenticated')
  $eventBus.off('static-info-mounted')
  $eventBus.off('handle-mobile-filters')
})
</script>