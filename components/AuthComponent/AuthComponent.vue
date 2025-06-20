<template>
  <div class="auth-component">
    <LoadingOverlay :visible="isLoading"/>
    <FieldsBlock
        class="fields-block"
        ref="fieldsBlock"
        :config="fieldsConfig.fields"
        :class="{
          'mb-[4px]': isLogin && !responsive,
          'mb-[32px]': !isLogin && !responsive
        }"
    />
    <div v-if="isLogin" class="reset-password justify-end mb-[27px] flex">
      <NuxtLink><p class="text-[var(--color-muted-gray)] text-[14px]">{{ t('forgot_password') }}</p></NuxtLink>
    </div>

    <div :class="wrapperClass">
      <Button @keyup.enter="handleAuth" @click="handleAuth" :pt="{ root: { class: rootClass } }">
        {{ buttonLabel }}
      </Button>
    </div>

    <div v-if="responsive && isLogin || isLogin" :class="['h-[1px]']" :style="dividerStyle"></div>

    <div class="login-with-footer">
      <div v-if="isLogin && !responsive" class="flex text-[12px] justify-center">
        <div class="flex">
          <p class="mr-[17px]">{{ t('new_client') }}</p>
          <p>
            <NuxtLink
                @click="authPopup.setType('register')"
                class="text-[var(--color-primary-dark-red)] cursor-pointer"
            >
              {{ t('register_button') }}
            </NuxtLink>
            {{ t('for_good_offers') }}
          </p>
        </div>
      </div>
      <div v-else-if="!isLogin" class="flex text-[12px] justify-center">
        <p class="text-[var(--color-muted-gray)]">{{ t('user_agreement') }}</p>
      </div>
      <div v-if="responsive && isLogin" :class="wrapperClass">
        <p class="title-lg-20 text-center mb-[26px]">{{ t('new_client') }}</p>
        <Button
            @click="() => navigateTo('/auth/register')"
            :pt="{ root: { class: rootClass } }"
        >
          {{ t('register_button') }}
        </Button>
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

const { $eventBus } = useNuxtApp()

const {authenticateUser, registerUser} = useAuthStore();

const {authenticated} = storeToRefs(useAuthStore());

const {t} = useI18n();

const authPopup = useAuthPopup()

const isLoading = ref(false);

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  },
  responsive: {
    type: Boolean,
    default: false
  }
})

const handleAuth = async () => {
  isLoading.value = true;

  const isValid = fieldsBlock.value?.validateFields()
  const user = fieldsBlock.value?.getData()

  const action = props.isLogin ? authenticateUser : registerUser;

  if (isValid) {
    try {
      await action(user);

      if (authenticated) {
        authPopup.close();
        $eventBus.emit('user-authenticated')
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

const wrapperClass = computed(() => [
  'auth-button-wrapper',
  'murecho-font',
  'mx-auto',
  'mb-[36px]',
  props.responsive && props.isLogin ? 'login-responsive-class' : '',
  props.responsive && !props.isLogin ? 'non-login-responsive-class' : '',
  props.isLogin  && !props.responsive ? 'max-w-[320px]' : 'max-w-[386px]',
  (!props.isLogin && props.responsive) ? 'responsive-class' : ''
])

const rootClass = computed(() => [
  'auth-button btn-hover-default',
  props.responsive ? 'responsive-class-root' : ''
])

const dividerStyle = computed(() => {
  const baseStyles = {
    marginBottom: '24px',
    height: '1px',
  }

  if (props.responsive) {
    return {
      ...baseStyles,
      backgroundColor: 'var(--color-primary-blue)',
    }
  }

  if (props.isLogin && !props.responsive) {
    return {
      ...baseStyles,
      backgroundColor: 'var(--color-primary-pure-white)',
    }
  }

  return {}
})


const buttonLabel = computed(() => props.isLogin ? t('login') : t('register_button'))

const fieldsConfig = computed(() => props.isLogin ? loginFields : registerFields)

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
          (value) => (value ? true : t('validation_username_required')),
          (value) => (value.length >= 3 ? true : t('validation_username_min_length')),
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
          (value) => (value ? true : t('validation_password_required')),
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
        label: computed(() => t('auth_username')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : t('validation_username_required')),
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
          (value) => (value ? true : t('validation_first_name_required')),
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
          (value) => (value ? true : t('validation_last_name_required')),
        ],
      },
      {
        name: 'phone',
        code: 'phone',
        label: computed(() => t('auth_phone_number')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'tel',
          placeholder: '',
          required: true,
          onKeydown: (e) => {
            const allowedKeys = [
              'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
              '+', '-', '(', ')', ' '
            ];
            if (
                !allowedKeys.includes(e.key) &&
                !e.key.match(/[0-9]/)
            ) {
              e.preventDefault();
            }
          }
        },
        validators: [
          (value) => (value ? true : t('validation_phone_required')),
        ],
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
          (value) => (value ? true : t('validation_email_required')),
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
          (value) => (value ? true : t('validation_password_required')),
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

.login-responsive-class {
  width: 243px;
  font-size: 14px;
  margin-bottom: 24px;
}
.non-login-responsive-class {
  width: 285px;
}
.responsive-class-root {
  font-size: 14px;
  padding: 10px 10px;
}
</style>