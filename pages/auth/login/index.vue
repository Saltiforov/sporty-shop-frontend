<template>
  <div class="login max-w-[1230px] mx-auto">
    <h1 class="login-title large-title text-center mb-10">
      {{ t('login') }}
    </h1>
    <AuthComponent :is-login="true" :responsive="true"/>
  </div>
</template>

<script setup>
import { useWindowWidthWatcher } from '~/composables/useWindowWidthWatcher.js'
import { onMounted, watch, computed } from 'vue'

definePageMeta({
  layout: 'static',
})

const router = useRouter()
const { t } = useI18n()

const getWidth = useWindowWidthWatcher()
const windowWidth = computed(() => getWidth())

const redirectIfTooWide = () => {
  if (windowWidth.value >= 680) {
    router.replace('/')
  }
}

onMounted(() => {
  redirectIfTooWide()
})

watch(windowWidth, () => {
  redirectIfTooWide()
})
</script>
