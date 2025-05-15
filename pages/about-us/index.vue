<template>
  <h1>ABOUT US PAGE</h1>
</template>

<script setup>

import {useStaticPages} from "~/stores/staticPages";

definePageMeta({
  layout: 'breadcrumb',
})

const staticPagesStore = useStaticPages()

const pageInfo = ref(null)

onMounted(() => {
  pageInfo.value = staticPagesStore.getCurrentPage('about-us')
})

</script>

<style scoped>

</style>