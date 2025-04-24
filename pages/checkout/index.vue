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
          <h2 class="mb-[36px] flex title-lg">
            Спосіб оплати
            <TooltipIcon class="ml-2" message="При оплаті через телеграм з вами з’яжеться наш менеджер"/>
          </h2>
          <div class="checkout-payment-method__checkboxes">
            <div class="murecho-font checkbox-wrapper">
              <CustomCheckbox v-model="checkbox"/>
              <p class="text-[var(--color-primary-black)]">Відправити sms по вказаних данних</p>
            </div>
            <div class="murecho-font checkbox-wrapper">
              <CustomCheckbox v-model="checkbox"/>
              <p class="text-[var(--color-primary-black)]">Накладений платіж</p>
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
              <div class="use-promocode-wrapper__btn">
                <Button :pt="{
                  root: {
                    class: 'use-promocode__btn'
                  }
                }" v-if="isUsePromoCode" @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-plus.svg" alt="">
                </Button>
                <Button :pt="{
                  root: {
                    class: 'use-promocode__btn'
                  }
                }" v-else @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-minus.svg" alt="">
                </Button>

              </div>
            </div>
            <div v-if="isUsePromoCode"
                 class="use-promocode__field mb-[36px] bg-white flex rounded-[var(--default-rounded)] overflow-hidden border w-full">
              <InputText
                  :pt="{
                    root: {
                      class: 'py-[12px]'
                    }
                  }"
                  placeholder="Введіть код"
                  class="flex-1 rounded-none border-none focus:ring-0 focus:outline-none px-4 py-2"
              />
              <Button :pt="{
                root: {
                  class: 'max-w-[48px] w-full rounded-none use-promocode-field__btn'
                }
              }"
              >
                <img src="@/assets/icons/arrow-right-white.svg" alt="arrow-right-white.svg">
              </Button>
            </div>
          </div>

          <div class="comment-to-order mb-[24px]">
            <p class="murecho-font mb-[18px]">Коментар до замовлення</p>
            <div class="mb-[10px] rounded-[8px]">
                <Textarea style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
            </div>
          </div>

          <div
              class="checkout__wrapper-btn rounded-[8px] w-full">
            <Button :pt="{
              root: {
                class: 'checkout__btn'
              }
            }"><p class="murecho-font text-[14px]">Підтвердити замовлення</p></Button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import TooltipIcon from "~/components/UI/TooltipIcon/TooltipIcon.vue";
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue";

definePageMeta({
  layout: 'breadcrumb',
})

const checkbox = ref(false)

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
        tooltipComponent: defineAsyncComponent(() => import('~/components/UI/TooltipIcon/TooltipIcon.vue')),
        tooltipProps: {
          message: 'Необхідно для зв’язку з метою подальшої оплати'
        },
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

<style scoped>
.checkout__btn {
  background-color: var(--color-primary-dark-red);
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border: none;
}

.checkout__btn:hover {
  background-color: var(--color-primary-dark-red);
  border: none;
}

.use-promocode__btn {
  background: transparent;
  border: none;
}

.use-promocode__btn:hover {
  background: transparent;
  border: none;
}

.use-promocode-field__btn {
  background: var(--color-primary-blue);
  padding: 12px;
}

.use-promocode-field__btn:hover {
  background: var(--color-primary-blue);
}

.payment-method__checkbox {
  margin-right: 4px;
  width: 16px;
  height: 16px;
  border-color: var(--color-primary-blue);
}


.payment-method__checkbox__box:hover {
  border-color: var(--color-primary-blue);
  color: #9E2B24;
}

.checkbox-wrapper {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
</style>