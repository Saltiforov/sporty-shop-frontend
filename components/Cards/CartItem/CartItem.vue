<template>
  <div class="cart-product flex-col flex">
    <div class="flex flex-1">
      <div
          :class="[
          'card-image  rounded-[16px] shrink-0',
          isHistoryView ? 'max-w-[145px] mb-[22px] h-[210px] mr-[36px]' : 'h-[156px] max-w-[156px] w-full mr-[22px]'
        ]"
      >
        <img
            :class="[
            'cart-item__image',
            'rounded-[16px]',
            isHistoryView ? 'h-[210px] object-cover' : 'h-[156px] max-w-[156px] w-full'
          ]"
            class="cursor-pointer"
            :src="imageSource"
            alt="product-image.png"
            @click="redirectToProduct(cartProduct)"
        />
      </div>

      <div
          :class="[
          isHistoryView ? 'items-start' : 'flex-col'
        ]"
          class="card-content flex flex-1 justify-between"
      >
        <p
            :class="[
            isHistoryView ? 'text-[20px]' : 'text-[16px]'
          ]"
            class="card-title max-w-[276px] w-full fw-500 leading-[var(--line-height-base)]"
        >
          {{ cartProduct.name }}
        </p>

        <div v-if="isHistoryView" class="card-quantity w-full flex justify-end">
          <p class="text-medium-20">{{ cartProduct.quantity }} {{ t('unit') }}.</p>
        </div>

        <div :class="[
            isHistoryView ? 'flex-col items-end h-full' : 'pb-4'
        ]" class="card-content__footer flex justify-between w-full">
          <div v-if="!isHistoryView" class="card-product-count">
            <AmountSelector v-model="cartProduct.quantity" min="1" max="100"/>
          </div>


          <div :class="[
              'card-product-price flex',
              isHistoryView ? 'items-start' : 'items-center'
          ]">
            <div
                :class="[
                isHistoryView ? 'discount-price__history-view' : 'fw-600 leading-[34px]',
                cartProduct?.discount
                  ? 'line-through text-[#8E8E93] text-[13px] mr-[14px]'
                  : 'text-[16px]'
              ]"
            >
              {{ priceByCurrency * cartProduct.quantity }} {{ t(currentCurrency) }}
            </div>

            <div
                v-if="cartProduct?.discount"
                :class="[
                    isHistoryView ? 'text-medium-20' : 'fw-600 text-[16px] leading-[34px]',
                ]"
                class="discount-price text-[var(--color-primary-pink)]"
            >
              {{ discountPriceByCurrency }} <span class="text-[18px]">{{ t(currentCurrency) }}</span>
            </div>

          </div>

        </div>
      </div>

      <div v-if="!isHistoryView" class="remove-product-cart-wrapper pl-10 flex flex-col justify-center ml-auto">
        <Button
            :pt="{
          root: {
            class: 'cart-item__delete-btn'
          }
        }"
            @click="handleRemoveProduct(cartProduct._id)"
        >
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import AmountSelector from "~/components/UI/AmountSelector/AmountSelector.vue";

const {t} = useI18n();

const emit = defineEmits(["remove-product", 'handle-cart-item']);

const currencyStore = useCurrencyStore()

const router = useRouter();

const handleRemoveProduct = (id) => {
  emit('remove-product', id);
}

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

const redirectToProduct = (cartProduct) => {
  if (!cartProduct?.id) return
  router.replace(`/product/${cartProduct.id}`)
  emit('handle-cart-item')
}


const priceByCurrency = computed(() => {
  return currency
      ? cartProduct?.price[currency]
      : currencyStore.isUAHSelected ? cartProduct?.price?.uah : cartProduct?.price?.usd
})

const discountPriceByCurrency = computed(() => {
  return currency
      ? cartProduct?.priceAfterDiscount[currency]
      : currencyStore.isUAHSelected ? cartProduct?.priceAfterDiscount?.uah : cartProduct?.priceAfterDiscount?.usd
})

const currentCurrency = computed(() => {
  return isHistoryView ? currency : currencyStore.label;
});

const imageSource = computed(() => fullImageUrls(cartProduct.images || [])[0] || cartProduct.image)

</script>


<style scoped>
.discount-price__history-view {
  font-size: 17px;
  line-height: 22px;
}

.cart-item__delete-btn {
  background: transparent;
  border: none;
  padding: 0;
}

.cart-item__delete-btn:hover {
  background: transparent;
  border: none;
  padding: 0;
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
  .card-product-price {
    margin-bottom: 8px;
  }

  .card-content__footer {
    flex-direction: column-reverse;
    align-items: flex-start;
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

@media (max-width: 600px) {
  .discount-price__history-view {
    font-size: 13px;
  }

  .discount-price {
    font-size: 16px;
  }

  .discount-price span {
    font-size: 14px;
  }

  .card-quantity p {
    font-size: 16px;
  }

  .remove-product-cart-wrapper {
    padding-left: 10px;
  }
}

@media (max-width: 520px) {
  .card-image {
    max-width: 114px;
    height: 125px;
    object-fit: cover;
  }

  .cart-item__image {
    height: 125px;
  }
}

@media (max-width: 450px) {
  .discount-price__history-view {
    margin-right: 7px;
  }
}

</style>