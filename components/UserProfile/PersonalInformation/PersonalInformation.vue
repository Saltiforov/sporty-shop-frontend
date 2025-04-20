<template>
  <div class="personal-information">
    <h1 class="title-lg-20 mb-[30px]">Контактна інформація</h1>
    <FieldsBlock :config="config.fields"/>
    <div
        class="personal-information__btn max-w-[338px] mx-auto py-[10px] px-[10px] rounded-[var(--default-rounded)] text-white text-center bg-[var(--color-primary-dark)]">
      <Button>Зберегти</Button>
    </div>
  </div>
</template>

<script setup lang="ts">

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

</style>