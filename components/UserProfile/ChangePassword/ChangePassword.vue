<template>
  <div class="change-password">
    <div class="max-w-[432px]">
      <h1 class="title-lg-20 mb-[30px]">{{ t('change_password') }}</h1>
      <FieldsBlock :config="config.fields"/>
      <div class="max-w-[377px] mx-auto">
        <Button :pt="{
          root: {
            class: 'change-password__btn btn-hover-default'
          }
        }">{{ t('change_password_button') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {InputGroup, Password} from "primevue";

const {t} = useI18n()


const config = {
  fields: {
    items: [
      {
        name: 'oldPassword',
        code: 'oldPassword',
        label: computed(() => t('old_password')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Old Password is required"),
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
      },
      {
        name: 'newPassword',
        code: 'newPassword',
        label: computed(() => t('new_password')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "New Password is required"),
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
      },
      {
        name: 'confirmPassword',
        code: 'confirmPassword',
        label: computed(() => t('confirm_password')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Confirm Password is required"),
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
      },
    ]
  }
}

</script>

<style scoped>
.change-password__btn {
  background-color: var(--color-primary-dark);
  width: 100%;
}

</style>