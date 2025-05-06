<template>
  <div class="auth-component">
    <LoadingOverlay :visible="isLoading"/>
    <FieldsBlock
        class="scrollable-fields-block"
        :config="fieldsConfig.fields"
        ref="fieldsBlock"
    />
    <div v-if="isLogin" class="reset-password justify-end mb-[27px] flex">
      <NuxtLink><p class="text-[var(--color-muted-gray)]">{{ t('forgot_password') }}</p></NuxtLink>
    </div>
    <div :class="[
        'mx-auto  mb-[37px]',
        isLogin ? 'max-w-[320px]' : 'max-w-[386px] pt-[15px]'
    ]" class="auth-button-wrapper">
      <Button @click="handleAuth":pt="{ root: { class: 'auth-button btn-hover-default' } }">{{
          buttonLabel
        }}
      </Button>
    </div>
    <div class="flex mb-[16px] items-center justify-center gap-4">
      <div class="max-w-[196px] w-full h-px bg-[var(--color-primary-pure-white)]"></div>
      <h2 class="murecho-font text-[12px] fw-400">{{ t('or') }}</h2>
      <div class="max-w-[196px] w-full h-px bg-[var(--color-primary-pure-white)]"></div>
    </div>
    <div :class="[
        'login-with mb-6 flex flex-col items-center justify-center',
        isLogin ? 'border-b border-[var(--color-primary-pure-white)]' : ''
    ]">
      <div class="mb-[14px]">
        <NuxtLink><p class="murecho-font text-[12px] text-[var(--color-muted-gray)]">
          {{ isLogin ? t('login_with') : t('register_with') }}</p></NuxtLink>
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
          <p class="mr-[17px]">{{ t('new_client') }}</p>
          <p>
            <NuxtLink @click="authPopup.setType('register')"
                      class="text-[var(--color-primary-dark-red)] cursor-pointer">{{ t('register_button') }}
            </NuxtLink>
            {{ t('for_good_offers') }}
          </p>
        </div>
        <p v-else class="text-[var(--color-muted-gray)]">{{ t('user_agreement') }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import {InputGroup, InputGroupAddon, InputNumber, Password} from "primevue";

import {storeToRefs} from 'pinia';
import {useAuthStore} from '~/stores/auth';
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

const fieldsBlock = ref(null);

const {authenticateUser, registerUser} = useAuthStore();

const {authenticated} = storeToRefs(useAuthStore());

const {t} = useI18n();

const authPopup = useAuthPopup()

const isLoading = ref(false);

const {isLogin} = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

const handleAuth = async () => {
  isLoading.value = true;

  const isValid = fieldsBlock.value?.validateFields()
  const user = fieldsBlock.value?.getData()

  const action = isLogin ? authenticateUser : registerUser;

  if (isValid) {
    try {
      await action(user);

      if (authenticated) {
        authPopup.close();
        navigateTo('/profile/personal-information')
      }
    } catch (error) {
      console.error("Ошибка при аутентификации:", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }
}

const buttonLabel = computed(() => isLogin ? t('login') : t('register_button'))

const fieldsConfig = computed(() => isLogin ? loginFields : registerFields)

const loginFields = {
  fields: {
    items: [
      {
        name: 'username',
        code: 'username',
        label: computed(() => t('auth_phone_or_email')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Username is required"),
          (value) => (value.length >= 3 ? true : "Username must be at least 3 characters"),
        ],
      },

      {
        name: 'password',
        code: 'password',
        label: computed(() => t('auth_password')),
        type: 'Password',
        props: {
          side: 'left',
          type: 'text',
          feedback: false,
          required: true,
          toggleMask: true,
        },
        validators: [
          (value) => (value ? true : "Password is required"),
        ],
      },
    ]
  }
}

const registerFields = {
  fields: {
    items: [
      {
        name: 'username',
        code: 'username',
        label: 'Username',
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "First Name is required"),
        ],
      },
      {
        name: 'firstName',
        code: 'firstName',
        label: computed(() => t('auth_first_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "First Name is required"),
        ],
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('auth_last_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Last Name is required"),
        ],
      },
      {
        name: 'phone',
        code: 'phone',
        label: computed(() => t('auth_phone_number')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Phone Number is required"),
        ],
        render: ({modelValue, 'onUpdate:modelValue': update}) =>
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
                h(InputNumber, {
                  modelValue,
                  'onUpdate:modelValue': update,
                  useGrouping: false,
                  placeholder: '',
                })
              ]
            })
      },
      {
        name: 'email',
        code: 'email',
        label: computed(() => t('auth_email')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Email is required"),
        ],
      },
      {
        name: 'password',
        code: 'password',
        label: computed(() => t('auth_password')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Password is required"),
        ],
        render: ({modelValue, 'onUpdate:modelValue': update}) =>
            h(InputGroup, {}, {
              default: () => [
                h(Password, {
                  placeholder: '',
                  modelValue,
                  'onUpdate:modelValue': update,
                  toggleMask: true,
                  feedback: false,
                  pt: {
                    input: {class: 'w-full'},
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

.scrollable-fields-block {
  max-height: 480px;
  overflow-y: auto;
  padding-right: 5px;
}

.scrollable-fields-block::-webkit-scrollbar {
  width: 8px;
}

.scrollable-fields-block::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.scrollable-fields-block::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.scrollable-fields-block::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
</style>