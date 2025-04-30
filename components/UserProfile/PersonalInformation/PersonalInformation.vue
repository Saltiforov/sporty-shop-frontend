<template>
  <div class="personal-information">
    <h1 class="title-lg-20 mb-[30px]">{{ t('contact_information') }}</h1>
    <FieldsBlock class="mb-[73px]" :config="config.fields"/>
    <div
        class="max-w-[338px] mx-auto py-[10px] px-[10px]">
      <Button :pt="{
        root: {
          class: 'personal-information__btn'
        }
      }">{{ t('save') }}
      </Button>
    </div>
  </div>
</template>

<script setup >
import {InputGroup, InputGroupAddon, InputText} from "primevue";

const { t } = useI18n();

const config = {
  fields: {
    items: [
      {
        name: 'userName',
        code: 'userName',
        label: computed(() => t('user_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },

      {
        name: 'country',
        code: 'country',
        label: computed(() => t('country')),
        type: 'Select',
        props: {
          side: 'right',
          half: true,
          placeholder: ''
        }
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
        }
      },
      {
        name: 'state',
        code: 'state',
        label: computed(() => t('state')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'city',
        code: 'city',
        label: computed(() => t('city')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'street',
        code: 'street',
        label: computed(() => t('street_address')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'deliveryComment',
        code: 'deliveryComment',
        label: computed(() => t('note_to_delivery')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
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
      },

      {
        name: 'phoneNumber',
        code: 'phoneNumber',
        label: computed(() => t('phone_number')),
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