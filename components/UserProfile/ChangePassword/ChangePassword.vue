<template>
  <div class="change-password">
    <div class="max-w-[432px]">
      <h1 class="title-lg-20 mb-[30px]">Зміна паролю</h1>
      <FieldsBlock :config="config.fields"/>
      <div class="max-w-[377px] mx-auto">
        <Button :pt="{
          root: {
            class: 'change-password__btn'
          }
        }">Змінити пароль</Button>
      </div>
    </div>
  </div>
</template>

<script setup>

const config = {
  fields: {
    items: [
      {
        name: 'oldPassword',
        code: 'oldPassword',
        label: 'Старий пароль*',
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
        label: 'Новий пароль*',
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
        label: 'Підтвердити новий пароль*',
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
  color: var(--link-color);
  background-color: var(--color-primary-dark);
  width: 100%;
}
.change-password__btn:hover {
  background-color: var(--color-primary-dark);
}

</style>