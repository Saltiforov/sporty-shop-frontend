<template>
  <div class="order-history">
    <LoadingOverlay :visible="isLoading"/>
    <h1 class="title-lg-20 mb-[30px]">{{ t('contact_information') }}</h1>
    <OrderHistoryItem v-if="orderList.length" :order-list="orderList"/>
    <OrderSkeletonItem v-else v-for="i in 8" :key="'loading-skeleton-' + i"/>
  </div>
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
  const response = await getOrdersByUserId(userId.value, {limit: 8, skip: 0})
  orderList.value = mapOrdersToSummaries(response)
  isLoading.value = false;
}


onMounted(async () => {
  await fetchOrders()
})

</script>

<style scoped>

</style>