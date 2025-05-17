<template>
  <div v-if="pageInfo">
    <h1>{{ pageInfo.title }}</h1>
    <p v-if="pageInfo" v-html="pageInfo.content"> </p>
  </div>
</template>

<script setup>

import {useStaticPages} from "~/stores/staticPages.js";

definePageMeta({
  layout: 'static',
})

const staticPagesStore = useStaticPages()

const route = useRoute()

const pageName = computed(() => route.name)

const pageInfo = ref(null)

onMounted(() => {
  pageInfo.value = staticPagesStore.getCurrentPage(pageName.value)
})

</script>
