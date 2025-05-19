<template>
  <div>
    <Header @handle-mobile-sidebar="handleMobileMenu" :is-open="isOpenMenu"/>
    <MobileSidebar :is-open="isOpenMenu" @close="isOpenMenu = false"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtRouteAnnouncer />
    <ResponsiveFooter @handle-mobile-sidebar="handleMobileMenu" :is-open="isOpenMenu"/>
    <Footer />
  </div>
</template>


<script setup>

import {getStaticPagesInfo} from "~/services/api/static-info.js";

const staticPagesStore = useStaticPages()

const authPopup = useAuthPopup()

const { $eventBus } = useNuxtApp()

const isOpenMenu = ref(false)

const fetchStaticPages = async () => {
  const response = await getStaticPagesInfo()
  staticPagesStore.setPages(response)
}

const handleMobileMenu = () => {
  isOpenMenu.value = !isOpenMenu.value
}

onMounted(async () => {
  $eventBus.on('handle-mobile-sidebar-login', () => {
    isOpenMenu.value = true
    $eventBus.emit('set-active-tab-mobile-sidebar')
  })
  $eventBus.on('user-authenticated', () => {
    isOpenMenu.value = false
  })
  await fetchStaticPages()
})

onBeforeUnmount( () => {
  $eventBus.off('handle-mobile-sidebar-login')
  $eventBus.off('user-authenticated')
})
</script>