<template>
  <section class="order-history">
    <h1 class="title-semibold-24 mb-[30px]">{{ t('contact_information') }}</h1>

    <template v-if="isLoading">
      <OrderSkeletonItem v-for="i in 8" :key="'loading-skeleton-' + i" />
    </template>

    <template v-else>
      <OrderHistoryItem v-if="orderList.length" :order-list="orderList" />
      <p v-else class="empty-message no-data-text">{{ t('no_orders_message') }}</p>
    </template>
  </section>
</template>
<script setup>
import OrderSkeletonItem from "~/components/Skeletons/OrderItemSkeleton/OrderSkeletonItem.vue";

definePageMeta({layout: 'profile'})
import OrderHistoryItem from "~/components/UserProfile/OrderHistory/OrderHistoryItem/OrderHistoryItem.vue";
import {getOrdersByUserId} from "~/services/api/order-service";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth";

import { mapOrdersToSummaries } from "~/utils/index.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

const {currentUser} = storeToRefs(useAuthStore());

const isLoading = ref(false);

const {t} = useI18n();

const userId = computed(() => currentUser.value?._id);

const orderList = ref([])

const fetchOrders = async () => {
  isLoading.value = true;
  const response = await getOrdersByUserId(userId.value, {limit: 1, skip: 0})
  orderList.value = mapOrdersToSummaries(response)
  isLoading.value = false;
}


onMounted(async () => {
  await fetchOrders()
})

</script>

<style scoped>

</style>