<template>
  <div class="personal-information">
    <LoadingOverlay :visible="isLoading"/>
    <div class="personal-information-content">
      <div class="main-content">
        <h1 class="personal-information-title title-semibold-24 mb-[30px]">{{ t('contact_information') }}</h1>
        <FieldsBlock v-if="userData && userData._id" class="personal-information-fields-block mb-[73px] murecho-font"
                     :config="config.fields" ref="fieldsBlock" :data="formattedUserData"/>
        <FieldsBlockSkeleton v-else/>
      </div>
      <div class="footer">
        <div
            class="'personal-information-wrapper__btn max-w-[338px] mx-auto">
          <Button v-if="userData && userData._id" @click="savePersonalInformation" :pt="{
        root: {
          class: 'personal-information__btn btn-hover-default'
        }
      }">{{ t('save') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FieldsBlockSkeleton from "~/components/Skeletons/FieldsBlockSkeleton/FieldsBlockSkeleton.vue";

definePageMeta({layout: 'profile'})

import {updateInfoAboutUser} from "~/services/api/user-service.js";
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/stores/auth.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";

const {t} = useI18n();

const {currentUser} = storeToRefs(useAuthStore());

const userData = computed(() => currentUser.value || {});

const formattedUserData = computed(() => {
  const {address = {}, ...rest} = userData.value || {};

  return {
    ...rest,
    ...address
  };
})

const fieldsBlock = ref(null)

const isLoading = ref(false);

const buildPersonalInfoPayload = (info) => {
  const {
    city,
    postalCode,
    street,
    country,
    ...rest
  } = info;

  return {
    ...rest,
    address: {
      city,
      postalCode,
      street,
      country,
    },
  };
};

const savePersonalInformation = async () => {
  const isValid = fieldsBlock.value?.validateFields()
  const userInfo = fieldsBlock.value?.getData()

  if (isValid) {
    updateInfoAboutUser(currentUser.value._id, buildPersonalInfoPayload(userInfo))
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
        name: 'postalCode',
        code: 'postalCode',
        label: computed(() => t('post_code')),
        type: 'InputNumber',
        props: {
          side: 'right',
          half: true,
          placeholder: '',
          useGrouping: false,
          modelValue: 'postalCode',
        },
        validators: [
          (value) => (value ? true : "Postal Code is required"),
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
          (value) => (value ? true : "Phone Number is required"),
        ],
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

@media (max-width: 800px) {
  .personal-information-fields-block {
    margin-bottom: 26px;
  }
}

@media (max-width: 520px) {
  .personal-information-wrapper__btn {
    padding: 0;
  }

  .personal-information__btn {
    font-size: 14px !important;

  }

  .main-content {
    max-width: 269px;
    margin: 0 auto;
  }

  .personal-information-fields-block {
    max-width: 100%;
  }
}

</style>