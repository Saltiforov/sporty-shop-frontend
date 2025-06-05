<template>
  <LayoutBreadcrumb v-if="!isLoading"/>
  <BreadcrumbSkeleton v-else/>
  <section class="checkout-page">
    <LoadingOverlay :visible="isLoading"/>
    <main class="checkout-content mb-[101px] flex items-start">


      <section class="w-full checkout-info-wrapper max-w-[1064px] mr-[71px]">

        <article
            v-if="hydrated || userData && userData._id"
            class="checkout-fields pt-[24px] pr-[45px] pb-[44px] pl-[42px] mb-[65px] rounded-lg bg-[var(--color-gray-lavender)]">
          <div class="header-fields flex justify-between mb-7">
            <div class="header-left">
              <h1 class="title-lg mb-2">{{ t('checkout') }}</h1>
              <div class="flex subtitle-lg mb-[24px] text-[var(--color-muted-gray)]">
                <p class="mr-1">{{ t('account_text') }}</p>
                <button @click="authPopup.open('login')">{{ t('sign_in') }}</button>
              </div>
            </div>
          </div>
          <section class="fields-content">
            <FieldsBlock v-if="userData && userData._id"
                         ref="fieldsBlock"
                         :config="currentRegionConfig.fields"
                         :data="userData"
                         :shouldResetOnConfigChange="false"
            />
            <FieldsBlock v-else :config="currentRegionConfig.fields" ref="fieldsBlock"/>
          </section>
        </article>
        <CheckoutFieldsSkeleton class="mb-[65px]" v-else/>

        <section v-if="hydrated"
                 class="checkout-payment-method pt-[24px] px-[42px]  pb-[36px] rounded-lg bg-[var(--color-gray-lavender)]">
          <h2 class="checkout-payment-method-title mb-[36px] flex title-lg">
            {{ t('payment_method_title') }}
            <TooltipIcon class="ml-2" :message="t('payment_method_tooltip')"/>
          </h2>
          <div class="payment-method-content murecho-font">
            <div class="flex mb-2 items-center">
              <figure class="mr-3">
                <img class="w-[36px] h-[36px]" src="/assets/icons/telegram-black-icon.png" alt="telegram-icon">
              </figure>
              <p class="font-medium ">Повна передоплата через Telegram</p>
            </div>
            <aside class="confirmation-hint text-[14px]">
              <p class="text-[var(--color-muted-gray)]">
                {{ t('payment_instruction_text_part1') }}
                <a
                    href="https://t.me/your_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#007AFF] hover:underline"
                >
                  @your_bot
                </a>
                {{ t('payment_instruction_text_part2') }}
              </p>
            </aside>
          </div>


        </section>
        <CheckoutPaymentMethodSkeleton v-else/>

        <div class="responsive-checkout-footer rounded-lg bg-[var(--color-gray-lavender)]">
          <section class="comment-to-order mb-[24px]">
            <p class="murecho-font mb-[18px]">{{ t('comment_to_order') }}</p>
            <div class="mb-[10px] rounded-[8px]">
                <Textarea v-model="commentForOrder" style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
            </div>
          </section>
          <div
              class="checkout__wrapper-btn rounded-[8px] w-full mb-3">
            <Button :disabled="currencyStore.isRegionEurope && !minimumEuropePrice" @click="handleCreateOrder" :pt="{
              root: {
                class: 'checkout__btn'
              }
            }"><p class="murecho-font text-[14px]">{{ t('confirm_order') }}</p></Button>
          </div>
          <aside v-if="currencyStore.isRegionEurope && !minimumEuropePrice" class="min-price-europe mb-6">
            <p class="text-[var(--color-primary-pink)] text-center text-[14px]">{{ t('minimum_amount_order_eu') }}</p>
          </aside>
        </div>

      </section>


      <section
          v-if="hydrated"
          class="checkout-products-list bg-[var(--color-gray-lavender)]  rounded-lg max-w-[643px] pt-[24px] pr-[46px] pl-[48px] pb-[30px] w-full">
        <div class="products-list__container max-w-[547px] w-full">
          <div class="checkout-header mb-[44px]">
            <h2 class="checkout-title title-lg ">{{ t('checkout_list_title') }}</h2>
            <div class="checkout-count">
              ({{ cartStore.cartCount || 0 }})
            </div>
          </div>
          <ProductsOverview :products-overview="cartStore.getCartProducts"/>
          <section class="use-promocode">
            <div class="flex justify-between mb-[17px]">
              <p class="text-[var(--color-primary-dark)]">{{ t('use_promo_code') }}</p>
              <div class="use-promocode-wrapper__btn">
                <Button :pt="{
                  root: {
                    class: 'use-promocode__btn'
                  }
                }" v-if="isUsePromoCode" @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-plus.svg" alt="promocode-icon">
                </Button>
                <Button :pt="{
                  root: {
                    class: 'use-promocode__btn'
                  }
                }" v-else @click="togglePromoCodeUse">
                  <img src="@/assets/icons/promocode-btn-minus.svg" alt="promocode-icon">
                </Button>

              </div>
            </div>
            <form v-if="isUsePromoCode"
                  class="use-promocode__field mb-[36px] bg-white flex rounded-[var(--default-rounded)] overflow-hidden border w-full">
              <InputText
                  v-model="promoCodeValue"
                  :pt="{
                    root: {
                      style: {
                        paddingTop: '12px',
                        paddingBottom: '12px'
                      }
                    }
                  }"
                  :placeholder="t('enter_promo_code')"
                  class="flex-1 rounded-none border-none focus:ring-0 focus:outline-none px-4 py-2"
              />
              <Button :pt="{
                root: {
                  class: 'use-promocode-field__btn',
                   style: {
                    maxWidth: '48px',
                    width: '100%',
                    borderRadius: '0'
                  }
                }
              }"
              >
                <img src="@/assets/icons/arrow-right-white.svg" alt="arrow-right-white.svg">
              </Button>
            </form>
          </section>

          <div class="checkout-footer">
            <section class="comment-to-order mb-[24px]">
              <p class="murecho-font mb-[18px]">{{ t('comment_to_order') }}</p>
              <div class="mb-[10px] rounded-[8px]">
                <Textarea v-model="commentForOrder" style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
              </div>
            </section>
            <div
                class="checkout__wrapper-btn rounded-[8px] w-full mb-3">
              <Button :disabled="currencyStore.isRegionEurope && !minimumEuropePrice" @click="handleCreateOrder" :pt="{
              root: {
                class: 'checkout__btn'
              }
            }"><p class="murecho-font text-[14px]">{{ t('confirm_order') }}</p></Button>
            </div>
            <aside v-if="currencyStore.isRegionEurope && !minimumEuropePrice" class="min-price-europe mb-6">
              <p class="text-[var(--color-primary-pink)] text-center text-[14px]">{{ t('minimum_amount_order_eu') }}</p>
            </aside>
          </div>



        </div>


      </section>


      <CheckoutOrderListSkeleton v-else/>

      <div class="responsive-header-fields w-full flex justify-between mb-4">
          <div class="header-left">
          <h1 class="title-lg text-center mb-2">{{ t('checkout') }}</h1>
          <div class="flex justify-end subtitle-lg text-[var(--color-muted-gray)]">
            <p class="mr-1">{{ t('account_text') }}</p>
            <button @click="authPopup.open('login')">{{ t('sign_in') }}</button>
          </div>
        </div>
      </div>


    </main>
  </section>

  <Toast
      :class="{
          'max-w-[240px] top-[70]': isMobileToast
        }"
      :pt="toastPt"
      position="top-left"
      group="tl"
  />
</template>

<script setup>
import TooltipIcon from "~/components/UI/TooltipIcon/TooltipIcon.vue";
import CustomCheckbox from "~/components/UI/CustomCheckbox/CustomCheckbox.vue";
import {useCartStore} from "~/stores/cart.js";
import {createOrder} from "~/services/api/order-service.js";
import LoadingOverlay from "~/components/UI/LoadingOverlay/LoadingOverlay.vue";
import {getCurrentUser} from "~/services/api/user-service.js";
import {useAuthPopup} from "~/stores/authPopup.js";
import {InputGroup, InputGroupAddon, InputNumber} from "primevue";
import CheckoutOrderListSkeleton
  from "~/components/Skeletons/Checkout/CheckoutOrderListSkeleton/CheckoutOrderListSkeleton.vue";
import CheckoutFieldsSkeleton from "~/components/Skeletons/Checkout/CheckoutFieldsSkeleton/CheckoutFieldsSkeleton.vue";
import CheckoutPaymentMethodSkeleton
  from "~/components/Skeletons/Checkout/CheckoutPaymentMethodSkeleton/CheckoutPaymentMethodSkeleton.vue";
import {useCurrencyStore} from "~/stores/currency.js";
import BreadcrumbSkeleton from "~/components/Skeletons/BreadcrumbSkeleton/BreadcrumbSkeleton.vue";
import LayoutBreadcrumb from "~/components/UI/LayoutBreadcrumb/LayoutBreadcrumb.vue";
import RegionSelect from "~/components/UI/RegionSelect/RegionSelect.vue";
import {calculateTotal} from "~/utils/index.js";
import {computed} from "vue";
import {useWindowWidthWatcher} from "~/composables/useWindowWidthWatcher.js";

definePageMeta({
  layout: 'breadcrumb',
})

const getWidth = useWindowWidthWatcher()

const fieldsBlock = ref(null)

const isLoading = ref(false)

const {t} = useI18n()

const toast = useToast();

const authPopup = useAuthPopup();

const cartStore = useCartStore()

const currencyStore = useCurrencyStore()

const token = useCookie('token')

const isUsePromoCode = ref(false)

const hydrated = ref(false)

const promoCodeValue = ref(null)

const commentForOrder = ref('')

const isPaymentOnDelivery = ref(false)

const isSendSmsWithFormData = ref(false)

const isMobileToast = computed(() => getWidth() < 500)

const toastPt = computed(() => {
  return {
    message: {
      style: {
        width: isMobileToast.value ? '250px' : '',
      }
    },
    messageContent: {
      style: {
        padding: isMobileToast.value ? '5px' : '',
      }
    },
    summary: {
      style: {
        fontSize: isMobileToast.value ? '14px' : '',
      }
    },
    detail: {
      style: {
        fontSize: isMobileToast.value ? '12px' : '',
      }
    },
  }
})

const userData = ref({})

const uaPhoneCode = ref('+380')

const MIN_EU_PRICE = 300

const checkoutPrice = computed(() => calculateTotal(cartStore.getCartProducts, 'eur', true))

const minimumEuropePrice = computed(() => checkoutPrice.value >= MIN_EU_PRICE)

const showTopRight = () => {
  toast.add({severity: 'success', summary: 'Info Message', detail: 'Message Content', group: 'tl', life: 3000});
};

const showError = () => {
  toast.add({severity: 'error', summary: 'Error Message', detail: 'Message Content', group: 'tl', life: 3000});
};

const mappedProductsForOrder = arr => arr.map(({quantity, ...withoutQuantity}) => ({
  product: withoutQuantity,
  quantity
}));

const currency = computed(() => currencyStore.isUAHSelected ? 'uah' : 'eur')

const region = computed(() => currencyStore.isRegionEurope ? 'eu' : 'ua')

const mappedUserDataForOrder = (data) => {
  const {street, city, postalCode, country, firstName, lastName, phone, email, telegramUsername, deliveryInfo} = data
  return {
    shippingAddress: {
      street,
      city,
      postalCode,
      country,
    },
    paymentMethod: "telegram",
    customerInfo: {
      firstName,
      lastName,
      phone,
      email,
      telegramUsername
    },
    description: commentForOrder.value,
    currency: currency.value,
    region: region.value,
    deliveryInfo
  }
}

const handleCreateOrder = async () => {
  isLoading.value = true
  const data = {
    products: [...mappedProductsForOrder(cartStore.getCartProducts)],
    ...mappedUserDataForOrder(fieldsBlock.value.getData()),
  }

  const isValid = fieldsBlock.value?.validateFields()

  if (isValid && data.products) {
    await createOrder(data)
        .then(() => {
          clearCreateOrderForm()
          showTopRight()
          setTimeout(() => {
            navigateTo('/')
          }, 500)
        })
        .catch(() => {
          showError()
        })
        .finally(() => isLoading.value = false)
  } else {
    isLoading.value = false
  }
}

const clearCreateOrderForm = () => {
  fieldsBlock.value.clearFormData()
  cartStore.clearCart()
  isPaymentOnDelivery.value = false
  isSendSmsWithFormData.value = false
  promoCodeValue.value = null
  commentForOrder.value = ''
}

const togglePromoCodeUse = () => {
  isUsePromoCode.value = !isUsePromoCode.value
}

onMounted(async () => {
  if (token.value) {
    userData.value = await getCurrentUser()
  }

  hydrated.value = true
})

const currentRegionConfig = computed(() => {
  return currencyStore.isRegionEurope
      ? configEurope.value
      : configUkraine.value
})

const configUkraine = ref({
  fields: {
    items: [
      {
        name: 'firstName',
        code: 'firstName',
        label: computed(() => t('user_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "First Name is required"),
        ],
      },
      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('last_name')),
        type: 'InputText',
        props: {
          side: 'right',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Last Name is required"),
        ],
      },

      {
        name: 'telegramUsername',
        code: 'telegramUsername',
        label: computed(() => t('telegram_username')),
        tooltipComponent: defineAsyncComponent(() => import('~/components/UI/TooltipIcon/TooltipIcon.vue')),
        type: 'InputText',
        tooltipProps: {
          message: computed(() => t('telegram_tooltip'))
        },
        props: {
          side: 'right',
          type: 'text',
          placeholder: "",
          required: true,
          class: 'w-full'
        },
        validators: [
          (value) => (value ? true : "Telegram Username is required"),
        ],
      },

      {
        name: 'phone',
        code: 'phone',
        label: computed(() => t('phone_number')),
        type: 'Custom',
        props: {
          side: 'left',
        },
        validators: [
          (value) => (value ? true : "Phone is required"),
          (value) => (value?.toString().length <= 11 ? true : "Phone number must be no more than 11 digits")
        ],
        render: ({modelValue, 'onUpdate:modelValue': update}) =>
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
                }, () => uaPhoneCode.value),
                h(InputNumber, {
                  modelValue,
                  'onUpdate:modelValue': update,
                  useGrouping: false,
                  placeholder: '',
                  defaultValue: null
                })
              ]
            })
      },

      {
        name: 'deliveryInfo',
        code: 'deliveryInfo',
        label: computed(() => t('delivery_info')),
        type: 'InputText',
        props: {
          side: 'left',
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
        },
        validators: [
          (value) => (value ? true : "City is required"),
        ],
      },

    ]
  }
})

const configEurope = ref({
  fields: {
    items: [
      {
        name: 'firstName',
        code: 'firstName',
        label: computed(() => t('user_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "First Name is required"),
        ],
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('last_name')),
        type: 'InputText',
        props: {
          side: 'right',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Last Name is required"),
        ],
      },

      {
        name: 'telegramUsername',
        code: 'telegramUsername',
        label: computed(() => t('telegram_username')),
        tooltipComponent: defineAsyncComponent(() => import('~/components/UI/TooltipIcon/TooltipIcon.vue')),
        type: 'InputText',
        tooltipProps: {
          message: computed(() => t('telegram_tooltip'))
        },
        props: {
          side: 'right',
          type: 'text',
          placeholder: "",
          required: true,
          class: 'w-full'
        },
        validators: [
          (value) => (value ? true : "Telegram Username is required"),
        ],
      },

      {
        name: 'street',
        code: 'street',
        label: computed(() => t('street')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "Street is required"),
        ],
      },

      {
        name: 'country',
        code: 'country',
        label: computed(() => t('country')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "Country is required"),
        ],
      },


      {
        name: 'phone',
        code: 'phone',
        label: computed(() => t('phone_number')),
        type: 'InputMask',
        props: {
          id: 'phone',
          side: 'left',
          placeholder: '(999) 999-9999',
          mask: '(999) 999-9999',
          unmask: true,
          class: 'w-full'
        },
        validators: [
          (value) => (value ? true : t('validation_required')),
          (value) => (value?.length === 10 ? true : t('validation_phone_format'))
        ]
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
        validators: [
          (value) => (value ? true : "Email is required"),
        ],
      },

      {
        name: 'city',
        code: 'city',
        label: computed(() => t('state')),
        type: 'InputText',
        props: {
          side: 'left',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "State is required"),
        ],
      },

      {
        name: 'postalCode',
        code: 'postalCode',
        label: computed(() => t('post_code')),
        type: 'InputText',
        props: {
          side: 'left',
          placeholder: ''
        },
      },


    ]
  }
})
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

.checkout-count {
  display: none;
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
  color: var(--color-primary-red);
}

.checkbox-content {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.responsive-header-fields {
  display: none;
}

.responsive-checkout-footer {
  display: none;
}

@media (max-width: 1500px) {
  .checkout-info-wrapper {
    margin-right: 30px;
  }

  .checkout-fields {
    margin-bottom: 30px;
  }

  .checkout-products-list {
    padding-right: 23px;
    padding-left: 23px;
    max-width: 543px;
  }
}

@media (max-width: 1300px) {
  .checkout-content {
    flex-direction: column;
  }

  .checkout-info-wrapper {
    margin: 0 auto 20px auto;
  }

  .checkout-products-list {
    max-width: 1064px;
    margin: 0 auto;
  }

  .products-list__container {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .header-fields {
    display: none;
  }
  .checkout-footer {
    display: none;
  }
  .checkout-payment-method-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .checkout-payment-method {
    margin-bottom: 26px;
  }
  .checkout-products-list {
    margin-bottom: 26px;
  }
  .checkout-count {
    display: block;
    color: var(--color-muted-light-gray);
    font-weight: 600;
    font-size: 16px;
  }
  .checkout-header {
    margin-bottom: 18px;
    display: flex;
  }
  .checkout-title {
    font-size: 16px;
    margin-right: 11px;
  }
  .responsive-checkout-footer {
    padding: 24px 12px 34px 12px;
    display: block;
  }
  .checkout-content {
    flex-direction: column-reverse;
    margin-bottom: 34px;
  }

  .responsive-header-fields {
    display: block;
    padding: 0 10px;
  }

  .checkout-fields {
    flex-direction: column;
    padding: 24px 12px 34px 12px;
  }
  .use-promocode div {
    margin-bottom: 0;
  }

  .checkout-products-list,
  .checkout-payment-method {
    padding: 24px 12px 24px 12px;
  }

  .checkbox-content:last-child {
    margin-bottom: 0px;
  }
}


</style>