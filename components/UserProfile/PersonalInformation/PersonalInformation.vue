<template>
  <div class="personal-information">
    <h1 class="title-lg-20 mb-[30px]">Контактна інформація</h1>
    <FieldsBlock :config="config.fields"/>
    <div
        class="max-w-[338px] mx-auto py-[10px] px-[10px]">
      <Button :pt="{
        root: {
          class: 'personal-information__btn'
        }
      }">Зберегти
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {InputGroup, InputGroupAddon, InputText} from "primevue";

const config = {
  fields: {
    items: [
      {
        name: 'userName',
        code: 'userName',
        label: 'Ім’я*',
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
        label: 'Країна*',
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
        label: 'Поштовий індекс*',
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
        label: 'Штат\\Область\\Регіон',
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'city',
        code: 'city',
        label: 'Місто*',
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'street',
        code: 'street',
        label: 'Вулиця, будинок, квартира',
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },
      {
        name: 'deliveryComment',
        code: 'deliveryComment',
        label: 'Додати примітку до доставки',
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: 'Прізвище*',
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
        label: 'Електронна пошта*',
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
        label: 'Номер телефону*',
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