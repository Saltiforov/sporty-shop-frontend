<template>
  <div class="auth-component">
    <FieldsBlock :config="fieldsConfig.fields"/>
    <div v-if="isLogin" class="reset-password justify-end mb-[27px] flex">
      <NuxtLink><p class="text-[var(--color-muted-gray)]">{{ t('forgotPassword') }}</p></NuxtLink>
    </div>
    <div :class="[
        'mx-auto mb-[37px]',
        isLogin ? 'max-w-[320px]' : 'max-w-[386px]'
    ]" class="auth-button-wrapper">
      <Button :pt="{ root: { class: 'auth-button' } }">{{ buttonLabel }}</Button>
    </div>
    <div class="flex mb-[16px] items-center justify-center gap-4">
      <div class="max-w-[196px] w-full h-px bg-[var(--link-color)]"></div>
      <h2 class="murecho-font text-[12px] fw-400">{{ t('or') }}</h2>
      <div class="max-w-[196px] w-full h-px bg-[var(--link-color)]"></div>
    </div>
    <div :class="[
        'login-with mb-6 flex flex-col items-center justify-center',
        isLogin ? 'border-b border-[var(--link-color)]' : ''
    ]">
      <div class="mb-[14px]">
        <NuxtLink><p class="murecho-font text-[12px] text-[var(--color-muted-gray)]">{{ isLogin ? t('loginWith') : t('registerWith') }}</p></NuxtLink>
      </div>

      <div class="login-with-wrapper mb-6">
        <Button :pt="{ root: { class: 'login-with__img' } }">
          <img src="~/assets/icons/google-icon.svg" alt="google-icon">
        </Button>
      </div>
    </div>
    <div class="login-with-footer">
      <div class="flex text-[12px] justify-center">
        <div v-if="isLogin" class="flex">
          <p class="mr-[17px]">{{ t('newClient') }}</p>
          <p><NuxtLink @click="authPopup.setType('register')"  class="text-[var(--color-primary-dark-red)] cursor-pointer">{{ t('registerButton') }}</NuxtLink> {{ t('forGoodOffers') }}</p>
        </div>
        <p v-else class="text-[var(--color-muted-gray)]">{{ t('userAgreement') }}</p>
      </div>
    </div>
  </div>
</template>



<script setup>
import {InputGroup, InputGroupAddon, InputText, Password} from "primevue";

const { t } = useI18n();

const authPopup = useAuthPopup()

const { isLogin } = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

const buttonLabel = computed(() => isLogin ? t('login') : t('registerButton'))

const fieldsConfig = computed(() => isLogin ? loginFields : registerFields)

const loginFields = {
  fields: {
    items: [
      {
        name: 'oldPassword',
        code: 'oldPassword',
        label: computed(() => t('authPhoneOrEmail')),
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
        label: computed(() => t('authPassword')),
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

const registerFields = {
  fields: {
    items: [
      {
        name: 'firstName',
        code: 'firstName',
        label: computed(() => t('authFirstName')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('authLastName')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },
      {
        name: 'phoneNumber',
        code: 'phoneNumber',
        label: computed(() => t('authPhoneNumber')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        render: () =>
            h(InputGroup, {}, {
              default: () => [
                h(InputGroupAddon, {
                  pt: {
                    root: {
                      style: {
                        backgroundColor: 'white',
                        color: 'var(--color-primary-dark)',
                      }
                    }
                  }
                }, () => '+380'),
                h(InputText, {placeholder: ''})
              ]
            })
      },
      {
        name: 'email',
        code: 'email',
        label: computed(() => t('authEmail')),
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
        label: computed(() => t('authPassword')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        render: () =>
            h(InputGroup, {}, {
              default: () => [
                h(Password, {
                  placeholder: '',
                  toggleMask: true,
                  feedback: false,
                  pt: {
                    input: { class: 'w-full' },
                  },
                }),
              ]
            })
      }


    ]
  }
}
</script>

<style scoped>
.auth-button {
  background: var(--color-primary-dark);
  width: 100%;
}
.auth-button:hover {
  background: var(--color-primary-dark);
  width: 100%;
}

.login-with__img {
  background: transparent;
  border: none;
}
.login-with__img:hover {
  background: transparent;
  border: none;
}
</style>