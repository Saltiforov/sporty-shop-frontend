<template>
  <LayoutBreadcrumb v-if="!isLoading"/>
  <BreadcrumbSkeleton v-else/>
  <div class="checkout-page">
    <LoadingOverlay :visible="isLoading"/>
    <div class="checkout-content mb-[101px] flex items-start">

      <div class="w-full checkout-info-wrapper max-w-[1064px] mr-[71px]">
        <div
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
            <div class="header-right">
              <RegionSelect v-model="selectedRegion"/>
            </div>
          </div>
          <div class="fields-content">
            <FieldsBlock v-if="userData && userData._id"
                         ref="fieldsBlock"
                         :config="currentRegionConfig.fields"
                         :data="userData"
                         :shouldResetOnConfigChange="false"
            />
            <FieldsBlock v-else :config="currentRegionConfig.fields" ref="fieldsBlock"/>
          </div>
        </div>
        <CheckoutFieldsSkeleton class="mb-[65px]" v-else/>

        <div v-if="hydrated"
             class="checkout-payment-method pt-[24px] px-[42px]  pb-[36px] rounded-lg bg-[var(--color-gray-lavender)]">
          <h2 class="mb-[36px] flex title-lg">
            {{ t('payment_method_title') }}
            <TooltipIcon class="ml-2" :message="t('payment_method_tooltip')"/>
          </h2>
          <div class="checkout-payment-method__checkboxes">
            <div class="murecho-font checkbox-content">
              <CustomCheckbox
                  v-model="isSendSmsWithFormData"
                  @update:modelValue="onSelectPaymentMethod('sms')"
              >
                <p class="text-[var(--color-primary-black)]">{{ t('sms_text') }}</p>
              </CustomCheckbox>
            </div>
            <div class="murecho-font checkbox-content">
              <CustomCheckbox
                  v-model="isPaymentOnDelivery"
                  @update:modelValue="onSelectPaymentMethod('cash')"
              >
                <p class="text-[var(--color-primary-black)]">{{ t('cash_on_delivery_text') }}</p>
              </CustomCheckbox>
            </div>
          </div>
        </div>
        <CheckoutPaymentMethodSkeleton v-else/>
      </div>


      <div
          v-if="hydrated"
          class="checkout-products-list bg-[var(--color-gray-lavender)]  rounded-lg max-w-[643px] pt-[24px] pr-[46px] pl-[48px] pb-[30px] w-full">
        <div class="products-list__container max-w-[547px] w-full">
          <h2 class="title-lg mb-[44px]">{{ t('checkout_list_title') }}</h2>
          <ProductsOverview :products-overview="cartStore.getCartProducts"/>
          <div class="use-promocode">
            <div class="flex justify-between mb-[17px]">
              <p class="text-[var(--color-primary-dark)]">{{ t('use_promo_code') }}</p>
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
                  v-model="promoCodeValue"
                  :pt="{
                    root: {
                      class: 'py-[12px]'
                    }
                  }"
                  :placeholder="t('enter_promo_code')"
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
            <p class="murecho-font mb-[18px]">{{ t('comment_to_order') }}</p>
            <div class="mb-[10px] rounded-[8px]">
                <Textarea v-model="commentForOrder" style="resize: none" class="w-full rounded-[8px]"
                          rows="2" cols="30"/>
            </div>
          </div>
          <div
              class="checkout__wrapper-btn rounded-[8px] w-full mb-3">
            <Button @click="handleCreateOrder" :pt="{
              root: {
                class: 'checkout__btn'
              }
            }"><p class="murecho-font text-[14px]">{{ t('confirm_order') }}</p></Button>
          </div>
          <div v-if="!isRegionUA" class="min-price-europe mb-6">
            <p class="text-[var(--color-primary-pink)] text-center text-[14px]">{{ t('minimum_amount_order_eu') }}</p>
          </div>
        </div>

      </div>
      <CheckoutOrderListSkeleton v-else/>

    </div>
  </div>
  <Toast group="tl"/>
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

definePageMeta({
  layout: 'breadcrumb',
})

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

const selectedRegion = ref({label: t('checkout_region_ua'), value: 'ua'})

const isRegionUA = computed(() => selectedRegion.value.value === 'ua')

const currentRegion = computed(() => selectedRegion.value.value || 'ua')

const isPaymentOnDelivery = ref(false)

const isSendSmsWithFormData = ref(false)

const userData = ref({})

const uaPhoneCode = ref('+380')

const euPhoneCode = ref('+31')

const showTopRight = () => {
  toast.add({severity: 'success', summary: 'Info Message', detail: 'Message Content', group: 'tl', life: 3000});
};

const showError = () => {
  toast.add({severity: 'error', summary: 'Error Message', detail: 'Message Content', group: 'tl', life: 3000});
};

const onSelectPaymentMethod = (option) => {
  if (option === 'sms') {
    isSendSmsWithFormData.value = true
    isPaymentOnDelivery.value = false
  } else if (option === 'cash') {
    isSendSmsWithFormData.value = false
    isPaymentOnDelivery.value = true
  }
}

const mappedProductsForOrder = arr => arr.map(({quantity, ...withoutQuantity}) => ({
  product: withoutQuantity,
  quantity
}));

const currency = computed(() => currencyStore.isUAHSelected ? 'uah' : 'eur')

const mappedUserDataForOrder = (data) => {
  const {street, city, postalCode, country, firstName, lastName, phone, email, telegramUsername} = data
  return {
    shippingAddress: {
      street,
      city,
      postalCode,
      country,
    },
    paymentMethod: isSendSmsWithFormData.value || isPaymentOnDelivery.value,
    customerInfo: {
      firstName,
      lastName,
      phone,
      email,
      telegramUsername
    },
    description: commentForOrder.value,
    currency: currency.value,
    region: currentRegion.value
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
  return isRegionUA.value
      ? configUkraine.value
      : configEurope.value
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

const config = {
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
        name: 'country',
        code: 'country',
        label: computed(() => t('country')),
        type: 'InputText',
        props: {
          side: 'right',
          half: true,
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "Country is required"),
        ],
      },

      {
        name: 'postalCode',
        code: 'postalCode',
        label: computed(() => t('post_code')),
        type: 'InputText',
        props: {
          side: 'right',
          half: true,
          placeholder: ''
        },
      },
      {
        name: 'state',
        code: 'state',
        label: computed(() => t('state')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        },
        validators: [
          (value) => (value ? true : "State is required"),
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
      {
        name: 'deliveryInfo',
        code: 'deliveryInfo',
        label: computed(() => t('delivery_info')),
        type: 'InputText',
        props: {
          side: 'right',
          placeholder: ''
        }
      },

      {
        name: 'lastName',
        code: 'lastName',
        label: computed(() => t('last_name')),
        type: 'InputText',
        props: {
          side: 'left',
          type: 'text',
          placeholder: "",
          required: true
        },
        validators: [
          (value) => (value ? true : "Last Name is required"),
        ],
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
                }, () => '+380'),
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
        name: 'telegramUsername',
        code: 'telegramUsername',
        label: computed(() => t('telegram_username')),
        tooltipComponent: defineAsyncComponent(() => import('~/components/UI/TooltipIcon/TooltipIcon.vue')),
        type: 'InputText',
        tooltipProps: {
          message: computed(() => t('telegram_tooltip'))
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
  color: var(--color-primary-red);
}

.checkbox-content {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
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
  .checkout-fields {
    flex-direction: column;
    padding: 24px 12px 34px 12px;
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