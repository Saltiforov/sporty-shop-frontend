<template>
  <div class="auth-component">
    <FieldsBlock :config="config.fields"/>
    <div v-if="isLogin" class="reset-password justify-end mb-[27px] flex">
      <NuxtLink><p class="text-[var(--color-muted-gray)]">Забули пароль? Відновити</p></NuxtLink>
    </div>
    <div :class="[
        'mx-auto mb-[37px]',
        isLogin ? 'max-w-[320px]' : 'max-w-[386px]'
    ]" class="auth-button-wrapper">
      <Button  class="auth-button">{{ buttonLabel }}</Button>
    </div>
    <div class="flex mb-[16px] items-center justify-center gap-4">
      <div class="max-w-[196px] w-full h-px bg-[var(--link-color)]"></div>
      <h2 class="murecho-font text-[12px] fw-400">або</h2>
      <div class="max-w-[196px] w-full h-px bg-[var(--link-color)]"></div>
    </div>
    <div :class="[
        'login-with mb-6  flex flex-col items-center justify-center',
        isLogin ? 'border-b border-[var(--link-color)]' : ''
    ]">
      <div class="mb-[14px]">
        <NuxtLink><p class="murecho-font text-[var(--color-muted-gray)]"> {{ isLogin ? 'Увійти за допомогою' : 'Зареєструватись за допомогою' }} </p></NuxtLink>
      </div>

      <div class="login-with__img mb-6">
        <Button>
          <img src="~/assets/icons/google-icon.svg" alt="google-icon">
        </Button>
      </div>

    </div>
    <div class="login-with-footer">
      <div class="flex justify-center">
        <div v-if="isLogin" class="flex">
          <p class="mr-[17px]">Новий клієнт?</p>
          <p><NuxtLink class="text-[var(--color-primary-dark-red)]">Зареєструватись</NuxtLink> для вигідних пропозицій</p>
        </div>
        <p v-else>Реєструючись, ви погоджуєтесь з угодою користувача</p>
      </div>
    </div>
  </div>
</template>


<script setup>

const { isLogin } = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

const buttonLabel = computed(() => isLogin ? 'Увійти' : 'Зареєструватись')

const config = {
  fields: {
    items: [
      {
        name: 'oldPassword',
        code: 'oldPassword',
        label: 'Телефон або email*',
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },

      {
        name: 'password',
        code: 'password',
        label: 'Пароль*',
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },
    ]
  }
}

</script>

<style scoped>
.auth-button {
  background: var(--color-primary-dark);
  width: 100%;
}
</style>