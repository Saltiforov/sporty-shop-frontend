<template>
  <div class="checkout-page">
    <div class="checkout-content mb-[101px] flex items-start">

      <div class=" w-full max-w-[1064px] mr-[71px]">

        <div
            class="checkout-fields pt-[24px] pr-[45px] pb-[44px] pl-[42px] mb-[46px] rounded-lg bg-[var(--color-gray-lavender)]">
          <div class="header-fields">
            <h1 class="title-lg mb-2">Оформлення замовлення</h1>
            <p class="subtitle-lg mb-[24px] text-[var(--color-muted-gray)]">Вже є аккаунт? Увійти</p>
          </div>
          <div class="fields-content">
            <FieldsBlock :config="config.fields"/>
          </div>
        </div>

        <div class="checkout-payment-method pt-[24px] px-[42px]  pb-[36px] rounded-lg bg-[var(--color-gray-lavender)]">
          <h2 class="mb-[36px] title-lg">Спосіб оплати</h2>
          <div class="checkout-payment-method__checkboxes">
            <div class="payment-method__checkbox murecho-font fw-500 text-[16px] mb-[24px] flex">
              <input class="mr-[2px]" type="checkbox">
              <p>Відправити sms по вказаних данних</p>
            </div>
            <div class="payment-method__checkbox murecho-font fw-500 text-[16px] flex">
              <input class="mr-[2px]" type="checkbox">
              <p>Накладений платіж</p>
            </div>

          </div>
        </div>
      </div>


      <div
          class="checkout-products-list bg-[var(--color-gray-lavender)]  rounded-lg max-w-[643px] pt-[24px] pr-[46px] pl-[48px] pb-[30px] w-full">
        <div class="products-list__container max-w-[547px] w-full">
          <h2 class="title-lg mb-[44px]">Список товарів до замовлення</h2>
          <ProductsOverview :products-overview="shoppingCartItems"/>
          <div class="use-promocode">
            <div class="flex justify-between mb-[17px]">
              <p class="text-[var(--color-primary-dark)]">Використати промокод</p>
              <div class="use-promocode__btn">
                <Button v-if="isUsePromoCode" @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-plus.svg" alt="">
                </Button>
                <Button v-else @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-minus.svg" alt="">
                </Button>

              </div>
            </div>
            <div v-if="isUsePromoCode"
                 class="use-promocode__field mb-[36px] bg-white flex rounded-lg overflow-hidden border w-full">
              <InputText
                  placeholder="Введіть код"
                  class="flex-1 rounded-none border-none focus:ring-0 focus:outline-none px-4 py-2"
              />
              <button
                  class="bg-[var(--color-primary-blue)] text-white px-4 py-2"
              >
                <img src="@/assets/icons/arrow-right-white.svg" alt="arrow-right-white.svg">
              </button>
            </div>
          </div>

          <div class="comment-to-order mb-[24px]">
            <p class="murecho-font mb-[18px]">Коментар до замовлення</p>
            <div class="bg-white mb-[10px] py-[10px] px-[10px] rounded-[8px]">
                <Textarea style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
            </div>
          </div>

          <div
              class="checkout__btn rounded-[8px] px-[10px] text-center py-[10px] text-white bg-[var(--color-primary-dark-red)]">
            <Button><p class="murecho-font">Підтвердити замовлення</p></Button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'breadcrumb',
})

const isUsePromoCode = ref(false)

const togglePromoCodeUse = () => {
  isUsePromoCode.value = !isUsePromoCode.value
}

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
        name: 'deliveryInfo',
        code: 'deliveryInfo',
        label: 'Служба доставки та номер відділення',
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
      {
        name: 'telegramUsername',
        code: 'telegramUsername',
        label: 'Username телеграм',
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


const
    shoppingCartItems = ref([
      {
        image: '@/assets/images/product-image.png',
        name: 'Nutrex Research Anabol Hardcore - 60 капс',
        quantity: 3,
        price: 1121,
        id: 1,
        discountPrice: 999
      },
      {image: '', name: 'Nutrex Research Anabol Hardcore - 60 капс', quantity: 10, price: 1121, id: 2},
    ])

</script>