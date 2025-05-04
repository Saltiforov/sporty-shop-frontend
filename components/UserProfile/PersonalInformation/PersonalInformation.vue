<template>
  <div class="personal-information">
    <h1 class="title-lg-20 mb-[30px]">{{ t('contact_information') }}</h1>
    <FieldsBlock class="mb-[73px]" :config="config.fields" :data="$attrs" ref="fieldsBlock"/>
    <div
        class="max-w-[338px] mx-auto py-[10px] px-[10px]">
      <Button @click="savePersonalInformation" :pt="{
        root: {
          class: 'personal-information__btn btn-hover-default'
        }
      }">{{ t('save') }}
      </Button>
    </div>
  </div>
</template>

<script setup >
import {InputGroup, InputGroupAddon, InputNumber} from "primevue";
import {updateInfoAboutUser} from "~/services/api/user-service.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth.js";

const { t } = useI18n();

const {currentUser} = storeToRefs(useAuthStore());

const fieldsBlock = ref(null)

const savePersonalInformation = async () => {
  const isValid = fieldsBlock.value?.validateFields()
  const userInfo = fieldsBlock.value?.getData()

  if (isValid) {
    updateInfoAboutUser(currentUser.value._id, userInfo)
  }

}

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
        type: 'InputText',
        props: {
          side: 'right',
          half: true,
          placeholder: ''
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
                  defaultValue: null
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

</style>