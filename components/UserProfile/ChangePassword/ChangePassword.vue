<template>
  <div class="change-password">
    <div class="max-w-[432px]">
      <h1 class="title-lg-20 mb-[30px]">Зміна паролю</h1>
      <FieldsBlock :config="config.fields"/>
      <div
          class="change-password__btn mx-auto max-w-[377px] px-[10px] py-[10px] text-center text-white rounded-[var(--default-rounded)] bg-[var(--color-primary-dark)]">
        <Button>Змінити пароль</Button>
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