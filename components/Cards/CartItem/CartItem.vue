<template>
  <div class="cart-product flex flex-col">
    <div class="flex flex-1">
      <div
          :class="[
    'card-image shrink rounded-[16px]',
    isHistoryView
      ? 'mb-[22px] mr-[36px] h-[210px] w-[145px] card-image-history'
      : 'mr-[22px] min-w-[100px] min-h-[100px] max-w-[156px] max-h-[156px] w-full h-auto'
  ]"
      >
        <img
            :class="[
      'cart-item__image cursor-pointer rounded-[16px] object-cover',
      isHistoryView
        ? 'h-[210px] w-[145px]'
        : 'min-w-[100px] min-h-[100px] max-w-[156px] max-h-[156px] w-full h-full'
    ]"
            :src="imageSource"
            alt="product-image.png"
            @click="redirectToProduct(cartProduct)"
        />

        <p v-show="isHistoryView" class="product-name-history-responsive">{{ cartProduct.name }}</p>

      </div>

      <div
          :class="[isHistoryView ? 'items-start' : 'flex-col']"
          class="card-content flex flex-1 justify-between"
      >
        <div :class="['flex', 'card-title-wrapper', { 'card-title-wrapper-history': isHistoryView }]">
          <p
              :class="[isHistoryView ? 'text-[20px] card-title-history-view' : 'text-[16px]']"
              class="card-title max-w-[276px] w-full fw-500 leading-[var(--line-height-base)]"
          >
            {{ cartProduct.name }}
          </p>

          <div
              v-if="!isHistoryView"
              class="remove-product-cart-responsive ml-auto flex flex-col justify-center"
          >
            <Button
                :pt="{
                  root: {
                    style: {
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0',
                    }
                  }
                }"
                class="cart-item__delete-btn"
                @click="handleRemoveProduct(cartProduct)"
            >
              <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                    fill="#ADADAD"
                />
              </svg>
            </Button>
          </div>

        </div>

        <div v-if="isHistoryView" class="card-quantity w-full flex justify-end">
          <p class="text-medium-20">{{ cartProduct.quantity }} {{ t('unit') }}.</p>
        </div>

        <div
            :class="[
            'card-content__footer flex w-full justify-between',
            isHistoryView ? 'flex-col items-end h-full' : 'pb-4'
          ]"
        >
          <div v-if="!isHistoryView" class="card-product-count">
            <AmountSelector
                v-model="cartProduct.quantity"
                min="1"
                max="100"
                :amount-selector-wrapper="'amount-selector-wrapper'"
                :amount-selector-button="'amount-selector-button'"
                :input-class="'counter-input'"/>
          </div>

          <div
              :class="[
              'card-product-price flex',
              isHistoryView ? 'items-start' : 'items-center'
            ]"
          >
            <div
                :class="[
                isHistoryView ? 'discount-price__history-view' : 'fw-600 leading-[34px]',
                hasDiscount
                  ? 'line-through text-[#8E8E93] has-discount-price text-[13px] mr-[14px]'
                  : 'text-[16px]'
              ]"
            >
              {{ priceByCurrency }} {{ t(currentCurrency) }}
            </div>

            <div
                v-if="hasDiscount"
                :class="[
                'discount-price text-[var(--color-primary-pink)]',
                isHistoryView ? 'text-medium-20' : 'fw-600 text-[15px] leading-[34px]'
              ]"
            >
              {{ discountPriceByCurrency }} <span class="text-[18px]">{{ t(currentCurrency) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
          v-if="!isHistoryView"
          class="remove-product-cart-wrapper ml-auto pl-10 flex flex-col justify-center"
      >
        <Button
            :pt="{
                  root: {
                    style: {
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0',
                    }
                  }
                }"
            @click="handleRemoveProduct(cartProduct)"
        >
          <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                fill="#ADADAD"
            />
          </svg>
        </Button>
      </div>
    </div>
  </div>
</template>


<script setup>
import DefaultProductImage from "~/assets/images/product-image.png"
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";
import {useCurrencyStore} from "~/stores/currency.js";
import {fullImageUrls} from "~/utils/index.js";

const {cartProduct, isHistoryView, currency} = defineProps({
  cartProduct: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  isHistoryView: {
    type: Boolean,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  }
})

const {t} = useI18n();

const emit = defineEmits(["remove-product", 'handle-cart-item']);

const currencyStore = useCurrencyStore()

const router = useRouter();

const handleRemoveProduct = ({_id, name}) => {
  emit('remove-product', {_id, name});
}

const redirectToProduct = (cartProduct) => {
  if (!cartProduct?.id) return
  router.replace(`/product/${cartProduct.slug}`)
  emit('handle-cart-item')
}


const priceByCurrency = computed(() => {
  return currency
      ? cartProduct?.price[currency]
      : currencyStore.isUAHSelected ? cartProduct?.price?.uah : cartProduct?.price?.eur
})

const discountPriceByCurrency = computed(() => {
  return currency
      ? cartProduct?.priceAfterDiscount[currency]
      : currencyStore.isUAHSelected ? cartProduct?.priceAfterDiscount?.uah : cartProduct?.priceAfterDiscount?.eur
})

const currencyByOrder = computed(() => {
  return currency === 'uah'
      ? 'currency_uah'
      : 'currency_eur'
})

const currentCurrency = computed(() => {
  return isHistoryView ? currencyByOrder.value : currencyStore.label;
});

const hasDiscount = computed(() => {
  const price = priceByCurrency.value
  const discounted = discountPriceByCurrency.value
  return discounted !== null && discounted !== undefined && discounted < price
})

const imageSource = computed(() => fullImageUrls(cartProduct.images || [])[0] || DefaultProductImage)

</script>


<style scoped>
.cart-item__delete-btn {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.counter-input) {
  width: 32px !important;
  height: 34px !important;
  font-weight: 400;
  font-size: 16px;
}

:deep(.amount-selector-button) {
  width: 18px !important;
  height: 18px !important;
}

:deep(.amount-selector-wrapper) {
  width: 24px !important;
  height: 24px !important;
}

.cart-item__delete-btn:hover {
  background: transparent;
  border: none;
  padding: 0;
}

.product-name-history-responsive {
  display: none;
}

.remove-product-cart-responsive {
  display: none;
}

.card-title-wrapper {
  width: 100%;
}

.discount-price__history-view {
  font-size: 17px;
  line-height: 22px;
}

@media (max-width: 1690px) {
  .remove-product-cart-wrapper {
    padding-left: 20px;
  }
}

@media (max-width: 1300px) {
  .remove-product-cart-wrapper {
    justify-content: flex-start;
  }
}

@media (max-width: 1250px) {
  .card-content__footer {
    align-items: flex-start;
  }

  .card-quantity {
    justify-content: center;
  }

  .card-product-price {
    margin-bottom: 8px;
  }
}

@media (max-width: 1150px) {
  .card-content__footer {
    padding-bottom: 0;
    align-items: flex-end;

  }

  .remove-product-cart-wrapper {
    padding-left: 0;
  }

  .card-product-price {
    flex-direction: column;
  }

  .card-product-price {
    margin-bottom: 0;
  }

  .discount-price {
    line-height: 20px;
  }

  .has-discount-price {
    line-height: 18px;
  }
}


@media (max-width: 900px) {
  .card-title {
    display: block;
  }

  .card-quantity {
    display: inline-flex;
    justify-content: flex-start;
    width: auto;
    flex: 0 0 auto;
  }
}

@media (max-width: 700px) {
  .card-title {
    margin-right: 10px;
    font-size: 14px;
  }

  .card-image {
    margin-right: 10px;
  }
}

@media (max-width: 600px) {
  .discount-price__history-view {
    font-size: 13px;
  }

  .discount-price {
    font-size: 15px;
  }

  .final-price {
    padding-right: 10px;
  }

  .has-discount-price {
    margin-right: 0;
  }

  .discount-price span {
    font-size: 14px;
  }

  .card-quantity p {
    font-size: 16px;
  }

  .remove-product-cart-wrapper {
    display: none;
  }

  .remove-product-cart-responsive {
    display: block;
  }

  .card-title {
    margin: 0;
  }
}

@media (max-width: 520px) {
  .card-image {
    max-width: 114px;
    height: 125px;
    object-fit: cover;
  }

  .card-title {
    font-size: 13px;
    max-width: 157px;
  }

  .card-quantity p {
    font-size: 14px;
  }

  .cart-item__image {
    height: 125px;
  }
}

@media (max-width: 450px) {
  .discount-price__history-view {
    margin-right: 7px;
  }

  .card-image-history {
    margin-right: 66px;
  }

  .product-name-history-responsive {
    display: block;
    font-weight: 500;
    font-size: 14px;
  }

  .card-title-wrapper-history {
    display: none;
  }
}
</style>