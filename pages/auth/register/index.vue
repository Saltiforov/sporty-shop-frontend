<template>
  <div class="register max-w-[1230px] mx-auto">
    <h1 class="login-title large-title text-center mb-10">
      {{ t('register') }}
    </h1>
    <AuthComponent :is-login="false"/>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'static',
})

const { t } = useI18n()
</script>


<style scoped>

</style>