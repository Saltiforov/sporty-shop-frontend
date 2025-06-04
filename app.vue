<template>
  <div>
    <Header @handle-mobile-sidebar="handleMobileMenu" :is-open="isOpenMenu"/>
    <MobileSidebar :is-open="isOpenMenu" @close="isOpenMenu = false"/>
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
    <Footer @handle-mobile-sidebar="handleMobileMenu" :is-mobile-sidebar-open="isOpenMenu"/>
    <Toast
        :class="{
          'max-w-[240px] top-[70]': isMobileToast
        }"
        :pt="toastPt"
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

const isOpenMenu = ref(false)

const isMobileToast = computed(() => getWidth() < 500)

const handleContinueShopping = () => {
  cartStore.close()
  navigateTo('/')
}

const toastPt = computed(() => {
  return {
    message: {
      style: {
        width: isMobileToast.value ? '250px' : '',
      }
    },
    messageContent: {
      style: {
        padding: isMobileToast.value ? '5px' : '',
      }
    },
    summary: {
      style: {
        fontSize: isMobileToast.value ? '14px' : '',
      }
    },
    detail: {
      style: {
        fontSize: isMobileToast.value ? '12px' : '',
      }
    },
  }
})

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
  $eventBus.on('static-info-mounted', () => {
    isOpenMenu.value = false
  })
  await fetchStaticPages()
  window.addEventListener('resize', checkWindowSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWindowSize)
  $eventBus.off('user-authenticated')
  $eventBus.off('static-info-mounted')
})
</script>