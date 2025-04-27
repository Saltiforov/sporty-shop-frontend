<template>
  <div class="checkout-page">
    <div class="checkout-content mb-[101px] flex items-start">

      <div class=" w-full max-w-[1064px] mr-[71px]">

        <div
            class="checkout-fields pt-[24px] pr-[45px] pb-[44px] pl-[42px] mb-[58px] rounded-lg bg-[var(--color-gray-lavender)]">
          <div class="header-fields">
            <h1 class="title-lg mb-2">{{ t('checkoutTitle') }}</h1>
            <p class="subtitle-lg mb-[24px] text-[var(--color-muted-gray)]">{{ t('accountText') }}</p>
          </div>
          <div class="fields-content">
            <FieldsBlock :config="config.fields" ref="fieldsBlock"/>
          </div>
        </div>

        <div class="checkout-payment-method pt-[24px] px-[42px]  pb-[36px] rounded-lg bg-[var(--color-gray-lavender)]">
          <h2 class="mb-[36px] flex title-lg">
            {{ t('paymentMethodTitle') }}
            <TooltipIcon class="ml-2" :message="t('paymentMethodTooltip')"/>
          </h2>
          <div class="checkout-payment-method__checkboxes">
            <div class="murecho-font checkbox-wrapper">
              <CustomCheckbox v-model="checkbox"/>
              <p class="text-[var(--color-primary-black)]">{{ t('smsText') }}</p>
            </div>
            <div class="murecho-font checkbox-wrapper">
              <CustomCheckbox v-model="checkbox"/>
              <p class="text-[var(--color-primary-black)]">{{ t('cashOnDeliveryText') }}</p>
            </div>

          </div>
        </div>
      </div>


      <div
          class="checkout-products-list bg-[var(--color-gray-lavender)]  rounded-lg max-w-[643px] pt-[24px] pr-[46px] pl-[48px] pb-[30px] w-full">
        <div class="products-list__container max-w-[547px] w-full">
          <h2 class="title-lg mb-[44px]">{{ t('checkoutListTitle') }}</h2>
          <ProductsOverview :products-overview="cartStore.getCartProducts"/>
          <div class="use-promocode">
            <div class="flex justify-between mb-[17px]">
              <p class="text-[var(--color-primary-dark)]">{{ t('usePromoCode') }}</p>
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
                  :placeholder="t('enterPromoCode')"
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
            <p class="murecho-font mb-[18px]">{{ t('commentToOrder') }}</p>
            <div class="mb-[10px] rounded-[8px]">
                <Textarea style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
            </div>
          </div>

          <div
              class="checkout__wrapper-btn rounded-[8px] w-full">
            <Button @click="createOrder" :pt="{
              root: {
                class: 'checkout__btn'
              }
            }"><p class="murecho-font text-[14px]">{{ t('confirmOrder') }}</p></Button>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import TooltipIcon from "~/components/UI/TooltipIcon/TooltipIcon.vue";
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue";
import {useCartStore} from "~/stores/cart.js";
import {useOrders} from "~/composables/useOrders.js";

definePageMeta({
  layout: 'breadcrumb',
})

const { create } = useOrders()

const fieldsBlock = ref(null)

const {t} = useI18n()

const cartStore = useCartStore()

const checkbox = ref(false)

const isUsePromoCode = ref(false)

const mappedProductsForOrder = arr => arr.map(({ quantity, ...withoutQuantity }) => ({
  product: withoutQuantity,
  quantity
}));

const createOrder = async () => {
  console.log("cartStore.getCartProducts", mappedProductsForOrder(cartStore.getCartProducts))
  await create(mappedProductsForOrder(cartStore.getCartProducts))
}


const togglePromoCodeUse = () => {
  isUsePromoCode.value = !isUsePromoCode.value
}

const config = {
  fields: {
    items: [
      {
        name: 'userName',
        code: 'userName',
        label: computed(() => t('userName')),
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
        label: computed(() => t('postCode')),
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
        name: 'deliveryInfo',
        code: 'deliveryInfo',
        label: computed(() => t('deliveryInfo')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('lastName')),
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
        label: computed(() => t('phoneNumber')),
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
        label: computed(() => t('telegramUsername')),
        tooltipComponent: defineAsyncComponent(() => import('~/components/UI/TooltipIcon/TooltipIcon.vue')),
        type: 'InputText',
        tooltipProps: {
          message: computed(() => t('telegramTooltip'))
        },
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true,
          class: 'w-full'
        },
      },
    ]
  }
}

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