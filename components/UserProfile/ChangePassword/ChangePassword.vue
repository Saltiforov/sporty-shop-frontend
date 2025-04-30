<template>
  <div class="change-password">
    <div class="max-w-[432px]">
      <h1 class="title-lg-20 mb-[30px]">{{ t('change_password') }}</h1>
      <FieldsBlock :config="config.fields"/>
      <div class="max-w-[377px] mx-auto">
        <Button :pt="{
          root: {
            class: 'change-password__btn'
          }
        }">{{ t('change_password_button') }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup>

const { t } = useI18n()

const config = {
  fields: {
    items: [
      {
        name: 'oldPassword',
        code: 'oldPassword',
        label: computed(() => t('old_password')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },
      {
        name: 'newPassword',
        code: 'newPassword',
        label: computed(() => t('new_password')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
      },
      {
        name: 'confirmPassword',
        code: 'confirmPassword',
        label: computed(() => t('confirm_password')),
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
.change-password__btn {
  color: var(--color-primary-pure-white);
  background-color: var(--color-primary-dark);
  width: 100%;
}
.change-password__btn:hover {
  background-color: var(--color-primary-dark);
}

</style>