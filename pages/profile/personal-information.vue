<template>
  <div class="personal-information">
    <LoadingOverlay :visible="isLoading"/>
    <h1 class="title-lg-20 mb-[30px]">{{ t('contact_information') }}</h1>
    <FieldsBlock v-if="userData && userData._id" class="mb-[73px]" :config="config.fields" ref="fieldsBlock" :data="userData"/>
    <FieldsBlockSkeleton v-else/>
      <div
        class="max-w-[338px] mx-auto py-[10px] px-[10px]">
      <Button v-if="userData && userData._id" @click="savePersonalInformation" :pt="{
        root: {
          class: 'personal-information__btn btn-hover-default'
        }
      }">{{ t('save') }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import FieldsBlockSkeleton from "~/components/Skeletons/FieldsBlockSkeleton/FieldsBlockSkeleton.vue";

definePageMeta({layout: 'profile'})

import {onMounted} from "vue";
import {InputGroup, InputGroupAddon, InputNumber} from "primevue";
import {getCurrentUser, updateInfoAboutUser} from "~/services/api/user-service.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

const {t} = useI18n();

const {currentUser} = storeToRefs(useAuthStore());

const userData = ref({})

const fieldsBlock = ref(null)

const isLoading = ref(false);

const savePersonalInformation = async () => {
  const isValid = fieldsBlock.value?.validateFields()
  const userInfo = fieldsBlock.value?.getData()

  if (isValid) {
    updateInfoAboutUser(currentUser.value._id, userInfo)
  }
}

const loadUserData = async () => {
  isLoading.value = true
  try {
    userData.value = await getCurrentUser()
  } catch (e) {
    console.error('Ошибка при загрузке пользователя', e)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

onMounted(async () => {

  await loadUserData()

})

const config = {
  fields: {
    items: [
      {
        name: 'firstName',
        code: 'firstName',
        label: computed(() => t('user_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Username is required"),
        ],
      },

      {
        name: 'country',
        code: 'country',
        label: computed(() => t('country')),
        type: 'InputText',
        props: {
          side: 'right',
          half: true,
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "Country is required"),
        ],
      },

      {
        name: 'postCode',
        code: 'postCode',
        label: computed(() => t('post_code')),
        type: 'InputNumber',
        props: {
          side: 'right',
          half: true,
          placeholder: '',
          useGrouping: false,
        },
        validators: [
          (value) => (value ? true : "Postal Code is required"),
        ],
      },
      {
        name: 'state',
        code: 'state',
        label: computed(() => t('state')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "State is required"),
        ],
      },
      {
        name: 'city',
        code: 'city',
        label: computed(() => t('city')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "City is required"),
        ],
      },
      {
        name: 'street',
        code: 'street',
        label: computed(() => t('street_address')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "Street is required"),
        ],
      },
      {
        name: 'deliveryComment',
        code: 'deliveryComment',
        label: computed(() => t('note_to_delivery')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('last_name')),
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
        name: 'email',
        code: 'email',
        label: computed(() => t('email')),
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
        name: 'phone',
        code: 'phone',
        label: computed(() => t('phone_number')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Phone is required"),
          (value) => (value?.toString().length <= 11 ? true : "Phone number must be no more than 11 digits")
        ],
        render: ({modelValue, 'onUpdate:modelValue': update, disabled }) =>
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
                  defaultValue: null,
                  disabled
                })
              ]
            })
      },

    ]
  }
}

</script>

<style scoped>
.personal-information__btn {
  width: 100%;
  border-radius: var(--default-rounded);
  background-color: var(--color-primary-dark);
}

.personal-information__btn:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 500px) {
  .personal-information {
    padding: 15px;
  }
}
</style>