<template>
  <div class="order-history">
    <h1 class="title-lg-20 mb-[30px]">{{ t('contact_information') }}</h1>
    <OrderHistoryItem/>
  </div>
</template>

<script setup lang="ts">

import OrderHistoryItem from "~/components/UserProfile/OrderHistory/OrderHistoryItem/OrderHistoryItem.vue";
const { t } = useI18n();

</script>

<style scoped>

</style>