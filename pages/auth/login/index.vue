<template>
  <div class="login max-w-[1230px] mx-auto">
    <h1 class="login-title large-title text-center mb-10">
      {{ t('login') }}
    </h1>
    <AuthComponent :is-login="true" :responsive="true"/>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/auth.js";
import { useWindowWidthWatcher } from "~/composables/useWindowWidthWatcher.js";
import { onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'static',
})

const router = useRouter()

const getWidth = useWindowWidthWatcher()
const windowWidth = computed(() => getWidth())

const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)

const { t } = useI18n()

const  redirectIfNeeded = () => {
  if (isAuthenticated.value || windowWidth.value >= 680) {
    router.replace('/')
  }
}

onMounted(() => {
  redirectIfNeeded()
})

watch(windowWidth, () => {
  redirectIfNeeded()
})
</script>
