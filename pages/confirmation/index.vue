<template>
  <ClientOnly>
    <div class="confirmation-wrapper flex items-center justify-center">
      <OrderConfirmationPopup :order="successOrder"/>
    </div>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  layout: 'static',
  middleware: 'order-confirmation'
})

const orderStore = useOrderStore()

const successOrder = ref({})

onMounted(() => {
  successOrder.value = orderStore.getRecentOrder()
})

</script>

<style scoped>

</style>